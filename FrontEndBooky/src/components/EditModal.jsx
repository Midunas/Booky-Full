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

const EditModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInRight'
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, vel id. Atque earum hic delectus ex vel odio tempore vitae sapiente iure asperiores alias maiores aliquam, ducimus libero dolorum nobis.</div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Update</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal