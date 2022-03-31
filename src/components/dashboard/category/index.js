import React, { memo, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Col, Row } from "antd";
import CategoryCard from "../../cards/categoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryList,
  getFilteredCategoryList,
} from "../../../store/slices/resources/category";
import { setIncomingMessageList } from "../../../store/slices/resources/incomingMessage";

import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import NotFound from "../../../components/helpers/errors";

const category = memo(({ incidentId }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector(({ resources }) => resources.Category.list);
  const [isLoading] = useState(false);

  useEffect(() => {
    dispatch(getFilteredCategoryList(incidentId));

    //socket
    const socket = io("ws://localhost:8000");
    socket.on("categoryMessagePlacement", (message) => {
      dispatch(setCategoryList(message));
    });
    socket.on("Insertcategorymessage", (message) => {
      dispatch(setCategoryList(message));
      dispatch(setIncomingMessageList(message));
    });
  }, []);

  return (
    <>
      <Row>
        {!isLoading &&
          categoryList &&
          categoryList.length > 0 &&
          categoryList.map((category) => {
            return (
              <Col
                xxl={6}
                xl={8}
                lg={8}
                md={8}
                sm={12}
                xs={24}
                key={category.id}
                className="gx-p-lg-1 gx-p-md-1 gx-p-sm-1"
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
    </>
  );
});

category.displayName = category;

export default category;
