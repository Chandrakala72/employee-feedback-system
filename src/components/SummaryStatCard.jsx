import { C_Dashboard } from "../global/constants";

/* ─── Summary Stat Card ────────────────────────────────────────────────────── */
export function StatCard({ label, value, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${C_Dashboard.border}`,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 1px 3px rgba(20,40,70,0.05)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: C_Dashboard.brandSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 10,
            fontWeight: 700,
            color: C_Dashboard.muted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 20,
            fontWeight: 800,
            color: C_Dashboard.ink,
          }}
        >
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}
