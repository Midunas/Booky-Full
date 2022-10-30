const isEmail = require("is-email")

module.exports = (req, res, next) => {
  const { email, password, repeat } = req.body

  if (!isEmail(email)) return res.send({ error: true, message: "bad email" })

  if (password.length < 5 || password.length > 20) {
    return res.send({ error: true, message: "bad password length" })
  }

  if (password !== repeat) {
    return res.send({ error: true, message: "passwords do not match" })
  }

  next()

}