import axios from "axios";

// ── Org (Company) Axios Instance ──────────────────────────────────────────
// Derives base from VITE_API_BASE_URL: replaces /super-admin with /org
// Result: http://127.0.0.1:8000/api/org
const ORG_BASE_URL = (() => {
  if (import.meta.env.VITE_ORG_API_BASE_URL) {
    return import.meta.env.VITE_ORG_API_BASE_URL;
  }
  const base = import.meta.env.VITE_API_BASE_URL || "";
  if (base.includes("/super-admin")) {
    return base.replace("/super-admin", "/org");
  }
  return "http://127.0.0.1:8000/api/org";
})();

const orgAxiosInstance = axios.create({
  baseURL: ORG_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ── Request interceptor — attach orgToken if present ─────────────────────
orgAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("orgToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle 401 ────────────────────────────────────
orgAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("orgToken");
      localStorage.removeItem("companyUser");
      window.location.href = "/company-login";
    }
    return Promise.reject(error);
  }
);

export default orgAxiosInstance;