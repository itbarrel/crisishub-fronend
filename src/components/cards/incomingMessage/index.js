import React, { memo, useState } from "react";
import { Button, Popconfirm, } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Widget from "../../Widget";
import PropTypes from "prop-types";
import { format } from "date-fns";
import UpdateIncomingMessage from "../../resources/incomingMessage/modal";

import {
  removeIncomingMessage,
  current_item,
} from "../../../store/slices/resources/incomingMessage";

const IncomingMessageCard = memo(({ incomingMessage, index }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleUpdate = (incomingMessage) => {
    setVisible(true);
    setSelectedCategory(incomingMessage);
  };
  const handleDelete = (incomingMessage) => {
    dispatch(removeIncomingMessage(incomingMessage.id));
    dispatch(current_item(incomingMessage));
  };
  return (
    <>
      <UpdateIncomingMessage
        title={"Update IncomingMessage"}
        visible={visible}
        setVisible={setVisible}
        selected={selectedCategory}
      />

      <Draggable draggableId={incomingMessage.id} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <Widget styleName={"gx-mb-1 "}>
              <div className="gx-media gx-align-items-center   ">
                <div className="gx-mr-lg-3  gx-mr-md-2 gx-mr-3">
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
                      {incomingMessage.title}
                    </h1>

                    <h4 className="gx-mb-0  gx-float-right gx-d-inline">
                      <Button
                        type="text"
                        icon={<EditOutlined style={{ color: "grey" }} />}
                        onClick={() => handleUpdate(incomingMessage)}
                        className=" gx-mr-1 "
                        size="small"
                      />
                      <Popconfirm
                        placement="top"
                        title="Are you sure delete this Message?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(incomingMessage)}
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

                  <p className="gx-text-grey gx-fs-sm gx-float-right gx-d-inline gx-ml-1 gx-mb-0 ">
                    {format(new Date(incomingMessage.createdAt), "dd-MM-yyyy")}
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

IncomingMessageCard.displayName = IncomingMessageCard;

IncomingMessageCard.propTypes = {
  incomingMessage: PropTypes.object,
};

export default IncomingMessageCard;

