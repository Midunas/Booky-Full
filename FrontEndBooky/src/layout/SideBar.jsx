import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import React from 'react'

const SideBar = ({ isOpen, onClose }) => {

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
            {/* <UserCard setIsShown={setIsShown} item={user} /> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )

}
export default SideBar