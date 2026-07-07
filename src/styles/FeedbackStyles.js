// FeedbackStyles.js

import { C } from "../global/constants";

export const styles = {
  // General Styles
  shell: {
    minHeight: "100%",
    background:
      "radial-gradient(1200px 500px at 50% -10%, #dce6f0 0%, #edf1f7 55%)",
    padding: "10px 16px 56px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#16181d",
    boxSizing: "border-box",
    "--brand": C.brand,
    "--brand-deep": C.brandDeep,
    "--brand-soft": C.brandSoft,
    "--brand-line": C.brandLine,
    "--ink": C.ink,
    "--muted": C.muted,
  },

  frame: {
    maxWidth: 560,
    margin: "0 auto",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  // Branding Styles

  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 9,
  },

  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    background: C.brand,
    display: "inline-block",
    transform: "rotate(45deg)",
  },

  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 5,
    paddingTop: 5,
    borderTop: "0.5px solid #c7cbdb",
    justifyContent: 'space-between'
  },

  metaReviewer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  metaAvatar: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#CECBF6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 500,
    color: "#26215C",
  },

  metaClient: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  metaIcon: {
    fontSize: 15,
    color: "#8B93AB",
  },

  metaText: {
    fontSize: 13,
    color: "#6B7898",
  },

  metaStrong: {
    fontWeight: 500,
    color: "#3B4260",
  },

  metaDot: {
    width: 3,
    height: 3,
    borderRadius: "50%",
    background: "#AAB0C8",
  },

  brandName: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.2,
    color: C.ink,
  },

  // Feedback Form Styles

  periodChip: {
    fontSize: 12.5,
    fontWeight: 600,
    color: C.brandDeep,
    background: C.brandSoft,
    padding: "5px 11px",
    borderRadius: 999,
  },

  card: {
    background: "#ffffff",
    borderRadius: 18,
    padding: "20px 24px",
    border: "1px solid #e3e7ef",
    boxShadow: "0 18px 40px -24px rgba(20, 40, 70, 0.3)",
    marginTop: 8,
  },

  title: {
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: 700,
    margin: "0 0 6px",
    letterSpacing: -0.3,
  },

  sub: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#737c8c",
    margin: "0 0 5px",
  },

  // Section Styles
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    marginBottom: 16,
  },

  sectionNum: {
    width: 24,
    height: 24,
    borderRadius: 7,
    background: C.brandSoft,
    color: C.brand,
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  sectionTitle: {
    fontSize: 13.5,
    fontWeight: 700,
    color: "#16181d",
    textAlign: "left",
  },

  sectionCaption: {
    fontSize: 11.5,
    color: "#737c8c",
    marginTop: 1,
  },

  // Divider Styles
  divider: {
    height: 1,
    background: "#edf0f5",
    margin: "26px 0",
  },

  // Form Field Styles
  field: {
    display: "block",
    marginBottom: 18,
  },

  fieldLabel: {
    display: "block",
    fontSize: 12.5,
    fontWeight: 600,
    color: "#3a4150",
    marginBottom: 7,
    textAlign: "left",
  },

  req: {
    color: C.brandDeep,
  },

  opt: {
    color: "#737c8c",
    fontWeight: 500,
  },

  // Input and Textarea Styles
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    fontSize: 12,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#e3e7ef",
    borderRadius: 11,
    background: "#fff",
    color: "#16181d",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    fontSize: 12,
    lineHeight: 1.5,
    border: "1px solid #e3e7ef",
    borderRadius: 11,
    background: "#fff",
    color: "#16181d",
    fontFamily: "inherit",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },

  fieldError: {
    display: "block",
    color: "#dc2626",
    fontSize: 10.5,
    marginTop: 6,
    fontWeight: 500,
  },

  // Rating Styles
  ratingList: {
    borderTop: "1px solid #edf0f5",
  },

  ratingRow: {
    padding: "16px 0",
  },

  ratingHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 11,
  },

  ratingLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "#16181d",
    textAlign: "left",
  },

  ratingHint: {
    fontSize: 11.5,
    color: "#737c8c",
    marginTop: 2,
  },

  // Descriptor Styles
  descriptor: {
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
    transition: "color 0.15s",
  },

  // Scale Row and Button Styles
  scaleRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 8,
  },

  scaleBtn: {
    height: 30,
    borderRadius: 11,
    border: "1px solid",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition:
      "background 0.15s, border-color 0.15s, transform 0.12s, box-shadow 0.15s",
  },

  chipRow: {
    display: "grid",
    gap: 9,
  },

  choiceChip: {
    textAlign: "left",
    border: "1px solid",
    borderRadius: 12,
    padding: "10px 12px",
    cursor: "pointer",
    transition: "background 0.15s, border-color 0.15s",
    display: "block",
    width: "100%",
  },

  choiceLabel: {
    display: "block",
    fontSize: 12.5,
    fontWeight: 600,
  },

  choiceSub: {
    display: "block",
    fontSize: 10.5,
    color: "#737c8c",
    marginTop: 2,
  },

  // Button Styles
  btn: {
    background: C.brandDeep,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 26px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.15s, transform 0.1s",
    width: "100%",
    marginTop: 6,
  },

  btnGhost: {
    background: "transparent",
    color: "#737c8c",
    border: "1px solid #e3e7ef",
    borderRadius: 12,
    padding: "12px 22px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 0.15s, border-color 0.15s",
  },

  // Thank You Styles
  thankWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "18px 4px 8px",
  },

  check: {
    width: 64,
    height: 64,
    borderRadius: 999,
    background: C.ink,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    boxShadow: "0 10px 24px rgba(19, 122, 107, 0.35)",
  },

  shellTopBar: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loader: {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e7eb",
    borderTop: `4px solid ${C.brand}`,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadErrorSign: { fontSize: 32, marginBottom: 12 },
  linkError: {
    fontSize: 18,
    fontWeight: 700,
    color: C.ink,
    marginBottom: 8,
  },
  linkErrorText: { fontSize: 13, color: C.muted },
  submitErrorText: {
    fontSize: 12,
    color: "#dc2626",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: "10px 14px",
    marginBottom: 8,
  },
  loaderText: {
    fontSize: 14,
    color: C.muted,
  },
};
