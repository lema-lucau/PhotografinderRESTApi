const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: { type: String, required: true },
    ownerId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: [String], default: [] },
    timestamp: { type: Number, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
