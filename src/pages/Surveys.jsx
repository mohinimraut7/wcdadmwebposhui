// // import React, { useState, useEffect, useMemo } from "react";
// // import { toast } from "react-toastify";
// // import {
// //   FiShield, FiMapPin, FiFilter, FiChevronDown,
// //   FiCheckCircle, FiEye, FiClipboard, FiUser,
// //   FiPhone, FiCalendar, FiBriefcase, FiSearch,
// // } from "react-icons/fi";
// // import axiosInstance from "../services/axiosInstance";

// // const PINK      = "#CD366B";
// // const PINK_DARK = "#b82a5c";
// // const BLUE      = "#2C3D83";
// // const BLUE_DEEP = "#1d2a60";
// // const CREAM     = "#FBF3EE";

// // const MH_DISTRICTS = [
// //   "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
// //   "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
// //   "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
// //   "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
// //   "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
// //   "Washim","Yavatmal",
// // ];

// // export default function Surveys() {
// //   const [surveys, setSurveys]         = useState([]);
// //   const [loading, setLoading]         = useState(true);
// //   const [filterDistrict, setFilterDistrict] = useState("all");
// //   const [filterOrgType,  setFilterOrgType]  = useState("all");
// //   const [search, setSearch]           = useState("");
// //   const [detailModal, setDetailModal] = useState(null);
// //   const [detailLoading, setDetailLoading] = useState(false);

// //   // ── Fetch all surveys ──
// //   const fetchSurveys = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axiosInstance.get("/surveys");
// //       if (res.data.success) setSurveys(res.data.data || []);
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Failed to load surveys");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchSurveys(); }, []);

// //   // ── Fetch single survey detail ──
// //   const openDetail = async (submissionid) => {
// //     setDetailLoading(true);
// //     setDetailModal({ submissionid, loading: true });
// //     try {
// //       const res = await axiosInstance.get(` /surveys/${submissionid}`);
// //       if (res.data.success) {
// //         setDetailModal({ ...res.data, submissionid, loading: false });
// //       }
// //     } catch (err) {
// //       toast.error("Failed to load survey detail");
// //       setDetailModal(null);
// //     } finally {
// //       setDetailLoading(false);
// //     }
// //   };

// //   // ── Derived filter options ──
// //   const orgTypeOptions = useMemo(() => {
// //     return [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort();
// //   }, [surveys]);

// //   // ── Filtered list ──
// //   const filtered = useMemo(() => {
// //     return surveys.filter((s) => {
// //       const distMatch = filterDistrict === "all" || s.district === filterDistrict;
// //       const typeMatch = filterOrgType  === "all" || s.orgtype  === filterOrgType;
// //       const q = search.toLowerCase();
// //       const searchMatch = !q ||
// //         (s.orgname      || "").toLowerCase().includes(q) ||
// //         (s.concernname  || "").toLowerCase().includes(q) ||
// //         (s.concernmobile|| "").includes(q) ||
// //         (s.district     || "").toLowerCase().includes(q);
// //       return distMatch && typeMatch && searchMatch;
// //     });
// //   }, [surveys, filterDistrict, filterOrgType, search]);

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; }

// //         .sv-page {
// //           min-height: 100vh; width: 100%;
// //           background-color: ${CREAM};
// //           font-family: 'Inter', -apple-system, sans-serif;
// //           padding: 40px;
// //         }

// //         .sv-header {
// //           display: flex; align-items: center; justify-content: space-between;
// //           margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
// //         }
// //         .sv-title-row { display: flex; align-items: center; gap: 14px; }
// //         .sv-icon-badge {
// //           width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
// //           background: rgba(205,54,107,0.10);
// //           display: flex; align-items: center; justify-content: center; color: ${PINK};
// //         }
// //         .sv-title    { color: ${BLUE_DEEP}; font-size: 24px; font-weight: 800; letter-spacing: -0.3px; }
// //         .sv-subtitle { color: rgba(44,61,131,0.55); font-size: 13.5px; margin-top: 2px; }

// //         .sv-refresh-btn {
// //           display: flex; align-items: center; gap: 8px;
// //           padding: 13px 22px; border: none; border-radius: 12px;
// //           font-size: 14px; font-weight: 700; cursor: pointer;
// //           color: #fff; font-family: 'Inter', sans-serif;
// //           background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
// //           box-shadow: 0 10px 26px rgba(205,54,107,0.32);
// //           transition: all .2s;
// //         }
// //         .sv-refresh-btn:hover { transform: translateY(-2px); }

// //         .sv-stats { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
// //         .sv-stat-card {
// //           flex: 1; min-width: 180px;
// //           background: #fff; border-radius: 16px; padding: 18px 20px;
// //           box-shadow: 0 8px 24px rgba(44,61,131,0.06);
// //           display: flex; align-items: center; gap: 14px;
// //         }
// //         .sv-stat-icon {
// //           width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
// //           background: rgba(44,61,131,0.06);
// //           display: flex; align-items: center; justify-content: center; color: ${BLUE};
// //         }
// //         .sv-stat-num   { font-size: 22px; font-weight: 800; color: ${BLUE_DEEP}; line-height: 1.1; }
// //         .sv-stat-label { font-size: 11.5px; color: rgba(44,61,131,0.5); font-weight: 600; margin-top: 2px; }

// //         .sv-table-card {
// //           background: #fff; border-radius: 20px;
// //           border-top: 4px solid ${PINK};
// //           box-shadow: 0 18px 50px rgba(44,61,131,0.08);
// //           overflow: hidden;
// //         }
// //         .sv-table-head {
// //           display: flex; align-items: center; justify-content: space-between;
// //           padding: 18px 24px; border-bottom: 1px solid rgba(44,61,131,0.08);
// //           flex-wrap: wrap; gap: 12px;
// //         }
// //         .sv-table-head-left { display: flex; align-items: center; gap: 10px; }
// //         .sv-table-head-title { font-size: 14px; font-weight: 800; color: ${BLUE_DEEP}; }
// //         .sv-table-count {
// //           font-size: 11.5px; font-weight: 700; color: ${PINK};
// //           background: rgba(205,54,107,0.08); padding: 4px 12px; border-radius: 999px;
// //         }

// //         .sv-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

// //         .sv-search-wrap {
// //           display: flex; align-items: center; gap: 8px;
// //           padding: 8px 14px;
// //           background: #fff;
// //           border: 1.5px solid rgba(44,61,131,0.12);
// //           border-radius: 999px;
// //         }
// //         .sv-search-wrap svg { color: rgba(44,61,131,0.4); }
// //         .sv-search-input {
// //           border: none; outline: none; background: transparent;
// //           font-size: 12.5px; font-weight: 500; color: ${BLUE_DEEP};
// //           font-family: 'Inter', sans-serif; width: 160px;
// //         }
// //         .sv-search-input::placeholder { color: rgba(44,61,131,0.35); }

// //         .sv-filter-select-wrap {
// //           display: flex; align-items: center; gap: 7px;
// //           padding: 8px 14px;
// //           background: #fff;
// //           border: 1.5px solid rgba(44,61,131,0.12);
// //           border-radius: 999px; cursor: pointer; transition: all .2s;
// //         }
// //         .sv-filter-select-wrap:hover { border-color: rgba(44,61,131,0.28); }
// //         .sv-filter-select {
// //           border: none; outline: none; background: transparent;
// //           font-size: 12.5px; font-weight: 600; color: ${BLUE_DEEP};
// //           font-family: 'Inter', sans-serif; cursor: pointer;
// //           appearance: none; -webkit-appearance: none; padding-right: 4px;
// //         }

// //         .sv-table-wrap { overflow-x: auto; }
// //         table.sv-table { width: 100%; border-collapse: collapse; }
// //         .sv-table thead th {
// //           text-align: left; padding: 13px 24px;
// //           font-size: 10.5px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
// //           color: rgba(44,61,131,0.45);
// //           background: rgba(44,61,131,0.025);
// //           white-space: nowrap;
// //         }
// //         .sv-table tbody td {
// //           padding: 15px 24px; font-size: 13.5px; color: ${BLUE_DEEP};
// //           border-top: 1px solid rgba(44,61,131,0.06);
// //           white-space: nowrap;
// //         }
// //         .sv-table tbody tr:hover { background: rgba(205,54,107,0.02); cursor: pointer; }

// //         .sv-org-cell { display: flex; align-items: center; gap: 10px; }
// //         .sv-avatar {
// //           width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
// //           background: linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP});
// //           color: #fff; font-size: 13px; font-weight: 800;
// //           display: flex; align-items: center; justify-content: center;
// //         }
// //         .sv-orgname  { font-weight: 700; }
// //         .sv-orgtype  { font-size: 11.5px; color: rgba(44,61,131,0.45); margin-top: 1px; }

// //         .sv-district-pill {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           font-size: 12px; font-weight: 700; color: ${BLUE};
// //           background: rgba(44,61,131,0.06); padding: 5px 12px; border-radius: 999px;
// //         }
// //         .sv-date { color: rgba(44,61,131,0.55); font-size: 12.5px; }

// //         .sv-view-btn {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           padding: 6px 14px; border: none; border-radius: 8px;
// //           font-size: 12px; font-weight: 700; cursor: pointer;
// //           color: ${PINK}; background: rgba(205,54,107,0.08);
// //           transition: all .15s; font-family: 'Inter', sans-serif;
// //         }
// //         .sv-view-btn:hover { background: rgba(205,54,107,0.16); }

// //         .sv-empty {
// //           padding: 70px 20px; text-align: center;
// //           color: rgba(44,61,131,0.4); font-size: 13.5px;
// //         }
// //         .sv-empty-icon {
// //           width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 14px;
// //           background: rgba(44,61,131,0.05);
// //           display: flex; align-items: center; justify-content: center; color: rgba(44,61,131,0.3);
// //         }
// //         .sv-loading { padding: 60px 20px; text-align: center; color: rgba(44,61,131,0.4); }

// //         /* ── Detail Modal ── */
// //         .sv-overlay {
// //           position: fixed; inset: 0; z-index: 1000;
// //           background: rgba(29,42,96,0.45); backdrop-filter: blur(3px);
// //           display: flex; align-items: center; justify-content: center; padding: 20px;
// //           animation: svFade .2s ease both;
// //         }
// //         @keyframes svFade { from{opacity:0} to{opacity:1} }
// //         .sv-modal {
// //           width: 100%; max-width: 560px;
// //           background: #fff; border-radius: 20px;
// //           border-top: 4px solid ${PINK};
// //           box-shadow: 0 30px 70px rgba(29,42,96,0.35);
// //           padding: 28px 30px;
// //           max-height: 88vh; overflow-y: auto;
// //           animation: svUp .3s cubic-bezier(.22,.9,.36,1) both;
// //         }
// //         @keyframes svUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
// //         .sv-modal-head {
// //           display: flex; align-items: center; justify-content: space-between;
// //           margin-bottom: 20px; padding-bottom: 16px;
// //           border-bottom: 1px solid rgba(44,61,131,0.08);
// //         }
// //         .sv-modal-title { font-size: 17px; font-weight: 800; color: ${BLUE_DEEP}; }
// //         .sv-modal-sub   { font-size: 12px; color: ${PINK}; font-weight: 600; margin-top: 2px; }
// //         .sv-modal-close {
// //           width: 30px; height: 30px; border-radius: 9px; border: none;
// //           background: rgba(44,61,131,0.06); color: rgba(44,61,131,0.5);
// //           display: flex; align-items: center; justify-content: center;
// //           cursor: pointer; font-size: 18px; font-weight: 700; line-height: 1;
// //         }
// //         .sv-modal-close:hover { background: rgba(44,61,131,0.12); }

// //         .sv-modal-section { margin-bottom: 20px; }
// //         .sv-modal-section-title {
// //           font-size: 11px; font-weight: 800; letter-spacing: 0.7px; text-transform: uppercase;
// //           color: rgba(44,61,131,0.45); margin-bottom: 12px;
// //         }
// //         .sv-modal-info-grid {
// //           display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
// //         }
// //         .sv-modal-info-item {
// //           background: rgba(44,61,131,0.03); border-radius: 10px; padding: 10px 14px;
// //         }
// //         .sv-modal-info-label { font-size: 10.5px; color: rgba(44,61,131,0.45); font-weight: 700; margin-bottom: 3px; }
// //         .sv-modal-info-val   { font-size: 13.5px; font-weight: 700; color: ${BLUE_DEEP}; }

// //         .sv-answers-grid {
// //           display: flex; flex-direction: column; gap: 8px;
// //         }
// //         .sv-answer-row {
// //           display: flex; align-items: center; justify-content: space-between;
// //           padding: 10px 14px; background: rgba(44,61,131,0.025); border-radius: 10px;
// //         }
// //         .sv-answer-q { font-size: 12.5px; color: ${BLUE_DEEP}; font-weight: 500; }
// //         .sv-answer-qid { font-size: 11px; color: rgba(44,61,131,0.4); margin-right: 8px; }
// //         .sv-ans-yes {
// //           padding: 3px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700;
// //           color: #15803d; background: rgba(34,197,94,0.12);
// //         }
// //         .sv-ans-no {
// //           padding: 3px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700;
// //           color: #b91c1c; background: rgba(239,68,68,0.12);
// //         }

// //         @media (max-width: 700px) {
// //           .sv-page { padding: 20px; }
// //           .sv-stats { flex-direction: column; }
// //           .sv-modal-info-grid { grid-template-columns: 1fr; }
// //         }
// //       `}</style>

// //       <div className="sv-page">

// //         {/* ── Header ── */}
// //         <div className="sv-header">
// //           <div className="sv-title-row">
// //             <div className="sv-icon-badge"><FiClipboard size={22} /></div>
// //             <div>
// //               <div className="sv-title">POSH Survey Submissions</div>
// //               <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
// //             </div>
// //           </div>
// //           <button className="sv-refresh-btn" onClick={fetchSurveys}>
// //             <FiShield size={16} /> Refresh
// //           </button>
// //         </div>

// //         {/* ── Stats ── */}
// //         <div className="sv-stats">
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiClipboard size={18} /></div>
// //             <div>
// //               <div className="sv-stat-num">{surveys.length}</div>
// //               <div className="sv-stat-label">Total Submissions</div>
// //             </div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiMapPin size={18} /></div>
// //             <div>
// //               <div className="sv-stat-num">{new Set(surveys.map((s) => s.district)).size}</div>
// //               <div className="sv-stat-label">Districts Covered</div>
// //             </div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
// //             <div>
// //               <div className="sv-stat-num">34</div>
// //               <div className="sv-stat-label">Total Districts in MH</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Table ── */}
// //         <div className="sv-table-card">
// //           <div className="sv-table-head">
// //             <div className="sv-table-head-left">
// //               <span className="sv-table-head-title">All Survey Submissions</span>
// //               <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
// //             </div>

// //             <div className="sv-filters">
// //               {/* Search */}
// //               <div className="sv-search-wrap">
// //                 <FiSearch size={13} />
// //                 <input
// //                   className="sv-search-input"
// //                   placeholder="Search org, contact..."
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                 />
// //               </div>

// //               {/* District filter */}
// //               <div className="sv-filter-select-wrap">
// //                 <FiMapPin size={13} />
// //                 <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
// //                   <option value="all">All Districts</option>
// //                   {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
// //                 </select>
// //                 <FiChevronDown size={13} />
// //               </div>

// //               {/* Org Type filter */}
// //               <div className="sv-filter-select-wrap">
// //                 <FiFilter size={13} />
// //                 <select className="sv-filter-select" value={filterOrgType} onChange={(e) => setFilterOrgType(e.target.value)}>
// //                   <option value="all">All Types</option>
// //                   {orgTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
// //                 </select>
// //                 <FiChevronDown size={13} />
// //               </div>
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="sv-loading">Loading surveys…</div>
// //           ) : filtered.length === 0 ? (
// //             <div className="sv-empty">
// //               <div className="sv-empty-icon"><FiClipboard size={24} /></div>
// //               {surveys.length === 0 ? "No survey submissions yet." : "No records match the selected filters."}
// //             </div>
// //           ) : (
// //             <div className="sv-table-wrap">
// //               <table className="sv-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Organization</th>
// //                     <th>Contact Person</th>
// //                     <th>Mobile</th>
// //                     <th>District</th>
// //                     <th>Taluka</th>
// //                     <th>Submitted On</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filtered.map((s) => (
// //                     <tr key={s.submissionid}>
// //                       <td>
// //                         <div className="sv-org-cell">
// //                           <div className="sv-avatar">{(s.orgname || "?").charAt(0).toUpperCase()}</div>
// //                           <div>
// //                             <div className="sv-orgname">{s.orgname || "—"}</div>
// //                             <div className="sv-orgtype">{s.orgtype || "—"}</div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td>{s.concernname || "—"}</td>
// //                       <td>{s.concernmobile || "—"}</td>
// //                       <td>
// //                         <span className="sv-district-pill">
// //                           <FiMapPin size={11} /> {s.district || "—"}
// //                         </span>
// //                       </td>
// //                       <td>{s.taluka || "—"}</td>
// //                       <td className="sv-date">
// //                         {s.submittedat
// //                           ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
// //                           : "—"}
// //                       </td>
// //                       <td>
// //                         <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
// //                           <FiEye size={13} /> View
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── Detail Modal ── */}
// //       {detailModal && (
// //         <div className="sv-overlay" onClick={() => setDetailModal(null)}>
// //           <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="sv-modal-head">
// //               <div>
// //                 <div className="sv-modal-title">Survey Detail</div>
// //                 <div className="sv-modal-sub">Submission #{detailModal.submissionid}</div>
// //               </div>
// //               <button className="sv-modal-close" onClick={() => setDetailModal(null)}>×</button>
// //             </div>

// //             {detailModal.loading ? (
// //               <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading…</div>
// //             ) : (
// //               <>
// //                 {/* Org Info */}
// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">Organization Info</div>
// //                   <div className="sv-modal-info-grid">
// //                     {[
// //                       ["Org Name",    detailModal.submission?.orgname],
// //                       ["Org Type",    detailModal.submission?.orgtype],
// //                       ["District",    detailModal.submission?.district],
// //                       ["Taluka",      detailModal.submission?.taluka],
// //                       ["Ward",        detailModal.submission?.ward],
// //                       ["Contact",     detailModal.submission?.concernname],
// //                       ["Mobile",      detailModal.submission?.concernmobile],
// //                       ["Submitted",   detailModal.submission?.submittedat
// //                         ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
// //                         : "—"],
// //                     ].map(([label, val]) => (
// //                       <div key={label} className="sv-modal-info-item">
// //                         <div className="sv-modal-info-label">{label}</div>
// //                         <div className="sv-modal-info-val">{val || "—"}</div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Answers */}
// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">
// //                     Survey Answers ({Object.keys(detailModal.answers || {}).length} questions)
// //                   </div>
// //                   <div className="sv-answers-grid">
// //                     {Object.entries(detailModal.answers || {}).map(([qid, ans]) => (
// //                       <div key={qid} className="sv-answer-row">
// //                         <span className="sv-answer-q">
// //                           <span className="sv-answer-qid">Q{qid}.</span>
// //                           Question {qid}
// //                         </span>
// //                         <span className={ans === "yes" ? "sv-ans-yes" : "sv-ans-no"}>
// //                           {ans === "yes" ? "✓ Yes" : "✗ No"}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }







// // import React, { useState, useEffect, useMemo } from "react";
// // import { toast } from "react-toastify";
// // import {
// //   FiShield, FiMapPin, FiFilter, FiChevronDown,
// //   FiCheckCircle, FiEye, FiClipboard, FiSearch,
// // } from "react-icons/fi";
// // import axiosInstance from "../services/axiosInstance";

// // const PINK      = "#CD366B";
// // const PINK_DARK = "#b82a5c";
// // const BLUE      = "#2C3D83";
// // const BLUE_DEEP = "#1d2a60";
// // const CREAM     = "#FBF3EE";

// // const MH_DISTRICTS = [
// //   "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
// //   "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
// //   "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
// //   "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
// //   "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
// //   "Washim","Yavatmal",
// // ];

// // // ── Auth user from localStorage ──────────────────────────────
// // const getAuthUser = () => {
// //   try { return JSON.parse(localStorage.getItem("authUser") || "{}"); }
// //   catch { return {}; }
// // };

// // export default function Surveys() {
// //   const [surveys, setSurveys]               = useState([]);
// //   const [loading, setLoading]               = useState(true);
// //   const [filterDistrict, setFilterDistrict] = useState("all");
// //   const [filterOrgType,  setFilterOrgType]  = useState("all");
// //   const [search, setSearch]                 = useState("");
// //   const [detailModal, setDetailModal]       = useState(null);
// //   const [detailLoading, setDetailLoading]   = useState(false);

// //   // ── Role info ──
// //   const authUser     = getAuthUser();
// //   const userRole     = authUser?.role     || authUser?.user?.role     || "";
// //   const userDistrict = authUser?.district || authUser?.user?.district || "";
// //   const isDistrictAdmin = userRole === "districtadmin";

// //   // ── Fetch all surveys ──
// //   const fetchSurveys = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axiosInstance.get("/surveys");
// //       if (res.data.success) setSurveys(res.data.data || []);
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Failed to load surveys");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchSurveys(); }, []);

// //   // ── Fetch single survey detail ──
// //   const openDetail = async (submissionid) => {
// //     setDetailLoading(true);
// //     setDetailModal({ submissionid, loading: true });
// //     try {
// //       const res = await axiosInstance.get(`/surveys/${submissionid}`);
// //       if (res.data.success) {
// //         setDetailModal({ ...res.data, submissionid, loading: false });
// //       }
// //     } catch (err) {
// //       toast.error("Failed to load survey detail");
// //       setDetailModal(null);
// //     } finally {
// //       setDetailLoading(false);
// //     }
// //   };

// //   // ── Derived filter options ──
// //   const orgTypeOptions = useMemo(() => {
// //     return [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort();
// //   }, [surveys]);

// //   // ── Filtered list ──
// //   const filtered = useMemo(() => {
// //     return surveys.filter((s) => {
// //       // District admin — fakt tyach district che disel
// //       if (isDistrictAdmin && userDistrict) {
// //         if (s.district !== userDistrict) return false;
// //       }
// //       const distMatch   = filterDistrict === "all" || s.district === filterDistrict;
// //       const typeMatch   = filterOrgType  === "all" || s.orgtype  === filterOrgType;
// //       const q           = search.toLowerCase();
// //       const searchMatch = !q ||
// //         (s.orgname       || "").toLowerCase().includes(q) ||
// //         (s.concernname   || "").toLowerCase().includes(q) ||
// //         (s.concernmobile || "").includes(q) ||
// //         (s.district      || "").toLowerCase().includes(q);
// //       return distMatch && typeMatch && searchMatch;
// //     });
// //   }, [surveys, filterDistrict, filterOrgType, search, isDistrictAdmin, userDistrict]);

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; }
// //         .sv-page { min-height:100vh; width:100%; background-color:${CREAM}; font-family:'Inter',-apple-system,sans-serif; padding:40px; }
// //         .sv-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
// //         .sv-title-row { display:flex; align-items:center; gap:14px; }
// //         .sv-icon-badge { width:48px; height:48px; border-radius:14px; flex-shrink:0; background:rgba(205,54,107,0.10); display:flex; align-items:center; justify-content:center; color:${PINK}; }
// //         .sv-title    { color:${BLUE_DEEP}; font-size:24px; font-weight:800; letter-spacing:-0.3px; }
// //         .sv-subtitle { color:rgba(44,61,131,0.55); font-size:13.5px; margin-top:2px; }
// //         .sv-district-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(205,54,107,0.10); border-radius:999px; font-size:12.5px; font-weight:700; color:${PINK}; margin-top:6px; }
// //         .sv-refresh-btn { display:flex; align-items:center; gap:8px; padding:13px 22px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; background:linear-gradient(135deg,${PINK} 0%,${PINK_DARK} 100%); box-shadow:0 10px 26px rgba(205,54,107,0.32); transition:all .2s; }
// //         .sv-refresh-btn:hover { transform:translateY(-2px); }
// //         .sv-stats { display:flex; gap:14px; margin-bottom:24px; flex-wrap:wrap; }
// //         .sv-stat-card { flex:1; min-width:180px; background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 8px 24px rgba(44,61,131,0.06); display:flex; align-items:center; gap:14px; }
// //         .sv-stat-icon { width:42px; height:42px; border-radius:12px; flex-shrink:0; background:rgba(44,61,131,0.06); display:flex; align-items:center; justify-content:center; color:${BLUE}; }
// //         .sv-stat-num   { font-size:22px; font-weight:800; color:${BLUE_DEEP}; line-height:1.1; }
// //         .sv-stat-label { font-size:11.5px; color:rgba(44,61,131,0.5); font-weight:600; margin-top:2px; }
// //         .sv-table-card { background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 18px 50px rgba(44,61,131,0.08); overflow:hidden; }
// //         .sv-table-head { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:1px solid rgba(44,61,131,0.08); flex-wrap:wrap; gap:12px; }
// //         .sv-table-head-left { display:flex; align-items:center; gap:10px; }
// //         .sv-table-head-title { font-size:14px; font-weight:800; color:${BLUE_DEEP}; }
// //         .sv-table-count { font-size:11.5px; font-weight:700; color:${PINK}; background:rgba(205,54,107,0.08); padding:4px 12px; border-radius:999px; }
// //         .sv-filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
// //         .sv-search-wrap { display:flex; align-items:center; gap:8px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; }
// //         .sv-search-wrap svg { color:rgba(44,61,131,0.4); }
// //         .sv-search-input { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:500; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; width:160px; }
// //         .sv-search-input::placeholder { color:rgba(44,61,131,0.35); }
// //         .sv-filter-select-wrap { display:flex; align-items:center; gap:7px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; cursor:pointer; transition:all .2s; }
// //         .sv-filter-select-wrap:hover { border-color:rgba(44,61,131,0.28); }
// //         .sv-filter-select { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; cursor:pointer; appearance:none; -webkit-appearance:none; padding-right:4px; }
// //         .sv-table-wrap { overflow-x:auto; }
// //         table.sv-table { width:100%; border-collapse:collapse; }
// //         .sv-table thead th { text-align:left; padding:13px 24px; font-size:10.5px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase; color:rgba(44,61,131,0.45); background:rgba(44,61,131,0.025); white-space:nowrap; }
// //         .sv-table tbody td { padding:15px 24px; font-size:13.5px; color:${BLUE_DEEP}; border-top:1px solid rgba(44,61,131,0.06); white-space:nowrap; }
// //         .sv-table tbody tr:hover { background:rgba(205,54,107,0.02); cursor:pointer; }
// //         .sv-org-cell { display:flex; align-items:center; gap:10px; }
// //         .sv-avatar { width:34px; height:34px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; }
// //         .sv-orgname { font-weight:700; }
// //         .sv-orgtype { font-size:11.5px; color:rgba(44,61,131,0.45); margin-top:1px; }
// //         .sv-district-pill { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700; color:${BLUE}; background:rgba(44,61,131,0.06); padding:5px 12px; border-radius:999px; }
// //         .sv-date { color:rgba(44,61,131,0.55); font-size:12.5px; }
// //         .sv-view-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
// //         .sv-view-btn:hover { background:rgba(205,54,107,0.16); }
// //         .sv-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
// //         .sv-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
// //         .sv-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
// //         .sv-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:svFade .2s ease both; }
// //         @keyframes svFade { from{opacity:0} to{opacity:1} }
// //         .sv-modal { width:100%; max-width:560px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:88vh; overflow-y:auto; animation:svUp .3s cubic-bezier(.22,.9,.36,1) both; }
// //         @keyframes svUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
// //         .sv-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid rgba(44,61,131,0.08); }
// //         .sv-modal-title { font-size:17px; font-weight:800; color:${BLUE_DEEP}; }
// //         .sv-modal-sub   { font-size:12px; color:${PINK}; font-weight:600; margin-top:2px; }
// //         .sv-modal-close { width:30px; height:30px; border-radius:9px; border:none; background:rgba(44,61,131,0.06); color:rgba(44,61,131,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:18px; font-weight:700; line-height:1; }
// //         .sv-modal-close:hover { background:rgba(44,61,131,0.12); }
// //         .sv-modal-section { margin-bottom:20px; }
// //         .sv-modal-section-title { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.45); margin-bottom:12px; }
// //         .sv-modal-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
// //         .sv-modal-info-item { background:rgba(44,61,131,0.03); border-radius:10px; padding:10px 14px; }
// //         .sv-modal-info-label { font-size:10.5px; color:rgba(44,61,131,0.45); font-weight:700; margin-bottom:3px; }
// //         .sv-modal-info-val   { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
// //         .sv-answers-grid { display:flex; flex-direction:column; gap:8px; }
// //         .sv-answer-row { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(44,61,131,0.025); border-radius:10px; }
// //         .sv-answer-q   { font-size:12.5px; color:${BLUE_DEEP}; font-weight:500; }
// //         .sv-answer-qid { font-size:11px; color:rgba(44,61,131,0.4); margin-right:8px; }
// //         .sv-ans-yes { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#15803d; background:rgba(34,197,94,0.12); }
// //         .sv-ans-no  { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#b91c1c; background:rgba(239,68,68,0.12); }
// //         @media (max-width:700px) { .sv-page{padding:20px;} .sv-stats{flex-direction:column;} .sv-modal-info-grid{grid-template-columns:1fr;} }
// //       `}</style>

// //       <div className="sv-page">

// //         {/* ── Header ── */}
// //         <div className="sv-header">
// //           <div className="sv-title-row">
// //             <div className="sv-icon-badge"><FiClipboard size={22} /></div>
// //             <div>
// //               <div className="sv-title">POSH Survey Submissions</div>
// //               {isDistrictAdmin && userDistrict ? (
// //                 <div className="sv-district-badge">
// //                   <FiMapPin size={12} /> {userDistrict} District Only
// //                 </div>
// //               ) : (
// //                 <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
// //               )}
// //             </div>
// //           </div>
// //           <button className="sv-refresh-btn" onClick={fetchSurveys}>
// //             <FiShield size={16} /> Refresh
// //           </button>
// //         </div>

// //         {/* ── Stats ── */}
// //         <div className="sv-stats">
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiClipboard size={18} /></div>
// //             <div>
// //               <div className="sv-stat-num">{filtered.length}</div>
// //               <div className="sv-stat-label">Total Submissions</div>
// //             </div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiMapPin size={18} /></div>
// //             <div>
// //               <div className="sv-stat-num">{new Set(filtered.map((s) => s.district)).size}</div>
// //               <div className="sv-stat-label">Districts Covered</div>
// //             </div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
// //             <div>
// //               <div className="sv-stat-num">{isDistrictAdmin ? 1 : 34}</div>
// //               <div className="sv-stat-label">Total Districts in MH</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Table ── */}
// //         <div className="sv-table-card">
// //           <div className="sv-table-head">
// //             <div className="sv-table-head-left">
// //               <span className="sv-table-head-title">All Survey Submissions</span>
// //               <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
// //             </div>

// //             <div className="sv-filters">
// //               {/* Search */}
// //               <div className="sv-search-wrap">
// //                 <FiSearch size={13} />
// //                 <input
// //                   className="sv-search-input"
// //                   placeholder="Search org, contact..."
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                 />
// //               </div>

// //               {/* District filter — only superadmin/stateadmin la disel */}
// //               {!isDistrictAdmin && (
// //                 <div className="sv-filter-select-wrap">
// //                   <FiMapPin size={13} />
// //                   <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
// //                     <option value="all">All Districts</option>
// //                     {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
// //                   </select>
// //                   <FiChevronDown size={13} />
// //                 </div>
// //               )}

// //               {/* Org Type filter */}
// //               <div className="sv-filter-select-wrap">
// //                 <FiFilter size={13} />
// //                 <select className="sv-filter-select" value={filterOrgType} onChange={(e) => setFilterOrgType(e.target.value)}>
// //                   <option value="all">All Types</option>
// //                   {orgTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
// //                 </select>
// //                 <FiChevronDown size={13} />
// //               </div>
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="sv-loading">Loading surveys…</div>
// //           ) : filtered.length === 0 ? (
// //             <div className="sv-empty">
// //               <div className="sv-empty-icon"><FiClipboard size={24} /></div>
// //               {surveys.length === 0 ? "No survey submissions yet." : "No records match the selected filters."}
// //             </div>
// //           ) : (
// //             <div className="sv-table-wrap">
// //               <table className="sv-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Organization</th>
// //                     <th>Contact Person</th>
// //                     <th>Mobile</th>
// //                     <th>District</th>
// //                     <th>Taluka</th>
// //                     <th>Submitted On</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filtered.map((s) => (
// //                     <tr key={s.submissionid}>
// //                       <td>
// //                         <div className="sv-org-cell">
// //                           <div className="sv-avatar">{(s.orgname || "?").charAt(0).toUpperCase()}</div>
// //                           <div>
// //                             <div className="sv-orgname">{s.orgname || "—"}</div>
// //                             <div className="sv-orgtype">{s.orgtype || "—"}</div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td>{s.concernname || "—"}</td>
// //                       <td>{s.concernmobile || "—"}</td>
// //                       <td><span className="sv-district-pill"><FiMapPin size={11} /> {s.district || "—"}</span></td>
// //                       <td>{s.taluka || "—"}</td>
// //                       <td className="sv-date">
// //                         {s.submittedat
// //                           ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
// //                           : "—"}
// //                       </td>
// //                       <td>
// //                         <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
// //                           <FiEye size={13} /> View
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── Detail Modal ── */}
// //       {detailModal && (
// //         <div className="sv-overlay" onClick={() => setDetailModal(null)}>
// //           <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="sv-modal-head">
// //               <div>
// //                 <div className="sv-modal-title">Survey Detail</div>
// //                 <div className="sv-modal-sub">Submission #{detailModal.submissionid}</div>
// //               </div>
// //               <button className="sv-modal-close" onClick={() => setDetailModal(null)}>×</button>
// //             </div>

// //             {detailModal.loading ? (
// //               <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading…</div>
// //             ) : (
// //               <>
// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">Organization Info</div>
// //                   <div className="sv-modal-info-grid">
// //                     {[
// //                       ["Org Name",  detailModal.submission?.orgname],
// //                       ["Org Type",  detailModal.submission?.orgtype],
// //                       ["District",  detailModal.submission?.district],
// //                       ["Taluka",    detailModal.submission?.taluka],
// //                       ["Ward",      detailModal.submission?.ward],
// //                       ["Contact",   detailModal.submission?.concernname],
// //                       ["Mobile",    detailModal.submission?.concernmobile],
// //                       ["Submitted", detailModal.submission?.submittedat
// //                         ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
// //                         : "—"],
// //                     ].map(([label, val]) => (
// //                       <div key={label} className="sv-modal-info-item">
// //                         <div className="sv-modal-info-label">{label}</div>
// //                         <div className="sv-modal-info-val">{val || "—"}</div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">
// //                     Survey Answers ({Object.keys(detailModal.answers || {}).length} questions)
// //                   </div>
// //                   <div className="sv-answers-grid">
// //                     {Object.entries(detailModal.answers || {}).map(([qid, ans]) => (
// //                       <div key={qid} className="sv-answer-row">
// //                         <span className="sv-answer-q">
// //                           <span className="sv-answer-qid">Q{qid}.</span>
// //                           Question {qid}
// //                         </span>
// //                         <span className={ans === "yes" ? "sv-ans-yes" : "sv-ans-no"}>
// //                           {ans === "yes" ? "✓ Yes" : "✗ No"}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }



// // ===========================================



// // import React, { useState, useEffect, useMemo } from "react";
// // import { toast } from "react-toastify";
// // import {
// //   FiShield, FiMapPin, FiFilter, FiChevronDown,
// //   FiCheckCircle, FiEye, FiClipboard, FiSearch,
// //   FiUserPlus,
// // } from "react-icons/fi";
// // import axiosInstance from "../services/axiosInstance";

// // const PINK      = "#CD366B";
// // const PINK_DARK = "#b82a5c";
// // const BLUE      = "#2C3D83";
// // const BLUE_DEEP = "#1d2a60";
// // const CREAM     = "#FBF3EE";

// // const MH_DISTRICTS = [
// //   "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
// //   "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
// //   "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
// //   "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
// //   "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
// //   "Washim","Yavatmal",
// // ];

// // const getAuthUser = () => {
// //   try { return JSON.parse(localStorage.getItem("authUser") || "{}"); }
// //   catch { return {}; }
// // };

// // export default function Surveys() {
// //   const [surveys, setSurveys]               = useState([]);
// //   const [loading, setLoading]               = useState(true);
// //   const [filterDistrict, setFilterDistrict] = useState("all");
// //   const [filterOrgType,  setFilterOrgType]  = useState("all");
// //   const [search, setSearch]                 = useState("");
// //   const [detailModal, setDetailModal]       = useState(null);
// //   const [detailLoading, setDetailLoading]   = useState(false);

// //   // ── Assign Officer state ──
// //   const [assignModal, setAssignModal]           = useState(null);
// //   const [officers, setOfficers]                 = useState([]);
// //   const [officersLoading, setOfficersLoading]   = useState(false);
// //   const [selectedOfficer, setSelectedOfficer]   = useState(null);
// //   const [assigning, setAssigning]               = useState(false);

// //   // ── Role info ──
// //   const authUser        = getAuthUser();
// //   const userRole        = authUser?.role     || authUser?.user?.role     || "";
// //   const userDistrict    = authUser?.district || authUser?.user?.district || "";
// //   const isDistrictAdmin = userRole === "districtadmin";

// //   // ── Fetch surveys ──
// //   const fetchSurveys = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axiosInstance.get("/surveys");
// //       if (res.data.success) setSurveys(res.data.data || []);
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Failed to load surveys");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchSurveys(); }, []);

// //   // ── Survey detail ──
// //   const openDetail = async (submissionid) => {
// //     setDetailLoading(true);
// //     setDetailModal({ submissionid, loading: true });
// //     try {
// //       const res = await axiosInstance.get(`/surveys/${submissionid}`);
// //       if (res.data.success) setDetailModal({ ...res.data, submissionid, loading: false });
// //     } catch (err) {
// //       toast.error("Failed to load survey detail");
// //       setDetailModal(null);
// //     } finally {
// //       setDetailLoading(false);
// //     }
// //   };

// //   // ── Open assign modal + fetch officers ──
// //   // const openAssignModal = async (survey) => {
// //   //   setAssignModal({ survey });
// //   //   setSelectedOfficer(null);
// //   //   setOfficersLoading(true);
// //   //   try {
// //   //     const res = await axiosInstance.get("/inspection-officer/get");
// //   //     if (res.data.success) setOfficers(res.data.data || []);
// //   //   } catch (err) {
// //   //     toast.error("Failed to load officers");
// //   //   } finally {
// //   //     setOfficersLoading(false);
// //   //   }
// //   // };


// //   const openAssignModal = async (survey) => {
// //   setAssignModal({ survey });
// //   setSelectedOfficer(null);
// //   setOfficersLoading(true);
// //   try {
// //     const res = await axiosInstance.get("/inspection-officer/get");
// //     if (res.data.success) {
// //       // Survey cha district ne filter kar
// //       const allOfficers = res.data.data || [];
// //       const districtOfficers = allOfficers.filter(
// //         (o) => o.district === survey.district
// //       );
// //       setOfficers(districtOfficers);
// //     }
// //   } catch (err) {
// //     toast.error("Failed to load officers");
// //   } finally {
// //     setOfficersLoading(false);
// //   }
// // };

// //   // ── Assign officer ──
// //   const handleAssign = async () => {
// //     if (!selectedOfficer) { toast.error("Officer select kara"); return; }
// //     setAssigning(true);
// //     try {
// //       const res = await axiosInstance.post("/assignment/assign", {
// //         orgid:     assignModal.survey.orgid,
// //         officerid: selectedOfficer,
// //       });
// //       if (res.data.success) {
// //         toast.success("Officer assigned successfully!");
// //         setAssignModal(null);
// //       } else {
// //         toast.error(res.data.message || "Assignment failed");
// //       }
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Assignment failed");
// //     } finally {
// //       setAssigning(false);
// //     }
// //   };

// //   // ── Filters ──
// //   const orgTypeOptions = useMemo(() => {
// //     return [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort();
// //   }, [surveys]);

// //   const filtered = useMemo(() => {
// //     return surveys.filter((s) => {
// //       if (isDistrictAdmin && userDistrict && s.district !== userDistrict) return false;
// //       const distMatch   = filterDistrict === "all" || s.district === filterDistrict;
// //       const typeMatch   = filterOrgType  === "all" || s.orgtype  === filterOrgType;
// //       const q           = search.toLowerCase();
// //       const searchMatch = !q ||
// //         (s.orgname       || "").toLowerCase().includes(q) ||
// //         (s.concernname   || "").toLowerCase().includes(q) ||
// //         (s.concernmobile || "").includes(q) ||
// //         (s.district      || "").toLowerCase().includes(q);
// //       return distMatch && typeMatch && searchMatch;
// //     });
// //   }, [surveys, filterDistrict, filterOrgType, search, isDistrictAdmin, userDistrict]);

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; }
// //         .sv-page { min-height:100vh; width:100%; background-color:${CREAM}; font-family:'Inter',-apple-system,sans-serif; padding:40px; }
// //         .sv-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
// //         .sv-title-row { display:flex; align-items:center; gap:14px; }
// //         .sv-icon-badge { width:48px; height:48px; border-radius:14px; flex-shrink:0; background:rgba(205,54,107,0.10); display:flex; align-items:center; justify-content:center; color:${PINK}; }
// //         .sv-title    { color:${BLUE_DEEP}; font-size:24px; font-weight:800; letter-spacing:-0.3px; }
// //         .sv-subtitle { color:rgba(44,61,131,0.55); font-size:13.5px; margin-top:2px; }
// //         .sv-district-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(205,54,107,0.10); border-radius:999px; font-size:12.5px; font-weight:700; color:${PINK}; margin-top:6px; }
// //         .sv-refresh-btn { display:flex; align-items:center; gap:8px; padding:13px 22px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; background:linear-gradient(135deg,${PINK} 0%,${PINK_DARK} 100%); box-shadow:0 10px 26px rgba(205,54,107,0.32); transition:all .2s; }
// //         .sv-refresh-btn:hover { transform:translateY(-2px); }
// //         .sv-stats { display:flex; gap:14px; margin-bottom:24px; flex-wrap:wrap; }
// //         .sv-stat-card { flex:1; min-width:180px; background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 8px 24px rgba(44,61,131,0.06); display:flex; align-items:center; gap:14px; }
// //         .sv-stat-icon { width:42px; height:42px; border-radius:12px; flex-shrink:0; background:rgba(44,61,131,0.06); display:flex; align-items:center; justify-content:center; color:${BLUE}; }
// //         .sv-stat-num   { font-size:22px; font-weight:800; color:${BLUE_DEEP}; line-height:1.1; }
// //         .sv-stat-label { font-size:11.5px; color:rgba(44,61,131,0.5); font-weight:600; margin-top:2px; }
// //         .sv-table-card { background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 18px 50px rgba(44,61,131,0.08); overflow:hidden; }
// //         .sv-table-head { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:1px solid rgba(44,61,131,0.08); flex-wrap:wrap; gap:12px; }
// //         .sv-table-head-left { display:flex; align-items:center; gap:10px; }
// //         .sv-table-head-title { font-size:14px; font-weight:800; color:${BLUE_DEEP}; }
// //         .sv-table-count { font-size:11.5px; font-weight:700; color:${PINK}; background:rgba(205,54,107,0.08); padding:4px 12px; border-radius:999px; }
// //         .sv-filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
// //         .sv-search-wrap { display:flex; align-items:center; gap:8px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; }
// //         .sv-search-wrap svg { color:rgba(44,61,131,0.4); }
// //         .sv-search-input { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:500; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; width:160px; }
// //         .sv-search-input::placeholder { color:rgba(44,61,131,0.35); }
// //         .sv-filter-select-wrap { display:flex; align-items:center; gap:7px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; cursor:pointer; transition:all .2s; }
// //         .sv-filter-select-wrap:hover { border-color:rgba(44,61,131,0.28); }
// //         .sv-filter-select { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; cursor:pointer; appearance:none; -webkit-appearance:none; padding-right:4px; }
// //         .sv-table-wrap { overflow-x:auto; }
// //         table.sv-table { width:100%; border-collapse:collapse; }
// //         .sv-table thead th { text-align:left; padding:13px 24px; font-size:10.5px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase; color:rgba(44,61,131,0.45); background:rgba(44,61,131,0.025); white-space:nowrap; }
// //         .sv-table tbody td { padding:15px 24px; font-size:13.5px; color:${BLUE_DEEP}; border-top:1px solid rgba(44,61,131,0.06); white-space:nowrap; }
// //         .sv-table tbody tr:hover { background:rgba(205,54,107,0.02); }
// //         .sv-org-cell { display:flex; align-items:center; gap:10px; }
// //         .sv-avatar { width:34px; height:34px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; }
// //         .sv-orgname { font-weight:700; }
// //         .sv-orgtype { font-size:11.5px; color:rgba(44,61,131,0.45); margin-top:1px; }
// //         .sv-district-pill { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700; color:${BLUE}; background:rgba(44,61,131,0.06); padding:5px 12px; border-radius:999px; }
// //         .sv-date { color:rgba(44,61,131,0.55); font-size:12.5px; }
// //         .sv-actions { display:flex; gap:8px; }
// //         .sv-view-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
// //         .sv-view-btn:hover { background:rgba(205,54,107,0.16); }
// //         .sv-assign-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${BLUE}; background:rgba(44,61,131,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
// //         .sv-assign-btn:hover { background:rgba(44,61,131,0.16); }
// //         .sv-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
// //         .sv-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
// //         .sv-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
// //         .sv-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:svFade .2s ease both; }
// //         @keyframes svFade { from{opacity:0} to{opacity:1} }
// //         .sv-modal { width:100%; max-width:560px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:88vh; overflow-y:auto; animation:svUp .3s cubic-bezier(.22,.9,.36,1) both; }
// //         .sv-modal-sm { max-width:460px; }
// //         @keyframes svUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
// //         .sv-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid rgba(44,61,131,0.08); }
// //         .sv-modal-title { font-size:17px; font-weight:800; color:${BLUE_DEEP}; }
// //         .sv-modal-sub   { font-size:12px; color:${PINK}; font-weight:600; margin-top:2px; }
// //         .sv-modal-close { width:30px; height:30px; border-radius:9px; border:none; background:rgba(44,61,131,0.06); color:rgba(44,61,131,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:18px; font-weight:700; line-height:1; }
// //         .sv-modal-close:hover { background:rgba(44,61,131,0.12); }
// //         .sv-modal-section { margin-bottom:20px; }
// //         .sv-modal-section-title { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.45); margin-bottom:12px; }
// //         .sv-modal-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
// //         .sv-modal-info-item { background:rgba(44,61,131,0.03); border-radius:10px; padding:10px 14px; }
// //         .sv-modal-info-label { font-size:10.5px; color:rgba(44,61,131,0.45); font-weight:700; margin-bottom:3px; }
// //         .sv-modal-info-val   { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
// //         .sv-answers-grid { display:flex; flex-direction:column; gap:8px; }
// //         .sv-answer-row { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(44,61,131,0.025); border-radius:10px; }
// //         .sv-answer-q   { font-size:12.5px; color:${BLUE_DEEP}; font-weight:500; }
// //         .sv-answer-qid { font-size:11px; color:rgba(44,61,131,0.4); margin-right:8px; }
// //         .sv-ans-yes { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#15803d; background:rgba(34,197,94,0.12); }
// //         .sv-ans-no  { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#b91c1c; background:rgba(239,68,68,0.12); }
// //         /* Officer assign styles */
// //         .sv-survey-info-box { background:rgba(44,61,131,0.04); border-radius:10px; padding:12px 14px; margin-bottom:16px; }
// //         .sv-survey-info-box-title { font-size:11px; font-weight:800; color:rgba(44,61,131,0.45); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px; }
// //         .sv-survey-info-box-val { font-size:14px; font-weight:700; color:${BLUE_DEEP}; }
// //         .sv-survey-info-box-sub { font-size:12px; color:rgba(44,61,131,0.5); margin-top:2px; }
// //         .sv-officer-list { display:flex; flex-direction:column; gap:8px; max-height:300px; overflow-y:auto; }
// //         .sv-officer-item { display:flex; align-items:center; gap:12px; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.10); border-radius:12px; cursor:pointer; transition:all .15s; }
// //         .sv-officer-item:hover { border-color:rgba(44,61,131,0.25); background:rgba(44,61,131,0.02); }
// //         .sv-officer-item.selected { border-color:${PINK}; background:rgba(205,54,107,0.04); }
// //         .sv-officer-avatar { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:14px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
// //         .sv-officer-name { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
// //         .sv-officer-sub  { font-size:11.5px; color:rgba(44,61,131,0.5); margin-top:1px; }
// //         .sv-officer-check { margin-left:auto; width:20px; height:20px; border-radius:50%; border:2px solid rgba(44,61,131,0.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
// //         .sv-officer-item.selected .sv-officer-check { background:${PINK}; border-color:${PINK}; }
// //         .sv-assign-submit { width:100%; padding:14px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; background:linear-gradient(135deg,${PINK},${PINK_DARK}); box-shadow:0 10px 26px rgba(205,54,107,0.28); margin-top:16px; font-family:'Inter',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
// //         .sv-assign-submit:disabled { opacity:0.5; cursor:not-allowed; }
// //         .sv-assign-submit:hover:not(:disabled) { transform:translateY(-1px); }
// //         @media (max-width:700px) { .sv-page{padding:20px;} .sv-stats{flex-direction:column;} .sv-modal-info-grid{grid-template-columns:1fr;} }
// //       `}</style>

// //       <div className="sv-page">
// //         {/* Header */}
// //         <div className="sv-header">
// //           <div className="sv-title-row">
// //             <div className="sv-icon-badge"><FiClipboard size={22} /></div>
// //             <div>
// //               <div className="sv-title">POSH Survey Submissions</div>
// //               {isDistrictAdmin && userDistrict ? (
// //                 <div className="sv-district-badge"><FiMapPin size={12} /> {userDistrict} District Only</div>
// //               ) : (
// //                 <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
// //               )}
// //             </div>
// //           </div>
// //           <button className="sv-refresh-btn" onClick={fetchSurveys}>
// //             <FiShield size={16} /> Refresh
// //           </button>
// //         </div>

// //         {/* Stats */}
// //         <div className="sv-stats">
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiClipboard size={18} /></div>
// //             <div><div className="sv-stat-num">{filtered.length}</div><div className="sv-stat-label">Total Submissions</div></div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiMapPin size={18} /></div>
// //             <div><div className="sv-stat-num">{new Set(filtered.map((s) => s.district)).size}</div><div className="sv-stat-label">Districts Covered</div></div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
// //             <div><div className="sv-stat-num">{isDistrictAdmin ? 1 : 34}</div><div className="sv-stat-label">Total Districts in MH</div></div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="sv-table-card">
// //           <div className="sv-table-head">
// //             <div className="sv-table-head-left">
// //               <span className="sv-table-head-title">All Survey Submissions</span>
// //               <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
// //             </div>
// //             <div className="sv-filters">
// //               <div className="sv-search-wrap">
// //                 <FiSearch size={13} />
// //                 <input className="sv-search-input" placeholder="Search org, contact..." value={search} onChange={(e) => setSearch(e.target.value)} />
// //               </div>
// //               {!isDistrictAdmin && (
// //                 <div className="sv-filter-select-wrap">
// //                   <FiMapPin size={13} />
// //                   <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
// //                     <option value="all">All Districts</option>
// //                     {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
// //                   </select>
// //                   <FiChevronDown size={13} />
// //                 </div>
// //               )}
// //               <div className="sv-filter-select-wrap">
// //                 <FiFilter size={13} />
// //                 <select className="sv-filter-select" value={filterOrgType} onChange={(e) => setFilterOrgType(e.target.value)}>
// //                   <option value="all">All Types</option>
// //                   {orgTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
// //                 </select>
// //                 <FiChevronDown size={13} />
// //               </div>
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="sv-loading">Loading surveys…</div>
// //           ) : filtered.length === 0 ? (
// //             <div className="sv-empty">
// //               <div className="sv-empty-icon"><FiClipboard size={24} /></div>
// //               {surveys.length === 0 ? "No survey submissions yet." : "No records match the selected filters."}
// //             </div>
// //           ) : (
// //             <div className="sv-table-wrap">
// //               <table className="sv-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Organization</th>
// //                     <th>Contact Person</th>
// //                     <th>Mobile</th>
// //                     <th>District</th>
// //                     <th>Taluka</th>
// //                     <th>Submitted On</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filtered.map((s) => (
// //                     <tr key={s.submissionid}>
// //                       <td>
// //                         <div className="sv-org-cell">
// //                           <div className="sv-avatar">{(s.orgname || "?").charAt(0).toUpperCase()}</div>
// //                           <div>
// //                             <div className="sv-orgname">{s.orgname || "—"}</div>
// //                             <div className="sv-orgtype">{s.orgtype || "—"}</div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td>{s.concernname || "—"}</td>
// //                       <td>{s.concernmobile || "—"}</td>
// //                       <td><span className="sv-district-pill"><FiMapPin size={11} /> {s.district || "—"}</span></td>
// //                       <td>{s.taluka || "—"}</td>
// //                       <td className="sv-date">
// //                         {s.submittedat ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
// //                       </td>
// //                       <td>
// //                         <div className="sv-actions">
// //                           <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
// //                             <FiEye size={13} /> View
// //                           </button>
// //                           {isDistrictAdmin && (
// //                             <button className="sv-assign-btn" onClick={() => openAssignModal(s)}>
// //                               <FiUserPlus size={13} /> Assign
// //                             </button>
// //                           )}
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Detail Modal */}
// //       {detailModal && (
// //         <div className="sv-overlay" onClick={() => setDetailModal(null)}>
// //           <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="sv-modal-head">
// //               <div>
// //                 <div className="sv-modal-title">Survey Detail</div>
// //                 <div className="sv-modal-sub">Submission #{detailModal.submissionid}</div>
// //               </div>
// //               <button className="sv-modal-close" onClick={() => setDetailModal(null)}>×</button>
// //             </div>
// //             {detailModal.loading ? (
// //               <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading…</div>
// //             ) : (
// //               <>
// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">Organization Info</div>
// //                   <div className="sv-modal-info-grid">
// //                     {[
// //                       ["Org Name",  detailModal.submission?.orgname],
// //                       ["Org Type",  detailModal.submission?.orgtype],
// //                       ["District",  detailModal.submission?.district],
// //                       ["Taluka",    detailModal.submission?.taluka],
// //                       ["Ward",      detailModal.submission?.ward],
// //                       ["Contact",   detailModal.submission?.concernname],
// //                       ["Mobile",    detailModal.submission?.concernmobile],
// //                       ["Submitted", detailModal.submission?.submittedat
// //                         ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
// //                         : "—"],
// //                     ].map(([label, val]) => (
// //                       <div key={label} className="sv-modal-info-item">
// //                         <div className="sv-modal-info-label">{label}</div>
// //                         <div className="sv-modal-info-val">{val || "—"}</div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">
// //                     Survey Answers ({Object.keys(detailModal.answers || {}).length} questions)
// //                   </div>
// //                   <div className="sv-answers-grid">
// //                     {Object.entries(detailModal.answers || {}).map(([qid, ans]) => (
// //                       <div key={qid} className="sv-answer-row">
// //                         <span className="sv-answer-q"><span className="sv-answer-qid">Q{qid}.</span> Question {qid}</span>
// //                         <span className={ans === "yes" ? "sv-ans-yes" : "sv-ans-no"}>
// //                           {ans === "yes" ? "✓ Yes" : "✗ No"}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* Assign Officer Modal */}
// //       {assignModal && (
// //         <div className="sv-overlay" onClick={() => setAssignModal(null)}>
// //           <div className="sv-modal sv-modal-sm" onClick={(e) => e.stopPropagation()}>
// //             <div className="sv-modal-head">
// //               <div>
// //                 <div className="sv-modal-title">Assign Inspection Officer</div>
// //                 {/* <div className="sv-modal-sub">{userDistrict} District Officers</div> */}
// // <div className="sv-modal-sub">{assignModal.survey.district} District Officers</div>

// //               </div>
// //               <button className="sv-modal-close" onClick={() => setAssignModal(null)}>×</button>
// //             </div>

// //             <div className="sv-survey-info-box">
// //               <div className="sv-survey-info-box-title">Survey Organization</div>
// //               <div className="sv-survey-info-box-val">{assignModal.survey.orgname || "—"}</div>
// //               <div className="sv-survey-info-box-sub">{assignModal.survey.district} · {assignModal.survey.taluka || "—"}</div>
// //             </div>

// //             <div className="sv-modal-section-title">Select Officer</div>

// //             {officersLoading ? (
// //               <div style={{ padding: "30px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading officers…</div>
// //             ) : officers.length === 0 ? (
// //               <div style={{ padding: "20px 0", textAlign: "center", color: "rgba(44,61,131,0.4)", fontSize: 13 }}>
// //                 No officers found for {userDistrict} district
// //               </div>
// //             ) : (
// //               <div className="sv-officer-list">
// //                 {officers.map((o) => (
// //                   <div
// //                     key={o.id}
// //                     className={`sv-officer-item ${selectedOfficer === o.id ? "selected" : ""}`}
// //                     onClick={() => setSelectedOfficer(o.id)}
// //                   >
// //                     <div className="sv-officer-avatar">{(o.fullname || "?").charAt(0).toUpperCase()}</div>
// //                     <div>
// //                       <div className="sv-officer-name">{o.fullname}</div>
// //                       <div className="sv-officer-sub">@{o.username} · {o.mobile}</div>
// //                     </div>
// //                     <div className="sv-officer-check">
// //                       {selectedOfficer === o.id && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             <button className="sv-assign-submit" onClick={handleAssign} disabled={assigning || !selectedOfficer}>
// //               {assigning ? "Assigning..." : <><FiUserPlus size={15} /> Assign Officer</>}
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// // ==========================================

// // import React, { useState, useEffect, useMemo } from "react";
// // import { toast } from "react-toastify";
// // import {
// //   FiShield, FiMapPin, FiFilter, FiChevronDown,
// //   FiCheckCircle, FiEye, FiClipboard, FiSearch,
// //   FiUserPlus, FiMessageSquare,
// // } from "react-icons/fi";
// // import axiosInstance from "../services/axiosInstance";

// // const PINK      = "#CD366B";
// // const PINK_DARK = "#b82a5c";
// // const BLUE      = "#2C3D83";
// // const BLUE_DEEP = "#1d2a60";
// // const CREAM     = "#FBF3EE";

// // const MH_DISTRICTS = [
// //   "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
// //   "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
// //   "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
// //   "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
// //   "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
// //   "Washim","Yavatmal",
// // ];

// // const getAuthUser = () => {
// //   try { return JSON.parse(localStorage.getItem("authUser") || "{}"); }
// //   catch { return {}; }
// // };

// // export default function Surveys() {
// //   const [surveys, setSurveys]               = useState([]);
// //   const [loading, setLoading]               = useState(true);
// //   const [filterDistrict, setFilterDistrict] = useState("all");
// //   const [filterOrgType,  setFilterOrgType]  = useState("all");
// //   const [search, setSearch]                 = useState("");
// //   const [detailModal, setDetailModal]       = useState(null);
// //   const [detailLoading, setDetailLoading]   = useState(false);

// //   // ── Assign Officer state ──
// //   const [assignModal, setAssignModal]         = useState(null);
// //   const [officers, setOfficers]               = useState([]);
// //   const [officersLoading, setOfficersLoading] = useState(false);
// //   const [selectedOfficer, setSelectedOfficer] = useState(null);
// //   const [assigning, setAssigning]             = useState(false);

// //   // ── Review Modal state ──
// //   const [reviewModal, setReviewModal]   = useState(null);
// //   const [reviewComment, setReviewComment] = useState("");
// //   const [reviewStatus, setReviewStatus]   = useState("approved");
// //   const [submittingReview, setSubmittingReview] = useState(false);

// //   // ── Role info ──
// //   const authUser          = getAuthUser();
// //   const userRole          = authUser?.role     || authUser?.user?.role     || "";
// //   const userDistrict      = authUser?.district || authUser?.user?.district || "";
// //   const isDistrictAdmin   = userRole === "districtadmin";
// //   const isInspectionOfficer = userRole === "inspectionofficer";

// //   // ── Fetch surveys ──
// //   const fetchSurveys = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axiosInstance.get("/surveys");
// //       if (res.data.success) setSurveys(res.data.data || []);
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Failed to load surveys");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchSurveys(); }, []);

// //   // ── Survey detail ──
// //   const openDetail = async (submissionid) => {
// //     setDetailLoading(true);
// //     setDetailModal({ submissionid, loading: true });
// //     try {
// //       const res = await axiosInstance.get(`/surveys/${submissionid}`);
// //       if (res.data.success) setDetailModal({ ...res.data, submissionid, loading: false });
// //     } catch (err) {
// //       toast.error("Failed to load survey detail");
// //       setDetailModal(null);
// //     } finally {
// //       setDetailLoading(false);
// //     }
// //   };

// //   // ── Open Review Modal ──
// //   const openReviewModal = (survey) => {
// //     setReviewModal(survey);
// //     setReviewComment("");
// //     setReviewStatus("approved");
// //   };

// //   // ── Submit Review ──
// //   const handleReviewSubmit = async () => {
// //     if (!reviewComment.trim()) { toast.error("Comment टाका"); return; }
// //     setSubmittingReview(true);
// //     try {
// //       const res = await axiosInstance.post("/officer/report/submit", {
// //         orgid:   reviewModal.orgid,
// //         status:  reviewStatus,
// //         comment: reviewComment.trim(),
// //       });
// //       if (res.data.success) {
// //         toast.success("Review submitted successfully!");
// //         setReviewModal(null);
// //         fetchSurveys();
// //       } else {
// //         toast.error(res.data.message || "Review submit failed");
// //       }
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Server error");
// //     } finally {
// //       setSubmittingReview(false);
// //     }
// //   };

// //   // ── Open assign modal + fetch officers ──
// //   const openAssignModal = async (survey) => {
// //     setAssignModal({ survey });
// //     setSelectedOfficer(null);
// //     setOfficersLoading(true);
// //     try {
// //       const res = await axiosInstance.get("/inspection-officer/get");
// //       if (res.data.success) {
// //         const allOfficers = res.data.data || [];
// //         const districtOfficers = allOfficers.filter(
// //           (o) => o.district === survey.district
// //         );
// //         setOfficers(districtOfficers);
// //       }
// //     } catch (err) {
// //       toast.error("Failed to load officers");
// //     } finally {
// //       setOfficersLoading(false);
// //     }
// //   };

// //   // ── Assign officer ──
// //   const handleAssign = async () => {
// //     if (!selectedOfficer) { toast.error("Officer select kara"); return; }
// //     setAssigning(true);
// //     try {
// //       const res = await axiosInstance.post("/assignment/assign", {
// //         orgid:     assignModal.survey.orgid,
// //         officerid: selectedOfficer,
// //       });
// //       if (res.data.success) {
// //         toast.success("Officer assigned successfully!");
// //         setAssignModal(null);
// //       } else {
// //         toast.error(res.data.message || "Assignment failed");
// //       }
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Assignment failed");
// //     } finally {
// //       setAssigning(false);
// //     }
// //   };

// //   // ── Filters ──
// //   const orgTypeOptions = useMemo(() => {
// //     return [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort();
// //   }, [surveys]);

// //   const filtered = useMemo(() => {
// //     return surveys.filter((s) => {
// //       if (isDistrictAdmin && userDistrict && s.district !== userDistrict) return false;
// //       const distMatch   = filterDistrict === "all" || s.district === filterDistrict;
// //       const typeMatch   = filterOrgType  === "all" || s.orgtype  === filterOrgType;
// //       const q           = search.toLowerCase();
// //       const searchMatch = !q ||
// //         (s.orgname       || "").toLowerCase().includes(q) ||
// //         (s.concernname   || "").toLowerCase().includes(q) ||
// //         (s.concernmobile || "").includes(q) ||
// //         (s.district      || "").toLowerCase().includes(q);
// //       return distMatch && typeMatch && searchMatch;
// //     });
// //   }, [surveys, filterDistrict, filterOrgType, search, isDistrictAdmin, userDistrict]);

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; }
// //         .sv-page { min-height:100vh; width:100%; background-color:${CREAM}; font-family:'Inter',-apple-system,sans-serif; padding:40px; }
// //         .sv-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
// //         .sv-title-row { display:flex; align-items:center; gap:14px; }
// //         .sv-icon-badge { width:48px; height:48px; border-radius:14px; flex-shrink:0; background:rgba(205,54,107,0.10); display:flex; align-items:center; justify-content:center; color:${PINK}; }
// //         .sv-title    { color:${BLUE_DEEP}; font-size:24px; font-weight:800; letter-spacing:-0.3px; }
// //         .sv-subtitle { color:rgba(44,61,131,0.55); font-size:13.5px; margin-top:2px; }
// //         .sv-district-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(205,54,107,0.10); border-radius:999px; font-size:12.5px; font-weight:700; color:${PINK}; margin-top:6px; }
// //         .sv-refresh-btn { display:flex; align-items:center; gap:8px; padding:13px 22px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; background:linear-gradient(135deg,${PINK} 0%,${PINK_DARK} 100%); box-shadow:0 10px 26px rgba(205,54,107,0.32); transition:all .2s; }
// //         .sv-refresh-btn:hover { transform:translateY(-2px); }
// //         .sv-stats { display:flex; gap:14px; margin-bottom:24px; flex-wrap:wrap; }
// //         .sv-stat-card { flex:1; min-width:180px; background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 8px 24px rgba(44,61,131,0.06); display:flex; align-items:center; gap:14px; }
// //         .sv-stat-icon { width:42px; height:42px; border-radius:12px; flex-shrink:0; background:rgba(44,61,131,0.06); display:flex; align-items:center; justify-content:center; color:${BLUE}; }
// //         .sv-stat-num   { font-size:22px; font-weight:800; color:${BLUE_DEEP}; line-height:1.1; }
// //         .sv-stat-label { font-size:11.5px; color:rgba(44,61,131,0.5); font-weight:600; margin-top:2px; }
// //         .sv-table-card { background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 18px 50px rgba(44,61,131,0.08); overflow:hidden; }
// //         .sv-table-head { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:1px solid rgba(44,61,131,0.08); flex-wrap:wrap; gap:12px; }
// //         .sv-table-head-left { display:flex; align-items:center; gap:10px; }
// //         .sv-table-head-title { font-size:14px; font-weight:800; color:${BLUE_DEEP}; }
// //         .sv-table-count { font-size:11.5px; font-weight:700; color:${PINK}; background:rgba(205,54,107,0.08); padding:4px 12px; border-radius:999px; }
// //         .sv-filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
// //         .sv-search-wrap { display:flex; align-items:center; gap:8px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; }
// //         .sv-search-wrap svg { color:rgba(44,61,131,0.4); }
// //         .sv-search-input { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:500; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; width:160px; }
// //         .sv-search-input::placeholder { color:rgba(44,61,131,0.35); }
// //         .sv-filter-select-wrap { display:flex; align-items:center; gap:7px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; cursor:pointer; transition:all .2s; }
// //         .sv-filter-select-wrap:hover { border-color:rgba(44,61,131,0.28); }
// //         .sv-filter-select { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; cursor:pointer; appearance:none; -webkit-appearance:none; padding-right:4px; }
// //         .sv-table-wrap { overflow-x:auto; }
// //         table.sv-table { width:100%; border-collapse:collapse; }
// //         .sv-table thead th { text-align:left; padding:13px 24px; font-size:10.5px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase; color:rgba(44,61,131,0.45); background:rgba(44,61,131,0.025); white-space:nowrap; }
// //         .sv-table tbody td { padding:15px 24px; font-size:13.5px; color:${BLUE_DEEP}; border-top:1px solid rgba(44,61,131,0.06); white-space:nowrap; }
// //         .sv-table tbody tr:hover { background:rgba(205,54,107,0.02); }
// //         .sv-org-cell { display:flex; align-items:center; gap:10px; }
// //         .sv-avatar { width:34px; height:34px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; }
// //         .sv-orgname { font-weight:700; }
// //         .sv-orgtype { font-size:11.5px; color:rgba(44,61,131,0.45); margin-top:1px; }
// //         .sv-district-pill { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700; color:${BLUE}; background:rgba(44,61,131,0.06); padding:5px 12px; border-radius:999px; }
// //         .sv-date { color:rgba(44,61,131,0.55); font-size:12.5px; }
// //         .sv-actions { display:flex; gap:8px; }
// //         .sv-view-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
// //         .sv-view-btn:hover { background:rgba(205,54,107,0.16); }
// //         .sv-assign-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${BLUE}; background:rgba(44,61,131,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
// //         .sv-assign-btn:hover { background:rgba(44,61,131,0.16); }
// //         .sv-review-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:#15803d; background:rgba(34,197,94,0.10); transition:all .15s; font-family:'Inter',sans-serif; }
// //         .sv-review-btn:hover { background:rgba(34,197,94,0.20); }
// //         .sv-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
// //         .sv-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
// //         .sv-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
// //         .sv-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:svFade .2s ease both; }
// //         @keyframes svFade { from{opacity:0} to{opacity:1} }
// //         .sv-modal { width:100%; max-width:560px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:88vh; overflow-y:auto; animation:svUp .3s cubic-bezier(.22,.9,.36,1) both; }
// //         .sv-modal-sm { max-width:460px; }
// //         @keyframes svUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
// //         .sv-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid rgba(44,61,131,0.08); }
// //         .sv-modal-title { font-size:17px; font-weight:800; color:${BLUE_DEEP}; }
// //         .sv-modal-sub   { font-size:12px; color:${PINK}; font-weight:600; margin-top:2px; }
// //         .sv-modal-close { width:30px; height:30px; border-radius:9px; border:none; background:rgba(44,61,131,0.06); color:rgba(44,61,131,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:18px; font-weight:700; line-height:1; }
// //         .sv-modal-close:hover { background:rgba(44,61,131,0.12); }
// //         .sv-modal-section { margin-bottom:20px; }
// //         .sv-modal-section-title { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.45); margin-bottom:12px; }
// //         .sv-modal-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
// //         .sv-modal-info-item { background:rgba(44,61,131,0.03); border-radius:10px; padding:10px 14px; }
// //         .sv-modal-info-label { font-size:10.5px; color:rgba(44,61,131,0.45); font-weight:700; margin-bottom:3px; }
// //         .sv-modal-info-val   { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
// //         .sv-answers-grid { display:flex; flex-direction:column; gap:8px; }
// //         .sv-answer-row { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(44,61,131,0.025); border-radius:10px; }
// //         .sv-answer-q   { font-size:12.5px; color:${BLUE_DEEP}; font-weight:500; }
// //         .sv-answer-qid { font-size:11px; color:rgba(44,61,131,0.4); margin-right:8px; }
// //         .sv-ans-yes { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#15803d; background:rgba(34,197,94,0.12); }
// //         .sv-ans-no  { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#b91c1c; background:rgba(239,68,68,0.12); }
// //         /* Officer assign styles */
// //         .sv-survey-info-box { background:rgba(44,61,131,0.04); border-radius:10px; padding:12px 14px; margin-bottom:16px; }
// //         .sv-survey-info-box-title { font-size:11px; font-weight:800; color:rgba(44,61,131,0.45); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px; }
// //         .sv-survey-info-box-val { font-size:14px; font-weight:700; color:${BLUE_DEEP}; }
// //         .sv-survey-info-box-sub { font-size:12px; color:rgba(44,61,131,0.5); margin-top:2px; }
// //         .sv-officer-list { display:flex; flex-direction:column; gap:8px; max-height:300px; overflow-y:auto; }
// //         .sv-officer-item { display:flex; align-items:center; gap:12px; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.10); border-radius:12px; cursor:pointer; transition:all .15s; }
// //         .sv-officer-item:hover { border-color:rgba(44,61,131,0.25); background:rgba(44,61,131,0.02); }
// //         .sv-officer-item.selected { border-color:${PINK}; background:rgba(205,54,107,0.04); }
// //         .sv-officer-avatar { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:14px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
// //         .sv-officer-name { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
// //         .sv-officer-sub  { font-size:11.5px; color:rgba(44,61,131,0.5); margin-top:1px; }
// //         .sv-officer-check { margin-left:auto; width:20px; height:20px; border-radius:50%; border:2px solid rgba(44,61,131,0.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
// //         .sv-officer-item.selected .sv-officer-check { background:${PINK}; border-color:${PINK}; }
// //         .sv-assign-submit { width:100%; padding:14px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; background:linear-gradient(135deg,${PINK},${PINK_DARK}); box-shadow:0 10px 26px rgba(205,54,107,0.28); margin-top:16px; font-family:'Inter',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
// //         .sv-assign-submit:disabled { opacity:0.5; cursor:not-allowed; }
// //         .sv-assign-submit:hover:not(:disabled) { transform:translateY(-1px); }
// //         /* Review modal styles */
// //         .sv-review-org-box { background:rgba(44,61,131,0.04); border-radius:12px; padding:14px 16px; margin-bottom:18px; border-left:3px solid ${PINK}; }
// //         .sv-review-org-name { font-size:15px; font-weight:800; color:${BLUE_DEEP}; }
// //         .sv-review-org-sub  { font-size:12px; color:rgba(44,61,131,0.5); margin-top:3px; }
// //         .sv-review-success-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(34,197,94,0.10); border-radius:999px; font-size:12.5px; font-weight:700; color:#15803d; margin-bottom:16px; }
// //         .sv-review-label { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.5); margin-bottom:8px; display:block; }
// //         .sv-review-select { width:100%; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; font-weight:700; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; cursor:pointer; background:#fff; margin-bottom:16px; transition:all .2s; appearance:none; }
// //         .sv-review-select:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
// //         .sv-review-select.approved { border-color:rgba(34,197,94,0.4); background:rgba(34,197,94,0.04); color:#15803d; }
// //         .sv-review-select.rejected { border-color:rgba(239,68,68,0.4); background:rgba(239,68,68,0.04); color:#b91c1c; }
// //         .sv-review-textarea { width:100%; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; resize:vertical; min-height:100px; transition:all .2s; }
// //         .sv-review-textarea:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
// //         .sv-review-textarea::placeholder { color:rgba(44,61,131,0.35); }
// //         .sv-review-btnrow { display:flex; gap:10px; margin-top:18px; }
// //         .sv-review-cancel { flex:0 0 auto; padding:13px 20px; border-radius:12px; border:1.5px solid rgba(44,61,131,0.15); background:#fff; color:${BLUE_DEEP}; font-size:13.5px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; transition:all .2s; }
// //         .sv-review-cancel:hover { background:rgba(44,61,131,0.04); }
// //         .sv-review-submit { flex:1; padding:13px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; background:linear-gradient(135deg,${PINK},${PINK_DARK}); box-shadow:0 10px 26px rgba(205,54,107,0.28); }
// //         .sv-review-submit:disabled { opacity:0.5; cursor:not-allowed; }
// //         .sv-review-submit:hover:not(:disabled) { transform:translateY(-1px); }
// //         .sv-review-submit.reject-mode { background:linear-gradient(135deg,#e53e3e,#c53030); box-shadow:0 10px 26px rgba(229,62,62,0.28); }
// //         @media (max-width:700px) { .sv-page{padding:20px;} .sv-stats{flex-direction:column;} .sv-modal-info-grid{grid-template-columns:1fr;} }
// //       `}</style>

// //       <div className="sv-page">
// //         {/* Header */}
// //         <div className="sv-header">
// //           <div className="sv-title-row">
// //             <div className="sv-icon-badge"><FiClipboard size={22} /></div>
// //             <div>
// //               <div className="sv-title">POSH Survey Submissions</div>
// //               {isDistrictAdmin && userDistrict ? (
// //                 <div className="sv-district-badge"><FiMapPin size={12} /> {userDistrict} District Only</div>
// //               ) : (
// //                 <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
// //               )}
// //             </div>
// //           </div>
// //           <button className="sv-refresh-btn" onClick={fetchSurveys}>
// //             <FiShield size={16} /> Refresh
// //           </button>
// //         </div>

// //         {/* Stats */}
// //         <div className="sv-stats">
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiClipboard size={18} /></div>
// //             <div><div className="sv-stat-num">{filtered.length}</div><div className="sv-stat-label">Total Submissions</div></div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiMapPin size={18} /></div>
// //             <div><div className="sv-stat-num">{new Set(filtered.map((s) => s.district)).size}</div><div className="sv-stat-label">Districts Covered</div></div>
// //           </div>
// //           <div className="sv-stat-card">
// //             <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
// //             <div><div className="sv-stat-num">{isDistrictAdmin ? 1 : 34}</div><div className="sv-stat-label">Total Districts in MH</div></div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="sv-table-card">
// //           <div className="sv-table-head">
// //             <div className="sv-table-head-left">
// //               <span className="sv-table-head-title">All Survey Submissions</span>
// //               <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
// //             </div>
// //             <div className="sv-filters">
// //               <div className="sv-search-wrap">
// //                 <FiSearch size={13} />
// //                 <input className="sv-search-input" placeholder="Search org, contact..." value={search} onChange={(e) => setSearch(e.target.value)} />
// //               </div>
// //               {!isDistrictAdmin && !isInspectionOfficer && (
// //                 <div className="sv-filter-select-wrap">
// //                   <FiMapPin size={13} />
// //                   <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
// //                     <option value="all">All Districts</option>
// //                     {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
// //                   </select>
// //                   <FiChevronDown size={13} />
// //                 </div>
// //               )}
// //               <div className="sv-filter-select-wrap">
// //                 <FiFilter size={13} />
// //                 <select className="sv-filter-select" value={filterOrgType} onChange={(e) => setFilterOrgType(e.target.value)}>
// //                   <option value="all">All Types</option>
// //                   {orgTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
// //                 </select>
// //                 <FiChevronDown size={13} />
// //               </div>
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="sv-loading">Loading surveys…</div>
// //           ) : filtered.length === 0 ? (
// //             <div className="sv-empty">
// //               <div className="sv-empty-icon"><FiClipboard size={24} /></div>
// //               {surveys.length === 0 ? "No survey submissions yet." : "No records match the selected filters."}
// //             </div>
// //           ) : (
// //             <div className="sv-table-wrap">
// //               <table className="sv-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Organization</th>
// //                     <th>Contact Person</th>
// //                     <th>Mobile</th>
// //                     <th>District</th>
// //                     <th>Taluka</th>
// //                     <th>Submitted On</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filtered.map((s) => (
// //                     <tr key={s.submissionid}>
// //                       <td>
// //                         <div className="sv-org-cell">
// //                           <div className="sv-avatar">{(s.orgname || "?").charAt(0).toUpperCase()}</div>
// //                           <div>
// //                             <div className="sv-orgname">{s.orgname || "—"}</div>
// //                             <div className="sv-orgtype">{s.orgtype || "—"}</div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td>{s.concernname || "—"}</td>
// //                       <td>{s.concernmobile || "—"}</td>
// //                       <td><span className="sv-district-pill"><FiMapPin size={11} /> {s.district || "—"}</span></td>
// //                       <td>{s.taluka || "—"}</td>
// //                       <td className="sv-date">
// //                         {s.submittedat ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
// //                       </td>
// //                       <td>
// //                         <div className="sv-actions">
// //                           <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
// //                             <FiEye size={13} /> View
// //                           </button>
// //                           {isDistrictAdmin && (
// //                             <button className="sv-assign-btn" onClick={() => openAssignModal(s)}>
// //                               <FiUserPlus size={13} /> Assign
// //                             </button>
// //                           )}
// //                           {isInspectionOfficer && (
// //                             <button className="sv-review-btn" onClick={() => openReviewModal(s)}>
// //                               <FiMessageSquare size={13} /> Review
// //                             </button>
// //                           )}
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Detail Modal */}
// //       {detailModal && (
// //         <div className="sv-overlay" onClick={() => setDetailModal(null)}>
// //           <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="sv-modal-head">
// //               <div>
// //                 <div className="sv-modal-title">Survey Detail</div>
// //                 <div className="sv-modal-sub">Submission #{detailModal.submissionid}</div>
// //               </div>
// //               <button className="sv-modal-close" onClick={() => setDetailModal(null)}>×</button>
// //             </div>
// //             {detailModal.loading ? (
// //               <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading…</div>
// //             ) : (
// //               <>
// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">Organization Info</div>
// //                   <div className="sv-modal-info-grid">
// //                     {[
// //                       ["Org Name",  detailModal.submission?.orgname],
// //                       ["Org Type",  detailModal.submission?.orgtype],
// //                       ["District",  detailModal.submission?.district],
// //                       ["Taluka",    detailModal.submission?.taluka],
// //                       ["Ward",      detailModal.submission?.ward],
// //                       ["Contact",   detailModal.submission?.concernname],
// //                       ["Mobile",    detailModal.submission?.concernmobile],
// //                       ["Submitted", detailModal.submission?.submittedat
// //                         ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
// //                         : "—"],
// //                     ].map(([label, val]) => (
// //                       <div key={label} className="sv-modal-info-item">
// //                         <div className="sv-modal-info-label">{label}</div>
// //                         <div className="sv-modal-info-val">{val || "—"}</div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //                 <div className="sv-modal-section">
// //                   <div className="sv-modal-section-title">
// //                     Survey Answers ({Object.keys(detailModal.answers || {}).length} questions)
// //                   </div>
// //                   <div className="sv-answers-grid">
// //                     {Object.entries(detailModal.answers || {}).map(([qid, ans]) => (
// //                       <div key={qid} className="sv-answer-row">
// //                         <span className="sv-answer-q"><span className="sv-answer-qid">Q{qid}.</span> Question {qid}</span>
// //                         <span className={ans === "yes" ? "sv-ans-yes" : "sv-ans-no"}>
// //                           {ans === "yes" ? "✓ Yes" : "✗ No"}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* Assign Officer Modal */}
// //       {assignModal && (
// //         <div className="sv-overlay" onClick={() => setAssignModal(null)}>
// //           <div className="sv-modal sv-modal-sm" onClick={(e) => e.stopPropagation()}>
// //             <div className="sv-modal-head">
// //               <div>
// //                 <div className="sv-modal-title">Assign Inspection Officer</div>
// //                 <div className="sv-modal-sub">{assignModal.survey.district} District Officers</div>
// //               </div>
// //               <button className="sv-modal-close" onClick={() => setAssignModal(null)}>×</button>
// //             </div>
// //             <div className="sv-survey-info-box">
// //               <div className="sv-survey-info-box-title">Survey Organization</div>
// //               <div className="sv-survey-info-box-val">{assignModal.survey.orgname || "—"}</div>
// //               <div className="sv-survey-info-box-sub">{assignModal.survey.district} · {assignModal.survey.taluka || "—"}</div>
// //             </div>
// //             <div className="sv-modal-section-title">Select Officer</div>
// //             {officersLoading ? (
// //               <div style={{ padding: "30px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading officers…</div>
// //             ) : officers.length === 0 ? (
// //               <div style={{ padding: "20px 0", textAlign: "center", color: "rgba(44,61,131,0.4)", fontSize: 13 }}>
// //                 No officers found for {assignModal.survey.district} district
// //               </div>
// //             ) : (
// //               <div className="sv-officer-list">
// //                 {officers.map((o) => (
// //                   <div
// //                     key={o.id}
// //                     className={`sv-officer-item ${selectedOfficer === o.id ? "selected" : ""}`}
// //                     onClick={() => setSelectedOfficer(o.id)}
// //                   >
// //                     <div className="sv-officer-avatar">{(o.fullname || "?").charAt(0).toUpperCase()}</div>
// //                     <div>
// //                       <div className="sv-officer-name">{o.fullname}</div>
// //                       <div className="sv-officer-sub">@{o.username} · {o.mobile}</div>
// //                     </div>
// //                     <div className="sv-officer-check">
// //                       {selectedOfficer === o.id && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //             <button className="sv-assign-submit" onClick={handleAssign} disabled={assigning || !selectedOfficer}>
// //               {assigning ? "Assigning..." : <><FiUserPlus size={15} /> Assign Officer</>}
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Review Modal — Inspection Officer only */}
// //       {reviewModal && (
// //         <div className="sv-overlay" onClick={() => setReviewModal(null)}>
// //           <div className="sv-modal sv-modal-sm" onClick={(e) => e.stopPropagation()}>
// //             <div className="sv-modal-head">
// //               <div>
// //                 <div className="sv-modal-title">Survey Review</div>
// //                 <div className="sv-modal-sub">Inspection Officer Report</div>
// //               </div>
// //               <button className="sv-modal-close" onClick={() => setReviewModal(null)}>×</button>
// //             </div>

// //             {/* Org info */}
// //             <div className="sv-review-org-box">
// //               <div className="sv-review-org-name">{reviewModal.orgname || "—"}</div>
// //               <div className="sv-review-org-sub">{reviewModal.district} · {reviewModal.taluka || "—"} · {reviewModal.orgtype || "—"}</div>
// //             </div>

// //             {/* Survey submitted badge */}
// //             <div className="sv-review-success-badge">
// //               <FiCheckCircle size={13} /> Survey Successfully Submitted
// //             </div>

// //             {/* Status dropdown */}
// //             <label className="sv-review-label">Inspection Status</label>
// //             <select
// //               className={`sv-review-select ${reviewStatus}`}
// //               value={reviewStatus}
// //               onChange={(e) => setReviewStatus(e.target.value)}
// //             >
// //               <option value="approved">✓ Approved</option>
// //               <option value="rejected">✗ Rejected</option>
// //             </select>

// //             {/* Comment */}
// //             <label className="sv-review-label">Comment / Observation</label>
// //             <textarea
// //               className="sv-review-textarea"
// //               placeholder="तुमचे निरीक्षण / observation इथे लिहा..."
// //               value={reviewComment}
// //               onChange={(e) => setReviewComment(e.target.value)}
// //             />

// //             <div className="sv-review-btnrow">
// //               <button className="sv-review-cancel" onClick={() => setReviewModal(null)}>Cancel</button>
// //               <button
// //                 className={`sv-review-submit ${reviewStatus === "rejected" ? "reject-mode" : ""}`}
// //                 onClick={handleReviewSubmit}
// //                 disabled={submittingReview}
// //               >
// //                 {submittingReview
// //                   ? "Submitting..."
// //                   : reviewStatus === "approved"
// //                     ? <><FiCheckCircle size={15} /> Submit Approval</>
// //                     : <><FiMessageSquare size={15} /> Submit Rejection</>
// //                 }
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// // ==============================================

// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShield, FiMapPin, FiFilter, FiChevronDown,
//   FiCheckCircle, FiEye, FiClipboard, FiSearch,
//   FiUserPlus, FiMessageSquare, FiUser, FiBriefcase,
//   FiNavigation,
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

// // casetype options
// const CASE_OPTIONS = [
//   { value: "case1", label: "Case 1 — Physical Visit (1st Visit)" },
//   { value: "case2", label: "Case 2 — Questionnaire Inspection" },
//   { value: "case3", label: "Case 3 — Re-inspection Notice" },
//   { value: "case4", label: "Case 4 — Final Inspection (after 15 days)" },
// ];

// // status options per casetype
// const STATUS_OPTIONS = {
//   case1: [
//     { value: "compiled",    label: "✓ Compiled — Complied" },
//     { value: "notcompiled", label: "✗ Not Compiled — Non-Compliant" },
//     { value: "pending",     label: "⏳ Pending — Under Review" },
//   ],
//   case2: [
//     { value: "compiled",    label: "✓ Compiled — Complied" },
//     { value: "notcompiled", label: "✗ Not Compiled — Non-Compliant" },
//     { value: "pending",     label: "⏳ Pending — Under Review" },
//   ],
//   case3: [
//     { value: "pending",     label: "⏳ Pending — Notice Issued" },
//     { value: "notcompiled", label: "✗ Not Compiled — No Response" },
//   ],
//   case4: [
//     { value: "compiled",    label: "✓ Compiled — Final Compliance" },
//     { value: "rejected",    label: "✗ Rejected — Permanently Rejected" },
//   ],
// };

// const getAuthUser = () => {
//   try { return JSON.parse(localStorage.getItem("authUser") || "{}"); }
//   catch { return {}; }
// };

// const EMPTY_REVIEW = {
//   casetype:           "case1",
//   status:             "compiled",
//   officername:        "",
//   officerdesignation: "",
//   finalremark:        "",
//   latitude:           null,
//   longitude:          null,
//   locationLoading:    false,
//   locationError:      "",
// };

// export default function Surveys() {
//   const [surveys, setSurveys]               = useState([]);
//   const [loading, setLoading]               = useState(true);
//   const [filterDistrict, setFilterDistrict] = useState("all");
//   const [filterOrgType,  setFilterOrgType]  = useState("all");
//   const [search, setSearch]                 = useState("");
//   const [detailModal, setDetailModal]       = useState(null);

//   // Assign Officer state
//   const [assignModal, setAssignModal]         = useState(null);
//   const [officers, setOfficers]               = useState([]);
//   const [officersLoading, setOfficersLoading] = useState(false);
//   const [selectedOfficer, setSelectedOfficer] = useState(null);
//   const [assigning, setAssigning]             = useState(false);

//   // Review Modal state
//   const [reviewModal, setReviewModal]       = useState(null);
//   const [reviewForm, setReviewForm]         = useState(EMPTY_REVIEW);
//   const [submittingReview, setSubmittingReview] = useState(false);

//   // Role info
//   const authUser            = getAuthUser();
//   const userRole            = authUser?.role     || authUser?.user?.role     || "";
//   const userDistrict        = authUser?.district || authUser?.user?.district || "";
//   const isDistrictAdmin     = userRole === "districtadmin";
//   const isInspectionOfficer = userRole === "inspectionofficer";

//   // Fetch surveys
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

//   // Survey detail
//   const openDetail = async (submissionid) => {
//     setDetailModal({ submissionid, loading: true });
//     try {
//       const res = await axiosInstance.get(`/surveys/${submissionid}`);
//       if (res.data.success) setDetailModal({ ...res.data, submissionid, loading: false });
//     } catch (err) {
//       toast.error("Failed to load survey detail");
//       setDetailModal(null);
//     }
//   };

//   // Open Review Modal + auto-fetch geolocation
//   const openReviewModal = (survey) => {
//     setReviewModal(survey);
//     // Auto-fill officer name from login token
//     // authUser is flat: { id, fullName, userName, role, ... }
//     const officerName = (
//       authUser?.fullName ||
//       authUser?.fullname ||
//       authUser?.userName ||
//       authUser?.username ||
//       ""
//     );
//     const initial = { ...EMPTY_REVIEW, officername: officerName, officerdesignation: "Inspection Officer", locationLoading: true };
//     setReviewForm(initial);

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setReviewForm((p) => ({
//             ...p,
//             latitude:        pos.coords.latitude,
//             longitude:       pos.coords.longitude,
//             locationLoading: false,
//             locationError:   "",
//           }));
//         },
//         (err) => {
//           setReviewForm((p) => ({
//             ...p,
//             locationLoading: false,
//             locationError:   "Location unavailable — using default coordinates",
//             latitude:        0,
//             longitude:       0,
//           }));
//         },
//         { timeout: 8000 }
//       );
//     } else {
//       setReviewForm((p) => ({
//         ...p,
//         locationLoading: false,
//         locationError:   "Browser does not support geolocation",
//         latitude:        0,
//         longitude:       0,
//       }));
//     }
//   };

//   const updateReview = (key) => (e) =>
//     setReviewForm((p) => ({ ...p, [key]: e.target.value }));

//   // casetype बदलला की status reset
//   const handleCasetypeChange = (e) => {
//     const ct = e.target.value;
//     setReviewForm((p) => ({
//       ...p,
//       casetype: ct,
//       status:   STATUS_OPTIONS[ct][0].value,
//     }));
//   };

//   // Submit Review
//   const handleReviewSubmit = async () => {
//     if (!reviewForm.officername.trim())        { toast.error("Enter Officer Name"); return; }
//     if (!reviewForm.officerdesignation.trim()) { toast.error("Enter Designation"); return; }
//     if (!reviewForm.finalremark.trim())        { toast.error("Enter Remark / Observation"); return; }
//     if (reviewForm.locationLoading)            { toast.error("Fetching location, please wait..."); return; }

//     setSubmittingReview(true);
//     try {
//       const res = await axiosInstance.post("/officer/report/quick-review", {
//         orgid:              reviewModal.orgid,
//         casetype:           reviewForm.casetype,
//         status:             reviewForm.status,
//         officername:        reviewForm.officername.trim(),
//         officerdesignation: reviewForm.officerdesignation.trim(),
//         finalremark:        reviewForm.finalremark.trim(),
//         latitude:           reviewForm.latitude  ?? 0,
//         longitude:          reviewForm.longitude ?? 0,
//       });
//       if (res.data.success) {
//         toast.success("Review submitted successfully!");
//         setReviewModal(null);
//         fetchSurveys();
//       } else {
//         toast.error(res.data.message || "Review submit failed");
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Server error");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   // Open assign modal + fetch officers
//   const openAssignModal = async (survey) => {
//     setAssignModal({ survey });
//     setSelectedOfficer(null);
//     setOfficersLoading(true);
//     try {
//       const res = await axiosInstance.get("/inspection-officer/get");
//       if (res.data.success) {
//         const allOfficers = res.data.data || [];
//         setOfficers(allOfficers.filter((o) => o.district === survey.district));
//       }
//     } catch (err) {
//       toast.error("Failed to load officers");
//     } finally {
//       setOfficersLoading(false);
//     }
//   };

//   // Assign officer
//   const handleAssign = async () => {
//     if (!selectedOfficer) { toast.error("Officer select kara"); return; }
//     setAssigning(true);
//     try {
//       const res = await axiosInstance.post("/assignment/assign", {
//         orgid:     assignModal.survey.orgid,
//         officerid: selectedOfficer,
//       });
//       if (res.data.success) {
//         toast.success("Officer assigned successfully!");
//         setAssignModal(null);
//       } else {
//         toast.error(res.data.message || "Assignment failed");
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Assignment failed");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   // Filters
//   const orgTypeOptions = useMemo(() =>
//     [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort(),
//   [surveys]);

//   const filtered = useMemo(() => {
//     return surveys.filter((s) => {
//       if (isDistrictAdmin && userDistrict && s.district !== userDistrict) return false;
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

//   // Status color
//   const statusColor = (status) => {
//     if (status === "compiled")    return { color: "#15803d", bg: "rgba(34,197,94,0.12)" };
//     if (status === "rejected")    return { color: "#b91c1c", bg: "rgba(239,68,68,0.12)" };
//     if (status === "notcompiled") return { color: "#b91c1c", bg: "rgba(239,68,68,0.12)" };
//     if (status === "pending")     return { color: "#b45309", bg: "rgba(245,158,11,0.12)" };
//     return { color: BLUE, bg: "rgba(44,61,131,0.08)" };
//   };

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
//         .sv-table tbody tr:hover { background:rgba(205,54,107,0.02); }
//         .sv-org-cell { display:flex; align-items:center; gap:10px; }
//         .sv-avatar { width:34px; height:34px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; }
//         .sv-orgname { font-weight:700; }
//         .sv-orgtype { font-size:11.5px; color:rgba(44,61,131,0.45); margin-top:1px; }
//         .sv-district-pill { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700; color:${BLUE}; background:rgba(44,61,131,0.06); padding:5px 12px; border-radius:999px; }
//         .sv-date { color:rgba(44,61,131,0.55); font-size:12.5px; }
//         .sv-actions { display:flex; gap:8px; }
//         .sv-view-btn   { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
//         .sv-view-btn:hover { background:rgba(205,54,107,0.16); }
//         .sv-assign-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${BLUE}; background:rgba(44,61,131,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
//         .sv-assign-btn:hover { background:rgba(44,61,131,0.16); }
//         .sv-review-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:#15803d; background:rgba(34,197,94,0.10); transition:all .15s; font-family:'Inter',sans-serif; }
//         .sv-review-btn:hover { background:rgba(34,197,94,0.20); }
//         .sv-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
//         .sv-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
//         .sv-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
//         .sv-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:svFade .2s ease both; }
//         @keyframes svFade { from{opacity:0} to{opacity:1} }
//         .sv-modal { width:100%; max-width:560px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:88vh; overflow-y:auto; animation:svUp .3s cubic-bezier(.22,.9,.36,1) both; }
//         .sv-modal-sm { max-width:460px; }
//         .sv-modal-md { max-width:500px; }
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
//         /* Assign styles */
//         .sv-survey-info-box { background:rgba(44,61,131,0.04); border-radius:10px; padding:12px 14px; margin-bottom:16px; }
//         .sv-survey-info-box-title { font-size:11px; font-weight:800; color:rgba(44,61,131,0.45); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px; }
//         .sv-survey-info-box-val { font-size:14px; font-weight:700; color:${BLUE_DEEP}; }
//         .sv-survey-info-box-sub { font-size:12px; color:rgba(44,61,131,0.5); margin-top:2px; }
//         .sv-officer-list { display:flex; flex-direction:column; gap:8px; max-height:300px; overflow-y:auto; }
//         .sv-officer-item { display:flex; align-items:center; gap:12px; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.10); border-radius:12px; cursor:pointer; transition:all .15s; }
//         .sv-officer-item:hover { border-color:rgba(44,61,131,0.25); background:rgba(44,61,131,0.02); }
//         .sv-officer-item.selected { border-color:${PINK}; background:rgba(205,54,107,0.04); }
//         .sv-officer-avatar { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:14px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
//         .sv-officer-name { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
//         .sv-officer-sub  { font-size:11.5px; color:rgba(44,61,131,0.5); margin-top:1px; }
//         .sv-officer-check { margin-left:auto; width:20px; height:20px; border-radius:50%; border:2px solid rgba(44,61,131,0.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
//         .sv-officer-item.selected .sv-officer-check { background:${PINK}; border-color:${PINK}; }
//         .sv-assign-submit { width:100%; padding:14px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; background:linear-gradient(135deg,${PINK},${PINK_DARK}); box-shadow:0 10px 26px rgba(205,54,107,0.28); margin-top:16px; font-family:'Inter',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
//         .sv-assign-submit:disabled { opacity:0.5; cursor:not-allowed; }
//         .sv-assign-submit:hover:not(:disabled) { transform:translateY(-1px); }
//         /* Review modal styles */
//         .rv-org-box { background:rgba(44,61,131,0.04); border-radius:12px; padding:14px 16px; margin-bottom:18px; border-left:3px solid ${PINK}; }
//         .rv-org-name { font-size:15px; font-weight:800; color:${BLUE_DEEP}; }
//         .rv-org-sub  { font-size:12px; color:rgba(44,61,131,0.5); margin-top:3px; }
//         .rv-success-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(34,197,94,0.10); border-radius:999px; font-size:12.5px; font-weight:700; color:#15803d; margin-bottom:16px; }
//         .rv-label { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.5); margin-bottom:8px; display:block; }
//         .rv-select { width:100%; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; cursor:pointer; background:#fff; margin-bottom:14px; transition:all .2s; appearance:none; }
//         .rv-select:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
//         .rv-input { width:100%; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; background:#fff; margin-bottom:14px; transition:all .2s; }
//         .rv-input:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
//         .rv-input::placeholder { color:rgba(44,61,131,0.35); }
//         .rv-two-col { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
//         .rv-textarea { width:100%; padding:12px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; resize:vertical; min-height:90px; transition:all .2s; margin-bottom:14px; }
//         .rv-textarea:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
//         .rv-textarea::placeholder { color:rgba(44,61,131,0.35); }
//         .rv-location-box { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; margin-bottom:16px; font-size:12.5px; font-weight:600; }
//         .rv-location-box.loading  { background:rgba(44,61,131,0.05); color:rgba(44,61,131,0.5); }
//         .rv-location-box.success  { background:rgba(34,197,94,0.08); color:#15803d; }
//         .rv-location-box.error    { background:rgba(245,158,11,0.08); color:#b45309; }
//         .rv-divider { font-size:10.5px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:rgba(44,61,131,0.35); margin:4px 0 14px; display:flex; align-items:center; gap:10px; }
//         .rv-divider::after { content:''; flex:1; height:1px; background:rgba(44,61,131,0.08); }
//         .rv-btnrow { display:flex; gap:10px; margin-top:4px; }
//         .rv-cancel { flex:0 0 auto; padding:13px 20px; border-radius:12px; border:1.5px solid rgba(44,61,131,0.15); background:#fff; color:${BLUE_DEEP}; font-size:13.5px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; transition:all .2s; }
//         .rv-cancel:hover { background:rgba(44,61,131,0.04); }
//         .rv-submit { flex:1; padding:13px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; background:linear-gradient(135deg,${PINK},${PINK_DARK}); box-shadow:0 10px 26px rgba(205,54,107,0.28); }
//         .rv-submit:disabled { opacity:0.5; cursor:not-allowed; }
//         .rv-submit:hover:not(:disabled) { transform:translateY(-1px); }
//         .rv-submit.reject { background:linear-gradient(135deg,#e53e3e,#c53030); box-shadow:0 10px 26px rgba(229,62,62,0.28); }
//         @media (max-width:700px) { .sv-page{padding:20px;} .sv-stats{flex-direction:column;} .sv-modal-info-grid{grid-template-columns:1fr;} .rv-two-col{grid-template-columns:1fr;} }
//       `}</style>

//       <div className="sv-page">
//         {/* Header */}
//         <div className="sv-header">
//           <div className="sv-title-row">
//             <div className="sv-icon-badge"><FiClipboard size={22} /></div>
//             <div>
//               <div className="sv-title">POSH Survey Submissions</div>
//               {isDistrictAdmin && userDistrict ? (
//                 <div className="sv-district-badge"><FiMapPin size={12} /> {userDistrict} District Only</div>
//               ) : (
//                 <div className="sv-subtitle">All company survey submissions across Maharashtra</div>
//               )}
//             </div>
//           </div>
//           <button className="sv-refresh-btn" onClick={fetchSurveys}>
//             <FiShield size={16} /> Refresh
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="sv-stats">
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiClipboard size={18} /></div>
//             <div><div className="sv-stat-num">{filtered.length}</div><div className="sv-stat-label">Total Submissions</div></div>
//           </div>
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiMapPin size={18} /></div>
//             <div><div className="sv-stat-num">{new Set(filtered.map((s) => s.district)).size}</div><div className="sv-stat-label">Districts Covered</div></div>
//           </div>
//           <div className="sv-stat-card">
//             <div className="sv-stat-icon"><FiCheckCircle size={18} /></div>
//             <div><div className="sv-stat-num">{isDistrictAdmin ? 1 : 34}</div><div className="sv-stat-label">Total Districts in MH</div></div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="sv-table-card">
//           <div className="sv-table-head">
//             <div className="sv-table-head-left">
//               <span className="sv-table-head-title">All Survey Submissions</span>
//               <span className="sv-table-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
//             </div>
//             <div className="sv-filters">
//               <div className="sv-search-wrap">
//                 <FiSearch size={13} />
//                 <input className="sv-search-input" placeholder="Search org, contact..." value={search} onChange={(e) => setSearch(e.target.value)} />
//               </div>
//               {!isDistrictAdmin && !isInspectionOfficer && (
//                 <div className="sv-filter-select-wrap">
//                   <FiMapPin size={13} />
//                   <select className="sv-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
//                     <option value="all">All Districts</option>
//                     {MH_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
//                   </select>
//                   <FiChevronDown size={13} />
//                 </div>
//               )}
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
//                         {s.submittedat ? new Date(s.submittedat).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
//                       </td>
//                       <td>
//                         <div className="sv-actions">
//                           <button className="sv-view-btn" onClick={() => openDetail(s.submissionid)}>
//                             <FiEye size={13} /> View
//                           </button>
//                           {isDistrictAdmin && (
//                             <button className="sv-assign-btn" onClick={() => openAssignModal(s)}>
//                               <FiUserPlus size={13} /> Assign
//                             </button>
//                           )}
//                           {isInspectionOfficer && (
//                             <button className="sv-review-btn" onClick={() => openReviewModal(s)}>
//                               <FiMessageSquare size={13} /> Review
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Detail Modal */}
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
//                         <span className="sv-answer-q"><span className="sv-answer-qid">Q{qid}.</span> Question {qid}</span>
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

//       {/* Assign Officer Modal */}
//       {assignModal && (
//         <div className="sv-overlay" onClick={() => setAssignModal(null)}>
//           <div className="sv-modal sv-modal-sm" onClick={(e) => e.stopPropagation()}>
//             <div className="sv-modal-head">
//               <div>
//                 <div className="sv-modal-title">Assign Inspection Officer</div>
//                 <div className="sv-modal-sub">{assignModal.survey.district} District Officers</div>
//               </div>
//               <button className="sv-modal-close" onClick={() => setAssignModal(null)}>×</button>
//             </div>
//             <div className="sv-survey-info-box">
//               <div className="sv-survey-info-box-title">Survey Organization</div>
//               <div className="sv-survey-info-box-val">{assignModal.survey.orgname || "—"}</div>
//               <div className="sv-survey-info-box-sub">{assignModal.survey.district} · {assignModal.survey.taluka || "—"}</div>
//             </div>
//             <div className="sv-modal-section-title">Select Officer</div>
//             {officersLoading ? (
//               <div style={{ padding: "30px 0", textAlign: "center", color: "rgba(44,61,131,0.4)" }}>Loading officers…</div>
//             ) : officers.length === 0 ? (
//               <div style={{ padding: "20px 0", textAlign: "center", color: "rgba(44,61,131,0.4)", fontSize: 13 }}>
//                 No officers found for {assignModal.survey.district} district
//               </div>
//             ) : (
//               <div className="sv-officer-list">
//                 {officers.map((o) => (
//                   <div key={o.id} className={`sv-officer-item ${selectedOfficer === o.id ? "selected" : ""}`} onClick={() => setSelectedOfficer(o.id)}>
//                     <div className="sv-officer-avatar">{(o.fullname || "?").charAt(0).toUpperCase()}</div>
//                     <div>
//                       <div className="sv-officer-name">{o.fullname}</div>
//                       <div className="sv-officer-sub">@{o.username} · {o.mobile}</div>
//                     </div>
//                     <div className="sv-officer-check">
//                       {selectedOfficer === o.id && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <button className="sv-assign-submit" onClick={handleAssign} disabled={assigning || !selectedOfficer}>
//               {assigning ? "Assigning..." : <><FiUserPlus size={15} /> Assign Officer</>}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Review Modal — Inspection Officer only */}
//       {reviewModal && (
//         <div className="sv-overlay" onClick={() => setReviewModal(null)}>
//           <div className="sv-modal sv-modal-md" onClick={(e) => e.stopPropagation()}>
//             <div className="sv-modal-head">
//               <div>
//                 <div className="sv-modal-title">Survey Review</div>
//                 <div className="sv-modal-sub">Inspection Officer Report</div>
//               </div>
//               <button className="sv-modal-close" onClick={() => setReviewModal(null)}>×</button>
//             </div>

//             {/* Org info */}
//             <div className="rv-org-box">
//               <div className="rv-org-name">{reviewModal.orgname || "—"}</div>
//               <div className="rv-org-sub">{reviewModal.district} · {reviewModal.taluka || "—"} · {reviewModal.orgtype || "—"}</div>
//             </div>

//             {/* Survey submitted badge */}
//             <div className="rv-success-badge">
//               <FiCheckCircle size={13} /> Survey Successfully Submitted
//             </div>

//             {/* Case Type */}
//             <label className="rv-label">Case Type</label>
//             <select className="rv-select" value={reviewForm.casetype} onChange={handleCasetypeChange}>
//               {CASE_OPTIONS.map((c) => (
//                 <option key={c.value} value={c.value}>{c.label}</option>
//               ))}
//             </select>

//             {/* Status */}
//             <label className="rv-label">Inspection Status</label>
//             <select className="rv-select" value={reviewForm.status} onChange={updateReview("status")}>
//               {(STATUS_OPTIONS[reviewForm.casetype] || []).map((s) => (
//                 <option key={s.value} value={s.value}>{s.label}</option>
//               ))}
//             </select>

//             {/* Officer Details */}
//             <div className="rv-divider">Officer Details</div>
//             <div className="rv-two-col">
//               <div>
//                 <label className="rv-label">Officer Name</label>
//                 <input
//                   className="rv-input"
//                   placeholder="Full Name"
//                   value={reviewForm.officername}
//                   onChange={updateReview("officername")}
//                 />
//               </div>
//               <div>
//                 <label className="rv-label">Designation</label>
//                 <input
//                   className="rv-input"
//                   placeholder="e.g. Inspection Officer"
//                   value={reviewForm.officerdesignation}
//                   onChange={updateReview("officerdesignation")}
//                 />
//               </div>
//             </div>

//             {/* Remark */}
//             <label className="rv-label">Remark / Observation</label>
//             <textarea
//               className="rv-textarea"
//               placeholder="Write your observation / remarks here..."
//               value={reviewForm.finalremark}
//               onChange={updateReview("finalremark")}
//             />

//             {/* Location status */}
//             {reviewForm.locationLoading ? (
//               <div className="rv-location-box loading">
//                 <FiNavigation size={14} /> Fetching location...
//               </div>
//             ) : reviewForm.locationError ? (
//               <div className="rv-location-box error">
//                 <FiNavigation size={14} /> {reviewForm.locationError}
//               </div>
//             ) : (
//               <div className="rv-location-box success">
//                 <FiNavigation size={14} /> Location मिळाली — {reviewForm.latitude?.toFixed(4)}, {reviewForm.longitude?.toFixed(4)}
//               </div>
//             )}

//             <div className="rv-btnrow">
//               <button className="rv-cancel" onClick={() => setReviewModal(null)}>Cancel</button>
//               <button
//                 className={`rv-submit ${reviewForm.status === "rejected" ? "reject" : ""}`}
//                 onClick={handleReviewSubmit}
//                 disabled={submittingReview || reviewForm.locationLoading}
//               >
//                 {submittingReview
//                   ? "Submitting..."
//                   : reviewForm.status === "rejected"
//                     ? <><FiMessageSquare size={15} /> Submit Rejection</>
//                     : <><FiCheckCircle size={15} /> Submit Review</>
//                 }
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import {
  FiShield, FiMapPin, FiFilter, FiChevronDown,
  FiCheckCircle, FiEye, FiClipboard, FiSearch,
  FiUserPlus, FiMessageSquare, FiNavigation, FiAlertCircle,
} from "react-icons/fi";
import axiosInstance from "../services/axiosInstance";
import poshQuestions from "../data/Poshqquestionsdata";

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

const CASE_OPTIONS = [
  { value: "case1", label: "Case 1 — Physical Visit (1st Visit)" },
  { value: "case2", label: "Case 2 — Questionnaire Inspection" },
  { value: "case3", label: "Case 3 — Re-inspection Notice" },
  { value: "case4", label: "Case 4 — Final Inspection (after 15 days)" },
];

const getAuthUser = () => {
  try { return JSON.parse(localStorage.getItem("authUser") || "{}"); }
  catch { return {}; }
};

// poshQuestions मधून flat array of all questions
const ALL_QUESTIONS = poshQuestions.parts.flatMap((p) => p.questions);

export default function Surveys() {
  const [surveys, setSurveys]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [filterOrgType,  setFilterOrgType]  = useState("all");
  const [search, setSearch]                 = useState("");
  const [detailModal, setDetailModal]       = useState(null);

  // Assign Officer state
  const [assignModal, setAssignModal]         = useState(null);
  const [officers, setOfficers]               = useState([]);
  const [officersLoading, setOfficersLoading] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [assigning, setAssigning]             = useState(false);

  // Review Modal state
  const [reviewModal, setReviewModal]           = useState(null);
  const [reviewRound, setReviewRound]           = useState(1);
  const [reviewRoundLoading, setReviewRoundLoading] = useState(false);
  const [noQuestionIds, setNoQuestionIds]       = useState([]); // round 2 साठी फक्त हे questions
  const [casetype, setCasetype]                 = useState("case1");
  const [officername, setOfficername]           = useState("");
  const [officerdesignation, setOfficerdesignation] = useState("Inspection Officer");
  const [finalremark, setFinalremark]           = useState("");
  const [location, setLocation]                 = useState({ lat: null, lng: null, loading: true, error: "" });
  // per-question review: { [questionid]: { answer: 'yes'|'no', comment: '' } }
  const [questionReviews, setQuestionReviews]   = useState({});
  const [submittingReview, setSubmittingReview] = useState(false);

  const authUser            = getAuthUser();
  const userRole            = authUser?.role     || "";
  const userDistrict        = authUser?.district || "";
  const isDistrictAdmin     = userRole === "districtadmin";
  const isInspectionOfficer = userRole === "inspectionofficer";

  // Fetch surveys
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

  // Survey detail
  const openDetail = async (submissionid) => {
    setDetailModal({ submissionid, loading: true });
    try {
      const res = await axiosInstance.get(`/surveys/${submissionid}`);
      if (res.data.success) setDetailModal({ ...res.data, submissionid, loading: false });
    } catch (err) {
      toast.error("Failed to load survey detail");
      setDetailModal(null);
    }
  };

  // Open Review Modal
  const openReviewModal = async (survey) => {
    setReviewModal(survey);
    setQuestionReviews({});
    setFinalremark("");
    setCasetype("case1");

    const oName = authUser?.fullName || authUser?.fullname || authUser?.userName || authUser?.username || "";
    setOfficername(oName);
    setOfficerdesignation("Inspection Officer");

    // Geolocation
    setLocation({ lat: null, lng: null, loading: true, error: "" });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, loading: false, error: "" }),
        ()    => setLocation({ lat: 0, lng: 0, loading: false, error: "Location unavailable" }),
        { timeout: 8000 }
      );
    } else {
      setLocation({ lat: 0, lng: 0, loading: false, error: "Browser does not support geolocation" });
    }

    // Fetch review round info
    setReviewRoundLoading(true);
    try {
      const res = await axiosInstance.get(`/officer/report/get-round?orgid=${survey.orgid}`);
      if (res.data.success) {
        setReviewRound(res.data.reviewround || 1);
        setNoQuestionIds(res.data.noQuestionIds || []);
      }
    } catch {
      setReviewRound(1);
      setNoQuestionIds([]);
    } finally {
      setReviewRoundLoading(false);
    }
  };

  // Questions to show in review modal
  const questionsToReview = useMemo(() => {
    if (reviewRound === 1) return ALL_QUESTIONS;
    // Round 2 — फक्त no होते ते questions
    return ALL_QUESTIONS.filter((q) => noQuestionIds.includes(q.no));
  }, [reviewRound, noQuestionIds]);

  // Per-question answer set
  const setQAnswer = useCallback((qno, answer) => {
    setQuestionReviews((p) => ({
      ...p,
      [qno]: { answer, comment: answer === "yes" ? "" : (p[qno]?.comment || "") },
    }));
  }, []);

  const setQComment = useCallback((qno, comment) => {
    setQuestionReviews((p) => ({
      ...p,
      [qno]: { ...p[qno], comment },
    }));
  }, []);

  // Submit Review
  const handleReviewSubmit = async () => {
    if (!officername.trim())        { toast.error("Enter Officer Name"); return; }
    if (!officerdesignation.trim()) { toast.error("Enter Designation"); return; }
    if (!finalremark.trim())        { toast.error("Enter Overall Remark"); return; }
    if (location.loading)           { toast.error("Fetching location..."); return; }

    // सगळ्या questions ला answer दिला का check
    const unanswered = questionsToReview.filter((q) => !questionReviews[q.no]?.answer);
    if (unanswered.length > 0) {
      toast.error(`${unanswered.length} question(s) unanswered`);
      return;
    }

    // No वाल्यांना comment mandatory
    const noWithoutComment = questionsToReview.filter(
      (q) => questionReviews[q.no]?.answer === "no" && !questionReviews[q.no]?.comment?.trim()
    );
    if (noWithoutComment.length > 0) {
      toast.error(`Please add comment for ${noWithoutComment.length} No answer(s)`);
      return;
    }

    const payload = {
      orgid:              reviewModal.orgid,
      casetype,
      officername:        officername.trim(),
      officerdesignation: officerdesignation.trim(),
      finalremark:        finalremark.trim(),
      latitude:           location.lat ?? 0,
      longitude:          location.lng ?? 0,
      questionReviews:    questionsToReview.map((q) => ({
        questionid: q.no,
        answer:     questionReviews[q.no]?.answer,
        comment:    questionReviews[q.no]?.comment || "",
      })),
    };

    setSubmittingReview(true);
    try {
      const res = await axiosInstance.post("/officer/report/quick-review", payload);
      if (res.data.success) {
        const fs = res.data.finalstatus;
        if (fs === "compiled")    toast.success("✅ Survey Complied! Final submission done.");
        else if (fs === "rejected") toast.error("❌ Survey Permanently Rejected.");
        else toast.success("📋 Review submitted. 15-day notice issued.");
        setReviewModal(null);
        fetchSurveys();
      } else {
        toast.error(res.data.message || "Review submit failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Open assign modal + fetch officers
  const openAssignModal = async (survey) => {
    setAssignModal({ survey });
    setSelectedOfficer(null);
    setOfficersLoading(true);
    try {
      const res = await axiosInstance.get("/inspection-officer/get");
      if (res.data.success) {
        setOfficers((res.data.data || []).filter((o) => o.district === survey.district));
      }
    } catch { toast.error("Failed to load officers"); }
    finally { setOfficersLoading(false); }
  };

  const handleAssign = async () => {
    if (!selectedOfficer) { toast.error("Officer select kara"); return; }
    setAssigning(true);
    try {
      const res = await axiosInstance.post("/assignment/assign", {
        orgid: assignModal.survey.orgid, officerid: selectedOfficer,
      });
      if (res.data.success) { toast.success("Officer assigned!"); setAssignModal(null); }
      else toast.error(res.data.message || "Assignment failed");
    } catch (err) { toast.error(err?.response?.data?.message || "Assignment failed"); }
    finally { setAssigning(false); }
  };

  const orgTypeOptions = useMemo(() =>
    [...new Set(surveys.map((s) => s.orgtype).filter(Boolean))].sort(), [surveys]);

  const filtered = useMemo(() => surveys.filter((s) => {
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
  }), [surveys, filterDistrict, filterOrgType, search, isDistrictAdmin, userDistrict]);

  const answeredCount = questionsToReview.filter((q) => questionReviews[q.no]?.answer).length;
  const hasAnyNo      = questionsToReview.some((q) => questionReviews[q.no]?.answer === "no");

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
        .sv-view-btn   { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
        .sv-view-btn:hover { background:rgba(205,54,107,0.16); }
        .sv-assign-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${BLUE}; background:rgba(44,61,131,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
        .sv-assign-btn:hover { background:rgba(44,61,131,0.16); }
        .sv-review-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:#15803d; background:rgba(34,197,94,0.10); transition:all .15s; font-family:'Inter',sans-serif; }
        .sv-review-btn:hover { background:rgba(34,197,94,0.20); }
        .sv-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
        .sv-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
        .sv-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
        .sv-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:svFade .2s ease both; }
        @keyframes svFade { from{opacity:0} to{opacity:1} }
        .sv-modal { width:100%; max-width:600px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:90vh; overflow-y:auto; animation:svUp .3s cubic-bezier(.22,.9,.36,1) both; }
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
        /* Assign styles */
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
        /* Review Modal */
        .rv-org-box { background:rgba(44,61,131,0.04); border-radius:12px; padding:14px 16px; margin-bottom:14px; border-left:3px solid ${PINK}; }
        .rv-org-name { font-size:15px; font-weight:800; color:${BLUE_DEEP}; }
        .rv-org-sub  { font-size:12px; color:rgba(44,61,131,0.5); margin-top:3px; }
        .rv-round-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:999px; font-size:12.5px; font-weight:700; margin-bottom:14px; }
        .rv-round-badge.r1 { background:rgba(44,61,131,0.08); color:${BLUE}; }
        .rv-round-badge.r2 { background:rgba(245,158,11,0.12); color:#b45309; }
        .rv-label { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.5); margin-bottom:8px; display:block; }
        .rv-select { width:100%; padding:11px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; cursor:pointer; background:#fff; margin-bottom:14px; appearance:none; }
        .rv-select:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
        .rv-two-col { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; }
        .rv-input { width:100%; padding:11px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; background:#fff; transition:all .2s; }
        .rv-input:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
        .rv-input::placeholder { color:rgba(44,61,131,0.35); }
        .rv-divider { font-size:10.5px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:rgba(44,61,131,0.35); margin:4px 0 14px; display:flex; align-items:center; gap:10px; }
        .rv-divider::after { content:''; flex:1; height:1px; background:rgba(44,61,131,0.08); }
        .rv-progress-bar { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
        .rv-progress-text { font-size:12px; font-weight:700; color:rgba(44,61,131,0.5); }
        .rv-progress-count { font-size:12px; font-weight:800; color:${PINK}; }
        /* Question cards */
        .rv-q-list { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; max-height:380px; overflow-y:auto; padding-right:4px; }
        .rv-q-card { border:1.5px solid rgba(44,61,131,0.10); border-radius:14px; padding:14px 16px; transition:all .2s; background:#fff; }
        .rv-q-card:hover { border-color:rgba(205,54,107,0.20); }
        .rv-q-card.answered-yes { border-color:rgba(34,197,94,0.35); background:rgba(34,197,94,0.03); }
        .rv-q-card.answered-no  { border-color:rgba(239,68,68,0.35); background:rgba(239,68,68,0.03); }
        .rv-q-text { font-size:13px; line-height:1.6; color:${BLUE_DEEP}; margin-bottom:10px; }
        .rv-q-no { color:${PINK}; font-weight:800; margin-right:4px; }
        .rv-q-options { display:flex; gap:8px; }
        .rv-opt { flex:1; padding:9px 0; border-radius:10px; border:1.5px solid rgba(44,61,131,0.12); background:#fff; color:${BLUE_DEEP}; font-size:13px; font-weight:700; font-family:'Inter',sans-serif; cursor:pointer; transition:all .18s; }
        .rv-opt:hover { border-color:${PINK}; background:rgba(205,54,107,0.04); }
        .rv-opt.yes-active { background:linear-gradient(135deg,#22c55e,#16a34a); color:#fff; border-color:transparent; box-shadow:0 4px 14px rgba(34,197,94,0.30); }
        .rv-opt.no-active  { background:linear-gradient(135deg,#f87171,#ef4444); color:#fff; border-color:transparent; box-shadow:0 4px 14px rgba(239,68,68,0.28); }
        .rv-comment-box { margin-top:10px; }
        .rv-comment-textarea { width:100%; padding:10px 13px; border:1.5px solid rgba(239,68,68,0.3); border-radius:10px; font-size:13px; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; resize:vertical; min-height:72px; transition:all .2s; background:rgba(239,68,68,0.02); }
        .rv-comment-textarea:focus { border-color:#ef4444; box-shadow:0 0 0 3px rgba(239,68,68,0.10); }
        .rv-comment-textarea::placeholder { color:rgba(44,61,131,0.35); }
        .rv-comment-label { font-size:11px; font-weight:700; color:#b91c1c; margin-bottom:5px; display:flex; align-items:center; gap:5px; }
        /* Remark + location */
        .rv-textarea { width:100%; padding:11px 14px; border:1.5px solid rgba(44,61,131,0.15); border-radius:12px; font-size:14px; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; outline:none; resize:vertical; min-height:80px; transition:all .2s; margin-bottom:12px; }
        .rv-textarea:focus { border-color:${PINK}; box-shadow:0 0 0 3px rgba(205,54,107,0.12); }
        .rv-textarea::placeholder { color:rgba(44,61,131,0.35); }
        .rv-location-box { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; margin-bottom:14px; font-size:12.5px; font-weight:600; }
        .rv-location-box.loading { background:rgba(44,61,131,0.05); color:rgba(44,61,131,0.5); }
        .rv-location-box.success { background:rgba(34,197,94,0.08); color:#15803d; }
        .rv-location-box.error   { background:rgba(245,158,11,0.08); color:#b45309; }
        .rv-warn-box { display:flex; align-items:center; gap:8px; padding:10px 14px; border-radius:10px; margin-bottom:14px; font-size:12.5px; font-weight:600; background:rgba(245,158,11,0.10); color:#b45309; border:1px solid rgba(245,158,11,0.25); }
        .rv-btnrow { display:flex; gap:10px; margin-top:4px; }
        .rv-cancel { flex:0 0 auto; padding:13px 20px; border-radius:12px; border:1.5px solid rgba(44,61,131,0.15); background:#fff; color:${BLUE_DEEP}; font-size:13.5px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; transition:all .2s; }
        .rv-cancel:hover { background:rgba(44,61,131,0.04); }
        .rv-submit { flex:1; padding:13px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; background:linear-gradient(135deg,${PINK},${PINK_DARK}); box-shadow:0 10px 26px rgba(205,54,107,0.28); }
        .rv-submit:disabled { opacity:0.5; cursor:not-allowed; }
        .rv-submit:hover:not(:disabled) { transform:translateY(-1px); }
        .rv-submit.reject { background:linear-gradient(135deg,#e53e3e,#c53030); box-shadow:0 10px 26px rgba(229,62,62,0.28); }
        @media (max-width:700px) { .sv-page{padding:20px;} .sv-stats{flex-direction:column;} .sv-modal-info-grid{grid-template-columns:1fr;} .rv-two-col{grid-template-columns:1fr;} }
      `}</style>

      <div className="sv-page">
        {/* Header */}
        <div className="sv-header">
          <div className="sv-title-row">
            <div className="sv-icon-badge"><FiClipboard size={22} /></div>
            <div>
              <div className="sv-title">POSH Survey Submissions</div>
              {isDistrictAdmin && userDistrict
                ? <div className="sv-district-badge"><FiMapPin size={12}/> {userDistrict} District Only</div>
                : <div className="sv-subtitle">All company survey submissions across Maharashtra</div>}
            </div>
          </div>
          <button className="sv-refresh-btn" onClick={fetchSurveys}><FiShield size={16}/> Refresh</button>
        </div>

        {/* Stats */}
        <div className="sv-stats">
          {[
            { icon: <FiClipboard size={18}/>, num: filtered.length,    label: "Total Submissions" },
            { icon: <FiMapPin    size={18}/>, num: new Set(filtered.map(s=>s.district)).size, label: "Districts Covered" },
            { icon: <FiCheckCircle size={18}/>, num: isDistrictAdmin?1:34, label: "Total Districts in MH" },
          ].map(({ icon, num, label }) => (
            <div className="sv-stat-card" key={label}>
              <div className="sv-stat-icon">{icon}</div>
              <div><div className="sv-stat-num">{num}</div><div className="sv-stat-label">{label}</div></div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="sv-table-card">
          <div className="sv-table-head">
            <div className="sv-table-head-left">
              <span className="sv-table-head-title">All Survey Submissions</span>
              <span className="sv-table-count">{filtered.length} record{filtered.length!==1?"s":""}</span>
            </div>
            <div className="sv-filters">
              <div className="sv-search-wrap">
                <FiSearch size={13}/>
                <input className="sv-search-input" placeholder="Search org, contact..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
              </div>
              {!isDistrictAdmin && !isInspectionOfficer && (
                <div className="sv-filter-select-wrap">
                  <FiMapPin size={13}/>
                  <select className="sv-filter-select" value={filterDistrict} onChange={(e)=>setFilterDistrict(e.target.value)}>
                    <option value="all">All Districts</option>
                    {MH_DISTRICTS.map((d)=><option key={d} value={d}>{d}</option>)}
                  </select>
                  <FiChevronDown size={13}/>
                </div>
              )}
              <div className="sv-filter-select-wrap">
                <FiFilter size={13}/>
                <select className="sv-filter-select" value={filterOrgType} onChange={(e)=>setFilterOrgType(e.target.value)}>
                  <option value="all">All Types</option>
                  {orgTypeOptions.map((t)=><option key={t} value={t}>{t}</option>)}
                </select>
                <FiChevronDown size={13}/>
              </div>
            </div>
          </div>

          {loading ? <div className="sv-loading">Loading surveys…</div>
          : filtered.length === 0 ? (
            <div className="sv-empty">
              <div className="sv-empty-icon"><FiClipboard size={24}/></div>
              {surveys.length===0?"No survey submissions yet.":"No records match the selected filters."}
            </div>
          ) : (
            <div className="sv-table-wrap">
              <table className="sv-table">
                <thead><tr>
                  <th>Organization</th><th>Contact Person</th><th>Mobile</th>
                  <th>District</th><th>Taluka</th><th>Submitted On</th><th>Action</th>
                </tr></thead>
                <tbody>
                  {filtered.map((s)=>(
                    <tr key={s.submissionid}>
                      <td>
                        <div className="sv-org-cell">
                          <div className="sv-avatar">{(s.orgname||"?").charAt(0).toUpperCase()}</div>
                          <div><div className="sv-orgname">{s.orgname||"—"}</div><div className="sv-orgtype">{s.orgtype||"—"}</div></div>
                        </div>
                      </td>
                      <td>{s.concernname||"—"}</td>
                      <td>{s.concernmobile||"—"}</td>
                      <td><span className="sv-district-pill"><FiMapPin size={11}/> {s.district||"—"}</span></td>
                      <td>{s.taluka||"—"}</td>
                      <td className="sv-date">{s.submittedat?new Date(s.submittedat).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"—"}</td>
                      <td>
                        <div className="sv-actions">
                          <button className="sv-view-btn" onClick={()=>openDetail(s.submissionid)}><FiEye size={13}/> View</button>
                          {isDistrictAdmin && <button className="sv-assign-btn" onClick={()=>openAssignModal(s)}><FiUserPlus size={13}/> Assign</button>}
                          {isInspectionOfficer && <button className="sv-review-btn" onClick={()=>openReviewModal(s)}><FiMessageSquare size={13}/> Review</button>}
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
        <div className="sv-overlay" onClick={()=>setDetailModal(null)}>
          <div className="sv-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="sv-modal-head">
              <div><div className="sv-modal-title">Survey Detail</div><div className="sv-modal-sub">Submission #{detailModal.submissionid}</div></div>
              <button className="sv-modal-close" onClick={()=>setDetailModal(null)}>×</button>
            </div>
            {detailModal.loading ? <div style={{padding:"40px 0",textAlign:"center",color:"rgba(44,61,131,0.4)"}}>Loading…</div> : (
              <>
                <div className="sv-modal-section">
                  <div className="sv-modal-section-title">Organization Info</div>
                  <div className="sv-modal-info-grid">
                    {[["Org Name",detailModal.submission?.orgname],["Org Type",detailModal.submission?.orgtype],
                      ["District",detailModal.submission?.district],["Taluka",detailModal.submission?.taluka],
                      ["Ward",detailModal.submission?.ward],["Contact",detailModal.submission?.concernname],
                      ["Mobile",detailModal.submission?.concernmobile],
                      ["Submitted",detailModal.submission?.submittedat?new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"—"],
                    ].map(([label,val])=>(
                      <div key={label} className="sv-modal-info-item">
                        <div className="sv-modal-info-label">{label}</div>
                        <div className="sv-modal-info-val">{val||"—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sv-modal-section">
                  <div className="sv-modal-section-title">Survey Answers ({Object.keys(detailModal.answers||{}).length} questions)</div>
                  <div className="sv-answers-grid">
                    {Object.entries(detailModal.answers||{}).map(([qid,ans])=>(
                      <div key={qid} className="sv-answer-row">
                        <span className="sv-answer-q"><span className="sv-answer-qid">Q{qid}.</span> Question {qid}</span>
                        <span className={ans==="yes"?"sv-ans-yes":"sv-ans-no"}>{ans==="yes"?"✓ Yes":"✗ No"}</span>
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
        <div className="sv-overlay" onClick={()=>setAssignModal(null)}>
          <div className="sv-modal sv-modal-sm" onClick={(e)=>e.stopPropagation()}>
            <div className="sv-modal-head">
              <div><div className="sv-modal-title">Assign Inspection Officer</div><div className="sv-modal-sub">{assignModal.survey.district} District Officers</div></div>
              <button className="sv-modal-close" onClick={()=>setAssignModal(null)}>×</button>
            </div>
            <div className="sv-survey-info-box">
              <div className="sv-survey-info-box-title">Survey Organization</div>
              <div className="sv-survey-info-box-val">{assignModal.survey.orgname||"—"}</div>
              <div className="sv-survey-info-box-sub">{assignModal.survey.district} · {assignModal.survey.taluka||"—"}</div>
            </div>
            <div className="sv-modal-section-title">Select Officer</div>
            {officersLoading ? <div style={{padding:"30px 0",textAlign:"center",color:"rgba(44,61,131,0.4)"}}>Loading officers…</div>
            : officers.length===0 ? <div style={{padding:"20px 0",textAlign:"center",color:"rgba(44,61,131,0.4)",fontSize:13}}>No officers found for {assignModal.survey.district} district</div>
            : (
              <div className="sv-officer-list">
                {officers.map((o)=>(
                  <div key={o.id} className={`sv-officer-item ${selectedOfficer===o.id?"selected":""}`} onClick={()=>setSelectedOfficer(o.id)}>
                    <div className="sv-officer-avatar">{(o.fullname||"?").charAt(0).toUpperCase()}</div>
                    <div><div className="sv-officer-name">{o.fullname}</div><div className="sv-officer-sub">@{o.username} · {o.mobile}</div></div>
                    <div className="sv-officer-check">{selectedOfficer===o.id&&<span style={{color:"#fff",fontSize:12}}>✓</span>}</div>
                  </div>
                ))}
              </div>
            )}
            <button className="sv-assign-submit" onClick={handleAssign} disabled={assigning||!selectedOfficer}>
              {assigning?"Assigning...":<><FiUserPlus size={15}/> Assign Officer</>}
            </button>
          </div>
        </div>
      )}

      {/* ══ REVIEW MODAL — Inspection Officer ══ */}
      {reviewModal && (
        <div className="sv-overlay" onClick={()=>setReviewModal(null)}>
          <div className="sv-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="sv-modal-head">
              <div>
                <div className="sv-modal-title">Survey Review</div>
                <div className="sv-modal-sub">Inspection Officer Report</div>
              </div>
              <button className="sv-modal-close" onClick={()=>setReviewModal(null)}>×</button>
            </div>

            {/* Org info */}
            <div className="rv-org-box">
              <div className="rv-org-name">{reviewModal.orgname||"—"}</div>
              <div className="rv-org-sub">{reviewModal.district} · {reviewModal.taluka||"—"} · {reviewModal.orgtype||"—"}</div>
            </div>

            {/* Round badge */}
            {reviewRoundLoading
              ? <div className="rv-round-badge r1">Loading review info…</div>
              : reviewRound === 1
                ? <div className="rv-round-badge r1">📋 1st Review — सगळ्या questions review करा</div>
                : <div className="rv-round-badge r2">⚠️ 2nd Review (15 days) — {noQuestionIds.length} Non-compliant questions only</div>
            }

            {/* Case Type */}
            <label className="rv-label">Case Type</label>
            <select className="rv-select" value={casetype} onChange={(e)=>setCasetype(e.target.value)}>
              {CASE_OPTIONS.map((c)=><option key={c.value} value={c.value}>{c.label}</option>)}
            </select>

            {/* Officer Details */}
            <div className="rv-divider">Officer Details</div>
            <div className="rv-two-col">
              <div>
                <label className="rv-label">Officer Name</label>
                <input className="rv-input" placeholder="Full Name" value={officername} onChange={(e)=>setOfficername(e.target.value)}/>
              </div>
              <div>
                <label className="rv-label">Designation</label>
                <input className="rv-input" placeholder="Inspection Officer" value={officerdesignation} onChange={(e)=>setOfficerdesignation(e.target.value)}/>
              </div>
            </div>

            {/* Questions */}
            <div className="rv-divider">
              Question Review
              <span style={{marginLeft:"auto",fontWeight:700,color:PINK,fontSize:12}}>
                {answeredCount}/{questionsToReview.length} answered
              </span>
            </div>

            {reviewRoundLoading
              ? <div style={{textAlign:"center",padding:"20px",color:"rgba(44,61,131,0.4)"}}>Loading questions…</div>
              : (
              <div className="rv-q-list">
                {questionsToReview.map((q)=>{
                  const rev = questionReviews[q.no];
                  const ans = rev?.answer;
                  return (
                    <div key={q.no} className={`rv-q-card${ans==="yes"?" answered-yes":ans==="no"?" answered-no":""}`}>
                      <p className="rv-q-text">
                        <span className="rv-q-no">{q.no}.</span> {q.en}
                      </p>
                      <div className="rv-q-options">
                        <button className={`rv-opt${ans==="yes"?" yes-active":""}`} onClick={()=>setQAnswer(q.no,"yes")}>✓ Yes</button>
                        <button className={`rv-opt${ans==="no"?" no-active":""}`}  onClick={()=>setQAnswer(q.no,"no")}>✗ No</button>
                      </div>
                      {ans==="no" && (
                        <div className="rv-comment-box">
                          <div className="rv-comment-label"><FiAlertCircle size={12}/> Comment required for No answer</div>
                          <textarea
                            className="rv-comment-textarea"
                            placeholder="Non-compliance चे कारण लिहा..."
                            value={rev?.comment||""}
                            onChange={(e)=>setQComment(q.no,e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Warning if any No */}
            {hasAnyNo && (
              <div className="rv-warn-box">
                <FiAlertCircle size={15}/>
                {reviewRound===1
                  ? "No असलेल्या questions ला 15 days notice दिला जाईल"
                  : "2nd round मध्ये No आले तर survey Permanently Rejected होईल"
                }
              </div>
            )}

            {/* Overall Remark */}
            <label className="rv-label" style={{marginTop:4}}>Overall Remark / Observation</label>
            <textarea
              className="rv-textarea"
              placeholder="Write overall observation / remarks here..."
              value={finalremark}
              onChange={(e)=>setFinalremark(e.target.value)}
            />

            {/* Location */}
            {location.loading
              ? <div className="rv-location-box loading"><FiNavigation size={14}/> Fetching location...</div>
              : location.error
                ? <div className="rv-location-box error"><FiNavigation size={14}/> {location.error}</div>
                : <div className="rv-location-box success"><FiNavigation size={14}/> Location मिळाली — {location.lat?.toFixed(4)}, {location.lng?.toFixed(4)}</div>
            }

            <div className="rv-btnrow">
              <button className="rv-cancel" onClick={()=>setReviewModal(null)}>Cancel</button>
              <button
                className={`rv-submit${hasAnyNo&&reviewRound===2?" reject":""}`}
                onClick={handleReviewSubmit}
                disabled={submittingReview||location.loading||reviewRoundLoading}
              >
                {submittingReview?"Submitting..."
                  : hasAnyNo && reviewRound===2
                    ? <><FiAlertCircle size={15}/> Submit (Will Reject)</>
                    : hasAnyNo
                      ? <><FiMessageSquare size={15}/> Submit (15-day Notice)</>
                      : <><FiCheckCircle size={15}/> Submit (All Complied)</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}