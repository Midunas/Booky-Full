/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import BookTime from '../components/BookTime'
import NavBar from '../components/NavBar';
import TimeBar from '../components/TimeBar';
import { post } from '../plugins/http'

const BookyPage = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [reservations, setReservations] = useState([])
  const [registered, setRegistered] = useState(0)
  const [user, setUser] = useState([])

  let userBooky = ''
  if (user.length > 0) {
    userBooky = user.map((x) => x.bookyName)
  }
  const getReservations = async () => {
    const res = await post("all-reservations", { bookyName: userBooky })
    setReservations([res.reservations])
  }

  useEffect(() => {
    getReservations()
  }, [registered])


  return (
    <div className='max-w-[1980px] mx-auto'>
      <NavBar></NavBar>
      <div className='mt-52 flex flex-wrap items-center justify-around'>
        <div className='overflow-x-auto w-[980px] mb-20'>
          {days.length > 0 && days.map((x, i) =>
            <TimeBar key={i} id={x} />
          )}
        </div>
        <BookTime setUser={setUser} user={user} setRegistered={setRegistered} registered={registered} ></BookTime>
      </div>
    </div>
  )
}

export default BookyPage

