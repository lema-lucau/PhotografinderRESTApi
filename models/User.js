const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    uid: { type: String, required: true },
    type: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    bio: { type: String },
    location: { type: String, default: "Not specified" },
    minRate: { type: String, default: "Not specified" },
    profilePicUrl: { type: String, default: undefined },
    followers: { type: [FollowSchema], default: undefined },
    following: { type: [FollowSchema], default: undefined },
});

const FollowSchema = mongoose.Schema({
    uid: { type: String }
})

module.exports = mongoose.model("Users", UserSchema);
