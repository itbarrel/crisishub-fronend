import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import { Form, Input, Button, Col, Row, Select, Alert, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { validateDynamicForm } from "../../../constants/validations";
import { add } from '../../../store/slices/resources/dynamicForm'
import { log } from '../../../utils/console-log'
import { getKey } from '../../../utils/keyGenerator'
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import Widget from "../../Widget";
import { getFormTypes, createDynamicForm, updateDynamicForm, update } from "../../../store/slices/resources/dynamicForm";
import config from '../../../configs'



const CreateForm = memo(({ selectedFrom }) => {
  const formTypes = useSelector(({ resources }) => resources.DynamicForm.formType);
  const [MultipleFormTypeId, setMultipleFormTypeId] = useState()
  const [MultipleFormType, setMultipleFormType] = useState()
  const [fieldType, setFieldType] = useState('');
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const editorRef = useRef()

  let token = config.dynamicFormToken


  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || []

  const SelectedTextFieldType = {
    text_field: ["string"],
    number_field: ["integer", "float"],
    text_area: ["string"],
    check_box: ["string", "boolean"],
    select_box: ["string", "boolean"],
    radio_button: ["string", "boolean"],
  };

  const handleChangeTextField = (value) => {
    setFieldType(value)
    log('HandleChangeTextField', value)
  };

  const handleMultipleFormType = (typeId) => {
    setMultipleFormTypeId(typeId)
    // const multiple = formType.find((form) => form.id == typeId)
    // log('asdf handleMultipleFormType ==', typeId)
  };

  useEffect(() => {
    const multiple = formTypes?.find((form) => form.id == MultipleFormTypeId)
    log('asdf ===================== ', multiple?.multiple)
    if (multiple?.multiple === false) setMultipleFormType(multiple?.multiple)

  }, [MultipleFormTypeId])


  const onFinish = (formData) => {
    const dynamicFormData = {
      ...formData,
      fields: formData.fields || {},
    }
    if (selectedFrom) {
      log("asdf Form Data: update", selectedFrom);
      dispatch(updateDynamicForm(selectedFrom.id, dynamicFormData, token))
    }
    else dispatch(createDynamicForm(dynamicFormData, token))
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
    if (selectedFrom) form.setFieldsValue(selectedFrom)
    // else dispatch(getFormTypes(token))
    dispatch(getFormTypes(token))
    // else log('asdf get form type ')
  }, [])

  return (
    <>
      <Col>
        {
          (MultipleFormType === false) ? (
            <Alert
              // message="Informational Notes"
              description="This form type can have only one form"
              type="info"
              showIcon
              closable
              afterClose={true}
            />
          ) : ''
        }
        <Form.Provider>
          <Form name="DynamicForm" onFinish={onFinish} form={form} scrollToFirstError >
            {/* Form Header */}
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
                    name="formTypeId"
                    className="gx-mx-0 gx-my-1"
                    rules={validateDynamicForm.formType}
                  >
                    <Select allowClear showSearch={true} onChange={handleMultipleFormType}>
                      {
                        formTypes?.map((form) => {
                          return (
                            <Option key={getKey()} value={form.id}>
                              {form.name}
                            </Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Col lg={24}>
                <Form.Item
                  name="description"
                  label={<LabelAndTooltip title={"Form.Description"} />}
                  rules={validateDynamicForm.description}
                  className=" gx-my-1"
                >
                  <Input.TextArea rows={5} />
                </Form.Item>
              </Col>
            </Widget>
            {/* Form Body */}
            <Form.List name={"fields"} >
              {(fields, { add, remove }) => (
                <Fragment key={getKey()}>
                  <Row>
                    {fields.map(({ key, name, fieldKey, ...field }, index) => {
                      return (
                        <Fragment key={getKey()}>
                          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item required={false} fieldKey={[fieldKey, 'mainItem']} >
                              <Widget
                                fieldKey={[name, 'card']}
                                styleName={"gx-card-widget gx-ml-3 gx-mb-1"}
                                text="add field"
                                extra={
                                  <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                    <li onClick={() => remove(name)}>
                                      <MinusCircleOutlined className="dynamic-delete-button" /> Delete
                                    </li>
                                  </ul>
                                }
                              >
                                <Form.Item
                                  name={[name, "model"]}
                                  fieldKey={[fieldKey, 'model']}
                                  className="gx-m-1"
                                  style={{ width: "99%" }}
                                  initialValue={getKey()}
                                  hidden
                                  {...field}
                                />

                                <Form.Item
                                  name={[name, "label"]}
                                  fieldKey={[fieldKey, 'label']}
                                  rules={validateDynamicForm.field.label}
                                  className="gx-m-1"
                                  style={{ width: "99%" }}
                                  {...field}
                                >
                                  <Input placeholder="label" addonAfter={
                                    <Form.Item name={[name, "label_input"]} initialValue='show' fieldKey={[fieldKey, 'label_input']} {...field} noStyle>
                                      <Select>
                                        <Option value="show">Show</Option>
                                        <Option value="hide">Hide</Option>
                                      </Select>
                                    </Form.Item>} />
                                </Form.Item>

                                <Form.Item hasFeedback name={[name, "isInput"]} className="gx-m-1" rules={validateDynamicForm.field.inputType} fieldKey={[fieldKey, 'isInput']} {...field} >
                                  <Select
                                    showSearch={true}
                                    className="gx-pl-0"
                                    placeholder="input field show or hide"
                                    onChange={handleChangeTextField}
                                  >
                                    <Option value={"show"}>Show</Option>
                                    <Option value={"hide"}>Hide</Option>
                                  </Select>
                                </Form.Item>

                                {/* initialValue={'text_field'} */}
                                <Form.Item hasFeedback name={[name, "input_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputType} fieldKey={[fieldKey, 'input_type']} {...field} >
                                  <Select
                                    showSearch={true}
                                    className="gx-pl-0"
                                    onChange={handleChangeTextField}
                                    placeholder="Select input type"

                                  >
                                    <Option key={"text_field"} value={"text_field"} >
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
                                  <Form.Item name={[name, "input_data_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputDataType} fieldKey={[fieldKey, 'input_data_types']} {...field}>
                                    <Select className="gx-pl-0" placeholder="Select input data type" >
                                      {SelectedTextFieldType[fieldType]?.map((input) => {
                                        return <Option key={getKey()} value={input} > {input} </Option>
                                      })}
                                    </Select>
                                  </Form.Item>
                                )}

                                {
                                  // (fieldType == 'check_box' || fieldType == 'select_box' || fieldType == 'radio_button') && (
                                  ((form.getFieldValue()?.fields[index]?.input_type == 'check_box') || (form.getFieldValue()?.fields[index]?.input_type == 'select_box') || (form.getFieldValue()?.fields[index]?.input_type == 'radio_button')) && (
                                    <>
                                      <Form.List name={[name, "options"]}>
                                        {(fields, { add, remove }) => {
                                          const SelectedTextFieldType = {
                                            check_box: 'CheckBox',
                                            select_box: 'SelectBox',
                                            radio_button: 'Radio Button',
                                          };
                                          return (
                                            <Fragment key={getKey()}>
                                              <Row>
                                                {fields.map(({ key, name, fieldKey, ...field }) => (
                                                  <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                                    <Form.Item required={false} fieldKey={[fieldKey, `${fieldType}Fields`]} >
                                                      <Widget
                                                        styleName={
                                                          "gx-bg-light gx-card-widget gx-ml-3 gx-mb-0 gx-mt-1"
                                                        }
                                                        extra={
                                                          <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                                            <li
                                                              onClick={() => remove(name)}
                                                              className="gx-pr-3"
                                                            >
                                                              <MinusCircleOutlined className="dynamic-delete-button" />
                                                            </li>
                                                          </ul>
                                                        }
                                                      >
                                                        <Form.Item
                                                          name={[name, "label"]}
                                                          fieldKey={[fieldKey, 'label']}
                                                          rules={validateDynamicForm.field.checkboxLabel}
                                                          className="gx-m-1"
                                                          {...field}
                                                        >
                                                          <Input placeholder="Text" />
                                                        </Form.Item>

                                                        <Form.Item
                                                          name={[name, "input"]}
                                                          fieldKey={[fieldKey, 'input']}
                                                          rules={validateDynamicForm.field.checkboxLabel}
                                                          className="gx-m-1"
                                                          {...field}
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
                                                  Add Options
                                                </Button>
                                              </Form.Item>
                                            </Fragment>
                                          )
                                        }}
                                      </Form.List>
                                    </>
                                  )
                                }
                                <div className="gx-mx-3 gx-px-1">
                                  <Form.Item
                                    name={[name, "ckeditor"]}
                                    valuePropName='data'
                                    getValueFromEvent={(event, editor) => {
                                      const data = editor.getData();
                                      return data;
                                    }}
                                  // rules={[{ required: true, message: 'Please enter the body' }]}
                                  >
                                    <CKEditor editor={ClassicEditor} />
                                  </Form.Item>
                                </div>
                                {/* <div>
                                  <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                    <Checkbox>Input show</Checkbox>
                                  </Form.Item>
                                  <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                    <Checkbox>Input show</Checkbox>
                                  </Form.Item>
                                  <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                    <Checkbox>Input show</Checkbox>
                                  </Form.Item>
                                </div> */}



                              </Widget>
                            </Form.Item>
                          </Col>
                        </Fragment>
                      )
                    })}
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
                </Fragment>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="gx-ml-3">
                {selectedFrom ? "Update Form" : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Form.Provider>
      </Col >
    </>
  );
});

CreateForm.displayName = CreateForm;

export default CreateForm;
