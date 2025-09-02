// src/pages/AddEvent.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    ticketPrice: "",
    seatAmount: "",
    availableSeats: "",
    tags: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()), // convert tags string to array
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      setSuccess("Event created successfully!");
      setError("");
      console.log(data);
      // Optionally reset form
      setFormData({
        name: "",
        date: "",
        time: "",
        venue: "",
        description: "",
        ticketPrice: "",
        seatAmount: "",
        availableSeats: "",
        tags: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="board">
      <Sidebar />

      <div className="main-content">
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
          Add Event
        </h1>

        <form className="event-details-form" onSubmit={handleSubmit}>
          {/* Section 1 */}
          <div className="event-details text-group">
            <div>
              <label htmlFor="name">Event Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter event name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Event Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="event-details text-group">
            <div>
              <label htmlFor="venue">Event Venue:</label>
              <input
                type="text"
                name="venue"
                id="venue"
                placeholder="Enter venue"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="time">Event Time:</label>
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="event-details">
            <div className="event-dis">
              <label htmlFor="description">Event Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter event description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="event-details grid-2">
            <div>
              <label htmlFor="ticketPrice">Ticket Price:</label>
              <input
                type="number"
                name="ticketPrice"
                id="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="seatAmount">Seat Amount:</label>
              <input
                type="number"
                name="seatAmount"
                id="seatAmount"
                value={formData.seatAmount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="availableSeats">Available Seats:</label>
              <input
                type="number"
                name="availableSeats"
                id="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="tags">Tags:</label>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="Comma separated tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 5: Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn-save">
              Add Event
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => (window.location.href = "/")}
            >
              Cancel
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
    </div>
  );
}
