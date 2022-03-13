const mongoose = require("mongoose");

const FollowSchema = mongoose.Schema({
    uid: { type: String }
})

const UserSchema = mongoose.Schema({
    uid: { type: String, required: true },
    type: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    bio: { type: String, default: "Not specified" },
    location: { type: String, default: "Not specified" },
    minRate: { type: String, default: "Not specified" },
    profilePicUrl: { type: String, default: "" },
    followers: { type: [FollowSchema], default: undefined },
    following: { type: [FollowSchema], default: [] },
});

module.exports = mongoose.model("User", UserSchema);
