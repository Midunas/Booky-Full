import React from 'react'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const navigate = useNavigate()

  const createNewBooky = () => {
    navigate('/create-booky')
  }
  const registerUser = () => {
    navigate('/join-booky')
  }
  return (
    <div>
      <div className='container flex flex-col bg-white p-20 rounded w-[900px]'>
        <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-gray-800">
          Welcome!
        </h1>
        <div className=' w-full flex justify-around mt-20'>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
            onClick={createNewBooky}>
            Create a new Booky
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
            onClick={registerUser}>
            Join an existing Booky
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome;