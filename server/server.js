// Import necessary modules
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { webhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

// Initialize express app
const app = express();
// Define the port for the server, using environment variable or defaulting to 5000
const PORT = process.env.PORT || 5000;

//connect to database
await connectDB();
await connectCloudinary();

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
app.post("/webhook", express.json(), webhooks);
app
  .use("/api/educator", express.json(), educatorRouter) // Webhook endpoint
  // app.post("/webhook", async (req, res) => {
  //   try {
  //     const payload = req.body;

  //     // Log the webhook payload for debugging
  //     console.log('Received webhook payload:', payload);

  //     // Verify webhook signature if needed
  //     // Add your webhook signature verification logic here

  //     // Process the webhook data
  //     // Add your webhook handling logic here

  //     // Send success response
  //     res.status(200).json({
  //       status: 'success',
  //       message: 'Webhook received successfully'
  //     });
  //   } catch (error) {
  //     console.error('Webhook processing error:', error);
  //     res.status(500).json({
  //       status: 'error',
  //       message: 'Failed to process webhook'
  //     });
  //   }
  // });

  // Start the server and listen on the defined PORT
  .app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
