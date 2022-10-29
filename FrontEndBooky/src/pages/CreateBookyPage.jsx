import React, { useRef } from 'react'
import { post } from '../plugins/http'
import { useNavigate } from "react-router-dom";

const CreateBookyPage = () => {

  const emailRef = useRef()
  const usernameRef = useRef()
  const passRef = useRef()
  const repeatPass = useRef()
  const bookyNameRef = useRef()

  const navigate = useNavigate()

  const createBooky = async () => {

    const adminUser = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passRef.current.value,
      repeat: repeatPass.current.value,
      bookyName: bookyNameRef.current.value,
      admin: true,
    }
    const data = await post("register", adminUser)
    // console.log(data)
    if (!data.error) {
      navigate("/login")
    }
  }

  return (
    <div className='container mt-80'>
      <div className='flex flex-col bg-white p-10 text-center rounded'>
        <h1 className="text-5xl font-normal leading-normal mb-6 text-gray-800" >Create a Booky</h1>
        <input className='bigInp' type="text" placeholder='email' ref={emailRef} />
        <input className='bigInp' type="text" placeholder='username' ref={usernameRef} />
        <input className='bigInp' type="password" placeholder='password' ref={passRef} />
        <input className='bigInp' type="password" placeholder='repeat password' ref={repeatPass} />
        <input className='bigInp' type="text" placeholder='Booky name' ref={bookyNameRef} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 mt-6 rounded"
          onClick={createBooky}>
          Create Booky
        </button>
      </div>
    </div>
  )
}
export default CreateBookyPage