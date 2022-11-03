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

const CreateJoinModal = ({ isOpen, onClose, createOrJoin }) => {

  const bookyNameRef = useRef()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInRight'
      size="lg"
    >
      <ModalOverlay />
      <ModalContent className='dark:bg-zinc-800 dark:text-white'>
        <ModalHeader>{createOrJoin} a Booky</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ display: 'flex' }}>
          <div >
            <input
              type="text"
              placeholder='Booky name'
              className='input'
              ref={bookyNameRef}
            />
            {createOrJoin && createOrJoin === 'Join' &&
              <input
                type="text"
                placeholder='Code'
                className='input'
              />}
          </div>
        </ModalBody>
        <ModalFooter>
          {/* <div className='text-red-500'>{error}</div> */}
          <Button
            variant='ghost'>{createOrJoin}</Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default CreateJoinModal