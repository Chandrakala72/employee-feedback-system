import { C_Dashboard } from "../global/constants";

export function Spinner({ text = "Loading…" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "56px 0",
      }}
    >
      <div className="spinner" />
      <p style={{ fontSize: 13, color: C_Dashboard.muted, margin: 0 }}>
        {text}
      </p>
    </div>
  );
}
