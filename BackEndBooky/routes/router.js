const express = require("express")
const router = express.Router()
const middle = require("../middleware/registrationMiddle")
const createBookyMiddle = require('../middleware/createBookyMiddle')
const joinBookyMiddle = require('../middleware/joinBookyMiddle')
const reservationMiddle = require('../middleware/reservationMiddle')
const {
  addReservation,
  getEventByDay,
  login,
  getUser,
  updateEvent,
  deleteEvent,
  deleteBooky,
  autoLogin,
  register,
  updateProfile,
  createBooky,
  getAllCreated,
  getAllJoined,
  joinBooky,
  logout,
  getUsers,
  getBookyUsers } = require("../controllers/mainController")

router.post("/register", middle, register)
router.post("/login", login)
router.get("/getUser/:secret", getUser)
router.get("/getUsers/:id", getUsers)
router.post("/createBooky", createBookyMiddle, createBooky)
router.post("/joinBooky", joinBookyMiddle, joinBooky)
router.post("/addReservation", reservationMiddle, addReservation)

router.get("/getEventByDay/:id/:bookyName", getEventByDay)
router.get("/getAllCreated/:email", getAllCreated)
router.get("/getAllJoined/:id/:email", getAllJoined)
router.get("/getBookyUsers/:bookyName", getBookyUsers)

router.post("/delete", deleteEvent)
router.post("/update", updateEvent)
router.post("/updateProfile", updateProfile)
router.post("/deleteBooky", deleteBooky)


router.get("/autologin", autoLogin)
router.get("/logout", logout)

module.exports = router