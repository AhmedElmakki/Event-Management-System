// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/accounts.css";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your backend API for signup
    // Example:
    // fetch("/api/signup", { method: "POST", body: JSON.stringify({username, email, ageGroup, password}) })

    console.log("Signup submitted:", { username, email, ageGroup, password, confirm });
    navigate("/login"); // redirect to login after signup
  };

  return (
    <div className="sign-board">
      <div className="sign-sidebar">
        <h1>EventX</h1>
        <h2 style={{ color: "#C1FF72" }}>Join us today!</h2>
      </div>

      <div className="form-area">
        <h1>Sign Up</h1>
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
            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Enter Display Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age-group">Age Group:</label>
            <select
              id="age-group"
              name="age-group"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="">-- Select Age Group --</option>
              <option value="18-24">18 to 24</option>
              <option value="25-34">25 to 34</option>
              <option value="35-44">35 to 44</option>
              <option value="45+">45+</option>
            </select>
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

          <div className="form-group">
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button className="form-btn" type="submit">
            Sign Up
          </button>
          <button
            type="button"
            className="form-btn"
            style={{ marginLeft: "auto" }}
            onClick={() => navigate("/Login")}
          >
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );
}
