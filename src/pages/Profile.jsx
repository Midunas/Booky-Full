/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/MainContext';
import UserCard from '../components/profile/UserCard';
import UserBookies from '../components/profile/UserBookies';
import CreateJoinModal from '../components/profile/CreateJoinModal';
import { useDisclosure } from '@chakra-ui/react';
import { get } from '../plugins/http';

const Profile = () => {

  const { user } = useContext(MainContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createOrJoin, setCreateOrJoin] = useState();
  const [createdBookies, setCreatedBookies] = useState([]);
  const [joinedBookies, setJoinedBookies] = useState([]);

  const getCreatedBookies = async () => {
    const res = await get(`/api/getAllCreated/${user?.email}`);
    const data = await res.json();
    setCreatedBookies(data.bookiesExist);
  }
  const getJoinedBookies = async () => {
    if (user) {
      const res = await get(`/api/getAllJoined/${user._id}/${user.email}`);
      const data = await res.json();
      setJoinedBookies(data.result);
    }
  }
  useEffect(() => {
    getCreatedBookies();
    getJoinedBookies();
  }, [user]);

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