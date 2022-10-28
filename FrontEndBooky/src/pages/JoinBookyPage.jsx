import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { post } from '../plugins/http';

const JoinBookyPage = () => {

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
    const data = await post("register", user)
    setError(data.message)

    if (!data.error) {
      navigate("/login")
    }
  }

  return (
    <div className='container mt-80'>
      <div className='flex flex-col bg-white p-10 text-center rounded'>
        <h1 className="text-5xl font-normal leading-normal  mb-6 text-gray-800" >Join a Booky</h1>
        <input className='bigInp' type="text" placeholder='Booky name' ref={bookyNameRef} />
        <input className='bigInp' type="text" placeholder='email' ref={emailRef} />
        <input className='bigInp' type="text" placeholder='username' ref={usernameRef} />
        <input className='bigInp' type="password" placeholder='password' ref={passRef} />
        <input className='bigInp' type="password" placeholder='repeat password' ref={repeatPass} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4  mt-6 rounded"
          onClick={addUser}>
          Join
        </button>        <div className='bigInp red'>{error}</div>
      </div>
    </div>
  )
}

export default JoinBookyPage