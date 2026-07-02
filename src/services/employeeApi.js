// services/employeeApi.js
import { BASE } from "../global/constants";

function authHeaders() {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(path, options = {}, { auth = true } = {}) {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Request failed");
  return json;
}
  

export async function fetchEmployeeProjects() {
  return request("/api/employees", {
    method: "GET",
    headers: authHeaders(),
  });
}
