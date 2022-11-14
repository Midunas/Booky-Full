/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import BookTime from '../components/booktime/BookTime'
import BookyHeader from '../components/calendar/BookyHeader';
import DeleteBookyModal from '../components/calendar/DeleteBookyModal';
import TimeBar from '../components/calendar/TimeBar';
import { MainContext } from '../context/MainContext';
import { post } from '../plugins/http';

const Booky = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [count, setCount] = useState(1)
  const [isShown, setIsShown] = useState()
  const [error, setError] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { user, setBookyName, bookyName } = useContext(MainContext)

  const deleteBooky = async () => {
    const bookyToDelete = {
      email: user.email,
      bookyName,
    }
    const res = await post("/api/deleteBooky", bookyToDelete)
    const data = await res.json()
    if (res.status === 200) {
      router.push('/Profile')
      setBookyName('')
      setError('')
    }
    setError(data.message)
  }

  return (
    <div className='max-w-[1980px] mx-auto'>
      <DeleteBookyModal
        deleteBooky={deleteBooky}
        onClose={onClose}
        isOpen={isOpen}
        error={error}
        setError={setError}
        setIsShown={setIsShown}
        warning='After deleting this Booky, you will no longer be able to access it, are you sure?'
      />
      <div className='mt-16 flex flex-wrap items-center justify-around'>
        <div className='overflow-x-auto w-[980px] mb-20'>
          <BookyHeader
            setIsShown={setIsShown}
            isShown={isShown}
            onOpen={onOpen}
          />
          {days?.map((x, i) =>
            <TimeBar setCount={setCount} count={count} key={i} id={x} />
          )}
        </div>
        <BookTime count={count} setCount={setCount}></BookTime>
      </div>
    </div>
  )
}

export default Booky
