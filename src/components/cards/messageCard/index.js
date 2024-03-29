import React, { memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import Widget from "../../Widget";
import {
  EditOutlined,
  DeleteOutlined,
 
} from "@ant-design/icons";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
import {
  removeCategoryMessage,
  current_item,
} from "../../../store/slices/resources/category";
import UpdateCategoryMessage from "../../resources/categoryMessage/modal";
import { Button, Popconfirm } from "antd";

const MessageCard = memo(({ CategoryMessage, index, userName }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleUpdate = (CategoryMessage) => {
    setVisible(true);
    setSelectedCategory(CategoryMessage);
  };

  const handleDelete = (CategoryMessage) => {
    dispatch(removeCategoryMessage(CategoryMessage.id));
    dispatch(current_item(CategoryMessage));
  };

  return (
    <>
      <UpdateCategoryMessage
        title={"Update categoryMessage"}
        visible={visible}
        setVisible={setVisible}
        selected={selectedCategory}
      />
      <Draggable draggableId={CategoryMessage.id} index={index} key={1}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <Widget styleName={"gx-mb-1 "}>
              <div className="gx-media gx-align-items-center   ">
                <div className="gx-mr-lg-2  gx-mr-md-1 gx-mr-3">
                  <span className="gx-draggable-icon gx-pt-2">
                    <i
                      className="icon icon-expand"
                      style={{ fontSize: 22 }}
                      {...provided.dragHandleProps}
                    />
                  </span>
                </div>
                <div className="gx-media-body">
                  <div>
                    <h1 className="gx-fs-lg  gx-mb-4 gx-d-inline gx-text-capitalize">
                      {CategoryMessage.title}
                    </h1>

                    <h4 className="gx-mb-0  gx-float-right gx-d-inline">
                      <Button
                        type="text"
                        icon={<EditOutlined style={{ color: "grey" }} />}
                        onClick={() => handleUpdate(CategoryMessage)}
                        className=" gx-mr-1 "
                        size="small"
                      />
                      <Popconfirm
                        placement="top"
                        title="Are you sure delete this Message?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(CategoryMessage)}
                      >
                        <Button
                          type="text"
                          icon={<DeleteOutlined style={{ color: "grey" }} />}
                          // className="gx-mr-2 "
                          size="small"
                        />
                      </Popconfirm>
                    </h4>
                  </div>

                  <h2 className="gx-fs-sm gx-d-inline  gx-text-grey">
                    {userName}
                  </h2>
                  <p className="gx-text-grey gx-fs-sm gx-float-right gx-d-inline gx-ml-1 gx-mb-0 ">
                    {format(new Date(CategoryMessage.createdAt), "dd-MM-yyyy")}
                  </p>
                </div>
              </div>
            </Widget>
          </div>
        )}
      </Draggable>
    </>
  );
});

MessageCard.displayName = MessageCard;

MessageCard.propTypes = {
  CategoryMessage: PropTypes.object,
};

export default MessageCard;
