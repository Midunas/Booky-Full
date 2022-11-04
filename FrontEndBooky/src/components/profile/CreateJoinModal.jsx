import React, { useRef } from 'react'
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
import { post } from '../../plugins/http'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'

const CreateJoinModal = ({ isOpen, onClose, createOrJoin, getCreatedBookies, getJoinedBookies }) => {

  //TODO: Make getjoined and getcreated bookies run on one function

  const bookyNameRef = useRef()
  const { user } = useContext(MainContext)

  const createOrJoinBooky = async () => {
    const info = {
      bookyName: bookyNameRef.current.value,
      email: user.email,
      id: user._id,
    }

    if (createOrJoin === 'Create') {
      const data = await post('createBooky', info)
      console.log(data.message)
      getCreatedBookies()
      onClose()
    } else {
      const data = await post('joinBooky', info)
      console.log(data.message)
      getJoinedBookies()
      onClose()
    }

  }

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
            variant='ghost' onClick={createOrJoinBooky}>{createOrJoin}</Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default CreateJoinModal