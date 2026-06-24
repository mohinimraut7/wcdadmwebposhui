// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShield, FiMapPin, FiFilter, FiChevronDown,
//   FiCheckCircle, FiEye, FiClipboard, FiUser,
//   FiPhone, FiCalendar, FiBriefcase, FiSearch,
// } from "react-icons/fi";
// import axiosInstance from "../services/axiosInstance";

// const PINK      = "#CD366B";
// const PINK_DARK = "#b82a5c";
// const BLUE      = "#2C3D83";
// const BLUE_DEEP = "#1d2a60";
// const CREAM     = "#FBF3EE";

// const MH_DISTRICTS = [
//   "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
//   "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
//   "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
//   "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
//   "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
//   "Washim","Yavatmal",
// ];

// export default function Surveys() {
//   const [surveys, setSurveys]         = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [filterDistrict, setFilterDistrict] = useState("all");
//   const [filterOrgType,  setFilterOrgType]  = useState("all");
//   const [search, setSearch]           = useState("");
//   const [detailModal, setDetailModal] = useState(null);
//   const [detailLoading, setDetailLoading] = useState(false);

//   // ── Fetch all surveys ──
//   const fetchSurveys = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/surveys");
//       if (res.data.success) setSurveys(res.data.data || []);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to load surveys");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchSurveys(); }, []);

//   // ── Fetch single survey detail ──
//   const openDetail = async (submissionid) => {
//     setDetailLoading(true);
//     setDetailModal({ submissionid, loading: true });
//     try {
//       const res = await axiosInstance.get(` /surveys/${submissionid}`);
//       if (res.data.success) {
//         setDetailModal({ ...res.data, submissionid, loading: false });
//       }
//     } catch (err) {
//       toast.error("Failed to load survey detail");
//       setDetailModal(null);
//     } finally {
//       setDetailLoading(false);
//     }
//   };

//   // ── Derived filter options ──
//   const orgTypeOptions = useMemo(() => {
//     return [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort();
//   }, [surveys]);

//   // ── Filtered list ──
//   const filtered = useMemo(() => {
//     return surveys.filter((s) => {
//       const distMatch = filterDistrict === "all" || s.district === filterDistrict;
//       const typeMatch = filterOrgType  === "all" || s.orgtype  === filterOrgType;
//       const q = search.toLowerCase();
//       const searchMatch = !q ||
//         (s.orgname      || "").toLowerCase().includes(q) ||
//         (s.concernname  || "").toLowerCase().includes(q) ||
//         (s.concernmobile|| "").includes(q) ||
//         (s.district     || "").toLowerCase().includes(q);
//       return distMatch && typeMatch && searchMatch;
//     });
//   }, [surveys, filterDistrict, filterOrgType, search]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }

//         .sv-page {
//           min-height: 100vh; width: 100%;
//           background-color: ${CREAM};
//           font-family: 'Inter', -apple-system, sans-serif;
//           padding: 40px;
//         }

//         .sv-header {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
//         }
//         .sv-title-row { display: flex; align-items: center; gap: 14px; }
//         .sv-icon-badge {
//           width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
//           background: rgba(205,54,107,0.10);
//           display: flex; align-items: center; justify-content: center; color: ${PINK};
//         }
//         .sv-title    { color: ${BLUE_DEEP}; font-size: 24px; font-weight: 800; letter-spacing: -0.3px; }
//         .sv-subtitle { color: rgba(44,61,131,0.55); font-size: 13.5px; margin-top: 2px; }

//         .sv-refresh-btn {
//           display: flex; align-items: center; gap: 8px;
//           padding: 13px 22px; border: none; border-radius: 12px;
//           font-size: 14px; font-weight: 700; cursor: pointer;
//           color: #fff; font-family: 'Inter', sans-serif;
//           background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
//           box-shadow: 0 10px 26px rgba(205,54,107,0.32);
//           transition: all .2s;
//         }
//         .sv-refresh-btn:hover { transform: translateY(-2px); }

//         .sv-stats { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
//         .sv-stat-card {
//           flex: 1; min-width: 180px;
//           background: #fff; border-radius: 16px; padding: 18px 20px;
//           box-shadow: 0 8px 24px rgba(44,61,131,0.06);
//           display: flex; align-items: center; gap: 14px;
//         }
//         .sv-stat-icon {
//           width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
//           background: rgba(44,61,131,0.06);
//           display: flex; align-items: center; justify-content: center; color: ${BLUE};
//         }
//         .sv-stat-num   { font-size: 22px; font-weight: 800; color: ${BLUE_DEEP}; line-height: 1.1; }
//         .sv-stat-label { font-size: 11.5px; color: rgba(44,61,131,0.5); font-weight: 600; margin-top: 2px; }

//         .sv-table-card {
//           background: #fff; border-radius: 20px;
//           border-top: 4px solid ${PINK};
//           box-shadow: 0 18px 50px rgba(44,61,131,0.08);
//           overflow: hidden;
//         }
//         .sv-table-head {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 18px 24px; border-bottom: 1px solid rgba(44,61,131,0.08);
//           flex-wrap: wrap; gap: 12px;
//         }
//         .sv-table-head-left { display: flex; align-items: center; gap: 10px; }
//         .sv-table-head-title { font-size: 14px; font-weight: 800; color: ${BLUE_DEEP}; }
//         .sv-table-count {
//           font-size: 11.5px; font-weight: 700; color: ${PINK};
//           background: rgba(205,54,107,0.08); padding: 4px 12px; border-radius: 999px;
//         }

//         .sv-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

//         .sv-search-wrap {
//           display: flex; align-items: center; gap: 8px;
//           padding: 8px 14px;
//           background: #fff;
//           border: 1.5px solid rgba(44,61,131,0.12);
//           border-radius: 999px;
//         }
//         .sv-search-wrap svg { color: rgba(44,61,131,0.4); }
//         .sv-search-input {
//           border: none; outline: none; background: transparent;
//           font-size: 12.5px; font-weight: 500; color: ${BLUE_DEEP};
//           font-family: 'Inter', sans-serif; width: 160px;
//         }
//         .sv-search-input::placeholder { color: rgba(44,61,131,0.35); }

//         .sv-filter-select-wrap {
//           display: flex; align-items: center; gap: 7px;
//           padding: 8px 14px;
//           background: #fff;
//           border: 1.5px solid rgba(44,61,131,0.12);
//           border-radius: 999px; cursor: pointer; transition: all .2s;
//         }
//         .sv-filter-select-wrap:hover { border-color: rgba(44,61,131,0.28); }
//         .sv-filter-select {
//           border: none; outline: none; background: transparent;
//           font-size: 12.5px; font-weight: 600; color: ${BLUE_DEEP};
//           font-family: 'Inter', sans-serif; cursor: pointer;
//           appearance: none; -webkit-appearance: none; padding-right: 4px;
//         }

//         .sv-table-wrap { overflow-x: auto; }
//         table.sv-table { width: 100%; border-collapse: collapse; }
//         .sv-table thead th {
//           text-align: left; padding: 13px 24px;
//           font-size: 10.5px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
//           color: rgba(44,61,131,0.45);
//           background: rgba(44,61,131,0.025);
//           white-space: nowrap;
//         }
//         .sv-table tbody td {
//           padding: 15px 24px; font-size: 13.5px; color: ${BLUE_DEEP};
//           border-top: 1px solid rgba(44,61,131,0.06);
//           white-space: nowrap;
//         }
//         .sv-table tbody tr:hover { background: rgba(205,54,107,0.02); cursor: pointer; }

//         .sv-org-cell { display: flex; align-items: center; gap: 10px; }
//         .sv-avatar {
//           width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
//           background: linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP});
//           color: #fff; font-size: 13px; font-weight: 800;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .sv-orgname  { font-weight: 700; }
//         .sv-orgtype  { font-size: 11.5px; color: rgba(44,61,131,0.45); margin-top: 1px; }

//         .sv-district-pill {
//           display: inline-flex; align-items: center; gap: 5px;
//           font-size: 12px; font-weight: 700; color: ${BLUE};
//           background: rgba(44,61,131,0.06); padding: 5px 12px; border-radius: 999px;
//         }
//         .sv-date { color: rgba(44,61,131,0.55); font-size: 12.5px; }

//         .sv-view-btn {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 6px 14px; border: none; border-radius: 8px;
//           font-size: 12px; font-weight: 700; cursor: pointer;
//           color: ${PINK}; background: rgba(205,54,107,0.08);
//           transition: all .15s; font-family: 'Inter', sans-serif;
//         }
//         .sv-view-btn:hover { background: rgba(205,54,107,0.16); }

//         .sv-empty {
//           padding: 70px 20px; text-align: center;
//           color: rgba(44,61,131,0.4); font-size: 13.5px;
//         }
//         .sv-empty-icon {
//           width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 14px;
//           background: rgba(44,61,131,0.05);
//           display: flex; align-items: center; justify-content: center; color: rgba(44,61,131,0.3);
//         }
//         .sv-loading { padding: 60px 20px; text-align: center; color: rgba(44,61,131,0.4); }

//         /* ── Detail Modal ── */
//         .sv-overlay {
//           position: fixed; inset: 0; z-index: 1000;
//           background: rgba(29,42,96,0.45); backdrop-filter: blur(3px);
//           display: flex; align-items: center; justify-content: center; padding: 20px;
//           animation: svFade .2s ease both;
//         }
//         @keyframes svFade { from{opacity:0} to{opacity:1} }
//         .sv-modal {
//           width: 100%; max-width: 560px;
//           background: #fff; border-radius: 20px;
//           border-top: 4px solid ${PINK};
//           box-shadow: 0 30px 70px rgba(29,42,96,0.35);
//           padding: 28px 30px;
//           max-height: 88vh; overflow-y: auto;
//           animation: svUp .3s cubic-bezier(.22,.9,.36,1) both;
//         }
//         @keyframes svUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//         .sv-modal-head {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 20px; padding-bottom: 16px;
//           border-bottom: 1px solid rgba(44,61,131,0.08);
//         }
//         .sv-modal-title { font-size: 17px; font-weight: 800; color: ${BLUE_DEEP}; }
//         .sv-modal-sub   { font-size: 12px; color: ${PINK}; font-weight: 600; margin-top: 2px; }
//         .sv-modal-close {
//           width: 30px; height: 30px; border-radius: 9px; border: none;
//           background: rgba(44,61,131,0.06); color: rgba(44,61,131,0.5);
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; font-size: 18px; font-weight: 700; line-height: 1;
//         }
//         .sv-modal-close:hover { background: rgba(44,61,131,0.12); }

//         .sv-modal-section { margin-bottom: 20px; }
//         .sv-modal-section-title {
//           font-size: 11px; font-weight: 800; letter-spacing: 0.7px; text-transform: uppercase;
//           color: rgba(44,61,131,0.45); margin-bottom: 12px;
//         }
//         .sv-modal-info-grid {
//           display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
//         }
//         .sv-modal-info-item {
//           background: rgba(44,61,131,0.03); border-radius: 10px; padding: 10px 14px;
//         }
//         .sv-modal-info-label { font-size: 10.5px; color: rgba(44,61,131,0.45); font-weight: 700; margin-bottom: 3px; }
//         .sv-modal-info-val   { font-size: 13.5px; font-weight: 700; color: ${BLUE_DEEP}; }

//         .sv-answers-grid {
//           display: flex; flex-direction: column; gap: 8px;
//         }
//         .sv-answer-row {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 10px 14px; background: rgba(44,61,131,0.025); border-radius: 10px;
//         }
//         .sv-answer-q { font-size: 12.5px; color: ${BLUE_DEEP}; font-weight: 500; }
//         .sv-answer-qid { font-size: 11px; color: rgba(44,61,131,0.4); margin-right: 8px; }
//         .sv-ans-yes {
//           padding: 3px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700;
//           color: #15803d; background: rgba(34,197,94,0.12);
//         }
//         .sv-ans-no {
//           padding: 3px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700;
//           color: #b91c1c; background: rgba(239,68,68,0.12);
//         }

//         @media (max-width: 700px) {
//           .sv-page { padding: 20px; }
//           .sv-stats { flex-direction: column; }
//           .sv-modal-info-grid { grid-template-columns: 1fr; }
//         }
//       `}</style>

//       <div className="sv-page">

//         {/* ── Header ── */}
//         <div className="sv-header">
//           <div className="sv-title-row">
//             <div className="sv-icon-badge"><FiClipboard size={22} /></div>
//             <div>
//               <div className="sv-title">POSH Survey Submissions</div>
//               <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
//             </div>
//           </div>
//           <button className="sv-refresh-btn" onClick={fetchSurveys}>
//             <FiShield size={16} /> Refresh
//           </button>
//         </div>

//         {/* ── Stats ── */}
//         <div className="sv-stats">
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiClipboard size={18} /></div>
//             <div>
//               <div className="sv-stat-num">{surveys.length}</div>
//               <div className="sv-stat-label">Total Submissions</div>
//             </div>
//           </div>
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiMapPin size={18} /></div>
//             <div>
//               <div className="sv-stat-num">{new Set(surveys.map((s) => s.district)).size}</div>
//               <div className="sv-stat-label">Districts Covered</div>
//             </div>
//           </div>
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
//             <div>
//               <div className="sv-stat-num">34</div>
//               <div className="sv-stat-label">Total Districts in MH</div>
//             </div>
//           </div>
//         </div>

//         {/* ── Table ── */}
//         <div className="sv-table-card">
//           <div className="sv-table-head">
//             <div className="sv-table-head-left">
//               <span className="sv-table-head-title">All Survey Submissions</span>
//               <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
//             </div>

//             <div className="sv-filters">
//               {/* Search */}
//               <div className="sv-search-wrap">
//                 <FiSearch size={13} />
//                 <input
//                   className="sv-search-input"
//                   placeholder="Search org, contact..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* District filter */}
//               <div className="sv-filter-select-wrap">
//                 <FiMapPin size={13} />
//                 <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
//                   <option value="all">All Districts</option>
//                   {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
//                 </select>
//                 <FiChevronDown size={13} />
//               </div>

//               {/* Org Type filter */}
//               <div className="sv-filter-select-wrap">
//                 <FiFilter size={13} />
//                 <select className="sv-filter-select" value={filterOrgType} onChange={(e) => setFilterOrgType(e.target.value)}>
//                   <option value="all">All Types</option>
//                   {orgTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
//                 </select>
//                 <FiChevronDown size={13} />
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="sv-loading">Loading surveys…</div>
//           ) : filtered.length === 0 ? (
//             <div className="sv-empty">
//               <div className="sv-empty-icon"><FiClipboard size={24} /></div>
//               {surveys.length === 0 ? "No survey submissions yet." : "No records match the selected filters."}
//             </div>
//           ) : (
//             <div className="sv-table-wrap">
//               <table className="sv-table">
//                 <thead>
//                   <tr>
//                     <th>Organization</th>
//                     <th>Contact Person</th>
//                     <th>Mobile</th>
//                     <th>District</th>
//                     <th>Taluka</th>
//                     <th>Submitted On</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.map((s) => (
//                     <tr key={s.submissionid}>
//                       <td>
//                         <div className="sv-org-cell">
//                           <div className="sv-avatar">{(s.orgname || "?").charAt(0).toUpperCase()}</div>
//                           <div>
//                             <div className="sv-orgname">{s.orgname || "—"}</div>
//                             <div className="sv-orgtype">{s.orgtype || "—"}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{s.concernname || "—"}</td>
//                       <td>{s.concernmobile || "—"}</td>
//                       <td>
//                         <span className="sv-district-pill">
//                           <FiMapPin size={11} /> {s.district || "—"}
//                         </span>
//                       </td>
//                       <td>{s.taluka || "—"}</td>
//                       <td className="sv-date">
//                         {s.submittedat
//                           ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//                           : "—"}
//                       </td>
//                       <td>
//                         <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
//                           <FiEye size={13} /> View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Detail Modal ── */}
//       {detailModal && (
//         <div className="sv-overlay" onClick={() => setDetailModal(null)}>
//           <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="sv-modal-head">
//               <div>
//                 <div className="sv-modal-title">Survey Detail</div>
//                 <div className="sv-modal-sub">Submission #{detailModal.submissionid}</div>
//               </div>
//               <button className="sv-modal-close" onClick={() => setDetailModal(null)}>×</button>
//             </div>

//             {detailModal.loading ? (
//               <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading…</div>
//             ) : (
//               <>
//                 {/* Org Info */}
//                 <div className="sv-modal-section">
//                   <div className="sv-modal-section-title">Organization Info</div>
//                   <div className="sv-modal-info-grid">
//                     {[
//                       ["Org Name",    detailModal.submission?.orgname],
//                       ["Org Type",    detailModal.submission?.orgtype],
//                       ["District",    detailModal.submission?.district],
//                       ["Taluka",      detailModal.submission?.taluka],
//                       ["Ward",        detailModal.submission?.ward],
//                       ["Contact",     detailModal.submission?.concernname],
//                       ["Mobile",      detailModal.submission?.concernmobile],
//                       ["Submitted",   detailModal.submission?.submittedat
//                         ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//                         : "—"],
//                     ].map(([label, val]) => (
//                       <div key={label} className="sv-modal-info-item">
//                         <div className="sv-modal-info-label">{label}</div>
//                         <div className="sv-modal-info-val">{val || "—"}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Answers */}
//                 <div className="sv-modal-section">
//                   <div className="sv-modal-section-title">
//                     Survey Answers ({Object.keys(detailModal.answers || {}).length} questions)
//                   </div>
//                   <div className="sv-answers-grid">
//                     {Object.entries(detailModal.answers || {}).map(([qid, ans]) => (
//                       <div key={qid} className="sv-answer-row">
//                         <span className="sv-answer-q">
//                           <span className="sv-answer-qid">Q{qid}.</span>
//                           Question {qid}
//                         </span>
//                         <span className={ans === "yes" ? "sv-ans-yes" : "sv-ans-no"}>
//                           {ans === "yes" ? "✓ Yes" : "✗ No"}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }







// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShield, FiMapPin, FiFilter, FiChevronDown,
//   FiCheckCircle, FiEye, FiClipboard, FiSearch,
// } from "react-icons/fi";
// import axiosInstance from "../services/axiosInstance";

// const PINK      = "#CD366B";
// const PINK_DARK = "#b82a5c";
// const BLUE      = "#2C3D83";
// const BLUE_DEEP = "#1d2a60";
// const CREAM     = "#FBF3EE";

// const MH_DISTRICTS = [
//   "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
//   "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
//   "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
//   "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
//   "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
//   "Washim","Yavatmal",
// ];

// // ── Auth user from localStorage ──────────────────────────────
// const getAuthUser = () => {
//   try { return JSON.parse(localStorage.getItem("authUser") || "{}"); }
//   catch { return {}; }
// };

// export default function Surveys() {
//   const [surveys, setSurveys]               = useState([]);
//   const [loading, setLoading]               = useState(true);
//   const [filterDistrict, setFilterDistrict] = useState("all");
//   const [filterOrgType,  setFilterOrgType]  = useState("all");
//   const [search, setSearch]                 = useState("");
//   const [detailModal, setDetailModal]       = useState(null);
//   const [detailLoading, setDetailLoading]   = useState(false);

//   // ── Role info ──
//   const authUser     = getAuthUser();
//   const userRole     = authUser?.role     || authUser?.user?.role     || "";
//   const userDistrict = authUser?.district || authUser?.user?.district || "";
//   const isDistrictAdmin = userRole === "districtadmin";

//   // ── Fetch all surveys ──
//   const fetchSurveys = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/surveys");
//       if (res.data.success) setSurveys(res.data.data || []);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to load surveys");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchSurveys(); }, []);

//   // ── Fetch single survey detail ──
//   const openDetail = async (submissionid) => {
//     setDetailLoading(true);
//     setDetailModal({ submissionid, loading: true });
//     try {
//       const res = await axiosInstance.get(`/surveys/${submissionid}`);
//       if (res.data.success) {
//         setDetailModal({ ...res.data, submissionid, loading: false });
//       }
//     } catch (err) {
//       toast.error("Failed to load survey detail");
//       setDetailModal(null);
//     } finally {
//       setDetailLoading(false);
//     }
//   };

//   // ── Derived filter options ──
//   const orgTypeOptions = useMemo(() => {
//     return [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort();
//   }, [surveys]);

//   // ── Filtered list ──
//   const filtered = useMemo(() => {
//     return surveys.filter((s) => {
//       // District admin — fakt tyach district che disel
//       if (isDistrictAdmin && userDistrict) {
//         if (s.district !== userDistrict) return false;
//       }
//       const distMatch   = filterDistrict === "all" || s.district === filterDistrict;
//       const typeMatch   = filterOrgType  === "all" || s.orgtype  === filterOrgType;
//       const q           = search.toLowerCase();
//       const searchMatch = !q ||
//         (s.orgname       || "").toLowerCase().includes(q) ||
//         (s.concernname   || "").toLowerCase().includes(q) ||
//         (s.concernmobile || "").includes(q) ||
//         (s.district      || "").toLowerCase().includes(q);
//       return distMatch && typeMatch && searchMatch;
//     });
//   }, [surveys, filterDistrict, filterOrgType, search, isDistrictAdmin, userDistrict]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//         .sv-page { min-height:100vh; width:100%; background-color:${CREAM}; font-family:'Inter',-apple-system,sans-serif; padding:40px; }
//         .sv-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
//         .sv-title-row { display:flex; align-items:center; gap:14px; }
//         .sv-icon-badge { width:48px; height:48px; border-radius:14px; flex-shrink:0; background:rgba(205,54,107,0.10); display:flex; align-items:center; justify-content:center; color:${PINK}; }
//         .sv-title    { color:${BLUE_DEEP}; font-size:24px; font-weight:800; letter-spacing:-0.3px; }
//         .sv-subtitle { color:rgba(44,61,131,0.55); font-size:13.5px; margin-top:2px; }
//         .sv-district-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(205,54,107,0.10); border-radius:999px; font-size:12.5px; font-weight:700; color:${PINK}; margin-top:6px; }
//         .sv-refresh-btn { display:flex; align-items:center; gap:8px; padding:13px 22px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; background:linear-gradient(135deg,${PINK} 0%,${PINK_DARK} 100%); box-shadow:0 10px 26px rgba(205,54,107,0.32); transition:all .2s; }
//         .sv-refresh-btn:hover { transform:translateY(-2px); }
//         .sv-stats { display:flex; gap:14px; margin-bottom:24px; flex-wrap:wrap; }
//         .sv-stat-card { flex:1; min-width:180px; background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 8px 24px rgba(44,61,131,0.06); display:flex; align-items:center; gap:14px; }
//         .sv-stat-icon { width:42px; height:42px; border-radius:12px; flex-shrink:0; background:rgba(44,61,131,0.06); display:flex; align-items:center; justify-content:center; color:${BLUE}; }
//         .sv-stat-num   { font-size:22px; font-weight:800; color:${BLUE_DEEP}; line-height:1.1; }
//         .sv-stat-label { font-size:11.5px; color:rgba(44,61,131,0.5); font-weight:600; margin-top:2px; }
//         .sv-table-card { background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 18px 50px rgba(44,61,131,0.08); overflow:hidden; }
//         .sv-table-head { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:1px solid rgba(44,61,131,0.08); flex-wrap:wrap; gap:12px; }
//         .sv-table-head-left { display:flex; align-items:center; gap:10px; }
//         .sv-table-head-title { font-size:14px; font-weight:800; color:${BLUE_DEEP}; }
//         .sv-table-count { font-size:11.5px; font-weight:700; color:${PINK}; background:rgba(205,54,107,0.08); padding:4px 12px; border-radius:999px; }
//         .sv-filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
//         .sv-search-wrap { display:flex; align-items:center; gap:8px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; }
//         .sv-search-wrap svg { color:rgba(44,61,131,0.4); }
//         .sv-search-input { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:500; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; width:160px; }
//         .sv-search-input::placeholder { color:rgba(44,61,131,0.35); }
//         .sv-filter-select-wrap { display:flex; align-items:center; gap:7px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; cursor:pointer; transition:all .2s; }
//         .sv-filter-select-wrap:hover { border-color:rgba(44,61,131,0.28); }
//         .sv-filter-select { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; cursor:pointer; appearance:none; -webkit-appearance:none; padding-right:4px; }
//         .sv-table-wrap { overflow-x:auto; }
//         table.sv-table { width:100%; border-collapse:collapse; }
//         .sv-table thead th { text-align:left; padding:13px 24px; font-size:10.5px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase; color:rgba(44,61,131,0.45); background:rgba(44,61,131,0.025); white-space:nowrap; }
//         .sv-table tbody td { padding:15px 24px; font-size:13.5px; color:${BLUE_DEEP}; border-top:1px solid rgba(44,61,131,0.06); white-space:nowrap; }
//         .sv-table tbody tr:hover { background:rgba(205,54,107,0.02); cursor:pointer; }
//         .sv-org-cell { display:flex; align-items:center; gap:10px; }
//         .sv-avatar { width:34px; height:34px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; }
//         .sv-orgname { font-weight:700; }
//         .sv-orgtype { font-size:11.5px; color:rgba(44,61,131,0.45); margin-top:1px; }
//         .sv-district-pill { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700; color:${BLUE}; background:rgba(44,61,131,0.06); padding:5px 12px; border-radius:999px; }
//         .sv-date { color:rgba(44,61,131,0.55); font-size:12.5px; }
//         .sv-view-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
//         .sv-view-btn:hover { background:rgba(205,54,107,0.16); }
//         .sv-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
//         .sv-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
//         .sv-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
//         .sv-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:svFade .2s ease both; }
//         @keyframes svFade { from{opacity:0} to{opacity:1} }
//         .sv-modal { width:100%; max-width:560px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:88vh; overflow-y:auto; animation:svUp .3s cubic-bezier(.22,.9,.36,1) both; }
//         @keyframes svUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//         .sv-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid rgba(44,61,131,0.08); }
//         .sv-modal-title { font-size:17px; font-weight:800; color:${BLUE_DEEP}; }
//         .sv-modal-sub   { font-size:12px; color:${PINK}; font-weight:600; margin-top:2px; }
//         .sv-modal-close { width:30px; height:30px; border-radius:9px; border:none; background:rgba(44,61,131,0.06); color:rgba(44,61,131,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:18px; font-weight:700; line-height:1; }
//         .sv-modal-close:hover { background:rgba(44,61,131,0.12); }
//         .sv-modal-section { margin-bottom:20px; }
//         .sv-modal-section-title { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.45); margin-bottom:12px; }
//         .sv-modal-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
//         .sv-modal-info-item { background:rgba(44,61,131,0.03); border-radius:10px; padding:10px 14px; }
//         .sv-modal-info-label { font-size:10.5px; color:rgba(44,61,131,0.45); font-weight:700; margin-bottom:3px; }
//         .sv-modal-info-val   { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
//         .sv-answers-grid { display:flex; flex-direction:column; gap:8px; }
//         .sv-answer-row { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(44,61,131,0.025); border-radius:10px; }
//         .sv-answer-q   { font-size:12.5px; color:${BLUE_DEEP}; font-weight:500; }
//         .sv-answer-qid { font-size:11px; color:rgba(44,61,131,0.4); margin-right:8px; }
//         .sv-ans-yes { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#15803d; background:rgba(34,197,94,0.12); }
//         .sv-ans-no  { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#b91c1c; background:rgba(239,68,68,0.12); }
//         @media (max-width:700px) { .sv-page{padding:20px;} .sv-stats{flex-direction:column;} .sv-modal-info-grid{grid-template-columns:1fr;} }
//       `}</style>

//       <div className="sv-page">

//         {/* ── Header ── */}
//         <div className="sv-header">
//           <div className="sv-title-row">
//             <div className="sv-icon-badge"><FiClipboard size={22} /></div>
//             <div>
//               <div className="sv-title">POSH Survey Submissions</div>
//               {isDistrictAdmin && userDistrict ? (
//                 <div className="sv-district-badge">
//                   <FiMapPin size={12} /> {userDistrict} District Only
//                 </div>
//               ) : (
//                 <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
//               )}
//             </div>
//           </div>
//           <button className="sv-refresh-btn" onClick={fetchSurveys}>
//             <FiShield size={16} /> Refresh
//           </button>
//         </div>

//         {/* ── Stats ── */}
//         <div className="sv-stats">
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiClipboard size={18} /></div>
//             <div>
//               <div className="sv-stat-num">{filtered.length}</div>
//               <div className="sv-stat-label">Total Submissions</div>
//             </div>
//           </div>
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiMapPin size={18} /></div>
//             <div>
//               <div className="sv-stat-num">{new Set(filtered.map((s) => s.district)).size}</div>
//               <div className="sv-stat-label">Districts Covered</div>
//             </div>
//           </div>
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
//             <div>
//               <div className="sv-stat-num">{isDistrictAdmin ? 1 : 34}</div>
//               <div className="sv-stat-label">Total Districts in MH</div>
//             </div>
//           </div>
//         </div>

//         {/* ── Table ── */}
//         <div className="sv-table-card">
//           <div className="sv-table-head">
//             <div className="sv-table-head-left">
//               <span className="sv-table-head-title">All Survey Submissions</span>
//               <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
//             </div>

//             <div className="sv-filters">
//               {/* Search */}
//               <div className="sv-search-wrap">
//                 <FiSearch size={13} />
//                 <input
//                   className="sv-search-input"
//                   placeholder="Search org, contact..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* District filter — only superadmin/stateadmin la disel */}
//               {!isDistrictAdmin && (
//                 <div className="sv-filter-select-wrap">
//                   <FiMapPin size={13} />
//                   <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
//                     <option value="all">All Districts</option>
//                     {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
//                   </select>
//                   <FiChevronDown size={13} />
//                 </div>
//               )}

//               {/* Org Type filter */}
//               <div className="sv-filter-select-wrap">
//                 <FiFilter size={13} />
//                 <select className="sv-filter-select" value={filterOrgType} onChange={(e) => setFilterOrgType(e.target.value)}>
//                   <option value="all">All Types</option>
//                   {orgTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
//                 </select>
//                 <FiChevronDown size={13} />
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="sv-loading">Loading surveys…</div>
//           ) : filtered.length === 0 ? (
//             <div className="sv-empty">
//               <div className="sv-empty-icon"><FiClipboard size={24} /></div>
//               {surveys.length === 0 ? "No survey submissions yet." : "No records match the selected filters."}
//             </div>
//           ) : (
//             <div className="sv-table-wrap">
//               <table className="sv-table">
//                 <thead>
//                   <tr>
//                     <th>Organization</th>
//                     <th>Contact Person</th>
//                     <th>Mobile</th>
//                     <th>District</th>
//                     <th>Taluka</th>
//                     <th>Submitted On</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.map((s) => (
//                     <tr key={s.submissionid}>
//                       <td>
//                         <div className="sv-org-cell">
//                           <div className="sv-avatar">{(s.orgname || "?").charAt(0).toUpperCase()}</div>
//                           <div>
//                             <div className="sv-orgname">{s.orgname || "—"}</div>
//                             <div className="sv-orgtype">{s.orgtype || "—"}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{s.concernname || "—"}</td>
//                       <td>{s.concernmobile || "—"}</td>
//                       <td><span className="sv-district-pill"><FiMapPin size={11} /> {s.district || "—"}</span></td>
//                       <td>{s.taluka || "—"}</td>
//                       <td className="sv-date">
//                         {s.submittedat
//                           ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//                           : "—"}
//                       </td>
//                       <td>
//                         <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
//                           <FiEye size={13} /> View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Detail Modal ── */}
//       {detailModal && (
//         <div className="sv-overlay" onClick={() => setDetailModal(null)}>
//           <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="sv-modal-head">
//               <div>
//                 <div className="sv-modal-title">Survey Detail</div>
//                 <div className="sv-modal-sub">Submission #{detailModal.submissionid}</div>
//               </div>
//               <button className="sv-modal-close" onClick={() => setDetailModal(null)}>×</button>
//             </div>

//             {detailModal.loading ? (
//               <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading…</div>
//             ) : (
//               <>
//                 <div className="sv-modal-section">
//                   <div className="sv-modal-section-title">Organization Info</div>
//                   <div className="sv-modal-info-grid">
//                     {[
//                       ["Org Name",  detailModal.submission?.orgname],
//                       ["Org Type",  detailModal.submission?.orgtype],
//                       ["District",  detailModal.submission?.district],
//                       ["Taluka",    detailModal.submission?.taluka],
//                       ["Ward",      detailModal.submission?.ward],
//                       ["Contact",   detailModal.submission?.concernname],
//                       ["Mobile",    detailModal.submission?.concernmobile],
//                       ["Submitted", detailModal.submission?.submittedat
//                         ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//                         : "—"],
//                     ].map(([label, val]) => (
//                       <div key={label} className="sv-modal-info-item">
//                         <div className="sv-modal-info-label">{label}</div>
//                         <div className="sv-modal-info-val">{val || "—"}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="sv-modal-section">
//                   <div className="sv-modal-section-title">
//                     Survey Answers ({Object.keys(detailModal.answers || {}).length} questions)
//                   </div>
//                   <div className="sv-answers-grid">
//                     {Object.entries(detailModal.answers || {}).map(([qid, ans]) => (
//                       <div key={qid} className="sv-answer-row">
//                         <span className="sv-answer-q">
//                           <span className="sv-answer-qid">Q{qid}.</span>
//                           Question {qid}
//                         </span>
//                         <span className={ans === "yes" ? "sv-ans-yes" : "sv-ans-no"}>
//                           {ans === "yes" ? "✓ Yes" : "✗ No"}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FiShield, FiMapPin, FiFilter, FiChevronDown,
  FiCheckCircle, FiEye, FiClipboard, FiSearch,
  FiUserPlus,
} from "react-icons/fi";
import axiosInstance from "../services/axiosInstance";

const PINK      = "#CD366B";
const PINK_DARK = "#b82a5c";
const BLUE      = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const CREAM     = "#FBF3EE";

const MH_DISTRICTS = [
  "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
  "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
  "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
  "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
  "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
  "Washim","Yavatmal",
];

const getAuthUser = () => {
  try { return JSON.parse(localStorage.getItem("authUser") || "{}"); }
  catch { return {}; }
};

export default function Surveys() {
  const [surveys, setSurveys]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [filterOrgType,  setFilterOrgType]  = useState("all");
  const [search, setSearch]                 = useState("");
  const [detailModal, setDetailModal]       = useState(null);
  const [detailLoading, setDetailLoading]   = useState(false);

  // ── Assign Officer state ──
  const [assignModal, setAssignModal]           = useState(null);
  const [officers, setOfficers]                 = useState([]);
  const [officersLoading, setOfficersLoading]   = useState(false);
  const [selectedOfficer, setSelectedOfficer]   = useState(null);
  const [assigning, setAssigning]               = useState(false);

  // ── Role info ──
  const authUser        = getAuthUser();
  const userRole        = authUser?.role     || authUser?.user?.role     || "";
  const userDistrict    = authUser?.district || authUser?.user?.district || "";
  const isDistrictAdmin = userRole === "districtadmin";

  // ── Fetch surveys ──
  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/surveys");
      if (res.data.success) setSurveys(res.data.data || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load surveys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSurveys(); }, []);

  // ── Survey detail ──
  const openDetail = async (submissionid) => {
    setDetailLoading(true);
    setDetailModal({ submissionid, loading: true });
    try {
      const res = await axiosInstance.get(`/surveys/${submissionid}`);
      if (res.data.success) setDetailModal({ ...res.data, submissionid, loading: false });
    } catch (err) {
      toast.error("Failed to load survey detail");
      setDetailModal(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // ── Open assign modal + fetch officers ──
  // const openAssignModal = async (survey) => {
  //   setAssignModal({ survey });
  //   setSelectedOfficer(null);
  //   setOfficersLoading(true);
  //   try {
  //     const res = await axiosInstance.get("/inspection-officer/get");
  //     if (res.data.success) setOfficers(res.data.data || []);
  //   } catch (err) {
  //     toast.error("Failed to load officers");
  //   } finally {
  //     setOfficersLoading(false);
  //   }
  // };


  const openAssignModal = async (survey) => {
  setAssignModal({ survey });
  setSelectedOfficer(null);
  setOfficersLoading(true);
  try {
    const res = await axiosInstance.get("/inspection-officer/get");
    if (res.data.success) {
      // Survey cha district ne filter kar
      const allOfficers = res.data.data || [];
      const districtOfficers = allOfficers.filter(
        (o) => o.district === survey.district
      );
      setOfficers(districtOfficers);
    }
  } catch (err) {
    toast.error("Failed to load officers");
  } finally {
    setOfficersLoading(false);
  }
};

  // ── Assign officer ──
  const handleAssign = async () => {
    if (!selectedOfficer) { toast.error("Officer select kara"); return; }
    setAssigning(true);
    try {
      const res = await axiosInstance.post("/assignment/assign", {
        orgid:     assignModal.survey.orgid,
        officerid: selectedOfficer,
      });
      if (res.data.success) {
        toast.success("Officer assigned successfully!");
        setAssignModal(null);
      } else {
        toast.error(res.data.message || "Assignment failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Assignment failed");
    } finally {
      setAssigning(false);
    }
  };

  // ── Filters ──
  const orgTypeOptions = useMemo(() => {
    return [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort();
  }, [surveys]);

  const filtered = useMemo(() => {
    return surveys.filter((s) => {
      if (isDistrictAdmin && userDistrict && s.district !== userDistrict) return false;
      const distMatch   = filterDistrict === "all" || s.district === filterDistrict;
      const typeMatch   = filterOrgType  === "all" || s.orgtype  === filterOrgType;
      const q           = search.toLowerCase();
      const searchMatch = !q ||
        (s.orgname       || "").toLowerCase().includes(q) ||
        (s.concernname   || "").toLowerCase().includes(q) ||
        (s.concernmobile || "").includes(q) ||
        (s.district      || "").toLowerCase().includes(q);
      return distMatch && typeMatch && searchMatch;
    });
  }, [surveys, filterDistrict, filterOrgType, search, isDistrictAdmin, userDistrict]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .sv-page { min-height:100vh; width:100%; background-color:${CREAM}; font-family:'Inter',-apple-system,sans-serif; padding:40px; }
        .sv-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
        .sv-title-row { display:flex; align-items:center; gap:14px; }
        .sv-icon-badge { width:48px; height:48px; border-radius:14px; flex-shrink:0; background:rgba(205,54,107,0.10); display:flex; align-items:center; justify-content:center; color:${PINK}; }
        .sv-title    { color:${BLUE_DEEP}; font-size:24px; font-weight:800; letter-spacing:-0.3px; }
        .sv-subtitle { color:rgba(44,61,131,0.55); font-size:13.5px; margin-top:2px; }
        .sv-district-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(205,54,107,0.10); border-radius:999px; font-size:12.5px; font-weight:700; color:${PINK}; margin-top:6px; }
        .sv-refresh-btn { display:flex; align-items:center; gap:8px; padding:13px 22px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; background:linear-gradient(135deg,${PINK} 0%,${PINK_DARK} 100%); box-shadow:0 10px 26px rgba(205,54,107,0.32); transition:all .2s; }
        .sv-refresh-btn:hover { transform:translateY(-2px); }
        .sv-stats { display:flex; gap:14px; margin-bottom:24px; flex-wrap:wrap; }
        .sv-stat-card { flex:1; min-width:180px; background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 8px 24px rgba(44,61,131,0.06); display:flex; align-items:center; gap:14px; }
        .sv-stat-icon { width:42px; height:42px; border-radius:12px; flex-shrink:0; background:rgba(44,61,131,0.06); display:flex; align-items:center; justify-content:center; color:${BLUE}; }
        .sv-stat-num   { font-size:22px; font-weight:800; color:${BLUE_DEEP}; line-height:1.1; }
        .sv-stat-label { font-size:11.5px; color:rgba(44,61,131,0.5); font-weight:600; margin-top:2px; }
        .sv-table-card { background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 18px 50px rgba(44,61,131,0.08); overflow:hidden; }
        .sv-table-head { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:1px solid rgba(44,61,131,0.08); flex-wrap:wrap; gap:12px; }
        .sv-table-head-left { display:flex; align-items:center; gap:10px; }
        .sv-table-head-title { font-size:14px; font-weight:800; color:${BLUE_DEEP}; }
        .sv-table-count { font-size:11.5px; font-weight:700; color:${PINK}; background:rgba(205,54,107,0.08); padding:4px 12px; border-radius:999px; }
        .sv-filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .sv-search-wrap { display:flex; align-items:center; gap:8px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; }
        .sv-search-wrap svg { color:rgba(44,61,131,0.4); }
        .sv-search-input { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:500; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; width:160px; }
        .sv-search-input::placeholder { color:rgba(44,61,131,0.35); }
        .sv-filter-select-wrap { display:flex; align-items:center; gap:7px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; cursor:pointer; transition:all .2s; }
        .sv-filter-select-wrap:hover { border-color:rgba(44,61,131,0.28); }
        .sv-filter-select { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; cursor:pointer; appearance:none; -webkit-appearance:none; padding-right:4px; }
        .sv-table-wrap { overflow-x:auto; }
        table.sv-table { width:100%; border-collapse:collapse; }
        .sv-table thead th { text-align:left; padding:13px 24px; font-size:10.5px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase; color:rgba(44,61,131,0.45); background:rgba(44,61,131,0.025); white-space:nowrap; }
        .sv-table tbody td { padding:15px 24px; font-size:13.5px; color:${BLUE_DEEP}; border-top:1px solid rgba(44,61,131,0.06); white-space:nowrap; }
        .sv-table tbody tr:hover { background:rgba(205,54,107,0.02); }
        .sv-org-cell { display:flex; align-items:center; gap:10px; }
        .sv-avatar { width:34px; height:34px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; }
        .sv-orgname { font-weight:700; }
        .sv-orgtype { font-size:11.5px; color:rgba(44,61,131,0.45); margin-top:1px; }
        .sv-district-pill { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700; color:${BLUE}; background:rgba(44,61,131,0.06); padding:5px 12px; border-radius:999px; }
        .sv-date { color:rgba(44,61,131,0.55); font-size:12.5px; }
        .sv-actions { display:flex; gap:8px; }
        .sv-view-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
        .sv-view-btn:hover { background:rgba(205,54,107,0.16); }
        .sv-assign-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${BLUE}; background:rgba(44,61,131,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
        .sv-assign-btn:hover { background:rgba(44,61,131,0.16); }
        .sv-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
        .sv-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
        .sv-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
        .sv-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:svFade .2s ease both; }
        @keyframes svFade { from{opacity:0} to{opacity:1} }
        .sv-modal { width:100%; max-width:560px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:88vh; overflow-y:auto; animation:svUp .3s cubic-bezier(.22,.9,.36,1) both; }
        .sv-modal-sm { max-width:460px; }
        @keyframes svUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .sv-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid rgba(44,61,131,0.08); }
        .sv-modal-title { font-size:17px; font-weight:800; color:${BLUE_DEEP}; }
        .sv-modal-sub   { font-size:12px; color:${PINK}; font-weight:600; margin-top:2px; }
        .sv-modal-close { width:30px; height:30px; border-radius:9px; border:none; background:rgba(44,61,131,0.06); color:rgba(44,61,131,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:18px; font-weight:700; line-height:1; }
        .sv-modal-close:hover { background:rgba(44,61,131,0.12); }
        .sv-modal-section { margin-bottom:20px; }
        .sv-modal-section-title { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.45); margin-bottom:12px; }
        .sv-modal-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .sv-modal-info-item { background:rgba(44,61,131,0.03); border-radius:10px; padding:10px 14px; }
        .sv-modal-info-label { font-size:10.5px; color:rgba(44,61,131,0.45); font-weight:700; margin-bottom:3px; }
        .sv-modal-info-val   { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
        .sv-answers-grid { display:flex; flex-direction:column; gap:8px; }
        .sv-answer-row { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(44,61,131,0.025); border-radius:10px; }
        .sv-answer-q   { font-size:12.5px; color:${BLUE_DEEP}; font-weight:500; }
        .sv-answer-qid { font-size:11px; color:rgba(44,61,131,0.4); margin-right:8px; }
        .sv-ans-yes { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#15803d; background:rgba(34,197,94,0.12); }
        .sv-ans-no  { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#b91c1c; background:rgba(239,68,68,0.12); }
        /* Officer assign styles */
        .sv-survey-info-box { background:rgba(44,61,131,0.04); border-radius:10px; padding:12px 14px; margin-bottom:16px; }
        .sv-survey-info-box-title { font-size:11px; font-weight:800; color:rgba(44,61,131,0.45); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px; }
        .sv-survey-info-box-val { font-size:14px; font-weight:700; color:${BLUE_DEEP}; }
        .sv-survey-info-box-sub { font-size:12px; color:rgba(44,61,131,0.5); margin-top:2px; }
        .sv-officer-list { display:flex; flex-direction:column; gap:8px; max-height:300px; overflow-y:auto; }
        .sv-officer-item { display:flex; align-items:center; gap:12px; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.10); border-radius:12px; cursor:pointer; transition:all .15s; }
        .sv-officer-item:hover { border-color:rgba(44,61,131,0.25); background:rgba(44,61,131,0.02); }
        .sv-officer-item.selected { border-color:${PINK}; background:rgba(205,54,107,0.04); }
        .sv-officer-avatar { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:14px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .sv-officer-name { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
        .sv-officer-sub  { font-size:11.5px; color:rgba(44,61,131,0.5); margin-top:1px; }
        .sv-officer-check { margin-left:auto; width:20px; height:20px; border-radius:50%; border:2px solid rgba(44,61,131,0.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .sv-officer-item.selected .sv-officer-check { background:${PINK}; border-color:${PINK}; }
        .sv-assign-submit { width:100%; padding:14px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; background:linear-gradient(135deg,${PINK},${PINK_DARK}); box-shadow:0 10px 26px rgba(205,54,107,0.28); margin-top:16px; font-family:'Inter',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .sv-assign-submit:disabled { opacity:0.5; cursor:not-allowed; }
        .sv-assign-submit:hover:not(:disabled) { transform:translateY(-1px); }
        @media (max-width:700px) { .sv-page{padding:20px;} .sv-stats{flex-direction:column;} .sv-modal-info-grid{grid-template-columns:1fr;} }
      `}</style>

      <div className="sv-page">
        {/* Header */}
        <div className="sv-header">
          <div className="sv-title-row">
            <div className="sv-icon-badge"><FiClipboard size={22} /></div>
            <div>
              <div className="sv-title">POSH Survey Submissions</div>
              {isDistrictAdmin && userDistrict ? (
                <div className="sv-district-badge"><FiMapPin size={12} /> {userDistrict} District Only</div>
              ) : (
                <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
              )}
            </div>
          </div>
          <button className="sv-refresh-btn" onClick={fetchSurveys}>
            <FiShield size={16} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="sv-stats">
          <div className="sv-stat-card">
            <div className="sv-stat-icon"><FiClipboard size={18} /></div>
            <div><div className="sv-stat-num">{filtered.length}</div><div className="sv-stat-label">Total Submissions</div></div>
          </div>
          <div className="sv-stat-card">
            <div className="sv-stat-icon"><FiMapPin size={18} /></div>
            <div><div className="sv-stat-num">{new Set(filtered.map((s) => s.district)).size}</div><div className="sv-stat-label">Districts Covered</div></div>
          </div>
          <div className="sv-stat-card">
            <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
            <div><div className="sv-stat-num">{isDistrictAdmin ? 1 : 34}</div><div className="sv-stat-label">Total Districts in MH</div></div>
          </div>
        </div>

        {/* Table */}
        <div className="sv-table-card">
          <div className="sv-table-head">
            <div className="sv-table-head-left">
              <span className="sv-table-head-title">All Survey Submissions</span>
              <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="sv-filters">
              <div className="sv-search-wrap">
                <FiSearch size={13} />
                <input className="sv-search-input" placeholder="Search org, contact..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              {!isDistrictAdmin && (
                <div className="sv-filter-select-wrap">
                  <FiMapPin size={13} />
                  <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
                    <option value="all">All Districts</option>
                    {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <FiChevronDown size={13} />
                </div>
              )}
              <div className="sv-filter-select-wrap">
                <FiFilter size={13} />
                <select className="sv-filter-select" value={filterOrgType} onChange={(e) => setFilterOrgType(e.target.value)}>
                  <option value="all">All Types</option>
                  {orgTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <FiChevronDown size={13} />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="sv-loading">Loading surveys…</div>
          ) : filtered.length === 0 ? (
            <div className="sv-empty">
              <div className="sv-empty-icon"><FiClipboard size={24} /></div>
              {surveys.length === 0 ? "No survey submissions yet." : "No records match the selected filters."}
            </div>
          ) : (
            <div className="sv-table-wrap">
              <table className="sv-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Contact Person</th>
                    <th>Mobile</th>
                    <th>District</th>
                    <th>Taluka</th>
                    <th>Submitted On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.submissionid}>
                      <td>
                        <div className="sv-org-cell">
                          <div className="sv-avatar">{(s.orgname || "?").charAt(0).toUpperCase()}</div>
                          <div>
                            <div className="sv-orgname">{s.orgname || "—"}</div>
                            <div className="sv-orgtype">{s.orgtype || "—"}</div>
                          </div>
                        </div>
                      </td>
                      <td>{s.concernname || "—"}</td>
                      <td>{s.concernmobile || "—"}</td>
                      <td><span className="sv-district-pill"><FiMapPin size={11} /> {s.district || "—"}</span></td>
                      <td>{s.taluka || "—"}</td>
                      <td className="sv-date">
                        {s.submittedat ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                      </td>
                      <td>
                        <div className="sv-actions">
                          <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
                            <FiEye size={13} /> View
                          </button>
                          {isDistrictAdmin && (
                            <button className="sv-assign-btn" onClick={() => openAssignModal(s)}>
                              <FiUserPlus size={13} /> Assign
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {detailModal && (
        <div className="sv-overlay" onClick={() => setDetailModal(null)}>
          <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sv-modal-head">
              <div>
                <div className="sv-modal-title">Survey Detail</div>
                <div className="sv-modal-sub">Submission #{detailModal.submissionid}</div>
              </div>
              <button className="sv-modal-close" onClick={() => setDetailModal(null)}>×</button>
            </div>
            {detailModal.loading ? (
              <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading…</div>
            ) : (
              <>
                <div className="sv-modal-section">
                  <div className="sv-modal-section-title">Organization Info</div>
                  <div className="sv-modal-info-grid">
                    {[
                      ["Org Name",  detailModal.submission?.orgname],
                      ["Org Type",  detailModal.submission?.orgtype],
                      ["District",  detailModal.submission?.district],
                      ["Taluka",    detailModal.submission?.taluka],
                      ["Ward",      detailModal.submission?.ward],
                      ["Contact",   detailModal.submission?.concernname],
                      ["Mobile",    detailModal.submission?.concernmobile],
                      ["Submitted", detailModal.submission?.submittedat
                        ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                        : "—"],
                    ].map(([label, val]) => (
                      <div key={label} className="sv-modal-info-item">
                        <div className="sv-modal-info-label">{label}</div>
                        <div className="sv-modal-info-val">{val || "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sv-modal-section">
                  <div className="sv-modal-section-title">
                    Survey Answers ({Object.keys(detailModal.answers || {}).length} questions)
                  </div>
                  <div className="sv-answers-grid">
                    {Object.entries(detailModal.answers || {}).map(([qid, ans]) => (
                      <div key={qid} className="sv-answer-row">
                        <span className="sv-answer-q"><span className="sv-answer-qid">Q{qid}.</span> Question {qid}</span>
                        <span className={ans === "yes" ? "sv-ans-yes" : "sv-ans-no"}>
                          {ans === "yes" ? "✓ Yes" : "✗ No"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Assign Officer Modal */}
      {assignModal && (
        <div className="sv-overlay" onClick={() => setAssignModal(null)}>
          <div className="sv-modal sv-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="sv-modal-head">
              <div>
                <div className="sv-modal-title">Assign Inspection Officer</div>
                {/* <div className="sv-modal-sub">{userDistrict} District Officers</div> */}
<div className="sv-modal-sub">{assignModal.survey.district} District Officers</div>

              </div>
              <button className="sv-modal-close" onClick={() => setAssignModal(null)}>×</button>
            </div>

            <div className="sv-survey-info-box">
              <div className="sv-survey-info-box-title">Survey Organization</div>
              <div className="sv-survey-info-box-val">{assignModal.survey.orgname || "—"}</div>
              <div className="sv-survey-info-box-sub">{assignModal.survey.district} · {assignModal.survey.taluka || "—"}</div>
            </div>

            <div className="sv-modal-section-title">Select Officer</div>

            {officersLoading ? (
              <div style={{ padding: "30px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading officers…</div>
            ) : officers.length === 0 ? (
              <div style={{ padding: "20px 0", textAlign: "center", color: "rgba(44,61,131,0.4)", fontSize: 13 }}>
                No officers found for {userDistrict} district
              </div>
            ) : (
              <div className="sv-officer-list">
                {officers.map((o) => (
                  <div
                    key={o.id}
                    className={`sv-officer-item ${selectedOfficer === o.id ? "selected" : ""}`}
                    onClick={() => setSelectedOfficer(o.id)}
                  >
                    <div className="sv-officer-avatar">{(o.fullname || "?").charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="sv-officer-name">{o.fullname}</div>
                      <div className="sv-officer-sub">@{o.username} · {o.mobile}</div>
                    </div>
                    <div className="sv-officer-check">
                      {selectedOfficer === o.id && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className="sv-assign-submit" onClick={handleAssign} disabled={assigning || !selectedOfficer}>
              {assigning ? "Assigning..." : <><FiUserPlus size={15} /> Assign Officer</>}
            </button>
          </div>
        </div>
      )}
    </>
  );
}