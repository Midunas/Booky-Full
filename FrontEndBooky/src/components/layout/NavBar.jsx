import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { get } from '../../plugins/http';

const NavBar = ({ isLoggedIn, setIsLoggedIn, setIsDrawerOpen }) => {

  const navigate = useNavigate()
  const localEmail = localStorage.getItem("email")

  const logInOrOut = () => {

    if (localEmail) {
      get("logout").then(res => {
        localStorage.setItem("autologin", false)
        localStorage.clear()
        navigate('/')
        setIsLoggedIn(false)
      })
    } else {
      navigate('/login')
      setIsLoggedIn(false)
    }
  }
  function goToWelcome() {
    navigate("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{
          width: '50%',
          height: 30,
          mx: 'auto',
        }}>
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, color: '#FF6900', ml: -10, mr: 4, cursor: 'pointer' }}
            onClick={goToWelcome}>
            Booky
          </Typography>
          <Button sx={{ color: 'black', fontSize: '25px' }} onClick={logInOrOut}>{isLoggedIn ? 'Logout' : 'Login'}</Button>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ ml: 2 }}
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