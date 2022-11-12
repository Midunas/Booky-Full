import React, { useContext, useRef, useState } from 'react'
import { post } from '../plugins/http'
// import { useNavigate } from "react-router-dom";
import Header from '../components/auth/Header';
import { MainContext } from '../context/MainContext';

const SignUp = () => {
  const userContext = useContext(MainContext)

  const [error, setError] = useState('')
  const emailRef = useRef()
  const usernameRef = useRef()
  const passRef = useRef()
  const repeatPass = useRef()

  // const navigate = useNavigate()

  const createBooky = async () => {

    const adminUser = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passRef.current.value,
      repeat: repeatPass.current.value,
    }

    const res = await post("register", adminUser)
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("secret", data.secret)
      localStorage.setItem("bookyName", data.sessions.bookyName)
      localStorage.setItem("email", data.sessions.email)
      localStorage.setItem("logedIn", true)
      userContext.setUser((userData) => ({ ...userData, secret: data.secret }));
      // navigate(`/profile`)
    } else {
      setError(data.message)
    }
  }

  return (
    <div className='container mt-52'>
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Sign up"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
          error={error}
        />
        <input className='input' type="text" placeholder='email' ref={emailRef} />
        <input className='input' type="text" placeholder='username' ref={usernameRef} />
        <input className='input' type="password" placeholder='password' ref={passRef} />
        <input className='input' type="password" placeholder='repeat password' ref={repeatPass} />
        <button
          className="button"
          onClick={createBooky}>
          Sign up
        </button>
      </div>
    </div>
  )
}
export default SignUp;