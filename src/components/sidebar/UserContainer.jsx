/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { get } from '../../plugins/http'
import UserCard from './UserCard'

const UserBox = ({ id }) => {

  const [data, setData] = useState()

  const getUsersById = async () => {
    const res = await get('/api/getUsers/' + id)
    const data = await res.json()
    setData(data.users)
  }
  useEffect(() => {
    getUsersById()
  }, [id])

  return (
    <div className='flex flex-col'>
      {data?.map((x, i) => <UserCard key={i} item={x} />)}
    </div>
  )
}

export default UserBox