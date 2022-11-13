import connect from '../../lib/mongodb'
import User from '../../model/userSchema'
var cookie = require('cookie');

connect()

export default async function handler(req, res) {

  const cookies = cookie.parse(req.headers.cookie || '')
  const email = cookies.userToken

  const userExists = await User.findOne({ email })

  if (!userExists) {
    return res.status(400).send({ error: true, message: "user doesn't exist" });
  }
  else {
    res.status(200).json({ userExists })
  }

}