import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function AdminProtectedRoute({ children }) {
  const { isAdminLoggedIn } = useAuth();
  if (!isAdminLoggedIn) return <Navigate to="/admin-login" replace />;
  return children;
}

export function StudentProtectedRoute({ children }) {
  const { isStudentLoggedIn } = useAuth();
  if (!isStudentLoggedIn) return <Navigate to="/student-login" replace />;
  return children;
}