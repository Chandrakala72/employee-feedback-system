import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styles } from "../styles/FeedbackStyles";
import { RatingRow } from "../components/RatingRow";
import { ThankYou } from "../components/ThankYou";
import { SectionLabel } from "../components/SectionLabel";
import { Field } from "../components/Field";
import { C, constants, DIMENSIONS } from "../global/constants";
import { Divider } from "../components/Divider";
import { submitFeedback, fetchLink } from "../services/feedbackApi";
import myLogo from "../assets/logo.png";
import "../styles/FeedbackForm.css";

export default function FeedbackForm({ onSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);

  // linkId comes from the URL: /feedback/:linkId
  const { linkId } = useParams();

  // Link metadata loaded from DB (employee name, period label, etc.)
  const [linkMeta, setLinkMeta] = useState(null);
  const [linkError, setLinkError] = useState("");

  const [ratings, setRatings] = useState({});
  const [wins, setWins] = useState("");
  const [improve, setImprove] = useState("");
  const [reviewer, setReviewer] = useState("");
  const ratingsRef = useRef(null);
  const ratedCount = Object.values(ratings).filter(Boolean).length;
  const overallValid = !!ratings.overall;

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
      setSubmitError(err.message || constants.apiError);
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
        <div style={styles.shellTopBar}>
          <div style={styles.loader} />
          <p style={styles.loaderText}>{constants.loading_feedback_form}</p>
        </div>
      </div>
    );
  }

  // ── Render: link not found ────────────────────────────────────────────────
  if (linkError) {
    return (
      <div style={styles.shell}>
        <div style={styles.frame}>
          <div
            style={{
              ...styles.card,
              textAlign: "center",
              padding: "40px 24px",
            }}
          >
            <p style={styles.loadErrorSign}>⚠️</p>
            <h2 style={styles.linkError}>{constants.linkNotFound}</h2>
            <p style={styles.linkErrorText}>{linkError}</p>
          </div>
        </div>
      </div>
    );
  }

  const employeeName = linkMeta?.employee_name ?? "…";
  const period = linkMeta?.period_label ?? "";

  return (
    <div style={styles.shell}>
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
              <h1 style={styles.title}>{constants.share_feedback}</h1>
              <p style={styles.sub}>{constants.feedback_info}</p>

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
                title={constants.section.label.inWords}
                caption={constants.section.caption}
              />

              <Field label={constants.fields.label.well}>
                <textarea
                  style={styles.textarea}
                  value={wins}
                  onChange={(e) => setWins(e.target.value)}
                  placeholder={constants.fields.placeholder.well}
                  rows={3}
                />
              </Field>

              <Field label={constants.fields.label.better}>
                <textarea
                  style={styles.textarea}
                  value={improve}
                  onChange={(e) => setImprove(e.target.value)}
                  placeholder={constants.fields.placeholder.better}
                  rows={3}
                />
              </Field>

              {/* Error message */}
              {submitError && (
                <p style={styles.submitErrorText}>{submitError}</p>
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
                {submitting ? constants.sending : constants.sendFeedback}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
