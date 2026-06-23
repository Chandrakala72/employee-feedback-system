import { styles } from "../styles/FeedbackStyles";
// Field component for form inputs with label, optional/required indicator, and error message
export const Field = ({ label, required, optional, error, children }) => {
  return (
    <label style={styles.field}>
      <span style={styles.fieldLabel}>
        {label}
        {required && <span style={styles.req}> *</span>}
        {optional && <span style={styles.opt}> · optional</span>}
      </span>
      {children}
      {error ? <span style={styles.fieldError}>{error}</span> : null}
    </label>
  );
};
