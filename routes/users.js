const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("We are on users");
});

// Add a user
router.post("/add", (req, res) => {
    res.send("Add a user");
});

// Update the users details
router.put("/update", (req, res) => {
    res.send("Update the users details");
});

// Set the imaage url for the users profile picture
router.put("/profile-picture", (req, res) => {
    res.send("Set the image url for the users profile picture");
});

// Return a user by username
router.get("/username/:username", (req, res) => {
    res.send("Return a user by username");
});

// Return the user type
router.get("/type/:userId", (req, res) => {
    res.send("Return the user type");
});

// Return the users following list
router.get("/following", (req, res) => {
    res.send("Return the users following list");
});

// Return the users followers list
router.get("/followers", (req, res) => {
    res.send("Return the users followers list");
});

// Return a user by user id
router.get("/:userId", (req, res) => {
    res.send("Return a user by user id");
});

// Follow a photographer
router.put("/follow/:photographerId", (req, res) => {
    res.send("Follow a photographer");
});

// Unfollow a photographer
router.put("/unfollow/:photographerId", (req, res) => {
    res.send("Unfollow a photographer");
});

module.exports = router;
