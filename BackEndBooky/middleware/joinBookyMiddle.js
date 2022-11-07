const bookySchema = require("../schemas/bookySchema")

module.exports = async (req, res, next) => {

  const { bookyName, code } = req.body
  const bookyExists = await bookySchema.find({ bookyName })

  if (!bookyExists.length > 0) {
    return res.status(401).json({ message: "Incorrect booky name" })
  }
  const inviteCodeMatches = await bookySchema.find({ bookyName, inviteCode: code })

  if (!inviteCodeMatches.length > 0) {
    return res.status(401).json({ message: "Incorrect invite code" })
  }

  next()
}