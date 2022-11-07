import React from 'react'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Switch,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const MenuItems = ({ setTheme, colorTheme, localEmail, user, goToProfile, bookyName, onOpen }) => {

  return (
    <>
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
            <div style={{ display: bookyName ? 'block' : 'none' }}>
              <MenuDivider />
              <button
                className='ml-2 text-orange-400'
                onClick={onOpen}
              >{bookyName}</button>
            </div>
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
    </>
  )
}

export default MenuItems