const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookySchema = new Schema({
  bookyName: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  members: {
    type: [],
    required: false,
    default: undefined,
  },
  inviteCode: {
    type: String,
    required: false
  }
})

const exportBooky = mongoose.model("AllBookys", bookySchema)

module.exports = exportBooky;