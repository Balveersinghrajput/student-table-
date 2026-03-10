import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const pageTitles = {
  "/dashboard":   { title: "Dashboard",     subtitle: "Overview of all student data" },
  "/students":    { title: "Students",       subtitle: "Manage all student records" },
  "/leaderboard": { title: "Leaderboard",    subtitle: "Top performing students" },
};

export default function Navbar({ onMenuToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, isTeacherLoggedIn, teacherSession, adminLogout, teacherLogout } = useAuth();
  const current = pageTitles[location.pathname] || { title: "EduTrack", subtitle: "" };

  const userName = isAdminLoggedIn ? "Admin" : (teacherSession?.name || "Teacher");
  const userEmail = isAdminLoggedIn ? "admin@school.com" : (teacherSession?.email || "");
  const avatarLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    if (isAdminLoggedIn) adminLogout();
    if (isTeacherLoggedIn) teacherLogout();
    navigate("/admin-login");
  };

  return (
    <header className="navbar">
      {/* Hamburger for mobile */}
      <button className="navbar-hamburger" onClick={onMenuToggle}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Page Title */}
      <div className="navbar-title-wrap">
        <h1 className="navbar-title">{current.title}</h1>
        <p className="navbar-subtitle">{current.subtitle}</p>
      </div>

      {/* User Info */}
      <div className="navbar-admin" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="navbar-admin-text">
          <div className="navbar-admin-name">{userName}</div>
          <div className="navbar-admin-email">{userEmail}</div>
        </div>
        <div className="navbar-admin-avatar">{avatarLetter}</div>
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: "#64748b" }}>
          Logout
        </button>
      </div>
    </header>
  );
}
