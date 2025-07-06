import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileSidebar({ user }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/user/logout", {}, { withCredentials: true });
      setOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden"
      >
        {user?.profile_image ? (
          <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-gray-800 font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={sidebarRef}
          className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 z-50"
        >
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          <hr className="my-2" />
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileSidebar;
