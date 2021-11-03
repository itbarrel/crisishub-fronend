import React, { memo, useState } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import withLayout from "../../../layouts/app-layout";
import NotFound from "../../../components/helpers/errors";
import Form from '../../../components/resources/dynamicForm/form-card'

const List = memo(() => {
  const { list } = useSelector(({ resources }) => resources.DynamicForm);
  const [isLoading] = useState(false);

  return (
    <>
      <h3>Form List</h3>
      <Row>
        {
          !isLoading &&
          list &&
          list.length > 0 &&
          list.map((form) => {
            return (
              <>
                <Col xl={6} lg={8} md={12} sm={12} xs={24} key={form.id}>
                  <Form name={form.name} description={form.description} type={form.type} id={form.id} form={form} />
                </Col>
              </>
            );
          })
        }

        {
          !isLoading && !list.length && (
            <>
              <Col span={24} align="middle">
                <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
              </Col>
            </>
          )
        }
      </Row>
    </>
  );
});

List.displayName = List;

export default withLayout(List);
