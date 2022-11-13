import Bookies from '../../../model/bookySchema'
import connect from '../../../lib/mongodb'

connect()

export default async function handler(req, res) {

  const { query } = req
  const { bookyName } = query

  const foundBooky = await Bookies.find({ bookyName })

  if (foundBooky) {
    const result = foundBooky[0].members
    return res.status(200).json({ result })
  } else {
    return res.status(200).json({ message: "No bookies yet" })
  }

}
