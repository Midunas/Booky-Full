import React from 'react'
import numbersToTime from '../../lib/numbersToTime'
const LongEventDisplay = ({ event }) => {
  return (
    <>
      <img className='w-10 h-10 rounded-full mr-1' src={event.photo} alt="user" />
      {event.username}<br />
      {numbersToTime(event.eventStart)}-
      {numbersToTime(event.eventEnd)}
      {` ${event.eventName}`}
    </>
  )
}

export default LongEventDisplay