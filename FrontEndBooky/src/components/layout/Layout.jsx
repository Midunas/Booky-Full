import React from 'react'
import NavBar from './NavBar'

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>{children}</main>
    </div>
  )
}

export default Layout;