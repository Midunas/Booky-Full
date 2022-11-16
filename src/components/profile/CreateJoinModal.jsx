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
import { post } from '../../plugins/http'
import { useContext } from 'react'
import { MainContext } from '../../context/MainContext'

const CreateJoinModal = ({ isOpen, onClose, createOrJoin, getCreatedBookies, getJoinedBookies }) => {

  const bookyNameRef = useRef()
  const inviteCodeRef = useRef()

  const { user, setBookyName } = useContext(MainContext)
  const [error, setError] = useState()

  const createOrJoinBooky = async () => {
    const info = {
      bookyName: bookyNameRef.current.value,
      email: user.email,
      id: user._id,
    }

    if (createOrJoin === 'Create') {
      const res = await post('/api/createBooky', info)
      const data = await res.json();

      if (res.status !== 200) {
        setError(data.message)
      } else {
        setBookyName(bookyNameRef.current.value)
        localStorage.setItem('bookyName', bookyNameRef.current.value)
        getCreatedBookies()
        onClose()
      }

    } else {
      const info = {
        bookyName: bookyNameRef.current.value,
        email: user.email,
        id: user._id,
        code: inviteCodeRef.current.value
      }
      const res = await post('/api/joinBooky', info)
      const data = await res.json()
      if (res.status !== 200) {
        setError(data.message)
      } else {
        getJoinedBookies()
        onClose()
      }
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
                placeholder='Invite code'
                className='input'
                ref={inviteCodeRef}
              />}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='text-md text-red-500 mr-8 '>{error}</div>
          <Button variant='ghost' onClick={createOrJoinBooky}>{createOrJoin}</Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default CreateJoinModal