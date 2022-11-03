import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import MainContext from '../../../context/MainContext';
import { post } from '../../../plugins/http';
import Header from '../Header';

const Login = () => {

  const emailRef = useRef()
  const passRef = useRef()
  const checkRef = useRef()
  const navigate = useNavigate()
  const [error, setError] = useState()
  const { getUser } = useContext(MainContext)

  const login = async () => {
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    }
    const res = await post("login", user)

    if (!res.error) {
      localStorage.setItem("secret", res.data.secret)
      localStorage.setItem("bookyName", res.data.sessions.bookyName)
      localStorage.setItem("email", res.data.sessions.email)
      localStorage.setItem("logedIn", true)
      getUser(res.data.secret)
      navigate(`/`)
    }
    setError(res.message)
  }

  const autoLoginCheck = (e) => {
    localStorage.setItem("autologin", e.target.checked)
  }
  useEffect(() => {
    const autoLogin = localStorage.getItem("autologin")

    if (autoLogin === "true") {
      checkRef.current.checked = true
    }

  }, [])
  return (
    <div className='container mt-52'>
      <div className='flex flex-col bg-white dark:bg-zinc-800  p-10 text-center rounded'>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signUp"
        />
        <div className='text-red-500'>{error}</div>
        <input className='input' type="text" placeholder='email' ref={emailRef} />
        <input className='input' type="password" placeholder='password' ref={passRef} />
        <div className="flex items-center justify-between ">
          <div className="flex items-center mt-6">
            <input
              ref={checkRef}
              id="autoLogin"
              onChange={autoLoginCheck}
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
