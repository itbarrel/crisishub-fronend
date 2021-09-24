import React, { memo } from "react";
import withLayout from "../../../layouts/app-layout";
import { Card, Row, Col } from "antd";
import RolesList from "../../../components/resources/roles/table";
import EditRoleModal from "../../../components/resources/roles/modal";
import SEO from "../../../components/seo";

const User = memo(() => {
    return (
        <>
            <SEO title={"Roles"} />
            <Card title="Roles">
                <Row justify="end">
                    <Col span={4}>
                        <EditRoleModal title={'Create New Role'} onShow={false} record={{}} />
                    </Col>
                </Row>
                <RolesList />
            </Card>
        </>
    );
});

User.displayName = User;
export default withLayout(User);
