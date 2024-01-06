const express = require("express");

const adminrouter = express.Router();
const {
  signup,
  login,
  handlegatepass,
  GatePasses,
  forgotpass,
  resetpass,
  resetpass1,
} = require("../controllers/Admin");
adminrouter.route("/signup").post(signup);
adminrouter.route("/login").post(login);
adminrouter.route("/Gatepasses").get(GatePasses);
adminrouter.route("/handlegatepass").post(handlegatepass);
adminrouter.route("/forgot-password").post(forgotpass);
adminrouter.route("/forgot-password/:id/:token").get(resetpass);
adminrouter.route("/forgot-password/:id/:token").post(resetpass1);
module.exports = { adminrouter };
