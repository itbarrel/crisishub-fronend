import react, { memo } from "react";
import Head from "next/head";
import { Button } from "antd";
import Link from "../components/helpers/link";
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
