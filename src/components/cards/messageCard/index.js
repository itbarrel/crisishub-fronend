import React, { memo } from "react";
import { Progress } from "antd";
import { Col, Row } from "antd";
import { Button, Form, Input, Popconfirm } from "antd";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
// import { Col, Row } from "antd";
import { Draggable } from "react-beautiful-dnd";
import Link from "next/link";
import { SendOutlined, ZoomInOutlined } from "@ant-design/icons";

import Widget from "../../Widget";
import PropTypes from "prop-types";

import styles from "../card.module.css";

const MessageCard = memo(({ title, createdAt, CategoryMessage, index }) => {
  return (
    <Draggable draggableId={CategoryMessage.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Widget styleName="gx-m-1 gx-card-widget">
            <div className="gx-media gx-align-items-center gx-flex-nowrap">
              <div className="gx-m-lg-1 ">
                <i
                  className={`icon icon-orders gx-fs-xlxl gx-text-geekblue gx-d-flex`}
                  style={{ fontSize: 16 }}
                />
              </div>
              <div className="gx-media-body">
                <h1 className="gx-fs-xxxl gx-font-weight-medium gx-mb-1">
                  {title}
                </h1>
                <p className="gx-text-grey gx-mb-0">
                  {CategoryMessage.message}
                </p>
              </div>
            </div>
          </Widget>
        </div>
      )}
    </Draggable>
  );
});

MessageCard.displayName = MessageCard;

MessageCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
};

export default MessageCard;
