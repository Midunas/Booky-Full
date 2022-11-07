/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import MainContext from '../../context/MainContext'
import { get, post } from '../../plugins/http'
import EditEventModal from './EditEventModal'
import LongEventDisplay from './LongEventDisplay'
import ShortEventDisplay from './ShortEventDisplay'

//TODO: Fix the count fetch shinanigans

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
  }, [count, user])

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
    if (!res.status === 200) {
      setError(data.message)
    }
    getEventByDay()
    onClose()
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
  }

  return (
    <div>
      <EditEventModal
        error={error}
        setError={setError}
        eventToEdit={eventToEdit}
        deleteBooky={deleteBooky}
        updateBooky={updateBooky}
        onClose={onClose}
        isOpen={isOpen}
        getEventByDay={getEventByDay}
        count={count}
        setCount={setCount}
      />
      <div className=' flex'>
        <div className='dayName'>{id}</div>
        <div className='w-5/6'>
          <div
            className='timeBar'
            style={{ width: w }}
            id={id}>
            {events.map((event, i) => {
              const duration = event.eventEnd - event.eventStart
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
                  >{duration > 2
                    ? <LongEventDisplay event={event} />
                    : <ShortEventDisplay event={event} />}
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
