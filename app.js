const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const photoshootsRoute = require("./routes/photoshoots");
const sslRoute = require("./routes/ssl");

app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/photoshoots", photoshootsRoute);
app.use("/.well-known/pki-validation/CA6CCBC66EEEAF1697A139059C2C8A80.txt", sslRoute);

// Connect to DB
mongoose.connect(
    process.env.DB_ATLAS_CONN_STRING
)
.then(() => console.log("Connected to DB!"))
.catch(err => console.log(err));

// Start listening to server
app.listen(9999);