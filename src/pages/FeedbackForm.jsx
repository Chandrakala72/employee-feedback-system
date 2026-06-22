import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "../styles/Feedback.css";

const QUESTIONS = [
  "How effectively does this employee communicate complex concepts to non-technical stakeholders?",
  "How well does this employee collaborate with cross-functional teams and contribute to a positive environment?",
  "Rate this employee's ability to independently solve problems and make sound decisions under pressure.",
  "How consistently does this employee meet deadlines and manage multiple competing priorities?",
  "Overall, how would you rate this employee's performance and potential for growth within the organisation?",
];

function AutoTextarea({ value, onChange, placeholder }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      className="fb-ta"
      rows={1}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default function FeedbackForm() {
  const { employeeName } = useParams();
  const name = atob(employeeName);

  const [ratings, setRatings] = useState(Array(QUESTIONS.length).fill(0));
  const [comments, setComments] = useState(Array(QUESTIONS.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const setRating = (i, n) => {
    const r = [...ratings];
    r[i] = n;
    setRatings(r);
  };
  const setComment = (i, v) => {
    const c = [...comments];
    c[i] = v;
    setComments(c);
  };

  const completedCount = ratings.filter((r, i) => r > 0).length;
  const allDone = completedCount === QUESTIONS.length;

  const handleSubmit = async () => {
    if (!allDone) {
      setShowErr(true);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://67eiryoroz2cafkng73dquuho40csyhq.lambda-url.us-west-2.on.aws/",
        {
          name,
          responses: QUESTIONS.map((q, i) => ({
            question: q,
            rating: ratings[i],
            comments: comments[i],
          })),
        },
      );
      const result =
        typeof res.data.body === "string"
          ? JSON.parse(res.data.body)
          : res.data;
      if (result.success) setSubmitted(true);
      else throw new Error("Failed");
    } catch {
      alert("Failed to send feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fb-page">
        <div className="success-card">
          <div className="s-ring">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4caf50"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="s-title">Feedback submitted</p>
          <p className="s-msg">
            Your Feedbacks for <strong>{name}</strong>
            <br />
            has been recorded successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fb-page">
      <div className="fb-inner">
        {/* Banner */}
        <div className="banner">
          <img src={logo} alt="TechNerds" className="company-logo" />
          <div className="employee-name">Employee Feedback for {name}</div>
        </div>

        <div className="fb-grid">
          {QUESTIONS.map((q, i) => {
            const done = ratings[i] > 0;
            return (
              <div key={i} className={`fb-card${done ? " done" : ""}`}>
                {/* Question Section */}
                <div className="q-head">
                  <span className="q-text">{q}</span>
                </div>
                {/* Comments Section */}
                <div className="feedback-row">
                  <div className="comment-container">
                    <AutoTextarea
                      value={comments[i]}
                      onChange={(e) => setComment(i, e.target.value)}
                      placeholder="Share your thoughts…"
                    />
                  </div>
                  {/* Rating Section */}
                  <div
                    className="stars"
                    role="group"
                    aria-label={`Rate question ${i + 1}`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={`star${n <= ratings[i] ? " on" : ""}`}
                        onClick={() => setRating(i, n)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${n} star`}
                        onKeyDown={(e) =>
                          (e.key === "Enter" || e.key === " ") &&
                          setRating(i, n)
                        }
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Validation Message */}
        <div className="fb-footer">
          {showErr && !allDone && (
            <span className="fb-err">
              Please complete all sections before submitting.
            </span>
          )}
          <button
            className="sub-btn"
            onClick={handleSubmit}
            disabled={!allDone || loading}
          >
            {loading ? "Submitting…" : "Submit evaluation"}
          </button>
        </div>
      </div>
    </div>
  );
}
