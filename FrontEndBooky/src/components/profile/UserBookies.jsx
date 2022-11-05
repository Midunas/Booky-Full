import React from 'react'
import { Grid } from '@chakra-ui/react'
import darkBooky from '../../images/darkBooky.JPG'
import lightBooky from '../../images/lightBooky.JPG'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'
import { useNavigate } from 'react-router-dom'

const UserBookies = ({ heading, bookies }) => {

  const { theme } = useContext(MainContext)
  const navigate = useNavigate()

  const goToBookyPage = (bookyName) => {
    localStorage.setItem('bookyName', bookyName)
    navigate(`/`)
  }

  return (
    <div className='w-2/5 dark:text-white'>
      <h1 className='text-3xl text-center mb-5'>{heading}</h1>
      <Grid templateColumns='repeat(2, 1fr)' w='100%' gap={6}>
        {bookies && bookies.map((x, i) =>
          <div key={i}>
            <h1 className='text-xl'>{x.bookyName}</h1>
            <img
              onClick={() => goToBookyPage(x.bookyName)}
              className='rounded cursor-pointer'
              src={theme === 'light' ? lightBooky : darkBooky}
              alt="calendar" />
          </div>)}
      </Grid>
    </div>
  )
}

export default UserBookies;