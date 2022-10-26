/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import BookTime from '../components/BookTime'
import Calendar from '../components/Calendar.jsx'
import NavBar from '../components/NavBar';
import TimeBar from '../components/TimeBar';
import { post } from '../plugins/http'

const BookyPage = () => {

  // const dayStart = 8;
  // const dayEnd = 22;
  // const dayLength = dayEnd - dayStart;
  // const containerWidth = 683;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  // const [w, setW] = useState(1200)

  const [reservations, setReservations] = useState([])
  const [registered, setRegistered] = useState(0)
  const [user, setUser] = useState([])
  // console.log("reservations", reservations)

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


  // const [width, setWidth] = useState();
  // const [offSet, setOffset] = useState();

  // const getOffset = (eventStart) => {
  //   const eventOffsetPercentage = (eventStart - dayStart) / dayLength;
  //   setOffset(eventOffsetPercentage * containerWidth)
  // };

  // const getWidthPercentage = (eventEnd, eventStart) => {
  //   const eventWidthPercentage = (eventEnd - eventStart) / dayLength
  //   setWidth(eventWidthPercentage * containerWidth)
  // };

  // const registerTime = (eventStart, eventEnd, usernameRef, currentColor) => {
  //   getOffset(eventStart)
  //   getWidthPercentage(eventEnd, eventStart)
  //   setUserName(usernameRef)
  //   setDisplayStart(eventStart)
  //   setDisplayEnd(eventEnd)
  //   setSelectedColor(currentColor)
  //   setRegistered(registered + 1)
  // };

  // const setTheDiv = async () => {

  //   const timeBarDiv = document.getElementById(selectedDay)
  //   const div = document.createElement('div')

  //   div.style.width = `${width}px`;
  //   div.style.left = `${offSet}px`;
  //   div.classList.add('absolute');
  //   div.style.backgroundColor = selectedColor;
  //   div.textContent = `${username}: ${displayStart} - ${displayEnd}`;
  //   timeBarDiv.append(div);

  // };

  // useEffect(() => {
  //   setTheDiv()
  // }, [registered])

  return (
    <div>
      <NavBar></NavBar>
      <div className='container h-5/5 flex-col w-4/5'>
        {days.length > 0 && days.map((x, i) =>

          <TimeBar key={i} id={x} />)}
        {/* <Calendar ></Calendar> */}
        <BookTime setUser={setUser} user={user} setRegistered={setRegistered} registered={registered} ></BookTime>
      </div>
    </div >
  )
}

export default BookyPage

