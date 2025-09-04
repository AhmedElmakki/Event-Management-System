// src/pages/EditEvent.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function EditEvent() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    venue: "",
    time: "",
    description: "",
    ticketPrice: "",
    seatAmount: "",
    availableSeats: "",
    tags: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      navigate(`/EventDetails/${id}`);
    }
  }, [role, navigate, id]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const event = await res.json();

        setFormData({
          name: event.name || "",
          date: event.date ? event.date.split("T")[0] : "",
          venue: event.venue || "",
          time: event.time || "",
          description: event.description || "",
          ticketPrice: event.ticketPrice || "",
          seatAmount: event.seatAmount || "",
          availableSeats: event.availableSeats || "",
          tags: event.tags ? event.tags.join(", ") : "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [id]);

  // ✅ universal input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          ticketPrice: formData.ticketPrice ? Number(formData.ticketPrice) : null,
          seatAmount: formData.seatAmount ? Number(formData.seatAmount) : null,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to update event");

      navigate(`/EventDetails/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
            Edit Event
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Comma separated tags"
                />
              </div>
            </div>

            {/* Section 5 */}
            <div className="form-actions">
              <button type="submit" className="btn-save">
                Save
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate(`/EventDetails/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
