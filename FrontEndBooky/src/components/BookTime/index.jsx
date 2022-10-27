import React, { useEffect, useState } from 'react'
import DaySelect from './components/DaySelect'
import { Button } from '@mui/material'
import { useRef } from 'react'
import TimeSelect from './components/TimeSelect'
import { TwitterPicker } from 'react-color'
import { post } from '../../plugins/http'
import { get } from '../../plugins/http'


const BookTime = ({
  setRegistered,
  registered,
  user,
  setUser,
  bookyName }) => {

  const eventStartRef = useRef();
  const eventEndRef = useRef();

  const [currentColor, setCurrentColor] = useState()
  const [selectedDay, setSelectedDay] = useState('Monday');

  async function getUser() {
    const secret = localStorage.getItem("secret")
    const res = await get("getUser/" + secret)
    console.log(res.userExists)
    setUser(res.userExists[0].username)
  }

  useEffect(() => {
    getUser()
  }, [])

  const addReservation = async () => {
    const newBooking = {
      eventStart: eventStartRef.current.value,
      eventEnd: eventEndRef.current.value,
      color: currentColor,
      eventDay: selectedDay,
      username: user,
      bookyName: bookyName
    }
    const data = await post("addReservation", newBooking)
    setRegistered(registered + 1)
  }

  const handleOnChange = (color) => {
    setCurrentColor(color.hex)
  }

  return (
    <div className='flex flex-col w-[280px] mb-20'>
      <span className="bigInp" >{user}</span>
      <DaySelect setSelectedDay={setSelectedDay}></DaySelect>
      <TimeSelect eventTimeRef={eventStartRef} label="From: "></TimeSelect>
      <TimeSelect eventTimeRef={eventEndRef} label="To: "></TimeSelect>
      <div className='flex'>
        <TwitterPicker
          color={currentColor}
          onChangeComplete={handleOnChange}
        />
      </div>
      <Button
        variant="contained"
        sx={{ p: 3, backgroundColor: currentColor }}
        onClick={addReservation}
      >Reserve</Button>
    </div>
  )
}

export default BookTime

