import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // to grab event id from URL
import Sidebar from "../components/Sidebar";



export default function EventDetails() {
      const { id } = useParams(); // expects route like /EventDetails/:id
      const role = localStorage.getItem("role"); // "admin" or "user"
      const [event, setEvent] = useState(null);

  // ✅ get ID from query string
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event details");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p style={{ textAlign: "center" }}>Loading event...</p>;


  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
            Event Details
          </h1>

          <form className="event-details-form">
            <div className="event-details text-group">
              <div>
                <label>Event Name:</label>
                <textarea readOnly value={event.name} />
              </div>
              <div>
                <label>Event Date:</label>
                <textarea readOnly value={event.date} />
              </div>
            </div>

            <div className="event-details text-group">
              <div>
                <label>Event Venue:</label>
                <textarea readOnly value={event.venue} />
              </div>
              <div>
                <label>Event Time:</label>
                <textarea readOnly value={event.time} />
              </div>
            </div>

            <div className="event-details">
              <div className="event-dis">
                <label>Event Description:</label>
                <textarea readOnly value={event.description} />
              </div>
            </div>

            <div className="event-details grid-2">
              <div>
                <label>Ticket Price:</label>
                <textarea readOnly value={event.ticketPrice} />
              </div>
              <div>
                <label>Seat Amount:</label>
                <textarea readOnly value={event.seatAmount} />
              </div>
              <div>
                <label>Available Seats:</label>
                <textarea readOnly value={event.availableSeats} />
              </div>
              <div>
                <label>Popularity:</label>
                <textarea readOnly value={event.popularity} /> {/* ✅ here */}
              </div>
            </div>

            <div className="event-details event-bottom-row">
              <div className="event-seat-allocation-graph">{/* later */}</div>
              <div>
                <div className="event-details two-col">
                  <div>
                    <label>Tags:</label>
                    <textarea readOnly value={event.tags?.join(", ")} />
                  </div>
                  <div>
                    <label>Expected Attendance:</label>
                    <textarea readOnly value={event.expectedAttendance} />
                  </div>
                </div>

                <div className="qr-placeholder">QR code payment area</div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => (window.location.href = `/EditEvent?id=${event._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-insight"
                    onClick={() => (window.location.href = `/AttendeesDetails?id=${event._id}`)}
                  >
                    Attendees insight
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}