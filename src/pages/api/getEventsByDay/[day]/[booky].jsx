import Events from '../../../../model/eventSchema'
import connect from '../../../../lib/mongodb'



export default async function handler(req, res) {
  await connect()
  const booky = req.query.booky
  const day = req.query.day

  const eventsByDay = await Events.find({ eventDay: day, bookyName: booky })
  return res.status(200).json({ eventsByDay })

}