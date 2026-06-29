import { C_Dashboard } from "./constants";

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
export const ratingColor = (v) => {
  if (v === null || v === undefined)
    return {
      color: C_Dashboard.muted,
      bg: C_Dashboard.bg,
      border: C_Dashboard.border,
    };
  if (v >= 4)
    return {
      color: C_Dashboard.green,
      bg: C_Dashboard.greenSoft,
      border: C_Dashboard.greenLine,
    };
  if (v >= 3)
    return {
      color: C_Dashboard.amber,
      bg: C_Dashboard.amberSoft,
      border: C_Dashboard.amberLine,
    };
  return { color: C_Dashboard.red, bg: C_Dashboard.redSoft, border: "#fca5a5" };
};
