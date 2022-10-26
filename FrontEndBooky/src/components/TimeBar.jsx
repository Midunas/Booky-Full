import React, { useState } from 'react'
import { useEffect } from 'react'
import { get } from '../plugins/http'

const TimeBar = ({ id }) => {

  const [events, setEvents] = useState([])
  const [w, setW] = useState(1200)

  const getEventByDay = async () => {
    const res = await get("getEventByDay/" + id)
    console.log(res.eventsByDay)
    setEvents(res.eventsByDay)
  }

  useEffect(() => {
    getEventByDay();
  }, [])

  // const getOffset = (eventStart) => {
  //   const eventOffsetPercentage = (eventStart - dayStart) / dayLength;
  //   setOffset(eventOffsetPercentage * containerWidth)
  // };

  // const getWidthPercentage = (eventEnd, eventStart) => {
  //   const eventWidthPercentage = (eventEnd - eventStart) / dayLength
  //   setWidth(eventWidthPercentage * containerWidth)
  // };

  return (
    <div className='max-w-[900px] mx-auto'>
      <div className='w-full overflow-x-auto'>
        <div className='relative h-24 border-solid border-2 border-indigo-600 bg-white' style={{ width: w }} id={id}>
          {events.map((event) => {
            return (
              <div
                className='absolute h-20 m-2 p-2 rounded'
                style={{
                  backgroundColor: event.color,
                  width: ((event.eventEnd - event.eventStart) / 14) * w,
                  left: ((event.eventStart - 8) / 14) * w
                }}
              >{event.username}</div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


// .time-bar {
//   border: 2.5px solid black;
//   border-radius: 8px;
//   width: 100%;
//   height: 100px;
//   margin-top: 2px;
//   margin-left: 1px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow-x: auto;
//   background-color: white;
// }
export default TimeBar;

{/* <div className='h-5/5 flex-col w-4/5'>
<div className='time-bar' id='Monday'></div>
<div className='time-bar' id='Tuesday'></div>
<div className='time-bar' id='Wednesday'></div>
<div className='time-bar' id='Thursday'></div>
<div className='time-bar' id='Friday'></div>
<div className='time-bar' id='Saturday'></div>
<div className='time-bar' id='Sunday'></div>
</div> */}