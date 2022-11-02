import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../../hook/useDarkMode';
import { get } from '../../plugins/http';

// const NavLink = ({ children }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       // bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

const NavBar = ({ onOpen }) => {
  const navigate = useNavigate()
  const localEmail = localStorage.getItem("email")
  const isLoggedIn = localStorage.getItem("logedIn")
  const [colorTheme, setTheme] = useDarkMode()
  const [checked, setChecked] = useState(false);

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

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked === true) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  };
  return (
    <>
      <Box className='bg-white dark:bg-zinc-800' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <h1
              className='text-5xl'
              style={{ flexGrow: 1, color: '#FF6900', ml: -10, mr: 4, cursor: 'pointer' }}
              onClick={goToWelcome}>Booky</h1>
          </HStack>
          <Flex alignItems={'center'}>
            <button className='text-2xl text-black dark:text-white mr-5' onClick={logInOrOut}>{isLoggedIn === "true" ? 'Logout' : 'Login'}</button>
            {localEmail &&
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <Switch
                    checked={checked}
                    onChange={handleChange}>Mode</Switch>
                  <MenuItem>
                    <button onClick={onOpen}>Sidebar</button>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default NavBar