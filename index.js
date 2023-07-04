require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes for the video
const videoRoutes = require("./routes/vidoes");

const app = express();

const PORT = process.env.PORT || 5050;

// Middleware -- json & allow CORS
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Register & Define Routes
app.use("/videos", videoRoutes);


// Test to see if running properly -- please delete later
app.get("/status", (_req, res) => {
    const status = {
        "Status": "Running"
    };

    res.send(status);
}); 

// Initialize the server to run
app.listen(PORT, () => {
  console.log("Server is listening", PORT);
});
