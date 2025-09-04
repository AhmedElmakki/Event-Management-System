import mongoose from "mongoose";
import fs from "fs";
import User from "./models/User.js";
import Event from "./models/Event.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eventx";

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Only insert if collections are empty
  if (await User.countDocuments() === 0) {
    const users = JSON.parse(fs.readFileSync("./seed-data/users.json", "utf-8"));
    await User.insertMany(users);
    console.log("✅ Users seeded");
  }

  if (await Event.countDocuments() === 0) {
    const events = JSON.parse(fs.readFileSync("./seed-data/events.json", "utf-8"));
    await Event.insertMany(events);
    console.log("✅ Events seeded");
  }

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});