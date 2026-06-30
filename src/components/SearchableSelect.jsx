import { useState, useRef, useEffect } from "react";
import { styles } from "../styles/SearchableSelect.styles";
import { SiUbuntu } from "react-icons/si";

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}) {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const ref = useRef();

  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, name: o, subtitle: null } : o,
  );

  const filtered = normalized.filter(
    (o) =>
      o.name.toLowerCase().includes(query.toLowerCase()) ||
      (o.subtitle && o.subtitle.toLowerCase().includes(query.toLowerCase())),
  );

  const selectedOption = normalized.find((o) => o.value === value);

  const isActive = !!selectedOption;

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
        setIsTyping(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function getOptionStyle(o) {
    if (value === o.value)
      return { ...styles.optionBase, ...styles.optionSelected };
    if (hoveredOption === o.value)
      return { ...styles.optionBase, ...styles.optionHover };
    return { ...styles.optionBase, ...styles.optionDefault };
  }

  const displayValue = isTyping ? query : selectedOption?.name || "";

  return (
    <div ref={ref} style={styles.wrapper}>
      <input
        value={displayValue}
        onChange={(e) => {
          setIsTyping(true);
          setQuery(e.target.value);
          if (value) onChange("");
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        style={styles.input(isActive)}
        disabled={disabled}
      />

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

      {open && !disabled && (
        <div style={styles.dropdown}>
          <div
            onClick={() => {
              onChange("");
              setQuery("");
              setIsTyping(false);
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
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setQuery("");
                  setIsTyping(false);
                  setOpen(false);
                }}
                style={getOptionStyle(o)}
                onMouseEnter={() => setHoveredOption(o.value)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    textAlign: "left",
                  }}
                >
                  {o.name}
                </div>
                {o.subtitle && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#8b93ab",
                      lineHeight: 1.3,
                      marginTop: 2,
                      textAlign: "left",
                    }}
                  >
                    {o.subtitle}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
