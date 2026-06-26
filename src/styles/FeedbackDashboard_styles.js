// styles.js
import { C_Dashboard } from "../global/constants";

const bp = {
  sm: "@media (max-width: 480px)",
  md: "@media (min-width: 481px) and (max-width: 768px)",
};

export const styles = {
  page: {
    minHeight: "100vh",
    background: C_Dashboard.pageBg,
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    color: C_Dashboard.ink,
    paddingBottom: 64,
  },

  topBar: {
    background: "#fff",
    borderBottom: `1px solid ${C_Dashboard.border}`,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 54,
    position: "sticky",
    top: 0,
    zIndex: 200,
    boxShadow: "0 1px 3px rgba(20,40,70,0.06)",
    gap: 12,                     // ← keeps logo/title/btn from colliding
  },

  logo: {
    height: 26,
    objectFit: "contain",
    flexShrink: 0,               // ← never squish the logo
  },

  dashboardTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1a2340",
    margin: 0,
    flex: 1,                     // ← takes available space
    minWidth: 0,                 // ← allows text-overflow to work
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  navBtn: {
    padding: "8px 18px",
    borderRadius: 8,
    border: "1px solid #3B5BDB",
    background: "transparent",
    color: "#3B5BDB",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    flexShrink: 0,               // ← never shrink the button
    whiteSpace: "nowrap",
  },

  pageHeader: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "28px 16px 0",
  },

  pageHeading: {
    fontSize: "clamp(17px, 2vw, 21px)",   // ← fluid scale
    fontWeight: 700,
    margin: "0 0 4px",
    letterSpacing: -0.3,
  },

  pageCaption: { fontSize: 13, color: C_Dashboard.muted, margin: 0 },

  filterRow: {
    background: "#fff",
    borderRadius: 14,
    border: `1px solid ${C_Dashboard.border}`,
    padding: "14px 18px",
    marginBottom: 20,
    boxShadow: "0 1px 3px rgba(20,40,70,0.05)",
  },

  filter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    flexWrap: "wrap",
    gap: 8,
  },

  filterTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: C_Dashboard.muted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  filterGrid: {
    display: "grid",
    // 1 col < 480px  →  2 col 480–768  →  auto-fit 768+
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 10,
  },

  filterTableRow: { display: "flex", flexDirection: "column", gap: 4 },

  filterLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: C_Dashboard.muted,
    textAlign: "left",
  },

  sortRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  },

  clearBtn: {
    fontSize: 11,
    fontWeight: 600,
    color: C_Dashboard.brand,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },

  responseCount: {
    fontSize: 12,
    color: C_Dashboard.muted,
    margin: "0 0 14px",
  },

  errorContainer: {
    background: "#fff",
    borderRadius: 14,
    border: `1px solid ${C_Dashboard.border}`,
    padding: "40px 24px",
    textAlign: "center",
  },

  errorText: { color: C_Dashboard.red, fontSize: 13, margin: 0 },

  emptyStateContainer: {
    background: "#fff",
    borderRadius: 14,
    border: `1px solid ${C_Dashboard.border}`,
  },

  cardsGrid: {
    display: "grid",
    // 1 col on phones → fills naturally on wider screens
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 14,
  },

  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    flexWrap: "wrap",             // ← stacks on narrow screens
    gap: 10,
  },

  pageText: { fontSize: 12, color: C_Dashboard.muted },

  brandRow: { display: "flex", alignItems: "center", gap: 7 },
  brand: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: C_Dashboard.brand,
  },
};