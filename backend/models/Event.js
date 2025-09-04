import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: Date,
  time: String,
  venue: String,
  description: String,
  ticketPrice: Number,
  seatAmount: Number,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["upcoming", "pending", "closed"], default: "upcoming" },
  tags: { type: [String], default: [] }, // <-- add this
});

export default mongoose.model("Event", eventSchema);