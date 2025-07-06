import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { successToast, errorToast } from "../toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    agreedToTerms: false,
    otp: ""
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const sendOtp = async () => {
    if (!form.agreedToTerms) return setError("You must agree to the Terms & Conditions");
    if (!form.email.endsWith("@gmail.com")) return setError("Only Gmail addresses allowed");
    if (!/^\d{10}$/.test(form.mobile)) return setError("Enter a valid 10-digit mobile number");

    setError(""); setLoading(true);
    try {
      await api.post("/user/send-otp", {
        email: form.email,
        mobile: form.mobile
      });
      setOtpSent(true);
      setTimer(60);
      successToast("OTP sent to your email and mobile");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP");
      errorToast("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError(""); setLoading(true);
    try {
      await api.post("/user/verify-otp", {
        email: form.email,
        mobile: form.mobile,
        otp: form.otp
      });
      setOtpVerified(true);
      successToast("OTP verified successfully");
    } catch (err) {
      console.log(err)
      setError("Invalid or expired OTP");
      errorToast("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    setError(""); setLoading(true);
    try {
      await api.post("/user/register", {
        username: form.username,
        email: form.email,
        mobile: form.mobile,
        gender: form.gender,
        password: form.password,
        agreed_to_terms: form.agreedToTerms
      });
      successToast("Registration successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
      errorToast("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-[#2874F0] text-center">Create Your FortiTests Account</h2>

        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email (@gmail.com)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]" />
        <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile (10 digits)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]" />

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]" />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="agreedToTerms" checked={form.agreedToTerms} onChange={handleChange} />
          I agree to the <span className="text-[#2874F0] font-medium">Terms & Conditions</span>
        </label>

        {!otpSent && (
          <button onClick={sendOtp} disabled={loading} className="w-full bg-[#2874F0] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}

        {otpSent && !otpVerified && (
          <>
            <input name="otp" value={form.otp} onChange={handleChange} placeholder="Enter OTP" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]" />
            <button onClick={verifyOtp} disabled={loading} className="w-full bg-[#2874F0] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button onClick={() => timer === 0 && sendOtp()} disabled={timer > 0} className={`w-full mt-2 font-semibold py-2 rounded-lg transition ${timer > 0 ? "bg-gray-400 text-white" : "bg-yellow-500 text-white hover:bg-yellow-600"}`}>
              {timer > 0 ? `Resend OTP in 0:${timer.toString().padStart(2, "0")}` : "Resend OTP"}
            </button>
          </>
        )}

        {otpVerified && (
          <button onClick={registerUser} disabled={loading} className="w-full bg-[#2874F0] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
            {loading ? "Registering..." : "Register"}
          </button>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-[#2874F0] font-semibold">Login here</Link>
        </p>
      </div>
    </div>
  );
}
