import react, { memo } from "react";
import asyncComponent from "../utils/asyncComponent";

const Login = asyncComponent(() => import("../pages/auth/login"));

const Home = memo(() => {
  return (
    <>
      <Login />
    </>
  );
});

Home.displayName = Home;

export default Home;
