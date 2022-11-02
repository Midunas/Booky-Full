/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BookTime from '../components/BookTime'
import TimeBar from '../components/TimeBar';

const BookyPage = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const localEmail = localStorage.getItem("email")
    if (!localEmail) {
      alert('You are not Logged in')
      navigate('/')
    }
  },)

  const bookyName = localStorage.getItem("bookyName")

  return (
    <div className='max-w-[1980px] mx-auto'>
      <div className='mt-16 flex flex-wrap items-center justify-around'>
        <div className='overflow-x-auto w-[980px] mb-20'>
          <h1 className="text-3xl dark:text-white">{bookyName}</h1>
          {days.length > 0 && days.map((x, i) =>
            <TimeBar user={user} key={i} id={x} bookyName={bookyName} />
          )}
        </div>
        <BookTime bookyName={bookyName} setUser={setUser} user={user} ></BookTime>
      </div>
    </div>
  )
}

export default BookyPage

