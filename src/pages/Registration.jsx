import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";
import {
  FiShield,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiCheckSquare,
  FiUsers,
  FiMapPin,
  FiLock as FiLockSolid,
} from "react-icons/fi";

import cm1 from "../assets/cm1.png";
import ek1 from "../assets/ek1.jfif";
import sunetra from "../assets/sunetra4.png";
import aaditi from "../assets/Aaditi1.jpg";
import meghana from "../assets/meghana.png";

import bgImage from "../assets/bg.webp";
import wcdLogo from "../assets/wcdlogo.jpg";
import shasanLogo from "../assets/maharashtrashasan.jfif";
import satyaLogo from "../assets/satya.png";

// ─── Theme tokens (identical to Login.jsx) ────────────────────────────────
const PINK = "#CD366B";
const PINK_DARK = "#b82a5c";
const BLUE = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const GOLD = "#E0B978";
const CREAM = "#FBF3EE";

const RED = "#CD366B";
const AMBER = "#e0b568";
const GREEN = "#4ade80";

// ─── Key officials (same as Login.jsx) ────────────────────────────────────
const officials = [
  { photo: cm1, name: "Devendra Fadnavis", role: "CM, Maharashtra" },
  { photo: ek1, name: "Eknath Shinde", role: "Dy. CM" },
  { photo: sunetra, name: "Sunetra Pawar", role: "Minister WCD" },
  { photo: aaditi, name: "Aditi Tatkare", role: "Dy. Minister" },
  { photo: meghana, name: "Meghana Bordikar", role: "Secretary" },
];

// ─── Password strength helper ──────────────────────────────────────────────
function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: RED };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score: 1, label: "Weak password", color: RED };
  if (score <= 2) return { score: 2, label: "Fair password", color: AMBER };
  if (score === 3) return { score: 3, label: "Good password", color: AMBER };
  return { score: 4, label: "Strong password", color: GREEN };
}

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const strength = getPasswordStrength(form.password);
  const mobileValid = /^[0-9]{10}$/.test(form.mobileNumber);
  const mobileError = touched.mobileNumber && form.mobileNumber && !mobileValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "mobileNumber" ? value.replace(/\D/g, "").slice(0, 10) : value,
    });
  };

  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const isFormValid =
    form.fullName.trim() &&
    form.userName.trim() &&
    form.email.trim() &&
    mobileValid &&
    form.password;

  const handleRegister = async (e) => {
    e.preventDefault();
    setTouched({ fullName: true, userName: true, email: true, mobileNumber: true, password: true });
    if (!form.fullName.trim()) { toast.error("Please enter your full name"); return; }
    if (!form.userName.trim()) { toast.error("Please choose a username"); return; }
    if (!form.email.trim()) { toast.error("Please enter your email"); return; }
    if (!mobileValid) { toast.error("Enter a valid 10-digit mobile number"); return; }
    if (!form.password) { toast.error("Please enter a password"); return; }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/super-admin/add", {
        fullName: form.fullName.trim(),
        userName: form.userName.trim(),
        email: form.email.trim(),
        mobileNo: form.mobileNumber,
        password: form.password,
      });
      const data = res.data;
      if (!data.success) { toast.error(data.message || "Registration failed"); return; }
      if (data.user) {
        dispatch(loginSuccess(data.user));
        localStorage.setItem("authUser", JSON.stringify(data.user));
      }
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tiro+Devanagari+Marathi&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── Page — identical structure to Login ── */
        .wr-page {
          min-height: 100vh; width: 100%;
          background-color: ${CREAM};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex; flex-direction: column;
          position: relative;
        }
        .wr-page::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.025;
          z-index: 0;
          pointer-events: none;
        }
        .wr-page > * { position: relative; z-index: 1; }

        /* ── Topbar ── */
        .wr-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px;
          background: #fff;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .wr-topbar-left { display: flex; align-items: center; gap: 10px; }
        .wr-topbar-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center;
          color: ${PINK}; flex-shrink: 0;
        }
        .wr-topbar-title { font-size: 15px; font-weight: 700; color: ${BLUE_DEEP}; }
        .wr-topbar-dot-sep { color: rgba(44,61,131,0.25); margin: 0 4px; }
        .wr-topbar-sub { font-size: 14px; font-weight: 500; color: rgba(44,61,131,0.55); }
        .wr-topbar-right { display: flex; align-items: center; gap: 18px; font-size: 13.5px; }
        .wr-status-pill { display: flex; align-items: center; gap: 6px; color: ${PINK}; font-weight: 600; }
        .wr-status-dot {
          width: 7px; height: 7px; border-radius: 50%; background: ${PINK};
          box-shadow: 0 0 8px rgba(205,54,107,0.6); animation: wrPulse 2s infinite;
        }
        @keyframes wrPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .wr-topbar-sep { width: 1px; height: 14px; background: rgba(44,61,131,0.15); }
        .wr-topbar-link { color: rgba(44,61,131,0.6); text-decoration: none; font-weight: 500; cursor: pointer; }
        .wr-topbar-link:hover { color: ${BLUE}; }

        /* ── Main area ── */
        .wr-main {
          flex: 1;
          display: flex; align-items: flex-start; justify-content: center;
          gap: 32px; padding: 56px 40px; flex-wrap: wrap;
        }

        /* ── LEFT: Registration card ── */
        .wr-card {
          width: 100%; max-width: 460px;
          background: #fff;
          border-radius: 20px;
          border-top: 4px solid ${PINK};
          box-shadow: 0 18px 50px rgba(44,61,131,0.08);
          padding: 34px 38px 30px;
          animation: wrIn .45s cubic-bezier(.22,.9,.36,1) both;
        }
        @keyframes wrIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wr-brand-row {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 20px; margin-bottom: 22px;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .wr-brand { display: flex; align-items: center; gap: 13px; }
        .wr-brand-icon {
          width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center;
          color: ${PINK}; overflow: hidden;
        }
        .wr-brand-icon img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
        .wr-brand-title { color: ${BLUE_DEEP}; font-size: 18px; font-weight: 800; line-height: 1.2; }
        .wr-brand-sub { color: ${PINK}; font-size: 12.5px; font-weight: 600; margin-top: 2px; }
        .wr-version-pill {
          font-size: 11.5px; font-weight: 700; color: ${PINK};
          background: rgba(205,54,107,0.08);
          padding: 5px 12px; border-radius: 999px; flex-shrink: 0;
        }

        .wr-heading { color: ${BLUE_DEEP}; font-size: 27px; font-weight: 800; letter-spacing: -0.4px; margin-bottom: 6px; }
        .wr-subheading { color: rgba(44,61,131,0.55); font-size: 14px; margin-bottom: 22px; }

        /* ── Form fields ── */
        .wr-fld { margin-bottom: 16px; }
        .wr-flbl {
          display: block; font-size: 11.5px; font-weight: 700;
          color: rgba(44,61,131,0.55); margin-bottom: 9px;
          letter-spacing: 0.8px; text-transform: uppercase;
        }
        .wr-fwrap { position: relative; display: flex; align-items: stretch; }
        .wr-ficon-box {
          width: 44px; flex-shrink: 0;
          background: rgba(44,61,131,0.05);
          border: 1px solid rgba(44,61,131,0.12); border-right: none;
          border-radius: 12px 0 0 12px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(44,61,131,0.45); transition: all .2s;
        }
        .wr-finput {
          width: 100%; padding: 13px 16px;
          border: 1px solid rgba(44,61,131,0.12); border-left: none;
          border-radius: 0 12px 12px 0;
          font-size: 14.5px; color: ${BLUE_DEEP};
          background: #fff;
          outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .wr-finput:focus {
          border-color: ${PINK};
          box-shadow: 0 0 0 3px rgba(205,54,107,0.12);
        }
        .wr-finput::placeholder { color: rgba(44,61,131,0.32); }
        .wr-fwrap:focus-within .wr-ficon-box { border-color: ${PINK}; color: ${PINK}; }
        .wr-finput.error { border-color: ${PINK}; background: rgba(205,54,107,0.04); }

        .wr-pbtn {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(44,61,131,0.4); padding: 0; display: flex; align-items: center;
          transition: color .2s;
        }
        .wr-pbtn:hover { color: ${BLUE}; }

        .wr-error-msg {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: ${PINK}; margin-top: 7px; font-weight: 600;
        }

        /* Password strength */
        .wr-strength-bars { display: flex; gap: 5px; margin-top: 10px; }
        .wr-strength-bar {
          flex: 1; height: 4px; border-radius: 4px;
          background: rgba(44,61,131,0.10); transition: background 0.25s;
        }
        .wr-strength-bar.filled { background: var(--bar-color); }
        .wr-strength-label { font-size: 12px; font-weight: 700; margin-top: 7px; }

        /* Submit button */
        .wr-sbtn {
          width: 100%; padding: 15px; border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
          box-shadow: 0 10px 26px rgba(205,54,107,0.32);
          margin-top: 8px;
        }
        .wr-sbtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
        .wr-sbtn:disabled { opacity: 0.5; cursor: not-allowed; }

        .wr-signin { text-align: center; font-size: 13.5px; color: rgba(44,61,131,0.55); margin-top: 20px; }
        .wr-signin a {
          color: ${PINK}; font-weight: 700; text-decoration: none; margin-left: 5px;
          background: none; border: none; font-size: 13.5px; cursor: pointer;
        }
        .wr-signin a:hover { text-decoration: underline; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .25s ease both; }

        /* ── RIGHT: Info column (identical to Login) ── */
        .wr-info-col { width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 14px; }

        .wr-info-card {
          background: linear-gradient(165deg, ${BLUE} 0%, ${BLUE_DEEP} 100%);
          border-radius: 20px; padding: 30px 26px 26px;
          text-align: center;
          box-shadow: 0 18px 50px rgba(29,42,96,0.30);
          animation: wrIn .45s cubic-bezier(.22,.9,.36,1) .08s both;
        }

        .wr-badge-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 20px; }
        .wr-brand-icon-panel {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          background: rgba(255,255,255,0.95);
          display: flex; align-items: center; justify-content: center;
          padding: 6px; overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.3);
        }
        .wr-brand-icon-panel img { width: 100%; height: 100%; object-fit: contain; border-radius: 6px; }

        .wr-info-title { color: #fff; font-size: 23px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
        .wr-info-sub { color: rgba(255,255,255,0.55); font-size: 13px; font-weight: 500; margin-bottom: 18px; }

        .wr-portal-pill {
          display: inline-flex; align-items: center; gap: 7px;
          color: #fff; font-size: 12px; font-weight: 800;
          letter-spacing: 0.6px; text-transform: uppercase;
          background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
          padding: 9px 20px; border-radius: 999px;
          box-shadow: 0 8px 20px rgba(205,54,107,0.45);
          margin-bottom: 20px;
        }

        .wr-info-desc { color: rgba(255,255,255,0.55); font-size: 12.5px; line-height: 1.55; margin-bottom: 22px; }

        .wr-stats { display: flex; gap: 9px; margin-bottom: 4px; }
        .wr-stat {
          flex: 1;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px; padding: 14px 8px;
        }
        .wr-stat-icon {
          width: 30px; height: 30px; border-radius: 9px; margin: 0 auto 8px;
          background: rgba(205,54,107,0.22);
          display: flex; align-items: center; justify-content: center;
          color: ${PINK};
        }
        .wr-stat-num { color: #fff; font-size: 19px; font-weight: 800; }
        .wr-stat-label { color: rgba(255,255,255,0.5); font-size: 10.5px; margin-top: 2px; }

        /* Officials card */
        .wr-officials-card {
          background: #fff; border-radius: 18px;
          padding: 24px 22px 22px;
          box-shadow: 0 12px 34px rgba(44,61,131,0.08);
          animation: wrIn .45s cubic-bezier(.22,.9,.36,1) .14s both;
        }
        .wr-officials-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .wr-officials-label {
          font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
          color: rgba(44,61,131,0.45);
        }
        .wr-officials-tag { font-size: 12px; font-weight: 700; color: ${PINK}; }

        .wr-officials-row { display: flex; gap: 6px; justify-content: space-between; }
        .wr-official { display: flex; flex-direction: column; align-items: center; width: 72px; flex-shrink: 0; }
        .wr-official-photo-wrap { position: relative; margin-bottom: 10px; }
        .wr-official-photo {
          width: 68px; height: 68px; border-radius: 50%; object-fit: cover;
          object-position: top center; border: 2.5px solid rgba(44,61,131,0.12); display: block;
        }
        .wr-official-online {
          position: absolute; bottom: 2px; right: 2px;
          width: 13px; height: 13px; border-radius: 50%;
          background: ${PINK}; border: 2px solid #fff;
        }
        .wr-official-name { font-size: 10.5px; font-weight: 700; color: ${BLUE_DEEP}; text-align: center; line-height: 1.3; }
        .wr-official-role { font-size: 9px; font-weight: 600; color: rgba(44,61,131,0.45); text-align: center; line-height: 1.25; margin-top: 2px; }

        .wr-secure-note {
          display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; color: rgba(44,61,131,0.45); font-weight: 500;
          padding-top: 16px; margin-top: 16px;
          border-top: 1px solid rgba(44,61,131,0.08);
        }

        /* ── Footer ── */
        .wr-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px;
          border-top: 1px solid rgba(44,61,131,0.08);
          font-size: 12.5px; color: rgba(44,61,131,0.45);
        }
        .wr-footer-links { display: flex; gap: 20px; }
        .wr-footer-links a { color: rgba(44,61,131,0.45); text-decoration: none; }
        .wr-footer-links a:hover { color: ${BLUE}; }

        @media (max-width: 900px) {
          .wr-main { flex-direction: column; align-items: center; padding: 32px 20px; }
          .wr-topbar { flex-direction: column; gap: 10px; align-items: flex-start; padding: 16px 20px; }
          .wr-footer { flex-direction: column; gap: 10px; text-align: center; padding: 16px 20px; }
        }
      `}</style>

      <div className="wr-page">
        {/* ── Topbar ── */}
        <header className="wr-topbar">
          <div className="wr-topbar-left">
            <div className="wr-topbar-icon"><FiShield size={16} /></div>
            <span className="wr-topbar-title">Government of Maharashtra</span>
            <span className="wr-topbar-dot-sep">·</span>
            <span className="wr-topbar-sub">Women &amp; Child Development Department</span>
          </div>
          <div className="wr-topbar-right">
            <span className="wr-status-pill"><span className="wr-status-dot" /> System Online</span>
            <span className="wr-topbar-sep" />
            <span className="wr-topbar-link">Help</span>
            <span className="wr-topbar-link">Contact</span>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="wr-main">
          {/* ── LEFT: Registration card ── */}
          <div className="wr-card">
            <div className="wr-brand-row">
              <div className="wr-brand">
                <div className="wr-brand-icon">
                  <img src={wcdLogo} alt="WCD Logo" />
                </div>
                <div>
                  <div className="wr-brand-title">WCD Admin</div>
                  <div className="wr-brand-sub">Inspection Portal</div>
                </div>
              </div>
              <span className="wr-version-pill">v2.0</span>
            </div>

            <h1 className="wr-heading">Create Account</h1>
            <p className="wr-subheading">Register as a new super administrator</p>

            <form className="fade-up" onSubmit={handleRegister}>
              {/* Full Name */}
              <div className="wr-fld">
                <label className="wr-flbl">Full Name</label>
                <div className="wr-fwrap">
                  <span className="wr-ficon-box"><FiUser size={16} /></span>
                  <input
                    className="wr-finput"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="wr-fld">
                <label className="wr-flbl">Username</label>
                <div className="wr-fwrap">
                  <span className="wr-ficon-box"><FiUser size={16} /></span>
                  <input
                    className="wr-finput"
                    type="text"
                    name="userName"
                    placeholder="Choose a username"
                    value={form.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="wr-fld">
                <label className="wr-flbl">Email Address</label>
                <div className="wr-fwrap">
                  <span className="wr-ficon-box"><FiMail size={16} /></span>
                  <input
                    className="wr-finput"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="wr-fld">
                <label className="wr-flbl">Mobile Number</label>
                <div className="wr-fwrap">
                  <span className="wr-ficon-box"><FiPhone size={16} /></span>
                  <input
                    className={`wr-finput${mobileError ? " error" : ""}`}
                    type="tel"
                    name="mobileNumber"
                    placeholder="9999 999 991"
                    maxLength={10}
                    value={form.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {mobileError && (
                  <div className="wr-error-msg">
                    <FiAlertCircle size={13} /> Enter a valid 10-digit mobile number
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="wr-fld">
                <label className="wr-flbl">Password</label>
                <div className="wr-fwrap">
                  <span className="wr-ficon-box"><FiLock size={16} /></span>
                  <input
                    className="wr-finput"
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                    style={{ paddingRight: 44 }}
                  />
                  <button type="button" className="wr-pbtn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                    {showPass ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
                {form.password && (
                  <>
                    <div className="wr-strength-bars">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`wr-strength-bar${i <= strength.score ? " filled" : ""}`}
                          style={{ "--bar-color": strength.color }}
                        />
                      ))}
                    </div>
                    <div className="wr-strength-label" style={{ color: strength.color }}>
                      {strength.label}
                    </div>
                  </>
                )}
              </div>

              <button type="submit" className="wr-sbtn" disabled={!isFormValid || loading}>
                {loading ? "Creating..." : "Create Account"}
                {!loading && <FiArrowRight size={17} />}
              </button>
            </form>

            <p className="wr-signin">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>

          {/* ── RIGHT: Info column (identical to Login) ── */}
          <div className="wr-info-col">
            <div className="wr-info-card">
              <div className="wr-badge-row">
                <div className="wr-brand-icon-panel">
                  <img src={wcdLogo} alt="WCD Logo" />
                </div>
                <div className="wr-brand-icon-panel">
                  <img src={shasanLogo} alt="Maharashtra Shasan" />
                </div>
              </div>

              <h2 className="wr-info-title">WCD Inspection</h2>
              <p className="wr-info-sub">Maharashtra State</p>

              <div className="wr-portal-pill">
                <FiShield size={13} /> ADMIN PORTAL
              </div>

              <p className="wr-info-desc">
                Women &amp; Child Development —<br />
                Unified Inspection Management System
              </p>

              <div className="wr-stats">
                <div className="wr-stat">
                  <div className="wr-stat-icon"><FiCheckSquare size={15} /></div>
                  <div className="wr-stat-num">1,284</div>
                  <div className="wr-stat-label">Inspections</div>
                </div>
                <div className="wr-stat">
                  <div className="wr-stat-icon"><FiUsers size={15} /></div>
                  <div className="wr-stat-num">86</div>
                  <div className="wr-stat-label">Officers</div>
                </div>
                <div className="wr-stat">
                  <div className="wr-stat-icon"><FiMapPin size={15} /></div>
                  <div className="wr-stat-num">34</div>
                  <div className="wr-stat-label">Districts</div>
                </div>
              </div>
            </div>

            {/* Officials card */}
            <div className="wr-officials-card">
              <div className="wr-officials-head">
                <span className="wr-officials-label">Key Officials</span>
                <span className="wr-officials-tag">Maharashtra</span>
              </div>
              <div className="wr-officials-row">
                {officials.map((o, i) => (
                  <div className="wr-official" key={i}>
                    <div className="wr-official-photo-wrap">
                      <img src={o.photo} alt={o.name} className="wr-official-photo" />
                      <span className="wr-official-online" />
                    </div>
                    <div className="wr-official-name">{o.name}</div>
                    <div className="wr-official-role">{o.role}</div>
                  </div>
                ))}
              </div>
              <div className="wr-secure-note">
                <FiLockSolid size={13} /> Secure Government Portal · 256-bit SSL Encrypted
              </div>
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="wr-footer">
          <span>© 2025 WCD Maharashtra. All rights reserved.</span>
          <div className="wr-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </footer>
      </div>
    </>
  );
}
