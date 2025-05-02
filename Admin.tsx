import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="bg-white shadow rounded p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>
        <p>You have access to the admin dashboard.</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
