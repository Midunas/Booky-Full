/* eslint-disable react-hooks/exhaustive-deps */
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import React, { } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import UserBox from '../components/sidebar/UserContainer'
import { get } from '../plugins/http'

const SideBar = ({ isOpen, onClose }) => {

  const bookyName = localStorage.getItem('bookyName')
  const [users, setUsers] = useState()

  const getAllUsers = async () => {
    if (bookyName) {
      const res = await get('getBookyUsers/' + bookyName)
      const data = await res.json()
      setUsers(data.result)
    }
  }
  useEffect(() => {
    getAllUsers()
  }, [bookyName])

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
            {users && users.map((x, i) => <UserBox id={x} key={i}></UserBox>)}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )

}
export default SideBar