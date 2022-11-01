import React, { useRef } from 'react'
import { post } from '../plugins/http'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

const CreateBooky = () => {

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
    const data = await post("registerAdmin", adminUser)
    if (!data.error) {
      navigate("/login")
    }
  }

  return (
    <div className='container mt-80'>
      <div className='flex flex-col bg-white p-10 text-center rounded'>
        <Header
          heading="Create a Booky"
          paragraph="Already have an account?"
          linkName="Login"
          linkUrl="/login"
        />
        <input className='p-4 text-2xl' type="text" placeholder='email' ref={emailRef} />
        <input className='p-4 text-2xl' type="text" placeholder='username' ref={usernameRef} />
        <input className='p-4 text-2xl' type="password" placeholder='password' ref={passRef} />
        <input className='p-4 text-2xl' type="password" placeholder='repeat password' ref={repeatPass} />
        <input className='p-4 text-2xl' type="text" placeholder='Booky name' ref={bookyNameRef} />
        <button
          className="w-full flex justify-center p-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-purple-500 mt-10"
          onClick={createBooky}>
          Create Booky
        </button>
      </div>
    </div>
  )
}
export default CreateBooky;