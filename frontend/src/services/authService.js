import api from "./api";

export const authService = {
  adminLogin: async (email, password) => {
    const res = await api.post("/auth/admin-login", { email, password });
    return res.data;
  },

  teacherRegister: async (name, email, password) => {
    const res = await api.post("/auth/teacher-register", { name, email, password });
    return res.data;
  },

  teacherLogin: async (email, password) => {
    const res = await api.post("/auth/teacher-login", { email, password });
    return res.data;
  },

  studentLogin: async (studentId) => {
    const res = await api.post("/auth/student-login", { studentId });
    return res.data;
  },
};