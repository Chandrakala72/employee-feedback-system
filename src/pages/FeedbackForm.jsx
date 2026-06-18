import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import "../styles/Feedback.css";

const FeedbackForm = () => {
  const { employeeName } = useParams();

  const decodedEmployeeName = atob(employeeName);

  const [submitted, setSubmitted] = useState(false);

  const [questions, setQuestions] = useState([
    {
      question: "Communication Skills",
      rating: 0,
      comment: "",
    },
    {
      question: "Team Collaboration",
      rating: 0,
      comment: "",
    },
    {
      question: "Technical Skills",
      rating: 0,
      comment: "",
    },
    {
      question: "Problem Solving",
      rating: 0,
      comment: "",
    },
    {
      question: "Overall Performance",
      rating: 0,
      comment: "",
    },
  ]);

  const updateRating = (index, rating) => {
    const updated = [...questions];
    updated[index].rating = rating;
    setQuestions(updated);
  };

  const updateComment = (index, comment) => {
    const updated = [...questions];
    updated[index].comment = comment;
    setQuestions(updated);
  };

  const completedCount = questions.filter(
    (q) => q.rating > 0 && q.comment.trim() !== ""
  ).length;

  const progress = (completedCount / questions.length) * 100;

  const validateForm = () => {
    const invalid = questions.some(
      (q) => q.rating === 0 || q.comment.trim() === ""
    );

    if (invalid) {
      alert(
        "Please complete all ratings and comments before submitting."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      employeeName: decodedEmployeeName,
      feedback: questions,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/send-feedback",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Failed to submit feedback");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback");
    }
  };

  if (submitted) {
    return (
      <div className="success-page">
        <div className="success-card">
          <FaCheckCircle
            size={80}
            color="#10b981"
          />

          <h2
            style={{
              marginTop: "20px",
            }}
          >
            Thank You!
          </h2>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Your feedback for{" "}
            <strong>
              {decodedEmployeeName}
            </strong>{" "}
            has been submitted
            successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        {/* Header */}
        <div className="feedback-header">
          <div className="feedback-badge">
            Employee Feedback
          </div>

          <h1 className="feedback-title">
            {decodedEmployeeName}
          </h1>

          <p className="feedback-description">
            Your feedback helps us
            recognize strengths,
            celebrate achievements,
            and identify opportunities
            for growth.
          </p>

          <div className="stats-container">
            <div className="stat-box">
              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.8,
                }}
              >
                Questions
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                5
              </div>
            </div>

            <div className="stat-box">
              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.8,
                }}
              >
                Estimated Time
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                2 mins
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-card">
          <div className="progress-header">
            <span>Progress</span>

            <span>
              {completedCount}/5
              Completed
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Questions */}
        {questions.map(
          (item, index) => (
            <div
              key={index}
              className="question-card"
            >
              <div className="question-number">
                Question {index + 1} of
                5
              </div>

              <h3 className="question-title">
                {item.question}
              </h3>

              <div className="rating-section">
                <label className="rating-label">
                  Rating:
                </label>

                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FaStar
                        key={star}
                        size={32}
                        className="star-icon"
                        color={
                          star <=
                          item.rating
                            ? "#fbbf24"
                            : "#d1d5db"
                        }
                        onClick={() =>
                          updateRating(
                            index,
                            star
                          )
                        }
                      />
                    )
                  )}
                </div>
              </div>

              <div className="comment-section">
                <label className="comment-label">
                  Comments
                </label>

                <textarea
                  rows="4"
                  className="comment-textarea"
                  placeholder="Share your feedback..."
                  value={
                    item.comment
                  }
                  onChange={(e) =>
                    updateComment(
                      index,
                      e.target
                        .value
                    )
                  }
                />
              </div>
            </div>
          )
        )}

        <button
          onClick={handleSubmit}
          className="submit-btn"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;