import React, { useState } from 'react'
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Tooltip,
  Button,
} from '@chakra-ui/react';
import EditProfileCard from './EditProfileCard';


const UserCard = ({ item, onOpen, setCreateOrJoin }) => {

  const openCreateOrJoinModal = (creatOrJoin) => {
    setCreateOrJoin(creatOrJoin)
    onOpen()
  }

  const [isShown, setIsShown] = useState(false)

  return (
    <Box className='flex gap-x-8 align-center justify-center mt-20 mb-10'>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        className='dark:bg-zinc-600 dark:text-white'
      >
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Tooltip label="Change profile picture" aria-label='A tooltip'>
            <Avatar
              size={'xl'}
              src={item && item.photo}
              alt={'Author'}
              css={{
                border: '2px solid white', cursor: 'pointer'
              }}
              onClick={() => setIsShown(current => !current)}
            />
          </Tooltip>
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Tooltip label="Change username" aria-label='A tooltip'>
              <Heading
                css={{ cursor: 'pointer' }}
                fontSize={'2xl'}
                fontWeight={500}
                fontFamily={'body'}
                onClick={() => setIsShown(current => !current)}>
                {item && item.username}
              </Heading>
            </Tooltip>
            <Text color={'gray.500'}>{item && item.email}</Text>
          </Stack>
        </Box>
        <div className='flex justify-evenly'>
          <Button
            className='dark:bg-zinc-500'
            onClick={() => openCreateOrJoinModal('Join')}>Join a booky</Button>
          <Button
            className='dark:bg-zinc-500'
            onClick={() => openCreateOrJoinModal('Create')}>Create a booky</Button>
        </div>
      </Box>
      {isShown &&
        <EditProfileCard setIsShown={setIsShown} />
      }
    </Box>
  )

}

export default UserCard