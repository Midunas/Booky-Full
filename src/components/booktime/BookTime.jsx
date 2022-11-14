import React, { useContext, useState } from 'react'
import DaySelect from './components/DaySelect'
import { useRef } from 'react'
import TimeSelect from './components/TimeSelect'
import { TwitterPicker } from 'react-color'
import { post } from '../../plugins/http'
import { MainContext } from '../../context/MainContext'


const BookTime = ({ setCount, count }) => {

  const eventStartRef = useRef();
  const eventEndRef = useRef();
  const eventNameRef = useRef();
  const { user, bookyName } = useContext(MainContext)

  const [currentColor, setCurrentColor] = useState([])
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [error, setError] = useState('')
  const [isActive, setIsActive] = useState(false)

  const addReservation = async () => {
    const newBooking = {
      eventStart: eventStartRef.current.value,
      eventEnd: eventEndRef.current.value,
      eventName: eventNameRef.current.value,
      color: currentColor,
      eventDay: selectedDay,
      username: user.username,
      bookyName: bookyName,
      photo: user.photo,
      email: user.email,
    }
    const res = await post("/api/addReservation", newBooking)
    const data = await res.json()
    setError(data.message)
    setIsActive(false)
    setCurrentColor('')
    setCount(count + 1)
  }

  const handleColorPickerChange = (color) => {
    setCurrentColor(color.hex)
    setIsActive(true)
  }

  return (
    <div className='flex flex-col w-[280px] mb-20'>
      <div className='text-red-500'>{error}</div>
      <div className="bigInp" >{user && user.username}</div>
      <input className="bigInp" ref={eventNameRef} placeholder='event name'></input>
      <DaySelect setSelectedDay={setSelectedDay}></DaySelect>
      <TimeSelect eventTimeRef={eventStartRef} label="From: "></TimeSelect>
      <TimeSelect eventTimeRef={eventEndRef} label="To: "></TimeSelect>
      <div className='flex '>
        <TwitterPicker
          color={currentColor}
          onChangeComplete={handleColorPickerChange}
        />
      </div>
      <button
        style={{
          padding: 20,
          backgroundColor: currentColor.length > 0 ? currentColor : '#41384b',
          color: 'white',
          borderRadius: '4px'
        }}
        onClick={addReservation}
        disabled={isActive ? false : true}
      >Reserve</button>
    </div>
  )
}

export default BookTime;

