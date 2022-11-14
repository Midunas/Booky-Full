import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../components/auth/Header';
import { MainContext } from '../context/MainContext';
import { post } from '../plugins/http';

const Login = () => {

  const checkRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState();
  const router = useRouter();
  const { user, getUser } = useContext(MainContext);

  useEffect(() => {
    if (user) {
      router.push('/Booky')
    }
  }, [])

  const login = async () => {
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    }
    const res = await post('api/login', user)
    const data = await res.json()
    console.log(data.message)
    if (res.status === 200) {
      getUser()
      router.push('/Profile')
    }
  }

  return (
    <div className='container mt-52'>
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="SignUp"
          linkUrl="/SignUp"
          error={error}
        />

        <input className='input' type="email" placeholder='email' name='email' ref={emailRef} />
        <input className='input' type="password" placeholder='password' name='password' ref={passRef} />
        <div className="flex items-center justify-between ">
          <div className="flex items-center mt-6">
            <input
              ref={checkRef}
              id="autoLogin"
              // onChange={autoLoginCheck}
              type="checkbox"
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-white">
              Remember me
            </label>
          </div>
        </div>
        <button
          className='button'
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
