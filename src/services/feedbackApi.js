import { API_URL } from "../global/constants";

// services/feedbackApi.js — example pattern, apply to saveLink, listLinks, deactivateLink
function authHeaders() {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(path, options = {}, { auth = true } = {}) {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${API_URL}${path}`, {
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

/* ── Links ─────────────────────────────────────────────────────────────────── */

/**
 * Save a generated feedback link. Returns { data: { id, ... } }.
 * Store data.id as linkId — embed it in the feedback URL.
 *
 * @param {{ employeeName, projectName, reviewerName, periodLabel }} payload
 */
export async function saveLink(payload) {
  return request("/api/links", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

/**
 * Load link metadata by its UUID (linkId).
 * Called by FeedbackForm on mount to display employee name, period etc.
 *
 * @param {string} linkId  — UUID from the URL  /feedback/:linkId
 */
export async function fetchLink(linkId) {
  return request(`/api/links/${encodeURIComponent(linkId)}`);
}

/**
 * List all generated links (admin).
 *
 * @param {{ page?, limit?, employeeName?, year? }} params
 */
export async function listLinks(params = {}) {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v != null)),
  ).toString();
  return request(`/api/links${qs ? `?${qs}` : ""}`, {
    headers: authHeaders(),
  });
}

/**
 * Soft-delete a link by its UUID.
 *
 * @param {string} id
 */
export async function deactivateLink(id) {
  return request(`/api/links/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

/* ── Responses ─────────────────────────────────────────────────────────────── */

/**
 * Submit a completed feedback form → saved to local DB.
 *
 * @param {{
 *   linkId: string,              — UUID from /feedback/:linkId
 *   reviewerName?: string,
 *   ratings: {
 *     technical?: number,        — 1-5
 *     communication?: number,
 *     reliability?: number,
 *     collaboration?: number,
 *     overall: number,           — required
 *   },
 *   goingWell?: string,
 *   couldImprove?: string,
 * }} payload
 */
export async function submitFeedback(payload) {
  return request("/api/responses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * List all responses for a link (admin).
 *
 * @param {{ linkId: string, page?, limit? }} params
 */
export async function listResponses(params = {}) {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v != null)),
  ).toString();
  return request(`/api/responses${qs ? `?${qs}` : ""}`);
}

/**
 * Get aggregated rating averages for a link.
 *
 * @param {string} linkId
 */
export async function fetchSummary(linkId) {
  return request(`/api/responses/summary/${encodeURIComponent(linkId)}`, {
    headers: authHeaders(),
  });
}
