module.exports = (res, error, message, data) => {
  return res.send({ error, message, data })
}