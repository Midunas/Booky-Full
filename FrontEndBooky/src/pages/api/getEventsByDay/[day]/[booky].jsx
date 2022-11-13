import Events from '../../../../model/eventSchema'
import connect from '../../../../lib/mongodb'

connect()

export default async function handler(req, res) {

  const booky = req.query.booky
  const day = req.query.day

  const eventsByDay = await Events.find({ eventDay: day, bookyName: booky })
  return res.status(200).json({ eventsByDay })

}