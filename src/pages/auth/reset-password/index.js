import React, { memo } from 'react'
import SEO from "../../../components/seo";
import Link from "next/link";
import { Button, Checkbox, Form, Input } from "antd";
import IntlMessages from "../../../utils/IntlMessages";
import getlanguage from "../../../components/hoc/withLang";


const ForgotPassword = memo(() => {

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log("finish", values);
  };

  return (
    <>
      <SEO title="Forgot Page" />
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src={"/images/appModule/neature.jpg"} alt="Neature" />
              </div>
              <div className="gx-app-logo-wid">
                <h1>
                  <IntlMessages id="app.userAuth.forgotPassword" />
                </h1>
                <p>
                  <IntlMessages id="app.userAuth.reset.text" />
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
              <h2>Reset Password</h2>
              <p><IntlMessages id="appModule.enterPasswordReset"/></p>
              <Form
                initialValues={{ remember: true }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="gx-signin-form gx-form-row0"
              >
                <Form.Item
                  // initialValue="demo@example.com"
                  rules={[{ required: true, message: "The input is not valid E-mail!" }]}
                  name="email"
                >
                  <Input placeholder={"Email"} />
                </Form.Item>
                <Form.Item
                  // initialValue="demo@example.com"
                  rules={[{ required: true, message: "The input is not valid E-mail!" }]}
                  name={"confirm"}
                >
                  <Input placeholder={"Retype New Password"} />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.reset" />
                  </Button>                  
                </Form.Item>
              </Form>
              <br />
              <br />
              <br />
              <br />
              or contact to
              <Link href="/contact-us">
                <a>
                  {" "}
                  <IntlMessages id="app.userAuth.support" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
});

ForgotPassword.displayName = ForgotPassword;

export default getlanguage(() => <ForgotPassword />);

