import React, { useState, useRef, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styles } from "../styles/FeedbackStyles";
import { RatingRow } from "../components/RatingRow";
import { ThankYou } from "../components/ThankYou";
import { SectionLabel } from "../components/SectionLabel";
import { Field } from "../components/Field";
import { C, DIMENSIONS } from "../global/constants";
import { Divider } from "../components/Divider";
import { submitFeedback, fetchLink } from "../services/feedbackApi";
import myLogo from "../assets/logo.png";

export default function FeedbackForm({ onSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);

  // linkId comes from the URL: /feedback/:linkId
  const { linkId } = useParams();

  console.log(linkId, "linkId from URL");

  // Link metadata loaded from DB (employee name, period label, etc.)
  const [linkMeta, setLinkMeta] = useState(null);
  const [linkError, setLinkError] = useState("");

  const [ratings, setRatings] = useState({});
  const [wins, setWins] = useState("");
  const [improve, setImprove] = useState("");
  const [reviewer, setReviewer] = useState("");

  const ratingsRef = useRef(null);

  // ── Load link metadata on mount ───────────────────────────────────────────
  useEffect(() => {
    if (!linkId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchLink(linkId)
      .then((res) => {
        setLinkMeta(res.data);
        setReviewer(res.data.reviewer_name || "");
        setLinkError("");
      })
      .catch((err) => {
        setLinkError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [linkId]);

  const ratedCount = Object.values(ratings).filter(Boolean).length;
  const overallValid = !!ratings.overall;

  const progress = useMemo(() => {
    let p = 0;
    p += Math.min(ratedCount, DIMENSIONS.length) * (70 / DIMENSIONS.length);
    if (wins.trim() || improve.trim()) p += 18;
    if (submitted) p = 100;
    return Math.min(Math.round(p), 100);
  }, [ratedCount, wins, improve, submitted]);

  // ── Submit handler ────────────────────────────────────────────────────────
  async function submit() {
    if (!overallValid) {
      setTouched(true);
      ratingsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const payload = {
      linkId,
      reviewerName: reviewer.trim() || null,
      ratings: {
        technical: ratings.technical ?? null,
        communication: ratings.communication ?? null,
        reliability: ratings.reliability ?? null,
        collaboration: ratings.collaboration ?? null,
        overall: ratings.overall, // required
      },
      goingWell: wins.trim() || null,
      couldImprove: improve.trim() || null,
    };

    try {
      // ── Save to local DB ─────────────────────────────────────────────────
      await submitFeedback(payload);

      // ── Optional: also call the parent onSubmit (e.g. for local state) ──
      if (typeof onSubmit === "function") {
        try {
          onSubmit(payload);
        } catch (_) {}
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setTouched(false);
    setSubmitError("");
    setRatings({});
    setWins("");
    setImprove("");
    setReviewer("");
  }

  if (loading) {
    return (
      <div style={styles.shell}>
        <StyleTag />
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #e5e7eb",
              borderTop: `4px solid ${C.brand}`,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p
            style={{
              fontSize: 14,
              color: C.muted,
            }}
          >
            Loading feedback form...
          </p>
        </div>
      </div>
    );
  }

  // ── Render: link not found ────────────────────────────────────────────────
  if (linkError) {
    return (
      <div style={styles.shell}>
        <StyleTag />
        <div style={styles.frame}>
          <div
            style={{
              ...styles.card,
              textAlign: "center",
              padding: "40px 24px",
            }}
          >
            <p style={{ fontSize: 32, marginBottom: 12 }}>⚠️</p>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: C.ink,
                marginBottom: 8,
              }}
            >
              Link not found
            </h2>
            <p style={{ fontSize: 13, color: C.muted }}>{linkError}</p>
          </div>
        </div>
      </div>
    );
  }

  const employeeName = linkMeta?.employee_name ?? "…";
  const period = linkMeta?.period_label ?? "";
  

  return (
    <div style={styles.shell}>
      <StyleTag />

      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "row", margin: 0 }}>
        <div>
          <img src={myLogo} alt="Company Logo" width={120} />
        </div>
      </div>

      <div style={styles.frame}>
        <header style={styles.header}>
          <div style={styles.brandRow}>
            <span style={styles.brandDot} />
            <span style={styles.brandName}>Feedback for {employeeName}</span>
          </div>
          {!submitted && period && (
            <span style={styles.periodChip}>{period}</span>
          )}
        </header>

        <div style={styles.card} className="fade-in">
          {submitted ? (
            <ThankYou consultant={employeeName} onReset={reset} />
          ) : (
            <>
              <h1 style={styles.title}>Share your feedback</h1>
              <p style={styles.sub}>
                Takes about two minutes. Your answers stay between you and
                Technerds — the employee won't see who said what.
              </p>

              {/* Ratings */}
              <div ref={ratingsRef}>
                <SectionLabel n="1" title="Ratings" caption="" />
                <div style={styles.ratingList}>
                  {DIMENSIONS.map((d, i) => (
                    <RatingRow
                      key={d.key}
                      dim={d}
                      value={ratings[d.key]}
                      last={i === DIMENSIONS.length - 1}
                      showError={touched && d.required && !ratings[d.key]}
                      onChange={(v) =>
                        setRatings((r) => ({ ...r, [d.key]: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              <Divider />

              {/* Comments */}
              <SectionLabel
                n="2"
                title="In your words"
                caption="Optional, but the most useful part"
              />

              <Field label="What's going well?">
                <textarea
                  style={styles.textarea}
                  value={wins}
                  onChange={(e) => setWins(e.target.value)}
                  placeholder="Strengths, standout moments, things to keep doing…"
                  rows={3}
                />
              </Field>

              <Field label="What could be better?">
                <textarea
                  style={styles.textarea}
                  value={improve}
                  onChange={(e) => setImprove(e.target.value)}
                  placeholder="Anything that would make the engagement smoother…"
                  rows={3}
                />
              </Field>

              {/* Error message */}
              {submitError && (
                <p
                  style={{
                    fontSize: 12,
                    color: "#dc2626",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 8,
                  }}
                >
                  {submitError}
                </p>
              )}

              {/* Submit */}
              <button
                type="button"
                className="btn"
                style={{
                  ...styles.btn,
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send feedback"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StyleTag() {
  return (
    <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .fade-in {
          animation: fadeIn .35s ease both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .pop-in {
          animation: popIn .45s cubic-bezier(.2,.9,.3,1.3) both;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(.6);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .btn:hover:not(:disabled) {
          background: ${C.brandDeep} !important;
        }

        .btn:active:not(:disabled) {
          transform: translateY(1px);
        }

        .btn-ghost:hover {
          color: ${C.ink} !important;
          border-color: ${C.muted} !important;
        }

        .scale-btn:hover {
          border-color: ${C.brandLine};
        }

        .chip:hover {
          border-color: ${C.brandLine} !important;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: ${C.brand} !important;
          box-shadow: 0 0 0 3px ${C.brandSoft};
        }

        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
          outline: 2px solid ${C.brand};
          outline-offset: 2px;
        }

        textarea {
          resize: vertical;
        }

        ::placeholder {
          color: #9aa3b2;
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-in,
          .pop-in {
            animation: none !important;
          }

          * {
            transition: none !important;
          }
        }
      `}</style>
  );
}
