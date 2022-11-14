import connect from '../../lib/mongodb'
import User from '../../model/userSchema'
import { uid } from 'uid';
import cookie from 'cookie'

export default async function handler(req, res) {
  await connect()

  //TODO: Set up validation 
  //TODO: Make registration and login same api route

  const { email, password, username } = req.body
  const emailAlreadyExists = await User.findOne({ email })

  if (emailAlreadyExists) {
    return res.status(401).json({ message: "Email is taken" })
  }

  await (new User({
    email,
    username,
    password,
    secret: uid(),
  })).save()

  res.setHeader("Set-Cookie", cookie.serialize("userToken", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60,
    sameSite: "strict",
    path: '/'
  }))

  return res.status(200).json({ message: 'User created' })


}