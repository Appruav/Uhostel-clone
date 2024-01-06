const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
});

const usermodel = mongoose.model("User", userschema);
module.exports = { usermodel };
