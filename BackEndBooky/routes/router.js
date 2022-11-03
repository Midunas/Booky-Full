const express = require("express")
const router = express.Router()
const middle = require("../middleware/middle")

const {
  addReservation,
  getEventByDay,
  login,
  getUser,
  update,
  deleteBooky,
  autoLogin,
  register,
  updateProfile,
  getPhoto,
  createBooky,
  getAllCreated,
  logout } = require("../controllers/mainController")

router.post("/addReservation", addReservation)
router.get("/getUser/:secret", getUser)
router.get("/getEventByDay/:id/:bookyName", getEventByDay)
router.get("/getAllCreated/:email", getAllCreated)
router.post("/register", middle, register)
router.post("/createBooky", createBooky)
router.post("/delete", deleteBooky)
router.post("/login", login)
router.post("/update", update)
router.post("/updateProfile", updateProfile)
router.get("/autologin", autoLogin)
router.get("/logout", logout)
router.get('/getPhoto/:username', getPhoto)

module.exports = router