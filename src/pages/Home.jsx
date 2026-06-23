import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../assets/background2.jpg";
import cmPhoto from "../assets/cm1.png";
import ekPhoto from "../assets/ek1.jfif";
import sunetraPhoto from "../assets/sunetra4.png";
import aaditiPhoto from "../assets/Aaditi1.jpg";
import meghanaPhoto from "../assets/meghana.png";

import wcdLogo from "../assets/wcdlogo.jpg";
import shasanLogo from "../assets/maharashtrashasan.jfif";
import satyaLogo from "../assets/satya.png";

export default function Home() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("mr"); // "mr" | "en"

  const t = {
    badge: {
      mr: "✦ POSH अनुपालन व्यवस्थापन प्रणाली",
      en: "✦ POSH Compliance Management System",
    },
    deptTitle: {
      mr: "महिला व बालविकास विभाग",
      en: "Women and Child Development Department",
    },
    deptSub: {
      mr: "महाराष्ट्र शासन",
      en: "Maharashtra Shasan",
    },
    desc: {
      mr: "कामाच्या ठिकाणी महिलांच्या सुरक्षेसाठी आणि लैंगिक छळवणुकीस प्रतिबंध करण्यासाठी POSH कायद्यांतर्गत अनुपालन तपासणी, नोंदणी आणि सर्वेक्षण यासाठी तयार केलेले अधिकृत व्यासपीठ",
      en: "An official platform built for POSH Act compliance inspection, registration and survey — ensuring safety for women at the workplace and prevention of sexual harassment",
    },
    registerBtn: {
      mr: "🚀 सुरुवात करा — नोंदणी करा",
      en: "🚀 Get Started — Register",
    },
    loginBtn: {
      mr: "Login करा",
      en: "Login",
    },
  };

  const officials = [
    {
      photo: cmPhoto,
      nameMr: "मुख्यमंत्री",
      nameEn: "Devendra Fadnavis",
      roleMr: "महाराष्ट्र राज्य",
      roleEn: "Chief Minister of Maharashtra",
    },
    {
      photo: ekPhoto,
      nameMr: "उपमुख्यमंत्री",
      nameEn: "Eknath Shinde",
      roleMr: "महाराष्ट्र राज्य",
      roleEn: "Deputy Chief Minister of Maharashtra",
    },
    {
      photo: sunetraPhoto,
      nameMr: "सुनेत्रा पवार",
      nameEn: "Sunetra Ajit Pawar",
      roleMr: "उपमुख्यमंत्री, महाराष्ट्र राज्य",
      roleEn: "Deputy Chief Minister of Maharashtra",
    },
    {
      photo: aaditiPhoto,
      nameMr: "आदिती तटकरे",
      nameEn: "Smt. Aditi Varda Sunil Tatkare",
      roleMr: "मंत्री, महिला व बालविकास विभाग",
      roleEn: "Minister, Women and Child Development Department, Maharashtra",
    },
    {
      photo: meghanaPhoto,
      nameMr: "मेघना बोर्डीकर",
      nameEn: "Smt. Meghana Deepak Sakore Bordikar",
      roleMr: "राज्यमंत्री, महिला व बालविकास विभाग",
      roleEn: "State Minister, Women and Child Development Department, Maharashtra",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --pink:   #CD366B;
          --blue:   #2C3D83;
          --yellow: #E0B978;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home-root { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* ══ HERO ══ */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 36px 24px 40px;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
        }
        .hero::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(165deg, rgba(44,61,131,0.82) 0%, rgba(19,27,77,0.88) 55%, rgba(205,54,107,0.55) 100%);
          z-index: 1;
        }
        .hero > * { position: relative; z-index: 2; }

        @keyframes floatBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        /* ── Lang toggle ── */
        .hero-lang-toggle {
          position: absolute;
          top: 22px; right: 24px;
          z-index: 5;
          display: flex;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(224,185,120,0.4);
          border-radius: 999px;
          padding: 4px;
          gap: 4px;
          backdrop-filter: blur(6px);
        }
        .hero-lang-btn {
          padding: 6px 16px;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-size: 12.5px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hero-lang-btn--active {
          background: linear-gradient(135deg, var(--yellow), #c79a5a);
          color: #1a1a2e;
          box-shadow: 0 4px 12px rgba(224,185,120,0.4);
        }
        .hero-lang-btn:not(.hero-lang-btn--active):hover { color: #fff; }

        /* ── Logos row ── */
        .hero-logos {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .hero-logo-wrap {
          width: 56px; height: 56px;
          border-radius: 14px;
          background: rgba(255,255,255,0.92);
          display: flex; align-items: center; justify-content: center;
          padding: 6px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          flex-shrink: 0;
        }
        .hero-logo-wrap img {
          width: 100%; height: 100%;
          object-fit: contain;
          border-radius: 6px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(224,185,120,0.16);
          border: 1px solid rgba(224,185,120,0.45);
          color: var(--yellow);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 999px;
          margin-bottom: 16px;
        }

        .hero-dept-title {
          font-family: 'Tiro Devanagari Marathi', serif;
          font-size: clamp(30px, 5.5vw, 50px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.18;
          margin-bottom: 6px;
          text-shadow: 0 4px 28px rgba(0,0,0,0.4);
          letter-spacing: -0.5px;
        }
        .hero-dept-sub {
          font-size: clamp(13.5px, 2vw, 17px);
          font-weight: 700;
          color: var(--yellow);
          margin-bottom: 16px;
          letter-spacing: 0.3px;
        }

        .hero-title-underline {
          width: 70px; height: 4px;
          background: linear-gradient(90deg, var(--pink), var(--yellow));
          border-radius: 2px;
          margin: 0 auto 16px;
          animation: shimmer 2.5s ease-in-out infinite;
        }
        @keyframes shimmer { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }

        .hero-desc {
          font-family: 'Tiro Devanagari Marathi', serif;
          font-size: clamp(13px, 1.9vw, 16.5px);
          font-weight: 600;
          color: rgba(255,255,255,0.92);
          max-width: 680px;
          margin: 0 auto 28px;
          line-height: 1.7;
          text-shadow: 0 2px 12px rgba(0,0,0,0.25);
        }

        .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 34px; }

        .hero-btn-primary {
          padding: 13px 32px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #E94584, var(--pink));
          color: #fff;
          font-weight: 700;
          font-size: 14.5px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 8px 26px rgba(205,54,107,0.45);
        }
        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(205,54,107,0.55); }

        .hero-btn-outline {
          padding: 13px 32px;
          border-radius: 12px;
          border: 2px solid var(--yellow);
          background: transparent;
          color: var(--yellow);
          font-weight: 700;
          font-size: 14.5px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hero-btn-outline:hover { background: rgba(224,185,120,0.14); transform: translateY(-2px); }

        /* ── Officials row ── */
        .hero-officials {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 980px;
        }
        .hero-official-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 152px;
        }
        .hero-official-photo-wrap {
          width: 98px; height: 98px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, var(--yellow), var(--pink));
          margin-bottom: 10px;
          box-shadow: 0 8px 22px rgba(0,0,0,0.3);
          flex-shrink: 0;
          overflow: hidden;
        }
        .hero-official-photo {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: top center;
          border: 2.5px solid rgba(19,27,77,0.9);
          display: block;
        }
        .hero-official-name-mr {
          font-family: 'Tiro Devanagari Marathi', serif;
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          text-align: center;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0,0,0,0.35);
        }
        .hero-official-role-mr {
          font-family: 'Tiro Devanagari Marathi', serif;
          font-size: 15.5px;
          font-weight: 700;
          color: var(--yellow);
          text-align: center;
          margin-top: 4px;
          line-height: 1.4;
        }
        

        .hero-official-text-en {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        .hero-official-name-mr.hero-official-text-en {
          font-size: 14px;
        }
        .hero-official-role-mr.hero-official-text-en {
          font-size: 11.5px;
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 768px) {
          .hero { min-height: auto; padding: 40px 16px 36px; }
          .hero-official-card { width: 110px; }
          .hero-official-photo-wrap { width: 64px; height: 64px; }
          .hero-official-name-mr { font-size: 11px; }
          .hero-official-role-mr { font-size: 8.5px; }
          .hero-logo-wrap { width: 46px; height: 46px; }
        }

        @media (max-width: 480px) {
          .hero-btns { flex-direction: column; align-items: center; }
          .hero-btn-primary, .hero-btn-outline { width: 100%; max-width: 300px; text-align: center; }
          .hero-officials { gap: 12px; }
          .hero-official-card { width: 88px; }
          .hero-official-photo-wrap { width: 54px; height: 54px; }
          .hero-official-name-mr { font-size: 9.5px; }
          .hero-official-role-mr { display: none; }
        }

        @media (max-width: 360px) {
          .hero-dept-title { font-size: 28px; }
        }
      `}</style>

      <div className="home-root">
        {/* ══ HERO ══ */}
        <div className="hero">
          <div className="hero-lang-toggle">
            <button
              className={`hero-lang-btn ${lang === "mr" ? "hero-lang-btn--active" : ""}`}
              onClick={() => setLang("mr")}
            >
              मराठी
            </button>
            <button
              className={`hero-lang-btn ${lang === "en" ? "hero-lang-btn--active" : ""}`}
              onClick={() => setLang("en")}
            >
              English
            </button>
          </div>

          {/* ── Logos ── */}
          <div className="hero-logos">
            <div className="hero-logo-wrap">
              <img src={wcdLogo} alt="WCD Logo" />
            </div>
            <div className="hero-logo-wrap">
              <img src={shasanLogo} alt="Maharashtra Shasan" />
            </div>
            <div className="hero-logo-wrap">
              <img src={satyaLogo} alt="Satya Logo" />
            </div>
          </div>

          <div className="hero-badge">{t.badge[lang]}</div>

          <h1 className="hero-dept-title">{t.deptTitle[lang]}</h1>
          <p className="hero-dept-sub">{t.deptSub[lang]}</p>

          <div className="hero-title-underline" />

          <p className="hero-desc">{t.desc[lang]}</p>

          <div className="hero-btns">
            <button className="hero-btn-primary" onClick={() => navigate("/company-register")}>
              {t.registerBtn[lang]}
            </button>
            <button className="hero-btn-outline" onClick={() => navigate("/login")}>
              {t.loginBtn[lang]}
            </button>
          </div>

          <div className="hero-officials">
            {officials.map((o, i) => (
              <div className="hero-official-card" key={i}>
                <div className="hero-official-photo-wrap">
                  <img src={o.photo} alt={o.nameEn} className="hero-official-photo" />
                </div>
                {lang === "mr" ? (
                  <>
                    <div className="hero-official-name-mr">{o.nameMr}</div>
                    <div className="hero-official-role-mr">{o.roleMr}</div>
                  </>
                ) : (
                  <>
                    <div className="hero-official-name-mr hero-official-text-en">{o.nameEn}</div>
                    <div className="hero-official-role-mr hero-official-text-en">{o.roleEn}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}