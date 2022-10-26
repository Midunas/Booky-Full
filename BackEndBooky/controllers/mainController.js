const bookingSchema = require("../schemas/bookingSchema")
const userSchema = require("../schemas/userSchema")
const sendRes = require("../modules/universalRes")
const { uid } = require("uid")
const bcrypt = require("bcrypt")

module.exports = {
    addReservation: async (req, res) => {
        const newReservation = new bookingSchema(req.body)
        const post = await newReservation.save()

        res.send({ success: 'Ok', post })
        console.log(post)
    },
    allReservations: async (req, res) => {
        const { bookyName } = req.body
        const reservations = await bookingSchema.find({ bookyName: bookyName })
        res.send({ success: true, reservations })
    },
    getEventByDay: async (req, res) => {
        const day = req.params.id
        console.log(day)

        const eventsByDay = await bookingSchema.find({ eventDay: day })

        res.send({ success: true, eventsByDay })
    },
    findPost: async (req, res) => {
        const id = req.params.id

        const post = await postSchema.find({ _id: id })

        res.send({ success: true, post })
    },
    register: async (req, res) => {

        const { email, password, bookyName, admin, username } = req.body

        const hashPass = await bcrypt.hash(password, 4)

        new userSchema({
            email,
            username,
            hashPass,
            bookyName,
            admin,
            secret: uid(),
        }).save().then(() => {
            sendRes(res, false, "all good", null)
        })

    },
    login: async (req, res) => {

        const { email, password } = req.body
        const userExists = await userSchema.findOne({ email, password })

        const hashedPass = userExists.hashPass
        const passwordsMatch = await bcrypt.compare(password, hashedPass)

        if (userExists && passwordsMatch) {
            return sendRes(res, false, "all good", { secret: userExists.secret })
        }

        return sendRes(res, true, "bad credentials", null)

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

        const { secret, email, photo } = req.body

        const updatedUser = await userSchema.findOneAndUpdate({ secret }, { $set: { email, photo } }, { new: true })

        res.send({ success: true, updatedUser })
    },


}
