import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/tasks?page=${page}`).then(res => setTasks(res.data));
  }, [page]);

  return (
    <>
      {tasks.map(task => (
        <div key={task._id} className={task.priority}>
          <h3>{task.title}</h3>
          <p>{task.dueDate}</p>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
}
