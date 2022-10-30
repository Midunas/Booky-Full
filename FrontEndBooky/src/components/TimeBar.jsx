/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { get } from '../plugins/http'

const TimeBar = ({ id, bookyName, registered }) => {

  const [events, setEvents] = useState([])
  const [w, setW] = useState(760)

  const getEventByDay = async () => {
    const res = await get(`getEventByDay/${id}/${bookyName}`)
    setEvents(res.eventsByDay)
  }

  useEffect(() => {
    getEventByDay();
  }, [registered])

  return (
    <div className=' flex'>
      <div className='w-1/6 flex justify-center items-center rounded bg-white border-solid border border-black'>{id}</div>
      <div className='w-5/6'>
        <div
          className='relative h-20 border-solid border border-black bg-white flex justify-center items-center rounded'
          style={{ width: w }}
          id={id}>
          {events.map((event, i) => {
            return (
              <div
                className='absolute h-18 rounded align-center'
                key={i}
                style={{
                  backgroundColor: event.color,
                  width: ((event.eventEnd - event.eventStart) / 14) * w,
                  left: ((event.eventStart - 8) / 14) * w
                }}
              >{event.username} {event.eventStart.toString().replace('.5', ':30')} - {event.eventEnd.toString().replace('.5', ':30')}</div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// {new Array(21).fill(0).map((_, i) => {
//   return <span
//     className='h-18 ml-2 my-2 w-[1px] bg-slate-500 absolute'
//     style={{ left: (i + 1) * (w / 22) }}></span>
// })}


export default TimeBar;
