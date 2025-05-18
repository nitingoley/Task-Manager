import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Tasks</h2>
      <Link
        to="/add-task"
        className="block text-right mb-4 text-blue-500 underline"
      >
        + Add New Task
      </Link>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="border rounded p-4 shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              {task.description && (
                <p className="text-gray-600">{task.description}</p>
              )}
              <div className="mt-2 flex gap-4">
                <Link
                  to={`/edit-task/${task._id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
