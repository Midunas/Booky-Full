import Events from '../../model/eventSchema'
import connect from '../../lib/mongodb'


export default async function handler(req, res) {
  await connect()
  const { id, eventName, email } = req.body
  const userMadeTheEvent = await Events.findOne({ _id: id, email })
  if (userMadeTheEvent) {
    await Events.findOneAndUpdate({ _id: id }, { $set: { eventName } }, { new: true })

    return res.status(200).json({ message: 'Event updated' })
  }
  return res.status(401).json({ message: 'You can only edit your own bookies.' })

}