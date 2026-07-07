/* ── Style helpers ───────────────────────────────────────────────────────── */

import { C_Dashboard, MONTHS } from "./constants";

export function selectStyle(active) {
  return {
    height: 36,
    borderRadius: 8,
    border: `1.5px solid ${active ? C_Dashboard.brand : C_Dashboard.border}`,
    padding: "0 28px 0 10px",
    fontSize: 12,
    color: C_Dashboard.ink,
    background: active ? C_Dashboard.brandSoft : "#fff",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='%23737c8c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  };
}

export function pageBtnSt(disabled, active = false) {
  return {
    height: 30,
    minWidth: 32,
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 600,
    border: `1.5px solid ${active ? C_Dashboard.brand : C_Dashboard.border}`,
    background: active ? C_Dashboard.brand : "#fff",
    color: active ? "#fff" : disabled ? C_Dashboard.muted : C_Dashboard.ink,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    padding: "0 10px",
    fontFamily: "inherit",
    transition: "all 0.15s",
  };
}

export function getPeriodLabel(month, year) {
  const SHORT_MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${SHORT_MONTHS[month]} ${year}`;
}

export function generateUrl(name) {
  return `${window.location.origin}/feedback/${btoa(name.trim())}`;
}

export function isToBeforeFrom(fromM, fromY, toM, toY) {
  if (!fromM || !fromY || !toM || !toY) return false; // don't validate incomplete input here
  const fromDate = Number(fromY) * 12 + Number(fromM);
  const toDate = Number(toY) * 12 + Number(toM);
  return toDate < fromDate;
}
