import React, { useContext, useState } from 'react'
import { Grid, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTheme } from "next-themes";
import cookie from 'js-cookie'

const UserBookies = ({ heading, bookies }) => {

  const [isShown, setIsShown] = useState(false)
  const [isNowOpen, setIsOpen] = useState(false)
  // const { colorTheme } = useContext(MainContext)
  const { systemTheme, theme } = useTheme();
  const router = useRouter()
  const currentTheme = theme === "system" ? systemTheme : theme;

  const goToBookyPage = (bookyName) => {
    localStorage.setItem('bookyName', bookyName)
    //todo: set cookies
    cookie.set("bookyName", bookyName, { expires: 1 / 24 })
    router.push('/')
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
              src={currentTheme === 'dark' ? '/darkBooky.JPG' : '/lightBooky.JPG'}
              alt='calendar'
              onClick={() => goToBookyPage(x.bookyName)}
              className='rounded cursor-pointer'
            ></img>
          </div>)}
      </Grid>
    </div>
  )
}

export default UserBookies;