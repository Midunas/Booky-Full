const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  hashPass: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  bookyName: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }

})

const exportUser = mongoose.model("BookyUsers", userSchema)

module.exports = exportUser