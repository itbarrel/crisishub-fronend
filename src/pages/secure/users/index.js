import React, { memo } from "react";
import { Row, Col } from "antd";
import withLayout from "../../../layouts/app-layout";
import UsersList from "../../../components/resources/user/table";
import AddUser from "../../../components/resources/user/form-model";
import SEO from "../../../components/seo/";
import Widget from "../../../components/Widget";

const User = memo(() => {
	return (
		<>
			<SEO title={"User"} />
			<Widget title="Users">
				<Row justify="end">
					<Col span={4}>
						<AddUser title={"Add User"} />
					</Col>
				</Row>
				<UsersList />
			</Widget>
		</>
	);
});

User.displayName = User;
export default withLayout(User);
