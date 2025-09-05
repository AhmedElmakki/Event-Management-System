// backend/seedDB.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Import your Mongoose models
import User from "./models/User.js";
import Event from "./models/Event.js";

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/EventX";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const seedDataPath = path.join(process.cwd(), "seed-data", "database.json"); // assuming you saved the JSON you posted as data.json
const rawData = fs.readFileSync(seedDataPath, "utf-8");
const data = JSON.parse(rawData);

async function seed() {
  try {
    // Seed Users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(data.users);
      console.log("Users seeded");
    } else {
      console.log("Users already exist, skipping");
    }

    // Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(data.events);
      console.log("Events seeded");
    } else {
      console.log("Events already exist, skipping");
    }

    console.log("Seeding complete");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();