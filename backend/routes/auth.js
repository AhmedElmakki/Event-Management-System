// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, name, email, agegroup, gender, country, password, role, interest } = req.body;

    // Validate required fields
    if (!username || !name || !email || !agegroup || !gender || !country || !interest || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user, include interest
    const user = new User({
      username,
      name,
      email,
      agegroup,
      gender,
      country,
      password: hashedPassword,
      role,
      interest, // default to empty string if not selected
    });

    await user.save();

    // Return basic info including interest
    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        agegroup: user.agegroup,
        gender: user.gender,
        country: user.country,
        role: user.role,
        interest: user.interest,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login success",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        gender: user.gender,
        country: user.country,
        agegroup: user.agegroup,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
