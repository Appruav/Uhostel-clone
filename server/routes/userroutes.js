const express = require("express");
const userRouter = express.Router();
const {
  signup,
  login,
  creatgatepass,
  forgotpass,
  resetpass,
  resetpass1,
} = require("../controllers/user");
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/creategatepass").post(creatgatepass);
userRouter.route("/forgot-password").post(forgotpass);
userRouter.route("/reset-password/:id/:token").get(resetpass);
userRouter.route("/reset-password/:id/:token").post(resetpass1);
module.exports = { userRouter };
