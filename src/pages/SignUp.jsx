import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/auth/Header';
import { MainContext } from '../context/MainContext';

const SignUp = () => {

  const [error, setError] = useState('')
  const { user } = useContext(MainContext)
  const router = useRouter()

  //Todo: set up errors 
  useEffect(() => {
    if (user) {
      router.push('/Booky')
    }
  })

  return (
    <div className='container mt-52'>
      <div className='flex flex-col bg-white dark:bg-zinc-800 p-10 text-center rounded'>
        <Header
          heading="Sign up"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/Login"
          error={error}
        />
        <form action="/api/register" method='post' className='flex flex-col'>
          <input className='input' name='email' type="email" placeholder='email' />
          <input className='input' name='username' type="text" placeholder='username' />
          <input className='input' name='password' type="password" placeholder='password' />
          {/* <input className='input' type="password" placeholder='repeat password' ref={repeatPass} /> */}
          <button
            type='submit'
            className="button">
            Sign up
          </button>
        </form>
      </div>
    </div >
  )
}
export default SignUp;