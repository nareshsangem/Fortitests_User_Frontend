import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "../context/UserContext"; // ✅ Import the context

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // ✅ Use the context setter
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/login", form);

      if (res.data.success) {
        toast.success("Login successful!");
        setUser(res.data.user); // ✅ This is the key line to add
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">Login to FortiTests</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile"
            value={form.identifier}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 rounded-xl transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:underline text-blue-600">
            Forgot Password?
          </Link>
          <Link to="/register" className="hover:underline text-blue-600">
            New User? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
