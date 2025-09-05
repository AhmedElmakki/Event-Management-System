// backend/exportDB.js
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// Replace with your MongoDB local URI
const MONGO_URI = "mongodb://127.0.0.1:27017/EventX";

async function exportDB() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Get all collection names
    const collections = await mongoose.connection.db.listCollections().toArray();

    const dbData = {};

    for (const coll of collections) {
      const collectionName = coll.name;
      const data = await mongoose.connection.db.collection(collectionName).find({}).toArray();
      dbData[collectionName] = data;
    }

    // Ensure seed-data folder exists
    const exportDir = path.join(process.cwd(), "seed-data");
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

    // Write to JSON file
    const filePath = path.join(exportDir, "database.json");
    fs.writeFileSync(filePath, JSON.stringify(dbData, null, 2));

    console.log(`Database exported successfully to ${filePath}`);
    process.exit(0);
  } catch (err) {
    console.error("Error exporting database:", err);
    process.exit(1);
  }
}

exportDB();