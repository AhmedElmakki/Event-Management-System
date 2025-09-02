// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/accounts.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message); // show error from backend
      return;
    }

    // Save role or token for frontend usage
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("token", data.token);

    console.log("Login successful:", data.user);
    navigate("/"); // go to dashboard
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <div className="sign-board">
      <div className="sign-sidebar">
        <h1>EventX</h1>
        <h2 style={{ color: "#C1FF72" }}>Welcome back!</h2>
      </div>

      <div className="form-area">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="form-btn" type="submit">
            Login
          </button>
          <button
            type="button"
            className="form-btn"
            style={{ marginLeft: "auto" }}
            onClick={() => navigate("/Signup")}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
