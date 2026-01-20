import axios from "axios";

const api = axios.create({
  baseURL: "https://kudoikom.net/laravel_app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false, // 🔥 WAJIB
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
