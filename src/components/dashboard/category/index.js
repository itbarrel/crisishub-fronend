import React, { memo, useState, useEffect } from "react";
import { Col, Row } from "antd";
import CategoryCard from "../../cards/categoryCard/CategoryOutCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryList,
  updateCategory,
} from "../../../store/slices/resources/category";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import NotFound from "../../../components/helpers/errors";
import { DragDropContext } from "react-beautiful-dnd";

import AddCategory from "../../../components/resources/categories/modal";

const category = memo(() => {
  const dispatch = useDispatch();
  const categoryList = useSelector(({ resources }) => resources.Category.list);
  const [selectedCategory, setselectedCategory] = useState({});
  const [isLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(getCategoryList());
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
    console.log("?????????", category, source, ">>>", destination, draggableId);

    const sourceCategory = categoryList.find(
      (element) => element.id === source.droppableId
    );

    const { CategoryMessages } = sourceCategory;
    const newCategoryMessages = [...CategoryMessages];

    newCategoryMessages.splice(source.index, 1);

    const updatedCategory = {
      ...sourceCategory,
      CategoryMessages: newCategoryMessages,
    };
    console.log(".....", categoryList[updatedCategory]);
    const haveID = state.list.findIndex(
      (category) => category.id === action.payload.id
    );
    const updatedCategoryList = {
      categoryList,
      [updatedCategory.id]: updatedCategory,
    };

    console.log("source category", updatedCategoryList);

    // newCategoryMessages.splice(destination.index, 0, draggableId);

    // const updateCategory = {
    //   ...category,
    //   CategoryMessages: newCategoryMessages,
    // };
    // console.log(">>>>>>>.1111", updateCategory);

    // const updateCategoryList = {
    //   ...categoryList,
    //   [updateCategory.id]: updateCategory,
    // };
    // console.log("LLLLLLLll", updateCategoryList);
    // dispatch(updateCategory(updateCategory.id, updateCategoryList));
  };
  return (
    <>
      <AddCategory
        title={"Add category"}
        visible={visible}
        setVisible={setVisible}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {!isLoading &&
            categoryList &&
            categoryList.length > 0 &&
            categoryList.map((category) => {
              return (
                <Col xl={6} lg={8} md={12} sm={18} xs={24} key={category.id}>
                  <CategoryCard
                    title={category.title}
                    createdAt={category.createdAt}
                    category={category}
                    CategoryMessages={category.CategoryMessages}
                  />
                </Col>
              );
            })}
          {!isLoading && !categoryList.length && (
            <>
              <Col span={24} align="middle">
                <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
              </Col>
            </>
          )}
        </Row>
      </DragDropContext>
    </>
  );
});

category.displayName = category;

export default category;
