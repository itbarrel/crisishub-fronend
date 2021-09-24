import React, { memo } from "react";
import withLayout from "../../layouts/app-layout";
import { Row, Col } from "antd";
import DepartmentList from "../../components/resources/departments/table";
import AddDepartments from "../../components/resources/departments/form-model";
import SEO from "../../components/seo/";
import Widget from "../../components/Widget";

const Departments = memo(() => {
	return (
		<>
			<SEO title={"Departments"} />
			<Widget title="Departments">
				<Row justify="end">
					<Col span={4}>
						<AddDepartments title={"Add Department"} />
					</Col>
				</Row>
				<DepartmentList />
			</Widget>
		</>
	);
});

Departments.displayName = Departments;
export default withLayout(Departments);
