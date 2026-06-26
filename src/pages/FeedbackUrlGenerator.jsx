import { useEffect, useState } from "react";
import myLogo from "../assets/logo.png";
import { styles } from "../styles/FeedbackURLGeneratorStyles";
import "../styles/FeedbackURLGenerate.css";
import { saveLink, listLinks, deactivateLink } from "../services/feedbackApi";
import { constants, MONTHS } from "../global/constants";
import { getPeriodLabel, generateUrl } from "../global/helper";
import { useNavigate } from "react-router-dom";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

export default function FeedbackUrlGenerator() {
  const navigate = useNavigate();
  const [reviewerName, setReviewerName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [generating, setGenerating] = useState(false);

  // load history
  useEffect(() => {
    loadHistory();
  }, []);

  // load history of urls
  async function loadHistory() {
    try {
      setLoadingHistory(true);
      const res = await listLinks({
        page: 1,
        limit: 100,
      });

      const formattedHistory = res.data.map((link) => ({
        id: link.id,
        employeeName: link.employee_name,
        reviewerName: link.reviewer_name,
        projectName: link.project_name,
        month: link.period_month,
        year: link.period_year,
        url: `${window.location.origin}/feedback/${link.id}`,
      }));

      setHistory(formattedHistory);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  }

  // handle delete functionality
  async function handleDelete(id) {
    try {
      await deactivateLink(id);

      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // Handle Validation
  const validate = () => {
    const e = {};
    if (!reviewerName.trim()) e.reviewerName = "Reviewer name is required";
    if (!employeeName.trim()) e.employeeName = "Employee name is required";
    if (!projectName.trim()) e.projectName = "Project name is required";
    return e;
  };

  // Handle Generate URL
  const handleGenerate = async () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      setErrors({});
      setGenerating(true);

      const response = await saveLink({
        reviewName: reviewerName,
        employeeName,
        projectName,
        reviewerName,
        month,
        year,
      });

      const linkId = response.data.id;

      const url = `${window.location.origin}/feedback/${linkId}`;

      setGeneratedUrl(url);

      setHistory((prev) => [
        {
          id: linkId,
          employeeName,
          reviewerName,
          projectName,
          month,
          year,
          url,
        },
        ...prev.filter((h) => h.id !== linkId),
      ]);
    } catch (error) {
      console.error(error);
      setToast(error.message || "Failed to generate feedback link");
    } finally {
      setGenerating(false);
    }
  };

  // Handle Copy URL
  function handleCopy(url) {
    function onSuccess() {
      setCopied(true);
      setToast("Link copied to clipboard");
      setTimeout(() => {
        setCopied(false);
        setToast("");
      }, 2000);
    }
    function onFail() {
      setToast("Could not copy — please copy the link manually");
      setTimeout(() => setToast(""), 3000);
    }

    /* Modern browsers on HTTPS */
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(onSuccess).catch(onFail);
      return;
    }

    /* Legacy fallback — execCommand (HTTP, older browsers, WebViews, iOS Safari) */
    try {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, ta.value.length); /* iOS Safari */
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? onSuccess() : onFail();
    } catch (_) {
      onFail();
    }
  }

  //Handle Add New URL

  const handleAddNew = () => {
    setReviewerName("");
    setProjectName("");
    setEmployeeName("");
    setMonth(currentMonth);
    setYear(currentYear);
    setGeneratedUrl("");
    setErrors({});
    setShowAdd(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const years = [];
  for (let y = currentYear - 2; y <= currentYear + 1; y++) years.push(y);

  const inputStyle = (field) => ({
    ...styles.input,
    ...(focusField === field ? styles.inputFocus : {}),
  });

  const selectStyle = (field) => ({
    ...styles.select,
    ...(focusField === field ? styles.selectFocus : {}),
  });

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <div>
            <img
              src={myLogo}
              alt="Company Logo"
              style={{ height: 26, objectFit: "contain" }}
            />
          </div>
        </div>
        <p style={styles.topBarTitle}>{constants.feedback_url_generator}</p>
        <button onClick={() => navigate("/")} style={styles.navBtn}>
          {constants.view_dashboard}
        </button>
      </div>

      {/* Main card */}
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.cardHeader}>
            <h1 style={styles.cardTitle}>{constants.generateLink}</h1>
            <p style={styles.cardSubtitle}>{constants.generateCaption}</p>
          </div>

          {/* Section label */}
          <div style={styles.sectionLabel}>
            <div style={styles.sectionBadge}>1</div>
            <p style={styles.sectionTitle}>{constants.linkDetails}</p>
          </div>

          {/* Form */}
          <div style={styles.formBody}>
            {/* Reviewer name */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>{constants.reviewerName}</label>
              <input
                style={inputStyle("reviewerName")}
                type="text"
                placeholder="Enter Reviewer Name"
                value={reviewerName}
                onChange={(e) => {
                  setReviewerName(e.target.value);
                  setErrors((prev) => ({ ...prev, reviewerName: "" }));
                }}
                onFocus={() => setFocusField("reviewerName")}
                onBlur={() => setFocusField(null)}
              />
              {errors.reviewerName && (
                <span style={styles.errorMsg}>{errors.reviewerName}</span>
              )}
            </div>

            {/* Employee + Project row */}
            <div
              style={{
                ...styles.row,
                gridTemplateColumns:
                  window.innerWidth < 560 ? "1fr" : "1fr 1fr",
              }}
            >
              <div style={styles.fieldGroup}>
                <label style={styles.label}>{constants.employeeName}</label>
                <input
                  style={inputStyle("employeeName")}
                  type="text"
                  placeholder="Enter Employee Name"
                  value={employeeName}
                  onChange={(e) => {
                    setEmployeeName(e.target.value);
                    setErrors((prev) => ({ ...prev, employeeName: "" }));
                  }}
                  onFocus={() => setFocusField("employeeName")}
                  onBlur={() => setFocusField(null)}
                />
                {errors.employeeName && (
                  <span style={styles.errorMsg}>{errors.employeeName}</span>
                )}
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>{constants.projectName} </label>
                <input
                  style={inputStyle("projectName")}
                  type="text"
                  placeholder="Enter Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onFocus={() => setFocusField("projectName")}
                  onBlur={() => setFocusField(null)}
                />
              </div>
            </div>

            <div style={styles.divider} />

            {/* Review period */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>{constants.reviewPeriod}</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    window.innerWidth < 560 ? "1fr" : "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <select
                    style={selectStyle("month")}
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    onFocus={() => setFocusField("month")}
                    onBlur={() => setFocusField(null)}
                  >
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ position: "relative" }}>
                  <select
                    style={selectStyle("year")}
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    onFocus={() => setFocusField("year")}
                    onBlur={() => setFocusField(null)}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Generate button */}
            <button
              style={{
                ...styles.generateBtn,
                ...(btnHover ? styles.generateBtnHover : {}),
                ...(btnActive ? styles.generateBtnActive : {}),
              }}
              onClick={handleGenerate}
              disabled={generating}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => {
                setBtnHover(false);
                setBtnActive(false);
              }}
              onMouseDown={() => setBtnActive(true)}
              onMouseUp={() => setBtnActive(false)}
            >
              {generating
                ? constants.generating
                : constants.generateFeedbackLink}
            </button>

            {/* Generated URL */}
            {generatedUrl && (
              <div style={styles.resultBox}>
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.resultUrl}
                >
                  {generatedUrl}
                </a>
                <button
                  style={{
                    ...styles.copyBtn,
                    ...(copied ? styles.copyBtnCopied : {}),
                  }}
                  onClick={() => handleCopy(generatedUrl)}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>
          {loadingHistory && (
            <p style={{ textAlign: "center", padding: "16px" }}>
              {constants.loadPreviousLink}
            </p>
          )}

          {/* History */}
          {history.length > 0 && (
            <>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#edf0f7",
                  margin: "0 40px",
                }}
              />
              <div style={styles.historySection}>
                <div style={{ height: "24px" }} />
                <p style={styles.historyTitle}>{constants.previousGenerated}</p>
                {history.map((item) => (
                  <div key={item.id} style={styles.historyItem}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={styles.historyName}>{item.employeeName}</p>
                      <p style={styles.historyMeta}>
                        {item.reviewerName}
                        {item.projectName ? ` · ${item.projectName}` : ""}
                        {" · "}
                        {getPeriodLabel(item.month, item.year)}
                      </p>
                    </div>
                    <div style={styles.historyActions}>
                      <button
                        style={styles.iconBtn}
                        title="Copy link"
                        onClick={() => handleCopy(item.url)}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                      <button
                        style={styles.iconBtn}
                        title="Remove"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add new feedback link */}
                <button style={styles.addNewBtn} onClick={handleAddNew}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  {constants.anotherLink}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && <div style={styles.toast}>{toast}</div>}

      {/* Responsive styles via a style tag */}
      <style>{`
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        * { box-sizing: border-box; }
        input::placeholder, select option[disabled] { color: #aab0c8; }
        button:focus-visible { outline: 2px solid #3B5BDB; outline-offset: 2px; }
        input:focus-visible, select:focus-visible { outline: none; }
      `}</style>
    </div>
  );
}
