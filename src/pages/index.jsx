import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/auth/Header';
import { MainContext } from '../context/MainContext';
import { post } from '../plugins/http';

const Login = () => {

  //TODO: add email check on login with regex.
  //TODO: add some sort of alert/modal when leaving booky?
  //TODO: make sure when you create first booky it shows up.
  //TODO: allow change cover photo 

  const checkRef = useRef();
  const [error, setError] = useState();
  const router = useRouter();
  const { getUser } = useContext(MainContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (userData) => {
    const res = await post('api/login', userData)
    const data = await res.json()

    if (res.status === 400) {
      setError(data.message)
    } else {
      getUser()
      localStorage.setItem('loggedIn', true)
      setTimeout(() => router.push('/Profile'), 250)
    }

  }
  return (
    <div className='container'>
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="SignUp"
          linkUrl="/SignUp"
          error={error}
        />
        <form className='flex flex-col' onSubmit={handleSubmit((data) => login(data))}>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
            className='input'
            placeholder='email' />
          <p className='text-red-500'>{errors.email?.message}</p>
          <input
            {...register('password', { required: 'Password is required' })}
            className='input'
            placeholder='password'
            type='password' />
          <p className='text-red-500'>{errors.password?.message}</p>
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
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
