import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { toast, Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("send"); // send | verify
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    identifier: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    if (!form.identifier) return toast.error("Enter email or mobile");
    setLoading(true);
    try {
      const res = await api.post("/user/send-otp-for-password-reset", {
        identifier: form.identifier,
      });
      if (res.data.success) {
        toast.success("OTP sent successfully");
        setStep("verify");
      } else {
        toast.error(res.data.msg || "Failed to send OTP");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, otp, newPassword, confirmPassword } = form;

    if (!otp || !newPassword || !confirmPassword)
      return toast.error("All fields required");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const res = await api.post("/user/forgot-password/verify-reset", {
        identifier,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successful");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data.msg || "Reset failed");
      }
    } catch {
      toast.error("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = () => sendOtp();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full bg-blue-50 rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile"
            value={form.identifier}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
            disabled={step !== "send"}
            required
          />

          {step === "send" ? (
            <button
              type="button"
              onClick={sendOtp}
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded-xl transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Resend OTP
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-semibold ${
                    loading && "cursor-not-allowed opacity-60"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
