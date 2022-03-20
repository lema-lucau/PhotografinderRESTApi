const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync('./ssl/CA6CCBC66EEEAF1697A139059C2C8A80.txt', 'utf8');
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
