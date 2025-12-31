import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../style/login.css";
import { useEffect } from "react";

export default function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    api.get("/auth/users").then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/tasks", { ...task, assignedTo });
      alert("Task created successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/admin-dashboard" className="back-link">← Back to Dashboard</Link>
        <h2 style={{ marginTop: "1rem" }}>Create New Task</h2>
        <p>Fill in the details below to organize your day.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Task Title</label>
            <input
              type="text"
              placeholder="e.g. Finish Project Report"
              required
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Add some details..."
              rows="3"
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Due Date</label>
            <input
              type="date"
              required
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Priority Level</label>
            <select
              value={task.priority}
              className="status-select"
              style={{ padding: "10px", width: "100%" }}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div className="assign">

            <select

              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            >
              <option value="">Assign to user</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Creating..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}