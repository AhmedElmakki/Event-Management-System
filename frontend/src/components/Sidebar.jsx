import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  // Track which collapsibles are open
  const [activeSections, setActiveSections] = useState({});

  // Initialize from localStorage
  useEffect(() => {
    const storedState = {};
    const keys = [
      "Main Navigation",
      "Support & Management",
      "Additional Features",
      "Account Management",
    ];
    keys.forEach((key) => {
      storedState[key] = localStorage.getItem("sidebar-" + key) === "true";
    });
    setActiveSections(storedState);
  }, []);

  // Toggle collapsible
  const toggleSection = (key) => {
    const newState = { ...activeSections, [key]: !activeSections[key] };
    setActiveSections(newState);
    localStorage.setItem("sidebar-" + key, newState[key]);
  };

  return (
    <div className="sidebar">
      <h1>EventX</h1>

      <button className="add-event" onClick={() => navigate("/AddEvent")}>
        <div className="plus">
          <div className="pluss"></div>
        </div>
        <div className="label">Add Quick Event</div>
      </button>

      <div className="side-bar-content">
        {/* Main Navigation */}
        <button
          className={`collapsible ${
            activeSections["Main Navigation"] ? "active" : ""
          }`}
          onClick={() => toggleSection("Main Navigation")}
        >
          Main Navigation
        </button>
        <div
          className="content"
          style={{
            maxHeight: activeSections["Main Navigation"] ? "500px" : "0",
          }}
        >
          <a onClick={() => navigate("/")} className="menu-item">
            📊 Dashboard
          </a>
          <a onClick={() => navigate("/manage-event")} className="menu-item">
            📅 Manage Events
          </a>
          <a className="menu-item">🎟️ Booking & Tickets</a>
          <a onClick={() => navigate("/AttendeesInsight")} className="menu-item">
            👥 Attendee Insights
          </a>
          <div className="menu-item">📈 Analytics & Reports</div>
        </div>

        {/* Support & Management */}
        <button
          className={`collapsible ${
            activeSections["Support & Management"] ? "active" : ""
          }`}
          onClick={() => toggleSection("Support & Management")}
        >
          Support & Management
        </button>
        <div
          className="content"
          style={{
            maxHeight: activeSections["Support & Management"] ? "500px" : "0",
          }}
        >
          <a className="menu-item">🆘 Contact Support</a>
          <a className="menu-item">🔔 Notifications</a>
          <a className="menu-item">⚙️ Settings</a>
        </div>

        {/* Additional Features */}
        <button
          className={`collapsible ${
            activeSections["Additional Features"] ? "active" : ""
          }`}
          onClick={() => toggleSection("Additional Features")}
        >
          Additional Features
        </button>
        <div
          className="content"
          style={{
            maxHeight: activeSections["Additional Features"] ? "500px" : "0",
          }}
        >
          <a className="menu-item">📢 Marketing</a>
          <a className="menu-item">📂 Event Categories</a>
        </div>

        {/* Account Management */}
        <button
          className={`collapsible ${
            activeSections["Account Management"] ? "active" : ""
          }`}
          onClick={() => toggleSection("Account Management")}
        >
          Account Management
        </button>
        <div
          className="content"
          style={{
            maxHeight: activeSections["Account Management"] ? "500px" : "0",
          }}
        >
          <div className="menu-item">👤 Manage Users</div>
          <div className="menu-item">🚪 Logout</div>
        </div>
      </div>
    </div>
  );
}
