/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { get } from '../plugins/http'
import EditModal from './EditModal'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ""
      }
    })
  }
});

const TimeBar = ({ id, bookyName, registered }) => {

  const [events, setEvents] = useState([])
  const [w, setW] = useState(760)
  const [eventToEdit, setEventToEdit] = useState()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const getEventByDay = async () => {
    const res = await get(`getEventByDay/${id}/${bookyName}`)
    setEvents(res.eventsByDay)
  }

  useEffect(() => {
    getEventByDay();
  }, [registered])

  const updateOrDelete = (event) => {
    setEventToEdit(event)
    onOpen()

  }

  return (
    <ChakraProvider theme={theme}>
      <EditModal onClose={onClose} isOpen={isOpen}></EditModal>
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
                >{event.username} {event.eventStart.toString().replace('.5', ':30')} - {event.eventEnd.toString().replace('.5', ':30')}
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
