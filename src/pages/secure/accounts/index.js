import React, { memo, useEffect, useState } from "react";
import withLayout from "../../../layouts/app-layout";
import AccountsList from '../../../components/resources/accounts/table'
import { Card, Button } from "antd";
import AddAccounts from '../../../components/resources/accounts/model'

const Accounts = memo((props) => {
  return (
    <>
      <Card title="Accounts">
        <AddAccounts />
        <AccountsList />
      </Card>
    </>
  );
});

Accounts.displayName = Accounts;
export default withLayout(Accounts);
