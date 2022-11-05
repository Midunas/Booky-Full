/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BookTime from '../components/booktime/BookTime'
import TimeBar from '../components/calendar/TimeBar';

const BookyPage = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const navigate = useNavigate()
  const [count, setCount] = useState(1)
  const bookyName = localStorage.getItem("bookyName")

  useEffect(() => {
    const localEmail = localStorage.getItem("email")
    if (!localEmail) {
      alert('You are not Logged in')
      navigate('/login')
    }
  },)

  return (
    <div className='max-w-[1980px] mx-auto'>
      <div className='mt-16 flex flex-wrap items-center justify-around'>
        <div className='overflow-x-auto w-[980px] mb-20'>
          <h1 className="text-3xl dark:text-white mb-2">{bookyName}</h1>
          {days && days.map((x, i) =>
            <TimeBar setCount={setCount} count={count} key={i} id={x} />
          )}
        </div>
        <BookTime count={count} setCount={setCount}></BookTime>
      </div>
    </div>
  )
}

export default BookyPage

