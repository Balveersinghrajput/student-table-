import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const menuItems = [
  { path: "/dashboard",   label: "Dashboard",   icon: "⊞" },
  { path: "/students",    label: "Students",     icon: "👨‍🎓" },
  { path: "/leaderboard", label: "Leaderboard",  icon: "🏆" },
];

export default function Sidebar({ isOpen, onClose }) {
  const { isAdminLoggedIn, isTeacherLoggedIn, teacherSession, adminLogout, teacherLogout } = useAuth();
  const navigate = useNavigate();

  const panelLabel = isAdminLoggedIn ? "Admin Panel" : (teacherSession?.name || "Teacher Panel");

  const handleLogout = () => {
    if (isAdminLoggedIn) adminLogout();
    if (isTeacherLoggedIn) teacherLogout();
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  const handleNav = () => {
    if (window.innerWidth < 768) onClose?.();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo + Close */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">🎓</div>
            <div>
              <div className="sidebar-logo-text">EduTrack</div>
              <div className="sidebar-logo-sub">{panelLabel}</div>
            </div>
          </div>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        {/* Menu */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main Menu</div>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNav}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="sidebar-bottom">
          <NavLink to="/student-login" onClick={handleNav} className="sidebar-link">
            <span className="sidebar-link-icon">🧑‍🎓</span>
            <span className="sidebar-link-text">Student Portal</span>
          </NavLink>
          <button onClick={handleLogout} className="sidebar-link sidebar-logout">
            <span className="sidebar-link-icon">🚪</span>
            <span className="sidebar-link-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}