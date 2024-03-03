const express = require("express");
const route = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwtoken = require("jsonwebtoken");
const Private_Key = "Shubhamisagoodboy";
const bcrypt = require("bcryptjs");

route.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("cpassword").isLength({ min: 6 }),
    body("location").exists(),
    body("name").isLength({ min: 4 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const { name, email, location, password, cpassword } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(401).json({ Error: "User Already Exists" });
      }
      if (password !== cpassword) {
        return res.status(402).json({ Error: "Password Does not match" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      user = await User.create({
        name,
        location,
        email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
          name:user.name
        },
      };
      const authtoken = jwtoken.sign(data, Private_Key);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ Error: "Some error occured" });
    }
  }
);

route.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ Error: "User Does Not Exists" });
      }
      const passwordcompare=await bcrypt.compare(password,user.password)
      if (!passwordcompare) {
        return res.status(401).json({ Error: "Password Does not match" });
      }
      const data={
        user:{
          id:user.id,
          name:user.name
        }
      }
      const authtoken=jwtoken.sign(data,Private_Key);
      res.json({authtoken});
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ Error: "Some error occured" });
    }
  }
);

module.exports = route;
