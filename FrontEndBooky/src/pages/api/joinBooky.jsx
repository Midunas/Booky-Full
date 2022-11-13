import Bookies from '../../model/bookySchema'
import connect from '../../lib/mongodb'

connect()

export default async function handler(req, res) {

  const { bookyName, id, email } = req.body

  const bookyExists = await Bookies.find({ bookyName })

  if (bookyExists.length > 0) {
    if (email !== bookyExists.createdBy) {
      await Bookies.updateOne({ bookyName }, { $push: { members: id } })
      return res.status(200).json({ message: "Joined Booky" })
    } else {
      return res.status(400).json({ message: "Booky not found" })
    }
  } else {
    return res.status(404).json({ message: "Something went wrong" })
  }

}