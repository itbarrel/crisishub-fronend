import React, { memo } from "react";
import withLayout from "../../../layouts/app-layout";
import Dynamic from "../../../components/table/Dynamic";

const Accounts = memo(() => {
  return (
    <>
      <Dynamic />
    </>
  );
});

Accounts.displayName = Accounts;
export default withLayout(Accounts);
