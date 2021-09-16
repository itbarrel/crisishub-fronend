import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import SEO from "../../../components/seo";
import Link from "next/link";

import { Button, Checkbox, Form, Input } from "antd";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";

import IntlMessages from "../../../utils/IntlMessages";
import getlanguage from "../../../components/hoc/withLang";

import { onLogin } from "../../../store/slices/auth";
import IsAuthenticate from '../../../utils/is-authenticate'
import Router from 'next/router'


const Login = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("isAuthencated")
    // if (IsAuthenticate) Router.push('/secure/dashboard')
  }, [])

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (data) => {
    const postData = { domain: 'public', credentials: data }
    dispatch(onLogin(postData));
  };

  return (
    <>
      <SEO title="Sign in" />
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src={"/images/appModule/neature.jpg"} alt="Neature" />
              </div>
              <div className="gx-app-logo-wid">
                <h1>
                  <IntlMessages id="app.userAuth.signIn" />
                </h1>
                <p>
                  <IntlMessages id="app.userAuth.bySigning" />
                </p>
                <p>
                  <IntlMessages id="app.userAuth.getAccount" />
                </p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={"/images/logo.png"} />
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form
                initialValues={{ remember: true }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="gx-signin-form gx-form-row0"
              >
                <Form.Item
                  // initialValue="demo@example.com"
                  rules={[
                    { required: true, message: "Please input your E-mail!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                  name="email"
                >
                  <Input placeholder="demo@Email.com" />
                </Form.Item>
                <Form.Item
                  // initialValue="demo#123"
                  rules={[{ required: true, message: "Please input your Password!" }]}
                  name="password"
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Checkbox>
                    <IntlMessages id="appModule.iAccept" />
                  </Checkbox>
                  <Link href={"/terms-conditions"} passHref={true}>
                    <span className="gx-signup-form-forgot gx-link">
                      <IntlMessages id="appModule.termAndCondition" />
                    </span>
                  </Link>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn" />
                  </Button>
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>{" "}
                  <Link href={"/a/forgot-password"}>
                    <a>
                      {" "}
                      <IntlMessages id="app.userAuth.forgotPassword" />
                    </a>
                  </Link>
                </Form.Item>
                <div className="gx-flex-row gx-justify-content-between">
                  <span>or connect with</span>
                  <ul className="gx-social-link">
                    <li>
                      <GoogleOutlined />
                    </li>
                    <li>
                      <FacebookOutlined />
                    </li>
                  </ul>
                </div>
                <br />
                <br />
                {/* <span className="gx-text-light gx-fs-sm">
                  demo user email: 'demo@example.com' and password: 'demo#123'
                </span> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Login.displayName = Login;
export default getlanguage(() => <Login />);
