import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

export default function StudentLogin() {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { studentLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId.trim()) { setError("Student ID is required"); return; }
    setLoading(true);
    try {
      const data = await authService.studentLogin(studentId.trim());
      studentLogin(data.student);
      toast.success("Welcome, " + data.student.name + "!");
      navigate("/student-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Student ID not found");
      setError("Student ID not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="fade-in" style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 14, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, background: "#ecfdf5", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 14px" }}>🧑‍🎓</div>
          <h1 style={{ color: "#1e293b", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Student Portal</h1>
          <p style={{ color: "#64748b", fontSize: 13 }}>Enter your Student ID to view your profile</p>
        </div>

        <div style={{ background: "#ecfdf5", borderRadius: 8, padding: "8px 12px", marginBottom: 20 }}>
          <p style={{ color: "#059669", fontSize: 11 }}>💡 Example: STU101, STU102, STU103...</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Student ID</label>
            <input className={"input" + (error ? " input-error" : "")} type="text" placeholder="e.g. STU101" value={studentId} onChange={(e) => { setStudentId(e.target.value); setError(""); }} style={{ width: "100%", letterSpacing: 1 }} />
            {error && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{error}</p>}
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "10px", background: "#10b981", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Searching..." : "View My Profile →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, color: "#64748b", fontSize: 12 }}>
          Are you an admin? <Link to="/admin-login" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>Admin Login →</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: 8, color: "#64748b", fontSize: 12 }}>
          Are you a teacher? <Link to="/teacher-login" style={{ color: "#8b5cf6", textDecoration: "none", fontWeight: 600 }}>Teacher Login →</Link>
        </p>
      </div>
    </div>
  );
}
