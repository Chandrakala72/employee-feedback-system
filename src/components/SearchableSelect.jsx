import { useState, useRef, useEffect } from "react";
import { styles } from "../styles/SearchableSelect.styles";

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  multiple = false,
}) {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const ref = useRef();

  const normalized = options.map((o) => {
    if (typeof o === "string") {
      return { value: o, name: o, subtitle: null };
    }
    return {
      value: o.value ?? o.id ?? o.name,
      name: o.name ?? o.label ?? String(o.value ?? o.id),
      subtitle: o.subtitle ?? null,
    };
  })
  const filtered = normalized.filter(
    (o) =>
      o.name.toLowerCase().includes(query.toLowerCase()) ||
      (o.subtitle && o.subtitle.toLowerCase().includes(query.toLowerCase())),
  );

  // Normalize value into an array for multi mode, keep as-is for single mode
  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : value;

  const selectedOptions = multiple
    ? normalized.filter((o) => selectedValues.includes(o.value))
    : normalized.find((o) => o.value === value);

  const isActive = multiple ? selectedValues.length > 0 : !!selectedOptions;

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

  function isSelected(o) {
    return multiple ? selectedValues.includes(o.value) : value === o.value;
  }

  function getOptionStyle(o) {
    if (isSelected(o))
      return { ...styles.optionBase, ...styles.optionSelected };
    if (hoveredOption === o.value)
      return { ...styles.optionBase, ...styles.optionHover };
    return { ...styles.optionBase, ...styles.optionDefault };
  }

  function handleOptionClick(o) {
    if (multiple) {
      const next = selectedValues.includes(o.value)
        ? selectedValues.filter((v) => v !== o.value)
        : [...selectedValues, o.value];
      onChange(next);
      // keep dropdown open for multi-select so user can pick more
      setQuery("");
    } else {
      onChange(o.value);
      setQuery("");
      setIsTyping(false);
      setOpen(false);
    }
  }

  function handleClear() {
    if (multiple) {
      onChange([]);
    } else {
      onChange("");
    }
    setQuery("");
    setIsTyping(false);
    setOpen(false);
  }

  const displayValue = isTyping
    ? query
    : multiple
      ? selectedOptions.map((o) => o.name).join(", ")
      : selectedOptions?.name || "";

  return (
    <div ref={ref} style={styles.wrapper}>
      <input
        value={displayValue}
        onChange={(e) => {
          setIsTyping(true);
          setQuery(e.target.value);
          if (!multiple && value) onChange("");
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        style={styles.input(isActive)}
        disabled={disabled}
        readOnly={multiple}
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
            onClick={handleClear}
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
            {multiple ? "Clear all" : placeholder}
          </div>

          {filtered.length === 0 ? (
            <div style={styles.noResults}>No results</div>
          ) : (
            filtered.map((o) => (
              <div
                key={o.value}
                onClick={() => handleOptionClick(o)}
                style={{
                  ...getOptionStyle(o),
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={() => setHoveredOption(o.value)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={isSelected(o)}
                    readOnly
                    style={{ pointerEvents: "none" }}
                  />
                )}
                <div style={{ flex: 1 }}>
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
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}