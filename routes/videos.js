const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const videos = [];
    res.json(videos);
});

module.exports = router;
