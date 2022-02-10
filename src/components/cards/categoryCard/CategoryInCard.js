import React, { memo, useState } from "react";
import { Button, Form, Input, Popconfirm, Tooltip } from "antd";
const { TextArea } = Input;

import { Col, Row } from "antd";

import { SendOutlined, ZoomInOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styles from "../card.module.css";

const CategoryInnerCard = memo(({ title, createdAt, category }) => {
  return (
    <>
      <Row className={styles.card}>
        <Col xs={20} xl={20} lg={16} md={12} sm={18}>
          <h4 className="gx-text-black gx-text-capitalize gx-fs-sm  ">
            Summary {title}
          </h4>
        </Col>

        <Col xl={4} lg={8} align="right">
          <Button
            type="text"
            size="small"
            icon={<ZoomInOutlined rotate="75" />}
            className=" gx-text-primary"
          />
        </Col>
      </Row>

      <Row className={styles.line}>
        <Col xl={24}>
          <Input
            placeholder="Message"
            suffix={
              <Button
                type="text"
                size="small"
                icon={<SendOutlined rotate="320" />}
                className=" gx-text-primary"
              />
            }
            className=" gx-border-light gx-mb-1"
          />
        </Col>
      </Row>
    </>
  );
});

CategoryInnerCard.displayName = CategoryInnerCard;

CategoryInnerCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
};

export default CategoryInnerCard;
