import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/EditTask.css"; // Create this file

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: ""
  });
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    api.get("/auth/users").then(res => setUsers(res.data));
  }, [])

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask({
        title: res.data.title,
        description: res.data.description,
        dueDate: res.data.dueDate ? res.data.dueDate.slice(0, 10) : ""
      });
      setAssignedTo(res.data.assignedTo?._id || ""); // populate assigned user
    } catch (err) {
      console.error("Failed to fetch task");
    }
  };


  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, {
        ...task,
        assignedTo  // send assigned user
      });
      alert("Task updated successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };


  return (
    <div className="edit-container">
      <div className="edit-card">
        <form onSubmit={updateTask} className="edit-form">
          <h2>Edit Task</h2>
          <p className="subtitle">Update your task details below</p>

          <div className="input-group">
            <label>Task Title</label>
            <input
              type="text"
              value={task.title}
              placeholder="e.g. Finish Project"
              required
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              value={task.description}
              placeholder="Describe the task..."
              rows="4"
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Due Date</label>
            <input
              type="date"
              value={task.dueDate}
              required
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
          </div>
          <div className="assign">
            <label>Assign To User</label>
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

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}