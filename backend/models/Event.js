// backend/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    venue: String,

    // Core scheduling
    date: { type: Date, required: true },
    time: String,

    // Tickets & seats
    ticketPrice: { type: Number, default: 0 },
    seatAmount: { type: Number, default: 0 },
    availableSeats: { type: Number, default: 0 },

    // Event classification
    status: {
      type: String,
      enum: ["upcoming", "pending", "closed"],
      default: "upcoming",
    },
    tags: [String],

    // Engagement / metrics
    expectedAttendance: { type: Number, default: 0 },
    popularity: { type: Number, default: 0 }, // could be computed later (like # of participants)

    // Relations
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
