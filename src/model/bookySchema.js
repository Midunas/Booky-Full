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
  members: {
    type: [],
    required: true,
    default: undefined,
  },
  inviteCode: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.models.Bookies || mongoose.model('Bookies', bookySchema)
