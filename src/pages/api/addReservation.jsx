import Events from '../../model/eventSchema'
import connect from '../../lib/mongodb'

export default async function handler(req, res) {
  await connect()

  const { eventStart, eventEnd, bookyName, eventDay } = req.body

  const duration = eventEnd - eventStart

  if (duration < 1) {
    return res.status(400).json({ message: "Cannot book less than an hour" })
  }

  const existingBookies = await Events.find({ eventDay, bookyName })

  if (existingBookies.length > 0) {

    const overlap = existingBookies.map((booky) => {
      if (booky.eventStart < eventEnd && booky.eventEnd > eventStart) {
        return true;
      }
      return false;
    })
    const atLeastOneOverlaps = overlap.reduce((current, next) => current || next, false)

    if (atLeastOneOverlaps) {
      return res.status(400).json({ message: "Times overlap" })
    }
  }

  const newReservation = new Events(req.body)
  const post = await newReservation.save()
  return res.status(200).json({ post })

}