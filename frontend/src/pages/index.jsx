import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// icons
import bellIcon from "../materials/bell.svg";
import calendarIcon from "../materials/calender.svg";
import search from "../materials/search icon.svg";

export default function Index() {
  const [user, setUser] = useState({ username: "", role: "" });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role"); // "admin" or "user"

  // ✅ Always call hooks — never conditionally
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const eventsRes = await fetch("http://localhost:5000/api/events");
        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        const eventsData = await eventsRes.json();

        const normalizedEvents = eventsData.map((e) => ({
          ...e,
          participants: Array.isArray(e.participants) ? e.participants : [],
        }));

        setEvents(normalizedEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Redirect handled after hooks
  if (role !== "admin") {
    return <Navigate to="/bookingtickets" replace />;
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;
  }

  const totalParticipants = events.reduce(
    (acc, e) => acc + e.participants.length,
    0
  );
  const totalRevenue = events.reduce(
    (acc, e) => acc + (e.ticketPrice || 0) * e.participants.length,
    0
  );

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];

  // Top 5 events by attendees
  const top5Events = [...events]
    .sort((a, b) => b.participants.length - a.participants.length)
    .slice(0, 5);

  // Data for bar chart
  const top5RevenueData = top5Events.map((e) => ({
    name: e.name,
    ticketsSold: e.participants.length,
    revenue: (e.ticketPrice || 0) * e.participants.length,
  }));


  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />

        <div className="main-content">
          {/* Top bar */}
          <div className="search">
            <div className="pfp"></div>
            <div className="userinfo">
              <div className="welcome">Welcome {user.username}</div>
              <div className="role">{user.role}</div>
            </div>
            <div className="utility">
              <div className="searcharea">
                <button className="search-button" title="Search">
                  <img src={search} alt="search" />
                </button>
                <input placeholder="Search..." />
              </div>
              <button className="uti">
                <img src={bellIcon} alt="notification" />
              </button>
              <button className="uti">
                <img src={calendarIcon} alt="calendar" />
              </button>
            </div>
          </div>

          <div className="dashboard">
            <main className="dashboard-main">
              {/* Top stats */}
              <section className="dashboard-top-stats">
                <div className="dashboard-stat-box" onClick={() => (window.location.href = "manage-event")}>
                  <div><h2 style={{color:"blue"}}>Events:</h2> </div>
                  <div><h1 style={{color:"blue"}}>{events.length}</h1></div>
                </div>
                <div className="dashboard-stat-box">
                 <div> <h2 style={{color:"brown"}}>Bookings:</h2> </div> 
                 <div><h1 style={{color:"brown"}}>{totalParticipants}</h1></div>
                  </div>
                <div className="dashboard-stat-box">
                  <div> <h2 style={{color:"green"}}>Revenue:</h2> </div> 
                  <div><h1 style={{color:"green"}}>${totalRevenue.toLocaleString()}</h1></div></div>
                  
                  
              </section>

              {/* Charts */}
              <section className="dashboard-charts">
                {/* Ticket Sales Bar Chart */}
                <div className="dashboard-card dashboard-net-sales" style={{ height: "600px", padding: "10px" }}>
                  <h3 style={{ textAlign: "center" }}>Event Ticket Sales</h3>
                  {top5RevenueData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="85%">
                      <BarChart data={top5RevenueData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [
                          value,
                          name === "ticketsSold" ? "Tickets Sold" : "Revenue ($)"
                        ]} />
                        <Bar dataKey="ticketsSold" radius={[5, 5, 0, 0]}>
                          {top5RevenueData.map((entry, index) => (
                            <Cell key={`cell-tickets-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Bar>
                        <Bar dataKey="revenue" radius={[5, 5, 0, 0]}>
                          {top5RevenueData.map((entry, index) => (
                            <Cell key={`cell-revenue-${index}`} fill={colors[(index + 1) % colors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p style={{ textAlign: "center", marginTop: "50px" }}>No data available</p>
                  )}
                </div>

                {/* Top 5 Events Pie Chart */}
                <div className="dashboard-card dashboard-engagement" style={{ height: "600px", padding: "10px" }}>
                  <h3 style={{ textAlign: "center" }}>Top 5 Events by Attendees</h3>
                  {top5Events.length > 0 ? (
                    <ResponsiveContainer width="100%" height="75%">
                      <PieChart>
                        <Pie
                          data={top5Events.map(e => ({ name: e.name, value: e.participants.length }))}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius="80%"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {top5Events.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={v => `${v} attendees`} />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: "center", marginTop: "50px" }}>No data available</div>
                  )}
                </div>
              </section>

            </main>

            {/* Right Sidebar */}
            <aside className="dashboard-sidebar"  style={{ flex: 1 }} >
              <div className="dashboard-card dashboard-upcoming-events">
                <h3>Upcoming Events</h3>
                <hr style={{ border: "0.5px solid #ccc", margin: "8px 0" }} />
                {events.filter(e => e.status === "upcoming" || !e.status).map(event => (
                  <div key={event._id} className="upcoming-event-card">
                    <strong>{event.name}</strong>
                    <p>{event.date ? new Date(event.date).toLocaleDateString() : "No date set"}</p>
                    <p>{event.venue}</p>
                    <hr style={{ border: "0.5px solid #ccc", margin: "8px 0" }} />
                  </div>
                  
                ))}
                {events.filter(e => e.status === "upcoming" || !e.status).length === 0 && <p>No upcoming events</p>}
              </div>
              <div className="dashboard-card dashboard-notifications">Notifications</div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
