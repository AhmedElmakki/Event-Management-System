// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";


// Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());



// Connect to MongoDB
connectDB();


// Routes
app.use("/api/auth", authRoutes);



// Example protected route
app.get("/api/admin", (req, res) => {
  res.json({ message: "Admin route - add JWT auth later" });
});



// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
