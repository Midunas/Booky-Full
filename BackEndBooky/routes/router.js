const express = require("express")
const router = express.Router()
const middle = require("../middleware/middle")

const {
  addReservation,
  getEventByDay,
  register,
  login,
  getUser,
  update,
  findPost } = require("../controllers/mainController")

router.post("/addReservation", addReservation)

router.get("/getUser/:secret", getUser)
router.get("/getEventByDay/:id/:bookyName", getEventByDay)

router.post("/register", middle, register)
router.post("/login", login)
router.post("/update", update)
router.post("/findPost/:id", findPost)


module.exports = router