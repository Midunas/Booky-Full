import React, { useContext, useRef, useState } from 'react'
import { post } from '../plugins/http'
import Header from '../components/auth/Header';
import { MainContext } from '../context/MainContext';

const SignUp = () => {
  // const userContext = useContext(MainContext)

  const [error, setError] = useState('')


  // const createBooky = async () => {

  //   const adminUser = {
  //     email: emailRef.current.value,
  //     username: usernameRef.current.value,
  //     password: passRef.current.value,
  //     // repeat: repeatPass.current.value,
  //   }

  //   const res = await post("register", adminUser)
  //   const data = await res.json();

  //   if (res.status === 200) {
  //     localStorage.setItem("secret", data.secret)
  //     localStorage.setItem("bookyName", data.sessions.bookyName)
  //     localStorage.setItem("email", data.sessions.email)
  //     localStorage.setItem("logedIn", true)
  //     userContext.setUser((userData) => ({ ...userData, secret: data.secret }));
  //   } else {
  //     setError(data.message)
  //   }
  // }

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