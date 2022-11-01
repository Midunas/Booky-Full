import React, { useRef, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

const EditEventModal = ({ isOpen, onClose, deleteBooky, updateBooky, error, eventToEdit }) => {

  const [isActive, setIsActive] = useState(true)
  const [isShown, setIsShown] = useState(false)
  const newEventNameRef = useRef()

  const editEventName = () => {
    setIsActive(current => !current)
  }

  const updateBookyAndCloseModal = () => {
    updateBooky(newEventNameRef.current.value, eventToEdit._id)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInRight'
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{eventToEdit.username} 13:00 - 15:40</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ display: 'flex' }}>
          <div
            onClick={editEventName}
            style={{
              display: isActive ? 'block' : 'none',
              cursor: 'pointer',
              textDecoration: isShown ? 'underline' : '',
              fontSize: '20px'
            }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >{eventToEdit.eventName ? eventToEdit.eventName : 'Add event name?'}</div>
          {isShown && (
            <div className='ml-5 text-gray-400'>Edit event name</div>
          )}
          <input
            type="text"
            placeholder='new event name'
            style={{ display: isActive ? 'none' : 'block', padding: '5px' }}
            ref={newEventNameRef}
          />
        </ModalBody>
        <ModalFooter>
          <div className='text-red-500'>{error}</div>
          <Button
            variant='ghost'
            onClick={updateBookyAndCloseModal}>Update</Button>
          <Button variant='ghost' color='red' onClick={deleteBooky}>Delete</Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default EditEventModal