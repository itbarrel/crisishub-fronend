import React, { memo } from "react";
import { Row, Col } from "antd";
import withLayout from "../../layouts/app-layout";
import TaskList from "../../components/resources/task/table";
import AddTask from "../../components/resources/task/form-model";
import SEO from "../../components/seo";
import Widget from "../../components/Widget";

const Task = memo(() => {
	return (
		<>
			<SEO title={"Tasks"} />
			<Widget title="Tasks">
				<Row justify="end">
					<Col span={4}>
						<AddTask title={"Add Task"} />
					</Col>
				</Row>
				<TaskList />
			</Widget>
		</>
	);
});

Task.displayName = Task;
export default withLayout(Task);
