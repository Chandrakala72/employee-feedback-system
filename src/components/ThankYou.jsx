import { styles } from "../styles/FeedbackStyles";

// ThankYou component for displaying a thank you message after feedback submission
export const ThankYou = ({ consultant, onReset }) => {
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
        Thank you
      </h1>
      <p style={{ ...styles.sub, textAlign: "center", maxWidth: 360 }}>
        Your feedback{consultant ? ` on ${consultant.split(" ")[0]}` : ""} has
        been recorded. It helps us keep the right people on your account.
      </p>
    </div>
  );
};
