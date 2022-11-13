import connect from '../../lib/mongodb'
import User from '../../model/userSchema'

connect()

export default async function handler(req, res) {

  const { email, password } = req.body
  const userExists = await User.findOne({ email, password })

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' })
  } else {
    res.redirect('/Profile')
  }

  res.status(400).json({ message: 'Unable to create new user.' })

}