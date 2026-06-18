import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaCheckCircle, FaUserCircle } from "react-icons/fa";

const Feedback = () => {
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
    (q) => q.rating > 0 && q.comment.trim() !== "",
  ).length;

  const progress = (completedCount / questions.length) * 100;

  const validateForm = () => {
    const invalid = questions.some(
      (q) => q.rating === 0 || q.comment.trim() === "",
    );

    if (invalid) {
      alert("Please complete all ratings and comments before submitting.");
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
      const response = await fetch("http://localhost:5000/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "24px",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <FaCheckCircle size={80} color="#10b981" />

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
            Your feedback for <strong>{decodedEmployeeName}</strong> has been
            submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header */}

        {/* Header */}

        <div
          style={{
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            borderRadius: "28px",
            padding: "35px",
            textAlign: "center",
            color: "#fff",
            marginBottom: "25px",
            boxShadow: "0 12px 30px rgba(79,70,229,0.25)",
          }}
        >
          {/* Initial Badge */}

          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              padding: "8px 16px",
              borderRadius: "20px",
              marginBottom: "15px",
              fontSize: "16px",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            Employee Feedback
          </div>

          <h1
            style={{
              margin: "0",
              fontSize: "42px",
              fontWeight: "700",
              color: "#fff",
              lineHeight: "1.2",
            }}
          >
            {decodedEmployeeName}
          </h1>

          <p
            style={{
              marginTop: "12px",
              marginBottom: "0",
              fontSize: "16px",
              opacity: "0.9",
              maxWidth: "650px",
              marginInline: "auto",
              lineHeight: "1.7",
            }}
          >
            Your feedback helps us recognize strengths, celebrate achievements,
            and identify opportunities for growth.
          </p>

          {/* Decorative Stats */}

          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "10px 18px",
                borderRadius: "12px",
              }}
            >
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

            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "10px 18px",
                borderRadius: "12px",
              }}
            >
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

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Progress</span>

            <span>
              {completedCount}
              /5 Completed
            </span>
          </div>

          <div
            style={{
              height: "10px",
              background: "#e5e7eb",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg,#4f46e5,#7c3aed)",
                transition: "0.3s",
              }}
            />
          </div>
        </div>

        {/* Questions */}

        {questions.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                color: "#6b7280",
                fontSize: "14px",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              Question {index + 1} of 5
            </div>

            <h3
              style={{
                marginTop: "5px",
                marginBottom: "20px",
                textAlign: "left",
              }}
            >
              {item.question}
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginTop: "10px",
              }}
            >
              <label
                style={{
                  fontWeight: "600",
                  minWidth: "60px",
                }}
              >
                Rating:
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={32}
                    color={star <= item.rating ? "#fbbf24" : "#d1d5db"}
                    style={{
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                    onClick={() => updateRating(index, star)}
                  />
                ))}
              </div>
            </div>
            {/* Comment */}

            <div
              style={{
                marginTop: "20px",
              }}
            >
              <label
                style={{
                  fontWeight: "600",
                  textAlign: "left",
                  display: "block",
                  color: "#6b7280",
                }}
              >
                Comments
              </label>

              <textarea
                rows="4"
                placeholder="Share your feedback..."
                value={item.comment}
                onChange={(e) => updateComment(index, e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  resize: "none",
                  fontSize: "15px",
                }}
              />
            </div>
          </div>
        ))}

        {/* Submit */}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            color: "#fff",
            border: "none",
            borderRadius: "16px",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px",
            marginBottom: "40px",
          }}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
