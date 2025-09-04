// src/pages/ExportData.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportData() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (role !== "admin") {
    navigate("/"); // non-admins kicked back
    return null;
  }

  const downloadData = async (endpoint, filename) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();

      // Convert JSON -> Worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, endpoint);

      // Write file
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, `${filename}.xlsx`);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          <h1 className="manager-h1">📤 Export Server Data</h1>

          <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
            <button
              className="btn-add"
              disabled={loading}
              onClick={() => downloadData("users", "all_users")}
            >
              {loading ? "Downloading..." : "Download Users"}
            </button>

            <button
              className="btn-att"
              disabled={loading}
              onClick={() => downloadData("events", "all_events")}
            >
              {loading ? "Downloading..." : "Download Events"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
