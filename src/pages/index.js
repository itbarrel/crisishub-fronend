import react, { memo, useEffect } from "react";
import asyncComponent from "../utils/asyncComponent";
import Router from 'next/router'
import { CookieService } from "../services/storage.service";

const Login = asyncComponent(() => import("../pages/auth/login"));

const Home = memo(() => {
  const token = CookieService.getToken()

  useEffect(() => {
    if (token) { Router.push('/secure/dashboard') }
    console.log(token)
  }, [token]);

  return <Login />
});

Home.displayName = Home;

export default Home;
