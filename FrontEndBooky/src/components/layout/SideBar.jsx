import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useContext } from 'react';
import MainContext from '../../context/MainContext';
import { post } from '../../plugins/http';
import UserCard from '../UserCard';

const SideBar = ({ isOpen, onClose }) => {

  //TODO: Make the edit user block pard of UserCard component

  const [isShown, setIsShown] = useState(false)
  const { user, getUser } = useContext(MainContext)
  const userSecret = localStorage.getItem("secret")

  const newNameRef = useRef()
  const newPhotoRef = useRef()


  async function updateProfile() {
    const newUser = {
      id: user._id,
      username: newNameRef.current.value,
      photo: newPhotoRef.current.value,
      email: user.email,
    }
    await post('updateProfile', newUser)
    setIsShown(false)
    getUser(userSecret)
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent className='dark:bg-zinc-700' >
          <DrawerCloseButton onClick={() => setIsShown(false)} />
          <DrawerHeader>Your profile</DrawerHeader>
          <DrawerBody>

            <UserCard setIsShown={setIsShown} item={user} />
            {isShown &&
              <div
                className='flex flex-col gap-2' >
                <h1 className='text-2xl dark:text-white'>Edit profile</h1>
                <Input className='dark:text-white' placeholder='New username' ref={newNameRef} />
                <Input className='dark:text-white' placeholder='New profile picture url' ref={newPhotoRef} />
                <Button onClick={updateProfile} colorScheme='blue'>Save</Button>
                <Button onClick={() => setIsShown(false)} colorScheme='red'>Cancel</Button>
              </div>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )

}
export default SideBar