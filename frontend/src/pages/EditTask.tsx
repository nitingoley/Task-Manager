import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditTask = ()=>{
     const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTask = async ()=>{
    const res = await api.get(`/tasks/${id}`);
    setTitle(res.data.title);
    setDescription(res.data.description || "");
  };

  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();
    await api.put(`/tasks/${id}`, {title, description});
    navigate('/dashboard');
  };


  useEffect(()=>{
    fetchTask();
  },[]);


  return(
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Task</h2>
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;