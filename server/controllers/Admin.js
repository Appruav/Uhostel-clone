const { adminmodel } = require("../models/Adminmodel");
const { usergatepassmodel } = require("../models/Usergatepass");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      console.log("Invalid Authentication");
      return res.status(400).json({ message: "Invalid Authentication" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await adminmodel.create({
        name: name,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
      });
      res.status(200).json({ message: "Admin has signed up", user });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await adminmodel.findOne({ email });
    console.log(data);
    if (!data) {
      res.status(401).json({ message: "Admin  doest not exit" });
    } else {
      const dbpass = data.password;
      const passcheck = await bcrypt.compare(password, dbpass);
      if (!passcheck) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = Jwt.sign({ user_id: data._id }, process.env.JWTKEY);
      res.status(200).json({ message: "Admin has logged in", token });
    }
  } catch (err) {
    console.log(err);
  }
};
const GatePasses = async (req, res) => {
  try {
    let allgatepasses = await usergatepassmodel.find();
    allgatepasses = allgatepasses.filter((gatepass) => {
      return gatepass.warden_approval != "approved";
    });
    console.log(allgatepasses);
    if (allgatepasses) {
      console.log("All Gatepasses fetched");
      return res
        .status(200)
        .json({ message: "Gatepasses are fetched", data: allgatepasses });
    } else {
      console.error(`Error fetching gatepasses`);
      return res.status(404).json({ message: "No gatepasses found" });
    }
  } catch (error) {
    console.log("Gatepass");
    console.error(`Error fetching gatepasses: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handlegatepass = async (req, res) => {
  try {
    const { Gatepass_id } = req.body;
    const gatepass = await usergatepassmodel.findOneAndUpdate(
      {
        _id: Gatepass_id,
      },
      { $set: { warden_approval: "approved" } },
      { new: true }
    );
    if (gatepass) {
      console.log("Gatepass has been approved");
      res.status(200).json({ message: "Gate has been approved", gatepass });
    }
  } catch (err) {
    console.log("Gatepass1");
    console.log(err);
  }
};
const forgotpass = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      console.log("User does not exists");
      return res.status(404).json({ message: "User does not exists" });
    }
    const secret = process.env.JWTKEY;

    const token = jwt.sign({ email: email, id: user._id }, secret);

    const link = `http://localhost:9000/api/user/reset-password/${user._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "appurav1329.be22@chitkara.edu.in",
        pass: "@AppuravNehra123",
      },
    });

    var mailOptions = {
      from: `"Hey Appurav this to help you reseting your password" <appurav1329.be22@chitkara.edu.in>`,
      to: email,
      subject: "Password Reset",
      text: "Click on the link to reset your password",
      html: `<b>Click on this link to reset your password:<a href="${link}">${link}</a></b>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res
      .status(200)
      .json({ message: "User has been found", _id: user._id, token });
  } catch (err) {
    console.log(err);
  }
};
const resetpass = async (req, res) => {
  try {
    const { id, token } = req.params;

    const finduser = await usermodel.findOne({ _id: id });
    if (!finduser) {
      console.log("User has not been found");
    }
    const secret = process.env.JWTKEY;
    try {
      // const verify = jwt.verify(token, secret);
      res.render("index", {
        email: finduser.email,
      });
    } catch (err) {
      console.log(err);
      return res.send("Not verified");
    }
  } catch (err) {
    console.log(err);
  }
};
const resetpass1 = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(password);
    const finduser = await usermodel.findOne({ _id: id });
    if (!finduser) {
      console.log("User has not been found");
    }
    const secret = process.env.JWTKEY;
    try {
      const encryptedpassword = await bcrypt.hash(password, 10);
      await usermodel.updateOne(
        { _id: id },
        {
          $set: {
            password: encryptedpassword,
          },
        }
      );
      res.json("Password has been updated");
    } catch (err) {
      console.log(err);
      return res.send("Password has not been updated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  signup,
  login,
  handlegatepass,
  GatePasses,
  forgotpass,
  resetpass,
  resetpass1,
};
