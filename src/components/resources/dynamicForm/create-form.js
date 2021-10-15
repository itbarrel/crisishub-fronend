import React, { memo } from 'react'
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const CreateForm = memo(() => {
  
  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  
  return (
    <>
      <Form name="dynamic_form_item"  onFinish={onFinish}>
        <Form.List
          name="names"
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Form.Item
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="passenger name" style={{ width: '60%' }} />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  // type="text"
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
          <Button type="primary" htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
)

CreateForm.displayName = CreateForm

export default CreateForm

