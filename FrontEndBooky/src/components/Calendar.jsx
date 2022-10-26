import React from 'react'
import DaysBar from './DaysBar.jsx'
import TimeBar from './TimeBar'

const Calendar = () => {

  return (
    <div className='mt-20 h-166 w-188 '>
      <div className='h-4/5 flex'>
        <DaysBar />
        <TimeBar></TimeBar>
      </div>
    </div>
  )
}



export default Calendar;

