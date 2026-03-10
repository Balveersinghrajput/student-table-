import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("teacherToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("teacherToken");
      localStorage.removeItem("teacherSession");
      // Only redirect if not already on a login/register page to avoid reload loop
      const path = window.location.pathname;
      if (!path.includes("login") && !path.includes("register")) {
        window.location.href = "/admin-login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
