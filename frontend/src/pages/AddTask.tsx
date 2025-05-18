import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';


const AddTask = ()=>{
     const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/tasks', { title, description });
    navigate('/dashboard');
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          className="w-full border px-4 py-2 mb-4 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full border px-4 py-2 mb-4 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;