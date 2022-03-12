const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: { type: String, required: true },
    ownerId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0, },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Posts", PostSchema);
