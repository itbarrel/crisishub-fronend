import React, { memo, useState } from "react";
import { Button, Input, Popconfirm, Affix } from "antd";
import { Droppable } from "react-beautiful-dnd";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import NotFound from "../../helpers/errors";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import {
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import {
  removeCategory,
  current_item,
} from "../../../store/slices/resources/category";
import Widget from "../../Widget";
import PropTypes from "prop-types";
import UpdateCategory from "../../resources/categories/modal";
import MessageCard from "../messageCard";
import styles from "../card.module.css";
import CustomScrollbars from "../../CustomScrollbars";

const CategoryCard = memo(
  ({ title, category, CategoryMessages, incidentId }) => {
    const dispatch = useDispatch();
    const [isLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [container, setContainer] = useState(null);

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
          title={"Update category"}
          visible={visible}
          setVisible={setVisible}
          selected={selectedCategory}
        />
        <Widget styleName={"gx-card-widget gx-bg-light"}>
          <Row>
            <Col xxl={15} xl={12} lg={12} md={12} sm={12} xs={12}>
              <h4 className="gx-text-black gx-text-capitalize gx-fs-md   ">
                {title}
              </h4>
            </Col>
            <Col xxl={9} xl={12} lg={12} md={12} sm={12} xs={12} align="end">
              <h4 className="gx-mb-0  ">
                <Button
                  type="text"
                  icon={<EditOutlined style={{ color: "grey" }} />}
                  onClick={() => handleUpdate(category)}
                  className=" gx-mr-1 "
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
                    // className="gx-mr-2 "
                    size="small"
                  />
                </Popconfirm>
              </h4>
            </Col>
          </Row>

          <Row className={styles.summary}>
            <Col xxl={20} xl={18} lg={18} md={18} sm={18} xs={18}>
              <h4 className="gx-text-black gx-text-capitalize gx-fs-sm  ">
                Summary {title}
              </h4>
            </Col>

            <Col xxl={4} xl={6} lg={6} md={6} sm={6} xs={6} align="end">
              <Button
                type="text"
                size="small"
                icon={<ZoomInOutlined rotate="75" />}
                className=" gx-text-primary"
              />
            </Col>
          </Row>

          <Row className={styles.message}>
            <Col span={24}>
              <Input
                placeholder="Message"
                suffix={
                  <Button
                    type="text"
                    size="small"
                    icon={<SendOutlined rotate="320" />}
                    className=" gx-text-primary gx-mr-2"
                  />
                }
                className=" gx-border-light gx-mb-1"
              />
            </Col>
          </Row>

          <Row className=" gx-d-sm-block">
            <CustomScrollbars
              // className="gx-wall-scroll"
              className={styles.scrollbar}
            >
              <Droppable droppableId={category.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {CategoryMessages &&
                      CategoryMessages.length > 0 &&
                      CategoryMessages.map((CategoryMessage, index) => {
                        return (
                          <Col
                            // xl={24}
                            // lg={24}
                            // md={24}
                            // sm={24}
                            // xs={24}
                            key={CategoryMessage.id}
                          >
                            <MessageCard
                              CategoryMessage={CategoryMessage}
                              index={index}
                            >
                              {provided.placeholder}
                            </MessageCard>
                          </Col>
                        );
                      })}
                    {(!isLoading && !CategoryMessages) ||
                      (!isLoading && !CategoryMessages.length && (
                        <>
                          <Col span={24} align="center" className="gx-m-4">
                            <NotFound
                              message={<h1>{sNO_RESULT_FOUND_BY}</h1>}
                            />
                          </Col>
                        </>
                      ))}
                  </div>
                )}
              </Droppable>
            </CustomScrollbars>
          </Row>
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
