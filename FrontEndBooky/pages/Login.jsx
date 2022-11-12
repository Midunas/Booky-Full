import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
// import { useNavigate } from "react-router-dom";
import { MainContext } from '../context/MainContext';
import { post } from '../plugins/http';
import Header from '../components/auth/Header';
import { useRouter } from 'next/router';

const Login = () => {

  const emailRef = useRef()
  const passRef = useRef()
  const checkRef = useRef()
  const router = useRouter()
  const [error, setError] = useState()
  const { getUser } = useContext(MainContext)
  let autoLogin = ''
  if (typeof window !== "undefined") {
    autoLogin = localStorage.getItem("autologin")
  }
  const login = async () => {
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    }
    const res = await post("login", user)
    const data = await res.json()

    if (res.status === 200) {
      localStorage.setItem("secret", data.secret)
      localStorage.setItem("email", data.sessions.email)
      localStorage.setItem("logedIn", true)
      getUser(data.secret)
      // redirectTo(`/profile`)
      router.push('/Profile')
    }
    setError(data.message)
  }

  const autoLoginCheck = (e) => {
    localStorage.setItem("autologin", e.target.checked)
  }
  useEffect(() => {
    if (autoLogin === "true") {
      checkRef.current.checked = true
    }
  },)

  return (
    <div className='container mt-52'>
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signUp"
          error={error}
        />
        <input className='input' type="text" placeholder='email' ref={emailRef} />
        <input className='input' type="password" placeholder='password' ref={passRef} />
        <div className="flex items-center justify-between ">
          <div className="flex items-center mt-6">
            <input
              ref={checkRef}
              id="autoLogin"
              onChange={autoLoginCheck}
              type="checkbox"
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-white">
              Remember me
            </label>
          </div>
        </div>
        <button
          className='button'
          onClick={login}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
