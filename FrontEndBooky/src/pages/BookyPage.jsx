/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookTime from '../components/booktime/BookTime'
import DeleteBookyModal from '../components/calendar/DeleteBookyModal';
import TimeBar from '../components/calendar/TimeBar';
import MainContext from '../context/MainContext';
import { post } from '../plugins/http';

const BookyPage = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const navigate = useNavigate()
  const [count, setCount] = useState()
  const [isShown, setIsShown] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useContext(MainContext)

  const bookyName = localStorage.getItem("bookyName")

  useEffect(() => {
    const localEmail = localStorage.getItem("email")
    if (!localEmail) {
      alert('You are not Logged in')
      navigate('/login')
    }
    //TODO: If no bookyName, maybe disable the Booky link in NavBar instead?

    if (!bookyName) {
      alert('No booky selected')
      navigate('/profile')
    }
  },)


  const deleteBooky = async () => {
    const bookyToDelete = {
      email: user.email,
      bookyName,
    }
    const res = await post("deleteBooky", bookyToDelete)
    const data = await res.json()
    console.log(data)
    navigate('/profile')
    localStorage.removeItem('bookyName')
  }
  //TODO: MAKE IT A SEPERATE COMPONENT

  return (
    <div className='max-w-[1980px] mx-auto'>
      <DeleteBookyModal
        deleteBooky={deleteBooky}
        onClose={onClose}
        isOpen={isOpen}
        warning='After deleting this Booky, you will no longer be able to access it, are you sure?'
      />
      <div className='mt-16 flex flex-wrap items-center justify-around'>
        <div className='overflow-x-auto w-[980px] mb-20'>
          <div className='flex gap-x-3'>

            <Tooltip label='Delete booky?'>
              <h1
                className="text-3xl dark:text-white mb-2 cursor-pointer"
                onClick={() => setIsShown(prev => !prev)}
              >{bookyName}
              </h1>
            </Tooltip>
            {isShown &&
              <div className='flex gap-x-1'>
                <Button onClick={onOpen} colorScheme='red'>Delete</Button>
                <Button colorScheme='blue'>Cancel</Button>
              </div>
            }
          </div>

          {days && days.map((x, i) =>
            <TimeBar setCount={setCount} count={count} key={i} id={x} />
          )}
        </div>
        <BookTime count={count} setCount={setCount}></BookTime>
      </div>
    </div>
  )
}

export default BookyPage

