const user = require("../models/User");
const express = require("express");
const router = express.Router();

// Create a new user.
router.post("/newuser", async (req, res) => {
  try {
    const { name, age, gender, mobileNumber } = req.body;

    const newUser = await user.create({
      name: name,
      age: age,
      gender: gender,
      mobileNumber: mobileNumber,
    });
    res.json({ newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// Get all documents.
router.get("/documents", async (req, res) => {
  try {
    const existingDocuments = await user.find({});
    if (existingDocuments.length === 0) {
      return res.status(404).json({ msg: "No documents found" });
    }
    res.json({ existingDocuments });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error occurred");
  }
});

//  Update existing user
router.put("/edit/:id", async (req, res) => {
  try {
    // create a newnote object to update the existing one.
    const { name, age, gender, mobileNumber } = req.body;
    const findDocument = await user.findById(req.params.id);
    if (findDocument) {
      if (name) {
        findDocument.name = name;
      }
      if (age) {
        findDocument.age = age;
      }
      if (gender) {
        findDocument.gender = gender;
      }
      if (mobileNumber) {
        findDocument.mobileNumber = mobileNumber;
      }
    }
    await findDocument.save();
    res.json(newNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Delete existing user.
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);

    // If the user was successfully deleted
    if (deletedUser) {
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    }
  } catch (error) {
    // If an error occurs.
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
