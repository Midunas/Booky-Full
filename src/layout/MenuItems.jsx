import React, { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
} from '@chakra-ui/react';
import { MainContext } from '../context/MainContext';
import RenderThemeChanger from '../hooks/renderThemeChanger';

const MenuItems = ({ user, goToProfile, onOpen }) => {

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
            {bookyName &&
              <>
                <MenuDivider />
                <button
                  className='ml-2 text-orange-400'
                  onClick={onOpen}
                >{bookyName}</button>
              </>
            }
          </div>
          <MenuDivider />
          <div className='ml-2'>
            <span className='mr-2'>Mode</span>
            {RenderThemeChanger()}
          </div>
        </MenuList>
      </Menu>
    </>
  )
}

export default MenuItems