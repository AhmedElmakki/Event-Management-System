import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import searchIcon from "../materials/search icon.svg";

export default function ManageEvent() {
  const role = localStorage.getItem("role"); // "admin" or "user"
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
              {role === "admin" && (
                <div className="actions-left">
                  <button
                    className="btn-add"
                    onClick={() => navigate("/AddEvent")}
                  >
                    Add Events
                  </button>

                  <button
                    className="btn-att"
                    onClick={() => navigate("/AttendeesInsight")}
                  >
                    Attendee Insight
                  </button>
                </div>
              )}

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
            {/* Upcoming Events Column */}
            <div className="event-column">
              {events
                .filter(e => e.status === "upcoming" || !e.status)
                .map(event => (
                  <div key={event._id} className="event-card">
                    <h2>{event.name}</h2>
                    <p>{event.date ? new Date(event.date).toLocaleDateString() : "No date set"} </p>
                    <p>{event.venue}</p>
                    <p>Status: {event.status || "upcoming"}</p>
                    
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
                  <div key={event._id} className="event-card">
                    <h2>{event.name}</h2>
                    <p>{event.date ? new Date(event.date).toLocaleDateString() : "No date set"} </p>
                    <p>{event.venue}</p>
                    <p>Status: {event.status}</p>
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
                  <div key={event._id} className="event-card" >
                    <h2>{event.name}</h2>
                    <p>{event.date ? new Date(event.date).toLocaleDateString() : "No date set"} </p>
                    <p>{event.venue}</p>
                    <p>Status: {event.status}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
