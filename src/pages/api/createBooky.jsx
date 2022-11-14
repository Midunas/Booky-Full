import Bookies from '../../model/bookySchema'
import connect from '../../lib/mongodb'
const random = require('random-string-alphanumeric-generator')



export default async function handler(req, res) {
  await connect()
  const { bookyName, id, email } = req.body

  const bookyNameIsTaken = await Bookies.find({ bookyName })

  if (bookyNameIsTaken.length > 0) {
    return res.status(401).json({ message: "Booky name is already taken" })
  }
  const inviteCode = random.randomAlphanumeric(6, "uppercase")

  new Bookies({
    bookyName,
    createdBy: email,
    members: id,
    inviteCode
  }).save()

  return res.status(200).json({ message: "Booky Created" })
}