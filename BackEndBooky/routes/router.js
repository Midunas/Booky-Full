const express = require("express")
const router = express.Router()
const middle = require("../middleware/middle")
const {
  addReservation,
  getEventByDay,
  allReservations,
  register,
  login,
  getUser,
  update,
  findPost } = require("../controllers/mainController")

router.post("/addReservation", addReservation)
router.post("/all-reservations", allReservations)
router.get("/getUser/:secret", getUser)
router.get("/getEventByDay/:id", getEventByDay)

router.post("/register", middle, register)
router.post("/login", login)
router.post("/update", update)
router.post("/findPost/:id", findPost)


module.exports = router