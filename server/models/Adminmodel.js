const mongoose = require("mongoose");

const admin = new mongoose.Schema({
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
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
});

const adminmodel = mongoose.model("Admin", admin);
module.exports = { adminmodel };
