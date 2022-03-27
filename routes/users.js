const express = require('express');
const router = express.Router();
const User = require("../models/User");

const multer = require("multer");
const upload = multer({ dest: "images/" });

const { uploadFile } = require('../s3');
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// Return all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

// Add a user
router.post("/add", async (req, res) => {
    const user = new User({
        uid: req.body.uid,
        type: req.body.type,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        bio: req.body.bio,
        location: req.body.location,
        minRate: req.body.minRate,
        profilePicUrl: req.body.profilePicUrl,
        followers: req.body.followers,
        following: req.body.following,
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

// Delete a user
router.delete("/delete/:userId", async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({uid: req.params.userId});
        res.json(deletedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

// Update the users details
router.patch("/update", async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { uid: req.body.uid },
            { $set: { 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                bio: req.body.bio,
                location: req.body.location,
                minRate: req.body.minRate,
                profilePicUrl: req.body.profilePicUrl
            } }
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

// Set the image url for the users profile picture and upload image to s3
router.post("/profile-picture", upload.single("image"), async (req, res) => {
    const image = req.file;
    const ownerId = req.body.ownerId;

    try {
        // Upload file to s3
        const uploadedFile = await uploadFile(image, ownerId);
        await unlinkFile(image.path);

        // Update url 
        const updatedUser = await User.updateOne(
            { uid: ownerId },
            { $set: { 
                profilePicUrl: uploadedFile.Location
            } }
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

// Return a user by username
router.get("/username/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
});

// Return the users following list
router.get("/following", async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.query.uid });
        res.json(user.following);
    } catch (error) {
        res.json({ message: error });
    }
});

// Return the users followers list
router.get("/followers", async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.query.uid });
        res.json(user.followers);
    } catch (error) {
        res.json({ message: error });
    }
});

// Return photographers that a user doesn't follow
router.get("/not-following", async (req, res) => {
    const userId = req.query.uid;
    try {
        const users = await User.find(
            { $and: [
                { "followers.uid": { $nin: userId} },
                { uid: { $ne: userId } },
                { type: "Photographer" }
            ]}
        );
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

// Return a user by user id
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.userId });
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
});

// Follow a photographer
router.patch("/follow/:photographerId", async (req, res) => {
    try {
        // Update users following list
        const updatedUser = await User.updateOne(
            { uid: req.body.uid },
            { $push: { following: { uid: req.params.photographerId } } }
        );

        // Update photographers followers list
        await User.updateOne(
            { uid: req.params.photographerId },
            { $push: { followers: { uid: req.body.uid } } }
        );

        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

// Unfollow a photographer
router.patch("/unfollow/:photographerId", async (req, res) => {
    try {
        // Update users following list
        const updatedUser = await User.updateOne(
            { uid: req.body.uid },
            { $pull: { following: { uid: req.params.photographerId } } }
        );

        // Update photographers followers list
        await User.updateOne(
            { uid: req.params.photographerId },
            { $pull: { followers: { uid: req.body.uid } } }
        );

        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
