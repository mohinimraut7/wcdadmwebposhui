import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FiBriefcase,
  FiClipboard,
  FiFileText,
  FiLogOut,
  FiLogIn,
  FiMenu,
  FiX,
  FiShield,
  FiChevronRight,
} from "react-icons/fi";
import wcdLogo from "../../assets/wcdlogo.jpg";

const BLUE      = "#2C3D83";
const PINK      = "#CD366B";
const PINK_DARK = "#b82a5c";

const NAV_LINKS = [
  { to: "/company-register", label: "Register",    labelMr: "नोंदणी",         icon: <FiBriefcase size={15} /> },
  { to: "/company-profile",  label: "Profile",     labelMr: "प्रोफाइल",       icon: <FiFileText  size={15} /> },
  { to: "/posh-survey",      label: "POSH Survey", labelMr: "POSH सर्वेक्षण", icon: <FiClipboard size={15} /> },
];

export default function CompanyNavbar({ lang = "en", onLangChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("companyUser"));

  const isActive = (to) => location.pathname === to;

  const handleToggle = () => {
    if (loggedIn) {
      localStorage.removeItem("companyUser");
      setLoggedIn(false);
      navigate("/company-login");
    } else {
      navigate("/company-login");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Wrapper — 90% width, centred ── */
        .cn-outer {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: transparent;
          padding: 14px 0 0;
          font-family: 'Inter', sans-serif;
          position: sticky; top: 0; z-index: 100;
        }

        /* ── The pill bar — 60% wide, border-radius 15% ── */
        .cn-bar {
          width: 75%;
          max-width: 75%;
          min-width: 320px;
          height: 56px;
          border-radius: 999px;          /* full pill */
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          /* border: split — left side blue, right side pink */
          box-shadow:
            0 0 0 2px ${BLUE},           /* base border blue */
            4px 0 0 2px ${PINK};         /* right side pink — handled via pseudo */
          box-shadow: 0 8px 32px rgba(44,61,131,0.18);
          border: 2.5px solid transparent;
          background:
            linear-gradient(white, white) padding-box,
            linear-gradient(90deg, ${BLUE} 50%, ${PINK} 50%) border-box;
        }

        /* ── LEFT — blue section (brand) — exact 50% ── */
        .cn-left {
          background: ${BLUE};
          display: flex; align-items: center; gap: 10px;
          padding: 0 24px 0 20px;
          flex: 1;
          position: relative;
          text-decoration: none;
          z-index: 2;
        }
        /* Slanting partition — blue side cuts into right */
        .cn-left::after {
          content: '';
          position: absolute;
          right: -20px; top: 0;
          width: 40px; height: 100%;
          background: ${BLUE};
          clip-path: polygon(0 0, 60% 0, 100% 100%, 0 100%);
          z-index: 3;
        }

        .cn-logo {
          width: 32px; height: 32px; border-radius: 8px;
          overflow: hidden; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.30);
          position: relative; z-index: 4;
        }
        .cn-logo img { width:100%; height:100%; object-fit:cover; display:block; }

        .cn-brand-text { position: relative; z-index: 4; }
        .cn-brand-name { font-size: 13.5px; font-weight: 800; color: #fff; line-height: 1.15; }
        .cn-brand-sub  { font-size: 9.5px; font-weight: 600; color: rgba(255,255,255,0.60); letter-spacing: 0.3px; }

        /* ── RIGHT — pink section — exact 50% ── */
        .cn-right {
          background: ${PINK};
          flex: 1;
          display: flex; align-items: center;
          padding-left: 32px;
          padding-right: 14px;
          gap: 4px;
          position: relative;
          z-index: 1;
        }

        /* Nav links */
        .cn-links {
          display: flex; align-items: center; gap: 2px;
          flex: 1;
        }
        .cn-link {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px;
          font-size: 12.5px; font-weight: 600;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          border-radius: 999px;
          transition: all .18s;
          white-space: nowrap;
        }
        .cn-link:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
        .cn-link.active {
          background: #fff;
          color: ${PINK};
          font-weight: 800;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
        }
        .cn-link.active svg { color: ${PINK}; }

        /* ── RIGHT ACTIONS ── */
        .cn-actions {
          display: flex; align-items: center; gap: 8px;
          margin-left: auto; flex-shrink: 0;
        }

        /* Lang toggle */
        .cn-lang {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
          padding: 2px;
          gap: 2px;
        }
        .cn-lang-btn {
          padding: 4px 10px; border: none;
          background: transparent;
          font-size: 11px; font-weight: 700; cursor: pointer;
          color: rgba(255,255,255,0.75);
          border-radius: 999px;
          font-family: 'Inter', sans-serif;
          transition: all .15s;
        }
        .cn-lang-btn.active {
          background: #fff;
          color: ${PINK};
        }

        /* Login / Logout toggle switch button */
        .cn-toggle {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 16px;
          background: rgba(255,255,255,0.18);
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 999px;
          color: #fff; font-size: 12px; font-weight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all .2s;
          white-space: nowrap;
        }
        .cn-toggle:hover {
          background: rgba(255,255,255,0.30);
          border-color: rgba(255,255,255,0.60);
        }

        /* ── BREADCRUMB ── */
        .cn-breadcrumb {
          width: 60%;
          max-width: 900px;
          min-width: 320px;
          display: flex; align-items: center; gap: 5px;
          padding: 5px 22px 0;
          font-size: 11px; font-weight: 600;
          color: rgba(44,61,131,0.45);
          font-family: 'Inter', sans-serif;
        }
        .cn-bc-home { color: ${BLUE}; font-weight: 700; }
        .cn-bc-sep  { color: rgba(44,61,131,0.25); }
        .cn-bc-curr { color: ${PINK}; font-weight: 700; }

        /* ── MOBILE ── */
        .cn-hamburger {
          display: none; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.15); border: none;
          border-radius: 50%; width: 34px; height: 34px;
          cursor: pointer; flex-shrink: 0;
          margin-left: auto;
        }

        .cn-mobile-menu {
          display: none; flex-direction: column;
          background: #fff;
          width: 60%; max-width: 900px; min-width: 320px;
          border-radius: 16px;
          margin-top: 6px;
          padding: 10px 0 14px;
          box-shadow: 0 8px 30px rgba(44,61,131,0.14);
          overflow: hidden;
        }
        .cn-mobile-link {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 22px;
          font-size: 13.5px; font-weight: 600;
          color: rgba(44,61,131,0.65); text-decoration: none;
          transition: all .15s;
        }
        .cn-mobile-link:hover { background: rgba(44,61,131,0.04); color: ${BLUE}; }
        .cn-mobile-link.active { color: ${PINK}; background: rgba(205,54,107,0.05); font-weight: 700; }
        .cn-mobile-toggle {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 22px; margin-top: 4px;
          border-top: 1px solid rgba(44,61,131,0.07);
          font-size: 13.5px; font-weight: 700; color: ${PINK};
          background: none; border-left:none; border-right:none; border-bottom:none;
          cursor: pointer; font-family: 'Inter', sans-serif; text-align: left; width: 100%;
        }

        @media (max-width: 768px) {
          .cn-links, .cn-actions { display: none !important; }
          .cn-hamburger { display: flex; }
          .cn-mobile-menu.open { display: flex; }
          .cn-bar { width: 92%; }
          .cn-breadcrumb { width: 92%; }
          .cn-mobile-menu { width: 92%; }
        }
      `}</style>

      <div className="cn-outer">
        {/* ── Pill navbar ── */}
        <div className="cn-bar">

          {/* LEFT — blue brand */}
          <Link to="/company-register" className="cn-left">
            <div className="cn-logo"><img src={wcdLogo} alt="WCD" /></div>
            <div className="cn-brand-text">
              <div className="cn-brand-name">WCD Portal</div>
              <div className="cn-brand-sub">Company</div>
            </div>
          </Link>

          {/* RIGHT — pink section */}
          <div className="cn-right">

            {/* Nav links */}
            <div className="cn-links">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`cn-link${isActive(l.to) ? " active" : ""}`}
                >
                  {l.icon}
                  {lang === "mr" ? l.labelMr : l.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="cn-actions">
              {/* Lang toggle */}
              {onLangChange && (
                <div className="cn-lang">
                  <button className={`cn-lang-btn${lang === "en" ? " active" : ""}`} onClick={() => onLangChange("en")}>EN</button>
                  <button
                    className={`cn-lang-btn${lang === "mr" ? " active" : ""}`}
                    onClick={() => onLangChange("mr")}
                    style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}
                  >मर</button>
                </div>
              )}

              {/* Login / Logout toggle */}
              <button className="cn-toggle" onClick={handleToggle}>
                {loggedIn
                  ? <><FiLogOut size={13} />{lang === "mr" ? "बाहेर पडा" : "Logout"}</>
                  : <><FiLogIn  size={13} />{lang === "mr" ? "लॉगिन" : "Login"}</>
                }
              </button>
            </div>

            {/* Mobile hamburger */}
            <button className="cn-hamburger" onClick={() => setOpen(!open)}>
              {open ? <FiX size={16} color="#fff" /> : <FiMenu size={16} color="#fff" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`cn-mobile-menu${open ? " open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`cn-mobile-link${isActive(l.to) ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.icon}
              {lang === "mr" ? l.labelMr : l.label}
            </Link>
          ))}
          <button className="cn-mobile-toggle" onClick={handleToggle}>
            {loggedIn ? <><FiLogOut size={14} />{lang === "mr" ? "बाहेर पडा" : "Logout"}</> : <><FiLogIn size={14} />{lang === "mr" ? "लॉगिन" : "Login"}</>}
          </button>
        </div>

        {/* Breadcrumb */}
        <BreadCrumb location={location} lang={lang} />
      </div>
    </>
  );
}

const ROUTE_NAMES = {
  "/company-register": { en: "Company Registration", mr: "कंपनी नोंदणी" },
  "/company-profile":  { en: "Company Profile",      mr: "कंपनी प्रोफाइल" },
  "/posh-survey":      { en: "POSH Survey",          mr: "POSH सर्वेक्षण" },
  "/company-login":    { en: "Login",                mr: "लॉगिन" },
};

function BreadCrumb({ location, lang }) {
  const name = ROUTE_NAMES[location.pathname];
  if (!name) return null;
  return (
    <div className="cn-breadcrumb">
      <span className="cn-bc-home">WCD Portal</span>
      <FiChevronRight size={11} />
      <span className="cn-bc-sep">Company</span>
      <FiChevronRight size={11} />
      <span className="cn-bc-curr">{name[lang] || name.en}</span>
    </div>
  );
}