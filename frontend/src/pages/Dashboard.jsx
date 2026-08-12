import React from "react";
import { useNavigate } from "react-router-dom";
import Todos from "../components/Todos";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">MERN Todo</h1>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-600">
              Hi, {user?.name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="px-4 py-8">
        <Todos />
      </main>
    </div>
  );
};

export default Dashboard;
