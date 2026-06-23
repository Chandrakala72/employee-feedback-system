import React, { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { styles } from "../styles/FeedbackStyles";
import { RatingRow } from "../components/RatingRow";
import { ThankYou } from "../components/ThankYou";
import { SectionLabel } from "../components/SectionLabel";
import { Field } from "../components/Field";
import { C, DIMENSIONS } from "../global/constants";
import { Divider } from "../components/Divider";
import { currentPeriod } from "../global/common";
import myLogo from "../assets/logo.png";

export default function FeedbackForm({ onSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const { employeeName } = useParams();
  const name = atob(employeeName);

  const [consultant, setConsultant] = useState("");
  const [project, setProject] = useState("");
  const [period, setPeriod] = useState(currentPeriod());
  const [ratings, setRatings] = useState({});
  const [cont, setCont] = useState("");
  const [wins, setWins] = useState("");
  const [improve, setImprove] = useState("");
  const [reviewer, setReviewer] = useState("");

  const nameRef = useRef(null);
  const ratingsRef = useRef(null);

  const ratedCount = Object.values(ratings).filter(Boolean).length;
  const progress = useMemo(() => {
    let p = 0;
    if (consultant.trim()) p += 18;
    p += Math.min(ratedCount, DIMENSIONS.length) * (52 / DIMENSIONS.length);
    if (cont) p += 12;
    if (wins.trim() || improve.trim()) p += 12;
    if (submitted) p = 100;
    return Math.min(Math.round(p), 100);
  }, [consultant, ratedCount, cont, wins, improve, submitted]);

  const nameValid = consultant.trim().length > 0;
  const overallValid = !!ratings.overall;

  function submit() {
    if (!nameValid || !overallValid) {
      setTouched(true);
      const target = !nameValid ? nameRef.current : ratingsRef.current;
      if (target)
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const payload = {
      consultant: consultant.trim(),
      project: project.trim(),
      period,
      ratings,
      continueEngagement: cont,
      goingWell: wins.trim(),
      couldImprove: improve.trim(),
      reviewer: reviewer.trim(),
      submittedAt: new Date().toISOString(),
    };
    if (typeof onSubmit === "function") {
      try {
        onSubmit(payload);
      } catch (e) {
        /* swallow in demo */
      }
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setSubmitted(false);
    setTouched(false);
    setConsultant("");
    setProject("");
    setRatings({});
    setCont("");
    setWins("");
    setImprove("");
    setReviewer("");
  }

  return (
    <div style={styles.shell}>
      <StyleTag />
      {/* header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 0,
        }}
      >
        <div>
          <img src={myLogo} alt="Company Logo" width={120} />
        </div>
      </div>

      <div style={styles.frame}>
        <header style={styles.header}>
          <div style={styles.brandRow}>
            <span style={styles.brandDot} />
            <span style={styles.brandName}> Feedback for {name} </span>
          </div>
          {!submitted && <span style={styles.periodChip}>{period}</span>}
        </header>

        <div style={styles.card} className="fade-in">
          {/* Thank You */}
          {submitted ? (
            <ThankYou consultant={consultant} onReset={reset} />
          ) : (
            // Feedback Form
            <>
              <h1 style={styles.title}>Share your feedback</h1>
              <p style={styles.sub}>
                Takes about two minutes. Your answers stay between you and
                Technerds — the employee won't see who said what.
              </p>

              {/* Ratings */}
              <div ref={ratingsRef}>
                <SectionLabel n="1" title="Ratings" caption={""} />
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

              {/* Comments */}
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

              {/* Send Feedback Button */}
              <button
                type="button"
                className="btn"
                style={styles.btn}
                onClick={submit}
              >
                Send feedback
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
      .fade-in { animation: fadeIn .35s ease both; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      .pop-in { animation: popIn .45s cubic-bezier(.2,.9,.3,1.3) both; }
      @keyframes popIn { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: scale(1); } }
      .btn:hover { background: ${C.brandDeep} !important; }
      .btn:active { transform: translateY(1px); }
      .btn-ghost:hover { color: ${C.ink} !important; border-color: ${C.muted} !important; }
      .scale-btn:hover { border-color: ${C.brandLine}; }
      .chip:hover { border-color: ${C.brandLine} !important; }
      input:focus, textarea:focus { outline: none; border-color: ${C.brand} !important; box-shadow: 0 0 0 3px ${C.brandSoft}; }
      button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid ${C.brand}; outline-offset: 2px; }
      textarea { resize: vertical; }
      ::placeholder { color: #9aa3b2; }
      @media (prefers-reduced-motion: reduce) {
        .fade-in, .pop-in { animation: none !important; }
        * { transition: none !important; }
      }
    `}</style>
  );
}
