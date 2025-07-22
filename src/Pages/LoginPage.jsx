import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { Eye, EyeOff } from "lucide-react"; // ✅ Eye icons

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ identifier: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    const newErrors = {
      identifier: !form.identifier.trim(),
      password: !form.password.trim(),
    };
    setErrors(newErrors);

    if (newErrors.identifier || newErrors.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/user/login", form);
      if (res.data.success) {
        toast.success("Login successful!");
        setUser(res.data.user);
        localStorage.setItem("fortitests_user", JSON.stringify(res.data.user));
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
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full bg-blue-50 rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">Login to AWM</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile"
            value={form.identifier}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500 ${
              errors.identifier ? "input-error" : ""
            }`}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500 pr-10 ${
                errors.password ? "input-error" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

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

      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25%, 75% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
          }

          .input-error {
            border-color: #ef4444 !important;
            animation: shake 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
