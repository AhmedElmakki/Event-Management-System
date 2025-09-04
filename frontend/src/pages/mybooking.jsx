// frontend/src/pages/MyBooking.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { QRCodeCanvas } from "qrcode.react";

export default function MyBooking() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); 
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);

  

  // Load booked tickets from localStorage
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("bookedTickets")) || [];
    setBookedTickets(savedTickets);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        // Filter events where the current user is a participant
        const booked = data.filter(event =>
          event.participants?.some(p => p?._id?.toString() === userId || p?.toString() === userId)
        );

        setEvents(booked);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userId]);

  const handlePayment = (event) => {
  if (bookedTickets.some(e => e._id === event._id)) {
    alert("You already paid for this event!");
    return;
  }

  alert(`Payment successful for ${event.name}!`);

  const updatedTickets = [...bookedTickets, event];
  setBookedTickets(updatedTickets);
  localStorage.setItem("bookedTickets", JSON.stringify(updatedTickets));

  // Expand the card to show QR code
  setExpandedCards(prev => [...prev, event._id]);
};

  if (loading) return <p style={{ textAlign: "center" }}>Loading booked events...</p>;

  if (events.length === 0)
    return <p style={{ textAlign: "center" }}>You have no booked events yet.</p>;

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          <h1 className="manager-h1" style={{ textAlign: "center", marginBottom: "30px" }}>
            🎟️ My Booked Events
          </h1>

          <div className="grid-holder">
            {events.map(event => {
              const isPaid = bookedTickets.some(e => e._id === event._id);
              const availableSeats =
                event.seatAmount != null ? event.seatAmount - (event.participants?.length || 0) : null;

              return (
                                <div
                  key={event._id}
                  className="event-card"
                  style={{
                    height: expandedCards.includes(event._id) ? "auto" : "350px",
                    minHeight: "250px",
                    position: "relative",
                    marginBottom: "20px",
                    transition: "height 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{event.name}</h2>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", gap: "10px", fontSize: "0.85rem" }}>
                    <p>💲 {event.ticketPrice ?? "Free"}</p>
                    <p>🪑 {event.seatAmount ?? "N/A"}</p>
                    <p>👥 Attendees: {event.participants?.length ?? 0}</p>
                  </div>

                  <hr style={{ border: "0.5px solid #ccc", margin: "8px 0" }} />

                  <div style={{ marginBottom: "10px" }}>
                    <p>📍 Venue: {event.venue || "TBA"}</p>
                    <p>📅 Date: {event.date ? new Date(event.date).toLocaleDateString() : "No date set"}</p>
                    <p>⏰ Time: {event.time || "TBA"}</p>
                  </div>

                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      {!isPaid ? (
                        <button className="btn-pay" onClick={() => handlePayment(event)}>
                          Pay Now
                        </button>
                      ) : (
                        <QRCodeCanvas
                          value={`Ticket for ${event.name} - ${event._id} - User: ${userId}`}
                          size={120}
                          style={{ marginTop: "10px" }}
                        />
                      )}
                    </div>

                  <button
                    className="btn-view"
                    onClick={() => navigate(`/EventDetails/${event._id}`)}
                    style={{ position: "absolute", bottom: "10px", right: "10px" }}
                  >
                    Details
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
