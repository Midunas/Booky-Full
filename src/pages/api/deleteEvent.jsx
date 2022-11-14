import Events from '../../model/eventSchema'
import connect from '../../lib/mongodb'


export default async function handler(req, res) {
  await connect()
  const { id, email } = req.body
  const userMadeTheEvent = await Events.findOne({ _id: id, email })
  if (userMadeTheEvent) {
    await Events.deleteOne({ _id: id })
    return res.status(200).json({ message: 'All good' })

  } else {
    return res.status(401).json({ message: 'You can only remove your own bookies.' })
  }
}