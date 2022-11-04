import React from 'react'
import { Grid } from '@chakra-ui/react'
import darkBooky from '../images/darkBooky.JPG'
import lightBooky from '../images/lightBooky.JPG'
import { useContext } from 'react'
import MainContext from '../context/MainContext'

const UserBookies = ({ heading, bookies }) => {

  const { theme } = useContext(MainContext)

  return (
    <div className='w-2/5 dark:text-white'>
      <h1 className='text-2xl text-center mb-5'>{heading}</h1>
      <Grid templateColumns='repeat(2, 1fr)' w='100%' gap={6}>
        {bookies && bookies.map((x, i) =>
          <div key={i}>
            <h1>{x.bookyName}</h1>
            {theme === 'light'
              ? <img className='rounded cursor-pointer' src={darkBooky} alt="calendar" />
              : <img className='rounded cursor-pointer' src={lightBooky} alt="calendar" />}
          </div>)}
      </Grid>
    </div>
  )
}

export default UserBookies;