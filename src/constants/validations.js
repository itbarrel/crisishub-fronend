export const validate = {
	email: [
		{ type: "email", message: "The input is not valid E-mail!" },
		{ required: true, message: "Please input your E-mail!" },
	],
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

export const validateForgetPassword = {
	domain: [{ required: true, message: "Please input your domain name!", whitespace: true }],
	email: [
		{ type: "email", message: "The input is not valid E-mail!" },
		{ required: true, message: "Please input your E-mail!" },
	],
};
