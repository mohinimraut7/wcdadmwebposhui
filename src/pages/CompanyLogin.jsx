import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import orgAxiosInstance from "../services/orgAxiosInstance";
import {
  FiShield, FiUser, FiLock, FiEye, FiEyeOff,
  FiLogIn, FiCheckSquare, FiMapPin, FiBriefcase,
  FiLock as FiLockSolid, FiPhone, FiHash,
} from "react-icons/fi";
import bgImage   from "../assets/bg.webp";
import wcdLogo   from "../assets/wcdlogo.jpg";
import shasanLogo from "../assets/maharashtrashasan.jfif";

const PINK      = "#CD366B";
const PINK_DARK = "#b82a5c";
const BLUE      = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const CREAM     = "#FBF3EE";

export default function CompanyLogin() {
  const navigate = useNavigate();

  // "password" | "otp"
  const [mode, setMode] = useState("password");

  // Username + Password state
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mobile + OTP state
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── POST /api/org/login-username ──
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!form.username.trim()) { toast.error("Username enter करा"); return; }
    if (!form.password)        { toast.error("Password enter करा"); return; }
    try {
      setLoading(true);
      const res  = await orgAxiosInstance.post("/login-username", {
        username: form.username.trim(),
        password: form.password,
      });
      const data = res.data;
      if (!data.success) { toast.error(data.message || "Login failed"); return; }

      if (data.token) localStorage.setItem("orgToken", data.token);
      if (data.org || data.organization)
        localStorage.setItem("companyUser", JSON.stringify(data.org || data.organization));

      toast.success("Login successful!");
      navigate("/posh-survey");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // ── POST /api/org/send-otp ──
  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(mobile)) { toast.error("वैध 10 अंकी मोबाईल नंबर टाका"); return; }
    try {
      setOtpLoading(true);
      const res  = await orgAxiosInstance.post("/send-otp", { concernmobile: mobile });
      const data = res.data;
      if (!data.success) { toast.error(data.message || "OTP पाठवता आला नाही"); return; }
      setOtpSent(true);
      toast.success("OTP पाठवला आहे");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── POST /api/org/verify-otp ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) { toast.error("OTP enter करा"); return; }
    try {
      setOtpLoading(true);
      const res  = await orgAxiosInstance.post("/verify-otp", {
        concernmobile: mobile,
        otp: otp.trim(),
      });
      const data = res.data;
      if (!data.success) { toast.error(data.message || "Login failed"); return; }

      if (data.token) localStorage.setItem("orgToken", data.token);
      if (data.org || data.organization)
        localStorage.setItem("companyUser", JSON.stringify(data.org || data.organization));

      toast.success("Login successful!");
      navigate("/posh-survey");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setOtpLoading(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setOtpSent(false);
    setOtp("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cl-page {
          min-height: 100vh; width: 100%;
          background-color: ${CREAM};
          font-family: 'Inter', sans-serif;
          display: flex; flex-direction: column;
          position: relative;
        }
        .cl-page::before {
          content: ''; position: fixed; inset: 0;
          background-image: url(${bgImage});
          background-size: cover; background-position: center;
          opacity: 0.025; z-index: 0; pointer-events: none;
        }
        .cl-page > * { position: relative; z-index: 1; }

        .cl-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px; background: #fff;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .cl-topbar-left { display: flex; align-items: center; gap: 10px; }
        .cl-topbar-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center; color: ${PINK};
        }
        .cl-topbar-title { font-size: 15px; font-weight: 700; color: ${BLUE_DEEP}; }
        .cl-topbar-dot   { color: rgba(44,61,131,0.25); margin: 0 4px; }
        .cl-topbar-sub   { font-size: 14px; font-weight: 500; color: rgba(44,61,131,0.55); }
        .cl-topbar-right { display: flex; align-items: center; gap: 14px; }
        .cl-status-pill  { display: flex; align-items: center; gap: 6px; color: ${PINK}; font-weight: 600; font-size: 13.5px; }
        .cl-status-dot   {
          width: 7px; height: 7px; border-radius: 50%; background: ${PINK};
          box-shadow: 0 0 8px rgba(205,54,107,0.6); animation: clPulse 2s infinite;
        }
        @keyframes clPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .cl-topbar-sep   { width: 1px; height: 14px; background: rgba(44,61,131,0.15); }
        .cl-topbar-link  { color: rgba(44,61,131,0.6); font-weight: 500; cursor: pointer; font-size: 13.5px; }

        .cl-main {
          flex: 1; display: flex; align-items: flex-start; justify-content: center;
          gap: 32px; padding: 56px 40px; flex-wrap: wrap;
        }

        .cl-card {
          width: 100%; max-width: 460px;
          background: #fff; border-radius: 20px;
          border-top: 4px solid ${PINK};
          box-shadow: 0 18px 50px rgba(44,61,131,0.08);
          padding: 34px 38px 30px;
          animation: clIn .45s cubic-bezier(.22,.9,.36,1) both;
        }
        @keyframes clIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        .cl-brand-row {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 20px; margin-bottom: 22px;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .cl-brand { display: flex; align-items: center; gap: 13px; }
        .cl-brand-icon {
          width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
          background: rgba(205,54,107,0.10); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .cl-brand-icon img { width:100%; height:100%; object-fit:cover; border-radius:14px; }
        .cl-brand-title { color: ${BLUE_DEEP}; font-size: 18px; font-weight: 800; }
        .cl-brand-sub   { color: ${PINK}; font-size: 12.5px; font-weight: 600; margin-top: 2px; }
        .cl-version-pill {
          font-size: 11.5px; font-weight: 700; color: ${PINK};
          background: rgba(205,54,107,0.08); padding: 5px 12px; border-radius: 999px;
        }

        .cl-heading    { color: ${BLUE_DEEP}; font-size: 27px; font-weight: 800; letter-spacing: -0.4px; margin-bottom: 6px; }
        .cl-subheading { color: rgba(44,61,131,0.55); font-size: 14px; margin-bottom: 22px; }

        /* Mode tabs */
        .cl-tabs {
          display: flex; align-items: center;
          margin-bottom: 22px;
          background: rgba(44,61,131,0.04);
          border-radius: 12px; padding: 4px; gap: 4px;
        }
        .cl-tab-btn {
          flex: 1; padding: 10px 0; border: none; border-radius: 9px;
          font-size: 13px; font-weight: 700; font-family: 'Inter', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          cursor: pointer; transition: all .2s;
          color: rgba(44,61,131,0.5); background: transparent;
        }
        .cl-tab-btn.active {
          background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
          color: #fff; box-shadow: 0 6px 16px rgba(205,54,107,0.28);
        }

        .cl-fld  { margin-bottom: 18px; }
        .cl-flbl {
          display: block; font-size: 11.5px; font-weight: 700;
          color: rgba(44,61,131,0.55); margin-bottom: 9px;
          letter-spacing: 0.8px; text-transform: uppercase;
        }
        .cl-fwrap { display: flex; align-items: stretch; position: relative; }
        .cl-ficon {
          width: 44px; flex-shrink: 0;
          background: rgba(44,61,131,0.05);
          border: 1px solid rgba(44,61,131,0.12); border-right: none;
          border-radius: 12px 0 0 12px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(44,61,131,0.45); transition: all .2s;
        }
        .cl-finput {
          width: 100%; padding: 13px 16px;
          border: 1px solid rgba(44,61,131,0.12); border-left: none;
          border-radius: 0 12px 12px 0;
          font-size: 14.5px; color: ${BLUE_DEEP}; background: #fff;
          outline: none; transition: all .2s; font-family: 'Inter', sans-serif;
        }
        .cl-finput:disabled { background: rgba(44,61,131,0.04); color: rgba(44,61,131,0.5); }
        .cl-finput:focus { border-color: ${PINK}; box-shadow: 0 0 0 3px rgba(205,54,107,0.12); }
        .cl-finput::placeholder { color: rgba(44,61,131,0.32); }
        .cl-fwrap:focus-within .cl-ficon { border-color: ${PINK}; color: ${PINK}; }
        .cl-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(44,61,131,0.4); display: flex; align-items: center;
        }

        .cl-otp-row { display: flex; gap: 10px; }
        .cl-otp-row .cl-fwrap { flex: 1; }
        .cl-otp-send-btn {
          flex-shrink: 0; padding: 0 18px; border: none; border-radius: 12px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          color: #fff; background: linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP});
          transition: all .2s; font-family: 'Inter', sans-serif;
        }
        .cl-otp-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .cl-otp-sent-note {
          font-size: 12px; color: ${PINK}; font-weight: 600; margin-top: 8px;
          display: flex; align-items: center; gap: 6px;
        }

        .cl-sbtn {
          width: 100%; padding: 15px; border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
          box-shadow: 0 10px 26px rgba(205,54,107,0.32);
          margin-top: 8px;
        }
        .cl-sbtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
        .cl-sbtn:disabled { opacity: 0.5; cursor: not-allowed; }

        .cl-links { text-align: center; font-size: 13.5px; color: rgba(44,61,131,0.55); margin-top: 20px; }
        .cl-links a { color: ${PINK}; font-weight: 700; text-decoration: none; margin-left: 5px; }
        .cl-links a:hover { text-decoration: underline; }
        .cl-links-sep { color: rgba(44,61,131,0.3); margin: 0 6px; }

        .cl-info-col { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 14px; }
        .cl-info-card {
          background: linear-gradient(165deg, ${BLUE} 0%, ${BLUE_DEEP} 100%);
          border-radius: 20px; padding: 30px 26px 26px; text-align: center;
          box-shadow: 0 18px 50px rgba(29,42,96,0.30);
          animation: clIn .45s cubic-bezier(.22,.9,.36,1) .08s both;
        }
        .cl-badge-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 20px; }
        .cl-logo-badge {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(255,255,255,0.95); padding: 6px; overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
        }
        .cl-logo-badge img { width:100%; height:100%; object-fit:contain; border-radius:6px; }
        .cl-info-title { color: #fff; font-size: 22px; font-weight: 800; margin-bottom: 4px; }
        .cl-info-sub   { color: rgba(255,255,255,0.55); font-size: 13px; margin-bottom: 16px; }
        .cl-portal-pill {
          display: inline-flex; align-items: center; gap: 7px;
          color: #fff; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px;
          background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
          padding: 8px 18px; border-radius: 999px;
          box-shadow: 0 8px 20px rgba(205,54,107,0.45); margin-bottom: 18px;
        }
        .cl-info-desc { color: rgba(255,255,255,0.55); font-size: 12.5px; line-height: 1.55; margin-bottom: 22px; }
        .cl-stats { display: flex; gap: 9px; }
        .cl-stat {
          flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px; padding: 14px 8px;
        }
        .cl-stat-icon {
          width: 28px; height: 28px; border-radius: 8px; margin: 0 auto 8px;
          background: rgba(205,54,107,0.22);
          display: flex; align-items: center; justify-content: center; color: ${PINK};
        }
        .cl-stat-num   { color: #fff; font-size: 18px; font-weight: 800; }
        .cl-stat-label { color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px; }

        .cl-flow-card {
          background: #fff; border-radius: 18px; padding: 22px 22px 20px;
          box-shadow: 0 12px 34px rgba(44,61,131,0.08);
          animation: clIn .45s cubic-bezier(.22,.9,.36,1) .14s both;
        }
        .cl-flow-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .cl-flow-label { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(44,61,131,0.45); }
        .cl-flow-tag   { font-size: 12px; font-weight: 700; color: ${PINK}; }
        .cl-flow-steps { display: flex; flex-direction: column; gap: 10px; }
        .cl-flow-step {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          border: 1px solid rgba(44,61,131,0.08); background: rgba(44,61,131,0.02);
        }
        .cl-flow-step.active {
          border-color: rgba(205,54,107,0.22); background: rgba(205,54,107,0.04);
        }
        .cl-flow-dot {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 800;
          background: rgba(44,61,131,0.08); color: rgba(44,61,131,0.45);
        }
        .cl-flow-step.active .cl-flow-dot { background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}); color: #fff; }
        .cl-flow-step.done .cl-flow-dot   { background: ${BLUE}; color: #fff; }
        .cl-flow-text { font-size: 12px; font-weight: 700; color: ${BLUE_DEEP}; }
        .cl-flow-desc { font-size: 10.5px; color: rgba(44,61,131,0.50); margin-top: 1px; }

        .cl-secure-note {
          display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; color: rgba(44,61,131,0.45); font-weight: 500;
          padding-top: 14px; margin-top: 14px;
          border-top: 1px solid rgba(44,61,131,0.08);
        }

        .cl-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px; border-top: 1px solid rgba(44,61,131,0.08);
          font-size: 12.5px; color: rgba(44,61,131,0.45);
        }
        .cl-footer-links { display: flex; gap: 20px; }
        .cl-footer-links a { color: rgba(44,61,131,0.45); text-decoration: none; }

        @media (max-width: 900px) {
          .cl-main { flex-direction: column; align-items: center; padding: 32px 20px; }
          .cl-topbar { flex-direction: column; gap: 10px; align-items: flex-start; padding: 14px 20px; }
          .cl-footer { flex-direction: column; gap: 8px; text-align: center; padding: 14px 20px; }
        }
      `}</style>

      <div className="cl-page">

        <header className="cl-topbar">
          <div className="cl-topbar-left">
            <div className="cl-topbar-icon"><FiShield size={16} /></div>
            <span className="cl-topbar-title">Government of Maharashtra</span>
            <span className="cl-topbar-dot">·</span>
            <span className="cl-topbar-sub">Women &amp; Child Development Department</span>
          </div>
          <div className="cl-topbar-right">
            <span className="cl-status-pill"><span className="cl-status-dot" /> System Online</span>
            <span className="cl-topbar-sep" />
            <span className="cl-topbar-link">Help</span>
            <span className="cl-topbar-link">Contact</span>
          </div>
        </header>

        <main className="cl-main">

          <div className="cl-card">
            <div className="cl-brand-row">
              <div className="cl-brand">
                <div className="cl-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
                <div>
                  <div className="cl-brand-title">WCD Portal</div>
                  <div className="cl-brand-sub">Company Login</div>
                </div>
              </div>
              <span className="cl-version-pill">v2.0</span>
            </div>

            <h1 className="cl-heading">Company Sign In</h1>
            <p className="cl-subheading">Login to access POSH Survey and compliance tools</p>

            {/* Mode tabs */}
            <div className="cl-tabs">
              <button
                type="button"
                className={`cl-tab-btn ${mode === "password" ? "active" : ""}`}
                onClick={() => switchMode("password")}
              >
                <FiUser size={14} /> Username &amp; Password
              </button>
              <button
                type="button"
                className={`cl-tab-btn ${mode === "otp" ? "active" : ""}`}
                onClick={() => switchMode("otp")}
              >
                <FiPhone size={14} /> Mobile OTP
              </button>
            </div>

            {/* ── USERNAME + PASSWORD ── */}
            {mode === "password" && (
              <form onSubmit={handlePasswordLogin}>
                <div className="cl-fld">
                  <label className="cl-flbl">Username</label>
                  <div className="cl-fwrap">
                    <span className="cl-ficon"><FiUser size={16} /></span>
                    <input
                      className="cl-finput"
                      type="text" name="username"
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={handleChange}
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="cl-fld">
                  <label className="cl-flbl">Password</label>
                  <div className="cl-fwrap">
                    <span className="cl-ficon"><FiLock size={16} /></span>
                    <input
                      className="cl-finput"
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      style={{ paddingRight: 44 }}
                    />
                    <button type="button" className="cl-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                      {showPass ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="cl-sbtn" disabled={loading}>
                  <FiLogIn size={17} />
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            )}

            {/* ── MOBILE + OTP ── */}
            {mode === "otp" && (
              <form onSubmit={handleVerifyOtp}>
                <div className="cl-fld">
                  <label className="cl-flbl">Mobile Number</label>
                  <div className="cl-otp-row">
                    <div className="cl-fwrap">
                      <span className="cl-ficon"><FiPhone size={16} /></span>
                      <input
                        className="cl-finput"
                        type="tel"
                        placeholder="10 digit mobile"
                        maxLength={10}
                        value={mobile}
                        disabled={otpSent}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      />
                    </div>
                    <button
                      type="button"
                      className="cl-otp-send-btn"
                      onClick={handleSendOtp}
                      disabled={otpLoading || otpSent}
                    >
                      {otpSent ? "Sent" : otpLoading ? "..." : "Send OTP"}
                    </button>
                  </div>
                  {otpSent && (
                    <div className="cl-otp-sent-note">
                      <FiCheckSquare size={13} /> OTP तुमच्या मोबाईलवर पाठवला आहे
                    </div>
                  )}
                </div>

                {otpSent && (
                  <div className="cl-fld">
                    <label className="cl-flbl">Enter OTP</label>
                    <div className="cl-fwrap">
                      <span className="cl-ficon"><FiHash size={16} /></span>
                      <input
                        className="cl-finput"
                        type="text"
                        placeholder="6 digit OTP"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="cl-sbtn" disabled={otpLoading || !otpSent}>
                  <FiLogIn size={17} />
                  {otpLoading ? "Verifying..." : "Verify & Sign In"}
                </button>
              </form>
            )}

            <p className="cl-links">
              New company?<Link to="/company-register">Register here</Link>
              <span className="cl-links-sep">·</span>
              Admin?<Link to="/login">Admin Login</Link>
            </p>
          </div>

          <div className="cl-info-col">
            <div className="cl-info-card">
              <div className="cl-badge-row">
                <div className="cl-logo-badge"><img src={wcdLogo} alt="WCD" /></div>
                <div className="cl-logo-badge"><img src={shasanLogo} alt="Shasan" /></div>
              </div>
              <h2 className="cl-info-title">Company Portal</h2>
              <p className="cl-info-sub">Maharashtra WCD</p>
              <div className="cl-portal-pill"><FiShield size={12} /> POSH COMPLIANCE</div>
              <p className="cl-info-desc">
                POSH Act 2013 Compliance —<br />
                Register, Survey &amp; Inspection Management
              </p>
              <div className="cl-stats">
                <div className="cl-stat">
                  <div className="cl-stat-icon"><FiCheckSquare size={13} /></div>
                  <div className="cl-stat-num">1,284</div>
                  <div className="cl-stat-label">Surveys</div>
                </div>
                <div className="cl-stat">
                  <div className="cl-stat-icon"><FiBriefcase size={13} /></div>
                  <div className="cl-stat-num">342</div>
                  <div className="cl-stat-label">Companies</div>
                </div>
                <div className="cl-stat">
                  <div className="cl-stat-icon"><FiMapPin size={13} /></div>
                  <div className="cl-stat-num">34</div>
                  <div className="cl-stat-label">Districts</div>
                </div>
              </div>
            </div>

            <div className="cl-flow-card">
              <div className="cl-flow-head">
                <span className="cl-flow-label">Company Flow</span>
                <span className="cl-flow-tag">4 Steps</span>
              </div>
              <div className="cl-flow-steps">
                {[
                  { label: "Register",         desc: "Company details & location",       done: true },
                  { label: "Login",            desc: "Username/password or mobile OTP",  active: true },
                  { label: "POSH Survey",      desc: "Complete compliance survey",       done: false },
                  { label: "Inspection",       desc: "Officer visit & report",           done: false },
                ].map((s, i) => (
                  <div key={i} className={`cl-flow-step${s.active ? " active" : s.done ? " done" : ""}`}>
                    <div className="cl-flow-dot">{s.done ? "✓" : i + 1}</div>
                    <div>
                      <div className="cl-flow-text">{s.label}</div>
                      <div className="cl-flow-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cl-secure-note">
                <FiLockSolid size={13} /> Secure Portal · 256-bit SSL Encrypted
              </div>
            </div>
          </div>
        </main>

        <footer className="cl-footer">
          <span>© 2025 WCD Maharashtra. All rights reserved.</span>
          <div className="cl-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
          </div>
        </footer>
      </div>
    </>
  );
}