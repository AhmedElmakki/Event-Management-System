// src/pages/EventDetails.jsx
import Sidebar from "../components/Sidebar";


export default function EventDetails() {
  return (
    <div className="global-body" >
      <div className="board">
        <Sidebar />

        <div className="main-content">
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#333",
            }}
          >
            Event Details
          </h1>

          <form className="event-details-form">
            {/* Section 1 */}
            <div className="event-details text-group">
              <div>
                <label htmlFor="event-name">Event Name:</label>
                <textarea readOnly name="event-name" id="event-name" />
              </div>
              <div>
                <label htmlFor="event-date">Event Date:</label>
                <textarea readOnly name="event-date" id="event-date" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="event-details text-group">
              <div>
                <label htmlFor="event-venue">Event Venue:</label>
                <textarea readOnly name="event-venue" id="event-venue" />
              </div>
              <div>
                <label htmlFor="event-time">Event Time:</label>
                <textarea readOnly name="event-time" id="event-time" />
              </div>
            </div>

            {/* Section 3 */}
            <div className="event-details">
              <div className="event-dis">
                <label htmlFor="event-description">Event Description:</label>
                <textarea readOnly name="event-description" id="event-description" />
              </div>
            </div>

            {/* Section 4 */}
            <div className="event-details grid-2">
              <div>
                <label htmlFor="ticket-price">Ticket Price:</label>
                <textarea readOnly name="ticket-price" id="ticket-price" />
              </div>

              <div>
                <label htmlFor="seat-amount">Seat Amount:</label>
                <textarea readOnly name="seat-amount" id="seat-amount" />
              </div>

              <div>
                <label htmlFor="available-seats">Available Seats:</label>
                <textarea readOnly name="available-seats" id="available-seats" />
              </div>

              <div>
                <label htmlFor="popularity">Popularity:</label>
                <textarea readOnly name="popularity" id="popularity" />
              </div>
            </div>

            {/* Section 5 */}
            <div className="event-details event-bottom-row">
              <div className="event-seat-allocation-graph">
                {/* seat graph content later */}
              </div>

              <div>
                <div className="event-details two-col">
                  <div>
                    <label htmlFor="tags">Tags:</label>
                    <textarea readOnly name="tags" id="tags" />
                  </div>
                  <div>
                    <label htmlFor="expected-attendance">Expected Attendance:</label>
                    <textarea readOnly name="expected-attendance" id="expected-attendance" />
                  </div>
                </div>

                <div className="qr-placeholder">
                  QR code payment area (leave blank)
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => (window.location.href = "/EditEvent")}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-insight"
                    onClick={() => (window.location.href = "/AttendeesDetails")}
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
