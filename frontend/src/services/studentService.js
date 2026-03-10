import api from "./api";

export const studentService = {
  getAll: async () => {
    const res = await api.get("/students");
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/students/${id}`);
    return res.data;
  },

  create: async (studentData) => {
    const res = await api.post("/students", studentData);
    return res.data;
  },

  update: async (id, studentData) => {
    const res = await api.put(`/students/${id}`, studentData);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/students/${id}`);
    return res.data;
  },

  bulkImport: async (studentsArray) => {
    const res = await api.post("/students/bulk-import", studentsArray);
    return res.data;
  },

  uploadPhoto: async (id, file) => {
    const form = new FormData();
    form.append("photo", file);
    const res = await api.post(`/students/${id}/photo`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};