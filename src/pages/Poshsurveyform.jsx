// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosInstance from "../services/axiosInstance";
// import poshQuestions from "../data/Poshqquestionsdata";
// import {
//   FiShield,
//   FiCheckCircle,
//   FiCheckSquare,
//   FiUsers,
//   FiMapPin,
//   FiLock as FiLockSolid,
//   FiBriefcase,
//   FiArrowRight,
//   FiArrowLeft,
//   FiGlobe,
// } from "react-icons/fi";
// import bgImage from "../assets/bg.webp";
// import wcdLogo from "../assets/wcdlogo.jpg";
// import shasanLogo from "../assets/maharashtrashasan.jfif";
// import orgAxiosInstance from "../services/orgAxiosInstance";


// // ─── Theme tokens (identical to Login.jsx) ────────────────────────────────
// const PINK      = "#CD366B";
// const PINK_DARK = "#b82a5c";
// const BLUE      = "#2C3D83";
// const BLUE_DEEP = "#1d2a60";
// const GOLD      = "#E0B978";
// const CREAM     = "#FBF3EE";
// const GREEN     = "#22c55e";
// const RED       = "#ef4444";

// const TOTAL_PARTS = poshQuestions.parts.length;

// export default function PoshSurveyForm({ lang = "en", onLangChange }) {
//   const navigate   = useNavigate();
//   const [partIndex, setPartIndex] = useState(0);
//   const [answers, setAnswers]     = useState({});
//   const [loading, setLoading]     = useState(false);

//   const currentPart  = poshQuestions.parts[partIndex];
//   const progressPct  = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

//   const allAnsweredInPart = useMemo(
//     () => currentPart.questions.every((q) => answers[q.no]),
//     [currentPart, answers]
//   );

//   const setAnswer = (qNo, value) =>
//     setAnswers((prev) => ({ ...prev, [qNo]: value }));

//   const handleNext = () => {
//     if (!allAnsweredInPart) {
//       toast.error(lang === "en" ? "Please answer all questions" : "कृपया सर्व प्रश्नांची उत्तरे द्या");
//       return;
//     }
//     if (partIndex < TOTAL_PARTS - 1) {
//       setPartIndex(partIndex + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       handleSubmit();
//     }
//   };

//   const handlePrevious = () => {
//     if (partIndex > 0) {
//       setPartIndex(partIndex - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       // Build payload — POST /api/org/survey/submit
//       // Requires auth.jwt:organization → send orgToken
//       // const orgToken = localStorage.getItem("orgToken");
//       // const payload = {
//       //   responses: Object.entries(answers).map(([questionNo, value]) => ({
//       //     questionNo: Number(questionNo),
//       //     answer: value,
//       //   })),
//       // };

//         const orgToken = localStorage.getItem("orgToken");
//       const payload = {
//         answers: Object.entries(answers).map(([questionNo, value]) => ({
//           questionid: Number(questionNo),
//           answer: value,
//         })),
//       };

//       const res = await orgAxiosInstance.post("/survey/submit", payload, {
//         headers: orgToken ? { Authorization: `Bearer ${orgToken}` } : {},
//       });
//       const data = res.data;

//       if (!data.success) {
//         toast.error(data.message || (lang === "en" ? "Submission failed" : "सबमिशन अयशस्वी"));
//         return;
//       }

//       toast.success(lang === "en" ? "Survey submitted successfully!" : "सर्वेक्षण यशस्वीरित्या सबमिट झाले!");
//       localStorage.removeItem("orgToken");
//       localStorage.removeItem("companyUser");
//       navigate("/company-login");

//     } catch (error) {
//       toast.error(error?.response?.data?.message || (lang === "en" ? "Server error" : "सर्व्हर एरर"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const t = {
//     partOf:     lang === "en" ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`,
//     yes:        lang === "en" ? "Yes"        : "होय",
//     no:         lang === "en" ? "No"         : "नाही",
//     previous:   lang === "en" ? "Previous"   : "मागे",
//     next:       lang === "en" ? "Next"       : "पुढे",
//     submit:     lang === "en" ? "Submit Survey" : "सबमिट करा",
//     submitting: lang === "en" ? "Submitting…" : "सबमिट करत आहे…",
//   };

//   // answered count for this part
//   const answeredCount = currentPart.questions.filter((q) => answers[q.no]).length;
//   const totalInPart   = currentPart.questions.length;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tiro+Devanagari+Marathi&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }

//         /* ── Page ── */
//         .psf-page {
//           min-height: 100vh; width: 100%;
//           background-color: ${CREAM};
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           display: flex; flex-direction: column;
//           position: relative;
//         }
//         .psf-page::before {
//           content: '';
//           position: fixed; inset: 0;
//           background-image: url(${bgImage});
//           background-size: cover; background-position: center;
//           opacity: 0.025; z-index: 0; pointer-events: none;
//         }
//         .psf-page > * { position: relative; z-index: 1; }



//         /* ── Main ── */
//         .psf-main {
//           flex: 1; display: flex; align-items: flex-start; justify-content: center;
//           gap: 32px; padding: 48px 40px; flex-wrap: wrap;
//         }

//         /* ── LEFT: Survey card ── */
//         .psf-card {
//           width: 100%; max-width: 580px;
//           background: #fff; border-radius: 20px;
//           border-top: 4px solid ${PINK};
//           box-shadow: 0 18px 50px rgba(44,61,131,0.08);
//           padding: 34px 38px 30px;
//           animation: psfIn .45s cubic-bezier(.22,.9,.36,1) both;
//         }
//         @keyframes psfIn {
//           from{opacity:0;transform:translateY(18px)}
//           to{opacity:1;transform:translateY(0)}
//         }

//         /* Brand row */
//         .psf-brand-row {
//           display: flex; align-items: center; justify-content: space-between;
//           padding-bottom: 18px; margin-bottom: 20px;
//           border-bottom: 1px solid rgba(44,61,131,0.08);
//         }
//         .psf-brand { display: flex; align-items: center; gap: 13px; }
//         .psf-brand-icon {
//           width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
//           background: rgba(205,54,107,0.10); overflow: hidden;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .psf-brand-icon img { width:100%; height:100%; object-fit:cover; border-radius:14px; }
//         .psf-brand-title { color: ${BLUE_DEEP}; font-size: 18px; font-weight: 800; line-height: 1.2; }
//         .psf-brand-sub   { color: ${PINK}; font-size: 12.5px; font-weight: 600; margin-top: 2px; }
//         .psf-version-pill {
//           font-size: 11.5px; font-weight: 700; color: ${PINK};
//           background: rgba(205,54,107,0.08); padding: 5px 12px; border-radius: 999px;
//         }

//         /* Progress bar */
//         .psf-progress-wrap { margin-bottom: 20px; }
//         .psf-progress-meta {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 8px;
//         }
//         .psf-progress-label {
//           font-size: 11.5px; font-weight: 700; color: rgba(44,61,131,0.55);
//           text-transform: uppercase; letter-spacing: 0.8px;
//         }
//         .psf-progress-pct { font-size: 12px; font-weight: 800; color: ${PINK}; }
//         .psf-progress-track {
//           height: 6px; background: rgba(44,61,131,0.08); border-radius: 99px; overflow: hidden;
//         }
//         .psf-progress-fill {
//           height: 100%;
//           background: linear-gradient(90deg, ${PINK}, #e94584);
//           border-radius: 99px;
//           box-shadow: 0 0 8px rgba(205,54,107,0.4);
//           transition: width 0.35s ease;
//         }

//         /* Part heading */
//         .psf-part-head {
//           display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
//         }
//         .psf-part-icon {
//           width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
//           background: rgba(205,54,107,0.10);
//           display: flex; align-items: center; justify-content: center; color: ${PINK};
//         }
//         .psf-part-title {
//           font-size: 15px; font-weight: 800; color: ${BLUE_DEEP}; flex: 1;
//         }
//         .psf-part-count {
//           font-size: 11.5px; font-weight: 700; color: rgba(44,61,131,0.45);
//           background: rgba(44,61,131,0.06); padding: 4px 10px; border-radius: 999px;
//         }

//         /* Questions */
//         .psf-questions { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }

//         .psf-q-card {
//           border: 1px solid rgba(44,61,131,0.10); border-radius: 14px;
//           padding: 16px 18px; transition: all .2s;
//           background: rgba(44,61,131,0.015);
//         }
//         .psf-q-card:hover { border-color: rgba(205,54,107,0.20); box-shadow: 0 4px 16px rgba(205,54,107,0.08); }
//         .psf-q-card.answered { border-color: rgba(44,61,131,0.15); background: rgba(44,61,131,0.025); }

//         .psf-q-text {
//           font-size: 13.5px; line-height: 1.65; color: ${BLUE_DEEP}; margin-bottom: 12px;
//           font-family: ${`'Inter', sans-serif`};
//         }
//         .psf-q-text.mr { font-family: 'Tiro Devanagari Marathi', serif; font-size: 14px; }
//         .psf-q-no { color: ${PINK}; font-weight: 800; margin-right: 4px; }

//         .psf-q-options { display: flex; gap: 8px; }
//         .psf-opt {
//           flex: 1; padding: 10px 0; border-radius: 10px;
//           border: 1.5px solid rgba(44,61,131,0.12);
//           background: #fff; color: ${BLUE_DEEP};
//           font-size: 13px; font-weight: 700; font-family: 'Inter', sans-serif;
//           cursor: pointer; transition: all .18s;
//         }
//         .psf-opt:hover { border-color: ${PINK}; background: rgba(205,54,107,0.04); }

//         .psf-opt.yes-active {
//           background: linear-gradient(135deg, #22c55e, #16a34a);
//           color: #fff; border-color: transparent;
//           box-shadow: 0 4px 14px rgba(34,197,94,0.30);
//         }
//         .psf-opt.no-active {
//           background: linear-gradient(135deg, #f87171, #ef4444);
//           color: #fff; border-color: transparent;
//           box-shadow: 0 4px 14px rgba(239,68,68,0.28);
//         }

//         /* Nav buttons */
//         .psf-btn-row { display: flex; gap: 10px; }
//         .psf-sbtn {
//           flex: 1; padding: 14px; border: none; border-radius: 12px;
//           font-size: 14.5px; font-weight: 700; cursor: pointer;
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
//           background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
//           box-shadow: 0 10px 26px rgba(205,54,107,0.32);
//         }
//         .psf-sbtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
//         .psf-sbtn:disabled { opacity: 0.5; cursor: not-allowed; }
//         .psf-ghost {
//           flex: 0 0 auto; padding: 14px 20px; border-radius: 12px;
//           border: 1.5px solid rgba(44,61,131,0.15);
//           background: #fff; color: ${BLUE_DEEP};
//           font-size: 14.5px; font-weight: 700; cursor: pointer;
//           display: flex; align-items: center; gap: 7px;
//           transition: all .2s; font-family: 'Inter', sans-serif;
//         }
//         .psf-ghost:hover { background: rgba(44,61,131,0.04); border-color: rgba(44,61,131,0.28); }

//         @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
//         .psf-fade { animation: fadeUp .25s ease both; }

//         /* ── RIGHT: Info column ── */
//         .psf-info-col { width: 100%; max-width: 340px; display: flex; flex-direction: column; gap: 14px; }

//         .psf-info-card {
//           background: linear-gradient(165deg, ${BLUE} 0%, ${BLUE_DEEP} 100%);
//           border-radius: 20px; padding: 28px 24px 24px; text-align: center;
//           box-shadow: 0 18px 50px rgba(29,42,96,0.30);
//           animation: psfIn .45s cubic-bezier(.22,.9,.36,1) .08s both;
//         }
//         .psf-badge-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 18px; }
//         .psf-logo-badge {
//           width: 50px; height: 50px; border-radius: 13px; flex-shrink: 0;
//           background: rgba(255,255,255,0.95); padding: 5px; overflow: hidden;
//           border: 1.5px solid rgba(255,255,255,0.3);
//           display: flex; align-items: center; justify-content: center;
//         }
//         .psf-logo-badge img { width:100%; height:100%; object-fit:contain; border-radius:6px; }

//         .psf-info-title { color: #fff; font-size: 21px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
//         .psf-info-sub   { color: rgba(255,255,255,0.55); font-size: 12.5px; margin-bottom: 14px; }
//         .psf-portal-pill {
//           display: inline-flex; align-items: center; gap: 6px;
//           color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
//           background: linear-gradient(135deg, ${PINK}, ${PINK_DARK});
//           padding: 7px 16px; border-radius: 999px;
//           box-shadow: 0 8px 20px rgba(205,54,107,0.45); margin-bottom: 16px;
//         }
//         .psf-info-desc { color: rgba(255,255,255,0.55); font-size: 12px; line-height: 1.55; margin-bottom: 20px; }

//         /* Overall progress ring-style stat */
//         .psf-overall-progress {
//           background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
//           border-radius: 16px; padding: 16px 12px; margin-bottom: 4px;
//         }
//         .psf-op-label { color: rgba(255,255,255,0.55); font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 10px; }
//         .psf-op-track { height: 8px; background: rgba(255,255,255,0.10); border-radius: 99px; overflow: hidden; margin-bottom: 8px; }
//         .psf-op-fill {
//           height: 100%; border-radius: 99px;
//           background: linear-gradient(90deg, ${PINK}, #e94584);
//           box-shadow: 0 0 10px rgba(205,54,107,0.5);
//           transition: width .5s ease;
//         }
//         .psf-op-meta { display: flex; justify-content: space-between; }
//         .psf-op-num  { color: #fff; font-size: 13px; font-weight: 800; }
//         .psf-op-total{ color: rgba(255,255,255,0.45); font-size: 12px; }

//         .psf-stats { display: flex; gap: 9px; margin-top: 12px; }
//         .psf-stat {
//           flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
//           border-radius: 12px; padding: 12px 6px;
//         }
//         .psf-stat-icon {
//           width: 26px; height: 26px; border-radius: 7px; margin: 0 auto 6px;
//           background: rgba(205,54,107,0.22);
//           display: flex; align-items: center; justify-content: center; color: ${PINK};
//         }
//         .psf-stat-num   { color: #fff; font-size: 16px; font-weight: 800; }
//         .psf-stat-label { color: rgba(255,255,255,0.5); font-size: 9.5px; margin-top: 2px; }

//         /* Parts tracker card */
//         .psf-parts-card {
//           background: #fff; border-radius: 18px; padding: 22px 20px 20px;
//           box-shadow: 0 12px 34px rgba(44,61,131,0.08);
//           animation: psfIn .45s cubic-bezier(.22,.9,.36,1) .14s both;
//         }
//         .psf-parts-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
//         .psf-parts-label { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(44,61,131,0.45); }
//         .psf-parts-tag   { font-size: 12px; font-weight: 700; color: ${PINK}; }

//         .psf-parts-list { display: flex; flex-direction: column; gap: 8px; }
//         .psf-part-row {
//           display: flex; align-items: center; gap: 10px;
//           padding: 9px 11px; border-radius: 10px;
//           border: 1px solid rgba(44,61,131,0.08);
//           background: rgba(44,61,131,0.02); transition: all .15s;
//         }
//         .psf-part-row.active-part {
//           border-color: rgba(205,54,107,0.22);
//           background: rgba(205,54,107,0.04);
//         }
//         .psf-part-row.done-part {
//           border-color: rgba(44,61,131,0.12);
//           background: rgba(44,61,131,0.03);
//         }
//         .psf-part-dot {
//           width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 10px; font-weight: 800;
//           background: rgba(44,61,131,0.08); color: rgba(44,61,131,0.45);
//         }
//         .psf-part-row.active-part .psf-part-dot {
//           background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}); color: #fff;
//         }
//         .psf-part-row.done-part .psf-part-dot {
//           background: ${BLUE}; color: #fff;
//         }
//         .psf-part-name { font-size: 11.5px; font-weight: 700; color: ${BLUE_DEEP}; flex: 1; line-height: 1.3; }
//         .psf-part-badge {
//           font-size: 9.5px; font-weight: 700;
//           padding: 2px 8px; border-radius: 999px;
//           background: rgba(34,197,94,0.12); color: #15803d;
//         }

//         .psf-secure-note {
//           display: flex; align-items: center; gap: 7px;
//           font-size: 11.5px; color: rgba(44,61,131,0.45); font-weight: 500;
//           padding-top: 14px; margin-top: 14px;
//           border-top: 1px solid rgba(44,61,131,0.08);
//         }

//         /* Footer */
//         .psf-footer {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 18px 40px; border-top: 1px solid rgba(44,61,131,0.08);
//           font-size: 12.5px; color: rgba(44,61,131,0.45);
//         }
//         .psf-footer-links { display: flex; gap: 20px; }
//         .psf-footer-links a { color: rgba(44,61,131,0.45); text-decoration: none; }
//         .psf-footer-links a:hover { color: ${BLUE}; }

//         @media (max-width: 960px) {
//           .psf-main { flex-direction: column; align-items: center; padding: 32px 20px; }
//           .psf-footer { flex-direction: column; gap: 8px; text-align: center; padding: 14px 20px; }
//           .psf-q-options { flex-direction: column; }
//         }
//       `}</style>

//       <div className="psf-page">



//         {/* ── Main ── */}
//         <main className="psf-main">

//           {/* ════ LEFT: Survey Card ════ */}
//           <div className="psf-card">

//             {/* Brand row */}
//             <div className="psf-brand-row">
//               <div className="psf-brand">
//                 <div className="psf-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
//                 <div>
//                   <div className="psf-brand-title">POSH Survey</div>
//                   <div className="psf-brand-sub">Inspection Portal</div>
//                 </div>
//               </div>
//               <span className="psf-version-pill">v2.0</span>
//             </div>

//             {/* Progress */}
//             <div className="psf-progress-wrap">
//               <div className="psf-progress-meta">
//                 <span className="psf-progress-label">{t.partOf}</span>
//                 <span className="psf-progress-pct">{progressPct}%</span>
//               </div>
//               <div className="psf-progress-track">
//                 <div className="psf-progress-fill" style={{ width: `${progressPct}%` }} />
//               </div>
//             </div>

//             {/* Part heading */}
//             <div className="psf-part-head">
//               <div className="psf-part-icon"><FiShield size={15} /></div>
//               <div className="psf-part-title">{currentPart.title[lang]}</div>
//               <div className="psf-part-count">{answeredCount}/{totalInPart}</div>
//             </div>

//             {/* Questions */}
//             <div className="psf-questions psf-fade">
//               {currentPart.questions.map((q) => (
//                 <div
//                   className={`psf-q-card${answers[q.no] ? " answered" : ""}`}
//                   key={q.no}
//                 >
//                   <p className={`psf-q-text${lang === "mr" ? " mr" : ""}`}>
//                     <span className="psf-q-no">{q.no}.</span> {q[lang]}
//                   </p>
//                   <div className="psf-q-options">
//                     <button
//                       className={`psf-opt${answers[q.no] === "yes" ? " yes-active" : ""}`}
//                       onClick={() => setAnswer(q.no, "yes")}
//                     >
//                       ✓ {t.yes}
//                     </button>
//                     <button
//                       className={`psf-opt${answers[q.no] === "no" ? " no-active" : ""}`}
//                       onClick={() => setAnswer(q.no, "no")}
//                     >
//                       ✗ {t.no}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Nav Buttons */}
//             <div className="psf-btn-row">
//               {partIndex > 0 && (
//                 <button className="psf-ghost" onClick={handlePrevious} disabled={loading}>
//                   <FiArrowLeft size={15} /> {t.previous}
//                 </button>
//               )}
//               <button className="psf-sbtn" onClick={handleNext} disabled={loading}>
//                 {loading
//                   ? t.submitting
//                   : partIndex === TOTAL_PARTS - 1
//                   ? t.submit
//                   : t.next}
//                 {!loading && (partIndex === TOTAL_PARTS - 1
//                   ? <FiCheckCircle size={16} />
//                   : <FiArrowRight size={16} />)}
//               </button>
//             </div>
//           </div>

//           {/* ════ RIGHT: Info column ════ */}
//           <div className="psf-info-col">

//             {/* Blue info card */}
//             <div className="psf-info-card">
//               <div className="psf-badge-row">
//                 <div className="psf-logo-badge"><img src={wcdLogo} alt="WCD" /></div>
//                 <div className="psf-logo-badge"><img src={shasanLogo} alt="Shasan" /></div>
//               </div>
//               <h2 className="psf-info-title">POSH Survey</h2>
//               <p className="psf-info-sub">Maharashtra State</p>
//               <div className="psf-portal-pill"><FiShield size={11} /> COMPLIANCE PORTAL</div>
//               <p className="psf-info-desc">
//                 Women &amp; Child Development —<br />
//                 POSH Compliance Inspection System
//               </p>

//               {/* Overall progress */}
//               <div className="psf-overall-progress">
//                 <div className="psf-op-label">Overall Progress</div>
//                 <div className="psf-op-track">
//                   <div className="psf-op-fill" style={{ width: `${progressPct}%` }} />
//                 </div>
//                 <div className="psf-op-meta">
//                   <span className="psf-op-num">Part {partIndex + 1}</span>
//                   <span className="psf-op-total">of {TOTAL_PARTS} Parts</span>
//                 </div>
//               </div>

//               <div className="psf-stats">
//                 <div className="psf-stat">
//                   <div className="psf-stat-icon"><FiCheckSquare size={13} /></div>
//                   <div className="psf-stat-num">{Object.keys(answers).length}</div>
//                   <div className="psf-stat-label">Answered</div>
//                 </div>
//                 <div className="psf-stat">
//                   <div className="psf-stat-icon"><FiShield size={13} /></div>
//                   <div className="psf-stat-num">{TOTAL_PARTS}</div>
//                   <div className="psf-stat-label">Parts</div>
//                 </div>
//                 <div className="psf-stat">
//                   <div className="psf-stat-icon"><FiMapPin size={13} /></div>
//                   <div className="psf-stat-num">34</div>
//                   <div className="psf-stat-label">Districts</div>
//                 </div>
//               </div>
//             </div>

//             {/* Parts tracker */}
//             <div className="psf-parts-card">
//               <div className="psf-parts-head">
//                 <span className="psf-parts-label">Survey Parts</span>
//                 <span className="psf-parts-tag">{partIndex + 1} of {TOTAL_PARTS}</span>
//               </div>
//               <div className="psf-parts-list">
//                 {poshQuestions.parts.map((p, i) => (
//                   <div
//                     key={i}
//                     className={`psf-part-row${i === partIndex ? " active-part" : i < partIndex ? " done-part" : ""}`}
//                   >
//                     <div className="psf-part-dot">{i < partIndex ? "✓" : i + 1}</div>
//                     <div className="psf-part-name">{p.title[lang]}</div>
//                     {i < partIndex && <span className="psf-part-badge">Done</span>}
//                   </div>
//                 ))}
//               </div>
//               <div className="psf-secure-note">
//                 <FiLockSolid size={13} /> Secure Government Portal · 256-bit SSL
//               </div>
//             </div>

//           </div>
//         </main>

//         {/* ── Footer ── */}
//         <footer className="psf-footer">
//           <span>© 2025 WCD Maharashtra. All rights reserved.</span>
//           <div className="psf-footer-links">
//             <a href="#privacy">Privacy Policy</a>
//             <a href="#terms">Terms of Use</a>
//             <a href="#accessibility">Accessibility</a>
//           </div>
//         </footer>

//       </div>
//     </>
//   );
// }









// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import poshQuestions from "../data/Poshqquestionsdata";
// import {
//   FiShield,
//   FiCheckCircle,
//   FiCheckSquare,
//   FiMapPin,
//   FiLock as FiLockSolid,
//   FiArrowRight,
//   FiArrowLeft,
//   FiEdit2,
//   FiX,
//   FiAlertCircle,
//   FiMessageSquare,
// } from "react-icons/fi";
// import bgImage from "../assets/bg.webp";
// import wcdLogo from "../assets/wcdlogo.jpg";
// import shasanLogo from "../assets/maharashtrashasan.jfif";
// import orgAxiosInstance from "../services/orgAxiosInstance";

// // ─── Theme tokens (identical to Login.jsx) ────────────────────────────────
// const PINK      = "#CD366B";
// const PINK_DARK = "#b82a5c";
// const BLUE      = "#2C3D83";
// const BLUE_DEEP = "#1d2a60";
// const GOLD      = "#E0B978";
// const CREAM     = "#FBF3EE";
// const GREEN     = "#22c55e";
// const RED       = "#ef4444";
// const AMBER     = "#d97706";

// const TOTAL_PARTS = poshQuestions.parts.length;
// const TOTAL_QUESTIONS = poshQuestions.parts.reduce((a, p) => a + p.questions.length, 0);
// const ALL_QUESTIONS = poshQuestions.parts.flatMap((p) => p.questions);

// export default function PoshSurveyForm({ lang = "en", onLangChange }) {
//   const navigate   = useNavigate();
//   const [partIndex, setPartIndex] = useState(0);
//   const [answers, setAnswers]     = useState({});
//   const [loading, setLoading]     = useState(false);

//   // ── Preview modal shown after last part (first-time submission only) ──
//   const [showPreview, setShowPreview] = useState(false);

//   // ── Status-check state ──
//   const [checkingStatus, setCheckingStatus] = useState(true);
//   const [submitted, setSubmitted]           = useState(false);
//   const [canEdit, setCanEdit]               = useState(false);
//   const [reviewStatus, setReviewStatus]     = useState(null);
//   const [editableIds, setEditableIds]       = useState(new Set());
//   const [officerComments, setOfficerComments] = useState({});

//   const currentPart  = poshQuestions.parts[partIndex];
//   const progressPct  = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

//   // ── On mount: check whether this org already submitted, and whether editing is allowed ──
//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const orgToken = localStorage.getItem("orgToken");
//         const res = await orgAxiosInstance.get("/survey/status", {
//           headers: orgToken ? { Authorization: `Bearer ${orgToken}` } : {},
//         });
//         const data = res.data;

//         if (data.success && data.submitted) {
//           setSubmitted(true);
//           setCanEdit(!!data.canEdit);
//           setReviewStatus(data.status || null);

//           if (data.answers) {
//             const prefilled = {};
//             Object.entries(data.answers).forEach(([qid, val]) => {
//               prefilled[Number(qid)] = val;
//             });
//             setAnswers(prefilled);
//           }

//           if (data.editableQuestions) {
//             const ids = new Set();
//             const comments = {};
//             Object.entries(data.editableQuestions).forEach(([qid, val]) => {
//               const n = Number(qid);
//               ids.add(n);
//               comments[n] = val?.comment || "";
//             });
//             setEditableIds(ids);
//             setOfficerComments(comments);
//           }
//         } else {
//           setSubmitted(false);
//         }
//       } catch (err) {
//         // Network/API issue — fail safe by letting them use the normal form
//         setSubmitted(false);
//       } finally {
//         setCheckingStatus(false);
//       }
//     };
//     checkStatus();
//   }, []);

//   const allAnsweredInPart = useMemo(
//     () => currentPart.questions.every((q) => answers[q.no]),
//     [currentPart, answers]
//   );

//   const setAnswer = (qNo, value) =>
//     setAnswers((prev) => ({ ...prev, [qNo]: value }));

//   const handleNext = () => {
//     if (!allAnsweredInPart) {
//       toast.error(lang === "en" ? "Please answer all questions" : "कृपया सर्व प्रश्नांची उत्तरे द्या");
//       return;
//     }
//     if (partIndex < TOTAL_PARTS - 1) {
//       setPartIndex(partIndex + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       // Last part done — show preview instead of submitting directly
//       setShowPreview(true);
//     }
//   };

//   const handlePrevious = () => {
//     if (partIndex > 0) {
//       setPartIndex(partIndex - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleEditPart = (pIdx) => {
//     setShowPreview(false);
//     setPartIndex(pIdx);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const orgToken = localStorage.getItem("orgToken");
//       const payload = {
//         answers: Object.entries(answers).map(([questionNo, value]) => ({
//           questionid: Number(questionNo),
//           answer: value,
//         })),
//       };

//       const res = await orgAxiosInstance.post("/survey/submit", payload, {
//         headers: orgToken ? { Authorization: `Bearer ${orgToken}` } : {},
//       });
//       const data = res.data;

//       if (!data.success) {
//         toast.error(data.message || (lang === "en" ? "Submission failed" : "सबमिशन अयशस्वी"));
//         return;
//       }

//       toast.success(lang === "en" ? "Survey submitted successfully!" : "सर्वेक्षण यशस्वीरित्या सबमिट झाले!");
//       setShowPreview(false);
//       localStorage.removeItem("orgToken");
//       localStorage.removeItem("companyUser");
//       navigate("/company-login");

//     } catch (error) {
//       toast.error(error?.response?.data?.message || (lang === "en" ? "Server error" : "सर्व्हर एरर"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const t = {
//     partOf:     lang === "en" ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`,
//     yes:        lang === "en" ? "Yes"        : "होय",
//     no:         lang === "en" ? "No"         : "नाही",
//     previous:   lang === "en" ? "Previous"   : "मागे",
//     next:       lang === "en" ? "Next"       : "पुढे",
//     review:     lang === "en" ? "Review & Submit" : "तपासा आणि सबमिट करा",
//     submitting: lang === "en" ? "Submitting…" : "सबमिट करत आहे…",
//   };

//   const answeredCount = currentPart.questions.filter((q) => answers[q.no]).length;
//   const totalInPart   = currentPart.questions.length;

//   const partTitle = (p) => p.title?.[lang] || p.title?.en || `Part ${p.id}`;

//   // ══════════════════════════════════════════════════════
//   // Shared style block (used across ALL states below)
//   // ══════════════════════════════════════════════════════
//   const sharedStyle = (
//     <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tiro+Devanagari+Marathi&display=swap');
//       *, *::before, *::after { box-sizing: border-box; }

//       .psf-page {
//         min-height: 100vh; width: 100%;
//         background-color: ${CREAM};
//         font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//         display: flex; flex-direction: column;
//         position: relative;
//       }
//       .psf-page::before {
//         content: '';
//         position: fixed; inset: 0;
//         background-image: url(${bgImage});
//         background-size: cover; background-position: center;
//         opacity: 0.025; z-index: 0; pointer-events: none;
//       }
//       .psf-page > * { position: relative; z-index: 1; }

//       .psf-main {
//         flex: 1; display: flex; align-items: flex-start; justify-content: center;
//         gap: 32px; padding: 48px 40px; flex-wrap: wrap;
//       }

//       .psf-card {
//         width: 100%; max-width: 580px;
//         background: #fff; border-radius: 20px;
//         border-top: 4px solid ${PINK};
//         box-shadow: 0 18px 50px rgba(44,61,131,0.08);
//         padding: 34px 38px 30px;
//         animation: psfIn .45s cubic-bezier(.22,.9,.36,1) both;
//       }
//       @keyframes psfIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

//       .psf-brand-row {
//         display: flex; align-items: center; justify-content: space-between;
//         padding-bottom: 18px; margin-bottom: 20px;
//         border-bottom: 1px solid rgba(44,61,131,0.08);
//       }
//       .psf-brand { display: flex; align-items: center; gap: 13px; }
//       .psf-brand-icon {
//         width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
//         background: rgba(205,54,107,0.10); overflow: hidden;
//         display: flex; align-items: center; justify-content: center;
//       }
//       .psf-brand-icon img { width:100%; height:100%; object-fit:cover; border-radius:14px; }
//       .psf-brand-title { color: ${BLUE_DEEP}; font-size: 18px; font-weight: 800; line-height: 1.2; }
//       .psf-brand-sub   { color: ${PINK}; font-size: 12.5px; font-weight: 600; margin-top: 2px; }
//       .psf-version-pill {
//         font-size: 11.5px; font-weight: 700; color: ${PINK};
//         background: rgba(205,54,107,0.08); padding: 5px 12px; border-radius: 999px;
//       }

//       .psf-progress-wrap { margin-bottom: 20px; }
//       .psf-progress-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
//       .psf-progress-label { font-size: 11.5px; font-weight: 700; color: rgba(44,61,131,0.55); text-transform: uppercase; letter-spacing: 0.8px; }
//       .psf-progress-pct { font-size: 12px; font-weight: 800; color: ${PINK}; }
//       .psf-progress-track { height: 6px; background: rgba(44,61,131,0.08); border-radius: 99px; overflow: hidden; }
//       .psf-progress-fill { height: 100%; background: linear-gradient(90deg, ${PINK}, #e94584); border-radius: 99px; box-shadow: 0 0 8px rgba(205,54,107,0.4); transition: width 0.35s ease; }

//       .psf-part-head { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
//       .psf-part-icon { width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0; background: rgba(205,54,107,0.10); display: flex; align-items: center; justify-content: center; color: ${PINK}; }
//       .psf-part-title { font-size: 15px; font-weight: 800; color: ${BLUE_DEEP}; flex: 1; }
//       .psf-part-count { font-size: 11.5px; font-weight: 700; color: rgba(44,61,131,0.45); background: rgba(44,61,131,0.06); padding: 4px 10px; border-radius: 999px; }

//       .psf-questions { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
//       .psf-q-card { border: 1px solid rgba(44,61,131,0.10); border-radius: 14px; padding: 16px 18px; transition: all .2s; background: rgba(44,61,131,0.015); }
//       .psf-q-card:hover { border-color: rgba(205,54,107,0.20); box-shadow: 0 4px 16px rgba(205,54,107,0.08); }
//       .psf-q-card.answered { border-color: rgba(44,61,131,0.15); background: rgba(44,61,131,0.025); }
//       .psf-q-text { font-size: 13.5px; line-height: 1.65; color: ${BLUE_DEEP}; margin-bottom: 12px; }
//       .psf-q-text.mr { font-family: 'Tiro Devanagari Marathi', serif; font-size: 14px; }
//       .psf-q-no { color: ${PINK}; font-weight: 800; margin-right: 4px; }
//       .psf-q-options { display: flex; gap: 8px; }
//       .psf-opt { flex: 1; padding: 10px 0; border-radius: 10px; border: 1.5px solid rgba(44,61,131,0.12); background: #fff; color: ${BLUE_DEEP}; font-size: 13px; font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; transition: all .18s; }
//       .psf-opt:hover { border-color: ${PINK}; background: rgba(205,54,107,0.04); }
//       .psf-opt.yes-active { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border-color: transparent; box-shadow: 0 4px 14px rgba(34,197,94,0.30); }
//       .psf-opt.no-active { background: linear-gradient(135deg, #f87171, #ef4444); color: #fff; border-color: transparent; box-shadow: 0 4px 14px rgba(239,68,68,0.28); }

//       .psf-btn-row { display: flex; gap: 10px; }
//       .psf-sbtn { flex: 1; padding: 14px; border: none; border-radius: 12px; font-size: 14.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; color: #fff; transition: all .2s; font-family: 'Inter', sans-serif; background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%); box-shadow: 0 10px 26px rgba(205,54,107,0.32); }
//       .psf-sbtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
//       .psf-sbtn:disabled { opacity: 0.5; cursor: not-allowed; }
//       .psf-ghost { flex: 0 0 auto; padding: 14px 20px; border-radius: 12px; border: 1.5px solid rgba(44,61,131,0.15); background: #fff; color: ${BLUE_DEEP}; font-size: 14.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 7px; transition: all .2s; font-family: 'Inter', sans-serif; }
//       .psf-ghost:hover { background: rgba(44,61,131,0.04); border-color: rgba(44,61,131,0.28); }

//       @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
//       .psf-fade { animation: fadeUp .25s ease both; }

//       .psf-info-col { width: 100%; max-width: 340px; display: flex; flex-direction: column; gap: 14px; }
//       .psf-info-card { background: linear-gradient(165deg, ${BLUE} 0%, ${BLUE_DEEP} 100%); border-radius: 20px; padding: 28px 24px 24px; text-align: center; box-shadow: 0 18px 50px rgba(29,42,96,0.30); animation: psfIn .45s cubic-bezier(.22,.9,.36,1) .08s both; }
//       .psf-badge-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 18px; }
//       .psf-logo-badge { width: 50px; height: 50px; border-radius: 13px; flex-shrink: 0; background: rgba(255,255,255,0.95); padding: 5px; overflow: hidden; border: 1.5px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; }
//       .psf-logo-badge img { width:100%; height:100%; object-fit:contain; border-radius:6px; }
//       .psf-info-title { color: #fff; font-size: 21px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
//       .psf-info-sub   { color: rgba(255,255,255,0.55); font-size: 12.5px; margin-bottom: 14px; }
//       .psf-portal-pill { display: inline-flex; align-items: center; gap: 6px; color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase; background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}); padding: 7px 16px; border-radius: 999px; box-shadow: 0 8px 20px rgba(205,54,107,0.45); margin-bottom: 16px; }
//       .psf-info-desc { color: rgba(255,255,255,0.55); font-size: 12px; line-height: 1.55; margin-bottom: 20px; }

//       .psf-overall-progress { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 16px 12px; margin-bottom: 4px; }
//       .psf-op-label { color: rgba(255,255,255,0.55); font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 10px; }
//       .psf-op-track { height: 8px; background: rgba(255,255,255,0.10); border-radius: 99px; overflow: hidden; margin-bottom: 8px; }
//       .psf-op-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, ${PINK}, #e94584); box-shadow: 0 0 10px rgba(205,54,107,0.5); transition: width .5s ease; }
//       .psf-op-meta { display: flex; justify-content: space-between; }
//       .psf-op-num  { color: #fff; font-size: 13px; font-weight: 800; }
//       .psf-op-total{ color: rgba(255,255,255,0.45); font-size: 12px; }

//       .psf-stats { display: flex; gap: 9px; margin-top: 12px; }
//       .psf-stat { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); border-radius: 12px; padding: 12px 6px; }
//       .psf-stat-icon { width: 26px; height: 26px; border-radius: 7px; margin: 0 auto 6px; background: rgba(205,54,107,0.22); display: flex; align-items: center; justify-content: center; color: ${PINK}; }
//       .psf-stat-num   { color: #fff; font-size: 16px; font-weight: 800; }
//       .psf-stat-label { color: rgba(255,255,255,0.5); font-size: 9.5px; margin-top: 2px; }

//       .psf-parts-card { background: #fff; border-radius: 18px; padding: 22px 20px 20px; box-shadow: 0 12px 34px rgba(44,61,131,0.08); animation: psfIn .45s cubic-bezier(.22,.9,.36,1) .14s both; }
//       .psf-parts-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
//       .psf-parts-label { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(44,61,131,0.45); }
//       .psf-parts-tag   { font-size: 12px; font-weight: 700; color: ${PINK}; }
//       .psf-parts-list { display: flex; flex-direction: column; gap: 8px; }
//       .psf-part-row { display: flex; align-items: center; gap: 10px; padding: 9px 11px; border-radius: 10px; border: 1px solid rgba(44,61,131,0.08); background: rgba(44,61,131,0.02); transition: all .15s; }
//       .psf-part-row.active-part { border-color: rgba(205,54,107,0.22); background: rgba(205,54,107,0.04); }
//       .psf-part-row.done-part { border-color: rgba(44,61,131,0.12); background: rgba(44,61,131,0.03); }
//       .psf-part-dot { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; background: rgba(44,61,131,0.08); color: rgba(44,61,131,0.45); }
//       .psf-part-row.active-part .psf-part-dot { background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}); color: #fff; }
//       .psf-part-row.done-part .psf-part-dot { background: ${BLUE}; color: #fff; }
//       .psf-part-name { font-size: 11.5px; font-weight: 700; color: ${BLUE_DEEP}; flex: 1; line-height: 1.3; }
//       .psf-part-badge { font-size: 9.5px; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: rgba(34,197,94,0.12); color: #15803d; }
//       .psf-secure-note { display: flex; align-items: center; gap: 7px; font-size: 11.5px; color: rgba(44,61,131,0.45); font-weight: 500; padding-top: 14px; margin-top: 14px; border-top: 1px solid rgba(44,61,131,0.08); }

//       .psf-footer { display: flex; align-items: center; justify-content: space-between; padding: 18px 40px; border-top: 1px solid rgba(44,61,131,0.08); font-size: 12.5px; color: rgba(44,61,131,0.45); }
//       .psf-footer-links { display: flex; gap: 20px; }
//       .psf-footer-links a { color: rgba(44,61,131,0.45); text-decoration: none; }
//       .psf-footer-links a:hover { color: ${BLUE}; }

//       /* ── Loading state ── */
//       .psf-loading-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 60px 20px; }
//       .psf-spinner { width: 40px; height: 40px; border-radius: 50%; border: 4px solid rgba(205,54,107,0.15); border-top-color: ${PINK}; animation: psfSpin .8s linear infinite; }
//       @keyframes psfSpin { to { transform: rotate(360deg); } }
//       .psf-loading-text { color: ${BLUE_DEEP}; font-size: 14px; font-weight: 600; }

//       /* ── Banners ── */
//       .psf-banner { display: flex; gap: 12px; align-items: flex-start; border-radius: 14px; padding: 16px 18px; margin-bottom: 20px; }
//       .psf-banner.info { background: rgba(44,61,131,0.06); border-left: 3px solid ${BLUE}; }
//       .psf-banner.warn { background: #fef3c7; border-left: 3px solid ${AMBER}; }
//       .psf-banner-text { flex: 1; font-size: 13px; color: ${BLUE_DEEP}; line-height: 1.55; font-weight: 600; }
//       .psf-banner.warn .psf-banner-text { color: #92400e; }

//       /* ── Read-only Q&A list ── */
//       .psf-ro-part-title { font-size: 13.5px; font-weight: 800; color: ${BLUE_DEEP}; margin: 18px 0 10px; }
//       .psf-ro-part-title:first-child { margin-top: 0; }
//       .psf-ro-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(44,61,131,0.06); }
//       .psf-ro-q { flex: 1; font-size: 13px; color: ${BLUE_DEEP}; line-height: 1.6; }
//       .psf-ro-badge { flex-shrink: 0; padding: 4px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700; color: #fff; background: rgba(44,61,131,0.2); }
//       .psf-ro-badge.yes { background: ${GREEN}; }
//       .psf-ro-badge.no  { background: ${RED}; }

//       /* ── Officer comment box (resubmit view) ── */
//       .psf-officer-comment { display: flex; gap: 8px; align-items: flex-start; background: #fef3c7; border-radius: 10px; padding: 10px 12px; margin-top: 10px; }
//       .psf-officer-comment-text { flex: 1; font-size: 12.5px; color: #92400e; font-weight: 600; line-height: 1.5; }

//       /* ── Preview modal ── */
//       .psf-modal-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(29,42,96,0.5); display: flex; align-items: center; justify-content: center; padding: 20px; animation: psfFade .2s ease both; }
//       @keyframes psfFade { from{opacity:0} to{opacity:1} }
//       .psf-modal { width: 100%; max-width: 680px; max-height: 88vh; background: #fff; border-radius: 20px; border-top: 4px solid ${PINK}; box-shadow: 0 30px 70px rgba(29,42,96,0.35); display: flex; flex-direction: column; animation: psfUp .3s cubic-bezier(.22,.9,.36,1) both; }
//       @keyframes psfUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//       .psf-modal-head { display: flex; align-items: flex-start; justify-content: space-between; padding: 24px 26px 18px; border-bottom: 1px solid rgba(44,61,131,0.08); }
//       .psf-modal-title { font-size: 17px; font-weight: 800; color: ${BLUE_DEEP}; }
//       .psf-modal-sub { font-size: 12.5px; color: rgba(44,61,131,0.5); margin-top: 3px; }
//       .psf-modal-close { width: 32px; height: 32px; border-radius: 10px; border: none; background: rgba(44,61,131,0.06); color: rgba(44,61,131,0.5); display: flex; align-items: center; justify-content: center; cursor: pointer; }
//       .psf-modal-close:hover { background: rgba(44,61,131,0.12); }
//       .psf-modal-body { flex: 1; overflow-y: auto; padding: 20px 26px; }
//       .psf-modal-part { margin-bottom: 20px; }
//       .psf-modal-part-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
//       .psf-modal-part-title { font-size: 13px; font-weight: 800; color: ${BLUE_DEEP}; }
//       .psf-modal-edit-btn { display: flex; align-items: center; gap: 5px; background: rgba(205,54,107,0.08); color: ${PINK}; border: none; border-radius: 999px; padding: 5px 12px; font-size: 11.5px; font-weight: 700; cursor: pointer; }
//       .psf-modal-edit-btn:hover { background: rgba(205,54,107,0.16); }
//       .psf-modal-footer { display: flex; gap: 10px; padding: 18px 26px; border-top: 1px solid rgba(44,61,131,0.08); }

//       @media (max-width: 960px) {
//         .psf-main { flex-direction: column; align-items: center; padding: 32px 20px; }
//         .psf-footer { flex-direction: column; gap: 8px; text-align: center; padding: 14px 20px; }
//         .psf-q-options { flex-direction: column; }
//       }
//     `}</style>
//   );

//   // ══════════════════════════════════════════════════════
//   // STATE 0 — Loading (status check in flight)
//   // ══════════════════════════════════════════════════════
//   if (checkingStatus) {
//     return (
//       <>
//         {sharedStyle}
//         <div className="psf-page">
//           <div className="psf-loading-wrap">
//             <div className="psf-spinner" />
//             <div className="psf-loading-text">
//               {lang === "en" ? "Checking survey status…" : "सर्वेक्षण स्थिती तपासत आहे…"}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // ══════════════════════════════════════════════════════
//   // STATE 1 — Read-only (submitted, NOT editable — pending review or already compiled)
//   // ══════════════════════════════════════════════════════
//   if (submitted && !canEdit) {
//     return (
//       <>
//         {sharedStyle}
//         <div className="psf-page">
//           <main className="psf-main">
//             <div className="psf-card" style={{ maxWidth: 680 }}>
//               <div className="psf-brand-row">
//                 <div className="psf-brand">
//                   <div className="psf-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
//                   <div>
//                     <div className="psf-brand-title">POSH Survey</div>
//                     <div className="psf-brand-sub">Inspection Portal</div>
//                   </div>
//                 </div>
//                 <span className="psf-version-pill">v2.0</span>
//               </div>

//               <div className="psf-banner info">
//                 <FiLockSolid size={18} color={BLUE_DEEP} style={{ flexShrink: 0, marginTop: 2 }} />
//                 <div className="psf-banner-text">
//                   {reviewStatus === "compiled"
//                     ? (lang === "en"
//                         ? "Your survey has been approved. This is a view-only copy."
//                         : "तुमचे सर्वेक्षण मंजूर झाले आहे. ही फक्त पाहण्यासाठीची प्रत आहे.")
//                     : (lang === "en"
//                         ? "Your survey has already been submitted and is awaiting Inspection Officer review. It cannot be edited right now."
//                         : "तुमचे सर्वेक्षण आधीच सबमिट झाले आहे आणि निरीक्षण अधिकाऱ्याच्या पुनरावलोकनाच्या प्रतीक्षेत आहे. सध्या ते संपादित करता येणार नाही.")}
//                 </div>
//               </div>

//               {poshQuestions.parts.map((part, pIdx) => (
//                 <div key={pIdx}>
//                   <div className="psf-ro-part-title">{partTitle(part)}</div>
//                   {part.questions.map((q) => (
//                     <div key={q.no} className="psf-ro-row">
//                       <div className="psf-ro-q">
//                         <span className="psf-q-no">{q.no}.</span> {q[lang]}
//                       </div>
//                       <div className={`psf-ro-badge ${answers[q.no] === "yes" ? "yes" : answers[q.no] === "no" ? "no" : ""}`}>
//                         {answers[q.no] === "yes" ? t.yes : answers[q.no] === "no" ? t.no : "—"}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </main>

//           <footer className="psf-footer">
//             <span>© 2025 WCD Maharashtra. All rights reserved.</span>
//           </footer>
//         </div>
//       </>
//     );
//   }

//   // ══════════════════════════════════════════════════════
//   // STATE 2 — Resubmit (submitted + rejected/notcompiled → only flagged questions editable)
//   // ══════════════════════════════════════════════════════
//   if (submitted && canEdit) {
//     const flaggedQuestions = ALL_QUESTIONS.filter((q) => editableIds.has(q.no));
//     const allFlaggedAnswered = flaggedQuestions.every((q) => answers[q.no]);

//     return (
//       <>
//         {sharedStyle}
//         <div className="psf-page">
//           <main className="psf-main">
//             <div className="psf-card" style={{ maxWidth: 680 }}>
//               <div className="psf-brand-row">
//                 <div className="psf-brand">
//                   <div className="psf-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
//                   <div>
//                     <div className="psf-brand-title">POSH Survey</div>
//                     <div className="psf-brand-sub">Inspection Portal</div>
//                   </div>
//                 </div>
//                 <span className="psf-version-pill">v2.0</span>
//               </div>

//               <div className="psf-banner warn">
//                 <FiAlertCircle size={18} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
//                 <div className="psf-banner-text">
//                   {reviewStatus === "rejected"
//                     ? (lang === "en"
//                         ? `Your previous submission was rejected. Please fix ${flaggedQuestions.length} question(s) below and resubmit.`
//                         : `तुमचे मागील सबमिशन नाकारले गेले आहे. कृपया खालील ${flaggedQuestions.length} प्रश्न दुरुस्त करून पुन्हा सबमिट करा.`)
//                     : (lang === "en"
//                         ? `${flaggedQuestions.length} question(s) were marked non-compliant. Please fix them below and resubmit.`
//                         : `${flaggedQuestions.length} प्रश्न असंमत ठरले आहेत. कृपया ते खाली दुरुस्त करून पुन्हा सबमिट करा.`)}
//                 </div>
//               </div>

//               {flaggedQuestions.length === 0 ? (
//                 <p style={{ color: "rgba(44,61,131,0.5)", fontSize: 13 }}>
//                   {lang === "en" ? "No flagged questions found." : "कोणतेही चिन्हांकित प्रश्न सापडले नाहीत."}
//                 </p>
//               ) : (
//                 <div className="psf-questions">
//                   {flaggedQuestions.map((q) => (
//                     <div className={`psf-q-card${answers[q.no] ? " answered" : ""}`} key={q.no}>
//                       <p className={`psf-q-text${lang === "mr" ? " mr" : ""}`}>
//                         <span className="psf-q-no">{q.no}.</span> {q[lang]}
//                       </p>
//                       <div className="psf-q-options">
//                         <button
//                           className={`psf-opt${answers[q.no] === "yes" ? " yes-active" : ""}`}
//                           onClick={() => setAnswer(q.no, "yes")}
//                         >
//                           ✓ {t.yes}
//                         </button>
//                         <button
//                           className={`psf-opt${answers[q.no] === "no" ? " no-active" : ""}`}
//                           onClick={() => setAnswer(q.no, "no")}
//                         >
//                           ✗ {t.no}
//                         </button>
//                       </div>
//                       {officerComments[q.no] ? (
//                         <div className="psf-officer-comment">
//                           <FiMessageSquare size={13} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
//                           <div className="psf-officer-comment-text">
//                             {lang === "en" ? "Officer remark: " : "अधिकाऱ्याची टीप: "}
//                             {officerComments[q.no]}
//                           </div>
//                         </div>
//                       ) : null}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <button
//                 className="psf-sbtn"
//                 onClick={handleSubmit}
//                 disabled={loading || !allFlaggedAnswered}
//                 style={{ width: "100%" }}
//               >
//                 {loading
//                   ? t.submitting
//                   : (lang === "en" ? "Resubmit Survey" : "सर्वेक्षण पुन्हा सबमिट करा")}
//                 {!loading && <FiCheckCircle size={16} />}
//               </button>
//             </div>
//           </main>

//           <footer className="psf-footer">
//             <span>© 2025 WCD Maharashtra. All rights reserved.</span>
//           </footer>
//         </div>
//       </>
//     );
//   }

//   // ══════════════════════════════════════════════════════
//   // STATE 3 — Normal first-time flow (never submitted before)
//   // ══════════════════════════════════════════════════════
//   return (
//     <>
//       {sharedStyle}
//       <div className="psf-page">
//         <main className="psf-main">

//           {/* ════ LEFT: Survey Card ════ */}
//           <div className="psf-card">

//             <div className="psf-brand-row">
//               <div className="psf-brand">
//                 <div className="psf-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
//                 <div>
//                   <div className="psf-brand-title">POSH Survey</div>
//                   <div className="psf-brand-sub">Inspection Portal</div>
//                 </div>
//               </div>
//               <span className="psf-version-pill">v2.0</span>
//             </div>

//             <div className="psf-progress-wrap">
//               <div className="psf-progress-meta">
//                 <span className="psf-progress-label">{t.partOf}</span>
//                 <span className="psf-progress-pct">{progressPct}%</span>
//               </div>
//               <div className="psf-progress-track">
//                 <div className="psf-progress-fill" style={{ width: `${progressPct}%` }} />
//               </div>
//             </div>

//             <div className="psf-part-head">
//               <div className="psf-part-icon"><FiShield size={15} /></div>
//               <div className="psf-part-title">{partTitle(currentPart)}</div>
//               <div className="psf-part-count">{answeredCount}/{totalInPart}</div>
//             </div>

//             <div className="psf-questions psf-fade">
//               {currentPart.questions.map((q) => (
//                 <div
//                   className={`psf-q-card${answers[q.no] ? " answered" : ""}`}
//                   key={q.no}
//                 >
//                   <p className={`psf-q-text${lang === "mr" ? " mr" : ""}`}>
//                     <span className="psf-q-no">{q.no}.</span> {q[lang]}
//                   </p>
//                   <div className="psf-q-options">
//                     <button
//                       className={`psf-opt${answers[q.no] === "yes" ? " yes-active" : ""}`}
//                       onClick={() => setAnswer(q.no, "yes")}
//                     >
//                       ✓ {t.yes}
//                     </button>
//                     <button
//                       className={`psf-opt${answers[q.no] === "no" ? " no-active" : ""}`}
//                       onClick={() => setAnswer(q.no, "no")}
//                     >
//                       ✗ {t.no}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="psf-btn-row">
//               {partIndex > 0 && (
//                 <button className="psf-ghost" onClick={handlePrevious} disabled={loading}>
//                   <FiArrowLeft size={15} /> {t.previous}
//                 </button>
//               )}
//               <button className="psf-sbtn" onClick={handleNext} disabled={loading}>
//                 {partIndex === TOTAL_PARTS - 1 ? t.review : t.next}
//                 {partIndex === TOTAL_PARTS - 1
//                   ? <FiCheckCircle size={16} />
//                   : <FiArrowRight size={16} />}
//               </button>
//             </div>
//           </div>

//           {/* ════ RIGHT: Info column ════ */}
//           <div className="psf-info-col">
//             <div className="psf-info-card">
//               <div className="psf-badge-row">
//                 <div className="psf-logo-badge"><img src={wcdLogo} alt="WCD" /></div>
//                 <div className="psf-logo-badge"><img src={shasanLogo} alt="Shasan" /></div>
//               </div>
//               <h2 className="psf-info-title">POSH Survey</h2>
//               <p className="psf-info-sub">Maharashtra State</p>
//               <div className="psf-portal-pill"><FiShield size={11} /> COMPLIANCE PORTAL</div>
//               <p className="psf-info-desc">
//                 Women &amp; Child Development —<br />
//                 POSH Compliance Inspection System
//               </p>

//               <div className="psf-overall-progress">
//                 <div className="psf-op-label">Overall Progress</div>
//                 <div className="psf-op-track">
//                   <div className="psf-op-fill" style={{ width: `${progressPct}%` }} />
//                 </div>
//                 <div className="psf-op-meta">
//                   <span className="psf-op-num">Part {partIndex + 1}</span>
//                   <span className="psf-op-total">of {TOTAL_PARTS} Parts</span>
//                 </div>
//               </div>

//               <div className="psf-stats">
//                 <div className="psf-stat">
//                   <div className="psf-stat-icon"><FiCheckSquare size={13} /></div>
//                   <div className="psf-stat-num">{Object.keys(answers).length}</div>
//                   <div className="psf-stat-label">Answered</div>
//                 </div>
//                 <div className="psf-stat">
//                   <div className="psf-stat-icon"><FiShield size={13} /></div>
//                   <div className="psf-stat-num">{TOTAL_PARTS}</div>
//                   <div className="psf-stat-label">Parts</div>
//                 </div>
//                 <div className="psf-stat">
//                   <div className="psf-stat-icon"><FiMapPin size={13} /></div>
//                   <div className="psf-stat-num">34</div>
//                   <div className="psf-stat-label">Districts</div>
//                 </div>
//               </div>
//             </div>

//             <div className="psf-parts-card">
//               <div className="psf-parts-head">
//                 <span className="psf-parts-label">Survey Parts</span>
//                 <span className="psf-parts-tag">{partIndex + 1} of {TOTAL_PARTS}</span>
//               </div>
//               <div className="psf-parts-list">
//                 {poshQuestions.parts.map((p, i) => (
//                   <div
//                     key={i}
//                     className={`psf-part-row${i === partIndex ? " active-part" : i < partIndex ? " done-part" : ""}`}
//                   >
//                     <div className="psf-part-dot">{i < partIndex ? "✓" : i + 1}</div>
//                     <div className="psf-part-name">{partTitle(p)}</div>
//                     {i < partIndex && <span className="psf-part-badge">Done</span>}
//                   </div>
//                 ))}
//               </div>
//               <div className="psf-secure-note">
//                 <FiLockSolid size={13} /> Secure Government Portal · 256-bit SSL
//               </div>
//             </div>
//           </div>
//         </main>

//         <footer className="psf-footer">
//           <span>© 2025 WCD Maharashtra. All rights reserved.</span>
//           <div className="psf-footer-links">
//             <a href="#privacy">Privacy Policy</a>
//             <a href="#terms">Terms of Use</a>
//             <a href="#accessibility">Accessibility</a>
//           </div>
//         </footer>

//         {/* ── Preview Modal (first-time submission only) ── */}
//         {showPreview && (
//           <div className="psf-modal-overlay" onClick={() => setShowPreview(false)}>
//             <div className="psf-modal" onClick={(e) => e.stopPropagation()}>
//               <div className="psf-modal-head">
//                 <div>
//                   <div className="psf-modal-title">
//                     {lang === "en" ? "Review Your Answers" : "तुमची उत्तरे तपासा"}
//                   </div>
//                   <div className="psf-modal-sub">
//                     {lang === "en"
//                       ? `${Object.keys(answers).length} of ${TOTAL_QUESTIONS} answered`
//                       : `${Object.keys(answers).length} पैकी ${TOTAL_QUESTIONS} उत्तर दिले`}
//                   </div>
//                 </div>
//                 <button className="psf-modal-close" onClick={() => setShowPreview(false)} disabled={loading}>
//                   <FiX size={18} />
//                 </button>
//               </div>

//               <div className="psf-modal-body">
//                 {poshQuestions.parts.map((part, pIdx) => (
//                   <div key={pIdx} className="psf-modal-part">
//                     <div className="psf-modal-part-head">
//                       <div className="psf-modal-part-title">{partTitle(part)}</div>
//                       <button
//                         className="psf-modal-edit-btn"
//                         onClick={() => handleEditPart(pIdx)}
//                         disabled={loading}
//                       >
//                         <FiEdit2 size={12} /> {lang === "en" ? "Edit" : "बदला"}
//                       </button>
//                     </div>
//                     {part.questions.map((q) => (
//                       <div key={q.no} className="psf-ro-row">
//                         <div className="psf-ro-q">
//                           <span className="psf-q-no">{q.no}.</span> {q[lang]}
//                         </div>
//                         <div className={`psf-ro-badge ${answers[q.no] === "yes" ? "yes" : answers[q.no] === "no" ? "no" : ""}`}>
//                           {answers[q.no] === "yes"
//                             ? t.yes
//                             : answers[q.no] === "no"
//                             ? t.no
//                             : (lang === "en" ? "Not answered" : "उत्तर नाही")}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>

//               <div className="psf-modal-footer">
//                 <button className="psf-ghost" onClick={() => setShowPreview(false)} disabled={loading}>
//                   {lang === "en" ? "Continue Editing" : "संपादन सुरू ठेवा"}
//                 </button>
//                 <button className="psf-sbtn" onClick={handleSubmit} disabled={loading}>
//                   {loading
//                     ? t.submitting
//                     : (lang === "en" ? "Confirm & Submit" : "खात्री करा आणि सबमिट करा")}
//                   {!loading && <FiCheckCircle size={16} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }




import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import poshQuestions from "../data/Poshqquestionsdata";
import {
  FiShield,
  FiCheckCircle,
  FiCheckSquare,
  FiMapPin,
  FiLock as FiLockSolid,
  FiArrowRight,
  FiArrowLeft,
  FiEdit2,
  FiX,
  FiAlertCircle,
  FiMessageSquare,
} from "react-icons/fi";
import bgImage from "../assets/bg.webp";
import wcdLogo from "../assets/wcdlogo.jpg";
import shasanLogo from "../assets/maharashtrashasan.jfif";
import orgAxiosInstance from "../services/orgAxiosInstance";

// ─── Theme tokens (identical to Login.jsx) ────────────────────────────────
const PINK      = "#CD366B";
const PINK_DARK = "#b82a5c";
const BLUE      = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const GOLD      = "#E0B978";
const CREAM     = "#FBF3EE";
const GREEN     = "#22c55e";
const RED       = "#ef4444";
const AMBER     = "#d97706";

const TOTAL_PARTS = poshQuestions.parts.length;
const TOTAL_QUESTIONS = poshQuestions.parts.reduce((a, p) => a + p.questions.length, 0);
const ALL_QUESTIONS = poshQuestions.parts.flatMap((p) => p.questions);

export default function PoshSurveyForm({ lang = "en", onLangChange }) {
  const navigate   = useNavigate();
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers]     = useState({});
  const [loading, setLoading]     = useState(false);

  // ── Preview modal shown after last part (first-time submission only) ──
  const [showPreview, setShowPreview] = useState(false);

  // ── Status-check state ──
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [submitted, setSubmitted]           = useState(false);
  const [canEdit, setCanEdit]               = useState(false);
  const [reviewStatus, setReviewStatus]     = useState(null);
  const [editableIds, setEditableIds]       = useState(new Set());
  const [officerComments, setOfficerComments] = useState({});

  const currentPart  = poshQuestions.parts[partIndex];
  const progressPct  = Math.round(((partIndex + 1) / TOTAL_PARTS) * 100);

  // ── On mount: check whether this org already submitted, and whether editing is allowed ──
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const orgToken = localStorage.getItem("orgToken");
        const res = await orgAxiosInstance.get("/survey/status", {
          headers: orgToken ? { Authorization: `Bearer ${orgToken}` } : {},
        });
        const data = res.data;

        if (data.success && data.submitted) {
          setSubmitted(true);
          setCanEdit(!!data.canEdit);
          setReviewStatus(data.status || null);

          if (data.answers) {
            const prefilled = {};
            Object.entries(data.answers).forEach(([qid, val]) => {
              prefilled[Number(qid)] = val;
            });
            setAnswers(prefilled);
          }

          if (data.editableQuestions) {
            const ids = new Set();
            const comments = {};
            Object.entries(data.editableQuestions).forEach(([qid, val]) => {
              const n = Number(qid);
              ids.add(n);
              comments[n] = val?.comment || "";
            });
            setEditableIds(ids);
            setOfficerComments(comments);
          }
        } else {
          setSubmitted(false);
        }
      } catch (err) {
        // Network/API issue — fail safe by letting them use the normal form
        setSubmitted(false);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkStatus();
  }, []);

  const allAnsweredInPart = useMemo(
    () => currentPart.questions.every((q) => answers[q.no]),
    [currentPart, answers]
  );

  const setAnswer = (qNo, value) =>
    setAnswers((prev) => ({ ...prev, [qNo]: value }));

  const handleNext = () => {
    if (!allAnsweredInPart) {
      toast.error(lang === "en" ? "Please answer all questions" : "कृपया सर्व प्रश्नांची उत्तरे द्या");
      return;
    }
    if (partIndex < TOTAL_PARTS - 1) {
      setPartIndex(partIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Last part done — show preview instead of submitting directly
      setShowPreview(true);
    }
  };

  const handlePrevious = () => {
    if (partIndex > 0) {
      setPartIndex(partIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEditPart = (pIdx) => {
    setShowPreview(false);
    setPartIndex(pIdx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const orgToken = localStorage.getItem("orgToken");
      const payload = {
        answers: Object.entries(answers).map(([questionNo, value]) => ({
          questionid: Number(questionNo),
          answer: value,
        })),
      };

      const res = await orgAxiosInstance.post("/survey/submit", payload, {
        headers: orgToken ? { Authorization: `Bearer ${orgToken}` } : {},
      });
      const data = res.data;

      if (!data.success) {
        toast.error(data.message || (lang === "en" ? "Submission failed" : "सबमिशन अयशस्वी"));
        return;
      }

      toast.success(lang === "en" ? "Survey submitted successfully!" : "सर्वेक्षण यशस्वीरित्या सबमिट झाले!");
      setShowPreview(false);
      localStorage.removeItem("orgToken");
      localStorage.removeItem("companyUser");
      navigate("/company-login");

    } catch (error) {
      toast.error(error?.response?.data?.message || (lang === "en" ? "Server error" : "सर्व्हर एरर"));
    } finally {
      setLoading(false);
    }
  };

  const t = {
    partOf:     lang === "en" ? `Part ${partIndex + 1} of ${TOTAL_PARTS}` : `भाग ${partIndex + 1} / ${TOTAL_PARTS}`,
    yes:        lang === "en" ? "Yes"        : "होय",
    no:         lang === "en" ? "No"         : "नाही",
    previous:   lang === "en" ? "Previous"   : "मागे",
    next:       lang === "en" ? "Next"       : "पुढे",
    review:     lang === "en" ? "Review & Submit" : "तपासा आणि सबमिट करा",
    submitting: lang === "en" ? "Submitting…" : "सबमिट करत आहे…",
  };

  const answeredCount = currentPart.questions.filter((q) => answers[q.no]).length;
  const totalInPart   = currentPart.questions.length;

  const partTitle = (p) => p.title?.[lang] || p.title?.en || `Part ${p.id}`;

  const flaggedQuestions = ALL_QUESTIONS.filter((q) => editableIds.has(q.no));
  const allFlaggedAnswered = flaggedQuestions.every((q) => answers[q.no]);

  // ══════════════════════════════════════════════════════
  // Shared style block (used across ALL states below)
  // ══════════════════════════════════════════════════════
  const sharedStyle = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tiro+Devanagari+Marathi&display=swap');
      *, *::before, *::after { box-sizing: border-box; }

      .psf-page {
        min-height: 100vh; width: 100%;
        background-color: ${CREAM};
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        display: flex; flex-direction: column;
        position: relative;
      }
      .psf-page::before {
        content: '';
        position: fixed; inset: 0;
        background-image: url(${bgImage});
        background-size: cover; background-position: center;
        opacity: 0.025; z-index: 0; pointer-events: none;
      }
      .psf-page > * { position: relative; z-index: 1; }

      .psf-main {
        flex: 1; display: flex; align-items: flex-start; justify-content: center;
        gap: 32px; padding: 48px 40px; flex-wrap: wrap;
      }

      .psf-card {
        width: 100%; max-width: 580px;
        background: #fff; border-radius: 20px;
        border-top: 4px solid ${PINK};
        box-shadow: 0 18px 50px rgba(44,61,131,0.08);
        padding: 34px 38px 30px;
        animation: psfIn .45s cubic-bezier(.22,.9,.36,1) both;
      }
      @keyframes psfIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

      .psf-brand-row {
        display: flex; align-items: center; justify-content: space-between;
        padding-bottom: 18px; margin-bottom: 20px;
        border-bottom: 1px solid rgba(44,61,131,0.08);
      }
      .psf-brand { display: flex; align-items: center; gap: 13px; }
      .psf-brand-icon {
        width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
        background: rgba(205,54,107,0.10); overflow: hidden;
        display: flex; align-items: center; justify-content: center;
      }
      .psf-brand-icon img { width:100%; height:100%; object-fit:cover; border-radius:14px; }
      .psf-brand-title { color: ${BLUE_DEEP}; font-size: 18px; font-weight: 800; line-height: 1.2; }
      .psf-brand-sub   { color: ${PINK}; font-size: 12.5px; font-weight: 600; margin-top: 2px; }
      .psf-version-pill {
        font-size: 11.5px; font-weight: 700; color: ${PINK};
        background: rgba(205,54,107,0.08); padding: 5px 12px; border-radius: 999px;
      }

      .psf-progress-wrap { margin-bottom: 20px; }
      .psf-progress-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
      .psf-progress-label { font-size: 11.5px; font-weight: 700; color: rgba(44,61,131,0.55); text-transform: uppercase; letter-spacing: 0.8px; }
      .psf-progress-pct { font-size: 12px; font-weight: 800; color: ${PINK}; }
      .psf-progress-track { height: 6px; background: rgba(44,61,131,0.08); border-radius: 99px; overflow: hidden; }
      .psf-progress-fill { height: 100%; background: linear-gradient(90deg, ${PINK}, #e94584); border-radius: 99px; box-shadow: 0 0 8px rgba(205,54,107,0.4); transition: width 0.35s ease; }

      .psf-part-head { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
      .psf-part-icon { width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0; background: rgba(205,54,107,0.10); display: flex; align-items: center; justify-content: center; color: ${PINK}; }
      .psf-part-title { font-size: 15px; font-weight: 800; color: ${BLUE_DEEP}; flex: 1; }
      .psf-part-count { font-size: 11.5px; font-weight: 700; color: rgba(44,61,131,0.45); background: rgba(44,61,131,0.06); padding: 4px 10px; border-radius: 999px; }

      .psf-questions { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
      .psf-q-card { border: 1px solid rgba(44,61,131,0.10); border-radius: 14px; padding: 16px 18px; transition: all .2s; background: rgba(44,61,131,0.015); }
      .psf-q-card:hover { border-color: rgba(205,54,107,0.20); box-shadow: 0 4px 16px rgba(205,54,107,0.08); }
      .psf-q-card.answered { border-color: rgba(44,61,131,0.15); background: rgba(44,61,131,0.025); }
      .psf-q-text { font-size: 13.5px; line-height: 1.65; color: ${BLUE_DEEP}; margin-bottom: 12px; }
      .psf-q-text.mr { font-family: 'Tiro Devanagari Marathi', serif; font-size: 14px; }
      .psf-q-no { color: ${PINK}; font-weight: 800; margin-right: 4px; }
      .psf-q-options { display: flex; gap: 8px; }
      .psf-opt { flex: 1; padding: 10px 0; border-radius: 10px; border: 1.5px solid rgba(44,61,131,0.12); background: #fff; color: ${BLUE_DEEP}; font-size: 13px; font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; transition: all .18s; }
      .psf-opt:hover { border-color: ${PINK}; background: rgba(205,54,107,0.04); }
      .psf-opt.yes-active { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border-color: transparent; box-shadow: 0 4px 14px rgba(34,197,94,0.30); }
      .psf-opt.no-active { background: linear-gradient(135deg, #f87171, #ef4444); color: #fff; border-color: transparent; box-shadow: 0 4px 14px rgba(239,68,68,0.28); }

      .psf-btn-row { display: flex; gap: 10px; }
      .psf-sbtn { flex: 1; padding: 14px; border: none; border-radius: 12px; font-size: 14.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; color: #fff; transition: all .2s; font-family: 'Inter', sans-serif; background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%); box-shadow: 0 10px 26px rgba(205,54,107,0.32); }
      .psf-sbtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
      .psf-sbtn:disabled { opacity: 0.5; cursor: not-allowed; }
      .psf-ghost { flex: 0 0 auto; padding: 14px 20px; border-radius: 12px; border: 1.5px solid rgba(44,61,131,0.15); background: #fff; color: ${BLUE_DEEP}; font-size: 14.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 7px; transition: all .2s; font-family: 'Inter', sans-serif; }
      .psf-ghost:hover { background: rgba(44,61,131,0.04); border-color: rgba(44,61,131,0.28); }

      @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      .psf-fade { animation: fadeUp .25s ease both; }

      .psf-info-col { width: 100%; max-width: 340px; display: flex; flex-direction: column; gap: 14px; }
      .psf-info-card { background: linear-gradient(165deg, ${BLUE} 0%, ${BLUE_DEEP} 100%); border-radius: 20px; padding: 28px 24px 24px; text-align: center; box-shadow: 0 18px 50px rgba(29,42,96,0.30); animation: psfIn .45s cubic-bezier(.22,.9,.36,1) .08s both; }
      .psf-badge-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 18px; }
      .psf-logo-badge { width: 50px; height: 50px; border-radius: 13px; flex-shrink: 0; background: rgba(255,255,255,0.95); padding: 5px; overflow: hidden; border: 1.5px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; }
      .psf-logo-badge img { width:100%; height:100%; object-fit:contain; border-radius:6px; }
      .psf-info-title { color: #fff; font-size: 21px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
      .psf-info-sub   { color: rgba(255,255,255,0.55); font-size: 12.5px; margin-bottom: 14px; }
      .psf-portal-pill { display: inline-flex; align-items: center; gap: 6px; color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase; background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}); padding: 7px 16px; border-radius: 999px; box-shadow: 0 8px 20px rgba(205,54,107,0.45); margin-bottom: 16px; }
      .psf-info-desc { color: rgba(255,255,255,0.55); font-size: 12px; line-height: 1.55; margin-bottom: 20px; }

      .psf-overall-progress { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 16px 12px; margin-bottom: 4px; }
      .psf-op-label { color: rgba(255,255,255,0.55); font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 10px; }
      .psf-op-track { height: 8px; background: rgba(255,255,255,0.10); border-radius: 99px; overflow: hidden; margin-bottom: 8px; }
      .psf-op-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, ${PINK}, #e94584); box-shadow: 0 0 10px rgba(205,54,107,0.5); transition: width .5s ease; }
      .psf-op-meta { display: flex; justify-content: space-between; }
      .psf-op-num  { color: #fff; font-size: 13px; font-weight: 800; }
      .psf-op-total{ color: rgba(255,255,255,0.45); font-size: 12px; }

      .psf-stats { display: flex; gap: 9px; margin-top: 12px; }
      .psf-stat { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); border-radius: 12px; padding: 12px 6px; }
      .psf-stat-icon { width: 26px; height: 26px; border-radius: 7px; margin: 0 auto 6px; background: rgba(205,54,107,0.22); display: flex; align-items: center; justify-content: center; color: ${PINK}; }
      .psf-stat-num   { color: #fff; font-size: 16px; font-weight: 800; }
      .psf-stat-label { color: rgba(255,255,255,0.5); font-size: 9.5px; margin-top: 2px; }

      .psf-parts-card { background: #fff; border-radius: 18px; padding: 22px 20px 20px; box-shadow: 0 12px 34px rgba(44,61,131,0.08); animation: psfIn .45s cubic-bezier(.22,.9,.36,1) .14s both; }
      .psf-parts-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
      .psf-parts-label { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(44,61,131,0.45); }
      .psf-parts-tag   { font-size: 12px; font-weight: 700; color: ${PINK}; }
      .psf-parts-list { display: flex; flex-direction: column; gap: 8px; }
      .psf-part-row { display: flex; align-items: center; gap: 10px; padding: 9px 11px; border-radius: 10px; border: 1px solid rgba(44,61,131,0.08); background: rgba(44,61,131,0.02); transition: all .15s; }
      .psf-part-row.active-part { border-color: rgba(205,54,107,0.22); background: rgba(205,54,107,0.04); }
      .psf-part-row.done-part { border-color: rgba(44,61,131,0.12); background: rgba(44,61,131,0.03); }
      .psf-part-dot { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; background: rgba(44,61,131,0.08); color: rgba(44,61,131,0.45); }
      .psf-part-row.active-part .psf-part-dot { background: linear-gradient(135deg, ${PINK}, ${PINK_DARK}); color: #fff; }
      .psf-part-row.done-part .psf-part-dot { background: ${BLUE}; color: #fff; }
      .psf-part-name { font-size: 11.5px; font-weight: 700; color: ${BLUE_DEEP}; flex: 1; line-height: 1.3; }
      .psf-part-badge { font-size: 9.5px; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: rgba(34,197,94,0.12); color: #15803d; }
      .psf-secure-note { display: flex; align-items: center; gap: 7px; font-size: 11.5px; color: rgba(44,61,131,0.45); font-weight: 500; padding-top: 14px; margin-top: 14px; border-top: 1px solid rgba(44,61,131,0.08); }

      .psf-footer { display: flex; align-items: center; justify-content: space-between; padding: 18px 40px; border-top: 1px solid rgba(44,61,131,0.08); font-size: 12.5px; color: rgba(44,61,131,0.45); }
      .psf-footer-links { display: flex; gap: 20px; }
      .psf-footer-links a { color: rgba(44,61,131,0.45); text-decoration: none; }
      .psf-footer-links a:hover { color: ${BLUE}; }

      /* ── Loading state ── */
      .psf-loading-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 60px 20px; }
      .psf-spinner { width: 40px; height: 40px; border-radius: 50%; border: 4px solid rgba(205,54,107,0.15); border-top-color: ${PINK}; animation: psfSpin .8s linear infinite; }
      @keyframes psfSpin { to { transform: rotate(360deg); } }
      .psf-loading-text { color: ${BLUE_DEEP}; font-size: 14px; font-weight: 600; }

      /* ── Banners ── */
      .psf-banner { display: flex; gap: 12px; align-items: flex-start; border-radius: 14px; padding: 16px 18px; margin-bottom: 20px; }
      .psf-banner.info { background: rgba(44,61,131,0.06); border-left: 3px solid ${BLUE}; }
      .psf-banner.warn { background: #fef3c7; border-left: 3px solid ${AMBER}; }
      .psf-banner-text { flex: 1; font-size: 13px; color: ${BLUE_DEEP}; line-height: 1.55; font-weight: 600; }
      .psf-banner.warn .psf-banner-text { color: #92400e; }

      /* ── Read-only Q&A list ── */
      .psf-ro-part-title { font-size: 13.5px; font-weight: 800; color: ${BLUE_DEEP}; margin: 18px 0 10px; }
      .psf-ro-part-title:first-child { margin-top: 0; }
      .psf-ro-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(44,61,131,0.06); }
      .psf-ro-q { flex: 1; font-size: 13px; color: ${BLUE_DEEP}; line-height: 1.6; }
      .psf-ro-badge { flex-shrink: 0; padding: 4px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700; color: #fff; background: rgba(44,61,131,0.2); }
      .psf-ro-badge.yes { background: ${GREEN}; }
      .psf-ro-badge.no  { background: ${RED}; }

      /* ── Officer comment box (resubmit view) ── */
      .psf-officer-comment { display: flex; gap: 8px; align-items: flex-start; background: #fef3c7; border-radius: 10px; padding: 10px 12px; margin-top: 10px; }
      .psf-officer-comment-text { flex: 1; font-size: 12.5px; color: #92400e; font-weight: 600; line-height: 1.5; }

      /* ── Preview modal ── */
      .psf-modal-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(29,42,96,0.5); display: flex; align-items: center; justify-content: center; padding: 20px; animation: psfFade .2s ease both; }
      @keyframes psfFade { from{opacity:0} to{opacity:1} }
      .psf-modal { width: 100%; max-width: 680px; max-height: 88vh; background: #fff; border-radius: 20px; border-top: 4px solid ${PINK}; box-shadow: 0 30px 70px rgba(29,42,96,0.35); display: flex; flex-direction: column; animation: psfUp .3s cubic-bezier(.22,.9,.36,1) both; }
      @keyframes psfUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      .psf-modal-head { display: flex; align-items: flex-start; justify-content: space-between; padding: 24px 26px 18px; border-bottom: 1px solid rgba(44,61,131,0.08); }
      .psf-modal-title { font-size: 17px; font-weight: 800; color: ${BLUE_DEEP}; }
      .psf-modal-sub { font-size: 12.5px; color: rgba(44,61,131,0.5); margin-top: 3px; }
      .psf-modal-close { width: 32px; height: 32px; border-radius: 10px; border: none; background: rgba(44,61,131,0.06); color: rgba(44,61,131,0.5); display: flex; align-items: center; justify-content: center; cursor: pointer; }
      .psf-modal-close:hover { background: rgba(44,61,131,0.12); }
      .psf-modal-body { flex: 1; overflow-y: auto; padding: 20px 26px; }
      .psf-modal-part { margin-bottom: 20px; }
      .psf-modal-part-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
      .psf-modal-part-title { font-size: 13px; font-weight: 800; color: ${BLUE_DEEP}; }
      .psf-modal-edit-btn { display: flex; align-items: center; gap: 5px; background: rgba(205,54,107,0.08); color: ${PINK}; border: none; border-radius: 999px; padding: 5px 12px; font-size: 11.5px; font-weight: 700; cursor: pointer; }
      .psf-modal-edit-btn:hover { background: rgba(205,54,107,0.16); }
      .psf-modal-footer { display: flex; gap: 10px; padding: 18px 26px; border-top: 1px solid rgba(44,61,131,0.08); }

      @media (max-width: 960px) {
        .psf-main { flex-direction: column; align-items: center; padding: 32px 20px; }
        .psf-footer { flex-direction: column; gap: 8px; text-align: center; padding: 14px 20px; }
        .psf-q-options { flex-direction: column; }
      }
    `}</style>
  );

  // ══════════════════════════════════════════════════════
  // Right column — same blue info card, shown in every state.
  // Parts tracker only makes sense during first-time pagination,
  // so it's shown only when NOT in read-only/resubmit mode.
  // ══════════════════════════════════════════════════════
  const InfoColumn = () => (
    <div className="psf-info-col">
      <div className="psf-info-card">
        <div className="psf-badge-row">
          <div className="psf-logo-badge"><img src={wcdLogo} alt="WCD" /></div>
          <div className="psf-logo-badge"><img src={shasanLogo} alt="Shasan" /></div>
        </div>
        <h2 className="psf-info-title">POSH Survey</h2>
        <p className="psf-info-sub">Maharashtra State</p>
        <div className="psf-portal-pill"><FiShield size={11} /> COMPLIANCE PORTAL</div>
        <p className="psf-info-desc">
          Women &amp; Child Development —<br />
          POSH Compliance Inspection System
        </p>

        <div className="psf-overall-progress">
          <div className="psf-op-label">Overall Progress</div>
          <div className="psf-op-track">
            <div
              className="psf-op-fill"
              style={{ width: `${submitted ? 100 : progressPct}%` }}
            />
          </div>
          <div className="psf-op-meta">
            <span className="psf-op-num">
              {submitted
                ? (canEdit ? `${flaggedQuestions.length} to fix` : "Submitted")
                : `Part ${partIndex + 1}`}
            </span>
            <span className="psf-op-total">
              {submitted ? "" : `of ${TOTAL_PARTS} Parts`}
            </span>
          </div>
        </div>

        <div className="psf-stats">
          <div className="psf-stat">
            <div className="psf-stat-icon"><FiCheckSquare size={13} /></div>
            <div className="psf-stat-num">{Object.keys(answers).length}</div>
            <div className="psf-stat-label">Answered</div>
          </div>
          <div className="psf-stat">
            <div className="psf-stat-icon"><FiShield size={13} /></div>
            <div className="psf-stat-num">{TOTAL_QUESTIONS}</div>
            <div className="psf-stat-label">Questions</div>
          </div>
          <div className="psf-stat">
            <div className="psf-stat-icon"><FiMapPin size={13} /></div>
            <div className="psf-stat-num">34</div>
            <div className="psf-stat-label">Districts</div>
          </div>
        </div>
      </div>

      {/* Parts tracker — only during the first-time, part-by-part flow */}
      {!submitted && (
        <div className="psf-parts-card">
          <div className="psf-parts-head">
            <span className="psf-parts-label">Survey Parts</span>
            <span className="psf-parts-tag">{partIndex + 1} of {TOTAL_PARTS}</span>
          </div>
          <div className="psf-parts-list">
            {poshQuestions.parts.map((p, i) => (
              <div
                key={i}
                className={`psf-part-row${i === partIndex ? " active-part" : i < partIndex ? " done-part" : ""}`}
              >
                <div className="psf-part-dot">{i < partIndex ? "✓" : i + 1}</div>
                <div className="psf-part-name">{partTitle(p)}</div>
                {i < partIndex && <span className="psf-part-badge">Done</span>}
              </div>
            ))}
          </div>
          <div className="psf-secure-note">
            <FiLockSolid size={13} /> Secure Government Portal · 256-bit SSL
          </div>
        </div>
      )}
    </div>
  );

  // ══════════════════════════════════════════════════════
  // STATE 0 — Loading (status check in flight)
  // ══════════════════════════════════════════════════════
  if (checkingStatus) {
    return (
      <>
        {sharedStyle}
        <div className="psf-page">
          <div className="psf-loading-wrap">
            <div className="psf-spinner" />
            <div className="psf-loading-text">
              {lang === "en" ? "Checking survey status…" : "सर्वेक्षण स्थिती तपासत आहे…"}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════
  // STATE 1 — Read-only (submitted, NOT editable — pending review or already compiled)
  // ══════════════════════════════════════════════════════
  if (submitted && !canEdit) {
    return (
      <>
        {sharedStyle}
        <div className="psf-page">
          <main className="psf-main">

            <div className="psf-card">
              <div className="psf-brand-row">
                <div className="psf-brand">
                  <div className="psf-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
                  <div>
                    <div className="psf-brand-title">POSH Survey</div>
                    <div className="psf-brand-sub">Inspection Portal</div>
                  </div>
                </div>
                <span className="psf-version-pill">v2.0</span>
              </div>

              <div className="psf-banner info">
                <FiLockSolid size={18} color={BLUE_DEEP} style={{ flexShrink: 0, marginTop: 2 }} />
                <div className="psf-banner-text">
                  {reviewStatus === "compiled"
                    ? (lang === "en"
                        ? "Your survey has been approved. This is a view-only copy."
                        : "तुमचे सर्वेक्षण मंजूर झाले आहे. ही फक्त पाहण्यासाठीची प्रत आहे.")
                    : (lang === "en"
                        ? "Your survey has already been submitted and is awaiting Inspection Officer review. It cannot be edited right now."
                        : "तुमचे सर्वेक्षण आधीच सबमिट झाले आहे आणि निरीक्षण अधिकाऱ्याच्या पुनरावलोकनाच्या प्रतीक्षेत आहे. सध्या ते संपादित करता येणार नाही.")}
                </div>
              </div>

              {poshQuestions.parts.map((part, pIdx) => (
                <div key={pIdx}>
                  <div className="psf-ro-part-title">{partTitle(part)}</div>
                  {part.questions.map((q) => (
                    <div key={q.no} className="psf-ro-row">
                      <div className="psf-ro-q">
                        <span className="psf-q-no">{q.no}.</span> {q[lang]}
                      </div>
                      <div className={`psf-ro-badge ${answers[q.no] === "yes" ? "yes" : answers[q.no] === "no" ? "no" : ""}`}>
                        {answers[q.no] === "yes" ? t.yes : answers[q.no] === "no" ? t.no : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <InfoColumn />
          </main>

          <footer className="psf-footer">
            <span>© 2025 WCD Maharashtra. All rights reserved.</span>
          </footer>
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════
  // STATE 2 — Resubmit (submitted + rejected/notcompiled → only flagged questions editable)
  // ══════════════════════════════════════════════════════
  if (submitted && canEdit) {
    return (
      <>
        {sharedStyle}
        <div className="psf-page">
          <main className="psf-main">

            <div className="psf-card">
              <div className="psf-brand-row">
                <div className="psf-brand">
                  <div className="psf-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
                  <div>
                    <div className="psf-brand-title">POSH Survey</div>
                    <div className="psf-brand-sub">Inspection Portal</div>
                  </div>
                </div>
                <span className="psf-version-pill">v2.0</span>
              </div>

              <div className="psf-banner warn">
                <FiAlertCircle size={18} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
                <div className="psf-banner-text">
                  {reviewStatus === "rejected"
                    ? (lang === "en"
                        ? `Your previous submission was rejected. Please fix ${flaggedQuestions.length} question(s) below and resubmit.`
                        : `तुमचे मागील सबमिशन नाकारले गेले आहे. कृपया खालील ${flaggedQuestions.length} प्रश्न दुरुस्त करून पुन्हा सबमिट करा.`)
                    : (lang === "en"
                        ? `${flaggedQuestions.length} question(s) were marked non-compliant. Please fix them below and resubmit.`
                        : `${flaggedQuestions.length} प्रश्न असंमत ठरले आहेत. कृपया ते खाली दुरुस्त करून पुन्हा सबमिट करा.`)}
                </div>
              </div>

              {flaggedQuestions.length === 0 ? (
                <p style={{ color: "rgba(44,61,131,0.5)", fontSize: 13 }}>
                  {lang === "en" ? "No flagged questions found." : "कोणतेही चिन्हांकित प्रश्न सापडले नाहीत."}
                </p>
              ) : (
                <div className="psf-questions">
                  {flaggedQuestions.map((q) => (
                    <div className={`psf-q-card${answers[q.no] ? " answered" : ""}`} key={q.no}>
                      <p className={`psf-q-text${lang === "mr" ? " mr" : ""}`}>
                        <span className="psf-q-no">{q.no}.</span> {q[lang]}
                      </p>
                      <div className="psf-q-options">
                        <button
                          className={`psf-opt${answers[q.no] === "yes" ? " yes-active" : ""}`}
                          onClick={() => setAnswer(q.no, "yes")}
                        >
                          ✓ {t.yes}
                        </button>
                        <button
                          className={`psf-opt${answers[q.no] === "no" ? " no-active" : ""}`}
                          onClick={() => setAnswer(q.no, "no")}
                        >
                          ✗ {t.no}
                        </button>
                      </div>
                      {officerComments[q.no] ? (
                        <div className="psf-officer-comment">
                          <FiMessageSquare size={13} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
                          <div className="psf-officer-comment-text">
                            {lang === "en" ? "Officer remark: " : "अधिकाऱ्याची टीप: "}
                            {officerComments[q.no]}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}

              <button
                className="psf-sbtn"
                onClick={handleSubmit}
                disabled={loading || !allFlaggedAnswered}
                style={{ width: "100%" }}
              >
                {loading
                  ? t.submitting
                  : (lang === "en" ? "Resubmit Survey" : "सर्वेक्षण पुन्हा सबमिट करा")}
                {!loading && <FiCheckCircle size={16} />}
              </button>
            </div>

            <InfoColumn />
          </main>

          <footer className="psf-footer">
            <span>© 2025 WCD Maharashtra. All rights reserved.</span>
          </footer>
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════
  // STATE 3 — Normal first-time flow (never submitted before)
  // ══════════════════════════════════════════════════════
  return (
    <>
      {sharedStyle}
      <div className="psf-page">
        <main className="psf-main">

          {/* ════ LEFT: Survey Card ════ */}
          <div className="psf-card">

            <div className="psf-brand-row">
              <div className="psf-brand">
                <div className="psf-brand-icon"><img src={wcdLogo} alt="WCD" /></div>
                <div>
                  <div className="psf-brand-title">POSH Survey</div>
                  <div className="psf-brand-sub">Inspection Portal</div>
                </div>
              </div>
              <span className="psf-version-pill">v2.0</span>
            </div>

            <div className="psf-progress-wrap">
              <div className="psf-progress-meta">
                <span className="psf-progress-label">{t.partOf}</span>
                <span className="psf-progress-pct">{progressPct}%</span>
              </div>
              <div className="psf-progress-track">
                <div className="psf-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="psf-part-head">
              <div className="psf-part-icon"><FiShield size={15} /></div>
              <div className="psf-part-title">{partTitle(currentPart)}</div>
              <div className="psf-part-count">{answeredCount}/{totalInPart}</div>
            </div>

            <div className="psf-questions psf-fade">
              {currentPart.questions.map((q) => (
                <div
                  className={`psf-q-card${answers[q.no] ? " answered" : ""}`}
                  key={q.no}
                >
                  <p className={`psf-q-text${lang === "mr" ? " mr" : ""}`}>
                    <span className="psf-q-no">{q.no}.</span> {q[lang]}
                  </p>
                  <div className="psf-q-options">
                    <button
                      className={`psf-opt${answers[q.no] === "yes" ? " yes-active" : ""}`}
                      onClick={() => setAnswer(q.no, "yes")}
                    >
                      ✓ {t.yes}
                    </button>
                    <button
                      className={`psf-opt${answers[q.no] === "no" ? " no-active" : ""}`}
                      onClick={() => setAnswer(q.no, "no")}
                    >
                      ✗ {t.no}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="psf-btn-row">
              {partIndex > 0 && (
                <button className="psf-ghost" onClick={handlePrevious} disabled={loading}>
                  <FiArrowLeft size={15} /> {t.previous}
                </button>
              )}
              <button className="psf-sbtn" onClick={handleNext} disabled={loading}>
                {partIndex === TOTAL_PARTS - 1 ? t.review : t.next}
                {partIndex === TOTAL_PARTS - 1
                  ? <FiCheckCircle size={16} />
                  : <FiArrowRight size={16} />}
              </button>
            </div>
          </div>

          {/* ════ RIGHT: Info column ════ */}
          <InfoColumn />
        </main>

        <footer className="psf-footer">
          <span>© 2025 WCD Maharashtra. All rights reserved.</span>
          <div className="psf-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </footer>

        {/* ── Preview Modal (first-time submission only) ── */}
        {showPreview && (
          <div className="psf-modal-overlay" onClick={() => setShowPreview(false)}>
            <div className="psf-modal" onClick={(e) => e.stopPropagation()}>
              <div className="psf-modal-head">
                <div>
                  <div className="psf-modal-title">
                    {lang === "en" ? "Review Your Answers" : "तुमची उत्तरे तपासा"}
                  </div>
                  <div className="psf-modal-sub">
                    {lang === "en"
                      ? `${Object.keys(answers).length} of ${TOTAL_QUESTIONS} answered`
                      : `${Object.keys(answers).length} पैकी ${TOTAL_QUESTIONS} उत्तर दिले`}
                  </div>
                </div>
                <button className="psf-modal-close" onClick={() => setShowPreview(false)} disabled={loading}>
                  <FiX size={18} />
                </button>
              </div>

              <div className="psf-modal-body">
                {poshQuestions.parts.map((part, pIdx) => (
                  <div key={pIdx} className="psf-modal-part">
                    <div className="psf-modal-part-head">
                      <div className="psf-modal-part-title">{partTitle(part)}</div>
                      <button
                        className="psf-modal-edit-btn"
                        onClick={() => handleEditPart(pIdx)}
                        disabled={loading}
                      >
                        <FiEdit2 size={12} /> {lang === "en" ? "Edit" : "बदला"}
                      </button>
                    </div>
                    {part.questions.map((q) => (
                      <div key={q.no} className="psf-ro-row">
                        <div className="psf-ro-q">
                          <span className="psf-q-no">{q.no}.</span> {q[lang]}
                        </div>
                        <div className={`psf-ro-badge ${answers[q.no] === "yes" ? "yes" : answers[q.no] === "no" ? "no" : ""}`}>
                          {answers[q.no] === "yes"
                            ? t.yes
                            : answers[q.no] === "no"
                            ? t.no
                            : (lang === "en" ? "Not answered" : "उत्तर नाही")}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="psf-modal-footer">
                <button className="psf-ghost" onClick={() => setShowPreview(false)} disabled={loading}>
                  {lang === "en" ? "Continue Editing" : "संपादन सुरू ठेवा"}
                </button>
                <button className="psf-sbtn" onClick={handleSubmit} disabled={loading}>
                  {loading
                    ? t.submitting
                    : (lang === "en" ? "Confirm & Submit" : "खात्री करा आणि सबमिट करा")}
                  {!loading && <FiCheckCircle size={16} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}







