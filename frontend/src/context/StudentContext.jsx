/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { studentService } from "../services/studentService";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { adminToken, teacherToken } = useAuth();

  const fetchStudents = async () => {
    // Only fetch if logged in as admin or teacher
    if (!adminToken && !teacherToken) {
      setStudents([]);
      return;
    }
    setLoading(true);
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch whenever the logged-in user changes
  useEffect(() => {
    fetchStudents();
  }, [adminToken, teacherToken]);

  const getRankedStudents = () => {
    return [...students]
      .map((s) => ({
        ...s,
        totalMarks: (s.math || 0) + (s.science || 0) + (s.english || 0) + (s.computer || 0),
      }))
      .sort((a, b) => b.totalMarks - a.totalMarks)
      .map((s, i) => ({ ...s, rank: i + 1 }));
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        fetchStudents,
        getRankedStudents,
        setStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentContext);
}