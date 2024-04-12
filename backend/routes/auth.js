const user = require("../models/User");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchUserId = require("../middleware/fetchUserId")
require("dotenv").config();

const JWT_secret = process.env.JWT_SECRET;

// function : object which carries id of the user document.
function idObject(newUser) {
  const data = {
    newUser: {
      id: newUser.id,
    },
  };
  return data;
}

// function : to generate random password for google-auth.
function generateRandomPassword(length) {
  const characters = process.env.PASSWORD_STRING;

  let password = "";

  // Generate random characters to create the password
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

//ROUTE 1 : creating an new user account POST : /api/auth/createuser
router.post(
  "/newuser",
  [
    // CHECK 1 : Entered credentials are checking by the validation function.
    body("name", "Enter a  valid last name").isLength({ max: 50 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be of atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Validation function to check inputs.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Name, email and password are required",
      });
    }
    try {
      // CHECK 2 : dont want two or more user of same email id.
      let newUser = await user.findOne({ email: req.body.email });
      if (newUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      // adding salt to the password.
      const salt = await bcrypt.genSalt(10);
      // hashing the password.
      const secPass = await bcrypt.hash(req.body.password, salt);
      // new document creation.
      newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // storing id in an object format for token creation.
      const data = idObject(newUser);
      const auth_token = jwt.sign(data, JWT_secret);
      res.json({ auth_token });
    } catch (error) {
      // throw errors.
      console.error(error.message);
      res.status(500).send("Internal server Error Occured");
    }
  }
);

// ROUTE 2 : Authenticate a user using : POST /api/auth/login . login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // CHECK 1 : Email checking.
      let existingUser = await user.findOne({ email });
      if (!existingUser) {
        return res.status(401).json({ outcome, msg: "User does not exist!" });
      }
      // CHECK 2 : Password (comparision by using bcrypt library).

      const existingPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!existingPassword) {
        return res.status(401).json({ outcome, msg: "Invalid Credentials" });
      }
      // id object for token creation.
      const data = idObject(existingUser);
      const auth_token = jwt.sign(data, JWT_secret);
      res.json({ auth_token });
    } catch (error) {
      // for errors.
      console.error(error.message);
      res.status(500).send("Server Error Occured");
    }
  }
);

// Route 3 : google authentication : POST /api/auth/google-auth.

router.post("/google-auth", async (req, res) => {
  const { name, email } = req.body;
  try {
    let userData = await user.findOne({ email });
    if (!userData) {
      const password = generateRandomPassword(20);
      userData = await user.create({
        name: name,
        email: email,
        password: password,
      });
    }
    const data = idObject(userData);
    const auth_token = jwt.sign(data, JWT_secret);
    res.json({ auth_token });
  } catch (error) {
    // throw errors.
    console.error(error.message);
    res.status(500).send("Internal server Error Occured");
  }
});

// Route 4 : to get entered user data :GET /api/auth/user-data.

router.get("/user-data", fetchUserId, async (req, res) => {
  try {
    let userDocument = await user.findById({ _id : req.userId}).select("-password")
    res.json({"user_data" : userDocument})
  } catch (error) {
    // throw errors.
    console.error(error.message);
    res.status(500).send("Internal server Error Occured");
  }
});

module.exports = router;
