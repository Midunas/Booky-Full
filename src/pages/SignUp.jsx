import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../components/auth/Header';
import { MainContext } from '../context/MainContext';
import { post } from '../plugins/http';

const SignUp = () => {

  const [error, setError] = useState('')
  const emailRef = useRef()
  const usernameRef = useRef()
  const passRef = useRef()
  const repeatPass = useRef()

  const { getUser } = useContext(MainContext)
  const router = useRouter()

  const register = async () => {
    const user = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passRef.current.value,
      repeat: repeatPass.current.value,
    }
    const res = await post("api/register", user)
    const data = await res.json();
    if (res.status === 200) {
      getUser()
      setTimeout(() => router.push('/Profile'), 250)
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
          linkUrl="/"
          error={error}
        />
        <input className='input' type="email" placeholder='email' ref={emailRef} />
        <input className='input' type="text" placeholder='username' ref={usernameRef} />
        <input className='input' type="password" placeholder='password' ref={passRef} />
        <input className='input' type="password" placeholder='repeat password' ref={repeatPass} />
        <button
          className="button"
          onClick={register}
        >
          Sign up
        </button>
      </div>
    </div >
  )
}
export default SignUp;