import React, { useRef, useState } from 'react'
import numbersToTime from '../../lib/numbersToTime'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tooltip,
} from '@chakra-ui/react'

const EditEventModal = ({
  isOpen,
  onClose,
  deleteEvent,
  updateEvent,
  error,
  eventToEdit,
  setError }) => {

  const [isActive, setIsActive] = useState(false)
  const newEventNameRef = useRef()

  const editEventName = () => {
    setIsActive(true)
  }
  const updateBookyAndCloseModal = () => {
    updateEvent(newEventNameRef.current.value, eventToEdit._id)
    setIsActive(false)
  }
  const closeModalAndReset = () => {
    setIsActive(false)
    setError('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModalAndReset}
      motionPreset='slideInRight'
      size="lg"
    >
      <ModalOverlay />
      <ModalContent className='dark:bg-zinc-800 dark:text-white'>
        <ModalHeader>
          {eventToEdit.username} {numbersToTime(eventToEdit.eventStart)}
          -{numbersToTime(eventToEdit.eventEnd)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ display: 'flex' }}>
          <Tooltip
            label={eventToEdit.eventName
              ? 'Edit event name'
              : 'Add event name'}
            aria-label='A tooltip'>
            <div
              onClick={editEventName}
              className='cursor-pointer'
              style={{ display: isActive ? 'none' : 'block' }}
            >{eventToEdit.eventName ? eventToEdit.eventName : 'Add event name?'}</div>
          </Tooltip>
          <input
            type="text"
            placeholder='new event name'
            className='input'
            style={{ display: isActive ? 'block' : 'none', padding: '5px' }}
            ref={newEventNameRef}
          />
        </ModalBody>
        <ModalFooter>
          <div className='text-red-500'>{error}</div>
          <Button
            variant='ghost'
            onClick={updateBookyAndCloseModal}>Update</Button>
          <Button variant='ghost' color='red' onClick={deleteEvent}>Delete</Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default EditEventModal