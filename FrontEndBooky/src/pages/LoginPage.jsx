/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Login from "../components/auth/Login/Login";
import { get } from "../plugins/http";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const nav = useNavigate()

  useEffect(() => {
    const autoLogin = localStorage.getItem("autologin")

    if (autoLogin === "true") {
      get("autologin").then(res => {
        if (res.error) return
        console.log(res)
        nav("/Booky")
        localStorage.setItem("logedIn", true)
      })
    }

  }, [])

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;