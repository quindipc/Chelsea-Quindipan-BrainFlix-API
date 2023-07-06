// DEPENDANCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5050;
const DATA = "./data/videos.json"

// Routes for the video
const videoRoutes = require("./routes/videos");

// Middleware -- json & allow CORS
app.use(express.json());    
app.use(cors({ origin: '*' }));
// app.use(cors({ origin: process.env.CORS_ORIGIN }));
// console.log(process.env.CORS_ORIGIN);

// Static images
app.use(express.static("public"));

// GET /videos endpoint that responds with an array of videos
app.get("/videos", (req, res) => {
    const videos = readVideos();
    res.json(videos);
})

// GET /videos/:id endpoint that response with an object containing the details of the video with an id
app.get("/videos/:id", (req, res) => {
    const videos = readVideos();
    const video = videos.find((v) => v.id === req.params.id);
    if (video) {
        res.json(video);
    } else {
        res.status(404).json({ message: "Video not found" });
    }
});

// POST /videos that will add a new video to the list & a unique ID
app.post("/videos", (req, res) => {
    const videos = readVideos();
  
    const { title, description, thumbnail } = req.body;
  
    const newVideo = {
      id: uuidv4(),
      title,
      description,
      thumbnail,
    };
  
    videos.push(newVideo);
    writeVideos(videos);
    res.status(201).json(newVideo);
  });

// Register & Define Routes
app.use("/videos", videoRoutes);

// Write & Read JSON file
function readVideos() {
  const data = fs.readFileSync(DATA);
  return JSON.parse(data);
}

function writeVideos(videos) {
  fs.writeFileSync(DATA, JSON.stringify(videos));
}

module.exports = { readVideos, writeVideos };

// Error handling
app.use((err, req, res,next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Initialize the server to run
app.listen(PORT, () => {
  console.log("Server is listening", PORT);
});
