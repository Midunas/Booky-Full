const isEmail = require("is-email")

module.exports = async (req, res, next) => {
  const { email, password, repeat } = req.body

  if (!isEmail(email)) return res.status(401).json({ message: "Email is invalid" })

  if (password.length < 5 || password.length > 20) {
    return res.status(401).json({ message: "bad password length" })
  }
  if (password !== repeat) {
    return res.status(401).json({ message: "passwords do not match" })

  }

  next()

}