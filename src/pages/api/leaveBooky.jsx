import Bookies from '../../model/bookySchema'
import connect from '../../lib/mongodb'
import Events from '../../model/eventSchema'

export default async function handler(req, res) {

  await connect()
  const { bookyName, id, email } = req.body

  const bookyExists = await Bookies.find({ bookyName })

  if (!bookyExists.length) {
    return res.status(404).json({ message: 'Something went wrong' })
  }
  if (bookyExists[0].createdBy === email) {
    return res.status(401).json({ message: `You can delete ${bookyName} Booky page` })
  }

  await Bookies.findOneAndUpdate({ bookyName }, { $pull: { members: id } }, { new: true })
  await Events.deleteMany({ bookyName, email })
  return res.status(200).json({ message: 'User left Booky' })

}