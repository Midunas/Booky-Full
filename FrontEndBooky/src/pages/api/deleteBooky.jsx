import Bookies from '../../model/bookySchema'
import connect from '../../lib/mongodb'
connect()

export default async function handler(req, res) {

  const { bookyName, email } = req.body

  const bookyExists = await Bookies.find({ bookyName })
  if (!bookyExists.length) {
    return res.status(404).json({ message: 'Something went wrong' })
  }
  if (bookyExists[0].createdBy !== email) {
    return res.status(401).json({ message: 'You don`t have permission to delete this Booky' })
  }
  await Bookies.deleteOne({ bookyName })
  return res.status(200).json({ message: 'Booky deleted' })

}