import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({
  heading,
  paragraph,
  linkName,
  linkUrl }) => {

  return (
    <div className="mb-10 text-gray-800">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-20 w-20"
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315" />
      </div>
      <h1 className="text-3xl">
        {heading}
      </h1>
      <p className=" mt-2 text-center">
        {paragraph} {' '}
        <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
          {linkName}
        </Link>
      </p>
    </div>
  )
}

export default Header