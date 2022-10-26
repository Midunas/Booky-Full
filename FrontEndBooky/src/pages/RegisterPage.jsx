import React, { useRef, useState } from 'react'
import { post } from '../plugins/http'
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const emailRef = useRef()
  const passRef = useRef()
  const repeatPass = useRef()
  const [error, setError] = useState()

  const navigate = useNavigate()

  const addUser = async () => {

    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
      repeat: repeatPass.current.value,
    }
    const data = await post("register", user)
    setError(data.message)

    if (!data.error) {
      navigate("/login")
    }
  }

  return (
    <div className='container mt-80'>
      <div className='flex flex-col bg-white p-10 text-center rounded'>
        <h1 className="text-5xl font-normal leading-normal  mb-6 text-gray-800" >Register</h1>
        <input className='bigInp' type="text" placeholder='email' ref={emailRef} />
        <input className='bigInp' type="password" placeholder='password' ref={passRef} />
        <input className='bigInp' type="password" placeholder='repeat password' ref={repeatPass} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 mt-6 rounded"
          onClick={addUser}>
          Register
        </button>
        <div className='bigInp red'>{error}</div>
      </div>
    </div>
  )
}

export default RegisterPage