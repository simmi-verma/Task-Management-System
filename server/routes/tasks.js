const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", [auth, admin], async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    assignedTo,
    createdBy: req.user.id
  });

  await task.save();
  res.status(201).json(task);
});

router.get("/admin/all-tasks", [auth, admin], async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
// Get tasks (user/admin)
router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let filter = {};

  // USER → only tasks assigned to them
  if (req.user.role === "user") {
    filter.assignedTo = req.user.id;
  }

  try {
    const tasks = await Task.find(filter)
      .select("title dueDate status priority assignedTo")
      .populate("assignedTo", "name email") // ✅ populate assigned user
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit);

    const totalTasks = await Task.countDocuments(filter);

    res.json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/my-tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .select("title description dueDate priority status assignedTo")
      .populate("assignedTo", "name email")  // populate assigned user's info
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});


router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.patch("/:id/priority", authMiddleware, async (req, res) => {
  try {
    const { priority } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", auth, async(req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});


module.exports = router;
