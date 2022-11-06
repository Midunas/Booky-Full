import React from 'react'
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

const DeleteBookyModal = ({
  isOpen,
  onClose,
  deleteBooky,
  bookyName,
  warning,
  error
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInRight'
      size="lg"
    >
      <ModalOverlay />
      <ModalContent className='dark:bg-zinc-800 dark:text-white'>
        <ModalHeader>{bookyName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ display: 'flex' }}>
          <span
            className='text-2xl dark:text-white'
          >{warning}
          </span>
        </ModalBody>
        <ModalFooter className='flex gap-x-1'>
          <div className='text-red-500'>{error}</div>
          <Button variant='ghost' color='red' onClick={deleteBooky}>I'm sure!</Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default DeleteBookyModal