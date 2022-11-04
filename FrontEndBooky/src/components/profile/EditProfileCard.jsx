import { Button, Input } from '@chakra-ui/react'
import React, { useRef } from 'react'

const EditProfileCard = ({ setIsShown }) => {

  const newNameRef = useRef()
  const newPhotoRef = useRef()

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
      <Button colorScheme='blue'>Save</Button>
      <Button onClick={() => setIsShown(false)} colorScheme='red'>Cancel</Button>
    </div>

  )
}

export default EditProfileCard