require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Routes = require("./routes/vidoes");

const PORT = process.env.PORT || 5050;

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// register routes
app.use("/videos", videoRoutes);

// go!!
app.listen(PORT, () => {
  console.log("Server is listening", PORT);
});
