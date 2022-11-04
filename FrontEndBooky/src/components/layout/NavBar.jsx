/* eslint-disable no-unused-vars */
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Switch,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../../context/MainContext';
import useDarkMode from '../../hook/useDarkMode';
import { get } from '../../plugins/http';

const NavBar = ({ onOpen }) => {

  const navigate = useNavigate()
  const localEmail = localStorage.getItem("email")
  const isLoggedIn = localStorage.getItem("logedIn")
  const [colorTheme, setTheme] = useDarkMode()
  const [checked, setChecked] = useState(false);
  const { user, setUser, getCurrentTheme } = useContext(MainContext)


  //TODO: currentTheme is undefined on first load, fix it . 
  //TODO: light, dark theme works backwards
  const logInOrOut = () => {
    if (localEmail) {
      get("logout").then(() => {
        localStorage.clear()
        localStorage.setItem('logedIn', false)
        localStorage.setItem("autologin", false)
        setUser('')
        navigate('/')
      })
    } else {
      navigate('/login')
      localStorage.setItem('logedIn', false)
    }
  }
  function goToWelcome() {
    if (isLoggedIn === "true") {
      navigate('/')
    } else {
      navigate("/login")
    }
  }
  const handleChange = (event) => {
    setChecked(event.target.checked);
    getCurrentTheme()
    if (event.target.checked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  const goToProfile = () => {
    navigate('/profile')
  }
  return (
    <>
      <Box className='bg-white dark:bg-zinc-800 dark:text-white' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <h1
              className='text-5xl'
              style={{ flexGrow: 1, color: '#FF6900', ml: -10, mr: 4, cursor: 'pointer' }}
              onClick={goToWelcome}>Booky</h1>
          </HStack>
          <Flex alignItems={'center'}>
            <button className='text-xl mr-5' onClick={logInOrOut}>{isLoggedIn === "true" ? 'Logout' : 'Login'}</button>
            {localEmail &&
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}>
                  <Avatar
                    size={'sm'}
                    src={user && user.photo}
                  />
                </MenuButton>
                <MenuList className='text-xl dark:bg-zinc-700 dark:text-white'>
                  <button className='ml-2' onClick={onOpen}>Profile Sidebar</button>
                  <MenuDivider />
                  <button className='ml-2' onClick={goToProfile}>Profile Page</button>
                  <MenuDivider />
                  <Switch
                    className='ml-2'
                    checked={checked}
                    onChange={handleChange}
                  >Mode:
                  </Switch>
                  {colorTheme === "dark" ?
                    <SunIcon className='ml-2' /> : <MoonIcon className='ml-2' />
                  }
                </MenuList>
              </Menu>}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default NavBar