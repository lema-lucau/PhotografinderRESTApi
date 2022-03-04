const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// Import Routes
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const photoshootsRoute = require("./routes/photoshoots");

app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/photoshoots", photoshootsRoute);

// Connect to DB
mongoose.connect(
    process.env.DB_CONN_STRING, 
    () => console.log("Connected to DB!")
);

// Start listening to server
app.listen(3000);