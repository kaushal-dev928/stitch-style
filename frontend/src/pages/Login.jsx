import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "../api/authAPI";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ phone: "", password: ""});

    const { mutate, isPending } = useMutation({
        mutationFn: loginAPI,
        onSuccess : (res) => {
            login(res.data.user, res.data.token);
            toast.success("Login successful!");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.response?.data?.msg || "Login failed");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(form);
    };

    return (
        <div style={{ maxWidth: 380, margin: "60px auto", padding: 24 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Phone</label>
                    <input
                       type="tel"
                       placeholder="+91 xxxxx xxxxx"
                       value={form.phone}
                       onChange={(e) => setForm({ ...form, phone: e.target.value })}
                       style={{ width: "100%", padding: 10, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Password</label>
                    <input
                       type="password"
                       placeholder="Your password"
                       value={form.password}
                       onChange={(e) => setForm({ ...form, password: e.target.value })}
                       style={{ width: "100%", padding: 10, marginTop: 4}}
                    />
                </div>
                <button
                   type="submit"
                   disabled={isPending}
                   style={{
                     width: "100%", padding: 12,
                     background: "#D4537E", color: "#fff",
                     border: "none", borderRadius: 8, cursor: "pointer"
                   }}
                >
                    {isPending ? "Logging in...": "Login"}
                </button>
                <p style={{ textAlign: "center", marginTop: 12}}>
                    New here? <Link to="/register">Register Free</Link>
                </p>
            </form>
        </div>
    );
}