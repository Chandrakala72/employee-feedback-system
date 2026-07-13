import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authApi";
import myLogo from "../assets/logo.png";
import { C } from "../global/constants";

const SAMPLE_CARDS = [
    { name: "John Doe", project: "Excellent", score: 5, gender: "Male" },
    { name: "Jane Doe", project: "Good", score: 4, gender: "Female" },
];

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { token, username: u } = await login(username, password);
            localStorage.setItem("authToken", token);
            localStorage.setItem("authUser", u);
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message || "Couldn't sign in. Check your details and try again.");
        } finally {
            setLoading(false);
        }
    }

    function AvatarIcon({ gender }) {
        if (gender === "Female") {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                    <circle cx="12" cy="6" r="5" />
                    <path d="M12 12l-5 8h3l1-3h2l1 3h3z" />
                </svg>
            );
        }
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                <circle cx="12" cy="6" r="5" />
                <path d="M8 22V13a4 4 0 0 1 8 0v9h-3v-6h-2v6z" />
            </svg>
        );
    }
    return (
        <div style={styles.page}>
            {/* ── Left brand panel ── */}
            <div style={styles.brandPanel} className="login-brand-panel">
                <div style={styles.brandTop}>
                    <img src={myLogo} alt="Technerds" style={styles.brandLogo} />
                </div>

                <div style={styles.brandMid}>
                    <h1 style={styles.brandHeadline}>
                        Where client feedback
                        <br />
                        becomes better work.
                    </h1>
                    <p style={styles.brandSub}>
                        Collect it, track it by project, and act on it — so quality keeps improving with every round.
                    </p>
                </div>

                {/* Signature element — stacked review cards */}
                <div style={styles.cardStack} className="login-card-stack">
                    {SAMPLE_CARDS.map((c, i) => (
                        <div
                            key={c.name}
                            style={{
                                ...styles.miniCard,
                                animationDelay: `${i * 0.12 + 0.15}s`,
                            }}
                        >
                            <div style={{
                                ...styles.miniAvatar,
                                // background: c.gender === "Female" ? "#E64980" : "#3B5BDB",
                                fontSize: 16,
                            }}>
                                {c.gender === "Female" ? "👧" : "👦"}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={styles.miniName}>{c.name}</p>
                                <p style={styles.miniProject}>{c.project}</p>
                            </div>
                            <div style={styles.miniScore}>
                                {"★".repeat(c.score)}
                                <span style={styles.miniScoreEmpty}>
                                    {"★".repeat(5 - c.score)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Right form panel ── */}
            <div style={styles.formPanel} className="login-form-panel">
                {/* Mobile-only compact logo header */}
                <div style={styles.mobileLogoWrap} className="login-mobile-logo">
                    <img src={myLogo} alt="Technerds" style={styles.mobileLogo} />
                </div>

                <form onSubmit={handleSubmit} style={styles.formCard}>
                    <p style={styles.eyebrow}>Welcome back</p>
                    <h2 style={styles.formTitle}>Sign in to continue</h2>

                    <div style={styles.field}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            style={styles.input}
                            autoFocus
                            autoComplete="username"
                        />
                    </div>

                    <div style={styles.field}>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                style={{ ...styles.input, paddingRight: 44 }}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                style={styles.eyeBtn}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && <div style={styles.errorBox}>{error}</div>}

                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>
            </div>

            <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }

        .login-mobile-logo { display: none; }

        /* Tablet: shrink brand panel, keep side-by-side */
        @media (max-width: 1024px) {
          .login-brand-panel { padding: 36px 40px !important; }
        }

        /* Mobile: stack vertically, hide brand panel, show compact logo */
        @media (max-width: 760px) {
          .login-page-grid { 
            display: flex !important; 
            flex-direction: column !important; 
          }
          .login-brand-panel { display: none !important; }
          .login-mobile-logo { 
            display: flex !important; 
            justify-content: center;
            padding: 32px 0 8px;
          }
          .login-form-panel { 
            padding: 16px 20px 40px !important; 
            min-height: 100vh;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 380px) {
          .login-form-panel { padding: 12px 16px 32px !important; }
        }

        input:focus { outline: none; border-color: #3B5BDB !important; }
      `}</style>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 460px)",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },

    /* Brand panel */
    brandPanel: {
        background: C.line,
        backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.07), transparent 45%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
    },
    brandTop: {
        display: "flex",
        alignItems: "center",
    },
    brandLogo: {
        height: 28,
        objectFit: "contain",
        // filter: "brightness(0) invert(1)",
    },
    brandMid: {
        maxWidth: 440,
    },
    brandHeadline: {
        fontSize: 40,
        lineHeight: 1.15,
        fontWeight: 600,
        margin: "0 0 16px",
        letterSpacing: "-0.02em",
        textAlign: "center",
        color: "#121212"
    },
    brandSub: {
        fontSize: 15,
        lineHeight: 1.6,
        color: "#000000",
        margin: 0,
        textAlign: "center"
    },

    cardStack: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 360,
    },
    miniCard: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 12,
        padding: "10px 14px",
        backdropFilter: "blur(6px)",
        opacity: 0,
        animation: "cardIn 0.5s ease forwards",
    },
    miniAvatar: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: C.brand,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 600,
        flexShrink: 0,
    },
    miniName: {
        margin: 0,
        fontSize: 13,
        fontWeight: 600,
        color: "#000000",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left"
    },
    miniProject: {
        margin: 0,
        fontSize: 11,
        color: "#000000",
        textAlign: "left"
    },
    miniScore: {
        fontSize: 16,
        color: "#FFD166",
        letterSpacing: 1,
        flexShrink: 0,
    },
    miniScoreEmpty: {
        color: "rgba(255,255,255,0.25)",
    },

    /* Form panel */
    formPanel: {
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
    },
    formCard: {
        width: "100%",
        maxWidth: 340,
    },

    /* Mobile-only logo */
    mobileLogoWrap: {
        display: "none",
    },
    mobileLogo: {
        height: 26,
        objectFit: "contain",
    },

    eyebrow: {
        margin: "0 0 6px",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#0038B8",
    },
    formTitle: {
        margin: "0 0 32px",
        fontSize: 24,
        fontWeight: 600,
        color: "#1a2340",
        letterSpacing: "-0.01em",
    },
    field: {
        marginBottom: 18,
    },
    label: {
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: "#1a2340",
        marginBottom: 7,
    },
    input: {
        width: "100%",
        padding: "11px 14px",
        fontSize: 14,
        borderRadius: 10,
        border: "1.5px solid #e2e6f0",
        boxSizing: "border-box",
        color: "#1a2340",
        background: "#fff",
        transition: "border 0.15s",
    },
    eyeBtn: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        color: "#aab0c8",
        cursor: "pointer",
        padding: 4,
        display: "flex",
        alignItems: "center",
    },
    errorBox: {
        background: "#fdecec",
        border: "1px solid #f6c6c6",
        color: "#b3261e",
        fontSize: 13,
        padding: "10px 12px",
        borderRadius: 8,
        marginBottom: 18,
    },
    submitBtn: {
        width: "100%",
        padding: "12px",
        borderRadius: 10,
        border: "none",
        background: "#0038B8",
        color: "#fff",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        transition: "background 0.15s, opacity 0.15s",
    },
    footnote: {
        marginTop: 18,
        textAlign: "center",
        fontSize: 12.5,
        color: "#8b93ab",
    },
};