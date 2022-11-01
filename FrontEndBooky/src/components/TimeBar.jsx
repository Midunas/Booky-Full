/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { get, post } from '../plugins/http'
import EditEventModal from './EditEventModal'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ""
      }
    })
  }
});

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
    <ChakraProvider theme={theme}>
      <EditEventModal
        error={error}
        eventToEdit={eventToEdit}
        deleteBooky={deleteBooky}
        updateBooky={updateBooky}
        onClose={onClose}
        isOpen={isOpen}></EditEventModal>
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
                  onClick={() => updateOrDelete(event)}

                >{event.username}<br />
                  {convertNumbersToTime(event.eventStart)}
                  - {convertNumbersToTime(event.eventEnd)}
                  <br />
                  {event.eventName}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default TimeBar;

// {event.eventStart.toString().replace('.5', ':30')}
// - {event.eventEnd.toString().replace('.5', ':30')}