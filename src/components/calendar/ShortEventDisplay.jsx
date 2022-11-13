import React from 'react'

const ShortEventDisplay = ({ event }) => {
  return (
    <div>
      <img className='w-10 h-10 rounded-full ml-1' src={event.photo} alt="user" />
      {event.username}<br />
    </div>
  )
}

export default ShortEventDisplay