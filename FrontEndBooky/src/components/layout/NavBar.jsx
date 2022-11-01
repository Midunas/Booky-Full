import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { get } from '../../plugins/http';

const NavBar = ({ setIsDrawerOpen }) => {

  const navigate = useNavigate()
  const localEmail = localStorage.getItem("email")
  const isLoggedIn = localStorage.getItem("logedIn")

  const logInOrOut = () => {

    if (localEmail) {
      get("logout").then(res => {
        localStorage.clear()
        localStorage.setItem('logedIn', false)
        localStorage.setItem("autologin", false)
        navigate('/')
      })
    } else {
      navigate('/login')
      localStorage.setItem('logedIn', false)
    }
  }
  function goToWelcome() {
    if (isLoggedIn === "true") {
      navigate('/Booky')
    } else {
      navigate("/")
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className='bg-white dark:bg-neutral-700 ' >
        <Toolbar sx={{
          width: '50%',
          height: 30,
          mx: 'auto',
        }}>
          <h1
            className='text-5xl'
            style={{ flexGrow: 1, color: '#FF6900', ml: -10, mr: 4, cursor: 'pointer' }}
            onClick={goToWelcome}>
            Booky
          </h1>
          <button className='text-2xl text-black' onClick={logInOrOut}>{isLoggedIn === "true" ? 'Logout' : 'Login'}</button>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ ml: 2, display: isLoggedIn === 'true' ? 'block' : 'none' }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box >
  )
}

export default NavBar