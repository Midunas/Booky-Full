import Events from '../../model/eventSchema'

connect()

export default async function handler(req, res) {

  const newReservation = new Events(req.body)
  const post = await newReservation.save()
  return res.status(200).json({ post })

}