import React, { memo, useState, useEffect, Fragment } from "react";
import { Col, Row } from "antd";
import CategoryCard from "../../cards/categoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryList,
  setCategoryList,
  getFilteredCategoryList,
} from "../../../store/slices/resources/category";
import categoryMessage, {
  updateCategoryMessageIndex,
} from "../../../store/slices/resources/categoryMessage";
updateCategoryMessageIndex;
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import NotFound from "../../../components/helpers/errors";
import { DragDropContext } from "react-beautiful-dnd";

import CustomScrollbars from "../../CustomScrollbars/categoryScrollbar";
import styles from "../../componentCss/category.module.css";

import AddCategory from "../../../components/resources/categories/modal";

const category = memo(({ incidentId }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector(({ resources }) => resources.Category.list);
  console.log("categoryList", categoryList);
  const [isLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(getFilteredCategoryList(incidentId));
  }, []);

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

    const updatedCategories = [...categoryList];
    // Source
    const sourceCategoryIndex = updatedCategories.findIndex(
      (element) => element.id === source.droppableId
    );

    const sourceCategory = updatedCategories[sourceCategoryIndex];
    const { CategoryMessages: sourceMessages } = sourceCategory;

    const draggedMessage = sourceMessages[source.index];

    const updatedSourceMessages = [
      ...sourceMessages.slice(0, source.index),
      ...sourceMessages.slice(source.index + 1),
    ];

    const updatedSourceCategory = {
      ...sourceCategory,
      CategoryMessages: updatedSourceMessages,
    };

    updatedCategories[sourceCategoryIndex] = updatedSourceCategory;

    const destinationCategoryIndex = updatedCategories.findIndex(
      (element) => element.id === destination.droppableId
    );

    const destinationCategory = updatedCategories[destinationCategoryIndex];
    const { CategoryMessages: destinationMessages } = destinationCategory;
    const prevSortOrder =
      destination.index > 0
        ? destinationMessages[destination.index - 1].sortOrder
        : -1;

    const updatedDestinationMessages = [
      ...destinationMessages.slice(0, destination.index),
      draggedMessage,
      ...destinationMessages.slice(destination.index),
    ];

    const updatedDestinationCategory = {
      ...destinationCategory,
      CategoryMessages: updatedDestinationMessages,
    };

    updatedCategories[destinationCategoryIndex] = updatedDestinationCategory;

    dispatch(setCategoryList(updatedCategories));
    const data = {
      categoryId: destination.droppableId,
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
              categoryList &&
              categoryList.length > 0 &&
              categoryList.map((category) => {
                return (
                  <Col
                    xl={6}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={24}
                    key={category.id}
                    // align="space-between"
                  >
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
            {!isLoading && !categoryList.length && (
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
