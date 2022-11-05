import React from 'react'
import { Link } from 'react-router-dom'
import authHeaderLogo from '../../images/authHeaderLogo.webp'

const Header = ({
  heading,
  paragraph,
  linkName,
  linkUrl,
  error }) => {

  return (
    <div className="mb-10 text-gray-800 dark:text-white">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-20 w-20"
          src={authHeaderLogo} />
      </div>
      <h1 className="text-3xl">
        {heading}
      </h1>
      <p className=" mt-2 text-center">
        {paragraph}
        <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
          {linkName}
        </Link>
      </p>
      <div className='text-md text-red-500 h-2 mt-2 -mb-4 '>{error}</div>
    </div>
  )
}

export default Header