import React, { useEffect } from 'react';
import Login from "../components/Login";
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