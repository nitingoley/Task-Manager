import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-400">Task Manager</h1>
      <div className="flex items-center gap-4">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/add-task" className="hover:text-blue-400">
              Add Task
            </Link>
            <button
              onClick={handleLogout}
              className="border border-blue-400 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};


export default Navbar;