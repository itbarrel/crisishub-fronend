import React, { Fragment, memo, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import withLayout from "../../../layouts/app-layout";
import NotFound from "../../../components/helpers/errors";
import Form from '../../../components/resources/dynamicForm/form-card'
import { getKey } from '../../../utils/keyGenerator'
import { getFormTypesList, getFormTypes } from "../../../store/slices/resources/dynamicForm";
import { log } from '../../../utils/console-log'
import config from '../../../configs'

const List = memo(() => {
  const { list } = useSelector(({ resources }) => resources.DynamicForm);
  const formTypes = useSelector(({ resources }) => resources.DynamicForm.formType);
  const [isLoading] = useState(false);
  const dispatch = useDispatch();
  let token = config.dynamicFormToken

  useEffect(() => {
    log("Dynamic Form list fetch", list)
    dispatch(getFormTypesList(token))
    dispatch(getFormTypes(token))
  }, [])

  return (
    <>
      <h3>Form List</h3>
      <Row>
        {
          !isLoading &&
          list &&
          list.length > 0 &&
          list.map((form, index) => {
            return (
              <Fragment key={getKey()}>
                <Col xl={6} lg={8} md={12} sm={12} xs={24} key={form.id}>
                  <Form name={form.name} description={form.description} type={formTypes && formTypes[index]?.name} id={form.id} form={form} />
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
