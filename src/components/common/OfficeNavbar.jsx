import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FiClipboard,
  FiFileText,
  FiCheckSquare,
  FiLogOut,
  FiLogIn,
  FiMenu,
  FiX,
  FiShield,
  FiChevronRight,
} from "react-icons/fi";
import wcdLogo from "../../assets/wcdlogo.jpg";

const BLUE      = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const GOLD      = "#E0B978";
const GOLD_DARK = "#c79a55";

const NAV_LINKS = [
  { to: "/officer-assignments", label: "Assignments",   labelMr: "नेमणुका",        icon: <FiClipboard   size={15} /> },
  { to: "/officer-report",      label: "Submit Report",  labelMr: "अहवाल सादर करा", icon: <FiCheckSquare size={15} /> },
  { to: "/officer-reports",     label: "My Reports",     labelMr: "माझे अहवाल",     icon: <FiFileText    size={15} /> },
];

export default function OfficerNavbar({ lang = "en", onLangChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("officerUser"));

  const isActive = (to) => location.pathname === to;

  const handleToggle = () => {
    if (loggedIn) {
      localStorage.removeItem("officerToken");
      localStorage.removeItem("officerUser");
      setLoggedIn(false);
      navigate("/officer-login");
    } else {
      navigate("/officer-login");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Wrapper — 90% width, centred ── */
        .on-outer {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: transparent;
          padding: 14px 0 0;
          font-family: 'Inter', sans-serif;
          position: sticky; top: 0; z-index: 100;
        }

        /* ── The pill bar — split blue / gold ── */
        .on-bar {
          width: 75%;
          max-width: 75%;
          min-width: 320px;
          height: 56px;
          border-radius: 999px;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          box-shadow: 0 8px 32px rgba(44,61,131,0.18);
          border: 2.5px solid transparent;
          background:
            linear-gradient(white, white) padding-box,
            linear-gradient(90deg, ${BLUE} 50%, ${GOLD_DARK} 50%) border-box;
        }

        /* ── LEFT — blue section (brand) ── */
        .on-left {
          background: ${BLUE};
          display: flex; align-items: center; gap: 10px;
          padding: 0 24px 0 20px;
          flex: 1;
          position: relative;
          text-decoration: none;
          z-index: 2;
        }
        .on-left::after {
          content: '';
          position: absolute;
          right: -20px; top: 0;
          width: 40px; height: 100%;
          background: ${BLUE};
          clip-path: polygon(0 0, 60% 0, 100% 100%, 0 100%);
          z-index: 3;
        }

        .on-logo {
          width: 32px; height: 32px; border-radius: 8px;
          overflow: hidden; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.30);
          position: relative; z-index: 4;
        }
        .on-logo img { width:100%; height:100%; object-fit:cover; display:block; }

        .on-brand-text { position: relative; z-index: 4; }
        .on-brand-name { font-size: 13.5px; font-weight: 800; color: #fff; line-height: 1.15; }
        .on-brand-sub  { font-size: 9.5px; font-weight: 600; color: rgba(255,255,255,0.60); letter-spacing: 0.3px; }

        /* ── RIGHT — gold section ── */
        .on-right {
          background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%);
          flex: 1;
          display: flex; align-items: center;
          padding-left: 32px;
          padding-right: 14px;
          gap: 4px;
          position: relative;
          z-index: 1;
        }

        /* Nav links */
        .on-links {
          display: flex; align-items: center; gap: 2px;
          flex: 1;
        }
        .on-link {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px;
          font-size: 12.5px; font-weight: 600;
          color: rgba(29,42,96,0.70);
          text-decoration: none;
          border-radius: 999px;
          transition: all .18s;
          white-space: nowrap;
        }
        .on-link:hover {
          background: rgba(255,255,255,0.30);
          color: ${BLUE_DEEP};
        }
        .on-link.active {
          background: #fff;
          color: ${GOLD_DARK};
          font-weight: 800;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
        }
        .on-link.active svg { color: ${GOLD_DARK}; }

        /* ── RIGHT ACTIONS ── */
        .on-actions {
          display: flex; align-items: center; gap: 8px;
          margin-left: auto; flex-shrink: 0;
        }

        /* Lang toggle */
        .on-lang {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.25);
          border-radius: 999px;
          padding: 2px;
          gap: 2px;
        }
        .on-lang-btn {
          padding: 4px 10px; border: none;
          background: transparent;
          font-size: 11px; font-weight: 700; cursor: pointer;
          color: rgba(29,42,96,0.65);
          border-radius: 999px;
          font-family: 'Inter', sans-serif;
          transition: all .15s;
        }
        .on-lang-btn.active {
          background: #fff;
          color: ${GOLD_DARK};
        }

        /* Login / Logout toggle switch button */
        .on-toggle {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 16px;
          background: rgba(255,255,255,0.30);
          border: 1.5px solid rgba(255,255,255,0.55);
          border-radius: 999px;
          color: ${BLUE_DEEP}; font-size: 12px; font-weight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all .2s;
          white-space: nowrap;
        }
        .on-toggle:hover {
          background: rgba(255,255,255,0.50);
          border-color: rgba(255,255,255,0.80);
        }

        /* ── BREADCRUMB ── */
        .on-breadcrumb {
          width: 60%;
          max-width: 900px;
          min-width: 320px;
          display: flex; align-items: center; gap: 5px;
          padding: 5px 22px 0;
          font-size: 11px; font-weight: 600;
          color: rgba(44,61,131,0.45);
          font-family: 'Inter', sans-serif;
        }
        .on-bc-home { color: ${BLUE}; font-weight: 700; }
        .on-bc-sep  { color: rgba(44,61,131,0.25); }
        .on-bc-curr { color: ${GOLD_DARK}; font-weight: 700; }

        /* ── MOBILE ── */
        .on-hamburger {
          display: none; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.25); border: none;
          border-radius: 50%; width: 34px; height: 34px;
          cursor: pointer; flex-shrink: 0;
          margin-left: auto;
        }

        .on-mobile-menu {
          display: none; flex-direction: column;
          background: #fff;
          width: 60%; max-width: 900px; min-width: 320px;
          border-radius: 16px;
          margin-top: 6px;
          padding: 10px 0 14px;
          box-shadow: 0 8px 30px rgba(44,61,131,0.14);
          overflow: hidden;
        }
        .on-mobile-link {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 22px;
          font-size: 13.5px; font-weight: 600;
          color: rgba(44,61,131,0.65); text-decoration: none;
          transition: all .15s;
        }
        .on-mobile-link:hover { background: rgba(44,61,131,0.04); color: ${BLUE}; }
        .on-mobile-link.active { color: ${GOLD_DARK}; background: rgba(224,185,120,0.10); font-weight: 700; }
        .on-mobile-toggle {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 22px; margin-top: 4px;
          border-top: 1px solid rgba(44,61,131,0.07);
          font-size: 13.5px; font-weight: 700; color: ${GOLD_DARK};
          background: none; border-left:none; border-right:none; border-bottom:none;
          cursor: pointer; font-family: 'Inter', sans-serif; text-align: left; width: 100%;
        }

        @media (max-width: 768px) {
          .on-links, .on-actions { display: none !important; }
          .on-hamburger { display: flex; }
          .on-mobile-menu.open { display: flex; }
          .on-bar { width: 92%; }
          .on-breadcrumb { width: 92%; }
          .on-mobile-menu { width: 92%; }
        }
      `}</style>

      <div className="on-outer">
        {/* ── Pill navbar ── */}
        <div className="on-bar">

          {/* LEFT — blue brand */}
          <Link to="/officer-assignments" className="on-left">
            <div className="on-logo"><img src={wcdLogo} alt="WCD" /></div>
            <div className="on-brand-text">
              <div className="on-brand-name">WCD Portal</div>
              <div className="on-brand-sub">Inspection Officer</div>
            </div>
          </Link>

          {/* RIGHT — gold section */}
          <div className="on-right">

            {/* Nav links */}
            <div className="on-links">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`on-link${isActive(l.to) ? " active" : ""}`}
                >
                  {l.icon}
                  {lang === "mr" ? l.labelMr : l.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="on-actions">
              {/* Lang toggle */}
              {onLangChange && (
                <div className="on-lang">
                  <button className={`on-lang-btn${lang === "en" ? " active" : ""}`} onClick={() => onLangChange("en")}>EN</button>
                  <button
                    className={`on-lang-btn${lang === "mr" ? " active" : ""}`}
                    onClick={() => onLangChange("mr")}
                    style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}
                  >मर</button>
                </div>
              )}

              {/* Login / Logout toggle */}
              <button className="on-toggle" onClick={handleToggle}>
                {loggedIn
                  ? <><FiLogOut size={13} />{lang === "mr" ? "बाहेर पडा" : "Logout"}</>
                  : <><FiLogIn  size={13} />{lang === "mr" ? "लॉगिन" : "Login"}</>
                }
              </button>
            </div>

            {/* Mobile hamburger */}
            <button className="on-hamburger" onClick={() => setOpen(!open)}>
              {open ? <FiX size={16} color="#1d2a60" /> : <FiMenu size={16} color="#1d2a60" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`on-mobile-menu${open ? " open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`on-mobile-link${isActive(l.to) ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.icon}
              {lang === "mr" ? l.labelMr : l.label}
            </Link>
          ))}
          <button className="on-mobile-toggle" onClick={handleToggle}>
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
  "/officer-assignments": { en: "My Assignments", mr: "माझ्या नेमणुका" },
  "/officer-report":      { en: "Submit Report",  mr: "अहवाल सादर करा" },
  "/officer-reports":     { en: "My Reports",     mr: "माझे अहवाल" },
  "/officer-login":       { en: "Login",          mr: "लॉगिन" },
};

function BreadCrumb({ location, lang }) {
  const name = ROUTE_NAMES[location.pathname];
  if (!name) return null;
  return (
    <div className="on-breadcrumb">
      <span className="on-bc-home">WCD Portal</span>
      <FiChevronRight size={11} />
      <span className="on-bc-sep">Inspection Officer</span>
      <FiChevronRight size={11} />
      <span className="on-bc-curr">{name[lang] || name.en}</span>
    </div>
  );
}