import React, { Fragment, memo, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import withLayout from "../../../layouts/app-layout";
import NotFound from "../../../components/helpers/errors";
import Form from '../../../components/resources/dynamicForm/form-card'
import { getKey } from '../../../utils/keyGenerator'
import { getFormTypesList } from "../../../store/slices/resources/dynamicForm";
import { log } from '../../../utils/console-log'
import config from '../../../configs'



const List = memo(() => {
  const { list } = useSelector(({ resources }) => resources.DynamicForm);
  const [isLoading] = useState(false);
  const dispatch = useDispatch();
  let token = config.dynamicFormToken

  useEffect(() => {
    log("asdf Dynamic Form list fetch")
    dispatch(getFormTypesList(token))
  }, [])

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
              <Fragment key={getKey()}>
                <Col xl={6} lg={8} md={12} sm={12} xs={24} key={form.id}>
                  <Form name={form.name} description={form.description} type={form.type} id={form.id} form={form} />
                </Col>
              </Fragment>
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