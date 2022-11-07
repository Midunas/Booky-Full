const eventSchema = require("../schemas/eventSchema")

module.exports = async (req, res, next) => {

  const { eventStart, eventEnd, bookyName, eventDay } = req.body
  const duration = eventEnd - eventStart

  if (duration < 1) {
    return res.status(400).json({ message: "Cannot book less than an hour" })
  }

  const existingBookies = await eventSchema.find({ eventDay, bookyName })

  if (existingBookies.length > 0) {

    const overlap = existingBookies.map((booky) => {
      if (booky.eventStart < eventEnd && booky.eventEnd > eventStart) {
        return true;
      }
      return false;
    })
    const atLeastOneOverlaps = overlap.reduce((current, next) => current || next, false)

    if (atLeastOneOverlaps) {
      return res.status(400).json({ message: "Times overlap" })
    }
  }

  next()
}
