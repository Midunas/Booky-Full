const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  eventStart: {
    type: Number,
    required: true,
  },
  eventEnd: {
    type: Number,
    required: true
  },
  eventName: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true
  },
  eventDay: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  bookyName: {
    type: String,
    required: true
  }
})

const exportPost = mongoose.model("BookyBookings", bookingSchema)

module.exports = exportPost