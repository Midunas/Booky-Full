/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DaySelect from './components/DaySelect'
import { useRef } from 'react'
import TimeSelect from './components/TimeSelect'
import { TwitterPicker } from 'react-color'
import { post } from '../../plugins/http'
import { get } from '../../plugins/http'

const BookTime = ({
  user,
  setUser,
  bookyName }) => {

  const eventStartRef = useRef();
  const eventEndRef = useRef();
  const eventNameRef = useRef();

  const [currentColor, setCurrentColor] = useState([])
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [error, setError] = useState('')
  const [isActive, setIsActive] = useState(false)

  async function getUser() {
    const secret = localStorage.getItem("secret")
    if (secret) {
      const res = await get("getUser/" + secret)
      setUser(res.userExists[0].username)
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  const addReservation = async () => {
    const newBooking = {
      eventStart: eventStartRef.current.value,
      eventEnd: eventEndRef.current.value,
      eventName: eventNameRef.current.value,
      color: currentColor,
      eventDay: selectedDay,
      username: user,
      bookyName: bookyName
    }
    const data = await post("addReservation", newBooking)
    setError(data.message)
    setIsActive(false)
  }

  const handleOnChange = (color) => {
    setCurrentColor(color.hex)
    setIsActive(true)
  }

  return (
    <div className='flex flex-col w-[280px] mb-20'>
      <div className='text-red-500'>{error}</div>
      <div className="bigInp dark:bg-zinc-700 dark:text-white" >{user}</div>
      <input className="bigInp dark:bg-zinc-700 dark:text-white" ref={eventNameRef} placeholder='event name'></input>
      <DaySelect setSelectedDay={setSelectedDay}></DaySelect>
      <TimeSelect eventTimeRef={eventStartRef} label="From: "></TimeSelect>
      <TimeSelect eventTimeRef={eventEndRef} label="To: "></TimeSelect>
      <div className='flex '>
        <TwitterPicker
          color={currentColor}
          onChangeComplete={handleOnChange}
        />
      </div>
      <button
        style={{ padding: 20, backgroundColor: currentColor.length > 0 ? currentColor : '#e9d5ff', color: 'white' }}
        onClick={addReservation}
        disabled={isActive ? false : true}
      >Reserve</button>
    </div>
  )
}

export default BookTime;

