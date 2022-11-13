import { Button, Tooltip } from '@chakra-ui/react'
import React from 'react'

const BookyHeader = ({ setIsShown, bookyName, isShown, onOpen }) => {
  return (
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
          <Button colorScheme='blue' onClick={() => setIsShown(false)}>Cancel</Button>
        </div>
      }
    </div>
  )
}

export default BookyHeader