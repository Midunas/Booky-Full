const eventSchema = require("../schemas/eventSchema")
const userSchema = require("../schemas/userSchema")
const bookySchema = require("../schemas/bookySchema")
const { uid } = require("uid")
const bcrypt = require("bcrypt")
const random = require('random-string-alphanumeric-generator')


module.exports = {
  register: async (req, res) => {

    const { email, password, username } = req.body

    const emailAlreadyExists = await userSchema.findOne({ email })

    if (emailAlreadyExists) {
      return res.json({ error: true, message: "Email is taken" })
    }

    const hashPass = await bcrypt.hash(password, 10)

    await (new userSchema({
      email,
      username,
      password: hashPass,
      secret: uid(),
    })).save()

    const userExists = await userSchema.findOne({ email })

    if (!userExists) {
      return res.status(401).json({ message: "bad credentials" })
    }

    req.session.bookyName = userExists.bookyName
    req.session.email = userExists.email

    return res.status(200).json({ secret: userExists.secret, sessions: req.session })
  },
  login: async (req, res) => {

    const { email, password } = req.body
    const userExists = await userSchema.findOne({ email })

    if (!userExists) {
      return res.status(401).json({ message: "bad credentials" })
    }

    const passwordsMatch = await bcrypt.compare(password, userExists.password)

    if (!passwordsMatch) {
      return res.status(401).json({ message: "bad credentials" })
    }

    req.session.bookyName = userExists.bookyName
    req.session.email = userExists.email

    return res.status(200).json({ secret: userExists.secret, sessions: req.session })

  },
  createBooky: async (req, res) => {

    const { bookyName, id, email } = req.body

    const inviteCode = random.randomAlphanumeric(6, "uppercase")

    new bookySchema({
      bookyName,
      createdBy: email,
      secret: uid(),
      members: id,
      inviteCode
    }).save()

    return res.status(200).json({ message: "Booky Created" })

  },
  joinBooky: async (req, res) => {

    const { id, email, bookyName } = req.body

    const bookyExists = await bookySchema.find({ bookyName })

    if (bookyExists.length > 0) {
      if (email !== bookyExists.createdBy) {
        await bookySchema.updateOne({ bookyName }, { $push: { members: id } })
        return res.status(200).json({ message: "Joined Booky" })
      } else {
        return res.status(400).json({ message: "Booky not found" })
      }
    } else {
      return res.status(404).json({ message: "Something went wrong" })
    }
  },
  getAllCreated: async (req, res) => {

    const email = req.params.email
    const bookiesExist = await bookySchema.find({ createdBy: email })

    if (bookiesExist) {
      return res.status(200).json({ bookiesExist })
    } else {
      return res.status(400).json({ message: "User hasn't created a booky" })
    }

  },
  getAllJoined: async (req, res) => {

    const id = req.params.id
    const email = req.params.email

    const bookiesExist = await bookySchema.find({ members: id })
    if (bookiesExist) {
      const result = bookiesExist.filter((x) => x.createdBy !== email)
      return res.status(200).json({ result })
    } else {
      return res.status(400).json({ message: "Booky not found" })

    }
  },
  addReservation: async (req, res) => {

    const newReservation = new eventSchema(req.body)
    const post = await newReservation.save()
    return res.status(200).json({ post })

  },
  getEventByDay: async (req, res) => {

    const booky = req.params.bookyName
    const day = req.params.id
    const eventsByDay = await eventSchema.find({ eventDay: day, bookyName: booky })

    return res.status(200).json({ eventsByDay })

  },
  autoLogin: async (req, res) => {

    const { email } = req.session
    if (email) {

      const user = await userSchema.findOne({ email })
      return res.status(200).json({ secret: user.secret, email })

    }
    return res.status(401).json({ message: 'no session data' })

  },
  logout: async (req, res) => {
    req.session.email = null
    return res.status(200).json({ message: 'User logged out' })
  },
  getUser: async (req, res) => {
    const { secret } = req.params
    const userExists = await userSchema.find({ secret })

    if (!userExists.length > 0) {
      return res.status(400).send({ error: true, message: "user doesn't exist" });
    }
    return res.status(200).json({ userExists })

  },
  updateEvent: async (req, res) => {

    const { id, eventName, email } = req.body
    const userMadeTheEvent = await eventSchema.findOne({ _id: id, email })
    if (userMadeTheEvent) {
      await eventSchema.findOneAndUpdate({ _id: id }, { $set: { eventName } }, { new: true })

      return res.status(200).json({ message: 'Event updated' })
    }
    return res.status(401).json({ message: 'You can only edit your own bookies.' })

  },
  deleteEvent: async (req, res) => {

    const { id, email } = req.body
    const userMadeTheEvent = await eventSchema.findOne({ _id: id, email })

    if (userMadeTheEvent) {
      await eventSchema.deleteOne({ _id: id })
      return res.status(200).json({ message: 'All good' })

    } else {
      return res.status(401).json({ message: 'You can only remove your own bookies.' })
    }
  },
  updateProfile: async (req, res) => {

    const { id, username, photo, email } = req.body

    if (photo.length > 0 && username.length === 0) {
      await userSchema.findOneAndUpdate({ _id: id }, { $set: { photo } }, { new: true })
      await eventSchema.updateMany({ email }, { $set: { photo } }, { new: true })
      return res.status(200).json({ message: 'User updated' })
    }
    if (username.length > 0 && photo.length === 0) {
      await userSchema.findOneAndUpdate({ _id: id }, { $set: { username } }, { new: true })
      await eventSchema.updateMany({ email }, { $set: { username } }, { new: true })
      return res.status(200).json({ message: 'User updated' })
    }
    if (username.length > 0 && photo.length > 0) {
      await userSchema.findOneAndUpdate({ _id: id }, { $set: { username, photo } }, { new: true })
      await eventSchema.updateMany({ email }, { $set: { photo, username } }, { new: true })
      return res.status(200).json({ message: 'User updated' })
    }
    return res.status(404).json({ message: 'Something went wrong' })

  },
  deleteBooky: async (req, res) => {
    const { bookyName, email } = req.body

    const bookyExists = await bookySchema.find({ bookyName })
    if (!bookyExists.length) {
      return res.status(404).json({ message: 'Something went wrong' })
    }
    if (bookyExists[0].createdBy !== email) {
      return res.status(401).json({ message: 'You don`t have permission to delete this Booky' })
    }
    await bookySchema.deleteOne({ bookyName })
    return res.status(200).json({ message: 'Booky deleted' })
  },
  getBookyUsers: async (req, res) => {
    const bookyName = req.params.bookyName
    const foundBooky = await bookySchema.find({ bookyName })
    if (foundBooky.length > 0) {
      const result = foundBooky[0].members
      return res.status(200).json({ result })
    }
    return res.status(200).json({ message: "No bookies yet" })

  },
  getUsers: async (req, res) => {
    const id = req.params.id
    const users = await userSchema.find({ _id: id })
    return res.status(200).json({ users })
  }

}