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

    const { id, email, bookyName, code } = req.body

    const bookyExists = await bookySchema.find({ bookyName })

    if (bookyExists.length > 0) {
      if (email !== bookyExists.createdBy) {
        await bookySchema.updateOne({ bookyName }, { $push: { members: id } })
        return res.status(200).json({ message: "Joined Booky" })
      } else {
        return res.status(400).json({ message: "Booky not found" })
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" })
    }
  },
  getAllCreated: async (req, res) => {

    const email = req.params.email
    const bookiesExist = await bookySchema.find({ createdBy: email })

    if (bookiesExist) {
      // res.send({ success: true, bookiesExist })
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

    const { eventStart, eventEnd, bookyName, eventDay } = req.body
    const existingBookies = await eventSchema.find({ eventDay, bookyName })

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
      } else {
        const newReservation = new eventSchema(req.body)
        const post = await newReservation.save()
        return res.status(200).json({ post })

      }
    } else {
      const newReservation = new eventSchema(req.body)
      const post = await newReservation.save()
      return res.status(200).json({ post })
    }

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
    return res.status(400).json({ message: 'no session data' })

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
  updateBooky: async (req, res) => {

    const { id, eventName } = req.body
    await eventSchema.findOneAndUpdate({ _id: id }, { $set: { eventName } }, { new: true })

    return res.status(200).json({ message: 'Booky updated' })
  },
  deleteBooky: async (req, res) => {

    const { id, email } = req.body
    const userMadeTheBooky = await eventSchema.findOne({ _id: id, email })

    if (userMadeTheBooky) {
      await eventSchema.deleteOne({ _id: id })
      return res.status(200).json({ message: 'All good' })

    } else {
      return res.status(400).json({ message: 'You can only remove your own bookies.' })
    }
  },
  updateProfile: async (req, res) => {
    const { id, username, photo, email } = req.body

    const updatedUser = await userSchema.findOneAndUpdate({ _id: id }, { $set: { username, photo } }, { new: true })
    await eventSchema.updateMany({ email }, { $set: { photo, username } }, { new: true })

    if (updatedUser) {
      return res.status(200).json({ message: 'User updated' })

    } else {
      return res.status(400).json({ message: 'Something went wrong' })

    }

  },

}