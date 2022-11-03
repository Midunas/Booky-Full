import React from 'react'

const TimeSelect = ({ eventTimeRef, label }) => {
  return (
    <div className='from-to-time-container rounded dark:bg-zinc-700 dark:text-white'>
      <span>{label}</span>
      <select className="medInp dark:bg-zinc-700 dark:text-white" id="select" ref={eventTimeRef}>
        <option value="8">08:00</option>
        <option value="8.5">08:30</option>
        <option value="9">09:00</option>
        <option value="9.5">09:30</option>
        <option value="10">10:00</option>
        <option value="10.5">10:30</option>
        <option value="11">11:00</option>
        <option value="11.5">11:30</option>
        <option value="12">12:00</option>
        <option value="12.5">12:30</option>
        <option value="13">13:00</option>
        <option value="13.5">13:30</option>
        <option value="14">14:00</option>
        <option value="14.5">14:30</option>
        <option value="15">15:00</option>
        <option value="15.5">15:30</option>
        <option value="16">16:00</option>
        <option value="16.5">16:30</option>
        <option value="17">17:00</option>
        <option value="17.5">17:30</option>
        <option value="18">18:00</option>
        <option value="18.5">18:30</option>
        <option value="19">19:00</option>
        <option value="19.5">19:30</option>
        <option value="20">20:00</option>
        <option value="20.5">20:30</option>
        <option value="21">21:00</option>
        <option value="21.5">21:30</option>
        <option value="22">22:00</option>
      </select>
    </div>
  )
}

export default TimeSelect