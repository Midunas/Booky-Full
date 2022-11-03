import React, { useContext, useState } from 'react'
import MainContext from '../context/MainContext'
import UserCard from './UserCard'
import UserBookies from './UserBookies'
import CreateJoinModal from './CreateJoinModal'
import { useDisclosure } from '@chakra-ui/react'

const Profile = () => {

  const user = useContext(MainContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createOrJoin, setCreateOrJoin] = useState()

  //TODO: fetch createdBy bookies
  //TODO: fetch !createdBy but _id includes in array bookies
  //TODO: add join booky, create new Booky form 

  return (
    <div className='mt-10'>
      <CreateJoinModal createOrJoin={createOrJoin} isOpen={isOpen} onClose={onClose} />
      <UserCard setCreateOrJoin={setCreateOrJoin} item={user} onOpen={onOpen} isInProfile={true}></UserCard>
      <div className='flex justify-around' >
        <UserBookies heading='Your bookies'></UserBookies>
        <UserBookies heading='Joined bookies'></UserBookies>
      </div>
    </div>
  )
}

export default Profile