import Events from '../../model/eventSchema'
import connect from '../../lib/mongodb'


export default async function handler(req, res) {
  await connect()
  const newReservation = new Events(req.body)
  const post = await newReservation.save()
  return res.status(200).json({ post })

}