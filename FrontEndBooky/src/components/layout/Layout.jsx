import React, { useState } from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar';


const Layout = ({
  children,
  isLoggedIn,
  setIsLoggedIn,
}) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (

    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsDrawerOpen={setIsDrawerOpen} setIsLoggedIn={setIsLoggedIn} />
      <SideBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}></SideBar>
      <main>{children}</main>
    </div>

  )
}

export default Layout;