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
import Link from 'next/link';

const NavBar = ({ onOpen }) => {

  const router = useRouter()

  const { colorTheme } = useContext(MainContext)
  const { user, setUser, bookyName } = useContext(MainContext)

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
    router.push('/')
    setUser('')
  }
  return (
    <>
      <Box className='bg-white dark:bg-zinc-800 dark:text-white' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link
              className='text-5xl'
              style={{ flexGrow: 1, color: '#FF6900', ml: -10, mr: 4, cursor: 'pointer' }}
              href='/Profile'>Booky</Link>
          </HStack>
          <Flex alignItems={'center'}>
            {user &&
              <>
                <button className='text-xl mr-5' onClick={logOut}>Logout</button>
                <MenuItems
                  colorTheme={colorTheme}
                  user={user}
                  bookyName={bookyName}
                  onOpen={onOpen}
                  goToProfile={goToProfile}
                />
              </>
            }
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default NavBar