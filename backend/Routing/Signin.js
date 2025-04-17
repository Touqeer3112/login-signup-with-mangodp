const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const SendResponse = require('../Helpers/SendResponse');
const { hashPassword, comparePassword } = require("../Middleware/Password.js");
var jwt = require('jsonwebtoken');
// Signup
router.post('/signin', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) return SendResponse(res, 400, false, "User already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    SendResponse(res, 200, true, "User registered successfully", newUser);
  } catch (err) {
    SendResponse(res, 500, false, "Server error");
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return SendResponse(res, 404, false, "User not found");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return SendResponse(res, 401, false, "Invalid credentials");
    jwt.sign({ name : user.name , email : user.email, role : "admin"}, process.env.PRIVATEKEY , function(err, token) {
      console.log(token);
      SendResponse(res, 200, true, "Login successful", { token });
    });

  } catch (err) {
    SendResponse(res, 500, false, `Server Error ${err}`);
  }
});

module.exports = router;
