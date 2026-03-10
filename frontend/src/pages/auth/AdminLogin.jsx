import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password.trim()) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const data = await authService.adminLogin(form.email, form.password);
      adminLogin(data.token);
      toast.success("Welcome back, Admin!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="fade-in" style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 14, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, background: "#eff6ff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 14px" }}>🎓</div>
          <h1 style={{ color: "#1e293b", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>EduTrack</h1>
          <p style={{ color: "#64748b", fontSize: 13 }}>Sign in to Admin Dashboard</p>
        </div>

        <div style={{ background: "#eff6ff", borderRadius: 8, padding: "8px 12px", marginBottom: 20 }}>
          <p style={{ color: "#3b82f6", fontSize: 11 }}>📧 admin@school.com &nbsp;|&nbsp; 🔑 admin123</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Email</label>
            <input className={"input" + (errors.email ? " input-error" : "")} type="email" placeholder="admin@school.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%" }} />
            {errors.email && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{errors.email}</p>}
          </div>
          <div>
            <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Password</label>
            <input className={"input" + (errors.password ? " input-error" : "")} type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: "100%" }} />
            {errors.password && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{errors.password}</p>}
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "10px", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, color: "#64748b", fontSize: 12 }}>
          Are you a teacher? <Link to="/teacher-login" style={{ color: "#8b5cf6", textDecoration: "none", fontWeight: 600 }}>Teacher Login →</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: 8, color: "#64748b", fontSize: 12 }}>
          Are you a student? <Link to="/student-login" style={{ color: "#10b981", textDecoration: "none", fontWeight: 600 }}>Student Login →</Link>
        </p>
      </div>
    </div>
  );
}
