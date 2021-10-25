import React, { memo, useState } from "react";
import { Form, Input, Button, Col, Row, Select } from "antd";
import CKEditor from "react-ckeditor-component";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import { validateDynamicForm } from "../../../constants/validations";
import Widget from "../../Widget";

const CreateForm = memo(() => {
  const { Option } = Select;
  const [fieldType, setFieldType] = useState('');
  const [FieldDataType, setFieldDataType] = useState()
  const [form] = Form.useForm();


  const onFinish = (values) => {
    console.log("asd from submit:", values);
  };

  const filterValues = ["Planing", "Incidents", "Simulations"];

  const SelectedTextFieldType = {
    text_field: ["string"],
    number_field: ["integer", "float"],
    text_area: ["string"],
    check_box: ["string", "boolean"],
    select_box: ["string", "boolean"],
    radio_button: ["string", "boolean"],
  };

  const handleChangeTextField = (value) => {
    setFieldType(value);
    console.log("asdf value", value);
  };

  const handleCkEditor = (value) => {
    console.log("asdf ckeditor", value);
  };

  const showHide = (
    <Form.Item name="input_showHide" noStyle>
      <Select defaultValue={"show"}>
        <Option value="show">Show</Option>
        <Option value="hide">Hide</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Col>
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            console.log("asdf onFormFinish = ", name);
            if (name === "form_initialize") {
              console.log("form_initialize ----------------");
            }
          }}
        >
          <Form name="form_name" onFinish={onFinish} form={form} scrollToFirstError onFieldsChange={(_, allFields) => {
            console.log('form all items', allFields);
          }}
          >
            <Widget styleName={"gx-card-widget"} title="create.form">
              <Row>
                <Col lg={24} md={10} sm={12} xs={24}>
                  <Form.Item
                    name="name"
                    label={<LabelAndTooltip title={"Form.Name"} />}
                    rules={validateDynamicForm.name}
                    className="gx-mx-0 gx-my-1"
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={24} md={10} sm={12} xs={24}>
                  <Form.Item
                    label={<LabelAndTooltip title={"Form.Type"} />}
                    hasFeedback
                    name="form_type"
                    className="gx-mx-0 gx-my-1"
                    rules={validateDynamicForm.formType}
                  >
                    <Select allowClear showSearch={true}>
                      {filterValues.map((role) => (
                        <Option key={role} value={role}>
                          {role}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Col lg={24}>
                <Form.Item
                  name="form_description"
                  label={<LabelAndTooltip title={"Form.Description"} />}
                  rules={validateDynamicForm.description}
                  className=" gx-my-1"
                >
                  <Input.TextArea rows={5} />
                </Form.Item>
              </Col>
            </Widget>
            {/* </Form> */}
            {/* <Form name="form_input" onFinish={onFinish} > */}
            <Form.List name="names">
              {(fields, { add, remove }) => (
                <>
                  <Row>
                    {fields.map(({ key, name, fieldKey, ...field }) => (
                      <Col xl={12} lg={12} md={24} sm={24} xs={24} key={field.key}>
                        <Form.Item required={false} key={field.key}>
                          <Widget
                            styleName={"gx-card-widget gx-ml-3 gx-mb-1"}
                            text=" add field"
                            extra={
                              <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                <li
                                  onClick={() => {
                                    remove(field.name);
                                    setFieldType("");
                                  }}
                                >
                                  <MinusCircleOutlined className="dynamic-delete-button" /> Delete
                                </li>
                              </ul>
                            }
                          >
                            <Form.Item
                              name={[name, "label"]}
                              fieldKey={[fieldKey, 'label']}
                              rules={validateDynamicForm.field.label}
                              className="gx-m-1"
                              style={{ width: "99%" }}
                              {...field}
                            >
                              <Input placeholder="label" addonAfter={showHide} />
                            </Form.Item>

                            <Form.Item
                              name={[name, "input_description"]}
                              rules={validateDynamicForm.description}
                              className="gx-m-1"
                              style={{ width: "99%" }}
                              {...field}
                            >
                              <Input placeholder="Description" addonAfter={showHide} />
                            </Form.Item>

                            {/* <Form.Item
                              name="field"
                              rules={validateDynamicForm.firstName}
                              className="gx-m-1"
                            >
                              <Input placeholder="Order" />
                            </Form.Item> */}

                            <Form.Item hasFeedback name={[name, "input_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputType} {...field}>
                              <Select
                                showSearch={true}
                                className="gx-pl-0"
                                onChange={handleChangeTextField}
                                placeholder="Select input type"
                                defaultValue={fieldType}
                              >
                                <Option key={"text_field"} value={"text_field"}>
                                  Text Field
                                </Option>
                                <Option key={"number_field"} value={"number_field"}>
                                  Number Field
                                </Option>
                                <Option key={"text_area"} value={"text_area"}>
                                  Text Area
                                </Option>
                                <Option key={"check_box"} value={"check_box"}>
                                  Check Box
                                </Option>
                                <Option key={"select_box"} value={"select_box"}>
                                  Select Box
                                </Option>
                                <Option key={"radio_button"} value={"radio_button"}>
                                  Radio Button
                                </Option>
                              </Select>
                            </Form.Item>

                            {fieldType && (
                              <Form.Item name={[name, "input_data_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputDataType} {...field}>
                                <Select className="gx-pl-0" placeholder="Select input data type">
                                  {SelectedTextFieldType[fieldType].map((input) => {
                                    return (
                                      <>
                                        <Option key={input} value={input}></Option>
                                      </>
                                    );
                                  })}
                                </Select>
                              </Form.Item>
                            )}

                            {fieldType === "select_box" && (
                              <>
                                <Form.List name={[name, "select_box_field"]}>
                                  {(fields, { add, remove }) => (
                                    <>
                                      <Row>
                                        {fields.map((field) => (
                                          <Col xl={12} lg={12} md={24} sm={24} xs={24} key={field.key} >
                                            <Form.Item required={false} key={field.key}>
                                              <Widget
                                                styleName={
                                                  "gx-bg-light gx-card-widget gx-ml-3 gx-mb-0 gx-mt-1"
                                                }
                                                extra={
                                                  <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                                    <li
                                                      onClick={() => remove(field.name)}
                                                      className="gx-pr-3"
                                                    >
                                                      <MinusCircleOutlined className="dynamic-delete-button" />
                                                    </li>
                                                  </ul>
                                                }
                                              >
                                                <Form.Item
                                                  name={[name, "checkbox-label"]}
                                                  rules={validateDynamicForm.field.checkboxLabel}
                                                  className="gx-m-1"
                                                >
                                                  <Input placeholder="Text" />
                                                </Form.Item>

                                                <Form.Item
                                                  name={[name, "checkbox-input"]}
                                                  rules={validateDynamicForm.field.checkboxLabel}
                                                  className="gx-m-1"
                                                >
                                                  <Input placeholder="Value" />
                                                </Form.Item>
                                              </Widget>
                                            </Form.Item>
                                          </Col>
                                        ))}
                                      </Row>

                                      <Form.Item>
                                        <Button
                                          className="gx-ml-3"
                                          onClick={() => add()}
                                          icon={<PlusOutlined />}
                                        >
                                          Add select Box
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </>
                            )}
                            {fieldType === "radio_button" && (
                              <>
                                <Form.List name={[name, "radio_button_field"]}>
                                  {(fields, { add, remove }) => (
                                    <>
                                      <Row>
                                        {fields.map((field) => (
                                          <Col xl={12} lg={12} md={24} sm={24} xs={24} key={field.key} >
                                            <Form.Item required={false} key={field.key}>
                                              <Widget
                                                styleName={
                                                  "gx-bg-light gx-card-widget gx-ml-3 gx-mb-0 gx-mt-1"
                                                }
                                                extra={
                                                  <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                                    <li
                                                      onClick={() => remove(field.name)}
                                                      className="gx-pr-3"
                                                    >
                                                      <MinusCircleOutlined className="dynamic-delete-button" />
                                                    </li>
                                                  </ul>
                                                }
                                              >
                                                <Form.Item
                                                  name={[name, "radioButton-label"]}
                                                  rules={validateDynamicForm.field.checkboxLabel}
                                                  className="gx-m-1"
                                                >
                                                  <Input placeholder="Text" />
                                                </Form.Item>

                                                <Form.Item
                                                  name={[name, "radioButton-input"]}
                                                  rules={validateDynamicForm.field.checkboxLabel}
                                                  className="gx-m-1"
                                                >
                                                  <Input placeholder="Value" />
                                                </Form.Item>
                                              </Widget>
                                            </Form.Item>
                                          </Col>
                                        ))}
                                      </Row>

                                      <Form.Item>
                                        <Button
                                          className="gx-ml-3"
                                          onClick={() => add()}
                                          icon={<PlusOutlined />}
                                        >
                                          Add select Box
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </>
                            )}
                            <div className="gx-m-1 gx-rounded-circle">
                              <CKEditor
                                activeClass="p10 gx-rounded-circle gx-rounded-lg"
                                onChange={handleCkEditor}
                              />
                            </div>
                          </Widget>
                        </Form.Item>
                      </Col>
                    ))}
                  </Row>

                  <Form.Item>
                    <Button
                      type="light"
                      className="gx-ml-3"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="gx-ml-3">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Form.Provider>
      </Col>
    </>
  );
});

CreateForm.displayName = CreateForm;

export default CreateForm;
