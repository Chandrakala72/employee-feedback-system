import { C_Dashboard } from "../global/constants";

export function EmptyState({ filtered, message }) {
  const title = message
    ? message
    : filtered
      ? "No responses match your filters"
      : "No responses yet";

  const subtitle = message
    ? "Choose a project, employee, or period to get started."
    : filtered
      ? "Try adjusting the filters above."
      : "Responses will appear here once feedback is submitted.";
  return (
    <div style={{ textAlign: "center", padding: "60px 24px" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: C_Dashboard.ink,
          margin: "0 0 6px",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 13, color: C_Dashboard.muted, margin: 0 }}>
        {subtitle}
      </p>
    </div>
  );
}
