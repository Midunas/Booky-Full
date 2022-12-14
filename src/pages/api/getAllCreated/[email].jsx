import Bookies from '../../../model/bookySchema'
import connect from '../../../lib/mongodb'


export default async function handler(req, res) {
  await connect()
  const { query } = req
  const { email } = query

  const bookiesExist = await Bookies.find({ createdBy: email })

  if (bookiesExist) {
    return res.status(200).json({ bookiesExist })
  } else {
    return res.status(400).json({ message: "User hasn't created a booky" })
  }

}
