import Events from '../../model/eventSchema'
import User from '../../model/userSchema'
import connect from '../../lib/mongodb'

connect()

export default async function handler(req, res) {
  const { id, username, photo, email } = req.body

  if (photo.length > 0 && username.length === 0) {
    await User.findOneAndUpdate({ _id: id }, { $set: { photo } }, { new: true })
    await Events.updateMany({ email }, { $set: { photo } }, { new: true })
    return res.status(200).json({ message: 'User updated' })
  }
  if (username.length > 0 && photo.length === 0) {
    await User.findOneAndUpdate({ _id: id }, { $set: { username } }, { new: true })
    await Events.updateMany({ email }, { $set: { username } }, { new: true })
    return res.status(200).json({ message: 'User updated' })
  }
  if (username.length > 0 && photo.length > 0) {
    await User.findOneAndUpdate({ _id: id }, { $set: { username, photo } }, { new: true })
    await Events.updateMany({ email }, { $set: { photo, username } }, { new: true })
    return res.status(200).json({ message: 'User updated' })
  }
  return res.status(404).json({ message: 'Something went wrong' })

}