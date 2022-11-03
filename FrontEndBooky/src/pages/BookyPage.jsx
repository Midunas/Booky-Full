/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BookTime from '../components/booktime/BookTime'
import TimeBar from '../components/TimeBar';
import MainContext from '../context/MainContext';

const BookyPage = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const navigate = useNavigate()
  const user = useContext(MainContext)

  useEffect(() => {
    const localEmail = localStorage.getItem("email")
    if (!localEmail) {
      alert('You are not Logged in')
      navigate('/')
    }
  },)

  return (
    <div className='max-w-[1980px] mx-auto'>
      <div className='mt-16 flex flex-wrap items-center justify-around'>
        <div className='overflow-x-auto w-[980px] mb-20'>
          <h1 className="text-3xl dark:text-white mb-2">{user && user.bookyName}</h1>
          {days.length > 0 && days.map((x, i) =>
            <TimeBar key={i} id={x} />
          )}
        </div>
        <BookTime></BookTime>
      </div>
    </div>
  )
}

export default BookyPage

