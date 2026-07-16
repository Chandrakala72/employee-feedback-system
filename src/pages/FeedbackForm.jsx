import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styles } from "../styles/FeedbackStyles";
import { RatingRow } from "../components/RatingRow";
import { ThankYou } from "../components/ThankYou";
import { SectionLabel } from "../components/SectionLabel";
import { Field } from "../components/Field";
import { C, constants, DIMENSIONS } from "../global/constants";
import { Divider } from "../components/Divider";
import { submitFeedback, fetchLink, sendFeedbackEmail } from "../services/feedbackApi";
import myLogo from "../assets/logo.png";
import "../styles/FeedbackForm.css";
import axios from "axios";

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
  const [clientName, setClientName] = useState("");
  const ratingsRef = useRef(null);
  const ratedCount = Object.values(ratings).filter(Boolean).length;
  const [toast, setToast] = useState(null);

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
        setClientName(res.data.client_name || "");
        setLinkError("");
      })
      .catch((err) => {
        setLinkError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [linkId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Submit handler ────────────────────────────────────────────────────────
  async function submit() {
    const missingRequired = DIMENSIONS.some((d) => d.required && !ratings[d.key]);
    if (missingRequired) {
      setTouched(true);
      ratingsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const questionLabels = {
      technical: "Technical Skills",
      communication: "Communication Skills",
      reliability: "Reliability",
      solving:"Solving",
      collaboration: "Collaboration",
      overall: "Overall Rating",
    };

    const ratingsPayload = {
      technical: ratings.technical ?? null,
      communication: ratings.communication ?? null,
      reliability: ratings.reliability ?? null,
      collaboration: ratings.collaboration ?? null,
      solving: ratings.problemSolving ?? null,
      overall: ratings.overall, // required
    };

    const questionsArray = Object.entries(ratingsPayload).map(([key, rating]) => ({
      question: questionLabels[key] ?? key,
      rating: rating ?? 0,
    }));


    const payload = {
      linkId,
      reviewerName: reviewer.trim() || null,
      clientName: clientName.trim() || null,
      ratings: ratingsPayload,
      goingWell: wins.trim() || null,
      couldImprove: improve.trim() || null,
    };

    const emailPayload = {
      name: employeeName,
      responses: {
        questions: questionsArray,
        goingWell: wins.trim() || null,
        couldImprove: improve.trim() || null,
      },
    };

    try {
      // ── Save to local DB ─────────────────────────────────────────────────
      await submitFeedback(payload);

      await sendFeedbackEmail({
        employeeName,
        reviewerName: reviewer.trim() || null,
        periodLabel: period,
        clientName: clientName.trim() || null,
        ratings: ratingsPayload,
        goingWell: wins.trim() || null,
        couldImprove: improve.trim() || null,
      });

      // ── Optional: also call the parent onSubmit (e.g. for local state) ──
      if (typeof onSubmit === "function") {
        try {
          onSubmit(payload);
        } catch (_) { }
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setToast(err);
    }
    finally {
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
    setClientName("");
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
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: toast.type === "info" ? "#1f2937" : C.ink,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            minWidth: 420,
            maxWidth: 800,
            textAlign: "center",
            fontSize: 14,
          }}
        >
          {toast.message}
        </div>
      )}
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

        {!submitted && (reviewer || clientName) && (
          <div style={styles.metaRow}>
            {reviewer && (
              <div style={styles.metaReviewer}>
                <span style={styles.metaAvatar}>{reviewer[0]}</span>
                <span style={styles.metaText}>
                  Review by <span style={styles.metaStrong}>{reviewer}</span>
                </span>
              </div>
            )}
            {clientName && (
              <div style={styles.metaClient}>
                <i className="ti ti-building" style={styles.metaIcon} />
                <span style={styles.metaText}>{clientName}</span>
              </div>
            )}
          </div>
        )}
        <div style={styles.card} className="fade-in">
          {submitted ? (
            <ThankYou consultant={employeeName} onReset={reset} />
          ) : (
            <>
              <h1 style={styles.title}>{constants.share_feedback}</h1>
              <p style={styles.sub}>{constants.feedback_info}</p>

              {/* Ratings */}
              <div ref={ratingsRef}>
                <SectionLabel n="1" title="Ratings" caption="Your scores help us track quality over time" />
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
