// backend/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  venue: String,
  date: { type: Date, required: true },
  time: String,
  ticketPrice: Number,
  seatAmount: Number,
  availableSeats: Number,
  tags: [String],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // users who opted in
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin who created the event
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
