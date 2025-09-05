import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";

export default function ExportData() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (role !== "admin") {
    navigate("/"); // non-admins kicked back
    return null;
  }

  const downloadData = async (endpoint, filename) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();

      // Convert JSON -> Worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, endpoint);

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.xlsx`;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  // -------------------- IMPORT DATA --------------------
  const importData = async (event) => {
    const files = event.target.files; // two selected files: users.xlsx, events.xlsx
    if (!files.length) return;

    setLoading(true);

    try {
      for (const file of files) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        let endpoint = "";
        if (file.name.toLowerCase().includes("user")) endpoint = "users/import";
        else if (file.name.toLowerCase().includes("event")) endpoint = "events/import";
        else continue;

        const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        });

        if (!res.ok) throw new Error(`Failed to import ${file.name}`);
      }

      alert("Data imported successfully!");
    } catch (err) {
      console.error(err);
      alert("Error importing data: " + err.message);
    } finally {
      setLoading(false);
      event.target.value = null; // reset file input
    }
  };

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          <h1 className="manager-h1">📤 Export & Import Server Data</h1>

          <div style={{ marginTop: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* DOWNLOAD BUTTONS */}
            <button
              className="btn-add"
              disabled={loading}
              onClick={() => { setLoading(true); downloadData("users", "all_users").finally(() => setLoading(false)); }}
            >
              {loading ? "Downloading..." : "Download Users"}
            </button>

            <button
              className="btn-att"
              disabled={loading}
              onClick={() => { setLoading(true); downloadData("events", "all_events").finally(() => setLoading(false)); }}
            >
              {loading ? "Downloading..." : "Download Events"}
            </button>

            <button
              className="btn-all"
              disabled={loading}
              onClick={() => { setLoading(true); Promise.all([
                downloadData("users", "all_users"),
                downloadData("events", "all_events")
              ]).finally(() => setLoading(false)); }}
            >
              {loading ? "Downloading..." : "Download All Data"}
            </button>

            {/* IMPORT BUTTON */}
            <label className="btn-import">
              {loading ? "Importing..." : "Import Data (Users & Events)"}
              <input
                type="file"
                multiple
                accept=".xlsx, .xls"
                onChange={importData}
                style={{ display: "none" }}
                disabled={loading}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
