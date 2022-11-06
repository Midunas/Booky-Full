import React from 'react'

const LongEventDisplay = ({ event, convertNumbersToTime }) => {
  return (
    <>
      <img className='w-10 h-10 rounded-full mr-1' src={event.photo} alt="user" />
      {event.username}<br />
      {convertNumbersToTime(event.eventStart)}-
      {convertNumbersToTime(event.eventEnd)}
      {` ${event.eventName}`}
    </>
  )
}

export default LongEventDisplay