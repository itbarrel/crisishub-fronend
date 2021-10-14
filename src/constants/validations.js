/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
export const validate = {
  firstName: [
    {
      required: true,
      message: "Please input your First Name!",
      whitespace: true,
    },
  ],
  lastName: [
    {
      required: true,
      message: "Please input your Last Name!",
      whitespace: true,
    },
  ],
  username: [
    {
      required: true,
      message: "Please input your User Name!",
      whitespace: false,
    },
  ],
  country: [{ message: "Please input your Country Name!", whitespace: true }],
  phone: [{ message: "Please input your phone Name!", whitespace: true }],
  email: [
    { type: "email", message: "The input is not valid E-mail!" },
    { required: true, message: "Please input your E-mail!" },
  ],
  oldPassword: [{ required: true, message: "Please input your Old Password!" }],
  password: [{ required: true, message: "Please input your password!" }],
  confirmPassword: [
    { required: true, message: "Please confirm your password!" },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          "The two passwords that you entered do not match!"
        );
      },
    }),
  ],
};

export const validateForgetPassword = {
  domain: [
    {
      required: true,
      message: "Please input your domain name!",
      whitespace: true,
    },
  ],
  email: [
    { type: "email", message: "The input is not valid E-mail!" },
    { required: true, message: "Please input your E-mail!" },
  ],
};
