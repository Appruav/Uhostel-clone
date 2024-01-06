const express = require("express");

const app = express();
const cors = require("cors");
const { connect } = require("./config/dbconnect");
const { userRouter } = require("./routes/userroutes");
const { adminrouter } = require("./routes/Adminroutes");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/admin", adminrouter);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const start = async () => {
  try {
    const url = process.env.URL;
    connect(url);
    app.listen(9000, () => {
      console.log("Server is up and running at", 9000);
    });
  } catch (err) {
    console.log("Error on the server file is ", err);
  }
};
start();
