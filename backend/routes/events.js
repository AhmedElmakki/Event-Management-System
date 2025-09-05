// backend/routes/events.js
import express from "express";
import Event from "../models/Event.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create new event (admin only)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { date } = req.body;

    if (date && new Date(date) < new Date()) {
      req.body.status = "closed"; // auto-close past events
    }

    const event = new Event({ ...req.body, createdBy: req.user.id });
    await event.save();

    res.status(201).json(event);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all events with optional search & auto-close past events
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const now = new Date();

    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { tags: { $elemMatch: { $regex: search, $options: "i" } } },
          ],
        }
      : {};

    const events = await Event.find(searchFilter).populate("participants");

    // Auto-close past events
    for (const event of events) {
      if (event.date && new Date(event.date) < now && event.status !== "closed") {
        event.status = "closed";
        await event.save();
      }
    }

    const normalizedEvents = events.map((e) => ({
      _id: e._id,
      name: e.name,
      tags: e.tags || [],
      participants: Array.isArray(e.participants) ? e.participants : [],
      date: e.date,
      time: e.time,
      venue: e.venue,
      ticketPrice: e.ticketPrice,
      seatAmount: e.seatAmount,
      status: e.status || "open",
    }));

    res.json(normalizedEvents);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single event by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(id).populate("participants");
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.date && new Date(event.date) < new Date() && event.status !== "closed") {
      event.status = "closed";
      await event.save();
    }

    const availableSeats =
      event.seatAmount != null ? event.seatAmount - event.participants.length : null;

    res.json({ ...event.toObject(), availableSeats });
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update event by ID (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

    res.json(updatedEvent);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete event by ID (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  console.log("DELETE request received for ID:", id);

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      console.log("Event not found for deletion:", id);
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Event deleted:", deletedEvent);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Join / Opt-out event
router.post("/:id/join", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.status === "closed") {
      return res.status(400).json({ message: "Event is closed. Cannot join." });
    }

    const seatsTaken = event.participants.length;

    if (event.participants.includes(userId)) {
      // Opt-out
      event.participants = event.participants.filter((id) => id.toString() !== userId);
    } else {
      if (seatsTaken >= event.seatAmount) {
        return res.status(400).json({ message: "Seats are full" });
      }
      event.participants.push(userId);
    }

    await event.save();
    res.json(event);
  } catch (err) {
    console.error("Error joining event:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
