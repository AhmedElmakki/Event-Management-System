// src/pages/EditEvent.jsx
import Sidebar from "../components/Sidebar";


export default function EditEvent() {
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
            Edit Event
          </h1>

          <form className="event-details-form">
            {/* Section 1 */}
            <div className="event-details text-group">
              <div>
                <label htmlFor="event-name">Event Name:</label>
                <input
                  type="text"
                  name="event-name"
                  id="event-name"
                  placeholder="Enter event name"
                />
              </div>
              <div>
                <label htmlFor="event-date">Event Date:</label>
                <input type="date" name="event-date" id="event-date" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="event-details text-group">
              <div>
                <label htmlFor="event-venue">Event Venue:</label>
                <input
                  type="text"
                  name="event-venue"
                  id="event-venue"
                  placeholder="Enter venue"
                />
              </div>
              <div>
                <label htmlFor="event-time">Event Time:</label>
                <input type="time" name="event-time" id="event-time" />
              </div>
            </div>

            {/* Section 3 */}
            <div className="event-details">
              <div className="event-dis">
                <label htmlFor="event-description">Event Description:</label>
                <input
                  name="event-description"
                  id="event-description"
                  placeholder="Enter event description"
                />
              </div>
            </div>

            {/* Section 4 */}
            <div className="event-details grid-2">
              <div>
                <label htmlFor="ticket-price">Ticket Price:</label>
                <input type="number" name="ticket-price" id="ticket-price" />
              </div>

              <div>
                <label htmlFor="seat-amount">Seat Amount:</label>
                <input type="number" name="seat-amount" id="seat-amount" />
              </div>

              <div>
                <label htmlFor="available-seats">Available Seats:</label>
                <input type="number" name="available-seats" id="available-seats" />
              </div>

              <div>
                <label htmlFor="tags">Tags:</label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
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
                onClick={() => (window.location.href = "/EventDetails")}
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
