import React, { useRef, useState } from 'react';
import Header from '../components/auth/Header';

const Login = () => {

  const checkRef = useRef()
  const [error, setError] = useState()

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
        <form action="/api/login" method='post' className='flex flex-col'>
          <input className='input' type="email" placeholder='email' name='email' />
          <input className='input' type="password" placeholder='password' name='password' />
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
            type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
