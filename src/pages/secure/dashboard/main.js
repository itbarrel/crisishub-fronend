import { memo, useEffect, useState } from "react";
import withLayout from "../../../layouts/app-layout";
import Widget from "../../../components/Widget";
import SEO from "../../../components/seo";

const Dashboard = memo(() => {
  const [state, setState] = useState(false);

  let a = 10;

  setTimeout(() => {
    setState(true);
    a = 2;
  }, 3000);

  useEffect(() => {
    console.log("asdf inner", state);
  }, [state]);

  useEffect(() => {
    console.log("asdf a", a);
  }, [120]);

  setTimeout(() => {
    console.log("asdf a=====", a);
  }, 5000);

  return (
    <>
      <SEO title={"Main Dashboard"} />
      <Widget title="Dashboard">
        <h1>DashBoard {state && "WOW"} </h1>
      </Widget>
    </>
  );
});

Dashboard.displayName = Dashboard;

export default withLayout(Dashboard);
