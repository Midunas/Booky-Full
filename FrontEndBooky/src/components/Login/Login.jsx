import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { post } from '../../plugins/http';
import Header from '../Header';

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
        <input className='p-4 text-2xl' type="text" placeholder='email' ref={emailRef} />
        <input className='p-4 text-2xl' type="password" placeholder='password' ref={passRef} />
        <div className="flex items-center justify-between ">
          <div className="flex items-center mt-6">
            <input
              ref={checkRef}
              id="autoLogin"
              onChange={autoLoginCheck}
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm mt-6">
            <Link to='/create-booky' className="font-medium text-purple-600 hover:text-purple-500">
              Create a new booky?
            </Link>
          </div>
        </div>
        <button
          className="w-full flex justify-center p-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-purple-500 mt-10"
          onClick={login}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
