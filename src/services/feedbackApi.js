// feedbackApi.js
// Add VITE_API_BASE_URL=http://localhost:3001 to your frontend .env

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Request failed");
  return json;
}

/* ── Links ─────────────────────────────────────────────────────────────────── */

/**
 * Save a generated feedback link. Returns { data: { id, ... } }.
 * Store data.id as linkId — embed it in the feedback URL.
 *
 * @param {{ reviewName, employeeName, projectName?, reviewerName?, month, year }} payload
 */
export async function saveLink(payload) {
  return request("/api/links", {
    method: "POST",
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
  return request(`/api/links${qs ? `?${qs}` : ""}`);
}

/**
 * Soft-delete a link by its UUID.
 *
 * @param {string} id
 */
export async function deactivateLink(id) {
  return request(`/api/links/${id}`, { method: "DELETE" });
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
  return request(`/api/responses/summary/${encodeURIComponent(linkId)}`);
}
