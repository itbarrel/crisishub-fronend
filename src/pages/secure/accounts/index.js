import React, { memo, useEffect, useState } from "react";
import withLayout from "../../../layouts/app-layout";
import AccountsList from "../../../components/resources/accounts/table";
import { Card, Row, Col } from "antd";
import AddAccounts from "../../../components/resources/accounts/model";
import SEO from "../../../components/seo";

const Accounts = memo(() => {
  return (
    <>
      <SEO title={"Accounts"} />
      <Card title="Accounts">
        <Row justify="end">
          <Col span={4}>
            <AddAccounts />
          </Col>
        </Row>
        <AccountsList />
      </Card>
    </>
  );
});

Accounts.displayName = Accounts;
export default withLayout(Accounts);
