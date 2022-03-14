const express = require('express');
const router = express.Router();
const Photoshoot = require("../models/Photoshoot");

// Get all photoshoots
router.get("/", async (req, res) => {
    try {
        const photoshoots = await Photoshoot.find();
        res.json(photoshoots);
    } catch (error) {
        res.json({ message: error });
    }
});

// Add a new photoshoot
router.post("/add", async (req, res) => {
    const photoshoot = new Photoshoot({
        id: req.body.id,
        status: req.body.status,
        photographerId: req.body.photographerId,
        clientId: req.body.clientId,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
        photographerNotes: req.body.photographerNotes,
        clientNotes: req.body.clientNotes,
    });

    try {
        const savedPhotoshoot = await photoshoot.save();
        res.json(savedPhotoshoot);
    } catch (error) {
        res.json({ message: error });
    }
});

// Amend a photoshoot's details
router.put("/amend/:photoshootId", async (req, res) => {
    try {
        const updatedPhotoshoot = await Photoshoot.updateOne(
            { id: req.params.photoshootId },
            { $set: { 
                id: req.params.photoshootId,
                status: req.body.status,
                photographerId: req.body.photographerId,
                clientId: req.body.clientId,
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                location: req.body.location,
                photographerNotes: req.body.photographerNotes,
                clientNotes: req.body.clientNotes,
            } }
        );
        res.json(updatedPhotoshoot);
    } catch (error) {
        res.json({ message: error });
    }
});

// Delete a photoshoot
router.delete("/delete/:photoshootId", async (req, res) => {
    try {
        const deletedPhotoshoot = await Photoshoot.deleteOne({ id: req.params.photoshootId});
        res.json(deletedPhotoshoot);
    } catch (error) {
        res.json({ message: error });
    }
});

// Update the status of a photoshoot
router.patch("/update-status/:photoshootId", async (req, res) => {
    try {
        const updatedPhotoshoot = await Photoshoot.updateOne(
            { id: req.params.photoshootId },
            { $set: { 
                status: req.body.status,
            } }
        );
        res.json(updatedPhotoshoot);
    } catch (error) {
        res.json({ message: error });
    }
});

// Fetch all the user's photoshoots
router.get("/retrieve", async (req, res) => {
    try {
        const photoshoots = await Photoshoot.find({ $or: [{ photographerId: req.body.uid }, { clientId: req.body.uid }] });
        res.json(photoshoots);
    } catch (error) {
        res.json({ message: error });
    }
});

// Retrieve a photoshoot by it's date and start time
router.get("/retrieve/by-date-start-time", async (req, res) => {
    try {
        const photoshoot = await Photoshoot.find({ $and: 
            [
                { date: req.body.date }, 
                { startTime: req.body.startTime },
                { $or: [{ photographerId: req.body.uid }, { clientId: req.body.uid }] }
            ] 
        });
        res.json(photoshoot);
    } catch (error) {
        res.json({ message: error });
    }
});

// Retrieve a photoshoot by it's status
router.get("/retrieve/by-status", async (req, res) => {
    try {
        const photoshoot = await Photoshoot.find({ $and: 
            [
                { status: req.body.status },
                { $or: [{ photographerId: req.body.uid }, { clientId: req.body.uid }] }
            ] 
        });
        res.json(photoshoot);
    } catch (error) {
        res.json({ message: error });
    }
});

// Return a photoshoot by it's ID
router.get("/retrieve/:photoshootId", async (req, res) => {
    try {
        const photoshoot = await Photoshoot.findOne({ id: req.params.photoshootId });
        res.json(photoshoot);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
