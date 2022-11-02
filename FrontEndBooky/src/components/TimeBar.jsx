/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { get, post } from '../plugins/http'
import EditEventModal from './EditEventModal'


const TimeBar = ({ id, bookyName, user }) => {

  const [events, setEvents] = useState([])
  const [w, setW] = useState(760)
  const [eventToEdit, setEventToEdit] = useState([])
  const [error, setError] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getEventByDay = async () => {
    const res = await get(`getEventByDay/${id}/${bookyName}`)
    setEvents(res.eventsByDay)
  }

  useEffect(() => {
    getEventByDay();
  }, [events])

  const updateOrDelete = (event) => {
    setEventToEdit(event)
    onOpen()

  }

  const deleteBooky = async () => {

    const bookyToDelete = {
      username: user,
      id: eventToEdit._id
    }
    const data = await post("delete", bookyToDelete)
    setError(data.message)
  }

  const updateBooky = async (newEventName, id) => {

    const bookyToUpdate = {
      id,
      eventName: newEventName
    }
    const data = await post("update", bookyToUpdate)
    console.log(data.message)
  }

  const convertNumbersToTime = (time) => {
    if (time.toString().length < 3) {
      const minutes = ':00 '
      return time.toString() + minutes
    } else {
      return time.toString().replace('.5', ':30 ')
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
        isOpen={isOpen} />
      <div className=' flex'>
        <div className='dayName'>{id}</div>
        <div className='w-5/6'>
          <div
            className='timeBar'
            style={{ width: w }}
            id={id}>
            {events.map((event, i) => {
              return (
                <Tooltip label="View or edit booky" >
                  <div
                    className='absolute h-18 rounded align-center overflow-hidden cursor-pointer'
                    key={i}
                    style={{
                      backgroundColor: event.color,
                      width: ((event.eventEnd - event.eventStart) / 14) * w,
                      left: ((event.eventStart - 8) / 14) * w
                    }}
                    onClick={() => updateOrDelete(event)}

                  >{event.username}<br />
                    {convertNumbersToTime(event.eventStart)}
                    - {convertNumbersToTime(event.eventEnd)}
                    {event.eventName}
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
