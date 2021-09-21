import React, { memo, useEffect, useState } from "react";
import withLayout from "../../layouts/app-layout";
import { Card } from "antd";
import UsersList from "../../components/resources/user/table";
import AddUser from "../../components/resources/user/model";
import SEO from "../../components/seo/";

const User = memo(() => {
    return (
        <>
            <SEO title={"User"} />
            <Card title="Users">
                <AddUser />
                <UsersList />
            </Card>
        </>
    );
});

User.displayName = User;
export default withLayout(User);
