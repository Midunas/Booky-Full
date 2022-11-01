const bookingSchema = require("../schemas/bookingSchema")
const userSchema = require("../schemas/userSchema")
const sendRes = require("../middleware/modules/universalRes")
const { uid } = require("uid")
const bcrypt = require("bcrypt")

module.exports = {
  registerAdmin: async (req, res) => {

    const { email, password, bookyName, admin, username } = req.body

    const hashPass = await bcrypt.hash(password, 10)

    new userSchema({
      email,
      username,
      password: hashPass,
      bookyName,
      admin,
      secret: uid(),
    }).save().then(() => {
      sendRes(res, false, "all good", null)
    })

  },
  registerUser: async (req, res) => {

    const { email, password, bookyName, admin, username } = req.body

    const bookyExists = await userSchema.findOne({ bookyName })

    if (bookyExists) {
      const hashPass = await bcrypt.hash(password, 10)

      new userSchema({
        email,
        username,
        password: hashPass,
        bookyName,
        admin,
        secret: uid(),
      }).save().then(() => {
        sendRes(res, false, "all good", null)
      })
    } else {
      sendRes(res, true, "Booky doesn't exists", null)
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
        return sendRes(res, true, "bad credentials", null)
      }

    } else {
      return sendRes(res, true, "user doesn't exist", null)
    }

  },
  addReservation: async (req, res) => {

    const { eventStart, eventEnd, bookyName, eventDay } = req.body
    const existingBookies = await bookingSchema.find({ eventDay, bookyName })

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
        const newReservation = new bookingSchema(req.body)
        const post = await newReservation.save()
        res.send({ success: 'Ok', post })
      }
    } else {
      const newReservation = new bookingSchema(req.body)
      const post = await newReservation.save()
      res.send({ success: 'Ok', post })
    }

  },
  getEventByDay: async (req, res) => {

    const booky = req.params.bookyName
    const day = req.params.id
    const eventsByDay = await bookingSchema.find({ eventDay: day, bookyName: booky })

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

    const updatedBooking = await bookingSchema.findOneAndUpdate({ _id: id }, { $set: { eventName } }, { new: true })
    console.log(updatedBooking)
    return sendRes(res, false, 'Booky Updated', null)

  },
  deleteBooky: async (req, res) => {

    const { id, username } = req.body
    const userMadeTheBooky = await bookingSchema.findOne({ _id: id, username })

    if (userMadeTheBooky) {
      await bookingSchema.deleteOne({ _id: id })
      res.send({ success: true })
    } else {
      return sendRes(res, true, 'You can only remove your own Bookies.', null)
    }

  },

}