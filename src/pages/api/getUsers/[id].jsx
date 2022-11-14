import User from '../../../model/userSchema'
import connect from '../../../lib/mongodb'



export default async function handler(req, res) {
  await connect()
  const { query } = req
  const { id } = query

  const users = await User.find({ _id: id })

  return res.status(200).json({ users })

}
