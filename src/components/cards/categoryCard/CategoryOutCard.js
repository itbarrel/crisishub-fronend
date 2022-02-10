import React, { memo, useState, useEffect } from "react";
import { Button, Form, Input, Popconfirm, Tooltip } from "antd";
const { TextArea } = Input;
import { Droppable } from "react-beautiful-dnd";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredCategoryMessageList,
  // removeCategory,
  // current_item,
} from "../../../store/slices/resources/categoryMessage";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Widget from "../../Widget";
import PropTypes from "prop-types";
import UpdateCategory from "../../resources/categories/modal";
import CategoryInnerCard from "./CategoryInCard";
import MessageCard from "../messageCard";

const CategoryCard = memo(
  ({ title, createdAt, category, CategoryMessages }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});

    const handleDelete = (Current_category) => {
      console.log("handleDelete category", Current_category.id);
      dispatch(removeCategory(Current_category.id));
      dispatch(current_item(Current_category));
    };

    const handleUpdate = (Current_category) => {
      setVisible(true);
      setSelectedCategory(Current_category);
    };

    return (
      <>
        <UpdateCategory
          title={"Add category"}
          visible={visible}
          setVisible={setVisible}
          selected={selectedCategory}
        />
        <Widget styleName={"gx-card-widget gx-bg-light "}>
          <Row>
            <Col xl={18} lg={12} md={10}>
              <h4 className="gx-text-black gx-text-capitalize gx-fs-md gx-ml-1  ">
                {title}
              </h4>
            </Col>
            <Col xl={6} lg={12} md={6} align="middle">
              <h4 className="gx-mb-0 ">
                <Button
                  type="text"
                  icon={<EditOutlined style={{ color: "grey" }} />}
                  onClick={() => handleUpdate(category)}
                  className=" gx-mr-0 "
                  size="small"
                />

                <Popconfirm
                  placement="bottomRight"
                  title="Are you sure delete this Category?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDelete(category)}
                >
                  <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: "grey" }} />}
                    className="gx-mr-0 "
                    size="small"
                  />
                </Popconfirm>
              </h4>
            </Col>
          </Row>

          <Row>
            <CategoryInnerCard createdAt={createdAt} />
          </Row>
          <Row>
            <Droppable droppableId={category.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {CategoryMessages &&
                    CategoryMessages.length > 0 &&
                    CategoryMessages.map((CategoryMessage, index) => {
                      return (
                        <Col
                          xl={24}
                          lg={8}
                          md={12}
                          sm={18}
                          xs={24}
                          key={CategoryMessage.id}
                        >
                          <MessageCard
                            title={CategoryMessage.title}
                            createdAt={CategoryMessage.createdAt}
                            CategoryMessage={CategoryMessage}
                            index={index}
                          >
                            {provided.placeholder}
                          </MessageCard>
                        </Col>
                      );
                    })}
                </div>
              )}
            </Droppable>
          </Row>
          {/* <Row>
            <Col xl={24}>
              <MessageCard
                title={title}
                createdAt={createdAt}
                category={category}
              />
            </Col>
          </Row> */}
        </Widget>
      </>
    );
  }
);

CategoryCard.displayName = CategoryCard;

CategoryCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  // incident: PropTypes.object,
};

export default CategoryCard;
