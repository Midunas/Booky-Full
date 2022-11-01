import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("logedIn")

  useEffect(() => {
    if (isLoggedIn === "true") {
      navigate('/Booky')
    }
  }, [])

  const createNewBooky = () => {
    navigate('/create-booky')
  }
  const registerUser = () => {
    navigate('/join-booky')
  }
  return (
    <div>
      <div className='container flex flex-col mt-52 bg-white p-20 rounded w-[900px]'>
        <h1 className="text-6xl font-normal leading-normal mb-2 text-gray-800">
          Welcome To Booky!
        </h1>
        <div className=' w-full flex justify-around mt-20'>
          <button
            className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-purple-500 text-white font-bold py-4 px-4 rounded"
            onClick={createNewBooky}>
            Create a new Booky
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-purple-500 text-white font-bold py-4 px-4 rounded"
            onClick={registerUser}>
            Join an existing Booky
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome;