import React, { useContext, useState } from 'react'
import { Grid, Tooltip } from '@chakra-ui/react'
import darkBooky from '../../images/darkBooky.JPG'
import lightBooky from '../../images/lightBooky.JPG'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../../context/MainContext'

const UserBookies = ({ heading, bookies }) => {

  const navigate = useNavigate()
  const [isShown, setIsShown] = useState(false)
  const [isNowOpen, setIsOpen] = useState(false)
  const { colorTheme } = useContext(MainContext)

  const goToBookyPage = (bookyName) => {
    localStorage.setItem('bookyName', bookyName)
    navigate(`/`)
  }

  const copyInviteCode = (event) => {
    setIsOpen(true)
    setIsShown(false)
    navigator.clipboard.writeText(event.target.textContent)
    setTimeout(() => setIsOpen(false), 3000)
  }
  return (

    <div className='w-2/5 dark:text-white'>
      <Tooltip
        isOpen={isNowOpen}
        label="Code copied to clipboard!">
        <h1 className='text-3xl text-center mb-10'>{heading}</h1>
      </Tooltip>
      <Grid templateColumns='repeat(2, 1fr)' w='100%' gap={6} >
        {bookies && bookies.map((x, i) =>
          <div key={i}>
            <div className='flex justify-between cursor-pointer '>
              <Tooltip label="See invite code" >
                <h1
                  className='text-xl mb-2'
                  onClick={() => setIsShown(prev => !prev)}
                >{x.bookyName}</h1>
              </Tooltip>
              <Tooltip label="Copy code">
                <h1
                  className='text-xl cursor-pointer text-amber-600'
                  style={{ display: isShown ? 'block' : 'none' }}
                  onClick={copyInviteCode}
                > {x.inviteCode}</h1>
              </Tooltip>
            </div>
            <img
              onClick={() => goToBookyPage(x.bookyName)}
              className='rounded cursor-pointer'
              src={colorTheme === 'dark' ? lightBooky : darkBooky}
              alt="calendar" />
          </div>)}
      </Grid>
    </div>
  )
}

export default UserBookies;