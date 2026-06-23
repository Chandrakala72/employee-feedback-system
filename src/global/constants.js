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

// Scale descriptors for the ratings
export const SCALE = ["Poor", "Fair", "Good", "Very good", "Excellent"];
