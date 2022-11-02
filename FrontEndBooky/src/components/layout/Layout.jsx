import { useDisclosure } from '@chakra-ui/react';
import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar';

const Layout = ({
  children,
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (

    <div>
      <NavBar onOpen={onOpen} />
      <SideBar onClose={onClose} isOpen={isOpen}></SideBar>
      <main>{children}</main>
    </div>

  )
}

export default Layout;