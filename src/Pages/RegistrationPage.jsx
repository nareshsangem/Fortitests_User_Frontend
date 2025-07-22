import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

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
      setTimer(300); // 5 minutes
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
      console.log(err);
      setError("Invalid or expired OTP");
      errorToast("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    setError(""); setLoading2(true);
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
      setLoading2(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-blue-50 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4 relative">
        <h2 className="text-2xl font-bold text-[#2874F0] text-center">CREATE AWM ACCOUNT</h2>

        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required 
        className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
        error.email ? 'input-error' : 'border-gray-300'
        }`} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email (@gmail.com)" required 
        className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
        error.email ? 'input-error' : 'border-gray-300'
        }`} />
        <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile (10 digits)" required 
        className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
        error.email ? 'input-error' : 'border-gray-300'
         }`} />

        <select name="gender" value={form.gender} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
            error.email ? 'input-error' : 'border-gray-300'
            }`}
          />
          <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="agreedToTerms" checked={form.agreedToTerms} required onChange={handleChange} />
          I agree to the{" "}
          <button type="button" className="text-[#2874F0] font-medium underline" onClick={() => setShowTermsModal(true)}>
            Terms & Conditions
          </button>
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
              {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : "Resend OTP"}
            </button>
            <p className="text-red-600 text-sm text-center">OTP expires in: {formatTime(timer)}</p>
          </>
        )}

        {otpVerified && (
          <button onClick={registerUser} disabled={loading2} className="w-full bg-[#2874F0] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
            {loading2 ? "Registering..." : "Register"}
          </button>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-[#2874F0] font-semibold">Login here</Link>
        </p>

        {/* Terms Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
              <h3 className="text-xl font-bold mb-2 text-[#2874F0]">Terms & Conditions</h3>
              <div className="text-sm max-h-72 overflow-y-auto text-gray-700">
                <p>By registering for AWM, you agree to our terms of use including but not limited to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Your data is securely stored and not shared with third parties.</li>
                  <li>You will not attempt to cheat or misuse testing tools provided.</li>
                  <li>We may contact you via email/SMS for updates and exam tips.</li>
                  <li>Violation of terms may lead to account suspension.</li>
                </ul>
                <p className="mt-4">For full details, please visit our official Terms & Conditions page.</p>
              </div>
              <button onClick={() => setShowTermsModal(false)} className="mt-4 px-4 py-2 bg-[#2874F0] text-white rounded hover:bg-blue-600">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      
        <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25%, 75% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
          }

          .input-error {
            border-color: #ef4444; /* red-500 */
            animation: shake 0.3s ease-in-out;
          }
        `}
        </style>
              
    </div>
  );
}
