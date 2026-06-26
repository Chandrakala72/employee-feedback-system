import { useState, useRef, useEffect } from "react";
import { styles } from "../styles/SearchableSelect.styles";

export function SearchableSelect({ value, onChange, options, placeholder }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const ref = useRef();

  const isActive = !!value;

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function getOptionStyle(o) {
    if (value === o) return { ...styles.optionBase, ...styles.optionSelected };
    if (hoveredOption === o)
      return { ...styles.optionBase, ...styles.optionHover };
    return { ...styles.optionBase, ...styles.optionDefault };
  }

  return (
    <div ref={ref} style={styles.wrapper}>
      <input
        value={value || query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange("");
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        style={styles.input(isActive)}
      />

      {/* Chevron */}
      <svg
        style={styles.chevron(isActive)}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>

      {/* Dropdown */}
      {open && (
        <div style={styles.dropdown}>
          {/* Reset / placeholder row */}
          <div
            onClick={() => {
              onChange("");
              setQuery("");
              setOpen(false);
            }}
            style={{
              ...styles.optionBase,
              ...styles.optionPlaceholder,
              ...(hoveredOption === "__placeholder__"
                ? styles.optionHover
                : {}),
            }}
            onMouseEnter={() => setHoveredOption("__placeholder__")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            {placeholder}
          </div>

          {filtered.length === 0 ? (
            <div style={styles.noResults}>No results</div>
          ) : (
            filtered.map((o) => (
              <div
                key={o}
                onClick={() => {
                  onChange(o);
                  setQuery("");
                  setOpen(false);
                }}
                style={getOptionStyle(o)}
                onMouseEnter={() => setHoveredOption(o)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                {o}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
