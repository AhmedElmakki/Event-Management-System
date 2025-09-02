import Sidebar from "../components/Sidebar";
import searchIcon from "../materials/search icon.svg"; // import images properly

export default function ManageEvent() {
  return (
    <div className="board">
      <Sidebar />

      <div className="main-content">
        <header className="manager-header">
          <div className="header-top">
            <h1 className="manager-h1">Event Management Section</h1>
            <div className="manage-filter">
              <div className="filter-menu">
                <select>
                  <option value="">Filter by...</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="searcharea2">
                <button className="search-button" title="Search">
                  <img src={searchIcon} alt="search" />
                </button>
                <input type="text" placeholder="Search..." />
              </div>
            </div>
          </div>

          <div className="manager-actions">
            <div className="actions-left">
              <button
                className="btn-add"
                onClick={() => (window.location.href = "AddEvent")}
              >
                Add Events
              </button>
              <button
                className="btn-att"
                onClick={() => (window.location.href = "AttendeesInsight")}
              >
                Attendee Insight
              </button>
            </div>

            <div className="actions-right">
              <select className="sort-select">
                <option value="">Sort by Status</option>
                <option value="upcoming">Upcoming Events</option>
                <option value="pending">Pending Events</option>
                <option value="closed">Closed Events</option>
              </select>
              <input type="date" className="date-filter" />
            </div>
          </div>
        </header>

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

        <div className="grid-holder">
          <div>
            <div
              className="event-card"
              onClick={() => window.location.href = "/EventDetails"}
            >
              Events <h1>STUFF</h1>
            </div>
          </div>

          <div>
            <div
              className="event-card"
              onClick={() => window.location.href = "/EventDetails"}
            >
              Events <h1>STUFF</h1>
            </div>
          </div>

          <div>
            <div
              className="event-card"
              onClick={() => window.location.href = "/EventDetails"}
            >
              Events <h1>STUFF</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
