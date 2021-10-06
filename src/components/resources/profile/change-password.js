import React, { memo, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Widget from "../../Widget";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import IntlMessages from "../../../utils/IntlMessages";
import { updatePassword } from "../../../store/slices/auth";

const ChangePassword = memo(() => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { loader } = useSelector(({ auth }) => auth);
  const [buttonState, setButtonState] = useState(false);

  const onSubmit = (get) => {
    setLoading(true);
    let data = {
      oldPassword: get.oldPassword,
      newPassword: get.confirm,
    };
    dispatch(updatePassword(data));
    form.resetFields();
  };

  const validate = {
    oldPassword: [{ required: true, message: "Please input your Old Password!" }],
    password: [{ required: true, message: "Please input your password!" }],
    confirmPassword: [
      { required: true, message: "Please confirm your password!" },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("The two passwords that you entered do not match!");
        },
      }),
    ],
  };

  // useEffect(() => {
  // 	setLoading(false);
  // }, [user]);

  return (
    <>
      <Widget title="Password">
        <Form
          form={form}
          name="register"
          onFinish={onSubmit}
          scrollToFirstError
          layout={"vertical"}
        >
          <Form.Item
            name="oldPassword"
            label={<LabelAndTooltip title={"Old.Password"} />}
            rules={validate?.oldPassword}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={<LabelAndTooltip title={"Password"} />}
            rules={validate?.password}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<LabelAndTooltip title={"Confirm.Password"} />}
            rules={validate?.confirmPassword}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            className="gx-mb-0"
            htmlType="submit"
            loading={loading}
            disabled={buttonState}
          >
            <IntlMessages id="Change.Password" />
          </Button>
        </Form>
      </Widget>
    </>
  );
});

ChangePassword.displayName = ChangePassword;

export default ChangePassword;
