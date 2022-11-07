/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react'
import {MainContext} from '../../context/MainContext'
import UserCard from './UserCard'
import UserBookies from './UserBookies'
import CreateJoinModal from './CreateJoinModal'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { get } from '../../plugins/http'

const Profile = () => {

  const { user } = useContext(MainContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createOrJoin, setCreateOrJoin] = useState()
  const [createdBookies, setCreatedBookies] = useState([])
  const [joinedBookies, setJoinedBookies] = useState([])

  const getCreatedBookies = async () => {
    const res = await get(`getAllCreated/${user && user.email}`)
    const data = await res.json()
    setCreatedBookies(data.bookiesExist)
  }
  const getJoinedBookies = async () => {
    if (user) {
      const res = await get(`getAllJoined/${user._id}/${user.email}`)
      const data = await res.json()
      setJoinedBookies(data.result)
    }
  }
  useEffect(() => {
    getCreatedBookies()
    getJoinedBookies()
  }, [user])

  return (
    <div className='mt-10'>
      <CreateJoinModal
        getJoinedBookies={getJoinedBookies}
        getCreatedBookies={getCreatedBookies}
        createOrJoin={createOrJoin}
        isOpen={isOpen}
        onClose={onClose} />
      <UserCard
        setCreateOrJoin={setCreateOrJoin}
        item={user}
        onOpen={onOpen}
      />
      <div className='flex justify-around' >
        <UserBookies bookies={createdBookies} heading='Your bookies'></UserBookies>
        <UserBookies bookies={joinedBookies} heading='Joined bookies'></UserBookies>
      </div>
    </div>
  )
}

export default Profile