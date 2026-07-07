import { useEffect, useState, useMemo } from "react";
import myLogo from "../assets/logo.png";
import { styles } from "../styles/FeedbackURLGeneratorStyles";
import "../styles/FeedbackURLGenerate.css";
import { saveLink, listLinks, deactivateLink } from "../services/feedbackApi";
import { constants, MONTHS } from "../global/constants";
import { getPeriodLabel, generateUrl, isToBeforeFrom } from "../global/helper";
import { useNavigate } from "react-router-dom";
import { PeriodRow } from "../components/PeriodRow";
import { fetchEmployeeProjects } from "../services/employeeApi";
import { SearchableSelect } from "../components/SearchableSelect";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

export default function FeedbackUrlGenerator() {
  const navigate = useNavigate();
  const [reviewerName, setReviewerName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [fromMonth, setFromMonth] = useState(currentMonth);
  const [fromYear, setFromYear] = useState(currentYear);
  const [toMonth, setToMonth] = useState(currentMonth);
  const [toYear, setToYear] = useState(currentYear);
  const [empProjects, setEmpProjects] = useState([]); // raw data from source DB
  const [loadingEmpProjects, setLoadingEmpProjects] = useState(false);

  const projectOptions = useMemo(
    () =>
      [
        ...new Map(
          empProjects.map((r) => [
            r.projectName,
            { guid: r.projectGuid, name: r.projectName },
          ]),
        ).values(),
      ].sort((a, b) => a.name.localeCompare(b.name)),
    [empProjects],
  );

  const employeeOptions = useMemo(
    () =>
      projectName
        ? [
          ...new Map(
            empProjects
              .filter((r) => r.projectName === projectName)
              .map((r) => [
                r.employeeName,
                {
                  guid: r.employeeGuid,
                  name: r.employeeName,
                  subtitle: r.employeeEmail,
                },
              ]),
          ).values(),
        ].sort((a, b) => a.name.localeCompare(b.name))
        : [],
    [empProjects, projectName],
  );

  useEffect(() => {
    setLoadingEmpProjects(true);
    fetchEmployeeProjects()
      .then((json) => setEmpProjects(json.data || []))
      .catch(console.error)
      .finally(() => setLoadingEmpProjects(false));
  }, []);

  useEffect(() => {
    if (isToBeforeFrom(fromMonth, fromYear, toMonth, toYear)) {
      setErrors((prev) => ({
        ...prev,
        period: "To period must be later than From period",
      }));
    } else {
      setErrors((prev) => ({ ...prev, period: "" }));
    }
  }, [fromMonth, fromYear, toMonth, toYear]);

  // handle delete functionality
  async function handleDelete(id) {
    try {
      await deactivateLink(id);
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
    if (isToBeforeFrom(fromMonth, fromYear, toMonth, toYear)) {
      e.period = "To period must be later than From period";
    }
    return e;
  };

  // Handle Generate URL
  const handleGenerate = async () => {
    setToast("");
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      setErrors({});
      setGenerating(true);

      const periodLabel = `${getPeriodLabel(fromMonth, fromYear)} - ${getPeriodLabel(toMonth, toYear)}`;
      const response = await saveLink({
        employeeName,
        projectName,
        reviewerName,
        periodLabel,
      });

      const linkId = response.data.id;

      const url = `${window.location.origin}/feedback/${linkId}`;

      setGeneratedUrl(url);

      setToast("Link generated Successfully");
    } catch (error) {
      console.error(error);
      setToast(error.message || "Failed to generate feedback link");
    } finally {
      setGenerating(false);
      setTimeout(() => setToast(""), 3000);
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
    setFromMonth(currentMonth);
    setFromYear(currentYear);
    setToMonth(currentMonth);
    setToYear(currentYear);
    setGeneratedUrl("");
    setErrors({});
    setToast("");
  };

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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => {
              navigate("/", { replace: true });
            }}
            style={styles.navBtn}
          >
            {constants.view_dashboard}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("authUser");
              navigate("/login", { replace: true });
            }}
            style={styles.logoutBtn}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v10" />
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main card */}
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.cardHeader}>
            <h1 style={styles.cardTitle}>{constants.generateLink}</h1>
            <p style={styles.cardSubtitle}>{constants.generateCaption}</p>
          </div>

          <div style={styles.formBody}>
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

            <div
              style={{
                ...styles.row,
                gridTemplateColumns:
                  window.innerWidth < 560 ? "1fr" : "1fr 1fr",
              }}
            >
              <div style={styles.fieldGroup}>
                <label style={styles.label}>{constants.projectName}</label>
                <SearchableSelect
                  value={projectName}
                  onChange={(val) => {
                    setProjectName(val);
                    setEmployeeName("");
                    setErrors((prev) => ({ ...prev, projectName: "" }));
                  }}
                  options={projectOptions.map((p) => p.name)}
                  placeholder={
                    loadingEmpProjects ? "Loading..." : "Select Project"
                  }
                  disabled={loadingEmpProjects}
                />
                {errors.projectName && (
                  <span style={styles.errorMsg}>{errors.projectName}</span>
                )}
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>{constants.employeeName}</label>
                <SearchableSelect
                  value={employeeName}
                  onChange={(val) => {
                    setEmployeeName(val);
                    setErrors((prev) => ({ ...prev, employeeName: "" }));
                  }}
                  options={employeeOptions}
                  placeholder={
                    !projectName ? "Select project first" : "Select Employee"
                  }
                  disabled={!projectName || loadingEmpProjects}
                />
                {errors.employeeName && (
                  <span style={styles.errorMsg}>{errors.employeeName}</span>
                )}
              </div>
            </div>

            {/* <div style={styles.divider} /> */}

            <div style={styles.fieldGroup}>
              <label style={styles.label}>{constants.reviewPeriod}</label>
              <div
                style={{ display: "flex", flexDirection: "row", gap: 14, width: '100%' }}
              >
                {/* From */}
                <div style={{ ...styles.fieldGroup, width: '50%' }}>
                  <label
                    style={{
                      ...styles.label,
                      fontSize: 12,
                      color: "#6b7898",
                      marginBottom: 6,
                    }}
                  >
                    From
                  </label>
                  <PeriodRow
                    monthVal={fromMonth}
                    yearVal={fromYear}
                    onMonthChange={setFromMonth}
                    onYearChange={setFromYear}
                    monthKey="fromMonth"
                    yearKey="fromYear"
                    setFocusField={setFocusField}
                  />
                </div>

                {/* To */}
                <div style={{ ...styles.fieldGroup, width: '50%' }}>
                  <label
                    style={{
                      ...styles.label,
                      fontSize: 12,
                      color: "#6b7898",
                      marginBottom: 6,
                    }}
                  >
                    To
                  </label>
                  <PeriodRow
                    monthVal={toMonth}
                    yearVal={toYear}
                    onMonthChange={setToMonth}
                    onYearChange={setToYear}
                    monthKey="toMonth"
                    yearKey="toYear"
                  />
                </div>

              </div>

              {/* ── Period validation error ── */}
              {errors.period && (
                <span style={styles.errorMsg}>{errors.period}</span>
              )}
            </div>
            <div style={styles.divider} />
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
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div style={styles.toast}>{toast}</div>}

      <style>{`
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
        * { box-sizing: border-box; }
        input::placeholder { color: #aab0c8; }
        button:focus-visible { outline: 2px solid #3B5BDB; outline-offset: 2px; }
        input:focus-visible, select:focus-visible { outline: none; }
      `}</style>
    </div>
  );
}
