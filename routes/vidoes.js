const express = require("express");
const { get, post } = require("../controllers/notesController");

const router = express.Router();

router.get("/", get);





module.exports = router;