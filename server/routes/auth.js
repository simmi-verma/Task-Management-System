const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/login", async(req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).json({ msg: "Invalid Credentials" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if(!match) return res.status(400).json({ msg: "Invalid Credentials" });

  // Add "role" to the payload
  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ 
    token, 
    user: { id: user._id, name: user.name, role: user.role } 
  });
});

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  res.status(201).json({ message: "User registered successfully" });
});
router.get("/users", [authMiddleware, admin], async (req, res) => {
  const users = await User.find({ role: "user" })
    .select("_id name email");

  res.json(users);
});

// GET tasks assigned to the logged-in user



module.exports = router;
