const bookySchema = require("../schemas/bookySchema")

module.exports = async (req, res, next) => {

  const { bookyName } = req.body
  const bookyNameIsTaken = await bookySchema.find({ bookyName })

  if (bookyNameIsTaken.length > 0) {
    return res.status(401).json({ message: "Booky name is already taken" })
  }
  next()
}