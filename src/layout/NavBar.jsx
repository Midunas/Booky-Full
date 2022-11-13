/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/MainContext';
import MenuItems from './MenuItems';
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavBar = ({ onOpen }) => {

  const router = useRouter()


  let bookyName = ''

  const { colorTheme } = useContext(MainContext)
  const { user } = useContext(MainContext)
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      bookyName = localStorage.getItem("bookyName")
    }
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon className="w-10 h-10" onClick={() => setTheme('light')} />
      )
    }

    else {
      return (
        <MoonIcon className="w-10 h-10" onClick={() => setTheme('dark')} />
      )
    }
  };

  // const logInOrOut = () => {
  //   if (localEmail) {
  //     get("logout").then(() => {
  //       localStorage.clear()
  //       setUser('')
  //       router.push('/')
  //     })
  //   } else {
  //     router.push('/Login')
  //     localStorage.setItem('logedIn', false)
  //   }
  // }
  function goToMainPage() {
    if (bookyName) {
      router.push('/')
    }
  }
  const goToProfile = () => {
    router.push('/Profile')
  }

  function logOut() {
    fetch("/api/logout", {
      method: 'post',
      headers: {
        "Content-Type": "application/jason",
      },
      body: JSON.stringify({})
    })
    localStorage.clear()
    router.push('/Login')

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
            {/* <button className='text-xl mr-5' onClick={logInOrOut}>{isLoggedIn === "true" ? 'Logout' : 'Login'}</button> */}
            <button className='text-xl mr-5' onClick={logOut}>Logout</button>

            <MenuItems
              setTheme={setTheme}
              colorTheme={colorTheme}
              user={user}
              goToProfile={goToProfile}
              bookyName={bookyName}
              onOpen={onOpen}
              renderThemeChanger={renderThemeChanger}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default NavBar