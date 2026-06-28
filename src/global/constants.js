export const BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

export const C = {
  // Text
  ink: "#0B2F8A", // Deep logo blue
  body: "#334155", // Neutral slate
  muted: "#64748B", // Muted text

  // Borders
  line: "#D9E2F3",
  lineSoft: "#EEF3FB",

  // Backgrounds
  paper: "#F7F9FD",
  surface: "#FFFFFF",

  // Primary Brand (Logo Blue)
  brand: "#0038B8",
  brandDeep: "#002A87",
  brandSoft: "#E8F0FF",
  brandLine: "#BFD0FF",

  // Accent (Logo Orange)
  accent: "#FF6B2C",
  accentDeep: "#E85A1D",
  accentSoft: "#FFF1EA",

  // Status
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
};

// Dimensions for the feedback form
export const DIMENSIONS = [
  {
    key: "technical",
    label: "Technical expertise",
    hint: "Depth of skill and quality of the work delivered",
  },
  {
    key: "communication",
    label: "Communication & responsiveness",
    hint: "Clarity, updates, and how quickly they reply",
  },
  {
    key: "reliability",
    label: "Reliability & deadlines",
    hint: "Shows up, follows through, hits commitments",
  },
  {
    key: "problemSolving",
    label: "Problem-solving & initiative",
    hint: "Anticipates issues and proposes solutions",
  },
  {
    key: "collaboration",
    label: "Professionalism & collaboration",
    hint: "Fits the team and is good to work with",
  },
  {
    key: "overall",
    label: "Overall satisfaction",
    hint: "Your single summary score for this period",
    required: true,
  },
];

/* ─── Design tokens ────────────────────────────────────────────────────────── */
export const C_Dashboard = {
  brand: "#3B5BDB",
  brandDeep: "#2f4abf",
  brandSoft: "#eef1fb",
  brandLine: "#c7d2f8",
  ink: "#16181d",
  muted: "#737c8c",
  border: "#e3e7ef",
  bg: "#fafbfd",
  pageBg: "radial-gradient(1200px 500px at 50% -10%, #dce6f0 0%, #edf1f7 55%)",
  green: "#16a34a",
  greenSoft: "#dcfce7",
  greenLine: "#bbf7d0",
  amber: "#d97706",
  amberSoft: "#fef3c7",
  amberLine: "#fde68a",
  red: "#dc2626",
  redSoft: "#fee2e2",
};

// Scale descriptors for the ratings
export const SCALE = ["Poor", "Fair", "Good", "Very good", "Excellent"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const constants = {
  feedback_dashboard: "Feedback Dashboard",
  feedback_form: "Feedback Form",
  feedback_submitted: "Feedback Submitted",
  feedback_url_generator: "Feedback URL Generator",
  generateLink: "Generate a feedback link",
  createLink:"Create Feedback Link",
  view_dashboard: "View Dashboard",
  generateCaption:
    "Create a personalized feedback URL. The employee won't see who said what.",
  linkDetails: "Link details",
  reviewerName: "Reviewer name",
  employeeName: "Employee name",
  projectName: "Project name",
  reviewPeriod: "Review period",
  generating: "Generating...",
  generateLinkTitle: " Generate Links",
  generateFeedbackLink: "Generate Feedback Link",
  loadPreviousLink: "Loading previously generated links...",
  previousGenerated: "Previously generated",
  anotherLink: "Create another feedback link",
  feedback_responses: "Feedback Responses",
  feedback_response_info: "Click any card to view the full response.",
  filters: "Filters",
  newest_first: "Newest first",
  oldest_first: "Oldest first",
  highest_rated: "Highest rated",
  lowest_rated: "Lowest rated",
  employee_a_to_z: "Employee A→Z",
  clear_filters: "Clear filters",
  next: "Next",
  prev: "Prev",
  apiError: "Something went wrong. Please try again.",
  loading_feedback_form: "Loading feedback form...",
  linkNotFound: "Link not found",
  share_feedback: "Share your feedback",
  feedback_info:
    "Takes about two minutes. Your answers stay between you and Technerds — the employee won't see who said what.",
  section: {
    label: {
      inWords: "In your words",
    },
    caption: "Optional, but the most useful part",
  },
  sending: "Sending…",
  sendFeedback: "Send feedback",
  fields: {
    label: {
      well: "What's going well?",
      better: "What could be better?",
    },
    placeholder: {
      well: "Strengths, standout moments, things to keep doing…",
      better: "Anything that would make the engagement smoother…",
    },
  },
};
