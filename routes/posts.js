const express = require('express');
const router = express.Router();

const Post = require("../models/Post");

const multer = require("multer");
const upload = multer({ dest: "images/" });

const { uploadFile } = require('../s3');
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

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
router.post("/add", upload.single("image"), async (req, res) => {
    const image = req.file;
    const ownerId = req.body.ownerId;
    const imageName = req.file.originalname;

    try {
        // Upload file to s3
        const uploadedFile = await uploadFile(image, ownerId);
        await unlinkFile(image.path);
        
        // Upload post data to db
        const post = new Post({
            id: req.body.id,
            ownerId: ownerId,
            ownerUsername: req.body.ownerUsername,
            imageUrl: uploadedFile.Location,
            imageName: imageName,
            likes: req.body.likes
        });

        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {  
        res.json(error);
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
        const posts = await Post.find({ ownerId: req.params.photographerId }).sort({ timestamp: "desc" });
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

// Add a like to a post
router.patch("/addLike/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { id: req.params.postId },
            { $push: { likes: req.body.uid } }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

// Remove like from post
router.patch("/removeLike/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { id: req.params.postId },
            { $pull: { likes: req.body.uid } }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
