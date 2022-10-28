/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import BookTime from '../components/BookTime'
import TimeBar from '../components/TimeBar';

const BookyPage = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [registered, setRegistered] = useState(0)
  const [user, setUser] = useState()

  const bookyName = localStorage.getItem("bookyName")

  return (
    <div className='max-w-[1980px] mx-auto'>
      <div className='mt-52 flex flex-wrap items-center justify-around'>
        <div className='overflow-x-auto w-[980px] mb-20'>
          {days.length > 0 && days.map((x, i) =>
            <TimeBar registered={registered} key={i} id={x} bookyName={bookyName} />
          )}
        </div>
        <BookTime bookyName={bookyName} setUser={setUser} user={user} setRegistered={setRegistered} registered={registered} ></BookTime>
      </div>
    </div>
  )
}

export default BookyPage

