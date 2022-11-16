import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import Header from '../components/auth/Header';
import { MainContext } from '../context/MainContext';
import { post } from '../plugins/http';
import { useForm } from 'react-hook-form';

const SignUp = () => {

  const [error, setError] = useState('')
  const { getUser } = useContext(MainContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter()
  //TODO: need to watch() password so it matches the repeat as well x)
  const signUp = async (userData) => {

    const res = await post("api/signUp", userData)
    const data = await res.json();
    if (res.status !== 200) {
      setError(data.message)
    } else {
      localStorage.setItem('loggedIn', true)
      getUser()
      setTimeout(() => router.push('/Profile'), 250)
    }

  }

  return (
    <div className='container'>
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Sign up"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
          error={error}
        />
        <form
          className='flex flex-col'
          onSubmit={handleSubmit((data) => signUp(data))}>
          <input {...register("email",
            {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
            className='input'
            placeholder='email' />
          <p className='text-red-500'>{errors.email?.message}</p>
          <input {...register("username", { required: "Username is required" })} className='input' placeholder='username' />
          <p className='text-red-500'>{errors.username?.message}</p>
          <input {...register("password", {
            required: 'A password is required', minLength: {
              value: 5,
              message: 'Must be longer then 4 symbols'
            }
          })}
            className='input'
            type="password"
            placeholder='password' />
          <p className='text-red-500'>{errors.password?.message}</p>
          <input {...register("repeat", {
            required: true,
            validate: (val) => {
              if (watch('password') != val) {
                return "The passwords do not match"
              }
            }
          })}
            className='input'
            type="password"
            placeholder='repeat password' />
          <p className='text-red-500'>{errors.repeat?.message}</p>
          <button
            className="button"
            type='submit'
          >
            Sign up
          </button>
        </form>
      </div>
    </div >
  )
}
export default SignUp;