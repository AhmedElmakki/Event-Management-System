// frontend/src/pages/EventDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { QRCodeCanvas } from "qrcode.react";

export default function EventDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); 
  const userId = localStorage.getItem("userId"); 
  const [event, setEvent] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [bookedTickets, setBookedTickets] = useState([]);

  const handlePayment = () => {
  if (!isJoined) {
    alert("You must join the event first!");
    return;
  }

  alert(`Payment successful for ${event.name}!`);

  setBookedTickets((prev) => [...prev, event]);
};

  // helper: check if user is in participants
  const isUserJoined = (participants, userId) => {
    if (!userId || !participants) return false;
    return participants.some(p => p?._id?.toString() === userId || p?.toString() === userId);
  };

  // Compute available seats dynamically
  const availableSeats = event?.seatAmount != null
    ? event.seatAmount - (event.participants?.length || 0)
    : null;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event details");
        const data = await res.json();
        setEvent(data);
        setIsJoined(isUserJoined(data.participants, userId));
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id, userId]);

  console.log("userId:", userId); // debug

  const handleJoinToggle = async () => {
    if (!userId) {
      setJoinError("User not logged in.");
      return;
    }
    if (!isJoined && availableSeats <= 0) {
      setJoinError("No seats available.");
      return;
    }

    try {
      setJoinError("");
      const res = await fetch(`http://localhost:5000/api/events/${id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update participation");

      setEvent(data);
      setIsJoined(isUserJoined(data.participants, userId));
    } catch (err) {
      setJoinError(err.message);
      console.error(err);
    }
  };

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
            {/* Event info fields */}
            <div className="event-details text-group">
              <div>
                <label>Event Name:</label>
                <textarea readOnly value={event.name || ""} />
              </div>
              <div>
                <label>Event Date:</label>
                <textarea readOnly value={event.date || ""} />
              </div>
            </div>

            <div className="event-details text-group">
              <div>
                <label>Event Venue:</label>
                <textarea readOnly value={event.venue || ""} />
              </div>
              <div>
                <label>Event Time:</label>
                <textarea readOnly value={event.time || ""} />
              </div>
            </div>

            <div className="event-details">
              <div className="event-dis">
                <label>Event Description:</label>
                <textarea readOnly value={event.description || ""} />
              </div>
            </div>

            <div className="event-details grid-2">
              <div>
                <label>Ticket Price:</label>
                <textarea readOnly value={event.ticketPrice ?? ""} />
              </div>
              <div>
                <label>Seat Amount:</label>
                <textarea readOnly value={event.seatAmount ?? ""} />
              </div>
              <div>
                <label>Available Seats:</label>
                <textarea readOnly value={availableSeats ?? ""} />
              </div>
              <div>
                <label>Popularity:</label>
                <textarea readOnly value={event.participants?.length ?? ""} />
              </div>
            </div>

            <div className="event-details event-bottom-row">
              <div className="event-seat-allocation-graph">{/* later */}</div>
              <div>
                <div className="event-details two-col">
                  <div>
                    <label>Tags:</label>
                    <textarea readOnly value={event.tags?.join(", ") || ""} />
                  </div>
                  <div>
                    <label>Expected Attendance:</label>
                    <textarea readOnly value={event.expectedAttendance ?? ""} />
                  </div>
                </div>

                <div className="qr-placeholder" style={{ textAlign: "center", marginTop: "15px" }}>
                {!bookedTickets.includes(event) && isJoined && (
                  <button
                    type="button"
                    className="btn-pay"
                    onClick={handlePayment}
                    style={{ marginBottom: "10px" }}
                  >
                    Pay Now
                  </button>
                )}

                {bookedTickets.includes(event) && (
                  <QRCodeCanvas
                    value={`Ticket for ${event.name} - ${event._id} - User: ${userId}`}
                    size={120}
                  />
                  )}
              </div>

                <div className="form-actions">
                  

                  {/* Admin-only buttons */}
                  {role === "admin" && (
                    <>
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => navigate(`/EditEvent/${event._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-insight"
                        onClick={() => navigate(`/AttendeesDetails/${event._id}`)}
                      >
                        Attendees insight
                      </button>
                    </>

                  )}
                  
                </div>
                <div className="join">
                {/* ✅ Join / Opt-out button */}
                  <button
                    type="button"
                    className="btn-join"
                    onClick={handleJoinToggle}
                    disabled={!isJoined && availableSeats <= 0} // disable if no seats
                  >
                    {isJoined ? "Opt Out" : "Join Event"}
                  </button>

                  {joinError && <p style={{ color: "red" }}>{joinError}</p>}
                  </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
