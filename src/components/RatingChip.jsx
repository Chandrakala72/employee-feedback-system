import { C_Dashboard } from "../global/constants";

export const RatingChip = ({ label, value }) => {
  const { color, bg, border } = ratingColor(value);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "10px 14px",
        borderRadius: 10,
        background: value !== null && value !== undefined ? bg : C_Dashboard.bg,
        border: `1px solid ${value !== null && value !== undefined ? border : C_Dashboard.border}`,
        minWidth: 80,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: C_Dashboard.muted,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      {value !== null && value !== undefined ? (
        <span style={{ fontSize: 18, fontWeight: 800, color }}>
          {value}
          <span style={{ fontSize: 11, fontWeight: 600, color }}>/5</span>
        </span>
      ) : (
        <span style={{ fontSize: 14, color: C_Dashboard.muted }}>—</span>
      )}
    </div>
  );
};
