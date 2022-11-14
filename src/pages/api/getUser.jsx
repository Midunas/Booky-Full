import connect from '../../lib/mongodb'
import User from '../../model/userSchema'
var cookie = require('cookie');

export default async function handler(req, res) {

  await connect()

  const cookies = cookie.parse(req.headers.cookie || '')
  const email = cookies.userToken

  if (email) {
    const userExists = await User.findOne({ email })

    if (!userExists) {
      return res.status(400).send({ error: true, message: "user doesn't exist" });
    }
    else {
      return res.status(200).json({ userExists })
    }
  }
  return res.status(404).json({ message: 'User not found' })
}