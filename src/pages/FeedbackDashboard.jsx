import { useState, useEffect, useMemo } from "react";
import myLogo from "../assets/logo.png";
import { ratingColor } from "../global/common";
import { Avatar } from "../components/Avatar";
import { RatingChip } from "../components/RatingChip";
import { BASE, C_Dashboard, constants } from "../global/constants";
import { EmptyState } from "../components/EmptyState";
import { ResponseDetail } from "../components/ResponseDetail";
import { ResponseCard } from "../components/ResponseListCard";
import { pageBtnSt, selectStyle } from "../global/helper";
import "../styles/FeedbackDashboard.css";
import "../styles/FeedbackDashboard-Responsive.css";
import { Spinner } from "../components/Spinner";
import { styles } from "../styles/FeedbackDashboard_styles";
import { SearchableSelect } from "../components/SearchableSelect";
import { useNavigate } from "react-router-dom";

/* ─── Main Dashboard ───────────────────────────────────────────────────────── */
export default function FeedbackDashboard() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  // Filters
  const [empFilter, setEmpFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");
  const [sortKey, setSortKey] = useState("submitted_at");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  /* ── Fetch all responses ──────────────────────────────────────────────── */
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE}/api/responses?limit=500`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.message);
        setResponses(json.data || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  /* ── Derived filter options ─────────────────────────────────────────── */
  const employees = useMemo(
    () =>
      [
        ...new Set(responses.map((r) => r.employee_name).filter(Boolean)),
      ].sort(),
    [responses],
  );
  const projects = useMemo(
    () =>
      [...new Set(responses.map((r) => r.project_name).filter(Boolean))].sort(),
    [responses],
  );
  const periods = useMemo(
    () =>
      [...new Set(responses.map((r) => r.period_label).filter(Boolean))].sort(),
    [responses],
  );

  /* ── Filtered + sorted ──────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let rows = responses;
    if (empFilter) rows = rows.filter((r) => r.employee_name === empFilter);
    if (projectFilter)
      rows = rows.filter((r) => r.project_name === projectFilter);
    if (periodFilter)
      rows = rows.filter((r) => r.period_label === periodFilter);

    return [...rows].sort((a, b) => {
      let av = a[sortKey],
        bv = b[sortKey];
      if (av == null) av = sortDir === "asc" ? Infinity : -Infinity;
      if (bv == null) bv = sortDir === "asc" ? Infinity : -Infinity;
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      return sortDir === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
    });
  }, [responses, empFilter, projectFilter, periodFilter, sortKey, sortDir]);

  /* ── Pagination ─────────────────────────────────────────────────────── */
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const hasFilters = empFilter || projectFilter || periodFilter;

  function handleFilter(setter) {
    return (e) => {
      setter(e.target.value);
      setPage(1);
    };
  }

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div style={styles.page}>
      {/* ── Sticky top bar ── */}
      <div style={styles.topBar}>
        <img src={myLogo} alt="Technerds" style={styles.logo} />
        <span style={styles.dashboardTitle}>
          {constants.feedback_dashboard}
        </span>
        <button
          onClick={() => navigate("/feedback-urls")}
          style={styles.navBtn}
        >
          {constants.generateLinkTitle}
        </button>
      </div>

      <div style={styles.pageHeader}>
        {/* ── Page heading ── */}
        {/* <div style={{ marginBottom: 22 }}>
          <h1 style={styles.pageHeading}>{constants.feedback_responses}</h1>
          <p style={styles.pageCaption}>{constants.feedback_response_info}</p>
        </div> */}

        {/* ── Filters + sort ── */}
        <div style={styles.filterRow}>
          <div style={styles.filter}>
            <span style={styles.filterTitle}>{constants.filters}</span>
            <div style={styles.sortRow}>
              {/* Sort selector */}
              <select
                value={`${sortKey}:${sortDir}`}
                onChange={(e) => {
                  const [k, d] = e.target.value.split(":");
                  setSortKey(k);
                  setSortDir(d);
                  setPage(1);
                }}
                style={selectStyle(false)}
              >
                <option value="submitted_at:desc">
                  {constants.newest_first}
                </option>
                <option value="submitted_at:asc">
                  {constants.oldest_first}
                </option>
                <option value="rating_overall:desc">
                  {constants.highest_rated}
                </option>
                <option value="rating_overall:asc">
                  {constants.lowest_rated}
                </option>
                <option value="employee_name:asc">
                  {constants.employee_a_to_z}
                </option>
              </select>

              {hasFilters && (
                <button
                  onClick={() => {
                    setEmpFilter("");
                    setProjectFilter("");
                    setPeriodFilter("");
                    setPage(1);
                  }}
                  style={styles.clearBtn}
                >
                  {constants.clear_filters}
                </button>
              )}
            </div>
          </div>

          <div style={styles.filterGrid} className="filter-grid">
            {[
              {
                label: "Employee",
                value: empFilter,
                setter: setEmpFilter,
                options: employees,
                ph: "All employees",
              },
              {
                label: "Project",
                value: projectFilter,
                setter: setProjectFilter,
                options: projects,
                ph: "All projects",
              },
              {
                label: "Period",
                value: periodFilter,
                setter: setPeriodFilter,
                options: periods,
                ph: "All periods",
              },
            ].map(({ label, value, setter, options, ph }) => (
              <div key={label} style={styles.filterTableRow}>
                <label style={styles.filterLabel}>{label}</label>
                <SearchableSelect
                  value={value}
                  onChange={setter}
                  options={options}
                  placeholder={ph}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Response count ── */}
        {/* {!loading && !error && (
          <p style={styles.responseCount}>
            {filtered.length} response{filtered.length !== 1 ? "s" : ""}
            {hasFilters ? " matched" : " total"}
          </p>
        )} */}

        {/* ── Cards grid ── */}
        {loading ? (
          <Spinner text="Loading responses…" />
        ) : error ? (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>⚠️ {error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyStateContainer}>
            <EmptyState filtered={!!hasFilters} />
          </div>
        ) : (
          <>
            <div style={styles.cardsGrid} className="cards-grid">
              {paginated.map((row) => (
                <ResponseCard
                  key={row.id}
                  row={row}
                  onClick={() => setSelectedRow(row)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <span style={styles.pageText}>
                  Page {page} of {totalPages} · {filtered.length} responses
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={pageBtnSt(page === 1)}
                  >
                    ← {constants.prev}
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const n =
                      totalPages <= 5
                        ? i + 1
                        : page <= 3
                          ? i + 1
                          : page >= totalPages - 2
                            ? totalPages - 4 + i
                            : page - 2 + i;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        style={pageBtnSt(false, n === page)}
                      >
                        {n}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={pageBtnSt(page === totalPages)}
                  >
                    {constants.next} →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Detail modal ── */}
      {selectedRow && (
        <ResponseDetail
          row={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
}
