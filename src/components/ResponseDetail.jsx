import { useEffect } from "react";
import { C_Dashboard } from "../global/constants";
import { Avatar } from "./Avatar";
import { RatingChip } from "./RatingChip";
import { StarRow } from "./StartRow";

/* ─── Response Detail Modal ────────────────────────────────────────────────── */

// Section header styles
const sectionHeadStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: C_Dashboard.muted,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  margin: "0 0 10px",
};

// Comment box styles
const commentBoxStyle = (bg, border) => ({
  background: bg,
  borderRadius: 12,
  border: `1px solid ${border}`,
  padding: "14px 16px",
});

// comment text styles
const commentTextStyle = {
  fontSize: 13,
  color: C_Dashboard.ink,
  margin: 0,
  lineHeight: 1.65,
};

// Response detail modal component
export const ResponseDetail = ({ row, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const date = row.submitted_at
    ? new Date(row.submitted_at).toLocaleString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : "—";

  // Ratings array for the modal
  const ratings = [
    { label: "Technical", value: row.rating_technical },
    { label: "Communication", value: row.rating_communication },
    { label: "Reliability", value: row.rating_reliability },
    { label: "Solving", value: row.rating_solving },
    { label: "Collaboration", value: row.rating_collaboration },
    { label: "Overall", value: row.rating_overall },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(16,18,29,0.55)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
        style={{
          background: "#fff",
          borderRadius: 18,
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px -16px rgba(16,18,29,0.4)",
          animation: "modalIn .2s cubic-bezier(.2,.9,.3,1.1) both",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: `1px solid ${C_Dashboard.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            background: "#fff",
            borderRadius: "18px 18px 0 0",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name={row.employee_name} size={44} />
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 700,
                  color: C_Dashboard.ink,
                  textAlign: "left",
                }}
              >
                {row.employee_name}
              </h2>
              <p style={{ margin: 0, fontSize: 12, color: C_Dashboard.muted }}>
                {row.reviewer_name
                  ? `Reviewed by ${row.reviewer_name}`
                  : "Anonymous reviewer"}
                {row.client_name
                  ? `, ${row.client_name}`
                  : ""}
                {row.project_name ? ` -  ${row.project_name}` : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${C_Dashboard.border}`,
              background: C_Dashboard.bg,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C_Dashboard.muted,
              fontSize: 16,
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
            className="close-btn"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* Period + date chips */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {row.period_label && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C_Dashboard.brandDeep,
                  background: C_Dashboard.brandSoft,
                  padding: "4px 12px",
                  borderRadius: 999,
                  border: `1px solid ${C_Dashboard.brandLine}`,
                }}
              >
                {row.period_label}
              </span>
            )}
            <span
              style={{
                fontSize: 12,
                color: C_Dashboard.muted,
                background: C_Dashboard.bg,
                padding: "4px 12px",
                borderRadius: 999,
                border: `1px solid ${C_Dashboard.border}`,
              }}
            >
              Submitted {date}
            </span>
          </div>

          {/* Ratings */}
          <div style={{ marginBottom: 20 }}>
            <p style={sectionHeadStyle}>Ratings</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ratings.map(({ label, value }) => (
                <RatingChip key={label} label={label} value={value} />
              ))}
            </div>
          </div>

          {/* Star breakdown */}
          <div
            style={{
              background: C_Dashboard.bg,
              borderRadius: 12,
              border: `1px solid ${C_Dashboard.border}`,
              padding: "14px 16px",
              marginBottom: 20,
            }}
          >
            <p style={{ ...sectionHeadStyle, margin: "0 0 12px" }}>
              Ratings breakdown
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ratings.map(({ label, value }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: C_Dashboard.muted,
                      width: 110,
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <StarRow value={value} />
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
            className="comments-grid"
          >
            <div
              style={commentBoxStyle(
                C_Dashboard.greenSoft,
                C_Dashboard.greenLine,
              )}
            >
              <p
                style={{
                  ...sectionHeadStyle,
                  color: C_Dashboard.green,
                  margin: "0 0 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span>✓</span> What's going well
              </p>
              <p style={commentTextStyle}>
                {row.going_well || (
                  <span
                    style={{ color: C_Dashboard.muted, fontStyle: "italic" }}
                  >
                    No comment provided
                  </span>
                )}
              </p>
            </div>
            <div
              style={commentBoxStyle(
                C_Dashboard.amberSoft,
                C_Dashboard.amberLine,
              )}
            >
              <p
                style={{
                  ...sectionHeadStyle,
                  color: C_Dashboard.amber,
                  margin: "0 0 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span>↑</span> Could be better
              </p>
              <p style={commentTextStyle}>
                {row.could_improve || (
                  <span
                    style={{ color: C_Dashboard.muted, fontStyle: "italic" }}
                  >
                    No comment provided
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
