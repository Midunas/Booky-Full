import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { post } from '../plugins/http';


const LoginPage = () => {

  const emailRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate()

  const [error, setError] = useState()

  const login = async () => {
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    }
    const res = await post("login", user)

    if (!res.error) {
      console.log(res.message)
      navigate(`/Booky`)
      localStorage.setItem("secret", res.data.secret)
      console.log(res.data.secret)
    }
    setError(res.message)
  }

  return (
    <div className='container mt-80'>
      <div className='flex flex-col bg-white p-10 text-center rounded'>
        <h1 className="text-5xl font-normal leading-normal  mb-6 text-gray-800" >Login</h1>
        <input className='bigInp' type="text" placeholder='email' ref={emailRef} />
        <input className='bigInp' type="password" placeholder='password' ref={passRef} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4  mt-6 rounded"
          onClick={login}>
          Login
        </button>
        <div className='bigInp red'>{error}</div>
      </div>
    </div>
  )
}

export default LoginPage