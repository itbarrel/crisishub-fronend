import react, { memo, useEffect } from "react";
import asyncComponent from "../utils/asyncComponent";
import Router from 'next/router'
import { CookieService } from "../services/storage.service";

const Login = asyncComponent(() => import("../pages/auth/login"));
const Dasboard = asyncComponent(() => import("../pages/secure/dashboard/main"));

const Home = memo(() => {
  const token = CookieService.getToken()

  return (token) ? <Dasboard /> : <Login />
});

Home.displayName = Home;

export default Home;
