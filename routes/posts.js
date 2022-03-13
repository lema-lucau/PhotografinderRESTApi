const express = require('express');
const router = express.Router();
const Post = require("../models/Post");

// Return all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error });
    }
});

// Add a new post
router.post("/add", async (req, res) => {
    const post = new Post({
        id: req.body.id,
        ownerId: req.body.ownerId,
        imageUrl: req.body.imageUrl,
        likes: req.body.likes
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

// Delete a post
router.delete("/delete/:postId", async (req, res) => {
    try {
        const deletedPost = await Post.deleteOne({id: req.params.postId});
        res.json(deletedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

// Fetch a specific post
router.get("/retrieve/:postId", async (req, res) => {
    try {
        const post = await Post.findOne({ id: req.params.postId });
        res.json(post);
    } catch (error) {
        res.json({ message: error });
    }
});

// Fetch all the posts from a photographer
router.get("/retrieve/photographer/:photographerId", async (req, res) => {
    try {
        const posts = await Post.find({ ownerId: req.params.photographerId });
        res.json(posts);
    } catch (error) {
        res.json({ message: error });
    }
});

// Return the number of likes that a post has
router.get("/retrieveLikes/:postId", async (req, res) => {
    try {
        const post = await Post.findOne({ id: req.params.postId });
        res.json(post.likes);
    } catch (error) {
        res.json({ message: error });
    }
});

// Update a post's number of likes
router.patch("/updateLikes/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { id: req.params.postId },
            { $set: { likes: req.body.likes } }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
