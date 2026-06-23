import { styles } from "../styles/FeedbackStyles";
// SectionLabel component for displaying section number, title, and optional caption
export const SectionLabel = ({ n, title, caption }) => {
  return (
    <div style={styles.sectionLabel}>
      <span style={styles.sectionNum}>{n}</span>
      <div>
        <div style={styles.sectionTitle}>{title}</div>
        {caption && <div style={styles.sectionCaption}>{caption}</div>}
      </div>
    </div>
  );
};
