import React from 'react'
import { Grid } from '@chakra-ui/react'
import darkBooky from '../images/darkBooky.JPG'

const UserBookies = ({ heading, bookies }) => {

  return (
    <div className='w-2/5'>
      <h1 className='text-2xl text-center mb-5'>{heading}</h1>
      <Grid templateColumns='repeat(2, 1fr)' w='100%' gap={6}>
        {bookies && bookies.map((x, i) =>
          <div key={i}>
            <h1>{x.bookyName}</h1>
            <img className='rounded' src={darkBooky} alt="" />
          </div>)}
      </Grid>
    </div>
  )
}

export default UserBookies;