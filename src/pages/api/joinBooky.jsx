import Bookies from '../../model/bookySchema'
import connect from '../../lib/mongodb'

export default async function handler(req, res) {
  await connect()

  const { bookyName, id, email, code } = req.body

  const bookyExists = await Bookies.find({ bookyName })

  if (bookyExists.length < 0) {
    return res.status(401).json({ message: "Incorrect booky name" })
  }

  if (bookyExists[0].members.includes(id)) {
    return res.status(401).json({ message: 'You already joined this Booky!' })
  }

  const inviteCodeMatches = await Bookies.find({ bookyName, inviteCode: code })

  if (!inviteCodeMatches.length > 0) {
    return res.status(401).json({ message: "Incorrect invite code" })
  }

  if (bookyExists[0].inviteCode === code) {
    if (email !== bookyExists.createdBy) {
      await Bookies.updateOne({ bookyName }, { $push: { members: id } })
      return res.status(200).json({ message: "Joined Booky" })
    } else {
      return res.status(401).json({ message: "Unauthorized" })
    }
  }
  return res.status(401).json({ message: "Unauthorized" })

}