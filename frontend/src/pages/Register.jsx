import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { registerAPI, verifyOTPAPI } from "../api/authAPI";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1=form, 2=otp
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: ""
  });

  // Step 1 — Register
  const { mutate: register, isPending: registering } = useMutation({
    mutationFn: registerAPI,
    onSuccess: (res) => {
      setUserId(res.data.userId);
      setStep(2);
      toast.success("OTP sent to your email!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.msg || "Register failed");
    },
  });

  // Step 2 — Verify OTP
  const { mutate: verifyOTP, isPending: verifying } = useMutation({
    mutationFn: verifyOTPAPI,
    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      toast.success("Email verified! Welcome!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.msg || "Invalid OTP");
    },
  });

  return (
    <div style={{ maxWidth: 380, margin: "60px auto", padding: 24 }}>
      <h2>{step === 1 ? "Create account" : "Verify OTP"}</h2>

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); register(form); }}>
          {["name", "phone", "email", "password"].map((field) => (
            <div key={field} style={{ marginBottom: 12 }}>
              <label style={{ textTransform: "capitalize" }}>{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                placeholder={field}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 4 }}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={registering}
            style={{
              width: "100%", padding: 12,
              background: "#D4537E", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer"
            }}
          >
            {registering ? "Sending OTP..." : "Register"}
          </button>
          <p style={{ textAlign: "center", marginTop: 12 }}>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </form>
      )}

      {step === 2 && (
        <div>
          <p style={{ color: "#666", marginBottom: 16 }}>
            OTP aapke email pe bheja gaya hai
          </p>
          <input
            type="text"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 16 }}
          />
          <button
            onClick={() => verifyOTP({ userId, otp })}
            disabled={verifying}
            style={{
              width: "100%", padding: 12,
              background: "#D4537E", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer"
            }}
          >
            {verifying ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  );
}
