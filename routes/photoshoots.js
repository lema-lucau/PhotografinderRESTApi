const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("We are on photoshoots");
});

// Add a new photoshoot
router.post("/add", (req, res) => {
    res.send("Add a new photoshoot");
});

// Amend a photoshoot's details
router.put("/amend/:photoshootId", (req, res) => {
    res.send("Amend a photoshoot's details");
});

// Delete a photoshoot
router.delete("/delete/:photoshootId", (req, res) => {
    res.send("Delete a photoshoot");
});

// Update the status of a photoshoot
router.put("/update-status/:photoshootId", (req, res) => {
    res.send("Update the status of a photoshoot");
});

// Fetch all the user's photoshoots
router.get("/retrieve", (req, res) => {
    res.send("Fetch all the user's photoshoots");
});

// Retrieve a photoshoot by it's date and start time
router.get("/retrieve/by-date-start-time", (req, res) => {
    res.send("Retrieve a photoshoot by it's date and start time");
});

// Retrieve a photoshoot by it's status
router.get("/retrieve/by-status", (req, res) => {
    res.send("Retrieve a photoshoot by it's status");
});

// Return a photoshoot by it's ID
router.get("/retrieve/:photoshootId", (req, res) => {
    res.send("Return a photoshoot by it's ID");
});

module.exports = router;
