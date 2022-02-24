import React, { memo, useState } from "react";
import { Button, Popconfirm, Affix, Row } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Widget from "../../Widget";
import PropTypes from "prop-types";
import styles from "../card.module.css";

const MessageCard = memo(({ CategoryMessage, index }) => {
  const [container, setContainer] = useState(null);

  return (
    <Row className={styles.messageCard}>
      <Draggable draggableId={CategoryMessage.id} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <Widget styleName="gx-ml-3 gx-mt-1 gx-mr-3 gx-mb-0 gx-card-widget ">
              <div className="gx-media">
                <div className="gx-m-3 ">
                  <i
                    {...provided.dragHandleProps}
                    className={`icon icon-drag-and-drop  `}
                    style={{ fontSize: 22 }}
                  />
                </div>
                <div className="gx-media-body">
                  <h4 className="gx-mb-0 gx-float-right ">
                    <Button
                      type="text"
                      icon={<EditOutlined style={{ color: "grey" }} />}
                      // onClick={() => handleUpdate(category)}
                      className=" gx-mr-0 "
                      size="small"
                    />

                    <Popconfirm
                      placement="bottomRight"
                      title="Are you sure delete this Message?"
                      okText="Yes"
                      cancelText="No"
                      // onConfirm={() => handleDelete(category)}
                    >
                      <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: "grey" }} />}
                        className="gx-mr-0 "
                        size="small"
                      />
                    </Popconfirm>
                  </h4>
                  <h1 className="gx-fs-xxl gx-font-weight-light gx-text-capitalize gx-mb-0">
                    {CategoryMessage.title}
                  </h1>

                  <p className="gx-text-grey gx-mb-0 gx-w-100">
                    Message: {CategoryMessage.message}
                  </p>
                  <p className="gx-text-grey gx-mb-0 gx-float-right">
                    {CategoryMessage.createdAt}
                  </p>
                </div>
              </div>
            </Widget>
          </div>
        )}
      </Draggable>
    </Row>
  );
});

MessageCard.displayName = MessageCard;

MessageCard.propTypes = {
  CategoryMessage: PropTypes.object,
};

export default MessageCard;
