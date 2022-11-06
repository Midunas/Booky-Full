/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import MainContext from '../../context/MainContext'
import { get, post } from '../../plugins/http'
import EditEventModal from './EditEventModal'

const TimeBar = ({ id, count, setCount }) => {

  const [events, setEvents] = useState([])
  const [w, setW] = useState(760)
  const [eventToEdit, setEventToEdit] = useState([])
  const [error, setError] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useContext(MainContext)

  const getEventByDay = async () => {
    const bookyName = localStorage.getItem("bookyName")
    const res = await get(`getEventByDay/${id}/${bookyName}`)
    const data = await res.json()
    setEvents(data.eventsByDay)

  }

  useEffect(() => {
    if (user) {
      getEventByDay()
    }
  }, [user, count])

  const updateOrDelete = (event) => {
    setEventToEdit(event)
    onOpen()
  }

  const deleteBooky = async () => {
    const bookyToDelete = {
      username: user.username,
      id: eventToEdit._id,
      email: user.email,
    }
    const res = await post("delete", bookyToDelete)
    const data = await res.json()
    if (res.status === 200) {
      onClose()
      getEventByDay()
    }
    setError(data.message)
  }

  const updateBooky = async (newEventName, id) => {
    const bookyToUpdate = {
      id,
      eventName: newEventName,
      email: user.email,
    }
    const res = await post("update", bookyToUpdate)
    const data = await res.json()
    if (res.status !== 200) {
      setError(data.message)
    }
    //TODO: can't edit not ur own booky!?
  }

  const convertNumbersToTime = (time) => {
    if (time.toString().length < 3) {
      const minutes = ':00'
      return time.toString() + minutes
    } else {
      return time.toString().replace('.5', ':30')
    }
  }

  return (

    <div>
      <EditEventModal
        error={error}
        eventToEdit={eventToEdit}
        deleteBooky={deleteBooky}
        updateBooky={updateBooky}
        onClose={onClose}
        isOpen={isOpen}
        setCount={setCount}
        count={count} />
      <div className=' flex'>
        <div className='dayName'>{id}</div>
        <div className='w-5/6'>
          <div
            className='timeBar'
            style={{ width: w }}
            id={id}>
            {events.map((event, i) => {
              return (
                <Tooltip key={i} label="View or edit booky" >
                  <div
                    className='absolute h-18 rounded align-center overflow-hidden cursor-pointer'
                    key={i}
                    style={{
                      backgroundColor: event.color,
                      width: ((event.eventEnd - event.eventStart) / 14) * w,
                      left: ((event.eventStart - 8) / 14) * w
                    }}
                    onClick={() => updateOrDelete(event)}

                  > <img className='w-10 h-10 rounded-full' src={event.photo} alt="user" />
                    {event.username}<br />
                    {convertNumbersToTime(event.eventStart)}-
                    {convertNumbersToTime(event.eventEnd)}
                    {` ${event.eventName}`}
                  </div>
                </Tooltip>
              )
            })}
          </div>
        </div>
      </div>
    </div>

  )
}

export default TimeBar;
