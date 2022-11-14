import React, { useContext } from 'react'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Switch,
} from '@chakra-ui/react';
import { MainContext } from '../context/MainContext';

const MenuItems = ({ renderThemeChanger, user, goToProfile, onOpen }) => {

  const { bookyName } = useContext(MainContext)

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}>
          <Avatar
            size={'sm'}
            src={user?.photo}
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
          {/* <Switch
              className='ml-2'
              onChange={() => setTheme(colorTheme)}
            >Mode:
            </Switch> */}
          <MenuDivider />
          {renderThemeChanger()}
        </MenuList>
      </Menu>
    </>
  )
}

export default MenuItems