import React, { useRef } from 'react'
import { post } from '../../../plugins/http'
import { useNavigate } from "react-router-dom";
import Header from '../Header';

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
    const res = await post("register", adminUser)
    if (!res.error) {
      localStorage.setItem("secret", res.data.secret)
      localStorage.setItem("bookyName", res.data.sessions.bookyName)
      localStorage.setItem("email", res.data.sessions.email)
      localStorage.setItem("logedIn", true)
      navigate(`/`)
    }
  }

  return (
    <div className='container mt-52'>
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Sign up"
          paragraph="Already have an account?"
          linkName="Login"
          linkUrl="/login"
        />
        <input className='input' type="text" placeholder='email' ref={emailRef} />
        <input className='input' type="text" placeholder='username' ref={usernameRef} />
        <input className='input' type="password" placeholder='password' ref={passRef} />
        <input className='input' type="password" placeholder='repeat password' ref={repeatPass} />
        <input className='input' type="text" placeholder='Booky name' ref={bookyNameRef} />
        <button
          className="button"
          onClick={createBooky}>
          Sign up
        </button>
      </div>
    </div>
  )
}
export default CreateBooky;