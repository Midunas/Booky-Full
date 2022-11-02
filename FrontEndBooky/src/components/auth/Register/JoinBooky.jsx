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
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Join a Booky"
          paragraph="Already have an account?"
          linkName="Login"
          linkUrl="/login"
        />
        <div className='text-red-500'>{error}</div>
        <input className='input' type="text" placeholder='Booky name' ref={bookyNameRef} />
        <input className='input' type="text" placeholder='email' ref={emailRef} />
        <input className='input' type="text" placeholder='username' ref={usernameRef} />
        <input className='input' type="password" placeholder='password' ref={passRef} />
        <input className='input' type="password" placeholder='repeat password' ref={repeatPass} />
        <button
          className="button"
          onClick={addUser}>
          Join
        </button>
      </div>
    </div>
  )
}

export default JoinBooky;