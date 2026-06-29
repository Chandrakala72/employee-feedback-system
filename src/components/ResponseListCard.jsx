import { ratingColor } from "../global/common";
import { C_Dashboard } from "../global/constants";
import { Avatar } from "./Avatar";

/* ─── Response List Card ───────────────────────────────────────────────────── */
export function ResponseCard({ row, onClick }) {
  const { color, bg, border } = ratingColor(row.rating_overall);
  const date = row.submitted_at
    ? new Date(row.submitted_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  const miniRatings = [
    { label: "Tech", v: row.rating_technical },
    { label: "Comm", v: row.rating_communication },
    { label: "Rel.", v: row.rating_reliability },
    { label: "Collab", v: row.rating_collaboration },
  ];

  return (
    <div
      onClick={onClick}
      className="response-card"
      style={{
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${C_Dashboard.border}`,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "box-shadow 0.15s, border-color 0.15s, transform 0.12s",
        boxShadow: "0 1px 3px rgba(20,40,70,0.05)",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 0,
          }}
        >
          <Avatar name={row.employee_name} size={38} />
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 700,
                color: C_Dashboard.ink,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "left",
              }}
            >
              {row.employee_name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: C_Dashboard.muted,
                textAlign: "left",
              }}
            >
              {row.reviewer_name ? `by ${row.reviewer_name}` : "Anonymous"}
            </p>
          </div>
        </div>

        {/* Overall badge */}
        {row.rating_overall !== null && row.rating_overall !== undefined && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color,
              background: bg,
              border: `1.5px solid ${border}`,
              borderRadius: 9,
              padding: "4px 12px",
              flexShrink: 0,
            }}
          >
            {row.rating_overall}/5
          </div>
        )}
      </div>

      {/* Period + project chips */}
      <div
        style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}
      >
        {row.period_label && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: C_Dashboard.brandDeep,
              background: C_Dashboard.brandSoft,
              padding: "3px 9px",
              borderRadius: 999,
            }}
          >
            {row.period_label}
          </span>
        )}
        {row.project_name && (
          <span
            style={{
              fontSize: 11,
              color: C_Dashboard.muted,
              background: C_Dashboard.bg,
              border: `1px solid ${C_Dashboard.border}`,
              padding: "3px 9px",
              borderRadius: 999,
            }}
          >
            {row.project_name}
          </span>
        )}
      </div>

      {/* Mini ratings strip */}
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          paddingTop: 10,
          borderTop: `1px solid ${C_Dashboard.border}`,
        }}
      >
        {miniRatings.map(({ label, v }) => {
          const rc = ratingColor(v);
          return (
            <div
              key={label}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color:
                  v !== null && v !== undefined ? rc.color : C_Dashboard.muted,
                background:
                  v !== null && v !== undefined ? rc.bg : C_Dashboard.bg,
                border: `1px solid ${v !== null && v !== undefined ? rc.border : C_Dashboard.border}`,
                borderRadius: 6,
                padding: "2px 8px",
              }}
            >
              {label}: {v ?? "—"}
            </div>
          );
        })}
      </div>

      {/* Comment preview */}
      {row.going_well && (
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 12,
            color: C_Dashboard.muted,
            lineHeight: 1.5,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          <span style={{ color: C_Dashboard.brand, fontWeight: 600 }}>✓ </span>
          {row.going_well}
        </p>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <span style={{ fontSize: 11, color: C_Dashboard.muted }}>{date}</span>
        <span
          style={{ fontSize: 11, fontWeight: 600, color: C_Dashboard.brand }}
        >
          View full response →
        </span>
      </div>
    </div>
  );
}
