const express = require("express")
const router = express.Router()
const middle = require("../middleware/middle")
const createBookyMiddle = require('../middleware/createBookyMiddle')
const joinBookyMiddle = require('../middleware/joinBookyMiddle')
const {
  addReservation,
  getEventByDay,
  login,
  getUser,
  updateBooky,
  deleteBooky,
  autoLogin,
  register,
  updateProfile,
  createBooky,
  getAllCreated,
  getAllJoined,
  joinBooky,
  logout } = require("../controllers/mainController")

router.post("/register", middle, register)
router.post("/login", login)
router.get("/getUser/:secret", getUser)
router.post("/createBooky", createBookyMiddle, createBooky)
router.post("/joinBooky", joinBookyMiddle, joinBooky)
router.post("/addReservation", addReservation)

router.get("/getEventByDay/:id/:bookyName", getEventByDay)
router.get("/getAllCreated/:email", getAllCreated)
router.get("/getAllJoined/:id/:email", getAllJoined)


router.post("/delete", deleteBooky)
router.post("/update", updateBooky)
router.post("/updateProfile", updateProfile)

router.get("/autologin", autoLogin)
router.get("/logout", logout)

module.exports = router