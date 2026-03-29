// ─── Config ───────────────────────────────────────────────
const API_BASE = "http://localhost:5000/api";

// ─── Auth token helpers ───────────────────────────────────
export const getToken = () => localStorage.getItem("cl_token");
export const getUser  = () => {
  const u = localStorage.getItem("cl_user");
  return u ? JSON.parse(u) : null;
};
export const setAuth = (token, user) => {
  localStorage.setItem("cl_token", token);
  localStorage.setItem("cl_user", JSON.stringify(user));
};
export const clearAuth = () => {
  localStorage.removeItem("cl_token");
  localStorage.removeItem("cl_user");
};
export const isLoggedIn  = () => !!getToken();
export const isAdmin     = () => { const u = getUser(); return u && u.is_admin; };

// ─── Fetch wrapper ────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok && data.error) throw new Error(data.error);
  return data;
}

export const api = {
  get:    (path)         => apiFetch(path),
  post:   (path, body)   => apiFetch(path, { method: "POST",   body: JSON.stringify(body) }),
  put:    (path, body)   => apiFetch(path, { method: "PUT",    body: JSON.stringify(body) }),
  delete: (path)         => apiFetch(path, { method: "DELETE" }),
};

// ─── Toast notifications ──────────────────────────────────
let toastContainer = null;
function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = "success") {
  const icons = { success: "✓", error: "✕", info: "ℹ" };
  const container = getToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || "ℹ"}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ─── Require login guard ──────────────────────────────────
export function requireLogin(redirectTo = "login.html") {
  if (!isLoggedIn()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

// ─── Render navbar auth state ──────────────────────────────
export function initNavAuth() {
  const loginLink   = document.getElementById("nav-login");
  const registerLink= document.getElementById("nav-register");
  const logoutLink  = document.getElementById("nav-logout");
  const userNameEl  = document.getElementById("nav-username");
  const adminLink   = document.getElementById("nav-admin");

  if (isLoggedIn()) {
    const user = getUser();
    if (loginLink)    loginLink.style.display    = "none";
    if (registerLink) registerLink.style.display = "none";
    if (logoutLink)   logoutLink.style.display   = "inline-flex";
    if (userNameEl)   userNameEl.textContent      = user.name;
    if (adminLink)    adminLink.style.display     = user.is_admin ? "inline-flex" : "none";
  } else {
    if (logoutLink) logoutLink.style.display = "none";
    if (adminLink)  adminLink.style.display  = "none";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      clearAuth();
      window.location.href = "index.html";
    });
  }
}

// ─── Format helpers ───────────────────────────────────────
export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
export function formatSlot(slot) {
  if (!slot) return "";
  const [start] = slot.split("-");
  const [h, m] = start.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr   = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hr}:${String(m).padStart(2,"0")} ${ampm}`;
}
