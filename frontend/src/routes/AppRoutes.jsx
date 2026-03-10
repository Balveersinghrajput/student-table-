import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Auth Pages
import AdminLogin from "../pages/auth/AdminLogin";
import StudentLogin from "../pages/auth/StudentLogin";
import TeacherLogin from "../pages/auth/TeacherLogin";
import TeacherRegister from "../pages/auth/TeacherRegister";

// Admin/Teacher Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Leaderboard from "../pages/leaderboard/Leaderboard";
import AddStudent from "../pages/students/AddStudent";
import EditStudent from "../pages/students/EditStudent";
import StudentProfile from "../pages/students/StudentProfile";
import StudentsList from "../pages/students/StudentsList";

// Student Portal
import StudentDashboard from "../pages/studentPortal/StudentDashboard";

// Layout
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f8fafc" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function ProtectedDashboardRoute({ children }) {
  const { isAdminLoggedIn, isTeacherLoggedIn } = useAuth();
  if (!isAdminLoggedIn && !isTeacherLoggedIn) return <Navigate to="/admin-login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
}

function ProtectedStudentRoute({ children }) {
  const { isStudentLoggedIn } = useAuth();
  if (!isStudentLoggedIn) return <Navigate to="/student-login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/admin-login" replace />} />

      {/* Auth Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />
      <Route path="/teacher-register" element={<TeacherRegister />} />
      <Route path="/student-login" element={<StudentLogin />} />

      {/* Admin & Teacher Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedDashboardRoute><Dashboard /></ProtectedDashboardRoute>
      } />
      <Route path="/students" element={
        <ProtectedDashboardRoute><StudentsList /></ProtectedDashboardRoute>
      } />
      <Route path="/students/add" element={
        <ProtectedDashboardRoute><AddStudent /></ProtectedDashboardRoute>
      } />
      <Route path="/students/edit/:id" element={
        <ProtectedDashboardRoute><EditStudent /></ProtectedDashboardRoute>
      } />
      <Route path="/students/:id" element={
        <ProtectedDashboardRoute><StudentProfile /></ProtectedDashboardRoute>
      } />
      <Route path="/leaderboard" element={
        <ProtectedDashboardRoute><Leaderboard /></ProtectedDashboardRoute>
      } />

      {/* Student Protected Routes */}
      <Route path="/student-dashboard" element={
        <ProtectedStudentRoute><StudentDashboard /></ProtectedStudentRoute>
      } />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/admin-login" replace />} />
    </Routes>
  );
}