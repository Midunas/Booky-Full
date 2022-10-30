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
  registerAdmin,
  registerUser,
  logout } = require("../controllers/mainController")

router.post("/addReservation", addReservation)
router.get("/getUser/:secret", getUser)
router.get("/getEventByDay/:id/:bookyName", getEventByDay)

router.post("/registerAdmin", middle, registerAdmin)
router.post("/registerUser", middle, registerUser)

router.post("/delete", deleteBooky)
router.post("/login", login)
router.post("/update", update)
router.get("/autologin", autoLogin)
router.get("/logout", logout)


module.exports = router