import { useState } from "react";
import { styles } from "../styles/FeedbackStyles";
import { C, SCALE } from "../global/constants";

// RatingRow component for displaying a rating row with label, hint, and scale buttons
export const RatingRow = ({ dim, value, onChange, last, showError }) => {
  const [hover, setHover] = useState(null);
  const active = hover ?? value;
  const descriptor = active ? SCALE[active - 1] : "Not yet rated";
  return (
    <div
      style={{
        ...styles.ratingRow,
        borderBottom: last ? "none" : `1px solid ${C.lineSoft}`,
      }}
    >
      <div style={styles.ratingHead}>
        {/* Rating Label and Hint */}
        <div>
          <div style={styles.ratingLabel}>
            {dim.label}
            {dim.required && <span style={styles.req}> *</span>}
          </div>
          <div style={styles.ratingHint}>{dim.hint}</div>
        </div>
        {/* Descriptor */}
        <span
          style={{
            ...styles.descriptor,
            color: active ? C.brand : C.muted,
            opacity: active ? 1 : 0.7,
          }}
        >
          {descriptor}
        </span>
      </div>
      {/* Scale Buttons */}
      <div style={styles.scaleRow} onMouseLeave={() => setHover(null)}>
        {[1, 2, 3, 4, 5].map((n) => {
          const on = n === value;
          const previewing = hover !== null && n <= hover;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${dim.label}: ${n} of 5, ${SCALE[n - 1]}`}
              className="scale-btn"
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(null)}
              onClick={() => onChange(n)}
              style={{
                ...styles.scaleBtn,
                background: on ? "#6B93E0" : previewing ? C.brandSoft : C.surface,
                borderColor: on
                  ? "#6B93E0"
                  : previewing
                    ? C.brandLine
                    : showError
                      ? C.danger
                      : C.line,
                color: on ? "#fff" : C.body,
                transform: on ? "translateY(-1px)" : "none",
                boxShadow: on ? "0 6px 14px rgba(164, 214, 244, 0.28)" : "none",
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
      {/* Error Message */}
      {showError && (
        <div style={styles.fieldError}>Please give an overall score</div>
      )}
    </div>
  );
};
