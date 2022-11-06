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
  Tooltip,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { get } from '../plugins/http';

const NavBar = () => {

  const navigate = useNavigate()
  const localEmail = localStorage.getItem("email")
  const isLoggedIn = localStorage.getItem("logedIn")
  const bookyName = localStorage.getItem("bookyName")

  const { colorTheme, setTheme } = useContext(MainContext)
  const { user, setUser } = useContext(MainContext)

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
  function goToMainPage() {
    if (isLoggedIn === "true" && bookyName) {
      navigate('/')
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
            <Tooltip
              label='Make sure to select a booky!'>
              <h1
                className='text-5xl'
                style={{ flexGrow: 1, color: '#FF6900', ml: -10, mr: 4, cursor: 'pointer' }}
                onClick={goToMainPage}>Booky</h1>
            </Tooltip>
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
                  <button className='ml-2' onClick={goToProfile}>Profile</button>
                  <MenuDivider />
                  <Switch
                    className='ml-2'
                    onChange={() => setTheme(colorTheme)}
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