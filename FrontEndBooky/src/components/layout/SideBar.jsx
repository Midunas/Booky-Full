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
import React, { useEffect, useRef, useState } from 'react'
import { get, post } from '../../plugins/http';
import UserCard from '../UserCard';

const SideBar = ({ isOpen, onClose }) => {

  const [user, setUser] = useState([])
  const [isShown, setIsShown] = useState(false)

  const newNameRef = useRef()
  const newPhotoRef = useRef()

  async function getUser() {
    const secret = localStorage.getItem("secret")
    if (secret) {
      const res = await get("getUser/" + secret)
      setUser(res.userExists)
    }
  }
  useEffect(() => {
    getUser()
  }, [user])

  async function updateProfile() {
    const newUser = {
      id: user[0]._id,
      username: newNameRef.current.value,
      photo: newPhotoRef.current.value
    }
    const data = await post('updateProfile', newUser)
    console.log(data)
    setIsShown(false)
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
          <DrawerCloseButton />
          <DrawerHeader>Your profile</DrawerHeader>
          <DrawerBody>
            {user.map((x, i) => <UserCard key={i} setIsShown={setIsShown} item={x} />)}
            {isShown &&
              <div
                className='flex flex-col gap-2' >
                <h1 className='text-2xl dark:text-white'>Edit profile</h1>
                <Input className='dark:text-white' placeholder='New username' ref={newNameRef} />
                <Input className='dark:text-white' placeholder='New profile picture url' ref={newPhotoRef} />
                <Button onClick={updateProfile} colorScheme='blue'>Save</Button>
              </div>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )

}
export default SideBar