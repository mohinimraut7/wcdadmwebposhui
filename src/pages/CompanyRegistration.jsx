

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import {
  FiShield,
  FiCheckSquare,
  FiUsers,
  FiMapPin,
  FiLock as FiLockSolid,
  FiBriefcase,
  FiHash,
  FiLayers,
  FiHome,
  FiGlobe,
  FiUser,
  FiPhone,
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
  FiLock,
} from "react-icons/fi";

import bgImage from "../assets/bg.webp";
import wcdLogo from "../assets/wcdlogo.jpg";
import shasanLogo from "../assets/maharashtrashasan.jfif";
import orgAxiosInstance from "../services/orgAxiosInstance";

const PINK = "#CD366B";
const PINK_DARK = "#b82a5c";
const BLUE = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const GOLD = "#E0B978";
const CREAM = "#FBF3EE";

const INDUSTRY_OPTIONS = [
  "Manufacturing", "IT / Software", "Healthcare", "Education",
  "Retail", "Construction", "Finance & Banking", "Hospitality", "Other",
];

const ORG_TYPE_OPTIONS = [
  "Private", "Government", "Semi-Government", "NGO", "Trust", "Other",
];

// 👇 हे नवीन add करा
// const ORG_TYPE_DB_MAP = {
//   "Private": "private",
//   "Government": "government",
//   "Semi-Government": "semi-government",
// };

const ORG_TYPE_DB_MAP = {
  "Private": "private",
  "Government": "government",
  "Semi-Government": "semi-government",
  "NGO": "ngo",
  "Trust": "trust",
  "Other": "other",
};

const PAGE_TITLES = [
  { title: "Company & Location", sub: "Basic company information and address" },
  { title: "Contact & POSH", sub: "Contact person and POSH compliance details" },
  { title: "Company Profile", sub: "Additional profile details (optional)" },
];

function Field({ label, icon, children }) {
  return (
    <div className="cr-fld">
      <label className="cr-flbl">{label}</label>
      <div className="cr-fwrap">
        <span className="cr-ficon-box">{icon}</span>
        {children}
      </div>
    </div>
  );
}

export default function CompanyRegistration() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orgToken, setOrgToken] = useState(localStorage.getItem("orgToken") || "");

  const [form, setForm] = useState({
    // Page 0
    orgtype: "",
    companyName: "",
    registrationNumber: "",
    regnoType: "",
    industryType: "",
    totalEmployees: "",
    address: "",
    city: "",
    district: "",
    taluka: "",
    pincode: "",
    // Page 1
    contactPersonName: "",
    username: "",   // 👈 नवीन
    contactPhone: "",
    email: "",
    password: "",
    poshPolicyAdopted: "",
    complaintMechanismInPlace: "",
    // Page 2
    website: "",
    gstNumber: "",
    panNumber: "",
    cinNumber: "",
    foundedYear: "",
    companyDescription: "",
    femaleEmployees: "",
  });

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleNext = () => {
    if (page === 0) { setPage(1); return; }
    if (page === 1) { setPage(2); return; }
    handleSubmit();
  };

  // ── POST /api/org/register — field names match OrganizationController ──
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        // orgtype:           form.orgtype || "Private",
        orgtype: ORG_TYPE_DB_MAP[form.orgtype] || "private",
        orgsector:         form.industryType,
        orgname:           form.companyName.trim(),
        orgaddress:        form.address.trim(),
        ruralurban:        "Urban",
        district:          form.district.trim(),
        taluka:            form.taluka.trim(),
        mahapalika:        "",
        ward:              "",
        pincode:           form.pincode.trim(),
        revenuedivision:   "",
        regnotype:         form.regnoType,
        regnovalue:        form.registrationNumber.trim(),
        concernname:       form.contactPersonName.trim(),
         username:          form.username.trim(),
        concernmobile:     form.contactPhone.trim(),
        concernemail:      form.email.trim(),
        password:          form.password,
      };

      const res  = await orgAxiosInstance.post("/register", payload);
      const data = res.data;

      if (!data.success) {
        toast.error(data.message || "Registration failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("orgToken", data.token);
        setOrgToken(data.token);
      }
      if (data.org || data.organization) {
        localStorage.setItem("companyUser", JSON.stringify(data.org || data.organization));
      }

      toast.success("Registration successful! Proceeding to POSH Survey...");
      navigate("/posh-survey");

    } catch (error) {
      const msg = error?.response?.data?.message || "Server error. Backend चालू आहे का?";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cr-page {
          min-height: 100vh; width: 100%;
          background-color: ${CREAM};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex; flex-direction: column;
          position: relative;
        }
        .cr-page::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url(${bgImage});
          background-size: cover; background-position: center; background-repeat: no-repeat;
          opacity: 0.025; z-index: 0; pointer-events: none;
        }
        .cr-page > * { position: relative; z-index: 1; }

        .cr-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px; background: #fff;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .cr-topbar-left { display: flex; align-items: center; gap: 10px; }
        .cr-topbar-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center;
          color: ${PINK}; flex-shrink: 0;
        }
        .cr-topbar-title { font-size: 15px; font-weight: 700; color: ${BLUE_DEEP}; }
        .cr-topbar-dot { color: rgba(44,61,131,0.25); margin: 0 4px; }
        .cr-topbar-sub { font-size: 14px; font-weight: 500; color: rgba(44,61,131,0.55); }
        .cr-topbar-right { display: flex; align-items: center; gap: 18px; font-size: 13.5px; }
        .cr-status-pill { display: flex; align-items: center; gap: 6px; color: ${PINK}; font-weight: 600; }
        .cr-status-dot {
          width: 7px; height: 7px; border-radius: 50%; background: ${PINK};
          box-shadow: 0 0 8px rgba(205,54,107,0.6); animation: crPulse 2s infinite;
        }
        @keyframes crPulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        .cr-topbar-sep { width: 1px; height: 14px; background: rgba(44,61,131,0.15); }
        .cr-topbar-link { color: rgba(44,61,131,0.6); font-weight: 500; cursor: pointer; }
        .cr-topbar-link:hover { color: ${BLUE}; }

        .cr-main {
          flex: 1; display: flex; align-items: flex-start; justify-content: center;
          gap: 32px; padding: 48px 40px; flex-wrap: wrap;
        }

        .cr-card {
          width: 100%; max-width: 520px;
          background: #fff; border-radius: 20px;
          border-top: 4px solid ${PINK};
          box-shadow: 0 18px 50px rgba(44,61,131,0.08);
          padding: 34px 38px 30px;
          animation: crIn .45s cubic-bezier(.22,.9,.36,1) both;
        }
        @keyframes crIn {
          from{opacity:0;transform:translateY(18px)}
          to{opacity:1;transform:translateY(0)}
        }

        .cr-brand-row {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 18px; margin-bottom: 20px;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .cr-brand { display: flex; align-items: center; gap: 13px; }
        .cr-brand-icon {
          width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
          background: rgba(205,54,107,0.10); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .cr-brand-icon img { width:100%; height:100%; object-fit:cover; border-radius:14px; }
        .cr-brand-title { color: ${BLUE_DEEP}; font-size: 18px; font-weight: 800; line-height: 1.2; }
        .cr-brand-sub { color: ${PINK}; font-size: 12.5px; font-weight: 600; margin-top: 2px; }
        .cr-version-pill {
          font-size: 11.5px; font-weight: 700; color: ${PINK};
          background: rgba(205,54,107,0.08); padding: 5px 12px; border-radius: 999px;
        }

        .cr-heading { color: ${BLUE_DEEP}; font-size: 24px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
        .cr-subheading { color: rgba(44,61,131,0.55); font-size: 13.5px; margin-bottom: 18px; }

        .cr-stepper {
          display: flex; align-items: center;
          margin-bottom: 24px;
          background: rgba(44,61,131,0.04);
          border-radius: 12px; padding: 4px; gap: 4px;
        }
        .cr-step-btn {
          flex: 1; padding: 9px 0; border: none; border-radius: 9px;
          font-size: 12px; font-weight: 700; font-family: 'Inter', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          cursor: default; transition: all .2s;
          color: rgba(44,61,131,0.45); background: transparent;
        }
        .cr-step-btn.active {
          background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
          color: #fff; box-shadow: 0 6px 16px rgba(205,54,107,0.28);
        }
        .cr-step-btn.done { background: rgba(44,61,131,0.08); color: ${BLUE}; }
        .cr-step-num {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 800;
        }
        .cr-step-btn.active .cr-step-num { background: rgba(255,255,255,0.25); color:#fff; }
        .cr-step-btn.done .cr-step-num { background: ${BLUE}; color: #fff; }
        .cr-step-dot.done-dot { background: ${BLUE}; color: #fff; }
        .posh-dot { background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}) !important; color: #fff !important; }
        .posh-text { color: ${PINK}; font-weight: 800; }

        .cr-section-head {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 14px; margin-top: 4px;
        }
        .cr-section-icon {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center; color: ${PINK};
        }
        .cr-section-title {
          font-size: 12px; font-weight: 800; color: ${BLUE_DEEP};
          text-transform: uppercase; letter-spacing: 0.8px;
        }
        .cr-section-divider { flex: 1; height: 1px; background: rgba(44,61,131,0.08); }

        .cr-fld { margin-bottom: 14px; }
        .cr-flbl {
          display: block; font-size: 11px; font-weight: 700;
          color: rgba(44,61,131,0.55); margin-bottom: 8px;
          letter-spacing: 0.8px; text-transform: uppercase;
        }
        .cr-fwrap { display: flex; align-items: stretch; }
        .cr-ficon-box {
          width: 42px; flex-shrink: 0;
          background: rgba(44,61,131,0.05);
          border: 1px solid rgba(44,61,131,0.12); border-right: none;
          border-radius: 12px 0 0 12px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(44,61,131,0.40); transition: all .2s;
        }
        .cr-finput {
          width: 100%; padding: 12px 14px;
          border: 1px solid rgba(44,61,131,0.12); border-left: none;
          border-radius: 0 12px 12px 0;
          font-size: 14px; color: ${BLUE_DEEP}; background: #fff;
          outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .cr-finput:focus { border-color: ${PINK}; box-shadow: 0 0 0 3px rgba(205,54,107,0.12); }
        .cr-finput::placeholder { color: rgba(44,61,131,0.30); }
        .cr-fwrap:focus-within .cr-ficon-box { border-color: ${PINK}; color: ${PINK}; }
        .cr-finput.cr-select {
          cursor: pointer; appearance: none;
          -webkit-appearance: none; -moz-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%232C3D83' stroke-width='2.4'><path d='M6 9l6 6 6-6'/></svg>");
          background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px;
        }
        .cr-finput.cr-textarea { resize: vertical; min-height: 68px; border-radius: 0 12px 12px 0; }
        .cr-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cr-note {
          font-size: 12.5px; color: rgba(44,61,131,0.55); line-height: 1.55;
          background: rgba(44,61,131,0.04); border: 1px solid rgba(44,61,131,0.10);
          border-radius: 10px; padding: 12px 14px; margin-top: 4px;
        }

        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .cr-fade { animation: fadeUp .25s ease both; }

        .cr-btn-row { display: flex; gap: 10px; margin-top: 20px; }
        .cr-sbtn {
          flex: 1; padding: 14px; border: none; border-radius: 12px;
          font-size: 14.5px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
          box-shadow: 0 10px 26px rgba(205,54,107,0.32);
        }
        .cr-sbtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
        .cr-sbtn:disabled { opacity: 0.5; cursor: not-allowed; }
        .cr-ghost-btn {
          flex: 0 0 auto; padding: 14px 20px; border-radius: 12px;
          border: 1.5px solid rgba(44,61,131,0.15);
          background: #fff; color: ${BLUE_DEEP};
          font-size: 14.5px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: all .2s; font-family: 'Inter', sans-serif;
        }
        .cr-ghost-btn:hover { background: rgba(44,61,131,0.04); border-color: rgba(44,61,131,0.28); }
        .cr-login-link {
          text-align: center; font-size: 13.5px; color: rgba(44,61,131,0.55); margin-top: 18px;
        }
        .cr-login-link a { color: ${PINK}; font-weight: 700; text-decoration: none; margin-left: 5px; }
        .cr-login-link a:hover { text-decoration: underline; }

        .cr-info-col { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 14px; }
        .cr-info-card {
          background: linear-gradient(165deg, ${BLUE} 0%, ${BLUE_DEEP} 100%);
          border-radius: 20px; padding: 30px 26px 26px; text-align: center;
          box-shadow: 0 18px 50px rgba(29,42,96,0.30);
          animation: crIn .45s cubic-bezier(.22,.9,.36,1) .08s both;
        }
        .cr-badge-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 20px; }
        .cr-logo-badge {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          background: rgba(255,255,255,0.95);
          display: flex; align-items: center; justify-content: center;
          padding: 6px; overflow: hidden; border: 1.5px solid rgba(255,255,255,0.3);
        }
        .cr-logo-badge img { width:100%; height:100%; object-fit:contain; border-radius:6px; }
        .cr-info-title { color: #fff; font-size: 22px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
        .cr-info-sub { color: rgba(255,255,255,0.55); font-size: 13px; font-weight: 500; margin-bottom: 16px; }
        .cr-portal-pill {
          display: inline-flex; align-items: center; gap: 7px;
          color: #fff; font-size: 11.5px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
          background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
          padding: 8px 18px; border-radius: 999px;
          box-shadow: 0 8px 20px rgba(205,54,107,0.45); margin-bottom: 18px;
        }
        .cr-info-desc { color: rgba(255,255,255,0.55); font-size: 12.5px; line-height: 1.55; margin-bottom: 22px; }
        .cr-stats { display: flex; gap: 9px; margin-bottom: 4px; }
        .cr-stat {
          flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px; padding: 14px 8px;
        }
        .cr-stat-icon {
          width: 28px; height: 28px; border-radius: 8px; margin: 0 auto 8px;
          background: rgba(205,54,107,0.22);
          display: flex; align-items: center; justify-content: center; color: ${PINK};
        }
        .cr-stat-num { color: #fff; font-size: 18px; font-weight: 800; }
        .cr-stat-label { color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px; }

        .cr-steps-card {
          background: #fff; border-radius: 18px; padding: 22px 22px 20px;
          box-shadow: 0 12px 34px rgba(44,61,131,0.08);
          animation: crIn .45s cubic-bezier(.22,.9,.36,1) .14s both;
        }
        .cr-steps-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .cr-steps-label { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(44,61,131,0.45); }
        .cr-steps-tag { font-size: 12px; font-weight: 700; color: ${PINK}; }
        .cr-compliance-steps { display: flex; flex-direction: column; gap: 10px; }
        .cr-compliance-step {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          border: 1px solid rgba(44,61,131,0.08);
          background: rgba(44,61,131,0.02);
        }
        .cr-compliance-step.active-step { border-color: rgba(205,54,107,0.20); background: rgba(205,54,107,0.04); }
        .cr-compliance-step.done-step { border-color: rgba(44,61,131,0.12); background: rgba(44,61,131,0.03); }
        .cr-compliance-step.posh-step {
          border-color: rgba(205,54,107,0.30);
          background: linear-gradient(135deg, rgba(205,54,107,0.06), rgba(224,185,120,0.06));
        }
        .cr-step-dot {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800;
          background: rgba(44,61,131,0.08); color: rgba(44,61,131,0.45); margin-top: 1px;
        }
        .cr-compliance-step.active-step .cr-step-dot { background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}); color: #fff; }
        .cr-step-text { font-size: 12px; font-weight: 700; color: ${BLUE_DEEP}; line-height: 1.3; }
        .cr-step-desc { font-size: 10.5px; color: rgba(44,61,131,0.50); margin-top: 2px; }
        .cr-secure-note {
          display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; color: rgba(44,61,131,0.45); font-weight: 500;
          padding-top: 16px; margin-top: 16px;
          border-top: 1px solid rgba(44,61,131,0.08);
        }

        .cr-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px; border-top: 1px solid rgba(44,61,131,0.08);
          font-size: 12.5px; color: rgba(44,61,131,0.45);
        }
        .cr-footer-links { display: flex; gap: 20px; }
        .cr-footer-links a { color: rgba(44,61,131,0.45); text-decoration: none; }
        .cr-footer-links a:hover { color: ${BLUE}; }

        @media (max-width: 960px) {
          .cr-main { flex-direction: column; align-items: center; padding: 32px 20px; }
          .cr-topbar { flex-direction: column; gap: 10px; align-items: flex-start; padding: 16px 20px; }
          .cr-footer { flex-direction: column; gap: 10px; text-align: center; padding: 16px 20px; }
          .cr-two-col { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cr-page">
      
        <main className="cr-main">
          <div className="cr-card">
            <div className="cr-brand-row">
              <div className="cr-brand">
                <div className="cr-brand-icon"><img src={wcdLogo} alt="WCD Logo" /></div>
                <div>
                  <div className="cr-brand-title">WCD Admin</div>
                  <div className="cr-brand-sub">Company Registration</div>
                </div>
              </div>
              <span className="cr-version-pill">v2.0</span>
            </div>

            <h1 className="cr-heading">{PAGE_TITLES[page].title}</h1>
            <p className="cr-subheading">{PAGE_TITLES[page].sub}</p>

            <div className="cr-stepper">
              <div className={`cr-step-btn ${page === 0 ? "active" : page > 0 ? "done" : ""}`}>
                <span className="cr-step-num">{page > 0 ? "✓" : "1"}</span>
                Company
              </div>
              <div className={`cr-step-btn ${page === 1 ? "active" : page > 1 ? "done" : ""}`}>
                <span className="cr-step-num">{page > 1 ? "✓" : "2"}</span>
                Contact
              </div>
              <div className={`cr-step-btn ${page === 2 ? "active" : ""}`}>
                <span className="cr-step-num">3</span>
                Profile
              </div>
            </div>

            {/* PAGE 0 */}
            {page === 0 && (
              <div className="cr-fade">
                <div className="cr-section-head">
                  <div className="cr-section-icon"><FiBriefcase size={14} /></div>
                  <span className="cr-section-title">Company Details</span>
                  <div className="cr-section-divider" />
                </div>

                <div className="cr-two-col">
                  <Field label="Org Type *" icon={<FiLayers size={15} />}>
                    <select className="cr-finput cr-select" value={form.orgtype} onChange={update("orgtype")}>
                      <option value="">Select type</option>
                      {ORG_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>

                  <Field label="Industry Sector" icon={<FiLayers size={15} />}>
                    <select className="cr-finput cr-select" value={form.industryType} onChange={update("industryType")}>
                      <option value="">Select sector</option>
                      {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Company Name *" icon={<FiBriefcase size={15} />}>
                  <input className="cr-finput" placeholder="Registered company name" value={form.companyName} onChange={update("companyName")} />
                </Field>

                {/* <Field label="Registration Number" icon={<FiHash size={15} />}>
                  <input className="cr-finput" placeholder="e.g. U12345MH2020PLC123456" value={form.registrationNumber} onChange={update("registrationNumber")} />
                </Field> */}


                <div className="cr-two-col">
  <Field label="Registration Type *" icon={<FiHash size={15} />}>
    <select className="cr-finput cr-select" value={form.regnoType} onChange={update("regnoType")}>
      <option value="">Select type</option>
      <option value="GST">GST</option>
      <option value="PAN">PAN</option>
      <option value="TAN">TAN</option>
    </select>
  </Field>
  <Field label="Registration Number *" icon={<FiHash size={15} />}>
    <input className="cr-finput" placeholder="e.g. 27AAAAA0000A1Z5" value={form.registrationNumber} onChange={update("registrationNumber")} />
  </Field>
</div>

                <Field label="Total Employees" icon={<FiUsers size={15} />}>
                  <input className="cr-finput" type="number" min="1" placeholder="e.g. 120" value={form.totalEmployees} onChange={update("totalEmployees")} />
                </Field>

                <div className="cr-section-head" style={{ marginTop: 8 }}>
                  <div className="cr-section-icon"><FiMapPin size={14} /></div>
                  <span className="cr-section-title">Location Details</span>
                  <div className="cr-section-divider" />
                </div>

                <Field label="Address" icon={<FiHome size={15} />}>
                  <textarea className="cr-finput cr-textarea" placeholder="Street, building, area" value={form.address} onChange={update("address")} rows={2} />
                </Field>

                <div className="cr-two-col">
                  <Field label="District *" icon={<FiMapPin size={15} />}>
                    <input className="cr-finput" placeholder="e.g. Pune" value={form.district} onChange={update("district")} />
                  </Field>
                  <Field label="Taluka" icon={<FiMapPin size={15} />}>
                    <input className="cr-finput" placeholder="e.g. Haveli" value={form.taluka} onChange={update("taluka")} />
                  </Field>
                </div>

                <div className="cr-two-col">
                  <Field label="City" icon={<FiGlobe size={15} />}>
                    <input className="cr-finput" placeholder="e.g. Pune" value={form.city} onChange={update("city")} />
                  </Field>
                  <Field label="Pincode" icon={<FiMapPin size={15} />}>
                    <input className="cr-finput" placeholder="6 digit" maxLength={6} value={form.pincode}
                      onChange={(e) => setForm((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))} />
                  </Field>
                </div>
              </div>
            )}

            {/* PAGE 1 */}
            {page === 1 && (
              <div className="cr-fade">
                <div className="cr-section-head">
                  <div className="cr-section-icon"><FiUser size={14} /></div>
                  <span className="cr-section-title">Contact Details</span>
                  <div className="cr-section-divider" />
                </div>

                <Field label="Contact Person Name" icon={<FiUser size={15} />}>
                  <input className="cr-finput" placeholder="Full name" value={form.contactPersonName} onChange={update("contactPersonName")} />
                </Field>

                <Field label="Username *" icon={<FiUser size={15} />}>
  <input className="cr-finput" placeholder="Choose a username" value={form.username} onChange={update("username")} />
</Field>


                <div className="cr-two-col">
                  <Field label="Mobile Number *" icon={<FiPhone size={15} />}>
                    <input className="cr-finput" placeholder="10 digit mobile" maxLength={10} value={form.contactPhone}
                      onChange={(e) => setForm((prev) => ({ ...prev, contactPhone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} />
                  </Field>
                  <Field label="Email Address" icon={<FiMail size={15} />}>
                    <input className="cr-finput" type="email" placeholder="company@example.com" value={form.email} onChange={update("email")} />
                  </Field>
                </div>

                <Field label="Password *" icon={<FiLock size={15} />}>
                  <input className="cr-finput" type="password" placeholder="Create a login password" value={form.password} onChange={update("password")} autoComplete="new-password" />
                </Field>

                <div className="cr-section-head" style={{ marginTop: 8 }}>
                  <div className="cr-section-icon"><FiShield size={14} /></div>
                  <span className="cr-section-title">POSH Information</span>
                  <div className="cr-section-divider" />
                </div>

                <div className="cr-two-col">
                  <Field label="POSH Policy Adopted" icon={<FiCheckCircle size={15} />}>
                    <select className="cr-finput cr-select" value={form.poshPolicyAdopted} onChange={update("poshPolicyAdopted")}>
                      <option value="">Select status</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="in_progress">In Progress</option>
                    </select>
                  </Field>
                  <Field label="Complaint Mechanism" icon={<FiAlertCircle size={15} />}>
                    <select className="cr-finput cr-select" value={form.complaintMechanismInPlace} onChange={update("complaintMechanismInPlace")}>
                      <option value="">Select status</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="in_progress">In Progress</option>
                    </select>
                  </Field>
                </div>

                <p className="cr-note">
                  Registration नंतर तुम्ही full company profile complete करू शकता आणि POSH Inspection Survey साठी proceed करू शकता.
                </p>
              </div>
            )}

            {/* PAGE 2 */}
            {page === 2 && (
              <div className="cr-fade">
                <div className="cr-section-head">
                  <div className="cr-section-icon"><FiBriefcase size={14} /></div>
                  <span className="cr-section-title">Company Profile</span>
                  <div className="cr-section-divider" />
                </div>

                <div className="cr-two-col">
                  <Field label="Website" icon={<FiGlobe size={15} />}>
                    <input className="cr-finput" placeholder="https://company.com" value={form.website} onChange={update("website")} />
                  </Field>
                  <Field label="Founded Year" icon={<FiHash size={15} />}>
                    <input className="cr-finput" type="number" placeholder="e.g. 2005" value={form.foundedYear} onChange={update("foundedYear")} />
                  </Field>
                </div>

                <div className="cr-two-col">
                  <Field label="GST Number" icon={<FiHash size={15} />}>
                    <input className="cr-finput" placeholder="27AAAAA0000A1Z5" value={form.gstNumber} onChange={update("gstNumber")} />
                  </Field>
                  <Field label="PAN Number" icon={<FiHash size={15} />}>
                    <input className="cr-finput" placeholder="AAAAA0000A" value={form.panNumber} onChange={update("panNumber")} />
                  </Field>
                </div>

                <div className="cr-two-col">
                  <Field label="CIN Number" icon={<FiHash size={15} />}>
                    <input className="cr-finput" placeholder="U12345MH2020PLC000000" value={form.cinNumber} onChange={update("cinNumber")} />
                  </Field>
                  <Field label="Female Employees" icon={<FiUsers size={15} />}>
                    <input className="cr-finput" type="number" placeholder="e.g. 45" value={form.femaleEmployees} onChange={update("femaleEmployees")} />
                  </Field>
                </div>

                <Field label="Company Description" icon={<FiHome size={15} />}>
                  <textarea className="cr-finput cr-textarea" placeholder="Brief description of your company..." value={form.companyDescription} onChange={update("companyDescription")} rows={3} />
                </Field>

                <p className="cr-note" style={{ background: "rgba(205,54,107,0.04)", borderColor: "rgba(205,54,107,0.15)" }}>
                  🔹 हे fields optional आहेत — blank सोडू शकता. Submit केल्यावर थेट POSH Survey वर जाल.
                </p>
              </div>
            )}

            <div className="cr-btn-row">
              {page > 0 && (
                <button className="cr-ghost-btn" onClick={() => setPage(page - 1)}>
                  <FiArrowLeft size={15} /> Back
                </button>
              )}
              <button className="cr-sbtn" onClick={handleNext} disabled={loading}>
                {loading ? "Submitting..." : page < 2 ? "Next" : "Proceed to POSH Survey"}
                {!loading && (page < 2 ? <FiArrowRight size={16} /> : <FiCheckCircle size={16} />)}
              </button>
            </div>

            <p className="cr-login-link">
              Already registered? <Link to="/company-login">Sign In</Link>
            </p>
          </div>

          {/* RIGHT */}
          <div className="cr-info-col">
            <div className="cr-info-card">
              <div className="cr-badge-row">
                <div className="cr-logo-badge"><img src={wcdLogo} alt="WCD Logo" /></div>
                <div className="cr-logo-badge"><img src={shasanLogo} alt="Maharashtra Shasan" /></div>
              </div>
              <h2 className="cr-info-title">WCD Inspection</h2>
              <p className="cr-info-sub">Maharashtra State</p>
              <div className="cr-portal-pill"><FiShield size={12} /> COMPANY PORTAL</div>
              <p className="cr-info-desc">Women &amp; Child Development —<br />POSH Compliance &amp; Inspection System</p>
              <div className="cr-stats">
                <div className="cr-stat">
                  <div className="cr-stat-icon"><FiCheckSquare size={14} /></div>
                  <div className="cr-stat-num">1,284</div>
                  <div className="cr-stat-label">Inspections</div>
                </div>
                <div className="cr-stat">
                  <div className="cr-stat-icon"><FiBriefcase size={14} /></div>
                  <div className="cr-stat-num">342</div>
                  <div className="cr-stat-label">Companies</div>
                </div>
                <div className="cr-stat">
                  <div className="cr-stat-icon"><FiMapPin size={14} /></div>
                  <div className="cr-stat-num">34</div>
                  <div className="cr-stat-label">Districts</div>
                </div>
              </div>
            </div>

            <div className="cr-steps-card">
              <div className="cr-steps-head">
                <span className="cr-steps-label">Registration Steps</span>
                <span className="cr-steps-tag">{page + 1} of 4</span>
              </div>
              <div className="cr-compliance-steps">
                <div className={`cr-compliance-step ${page === 0 ? "active-step" : "done-step"}`}>
                  <div className={`cr-step-dot ${page > 0 ? "done-dot" : ""}`}>{page > 0 ? "✓" : "1"}</div>
                  <div>
                    <div className="cr-step-text">Company &amp; Location</div>
                    <div className="cr-step-desc">Basic info, industry type, address</div>
                  </div>
                </div>
                <div className={`cr-compliance-step ${page === 1 ? "active-step" : page > 1 ? "done-step" : ""}`}>
                  <div className={`cr-step-dot ${page > 1 ? "done-dot" : ""}`}>{page > 1 ? "✓" : "2"}</div>
                  <div>
                    <div className="cr-step-text">Contact &amp; POSH</div>
                    <div className="cr-step-desc">Contact person, email, POSH status</div>
                  </div>
                </div>
                <div className={`cr-compliance-step ${page === 2 ? "active-step" : ""}`}>
                  <div className="cr-step-dot">3</div>
                  <div>
                    <div className="cr-step-text">Company Profile</div>
                    <div className="cr-step-desc">GST, PAN, website, description</div>
                  </div>
                </div>
                <div className="cr-compliance-step posh-step">
                  <div className="cr-step-dot posh-dot">4</div>
                  <div>
                    <div className="cr-step-text posh-text">POSH Survey</div>
                    <div className="cr-step-desc">Inspection survey &amp; compliance report</div>
                  </div>
                </div>
              </div>
              <div className="cr-secure-note">
                <FiLockSolid size={13} /> Secure Government Portal · 256-bit SSL Encrypted
              </div>
            </div>
          </div>
        </main>

        <footer className="cr-footer">
          <span>© 2025 WCD Maharashtra. All rights reserved.</span>
          <div className="cr-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </footer>
      </div>
    </>
  );
}









