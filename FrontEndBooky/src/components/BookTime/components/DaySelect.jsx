import React, { useRef } from 'react'

const DaySelect = ({ setSelectedDay }) => {

  const dayRef = useRef()

  return (
    <select className="bigInp" name="Weekday" onChange={() => setSelectedDay(dayRef.current.value)} ref={dayRef}>
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Saturday">Saturday</option>
      <option value="Sunday">Sunday</option>
    </select>
  )
}

export default DaySelect