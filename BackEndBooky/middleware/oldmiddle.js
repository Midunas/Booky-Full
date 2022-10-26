
module.exports = (req, res, next) => {
  const { title, description, photo, username, city } = req.body

  if (title.length < 10 || title.length > 100) {
    return res.send({ error: true, message: "bad title length" })
  }

  if (description.length < 30 || description.length > 300) {
    return res.send({ error: true, message: "bad description length" })
  }

  if (photo.substring(0, 8) !== 'https://') {
    return res.send({ error: true, message: "bad photo url" })
  }

  if (username[0] !== username[0].toUpperCase()) {
    return res.send({ error: true, message: "bad username" })
  }
  const cities = ["Vilnius", "Kaunas", "Klaipeda", "Trakai", "Marijampole", "Panevezys"]

  if (!cities.includes(city)) {
    return res.send({ error: true, message: "City mus be one of the following :", cities })
  }
  next()

}