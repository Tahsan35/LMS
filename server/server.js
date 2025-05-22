// Import necessary modules
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";

// Initialize express app
const app = express();
// Define the port for the server, using environment variable or defaulting to 5000
const PORT = process.env.PORT || 5000;

//connect to mongodb
await connectDB();

// Middleware setup
// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
// Enables Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Basic route for testing server connectivity
app.get("/", (req, res) => {
  res.send("Hello World! The server is running."); // Updated response message
});

// Start the server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
