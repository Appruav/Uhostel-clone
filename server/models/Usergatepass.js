const mongoose = require("mongoose");

const usergatepass = new mongoose.Schema({
  Apply_date: {
    type: String,
    default: Date.now(),
  },
  Apply_for: {
    type: String,
    enum: ["Day", "Night"],
  },
  out_date: {
    type: String,
    required: true,
  },
  out_time: {
    type: String,
    required: true,
  },
  in_time: {
    type: String,
    // required: true,
  },
  in_date: {
    type: String,
  },
  leave_reason: {
    type: String,
    minlength: 10,
    required: true,
  },
  warden_approval: {
    type: String,
    enum: ["Pending", "approved", "Rejected"],
    default: "Pending",
  },
  wardenApprovaldate: {
    type: Date,
  },
});
const usergatepassmodel = mongoose.model("Gatepass", usergatepass);
module.exports = { usergatepassmodel };
