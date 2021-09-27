import React, { memo, useEffect, useState } from "react";
import { Form, Input, Button, Radio, Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Widget from "../../Widget";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import IntlMessages from "../../../utils/IntlMessages";
import { updateProfile } from "../../../store/slices/auth";

const EditProfile = memo(() => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { user } = useSelector(({ auth }) => auth);

	const [formLayout, setFormLayout] = useState("vertical");
	const onFormLayoutChange = ({ layout }) => {
		setFormLayout(layout);
	};

	const formItemLayout =
		formLayout === "horizontal"
			? {
					labelCol: { xs: { span: 24 }, sm: { span: 6 } },
					wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
			  }
			: null;

	const onSubmit = (get) => {
		setLoading(true);
		let data = {
			userName: get.firstName,
			email: get.email,
			firstName: get.firstName,
			lastName: get.lastName,
			mobilePhone: get.mobilePhone,
			country: get.country,
		};
		dispatch(updateProfile(user.id, data));
	};

	const validate = {
		firstName: [{ required: true, message: "Please input your First Name!", whitespace: true }],
		lastName: [{ required: true, message: "Please input your Last Name!", whitespace: true }],
		username: [{ required: true, message: "Please input your User Name!", whitespace: true }],
		country: [{ required: true, message: "Please input your Country Name!", whitespace: true }],
		phone: [{ required: true, message: "Please input your phone Name!", whitespace: true }],
		email: [
			{ type: "email", message: "The input is not valid E-mail!" },
			{ required: true, message: "Please input your E-mail!" },
		],
	};

	useEffect(() => {
		form.setFieldsValue(user);
	}, [user]);

	useEffect(() => {
		setLoading(false);
	}, [user]);

	return (
		<>
			<Widget title="Form">
				<Form
					form={form}
					name="register"
					onFinish={onSubmit}
					scrollToFirstError
					{...formItemLayout}
					layout={formLayout}
					// initialValues={{
					// 	layout: formLayout,
					// }}
					// onValuesChange={onFormLayoutChange}
				>
					{/* <Form.Item label="" name="layout">
						<Radio.Group value={formLayout}>
							<Radio.Button value="horizontal">Horizontal</Radio.Button>
							<Radio.Button value="vertical">Vertical</Radio.Button>
						</Radio.Group>
					</Form.Item> */}

					<Form.Item
						name="firstName"
						label={<LabelAndTooltip title={"First.Name"} />}
						rules={validate?.firstName}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="lastName"
						label={<LabelAndTooltip title={"Last.Name"} />}
						rules={validate?.lastName}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="userName"
						label={<LabelAndTooltip title={"User.Name"} />}
						rules={validate?.username}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="email"
						label={<LabelAndTooltip title={"Email"} />}
						rules={validate.email}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="country"
						label={<LabelAndTooltip title={"Country"} />}
						rules={validate?.country}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="mobilePhone"
						label={<LabelAndTooltip title={"Mobile.Phone"} />}
						rules={validate?.phone}
					>
						<Input />
					</Form.Item>

					<Button type="primary" className="gx-mb-0" htmlType="submit" loading={loading}>
						<IntlMessages id="Update" />
					</Button>
				</Form>
			</Widget>
		</>
	);
});

EditProfile.displayName = EditProfile;

export default EditProfile;
