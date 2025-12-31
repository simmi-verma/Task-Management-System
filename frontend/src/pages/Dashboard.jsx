import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/Dashboard.css"; // Make sure this points to your CSS file
import TaskDetails from "./TaskDetails";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

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

  const applySorting = (taskList) => {
    if (!taskList) return [];
    const order = { high: 1, medium: 2, low: 3 };
    return [...taskList].sort(
      (a, b) => (order[a.priority] || 3) - (order[b.priority] || 3)
    );
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?page=${page}&limit=10`);
      const sorted = applySorting(res.data.tasks);
      setTasks(sorted);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      alert("Failed to load tasks");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/status`, { status });
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const updatePriority = async (taskId, newPriority) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/priority`, { priority: newPriority });
      setTasks((prev) => {
        const updated = prev.map((task) =>
          task._id === taskId ? res.data : task
        );
        return applySorting(updated);
      });
    } catch (error) {
      alert("Failed to update priority");
    }
  };

  return (
    <>
      {/* Modal */}
      {selectedTaskId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Task Details</h2>
              <button
                onClick={() => setSelectedTaskId(null)}
                className="modal-close"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <TaskDetails id={selectedTaskId} />
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>Task Management</h1>
              <p>Stay organized and boost your productivity</p>
            </div>
            <div className="header-actions">
              <Link to="/create-task" className="btn-primary">
                + New Task
              </Link>
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
              <div className="empty-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>Get started by creating your first task!</p>
              <Link to="/create-task" className="btn-primary">
                + Create Your First Task
              </Link>
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

                  <div className="task-details">
                    <div className="detail-row">
                      <strong>Due:</strong>
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
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task._id, e.target.value)}
                        className="status-select"
                        style={{
                          backgroundColor: statusConfig[task.status]?.bg || "#f3f4f6",
                          color: statusConfig[task.status]?.text || "#4b5563",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="detail-row">
                      <strong>Priority:</strong>
                      <select
                        value={task.priority}
                        onChange={(e) => updatePriority(task._id, e.target.value)}
                        className="priority-select"
                        style={{
                          backgroundColor: priorityConfig[task.priority]?.bg,
                          color: priorityConfig[task.priority]?.text,
                          borderColor: priorityConfig[task.priority]?.border,
                        }}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>

                    <div className="detail-row">
                      <strong>Assigned to:</strong>
                      <span>{task.assignedTo ? task.assignedTo.name : "Unassigned"}</span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => setSelectedTaskId(task._id)}
                      className="action-link view"
                    >
                      View Details
                    </button>
                    <Link to={`/task/edit/${task._id}`} className="action-link edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="action-link delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}