import Head from "next/head";
import { Button } from "antd";
import Link from "../components/helpers/link";
import { memo } from "react";

const Home = memo(() => {
  return (
    <>
      <main>
        <center>
          <h1>Welcome to CrisisHub</h1>
          <Link url={"/auth/login"} passHref={true}>
            <Button type="primary"> Login Page </Button>
          </Link>
        </center>
      </main>
    </>
  );
});

Home.displayName = Home;

export default Home;
