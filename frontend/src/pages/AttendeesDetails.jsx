// src/pages/AttendeeInsights.jsx
import Sidebar from "../components/Sidebar";
import search from "../materials/search icon.svg";


export default function AttendeesDetails() {
  return (
    <div className="global-body" >
      <div className="board">
        <Sidebar />

        <div className="main-content">
          <header className="manager-header">
            <div className="header-top">
              <h1 className="manager-h1">Attendee Insights</h1>
              <div className="manage-filter">
                <div className="searcharea2">
                  <button className="search-button" title="Search">
                    <img src={search} alt="search" />
                  </button>
                  <input type="text" placeholder="Search..." />
                </div>
              </div>
            </div>

            <div className="manager-actions">
              <div className="actions-left">
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
              </div>

              <div className="actions-right">
                <div
                  className="Attendee-counter"
                  style={{ fontSize: "15px", padding: "15px" }}
                >
                  Attendees: *number*
                </div>
                <select className="sort-select">
                  <option value="">Sort by Status</option>
                  <option value="upcoming">Upcoming Events</option>
                  <option value="pending">Pending Events</option>
                  <option value="closed">Closed Events</option>
                </select>
              </div>
            </div>
          </header>

          <div className="event-in">
            <div>
              <div className="dashboard-card attendees-main-graph">
                <h3>Attendee Age</h3>
              </div>

              <div className="attendees-sub-graphs-holder2">
                <div className="dashboard-card attendees-sub-graph2">
                  <h3>Attendee Interest</h3>
                </div>
                <div className="dashboard-card attendees-sub-graph2">
                  <h3>Attendee Top Location</h3>
                </div>
              </div>
            </div>

            <div>
              <aside className="dashboard-sidebar">
                <div className="dashboard-card dashboard-upcoming-events">
                  <h3>Engagement</h3>
                </div>
                <div className="dashboard-card dashboard-notifications">
                  <h3>Location</h3>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
