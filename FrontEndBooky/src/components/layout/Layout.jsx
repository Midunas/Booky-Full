import React, { useState } from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar';


const Layout = ({
  children,
}) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (

    <div>
      <NavBar setIsDrawerOpen={setIsDrawerOpen} />
      <SideBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}></SideBar>
      <main>{children}</main>
    </div>

  )
}

export default Layout;