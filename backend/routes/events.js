import express from "express";
import Event from "../models/Event.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAdmin, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user.id, // store the admin who created the event
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single event by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Extra safety: check if it's a valid ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body, // new data comes from frontend
      { new: true, runValidators: true } // return updated doc + validate schema
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/join", async (req, res) => {
  const { userId } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.participants.includes(userId)) {
      // remove (opt out)
      event.participants = event.participants.filter(id => id.toString() !== userId);
    } else {
      // join
      event.participants.push(userId);
    }

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;