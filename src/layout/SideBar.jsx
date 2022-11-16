/* eslint-disable react-hooks/exhaustive-deps */
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import UserBox from '../components/sidebar/UserContainer'
import { MainContext } from '../context/MainContext'
import { get, post } from '../plugins/http'

const SideBar = ({ isOpen, onClose }) => {

  const [users, setUsers] = useState();
  const { user, bookyName, setBookyName } = useContext(MainContext);
  const router = useRouter();

  const getAllUsers = async () => {
    if (bookyName) {
      const res = await get('/api/getBookyUsers/' + bookyName);
      const data = await res.json();
      setUsers(data.result);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, [bookyName]);

  const leaveBooky = async () => {
    const userData = {
      id: user._id,
      bookyName,
      email: user.email
    }
    const res = await post('api/leaveBooky/', userData);
    const data = await res.json();
    if (res.status !== 200) {
      console.log(data.message)
    } else {
      onClose();
      localStorage.setItem('bookyName', '')
      router.push('/Profile');
      setBookyName('')
    }
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent className='dark:bg-zinc-700 dark:text-white' >
          <DrawerCloseButton />
          <DrawerHeader>{bookyName} members:</DrawerHeader>
          <DrawerBody>
            {users?.map((x, i) => <UserBox id={x} key={i}></UserBox>)}
          </DrawerBody>
          <DrawerFooter>
            <div className='flex gap-x-5 mx-auto items-center'>
              <h1 className='text-xl'>Leave <span className='text-orange-500'>{bookyName}</span></h1>
              <Button colorScheme='red' onClick={leaveBooky}>Leave</Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )

}
export default SideBar