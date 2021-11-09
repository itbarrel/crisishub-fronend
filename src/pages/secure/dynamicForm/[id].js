import React, { Fragment, memo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Select, Col, Radio } from "antd";
import { validate } from "../../../constants/validations";
import { getKey } from "../../../utils/keyGenerator";
import withLayout from "../../../layouts/app-layout";
import Widget from "../../../components/Widget";
import { log } from '../../../utils/console-log'
import NotFound from "../../../components/helpers/errors";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import parse from 'html-react-parser';

const { Option } = Select;

const View = memo(() => {
  const router = useRouter()
  const { id: formId } = router.query
  const FormList = useSelector(({ resources }) => resources.DynamicForm.list);
  const [selectedFrom] = useState(FormList.find((form) => form.id == formId))
  // const [selectedFrom] = useState(true)

  // log("asdf selectedFrom", FormList, selectedFrom);
  log("asdf selectedFrom ----------- ", selectedFrom);
  // log("asdf selectedFrom ----------- ", formId);
  const onFinish = (formData) => {
    log("Form Data Submit", formData);
  };

  return (
    <>
      {
        // false &&
        selectedFrom?.id == formId &&
        <>
          <Widget>
            <h4>view form</h4>
          </Widget>
          <Form onFinish={onFinish} scrollToFirstError layout={"vertical"}>
            <Widget styleName={"gx-card-widget"} >
              <p className="gx-text-grey gx-fs-xl "> {selectedFrom.name} - {selectedFrom.type} </p>
              <p className="gx-text-grey gx-fs-md gx-mb-4">{selectedFrom.description} </p>
              {
                selectedFrom?.fields?.map((data, index) => {
                  const { label, label_input, isInput, input_type, options, ckeditor, model } = data
                  const SelectedTextFieldType = {
                    text_field: <Input hidden={isInput === 'show' ? false : true} />,
                    number_field: <Input hidden={isInput === 'show' ? false : true} />,
                    text_area: <Input.TextArea rows={5} hidden={isInput === 'show' ? false : true} />,
                    check_box: <Checkbox.Group>
                      {
                        options?.map((field, index) => {
                          return (
                            <Checkbox key={index} value={field?.input} > {field?.label} </Checkbox>
                          )
                        })
                      }
                    </Checkbox.Group>,
                    select_box: <Select hidden={isInput === 'show' ? false : true} >
                      {
                        options?.map((field, index) => {
                          return (
                            <Fragment key={index}>
                              <Option key={index} value={field?.input}> {field?.label} </Option>
                            </Fragment>
                          )
                        })
                      }
                    </Select>,
                    radio_button: <Radio.Group >
                      {
                        options?.map((field, index) => {
                          return (
                            <Radio key={index} value={field?.input}> {field?.label} </Radio>
                          )
                        })
                      }
                    </Radio.Group>
                  };
                  return (
                    <Fragment key={getKey()}>
                      <Form.Item
                        name={model} // label
                        label={label_input === 'show' ? label : ''}
                      >
                        {SelectedTextFieldType[input_type]}
                      </Form.Item>
                      {ckeditor && parse(ckeditor)}
                    </Fragment>
                  )
                })
              }

              {
                selectedFrom?.fields &&
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="gx-ml-3">
                    Submit
                  </Button>
                </Form.Item>
              }
            </Widget>
          </Form>
        </>
      }
      {
        selectedFrom?.id != formId && (
          <>
            <Col span={24} align="middle">
              <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
            </Col>
          </>
        )
      }
    </>
  )
})

View.displayName = View

export default withLayout(View)
