// backend/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: String,
  time: String,
  venue: String,
  description: String,
  ticketPrice: Number,
  seatAmount: Number,
  availableSeats: Number,
  tags: [String],
  expectedAttendance: Number,

  // participants = array of user IDs
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // computed automatically
  popularity: { type: Number, default: 0 },
});

// ✅ Keep popularity in sync with participants length
eventSchema.pre("save", function (next) {
  this.popularity = this.participants.length;
  next();
});

export default mongoose.model("Event", eventSchema);
