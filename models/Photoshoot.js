const mongoose = require("mongoose");

const PhotoshootSchema = mongoose.Schema({
    id: { type: String, required: true },
    status: { type: String, default: "Pending"},
    photographerId: { type: String, required: true },
    clientId: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true},
    photographerNotes: { type: String, default: "" },
    clientNotes: { type: String, default: "" },
});

module.exports = mongoose.model("Photoshoot", PhotoshootSchema);
