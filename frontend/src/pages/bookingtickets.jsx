import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import searchIcon from "../materials/search icon.svg";
import QRCode from "qrcode.react";

export default function BookingTickets() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [bookedTickets, setBookedTickets] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const handlePayment = (event) => {
  // Simulate payment
  alert(`Payment successful for ${event.name}`);

  // Add to booked tickets (for QR code)
  setBookedTickets((prev) => [...prev, event]);
};


    fetchEvents();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading events...</p>;

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />

        <div className="main-content">
          <header className="manager-header">
            <div className="header-top">
              <h1 className="manager-h1">🎟️ Booking & Tickets</h1>
              <div className="manage-filter">
                <div className="searcharea2">
                  <button className="search-button" title="Search">
                    <img src={searchIcon} alt="search" />
                  </button>
                  <input type="text" placeholder="Search events..." />
                </div>
              </div>
            </div>
          </header>

          {/* Legend */}
          <div className="legend">
            <div className="legend-content" style={{ color: "green" }}>
              • Upcoming Events
            </div>
            <div className="legend-content" style={{ color: "blue" }}>
              • Pending Events
            </div>
            <div className="legend-content" style={{ color: "red" }}>
              • Closed Events
            </div>
          </div>

          {/* Columns */}
          <div className="grid-holder">
            {/* Upcoming Events Column */}
            <div className="event-column">
              {events
                .filter(e => e.status === "upcoming" || !e.status)
                .map(event => (
                  <div
                    key={event._id}
                    className="event-card"
                    style={{ height: "200px" }}
                  >
                    {/* Event Name */}
                    <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                      {event.name}
                    </h2>

                    {/* Ticket Info */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                        gap: "10px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <p>
                        💲{event.ticketPrice ? `${event.ticketPrice}` : "Free"}
                      </p>
                      <p>🪑{event.seatAmount || "N/A"}</p>
                      <p>
                        👥 Attendees:
                        {event.participants ? event.participants.length : 0}
                      </p>
                    </div>

                    <hr
                      style={{ border: "0.5px solid #ccc", margin: "8px 0" }}
                    />

                    {/* Venue, Date, and Time */}
                    <div style={{ marginBottom: "10px" }}>
                      <p>📍 Venue: {event.venue || "TBA"}</p>
                      <p>
                        📅 Date:{" "}
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "No date set"}
                      </p>
                      <p>⏰ Time: {event.time || "TBA"}</p>
                    </div>

                    {/* Details Button */}
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/EventDetails/${event._id}`)}
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      Details
                    </button>
                  </div>
                ))}
            </div>

            {/* Pending Events Column */}
            <div className="event-column">
              {events
                .filter(e => e.status === "pending")
                .map(event => (
                  <div
                    key={event._id}
                    className="event-card"
                    style={{ height: "200px" }}
                  >
                    <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                      {event.name}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                        gap: "10px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <p>
                        💲{event.ticketPrice ? `${event.ticketPrice}` : "Free"}
                      </p>
                      <p>🪑{event.seatAmount || "N/A"}</p>
                      <p>
                        👥 Attendees:
                        {event.participants ? event.participants.length : 0}
                      </p>
                    </div>
                    <hr
                      style={{ border: "0.5px solid #ccc", margin: "8px 0" }}
                    />
                    <div style={{ marginBottom: "10px" }}>
                      <p>📍 Venue: {event.venue || "TBA"}</p>
                      <p>
                        📅 Date:{" "}
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "No date set"}
                      </p>
                      <p>⏰ Time: {event.time || "TBA"}</p>
                    </div>
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/EventDetails/${event._id}`)}
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      Details
                    </button>
                  </div>
                ))}
            </div>

            {/* Closed Events Column */}
            <div className="event-column">
              {events
                .filter(e => e.status === "closed")
                .map(event => (
                  <div
                    key={event._id}
                    className="event-card"
                    style={{ height: "200px" }}
                  >
                    <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                      {event.name}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                        gap: "10px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <p>
                        💲{event.ticketPrice ? `${event.ticketPrice}` : "Free"}
                      </p>
                      <p>🪑{event.seatAmount || "N/A"}</p>
                      <p>
                        👥 Attendees:
                        {event.participants ? event.participants.length : 0}
                      </p>
                    </div>
                    <hr
                      style={{ border: "0.5px solid #ccc", margin: "8px 0" }}
                    />
                    <div style={{ marginBottom: "10px" }}>
                      <p>📍 Venue: {event.venue || "TBA"}</p>
                      <p>
                        📅 Date:{" "}
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "No date set"}
                      </p>
                      <p>⏰ Time: {event.time || "TBA"}</p>
                    </div>
                
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
