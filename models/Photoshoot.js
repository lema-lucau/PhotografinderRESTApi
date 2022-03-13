const mongoose = require("mongoose");

const PhotoshootSchema = mongoose.Schema({
    status: { type: String, required: true },
    photographer_id: { type: String, required: true },
    client_id: { type: String, required: true },
    date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    location: { type: String, required: true},
    photographer_notes: { type: String, required: true },
    client_notes: { type: String, required: true },
});

module.exports = mongoose.model("Photoshoot", PhotoshootSchema);
