import React, { memo } from "react";
import withLayout from "../../layouts/app-layout";
import { Card, Row, Col } from "antd";
import DepartmentList from "../../components/resources/departments/table";
import AddDepartments from "../../components/resources/departments/form-model";
import SEO from "../../components/seo/";


const Departments = memo(() => {

    return (
        <>
            <SEO title={"Departments"} />
            <Card title="Departments">
                <Row justify="end">
                    <Col span={4}>
                        <AddDepartments title={'Add Department'} />
                    </Col>
                </Row>
                <DepartmentList />
            </Card>
        </>
    );
});

Departments.displayName = Departments;
export default withLayout(Departments);
