import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/Dashboard.css"; // Reusing the same CSS file

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Priority styling config (matches admin dashboard)
  const priorityConfig = {
    high: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
    medium: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
    low: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  };

  const statusConfig = {
    pending: { bg: "#f3f4f6", text: "#4b5563" },
    "in-progress": { bg: "#dbeafe", text: "#4338ca" },
    completed: { bg: "#d1fae5", text: "#065f46" },
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/my-tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Failed to load your tasks");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>My Tasks</h1>
            <p>Tasks assigned to you</p>
          </div>
          <div className="header-actions">
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No tasks assigned yet</h3>
            <p>You'll see tasks here when they're assigned to you.</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-card-header">
                  <h3 className="task-title">{task.title}</h3>
                  <span
                    className="priority-badge"
                    style={{
                      backgroundColor: priorityConfig[task.priority]?.bg || "#f3f4f6",
                      color: priorityConfig[task.priority]?.text || "#374151",
                      borderColor: priorityConfig[task.priority]?.border || "#d1d5db",
                    }}
                  >
                    {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1) || "Low"}
                  </span>
                </div>

                {task.description && (
                  <div className="task-description">
                    {task.description}
                  </div>
                )}

                <div className="task-details">
                  <div className="detail-row">
                    <strong>Due Date:</strong>
                    <span>
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No due date"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <strong>Status:</strong>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: statusConfig[task.status]?.bg || "#f3f4f6",
                        color: statusConfig[task.status]?.text || "#4b5563",
                      }}
                    >
                      {task.status
                        ? task.status.charAt(0).toUpperCase() + task.status.slice(1).replace("-", " ")
                        : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}