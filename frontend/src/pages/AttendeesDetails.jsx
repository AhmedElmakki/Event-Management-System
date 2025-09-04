// src/pages/AttendeesDetails.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import searchIcon1 from "../materials/search icon.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  PieChart,
  Pie,
  Legend
} from "recharts";

// Helper functions for age groups
function getAgeData(participants) {
  if (!participants || !participants.length) return [];
  return Object.entries(
    participants.reduce((acc, p) => {
      const agegroup = p.agegroup || "Unknown";
      acc[agegroup] = (acc[agegroup] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
}

function getTopAgeGroup(participants) {
  if (!participants || !participants.length) return { label: "N/A", count: 0, percent: 0 };
  const counts = participants.reduce((acc, p) => {
    const agegroup = p.agegroup || "Unknown";
    acc[agegroup] = (acc[agegroup] || 0) + 1;
    return acc;
  }, {});
  const total = participants.length;
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const [label, count] = sorted[0] || ["N/A", 0];
  return { label, count, percent: ((count / total) * 100).toFixed(1) };
}

export default function AttendeesDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        data.participants = Array.isArray(data.participants) ? data.participants : [];
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading event insights...</p>;
  if (!event) return <p style={{ textAlign: "center" }}>Event not found.</p>;

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c"];

  // Age groups
  const ageGroups = [
    { label: "18–24", color: "#47B0EB", min: 18, max: 24 },
    { label: "25–34", color: "#FFDC61", min: 25, max: 34 },
    { label: "35–44", color: "#E5584D", min: 35, max: 44 },
    { label: "45+", color: "#0C9666", min: 45, max: Infinity },
  ];

  const ageGroupCounts = ageGroups.map(group => ({
    label: group.label,
    count: event.participants.filter(p => p.age >= group.min && p.age <= group.max).length,
    color: group.color
  }));

  const ageData = getAgeData(event.participants);
  const topAgeGroup = getTopAgeGroup(event.participants);

  // Interests
  const interestCounts = Object.entries(
    event.participants.reduce((acc, p) => {
      if (p.interest) acc[p.interest] = (acc[p.interest] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Countries
  const countryCounts = event.participants.reduce((acc, p) => {
    acc[p.country] = (acc[p.country] || 0) + 1;
    return acc;
  }, {});
  const sortedCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([country, count]) => ({ country, count }));

  const top4Countries = sortedCountries.slice(0, 4);

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          {/* Top Summary */}
          <header className="manager-header">
            <div className="header-top">
              <h1>Attendee Insights - {event.name}</h1>
              <div className="manage-filter">
                <div className="searcharea2">
                  <button className="search-button" title="Search">
                    <img src={searchIcon1} alt="search" />
                  </button>
                  <input type="text" placeholder="Search..." />
                </div>
              </div>
            </div>
            <div className="manager-actions">
              <div className="actions-left" style={{ fontSize: "20px" }}>
                <div>• Event Venue: {event.venue}</div>
                <div>• Event Date: {event.date?.split("T")[0]}</div>
                <div>• Event Time: {event.time}</div>
              </div>
              <div className="actions-right">
                <div className="Attendee-counter" style={{ fontSize: "15px", padding: "15px" }}>
                  Attendees: {event.participants.length}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="event-in" >
            {/* Left: Graphs */}
            <div style={{ flex: 2 }}>
              {/* Age Group Bar Chart */}
              <div className="dashboard-card attendees-main-graph">
                <h3>Attendee Age Groups</h3>
                <div className="age-legend">
                  {ageGroupCounts.map((group, i) => (
                    <div key={i} className="age-legend-item">
                      <div className="age-legend-color" style={{ backgroundColor: group.color }}></div>
                      <span>{group.label}</span>
                    </div>
                  ))}
                </div>
                {event.participants.length > 0 && (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={ageGroupCounts}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      barCategoryGap="20%"
                    >
                      <XAxis type="category" dataKey="label" />
                      <YAxis type="number" />
                      <Tooltip formatter={v => `${v} participants`} />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {ageGroupCounts.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={entry.color} />
                        ))}
                        <LabelList
                          dataKey="count"
                          position="top"
                          formatter={v => `${v} (${Math.floor((v / event.participants.length) * 100)}%)`}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Sub-graphs: Interests & Top Countries */}
              <div className="attendees-sub-graphs-holder2" style={{ display: "flex", gap: 20 }}>
                {/* Interests PieChart */}
                <div className="dashboard-card attendees-sub-graph2" style={{ flex: 1 }}>
                  <h3>Attendee Interests</h3>
                  {interestCounts.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={interestCounts}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {interestCounts.map((entry, i) => (
                            <Cell key={`cell-interest-${i}`} fill={colors[i % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={v => `${v} participants`} />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p style={{ textAlign: "center" }}>No data available</p>
                  )}
                </div>

                {/* Top Countries BarChart */}
                <div className="dashboard-card attendees-sub-graph2" style={{ flex: 1 }}>
                  <h3>Top Countries</h3>
                  {top4Countries.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={top4Countries}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        barCategoryGap="20%"
                      >
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip formatter={v => `${v} participants`} />
                        <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                          {top4Countries.map((entry, i) => (
                            <Cell key={`cell-country-${i}`} fill={colors[i % colors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p style={{ textAlign: "center" }}>No data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Metrics */}
            <div className="dashboard-sidebar-insight" style={{ flex: 1 }}>
              <div className="dashboard-card dashboard-Reach" style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }}>
                <h5>Engagement & Social Media Reach</h5>
                <h6>📢 How attendees engaged with the event</h6>
                <div className="Engagement">
                  <div className="row"><div>Instagram Mentions:</div><div style={{color:"#44A7A9"}}>no data</div></div>
                  <div className="row"><div>Facebook Shares:</div><div style={{color:"#44A7A9"}}>no data</div></div>
                  <div className="row"><div>Twitter Tweets:</div><div style={{color:"#44A7A9"}}>no data</div></div>
                  <div className="row"><div>Event Check-ins:</div><div style={{color:"#44A7A9"}}>no data</div></div>
                </div>
              </div>

              <div className="dashboard-card dashboard-Locations" style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }}>
                <h3>Attendee Locations</h3>
                <table>
                  <thead>
                    <tr><th>Location</th><th>Count</th></tr>
                  </thead>
                  <tbody>
                    {sortedCountries.slice(0, 5).map((c, i) => (
                      <tr key={i}>
                        <td>{c.country}</td>
                        <td>{c.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
