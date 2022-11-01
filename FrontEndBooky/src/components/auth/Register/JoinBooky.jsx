import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../Header';
import { post } from '../../../plugins/http'

const JoinBooky = () => {

  const emailRef = useRef()
  const usernameRef = useRef()
  const passRef = useRef()
  const bookyNameRef = useRef()
  const navigate = useNavigate()
  const repeatPass = useRef()

  const [error, setError] = useState()

  const addUser = async () => {

    const user = {
      bookyName: bookyNameRef.current.value,
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passRef.current.value,
      repeat: repeatPass.current.value,
      admin: false,
    }
    const data = await post("registerUser", user)
    setError(data.message)

    if (!data.error) {
      navigate("/login")
    }
  }

  return (
    <div className='container mt-80'>
      <div className='flex flex-col bg-white p-10 text-center rounded'>
        <Header
          heading="Join a Booky"
          paragraph="Already have an account?"
          linkName="Login"
          linkUrl="/login"
        />
        <div className='text-red-500'>{error}</div>
        <input className='p-4 text-2xl' type="text" placeholder='Booky name' ref={bookyNameRef} />
        <input className='p-4 text-2xl' type="text" placeholder='email' ref={emailRef} />
        <input className='p-4 text-2xl' type="text" placeholder='username' ref={usernameRef} />
        <input className='p-4 text-2xl' type="password" placeholder='password' ref={passRef} />
        <input className='p-4 text-2xl' type="password" placeholder='repeat password' ref={repeatPass} />
        <button
          className="w-full flex justify-center p-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-purple-500 mt-10"
          onClick={addUser}>
          Join
        </button>
      </div>
    </div>
  )
}

export default JoinBooky;