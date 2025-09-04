// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  agegroup: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  interest: { type: String }
});

export default mongoose.model("User", userSchema);