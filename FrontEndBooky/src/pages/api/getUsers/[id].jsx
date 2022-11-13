import User from '../../../model/userSchema'
import connect from '../../../lib/mongodb'

connect()

export default async function handler(req, res) {

  const { query } = req
  const { id } = query

  const users = await User.find({ _id: id })

  return res.status(200).json({ users })

}
