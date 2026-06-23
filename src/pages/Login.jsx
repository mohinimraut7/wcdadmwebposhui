import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";
import {
  FiShield,
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSend,
  FiCheckCircle,
  FiClock,
  FiPhone,
  FiLogIn,
  FiChevronDown,
  FiBriefcase,
  FiCheckSquare,
  FiUsers,
  FiMapPin,
  FiLock as FiLockSolid,
  FiAward,
  FiHexagon,
} from "react-icons/fi";
import cm1 from "../assets/cm1.png";
import ek1 from "../assets/ek1.jfif";
import sunetra from "../assets/sunetra4.png";
import aaditi from "../assets/Aaditi1.jpg";
import meghana from "../assets/meghana.png";

import bgImage from "../assets/bg.webp";
import infoPanelBg from "../assets/background2.jpg";
import wcdLogo from "../assets/wcdlogo.jpg";
import shasanLogo from "../assets/maharashtrashasan.jfif";
import satyaLogo from "../assets/satya.png";

// ─── Theme tokens ──────────────────────────────────────────────────────────
const PINK = "#CD366B";
const PINK_DARK = "#b82a5c";
const BLUE = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const GOLD = "#E0B978";
const CREAM = "#FBF3EE";

const ROLE_CONFIG = [
  { key: "superadmin",       label: "Super Admin",        api: "/super-admin/login" },
  { key: "districtadmin",    label: "District Admin",     api: "/district-admin/login" },
  { key: "inspectionofficer",label: "Inspection Officer", api: "/inspection-officer/login" },
];

// ─── Key officials shown in the right info panel ───────────────────────────
const officials = [
  { photo: cm1, name: "Devendra Fadnavis", role: "CM, Maharashtra" },
  { photo: ek1, name: "Eknath Shinde", role: "Dy. CM" },
  { photo: sunetra, name: "Sunetra Pawar", role: "Minister WCD" },
  { photo: aaditi, name: "Aditi Tatkare", role: "Dy. Minister" },
  { photo: meghana, name: "Meghana Bordikar", role: "Secretary" },
];

// ─── Role → Route mapping ──────────────────────────────────────────────────
const ROLE_ROUTES = {
  superadmin: "/dashboard",
  stateadmin: "/dashboard",
  districtadmin: "/dashboard",
  inspectionofficer: "/dashboard",
  admin: "/dashboard",
  user: "/dashboard",
};

const getRoleRoute = (role = "") => {
  const key = role.toLowerCase().replace(/\s+/g, "");
  return ROLE_ROUTES[key] || "/dashboard";
};

// ─── Build userPayload from any API response user object ─────────────────────
const buildUserPayload = (user) => ({
  id: user.id,
  fullName: user.fullName || user.fullname || "",
  userName: user.userName || user.username || "",
  role: user.role || "",
  departmentName: user.departmentName || user.departmentname || "",
  mobileNo: user.mobileNo || user.mobile || "",
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState("password"); // "password" | "otp"
  const [form, setForm] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // OTP states
  const [otpStep, setOtpStep] = useState("mobile"); // "mobile" | "otp"
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("superadmin");
  const otpRefs = useRef([]);

  // OTP countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const saveAndRedirect = (data) => {
    const userPayload = buildUserPayload(data.user);
    if (data.token) localStorage.setItem("token", data.token);
    dispatch(loginSuccess(userPayload));
    localStorage.setItem("authUser", JSON.stringify(userPayload));
    localStorage.setItem("userRole", userPayload.role);
    const route = getRoleRoute(userPayload.role);
    toast.success("Login successful");
    navigate(route);
  };

  // ══════════════════════════════════════════
  //  PASSWORD LOGIN — works for ALL roles
  //  Backend: POST /api/login (unified endpoint)
  // ══════════════════════════════════════════
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (!form.userName.trim()) {
  //     toast.error("Please enter your username");
  //     return;
  //   }
  //   if (!form.password) {
  //     toast.error("Please enter your password");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const res = await axiosInstance.post("/login", {
  //       username: form.userName.trim(),
  //       password: form.password,
  //     });
  //     const data = res.data;
  //     if (!data.success) {
  //       toast.error(data.message || "Login failed");
  //       return;
  //     }
  //     saveAndRedirect(data);
  //   } catch (error) {
  //     const msg = error?.response?.data?.message || "Server error. Is the backend running?";
  //     toast.error(msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleLogin = async (e) => {
  e.preventDefault();
  if (!form.userName.trim()) { toast.error("Please enter your username"); return; }
  if (!form.password) { toast.error("Please enter your password"); return; }

  // selected role ची API URL शोध
  const roleConf = ROLE_CONFIG.find((r) => r.key === selectedRole);
  const apiUrl = roleConf?.api || "/api/super-admin/login";

  try {
    setLoading(true);
    const res = await axiosInstance.post(apiUrl, {
      username: form.userName.trim(),
      password: form.password,
    });
    const data = res.data;
    if (!data.success) { toast.error(data.message || "Login failed"); return; }
    saveAndRedirect(data);
  } catch (error) {
    toast.error(error?.response?.data?.message || "Server error. Is the backend running?");
  } finally {
    setLoading(false);
  }
};

  // ══════════════════════════════════════════
  //  SEND OTP
  //  Backend: POST /api/sendOtp { mobileNo }
  // ══════════════════════════════════════════
  const sendOtp = async () => {
    const mobile = mobileNo.trim();
    if (!/^[0-9]{10}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await axiosInstance.post("/sendOtp", { mobileNo: mobile });
      const data = res.data;
      if (!data.success) {
        toast.error(data.message || "Could not send OTP");
        return;
      }
      setGeneratedOtp(data.otp);
      setTimeLeft(150);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      toast.success(`OTP sent to ******${mobile.slice(-3)}`);
      setOtpStep("otp");
      setTimeout(() => otpRefs.current[0]?.focus(), 120);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setOtpLoading(false);
    }
  };

  // ══════════════════════════════════════════
  //  VERIFY OTP & LOGIN
  //  Backend: POST /api/loginByMobile { mobileNo }
  // ══════════════════════════════════════════
  const verifyOtp = async () => {
    const entered = otp.join("");
    if (entered.length < 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    if (timeLeft <= 0) {
      toast.error("OTP expired. Please resend.");
      return;
    }
    if (entered !== generatedOtp) {
      toast.error("Incorrect OTP");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
      return;
    }
    try {
      setOtpLoading(true);
      const res = await axiosInstance.post("/loginByMobile", { mobileNo: mobileNo.trim() });
      const data = res.data;
      if (!data.success) {
        toast.error(data.message || "Mobile number not registered");
        return;
      }
      saveAndRedirect(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => {
      next[i] = ch;
    });
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const switchTab = (t) => {
    setTab(t);
    setOtpStep("mobile");
    setOtp(["", "", "", "", "", ""]);
    setMobileNo("");
    setTimeLeft(0);
  };

  const handleSsoLogin = () => {
    toast.info("Government SSO login coming soon");
  };

  return (
    <>
      {(loading || otpLoading) && <Loader />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tiro+Devanagari+Marathi&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── Page wrapper — bg image at 10% opacity via pseudo-element ── */
        .wl-page {
          min-height: 100vh; width: 100%;
          background-color: ${CREAM};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex; flex-direction: column;
          position: relative;
        }

        /* The background image sits BEHIND everything at 10% opacity */
        .wl-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.025;
          z-index: 0;
          pointer-events: none;
        }

        /* Ensure all direct children stack above the pseudo bg */
        .wl-page > * { position: relative; z-index: 1; }

        /* ── Top government header ── */
        .wl-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px;
          background: #fff;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .wl-topbar-left { display: flex; align-items: center; gap: 10px; }
        .wl-topbar-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center;
          color: ${PINK}; flex-shrink: 0;
        }
        .wl-topbar-title { font-size: 15px; font-weight: 700; color: ${BLUE_DEEP}; }
        .wl-topbar-dot-sep { color: rgba(44,61,131,0.25); margin: 0 4px; font-weight: 400; }
        .wl-topbar-sub { font-size: 14px; font-weight: 500; color: rgba(44,61,131,0.55); }
        .wl-topbar-right { display: flex; align-items: center; gap: 18px; font-size: 13.5px; }
        .wl-status-pill { display: flex; align-items: center; gap: 6px; color: ${PINK}; font-weight: 600; }
        .wl-status-dot {
          width: 7px; height: 7px; border-radius: 50%; background: ${PINK};
          box-shadow: 0 0 8px rgba(205,54,107,0.6); animation: wlPulse 2s infinite;
        }
        @keyframes wlPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .wl-topbar-sep { width: 1px; height: 14px; background: rgba(44,61,131,0.15); }
        .wl-topbar-link { color: rgba(44,61,131,0.6); text-decoration: none; font-weight: 500; cursor: pointer; }
        .wl-topbar-link:hover { color: ${BLUE}; }

        /* ── Main content area ── */
        .wl-main {
          flex: 1;
          display: flex; align-items: flex-start; justify-content: center;
          gap: 32px;
          padding: 56px 40px;
          flex-wrap: wrap;
        }

        /* ── LEFT: Login card ── */
        .wl-card {
          width: 100%; max-width: 460px;
          background: #fff;
          border-radius: 20px;
          border-top: 4px solid ${PINK};
          box-shadow: 0 18px 50px rgba(44,61,131,0.08);
          padding: 34px 38px 30px;
          animation: wlIn .45s cubic-bezier(.22,.9,.36,1) both;
        }
        @keyframes wlIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wl-brand-row {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 20px; margin-bottom: 22px;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .wl-brand { display: flex; align-items: center; gap: 13px; }
        .wl-brand-icon {
          width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center;
          color: ${PINK}; overflow: hidden;
        }
        .wl-brand-icon img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
        .wl-brand-title { color: ${BLUE_DEEP}; font-size: 18px; font-weight: 800; line-height: 1.2; }
        .wl-brand-sub { color: ${PINK}; font-size: 12.5px; font-weight: 600; margin-top: 2px; }
        .wl-version-pill {
          font-size: 11.5px; font-weight: 700; color: ${PINK};
          background: rgba(205,54,107,0.08);
          padding: 5px 12px; border-radius: 999px; flex-shrink: 0;
        }

        .wl-heading { color: ${BLUE_DEEP}; font-size: 27px; font-weight: 800; letter-spacing: -0.4px; margin-bottom: 6px; }
        .wl-subheading { color: rgba(44,61,131,0.55); font-size: 14px; margin-bottom: 22px; }

        .wl-tabs {
          display: flex; gap: 6px; margin-bottom: 24px;
          background: rgba(44,61,131,0.06); border-radius: 12px; padding: 4px;
        }
        .wl-tab {
          flex: 1; padding: 11px 0; border: none; border-radius: 9px;
          font-size: 13.5px; font-weight: 700; font-family: 'Inter', sans-serif;
          cursor: pointer; transition: all .2s;
          color: rgba(44,61,131,0.55); background: transparent;
          display: flex; align-items: center; justify-content: center; gap: 7px;
        }
        .wl-tab.active {
          background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
          color: #fff;
          box-shadow: 0 6px 16px rgba(205,54,107,0.30);
        }
        .wl-tab:not(.active):hover { color: ${BLUE}; }

        .wl-fld { margin-bottom: 18px; }
        .wl-flbl {
          display: block; font-size: 11.5px; font-weight: 700;
          color: rgba(44,61,131,0.55); margin-bottom: 9px;
          letter-spacing: 0.8px; text-transform: uppercase;
        }
        .wl-fwrap { position: relative; display: flex; align-items: stretch; }
        .wl-ficon-box {
          width: 44px; flex-shrink: 0;
          background: rgba(44,61,131,0.05);
          border: 1px solid rgba(44,61,131,0.12); border-right: none;
          border-radius: 12px 0 0 12px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(44,61,131,0.45);
        }
        .wl-finput {
          width: 100%; padding: 13px 16px;
          border: 1px solid rgba(44,61,131,0.12); border-left: none;
          border-radius: 0 12px 12px 0;
          font-size: 14.5px; color: ${BLUE_DEEP};
          background: #fff;
          outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .wl-finput:focus {
          border-color: ${PINK};
          box-shadow: 0 0 0 3px rgba(205,54,107,0.12);
        }
        .wl-finput::placeholder { color: rgba(44,61,131,0.32); }
        .wl-fwrap:focus-within .wl-ficon-box { border-color: ${PINK}; color: ${PINK}; }
        .wl-pbtn {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(44,61,131,0.4); padding: 0; display: flex; align-items: center;
          transition: color .2s;
        }
        .wl-pbtn:hover { color: ${BLUE}; }

        .wl-country {
          display: flex; align-items: center; gap: 6px;
          padding: 13px 14px; border-radius: 12px 0 0 12px;
          background: rgba(44,61,131,0.05); border: 1px solid rgba(44,61,131,0.12); border-right: none;
          color: ${BLUE_DEEP}; font-weight: 700; font-size: 13.5px; flex-shrink: 0; white-space: nowrap;
        }

        .wl-meta-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .wl-remember { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: rgba(44,61,131,0.65); cursor: pointer; user-select: none; }
        .wl-remember-box {
          width: 16px; height: 16px; border-radius: 50%;
          border: 1.5px solid rgba(44,61,131,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .15s;
        }
        .wl-remember-box.checked { background: ${PINK}; border-color: ${PINK}; }
        .wl-remember-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; }
        .wl-forgot {
          font-size: 13.5px; color: ${PINK}; text-decoration: none; font-weight: 600;
          background: none; border: none; cursor: pointer;
        }
        .wl-forgot:hover { text-decoration: underline; }

        .wl-sbtn {
          width: 100%; padding: 15px; border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
          box-shadow: 0 10px 26px rgba(205,54,107,0.32);
        }
        .wl-sbtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
        .wl-sbtn:disabled { opacity: 0.5; cursor: not-allowed; }
        .wl-sbtn.outline {
          background: transparent; border: 1.5px solid ${GOLD}; color: #9A6B23;
          box-shadow: none;
        }
        .wl-sbtn.outline:hover:not(:disabled) {
          background: rgba(224,185,120,0.12); transform: translateY(-2px); box-shadow: none;
        }

        .wl-or { display: flex; align-items: center; gap: 12px; margin: 22px 0 18px; }
        .wl-orl { flex: 1; height: 1px; background: rgba(44,61,131,0.10); }
        .wl-or span { font-size: 10.5px; color: rgba(44,61,131,0.4); letter-spacing: 1px; text-transform: uppercase; font-weight: 700; }

        .wl-sso-btn {
          width: 100%; padding: 14px; border-radius: 12px;
          border: 1.5px solid rgba(44,61,131,0.15);
          background: #fff; color: ${BLUE_DEEP};
          font-size: 14px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          transition: all .2s; font-family: 'Inter', sans-serif;
        }
        .wl-sso-btn:hover { background: rgba(44,61,131,0.04); border-color: rgba(44,61,131,0.28); }

        .wl-signup { text-align: center; font-size: 13.5px; color: rgba(44,61,131,0.55); margin-top: 20px; }
        .wl-signup a, .wl-signup button {
          color: ${PINK}; font-weight: 700; text-decoration: none; margin-left: 5px;
          background: none; border: none; font-size: 13.5px; cursor: pointer; font-family: inherit;
        }
        .wl-signup a:hover, .wl-signup button:hover { text-decoration: underline; }
        .wl-signup-sep { color: rgba(44,61,131,0.3); margin: 0 6px; }

        .wl-otp-label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 9px; }
        .wl-otp-sent { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #1a9c5c; font-weight: 600; }

        .wl-otp-row { display: flex; gap: 9px; margin-bottom: 18px; }
        .wl-otp-box {
          width: 100%; aspect-ratio: 1; max-width: 58px;
          border: 1.5px solid rgba(44,61,131,0.15); border-radius: 12px;
          font-size: 22px; font-weight: 800; text-align: center;
          color: ${BLUE_DEEP}; background: #fff;
          outline: none; transition: all .18s; font-family: 'Inter', sans-serif;
        }
        .wl-otp-box:focus {
          border-color: ${PINK};
          box-shadow: 0 0 0 3px rgba(205,54,107,0.14);
        }
        .wl-otp-box:not(:placeholder-shown) {
          border-color: ${PINK}; background: rgba(205,54,107,0.05);
        }

        .wl-otp-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 12.5px; }
        .wl-otp-timer { display: flex; align-items: center; gap: 6px; color: rgba(44,61,131,0.55); }
        .wl-otp-timer strong { color: ${BLUE_DEEP}; }
        .wl-resend { background: none; border: none; cursor: pointer; font-weight: 700; font-size: 12.5px; }
        .wl-resend:disabled { color: rgba(44,61,131,0.3); cursor: not-allowed; }
        .wl-resend:not(:disabled) { color: ${PINK}; }
        .wl-resend:not(:disabled):hover { text-decoration: underline; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .25s ease both; }

        /* ── RIGHT: Info panel ── */
        .wl-info-col { width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 14px; }

        .wl-info-card {
          background: linear-gradient(165deg, ${BLUE} 0%, ${BLUE_DEEP} 100%);
          border-radius: 20px;
          padding: 30px 26px 26px;
          text-align: center;
          box-shadow: 0 18px 50px rgba(29,42,96,0.30);
          animation: wlIn .45s cubic-bezier(.22,.9,.36,1) .08s both;
        }

        .wl-badge-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 20px; }
        .wl-badge {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.85);
        }
        .wl-badge span { font-size: 9px; font-weight: 700; margin-top: 2px; letter-spacing: 0.5px; }

        .wl-info-title { color: #fff; font-size: 23px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
        .wl-info-sub { color: rgba(255,255,255,0.55); font-size: 13px; font-weight: 500; margin-bottom: 18px; }

        .wl-portal-pill {
          display: inline-flex; align-items: center; gap: 7px;
          color: #fff; font-size: 12px; font-weight: 800;
          letter-spacing: 0.6px; text-transform: uppercase;
          background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
          padding: 9px 20px; border-radius: 999px;
          box-shadow: 0 8px 20px rgba(205,54,107,0.45);
          margin-bottom: 20px;
        }

        .wl-info-desc { color: rgba(255,255,255,0.55); font-size: 12.5px; line-height: 1.55; margin-bottom: 22px; }

        .wl-stats { display: flex; gap: 9px; margin-bottom: 4px; }
        .wl-stat {
          flex: 1;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px; padding: 14px 8px;
        }
        .wl-stat-icon {
          width: 30px; height: 30px; border-radius: 9px; margin: 0 auto 8px;
          background: rgba(205,54,107,0.22);
          display: flex; align-items: center; justify-content: center;
          color: ${PINK};
        }
        .wl-stat-num { color: #fff; font-size: 19px; font-weight: 800; }
        .wl-stat-label { color: rgba(255,255,255,0.5); font-size: 10.5px; margin-top: 2px; }

        /* Key officials card */
        .wl-officials-card {
          background: #fff; border-radius: 18px;
          padding: 24px 22px 22px;
          box-shadow: 0 12px 34px rgba(44,61,131,0.08);
          animation: wlIn .45s cubic-bezier(.22,.9,.36,1) .14s both;
        }
        .wl-officials-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .wl-officials-label {
          font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
          color: rgba(44,61,131,0.45);
        }
        .wl-officials-tag { font-size: 12px; font-weight: 700; color: ${PINK}; }

        .wl-officials-row { display: flex; gap: 6px; justify-content: space-between; }
        .wl-official { display: flex; flex-direction: column; align-items: center; width: 72px; flex-shrink: 0; }
        .wl-official-photo-wrap { position: relative; margin-bottom: 10px; }
        .wl-official-photo {
          width: 68px; height: 68px; border-radius: 50%; object-fit: cover;
          object-position: top center; border: 2.5px solid rgba(44,61,131,0.12); display: block;
        }
        .wl-official-online {
          position: absolute; bottom: 2px; right: 2px;
          width: 13px; height: 13px; border-radius: 50%;
          background: ${PINK}; border: 2px solid #fff;
        }
        .wl-official-name { font-size: 10.5px; font-weight: 700; color: ${BLUE_DEEP}; text-align: center; line-height: 1.3; }
        .wl-official-role { font-size: 9px; font-weight: 600; color: rgba(44,61,131,0.45); text-align: center; line-height: 1.25; margin-top: 2px; }

        .wl-secure-note {
          display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; color: rgba(44,61,131,0.45); font-weight: 500;
          padding-top: 16px; margin-top: 16px;
          border-top: 1px solid rgba(44,61,131,0.08);
        }

        /* ── Footer ── */
        .wl-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px;
          border-top: 1px solid rgba(44,61,131,0.08);
          font-size: 12.5px; color: rgba(44,61,131,0.45);
        }
        .wl-footer-links { display: flex; gap: 20px; }
        .wl-footer-links a { color: rgba(44,61,131,0.45); text-decoration: none; }
        .wl-footer-links a:hover { color: ${BLUE}; }

        @media (max-width: 900px) {
          .wl-main { flex-direction: column; align-items: center; padding: 32px 20px; }
          .wl-topbar { flex-direction: column; gap: 10px; align-items: flex-start; padding: 16px 20px; }
          .wl-footer { flex-direction: column; gap: 10px; text-align: center; padding: 16px 20px; }
        }
      `}</style>

      <div className="wl-page">
        {/* ── Top government header ── */}
        <header className="wl-topbar">
          <div className="wl-topbar-left">
            <div className="wl-topbar-icon"><FiShield size={16} /></div>
            <span className="wl-topbar-title">Government of Maharashtra</span>
            <span className="wl-topbar-dot-sep">·</span>
            <span className="wl-topbar-sub">Women &amp; Child Development Department</span>
          </div>
          <div className="wl-topbar-right">
            <span className="wl-status-pill"><span className="wl-status-dot" /> System Online</span>
            <span className="wl-topbar-sep" />
            <span className="wl-topbar-link">Help</span>
            <span className="wl-topbar-link">Contact</span>
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="wl-main">
          {/* ── LEFT: Login card ── */}
          <div className="wl-card">
            <div className="wl-brand-row">
              <div className="wl-brand">
                <div className="wl-brand-icon">
                  <img src={wcdLogo} alt="WCD Logo" />
                </div>
                <div>
                  <div className="wl-brand-title">WCD Admin</div>
                  <div className="wl-brand-sub">Inspection Portal</div>
                </div>
              </div>
              <span className="wl-version-pill">v2.0</span>
            </div>

            {tab === "password" ? (
              <>
                <h1 className="wl-heading">Welcome Back</h1>
                <p className="wl-subheading">Sign in to access your WCD admin dashboard</p>
              </>
            ) : (
              <>
                <h1 className="wl-heading">OTP Verification</h1>
                <p className="wl-subheading">Enter your mobile number to receive a one-time password</p>
              </>
            )}

            <div className="wl-tabs">
              <button
                className={`wl-tab ${tab === "password" ? "active" : ""}`}
                onClick={() => switchTab("password")}
              >
                <FiLock size={14} /> Password Login
              </button>
              <button className={`wl-tab ${tab === "otp" ? "active" : ""}`} onClick={() => switchTab("otp")}>
                <FiPhone size={14} /> OTP Login
              </button>
            </div>


{/* Role Selector */}
<div className="wl-fld">
  <label className="wl-flbl">Login As</label>
  <div className="wl-fwrap">
    <span className="wl-ficon-box"><FiShield size={16} /></span>
    <select
      className="wl-finput"
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
      style={{ cursor: "pointer" }}
    >
      {ROLE_CONFIG.map((r) => (
        <option key={r.key} value={r.key}>{r.label}</option>
      ))}
    </select>
  </div>
</div>


            {/* ════ PASSWORD TAB ════ */}
            {tab === "password" && (
              <div className="fade-up">
                <form onSubmit={handleLogin}>
                  <div className="wl-fld">
                    <label className="wl-flbl">Username</label>
                    <div className="wl-fwrap">
                      <span className="wl-ficon-box"><FiUser size={16} /></span>
                      <input
                        className="wl-finput"
                        name="userName"
                        placeholder="Enter your username"
                        value={form.userName}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  <div className="wl-fld">
                    <label className="wl-flbl">Password</label>
                    <div className="wl-fwrap">
                      <span className="wl-ficon-box"><FiLock size={16} /></span>
                      <input
                        className="wl-finput"
                        type={showPass ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        style={{ paddingRight: 44 }}
                      />
                      <button type="button" className="wl-pbtn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                        {showPass ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                      </button>
                    </div>
                  </div>

                  <div className="wl-meta-row">
                    <label className="wl-remember" onClick={() => setRememberMe(!rememberMe)}>
                      <span className={`wl-remember-box ${rememberMe ? "checked" : ""}`}>
                        {rememberMe && <span className="wl-remember-dot" />}
                      </span>
                      Remember me
                    </label>
                    <button type="button" className="wl-forgot" onClick={() => navigate("/forgot-password")}>
                      Forgot Password?
                    </button>
                  </div>

                  <button type="submit" className="wl-sbtn" disabled={loading}>
                    <FiLogIn size={17} />
                    {loading ? "Signing in..." : "Sign In to Dashboard"}
                  </button>
                </form>

                <div className="wl-or">
                  <div className="wl-orl" />
                  <span>or continue with</span>
                  <div className="wl-orl" />
                </div>

                <button type="button" className="wl-sso-btn" onClick={handleSsoLogin}>
                  <FiBriefcase size={16} />
                  Government SSO Login
                </button>

                <p className="wl-signup">
                  New officer? <Link to="/register">Create Account</Link>
                  <span className="wl-signup-sep">·</span>
                  Need help? <button type="button" onClick={() => toast.info("Contact support@wcd.gov.in")}>Support</button>
                </p>
              </div>
            )}

            {/* ════ OTP TAB ════ */}
            {tab === "otp" && (
              <div className="fade-up">
                {otpStep === "mobile" && (
                  <>
                    <div className="wl-fld">
                      <label className="wl-flbl">Mobile Number</label>
                      <div style={{ display: "flex" }}>
                        <div className="wl-country">
                          🇮🇳 +91 <FiChevronDown size={13} />
                        </div>
                        <input
                          className="wl-finput"
                          style={{ borderRadius: "0 12px 12px 0" }}
                          type="tel"
                          maxLength={10}
                          placeholder="9999 999 991"
                          value={mobileNo}
                          onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                        />
                      </div>
                    </div>

                    <button
                      className="wl-sbtn outline"
                      onClick={sendOtp}
                      disabled={mobileNo.length !== 10 || otpLoading}
                    >
                      <FiSend size={16} />
                      {otpLoading ? "Sending..." : "Send OTP"}
                    </button>

                    <div className="wl-or">
                      <div className="wl-orl" />
                      <span>or continue with</span>
                      <div className="wl-orl" />
                    </div>

                    <button type="button" className="wl-sso-btn" onClick={handleSsoLogin}>
                      <FiBriefcase size={16} />
                      Government SSO Login
                    </button>

                    <p className="wl-signup">
                      New officer? <Link to="/register">Create Account</Link>
                      <span className="wl-signup-sep">·</span>
                      Need help? <button type="button" onClick={() => toast.info("Contact support@wcd.gov.in")}>Support</button>
                    </p>
                  </>
                )}

                {otpStep === "otp" && (
                  <>
                    <div className="wl-otp-label-row">
                      <label className="wl-flbl" style={{ marginBottom: 0 }}>Enter OTP</label>
                      <span className="wl-otp-sent">
                        <FiCheckCircle size={13} /> OTP Sent
                      </span>
                    </div>

                    <div className="wl-otp-row" onPaste={handleOtpPaste}>
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpRefs.current[i] = el)}
                          className="wl-otp-box"
                          type="tel"
                          maxLength={1}
                          value={digit}
                          placeholder="·"
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        />
                      ))}
                    </div>

                    <div className="wl-otp-meta">
                      <div className="wl-otp-timer">
                        <FiClock size={14} />
                        {timeLeft > 0 ? (
                          <>Expires in <strong>{formatTime(timeLeft)}</strong></>
                        ) : (
                          <span style={{ color: "#ff6b6b" }}>OTP expired</span>
                        )}
                      </div>
                      <button className="wl-resend" onClick={sendOtp} disabled={!canResend}>
                        Resend OTP
                      </button>
                    </div>

                    <button
                      className="wl-sbtn"
                      onClick={verifyOtp}
                      disabled={otp.join("").length < 6 || otpLoading}
                    >
                      <FiCheckCircle size={17} />
                      {otpLoading ? "Verifying..." : "Verify & Login"}
                    </button>

                    <p className="wl-signup" style={{ marginTop: 18 }}>
                      New officer? <Link to="/register">Create Account</Link>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info column ── */}
          <div className="wl-info-col">
            <div className="wl-info-card">
              <div className="wl-badge-row">
                <div className="wl-brand-icon">
                  <img src={wcdLogo} alt="WCD Logo" />
                </div>
                <div className="wl-brand-icon">
                  <img src={shasanLogo} alt="Maharashtra Shasan" />
                </div>
              </div>

              <h2 className="wl-info-title">WCD Inspection</h2>
              <p className="wl-info-sub">Maharashtra State</p>

              <div className="wl-portal-pill">
                <FiShield size={13} /> ADMIN PORTAL
              </div>

              <p className="wl-info-desc">
                Women &amp; Child Development —<br />
                Unified Inspection Management System
              </p>

              <div className="wl-stats">
                <div className="wl-stat">
                  <div className="wl-stat-icon"><FiCheckSquare size={15} /></div>
                  <div className="wl-stat-num">1,284</div>
                  <div className="wl-stat-label">Inspections</div>
                </div>
                <div className="wl-stat">
                  <div className="wl-stat-icon"><FiUsers size={15} /></div>
                  <div className="wl-stat-num">86</div>
                  <div className="wl-stat-label">Officers</div>
                </div>
                <div className="wl-stat">
                  <div className="wl-stat-icon"><FiMapPin size={15} /></div>
                  <div className="wl-stat-num">34</div>
                  <div className="wl-stat-label">Districts</div>
                </div>
              </div>
            </div>

            <div className="wl-officials-card">
              <div className="wl-officials-head">
                <span className="wl-officials-label">Key Officials</span>
                <span className="wl-officials-tag">Maharashtra</span>
              </div>
              <div className="wl-officials-row">
                {officials.map((o, i) => (
                  <div className="wl-official" key={i}>
                    <div className="wl-official-photo-wrap">
                      <img src={o.photo} alt={o.name} className="wl-official-photo" />
                      <span className="wl-official-online" />
                    </div>
                    <div className="wl-official-name">{o.name}</div>
                    <div className="wl-official-role">{o.role}</div>
                  </div>
                ))}
              </div>
              <div className="wl-secure-note">
                <FiLockSolid size={13} /> Secure Government Portal · 256-bit SSL Encrypted
              </div>
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="wl-footer">
          <span>© 2025 WCD Maharashtra. All rights reserved.</span>
          <div className="wl-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </footer>
      </div>
    </>
  );
}