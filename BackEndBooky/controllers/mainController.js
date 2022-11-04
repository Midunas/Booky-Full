const eventSchema = require("../schemas/eventSchema")
const userSchema = require("../schemas/userSchema")
const bookySchema = require("../schemas/bookySchema")
const sendRes = require("../middleware/modules/universalRes")
const { uid } = require("uid")
const bcrypt = require("bcrypt")

module.exports = {
  register: async (req, res) => {

    const { email, password, username } = req.body

    const hashPass = await bcrypt.hash(password, 10)

    new userSchema({
      email,
      username,
      password: hashPass,
      secret: uid(),
    }).save().then(() => {
    })

    const userExists = await userSchema.findOne({ email })

    if (userExists) {

      req.session.bookyName = userExists.bookyName
      req.session.email = userExists.email

      return sendRes(res, false, "all good", { secret: userExists.secret, sessions: req.session })
    } else {
      return sendRes(res, true, "bad credentials", null)
    }
  },
  login: async (req, res) => {

    const { email, password } = req.body
    const userExists = await userSchema.findOne({ email })

    if (userExists) {
      const passwordsMatch = await bcrypt.compare(password, userExists.password)

      if (passwordsMatch) {

        req.session.bookyName = userExists.bookyName
        req.session.email = userExists.email

        return sendRes(res, false, "all good", { secret: userExists.secret, sessions: req.session })
      } else {
        return sendRes(res, true, "Invalid credentials", null)
      }

    } else {
      return sendRes(res, true, "Invalid credentials", null)
    }

  },
  createBooky: async (req, res) => {

    const { bookyName, id, email } = req.body
    // const bookyNameIsAvailable = bookySchema.find({ bookyName })
    // if (!bookyNameIsAvailable) {
    new bookySchema({
      bookyName,
      createdBy: email,
      secret: uid(),
      members: id,
    }).save()
    // bookySchema.findOneAndUpdate({ bookyName }, { $push: { members: id } }, { new: true })
    return sendRes(res, false, "Booky Created", null)

    // }
  },
  joinBooky: async (req, res) => {

    const { id, email, bookyName } = req.body

    const bookyExists = await bookySchema.find({ bookyName })

    if (bookyExists) {
      if (email !== bookyExists.createdBy) {
        await bookySchema.updateOne({ bookyName }, { $push: { members: id } })
        return sendRes(res, false, "Joined Booky", null)
      } else {
        return sendRes(res, true, "Booky not found", null)
      }
    } else {
      return sendRes(res, true, "Something went wrong", null)

    }
  },
  getAllCreated: async (req, res) => {

    const email = req.params.email
    const bookiesExist = await bookySchema.find({ createdBy: email })

    if (bookiesExist) {
      res.send({ success: true, bookiesExist })
    } else {
      return sendRes(res, true, "User hasn't created a booky", null)
    }

  },
  getAllJoined: async (req, res) => {

    const id = req.params.id
    const email = req.params.email

    const bookiesExist = await bookySchema.find({ members: id })
    if (bookiesExist) {
      const result = bookiesExist.filter((x) => x.createdBy !== email)
      return sendRes(res, false, "all good", result)
    } else {
      return sendRes(res, true, "Booky not found", null)

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
        return sendRes(res, true, "times overlap", null)
      } else {
        console.log('book it ')
        const newReservation = new eventSchema(req.body)
        const post = await newReservation.save()
        res.send({ success: 'Ok', post })
      }
    } else {
      const newReservation = new eventSchema(req.body)
      const post = await newReservation.save()
      res.send({ success: 'Ok', post })
    }

  },
  getEventByDay: async (req, res) => {

    const booky = req.params.bookyName
    const day = req.params.id
    const eventsByDay = await eventSchema.find({ eventDay: day, bookyName: booky })

    res.send({ success: true, eventsByDay })

  },
  autoLogin: async (req, res) => {

    const { email } = req.session
    if (email) {
      const user = await userSchema.findOne({ email })
      return sendRes(res, false, "all good", { secret: user.secret, email })
    }
    return sendRes(res, true, "no session data", null)
  },
  logout: async (req, res) => {
    req.session.email = null
    return sendRes(res, false, "all good", null)
  },
  getUser: async (req, res) => {
    const { secret } = req.params
    const userExists = await userSchema.find({ secret })

    if (!userExists.length > 0) {
      return res.status(400).send({ error: true, message: "user doesn't exist" });
    } else {
      return res.send({ success: 'ok', userExists })
    }
  },
  update: async (req, res) => {

    const { id, eventName } = req.body
    await eventSchema.findOneAndUpdate({ _id: id }, { $set: { eventName } }, { new: true })

    return sendRes(res, false, 'Booky Updated', null)

  },
  deleteBooky: async (req, res) => {

    const { id, email } = req.body
    const userMadeTheBooky = await eventSchema.findOne({ _id: id, email })

    if (userMadeTheBooky) {
      await eventSchema.deleteOne({ _id: id })
      res.send({ success: true })
    } else {
      return sendRes(res, true, 'You can only remove your own Bookies.', null)
    }

  },
  updateProfile: async (req, res) => {
    const { id, username, photo, email } = req.body

    const updatedUser = await userSchema.findOneAndUpdate({ _id: id }, { $set: { username, photo } }, { new: true })
    await eventSchema.updateMany({ email }, { $set: { photo, username } }, { new: true })

    if (updatedUser) {
      return sendRes(res, false, 'User updated', null)
    } else {
      return sendRes(res, true, 'Something went wrong', null)
    }

  },

}