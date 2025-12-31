import { useEffect, useState } from "react";
import api from "../services/api";
import "../style/TaskDetail.css";

export default function TaskDetails({ id }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading task details...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div className="task-details-view">
      <h2 style={{ marginTop: 0 }}>{task.title}</h2>
      <hr />
      <p>
        <strong>Description:</strong><br />
        {task.description || "No description provided."}
      </p>

      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? new Date(task.dueDate).toDateString() : "No date set"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={`status-text ${task.status}`}>{task.status}</span>
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        <span className={`priority-text ${task.priority}`}>{task.priority}</span>
      </p>

      <p>
        <strong>Assigned To:</strong>{" "}
        {task.assignedTo ? `${task.assignedTo.name} (${task.assignedTo.email})` : "Unassigned"}
      </p>
    </div>
  );
}
