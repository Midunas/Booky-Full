import { Button, Input } from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import MainContext from '../../context/MainContext'
import { post } from '../../plugins/http'

const EditProfileCard = ({ setIsShown }) => {

  const newNameRef = useRef()
  const newPhotoRef = useRef()
  const { user, getUser } = useContext(MainContext)

  const updateBooky = async () => {
    const newInfo = {
      username: newNameRef.current.value,
      photo: newPhotoRef.current.value,
      id: user._id,
      email: user.email,

    }
    const userSecret = localStorage.getItem("secret")
    await post('updateProfile', newInfo)
    setIsShown(false)
    getUser(userSecret)
  }

  return (

    <div
      className='flex flex-col gap-2 text-center ' >
      <h1 className='text-2xl dark:text-white'>Edit profile</h1>
      <Input
        variant='filled'
        className='dark:text-white dark:bg-zinc-800'
        placeholder='New username'
        ref={newNameRef} />
      <Input
        variant='filled'
        className='dark:text-white dark:bg-zinc-800'
        placeholder='New profile picture url'
        ref={newPhotoRef} />
      <Button colorScheme='blue' onClick={updateBooky}>Save</Button>
      <Button onClick={() => setIsShown(false)} colorScheme='red'>Cancel</Button>
    </div>

  )
}

export default EditProfileCard