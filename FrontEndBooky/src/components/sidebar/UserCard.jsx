import { Avatar } from '@chakra-ui/react'
import React from 'react'

const UserCard = ({ item }) => {

  //TODO: Get email on avatar click? 

  return (
    <div className='mt-2'>
      <Avatar
        size={'xl'}
        src={item && item.photo}
        alt={'Author'}
        css={{
          border: '2px solid white', cursor: 'pointer'
        }}
      />
      <h1 className='text-lg ml-1'>{item.username}</h1>
    </div>
  )
}

export default UserCard