import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";

//initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

//connect to mongodb
await connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
