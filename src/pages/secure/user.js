import React, { memo } from "react";
import withLayout from "../../layouts/app-layout";
import { Card , Row, Col} from "antd";
import UsersList from "../../components/resources/user/table";
import AddUser from "../../components/resources/user/form-model";
import SEO from "../../components/seo/";

const User = memo(() => {
    return (
        <>
            <SEO title={"User"} />
            <Card title="Users">
                <Row justify="end">
                    <Col span={4}>
                        <AddUser title={'Add User'} />
                    </Col>
                </Row>
                <UsersList />
            </Card>
        </>
    );
});

User.displayName = User;
export default withLayout(User);
