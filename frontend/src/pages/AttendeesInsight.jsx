// src/pages/AttendeesInsight.jsx
import React, { useState, useEffect } from "react";
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

export default function AttendeesInsight() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Controlled input
  const [search, setSearch] = useState(""); // Triggers backend fetch

  const today = new Date();

  // Debounce search input (backend fetch)
  useEffect(() => {
  const fetchEvents = async () => {
    setLoading(true);
    try {
      // If search is empty, fetch all events
      const query = search?.trim() ? `?search=${encodeURIComponent(search.trim())}` : "";
      const res = await fetch(`http://localhost:5000/api/events${query}`);

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await res.json();

      // Log to make sure backend returns what we expect
      console.log("Fetched events:", data);

      // Make sure participants is an array (some events may have undefined participants)
      const normalizedData = data.map(e => ({
        ...e,
        participants: Array.isArray(e.participants) ? e.participants : []
      }));

      setEvents(normalizedData);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, [search]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading attendee insights...</p>;

  // Filter events only by dropdown
  let filteredEvents = events.filter(event => {
    const eventDate = event.date ? new Date(event.date) : null;

    if (filter === "upcoming" && !(eventDate && eventDate >= today)) return false;
    if (filter === "past" && !(eventDate && eventDate < today)) return false;


    return true; // No local search filtering
  });

  if (filter === "popular") {
  // Sort events by participants count, descending
  filteredEvents = [...events]
    .sort((a, b) => (b.participants?.length || 0) - (a.participants?.length || 0))
    .slice(0, 5); // take top 5
}

  // Aggregate participants
  // Aggregate participants and remove duplicates
const allParticipants = (() => {
  const map = new Map(); // Map userId -> participant
  filteredEvents.forEach(event => {
    (event.participants || []).forEach(p => {
      if (!map.has(p._id)) {
        map.set(p._id, {
          agegroup: p.agegroup || "Unknown",
          gender: p.gender || "Unknown",
          country: p.country || "Unknown"
        });
      }
    });
  });
  return Array.from(map.values());
})();

  // Colors
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c"];
  const ageColors = colors;

  // Compute top countries
  const countryCounts = allParticipants.reduce((acc, p) => {
    acc[p.country] = (acc[p.country] || 0) + 1;
    return acc;
  }, {});

  const sortedCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([country, count]) => ({ country, count }));

  // Compute age group data for PieChart
  const ageData = Object.entries(
    allParticipants.reduce((acc, p) => {
      acc[p.agegroup] = (acc[p.agegroup] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Helper to get top percentage
  const getHighestPercentage = field => {
    const counts = allParticipants.reduce((acc, p) => {
      acc[p[field]] = (acc[p[field]] || 0) + 1;
      return acc;
    }, {});
    const total = allParticipants.length;
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return { label: "N/A", percent: 0, count: 0 };
    const [label, count] = sorted[0];
    return { label, count, percent: ((count / total) * 100).toFixed(1) };
  };

  const topAgeGroup = getHighestPercentage("agegroup");
  const topGender = getHighestPercentage("gender");
  const topCountry = getHighestPercentage("country");

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          {/* Header + Filters */}
          <div className="attendees">
            <h2 className="manager-h1">Attendee Insights</h2>
            <div className="manage-filter">
              <div className="Attendee-counter">Global Participants: {allParticipants.length}</div>
              <div className="filter-menu">
                <select value={filter} onChange={e => setFilter(e.target.value)}>
                  <option value="">Filter by...</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="searcharea2" style={{ display: "flex" }}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="search-button"
                  title="Search"
                  onClick={() => setSearch(searchQuery)} // manual fetch
                >
                  <img src={searchIcon1} alt="search" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="all-events" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {/* Left Column: Cards */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="insight-card" style={{ background: "#E0F7FA", borderRadius: 12, padding: 20, position: "relative", height: 150 }}>
                <h3>Attendee Age</h3>
                <p style={{ fontSize: "2rem", marginTop: 10 }}>{topAgeGroup.label}</p>
                <p style={{ position: "absolute", bottom: 10, left: 20 }}>
                  {topAgeGroup.count} participants ({topAgeGroup.percent}%)
                </p>
              </div>
              <div className="insight-card" style={{ background: "#FCE4EC", borderRadius: 12, padding: 20, position: "relative", height: 150 }}>
                <h3>Attendee Gender</h3>
                <p style={{ fontSize: "2rem", marginTop: 10 }}>{topGender.label}</p>
                <p style={{ position: "absolute", bottom: 10, left: 20 }}>
                  {topGender.count} participants ({topGender.percent}%)
                </p>
              </div>
              <div className="insight-card" style={{ background: "#FFF3E0", borderRadius: 12, padding: 20, position: "relative", height: 150 }}>
                <h3>Attendee Country</h3>
                <p style={{ fontSize: "2rem", marginTop: 10 }}>{topCountry.label}</p>
                <p style={{ position: "absolute", bottom: 10, left: 20 }}>
                  {topCountry.count} participants ({topCountry.percent}%)
                </p>
              </div>
            </div>

            {/* Right Column: Graphs */}
            <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
              {/* Bar Chart */}
              <div className="attendees-main-graph" style={{ height: 300 }}>
                {allParticipants.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sortedCountries.map(d => ({
                        ...d,
                        percent: ((d.count / allParticipants.length) * 100).toFixed(0)
                      }))}
                      layout="horizontal"
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      barCategoryGap="20%"
                    >
                      <XAxis type="category" dataKey="country" />
                      <YAxis type="number" tickFormatter={v => Math.floor(v)} />
                      <Tooltip formatter={v => Math.floor(v)} />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {sortedCountries.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                        <LabelList
                          dataKey="count"
                          position="top"
                          formatter={v => `${Math.floor(v)} (${Math.floor((v / allParticipants.length) * 100)}%)`}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Pie Charts */}
                <div className="attendees-sub-graphs-holder" style={{ display: "flex", gap: 20 }}>
{/* Left Donut Chart: Top 5 events by participants */}
<div
  className="attendees-sub-graph"
  style={{ flex: 1, minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center" }}
>
  {events.filter(e => (e.participants?.length || 0) > 0).length > 0 && (
    <ResponsiveContainer width="100%" height="80%">
      <PieChart>
        {(() => {
          // Filter events with participants >0, sort by participants, take top 5
          const topEvents = [...filteredEvents]
            .filter(e => (e.participants?.length || 0) > 0)
            .sort((a, b) => (b.participants?.length || 0) - (a.participants?.length || 0))
            .slice(0, 5)
            .map(ev => ({ name: ev.name, value: ev.participants.length }));

          return (
            <Pie
              data={topEvents}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40} // donut style
              outerRadius={80}
              paddingAngle={5}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {topEvents.map((entry, i) => (
                <Cell key={`cell-top-${i}`} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          );
        })()}
        <Tooltip formatter={v => `${v} participants`} />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          formatter={(value) => value} // ensures event names show
        />
      </PieChart>
    </ResponsiveContainer>
  )}
</div>

                  {/* Right Pie Chart: Age groups */}
                  <div
                    className="attendees-sub-graph"
                    style={{ flex: 1, minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    {ageData.length > 0 && (
                      <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                          <Pie
                            data={ageData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={0} // normal pie (not donut)
                            outerRadius={80}
                            paddingAngle={5}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {ageData.map((entry, i) => (
                              <Cell key={`cell-age-${i}`} fill={ageColors[i % ageColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={v => `${v} participants`} />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
