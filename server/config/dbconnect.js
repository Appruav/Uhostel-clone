const mongoose = require("mongoose");

const connect = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.error("DB connection error:", error);
    });
};
module.exports = { connect };
