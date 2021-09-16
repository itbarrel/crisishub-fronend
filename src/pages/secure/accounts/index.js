import React, { memo, useEffect, useState } from "react";
import withLayout from "../../../layouts/app-layout";
import AccountsList from '../../../components/resourses/accounts/table'

import { Card, Form, Table, Button } from "antd";

const Accounts = memo((props) => {

  return (
    <>
      <Card title="Accounts">
        <Button type="primary">Creact Account</Button>
        <AccountsList />
      </Card>
    </>
  );
});

Accounts.displayName = Accounts;
export default withLayout(Accounts);
