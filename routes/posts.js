const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("We are on posts");
});

// Add a new post
router.post("/add", (req, res) => {
    res.send("Add a new post");
});

// Delete a post
router.delete("/delete/:postId", (req, res) => {
    res.send("Delete a post");
});

// Fetch all the posts from a photographer
router.get("/retrieve/:photographerId", (req, res) => {
    res.send("Fetch all the posts from a photographer");
});

// Fetch a single post from a photographer
router.get("/retrieve/:photographerId/:postId", (req, res) => {
    res.send("Fetch a single post from a photographer");
});

// Return the number of likes that a post has
router.get("/retrieveLikes/:postId", (req, res) => {
    res.send("Return the number of likes that a post has");
});

// Update a post's number of likes
router.put("/updateLikes/:postId", (req, res) => {
    res.send("Update a post's number of likes");
});

module.exports = router;
