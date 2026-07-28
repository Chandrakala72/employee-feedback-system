import { styles } from "../styles/FeedbackStyles";

// ThankYou component for displaying a thank you message after feedback submission
export const ThankYou = ({ consultant, reviewerName, onReset }) => {
  return (
    <div style={styles.thankWrap}>
      <div style={styles.check} className="pop-in">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4.2 4.2L19 7"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 style={{ ...styles.title, textAlign: "center", marginTop: 4 }}>
        Thank you{reviewerName ? `, ${reviewerName.split(" ")[0]}!` : ""}
      </h1>

      <p style={{ ...styles.sub, textAlign: "center", maxWidth: 360 }}>
        {consultant
          ? (<>`Your feedback for <b>{consultant}</b> has been submitted successfully.`</>)
          : "Your response has been recorded."}
        <br />
        Thank you for taking the time to share your feedback.
        <br />
        Your valuable input helps us continuously improve the quality of our work.
      </p>

      {reviewerName && (
        <p
          style={{
            fontSize: 12,
            color: "var(--text-secondary, #8a8a86)",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Submitted by {reviewerName}
        </p>
      )}
    </div>
  );
};