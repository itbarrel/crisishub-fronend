import React, { memo } from "react";
import Link from "../components/helpers/link/index";
import { Button } from "antd";

const TermsCondations = memo(() => {
  return (
    <>
      <center>
        <br />
        <h1>Terms & Conditions Page </h1>
        <br />
        <br />
        <Link url={"/a/login"} passHref={true}>
          <Button type="primary"> Back </Button>
        </Link>
      </center>
    </>
  );
});

TermsCondations.displayName = TermsCondations;

export default TermsCondations;
