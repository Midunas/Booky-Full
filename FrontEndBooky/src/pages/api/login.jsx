import connect from '../../lib/mongodb'
import User from '../../model/userSchema'
import cookie from 'cookie'

connect()

export default async function handler(req, res) {

  const { email, password } = req.body
  const userExists = await User.findOne({ email, password })

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' })
  } else {
    res.setHeader("Set-Cookie", cookie.serialize("userToken", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60,
      sameSite: "strict",
      path: '/'
    }))

    res.redirect('/Profile')
    res.status(200).json({ message: 'User logged in' })

  }
  res.status(400).json({ message: 'Unable to create new user.' })

}