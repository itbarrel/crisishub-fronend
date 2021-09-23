import React, { memo } from "react";
import withLayout from "../../layouts/app-layout";
import { Card, Row, Col } from "antd";
import TaskList from "../../components/resources/task/table";
import AddTask from "../../components/resources/task/form-model";
import SEO from "../../components/seo";

const Task = memo(() => {
  return (
    <>
      <SEO title={"Tasks"} />
      <Card title="Tasks">
        <Row justify="end">
          <Col span={4}>
            <AddTask title={"Add Task"} />
          </Col>
        </Row>
        <TaskList />
      </Card>
    </>
  );
});

Task.displayName = Task;
export default withLayout(Task);
