import Bookies from '../../../../model/bookySchema'
import connect from '../../../../lib/mongodb'



export default async function handler(req, res) {
  await connect()
  const bookiesExist = await Bookies.find({ members: req.query.id })

  if (bookiesExist) {
    const result = bookiesExist.filter((x) => x.createdBy !== req.query.email)
    return res.status(200).json({ result })
  } else {
    return res.status(400).json({ message: "Booky not found" })
  }

}
