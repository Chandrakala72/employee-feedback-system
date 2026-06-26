export const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
  },

  input: (isActive) => ({
    width: "100%",
    padding: "9px 36px 9px 13px",
    fontSize: 14,
    borderRadius: 10,
    border: `1.5px solid ${isActive ? "#3B5BDB" : "#e2e6f0"}`,
    background: isActive ? "#f0f4ff" : "#fff",
    color: isActive ? "#1a2340" : "#aab0c8",
    fontWeight: isActive ? 500 : 400,
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    transition: "border 0.15s, background 0.15s",
  }),

  chevron: (isActive) => ({
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: isActive ? "#3B5BDB" : "#aab0c8",
  }),

  dropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    width: "100%",
    background: "#fff",
    border: "1.5px solid #e2e6f0",
    borderRadius: 10,
    boxShadow: "0 4px 16px rgba(59,91,219,0.10)",
    zIndex: 200,
    maxHeight: 200,
    overflowY: "auto",
  },

  optionBase: {
    padding: "9px 13px",
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.1s",
  },

  optionPlaceholder: {
    color: "#aab0c8",
  },

  optionSelected: {
    background: "#f0f4ff",
    color: "#3B5BDB",
    fontWeight: 600,
  },

  optionHover: {
    background: "#f5f7ff",
  },

  optionDefault: {
    background: "transparent",
    color: "#1a2340",
    fontWeight: 400,
  },

  noResults: {
    padding: "9px 13px",
    fontSize: 14,
    color: "#aab0c8",
  },
};
