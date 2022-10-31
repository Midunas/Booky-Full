import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { post } from '../../plugins/http';
import Header from './Header';

const Login = ({ setIsLoggedIn }) => {

  const emailRef = useRef()
  const passRef = useRef()
  const checkRef = useRef()
  const navigate = useNavigate()

  const [error, setError] = useState()

  const login = async () => {
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    }
    const res = await post("login", user)

    if (!res.error) {
      navigate(`/Booky`)
      localStorage.setItem("secret", res.data.secret)
      localStorage.setItem("bookyName", res.data.sessions.bookyName)
      localStorage.setItem("email", res.data.sessions.email)
      setIsLoggedIn(true)
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
    <div className='container mt-80'>
      <div className='flex flex-col bg-white p-10 text-center rounded'>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/join-booky"
        />
        <div className='text-red-500'>{error}</div>
        <input className='bigInp' type="text" placeholder='email' ref={emailRef} />
        <input className='bigInp' type="password" placeholder='password' ref={passRef} />
        <div className='flex items-center ml-2 gap-x-1.5'>
          <input className='p-4' ref={checkRef} id="autoLogin" onChange={autoLoginCheck} type="checkbox" />
          <label htmlFor="autoLogin">remember me</label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4  mt-6 rounded"
          onClick={login}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
