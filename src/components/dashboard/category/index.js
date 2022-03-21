import React, { memo, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Col, Row } from "antd";
import CategoryCard from "../../cards/categoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryList,
  getFilteredCategoryList,
} from "../../../store/slices/resources/category";
import { updateCategoryMessageIndex } from "../../../store/slices/resources/categoryMessage";

import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import NotFound from "../../../components/helpers/errors";
import { DragDropContext } from "react-beautiful-dnd";

import CustomScrollbars from "../../CustomScrollbars/categoryScrollbar";
import styles from "../../componentCss/category.module.css";

const category = memo(({ incidentId }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector(({ resources }) => resources.Category.list);
  const [catagories, setCategories] = useState(categoryList);
  const [isLoading] = useState(false);

  useEffect(() => {
    dispatch(getFilteredCategoryList(incidentId));

    //socket
    const socket = io("ws://localhost:8000");
    socket.on("messagePlacement", (message) => {
      dispatch(setCategoryList(message));
    });
  }, []);
  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const dragCategories = [...catagories];
    const destinationCategoryIndex = dragCategories.findIndex(
      (element) => element.id === destination.droppableId
    );

    const destinationCategory = dragCategories[destinationCategoryIndex];

    const { CategoryMessages: destinationMessages } = destinationCategory;

    const prevSortOrder =
      destination.index > 0
        ? destinationMessages[destination.index - 1].sortOrder
        : -1;

    const data = {
      destinationCategoryId: destination.droppableId,
      sourceCategoryId: source.droppableId,
      sortOrder: prevSortOrder,
    };

    dispatch(updateCategoryMessageIndex(draggableId, data));
  };
  return (
    <>
      <CustomScrollbars
        // className="gx-wall-scroll"
        className={styles.categoryscrollbar}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            {!isLoading &&
              catagories &&
              catagories.length > 0 &&
              catagories.map((category) => {
                return (
                  <Col xl={6} lg={8} md={8} sm={12} xs={24} key={category.id}>
                    <CategoryCard
                      title={category.title}
                      createdAt={category.createdAt}
                      category={category}
                      CategoryMessages={category.CategoryMessages}
                      incidentId={incidentId}
                    />
                  </Col>
                );
              })}
            {!isLoading && !catagories.length && (
              <Col span={24} align="middle">
                <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
              </Col>
            )}
          </Row>
        </DragDropContext>
      </CustomScrollbars>
    </>
  );
});

category.displayName = category;

export default category;
