import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "/api",
});

// Automatically add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      console.warn("🔐 Unauthorized — redirecting to login...");
      // window.location.href = "/login"; // uncomment if needed
    }
    return Promise.reject(error);
  }
);

export default api;
