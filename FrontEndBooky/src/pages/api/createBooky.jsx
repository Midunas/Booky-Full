import Bookies from '../../model/bookySchema'
import connect from '../../lib/mongodb'
const random = require('random-string-alphanumeric-generator')

connect()

export default async function handler(req, res) {

  const { bookyName, id, email } = req.body

  const inviteCode = random.randomAlphanumeric(6, "uppercase")

  new Bookies({
    bookyName,
    createdBy: email,
    members: id,
    inviteCode
  }).save()

  return res.status(200).json({ message: "Booky Created" })
}