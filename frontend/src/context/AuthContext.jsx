/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem("adminToken") || null
  );
  const [teacherToken, setTeacherToken] = useState(
    () => localStorage.getItem("teacherToken") || null
  );
  const [teacherSession, setTeacherSession] = useState(
    () => JSON.parse(localStorage.getItem("teacherSession") || "null")
  );
  const [studentSession, setStudentSession] = useState(
    () => JSON.parse(localStorage.getItem("studentSession") || "null")
  );

  const adminLogin = (token) => {
    setAdminToken(token);
    localStorage.setItem("adminToken", token);
  };

  const adminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem("adminToken");
  };

  const teacherLogin = (token, teacher) => {
    setTeacherToken(token);
    setTeacherSession(teacher);
    localStorage.setItem("teacherToken", token);
    localStorage.setItem("teacherSession", JSON.stringify(teacher));
  };

  const teacherLogout = () => {
    setTeacherToken(null);
    setTeacherSession(null);
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("teacherSession");
  };

  const studentLogin = (student) => {
    setStudentSession(student);
    localStorage.setItem("studentSession", JSON.stringify(student));
  };

  const studentLogout = () => {
    setStudentSession(null);
    localStorage.removeItem("studentSession");
  };

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        teacherToken,
        teacherSession,
        studentSession,
        isAdminLoggedIn: !!adminToken,
        isTeacherLoggedIn: !!teacherToken,
        isStudentLoggedIn: !!studentSession,
        adminLogin,
        adminLogout,
        teacherLogin,
        teacherLogout,
        studentLogin,
        studentLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}