// src/pages/AttendeesInsight.jsx
import Sidebar from "../components/Sidebar";
import "../styles/styles.css"; // your global styles

export default function AttendeesInsight() {
  const goToSingleInsight = () => {
    window.location.href = "/attendees-insight-single"; // adjust path if using React Router
  };

  return (
    <div className="board">
      <Sidebar />

      <div className="main-content">
        <div className="attendees">
          <h2 className="manager-h1">All Attendees Insight</h2>

          <div className="manage-filter">
            <div className="Attendee-counter">Attendees: *number*</div>
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
                <img src="/materials/search icon.svg" alt="search" />
              </button>
              <input type="text" placeholder="Search..." />
            </div>
          </div>
        </div>

        <div className="all-events">
          <div>
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="event-card"
                style={{ height: "100px", padding: "10px" }}
                onClick={goToSingleInsight}
              >
                Events <h1>STUFF</h1>
              </div>
            ))}
          </div>

          <div>
            <div className="attendees-main-graph"></div>

            <div className="attendees-sub-graphs-holder">
              <div className="attendees-sub-graph"></div>
              <div className="attendees-sub-graph"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
