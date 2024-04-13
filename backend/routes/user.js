// Import required modules.
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to create a new user.
router.post("/newuser", async (req, res) => {
  try {
    // Extract user details from request body.
    const { name, age, gender, mobileNumber } = req.body;

    // Create a new user document in the database.
    const newUser = await User.create({
      name: name,
      age: age,
      gender: gender,
      mobileNumber: mobileNumber,
    });
    
    // Send response with the newly created user document.
    res.json({ newUser });
  } catch (error) {
    // Handle errors and send an appropriate response.
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// Route to get all user documents.
router.get("/documents", async (req, res) => {
  try {
    // Fetch all user documents from the database.
    const existingDocuments = await User.find({});

    // If no documents found, send a 404 response.
    if (existingDocuments.length === 0) {
      return res.status(404).json({ msg: "No documents found" });
    }

    // Send response with the existing user documents.
    res.json({ existingDocuments });
  } catch (error) {
    // Handle errors and send an appropriate response.
    console.error(error.message);
    res.status(500).send("Server error occurred");
  }
});

// Route to update an existing user.
router.put("/edit/:id", async (req, res) => {
  try {
    // Extract updated user details from request body.
    const { name, age, gender, mobileNumber } = req.body;

    // Find the user document by ID.
    const findDocument = await User.findById(req.params.id);

    // If user document found, update the fields.
    if (findDocument) {
      if (name) findDocument.name = name;
      if (age) findDocument.age = age;
      if (gender) findDocument.gender = gender;
      if (mobileNumber) findDocument.mobileNumber = mobileNumber;
    }

    // Save the updated user document.
    await findDocument.save();

    // Send success response.
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    // Handle errors and send an appropriate response.
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route to delete an existing user.
router.delete("/delete/:id", async (req, res) => {
  try {
    // Find and delete the user document by ID.
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // If user was successfully deleted, send success response.
    if (deletedUser) {
      res.status(200).json({ success: true, message: "User deleted successfully" });
    }
  } catch (error) {
    // Handle errors and send an appropriate response.
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
