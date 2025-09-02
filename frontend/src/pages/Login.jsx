// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/accounts.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your backend API for authentication
    // Example:
    // fetch("/api/login", { method: "POST", body: JSON.stringify({username, password}) })

    console.log("Login submitted:", { username, password });
    navigate("/"); // redirect to dashboard or home after login
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
