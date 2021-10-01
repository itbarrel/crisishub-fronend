import React, { memo, useEffect, useState } from "react";
import { Row, Col } from "antd";
import withLayout from "../../layouts/app-layout";
import AccountsList from "../../components/resources/accounts/table";
import AddAccounts from "../../components/resources/accounts/form-model";
import SEO from "../../components/seo";
import Widget from "../../components/Widget";
// import { useSelector } from "react-redux";

const Accounts = memo(() => {
  // const loader = useSelector(({ resources }) => resources.Account.loading);
  // const [loading, setLoading] = useState(loader);

  useEffect(() => {
    console.log("loading");
  }, []);

  return (
    <>
      <SEO title={"Accounts"} />
      <Widget title="Accounts">
        <Row justify="end">
          <Col span={4}>
            <AddAccounts />
          </Col>
        </Row>
        <AccountsList />
      </Widget>
    </>
  );
});

Accounts.displayName = Accounts;
export default withLayout(Accounts);
