import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FiShield, FiMapPin, FiFilter, FiChevronDown,
  FiCheckCircle, FiEye, FiClipboard, FiSearch,
  FiXCircle, FiAlertCircle,
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

// statusFilter: 'compiled' | 'notcompiled' | 'rejected'
export default function SurveyStatusPage({ statusFilter }) {
  const [surveys, setSurveys]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [filterOrgType,  setFilterOrgType]  = useState("all");
  const [search, setSearch]                 = useState("");
  const [detailModal, setDetailModal]       = useState(null);

  const authUser        = getAuthUser();
  const userRole        = authUser?.role     || "";
  const userDistrict    = authUser?.district || "";
  const isDistrictAdmin = userRole === "districtadmin";

  // Page config based on statusFilter
  const pageConfig = {
    compiled: {
      title:    "Complied Surveys",
      subtitle: "All surveys marked as complied",
      color:    "#15803d",
      bg:       "rgba(34,197,94,0.10)",
      icon:     <FiCheckCircle size={22}/>,
      badge:    "✅ Complied",
    },
    notcompiled: {
      title:    "Non-Complied Surveys",
      subtitle: "Surveys with 15-day notice issued",
      color:    "#b45309",
      bg:       "rgba(245,158,11,0.10)",
      icon:     <FiAlertCircle size={22}/>,
      badge:    "⏳ Non-Complied",
    },
    rejected: {
      title:    "Permanently Rejected Surveys",
      subtitle: "Surveys permanently rejected after re-inspection",
      color:    "#b91c1c",
      bg:       "rgba(239,68,68,0.10)",
      icon:     <FiXCircle size={22}/>,
      badge:    "❌ Rejected",
    },
  };

  const config = pageConfig[statusFilter] || pageConfig.compiled;

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/surveys");
      if (res.data.success) {
        // Filter by statusFilter
        const all = res.data.data || [];
        const filtered = all.filter(s => s.finalstatus === statusFilter);
        setSurveys(filtered);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load surveys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSurveys(); }, [statusFilter]);

  const openDetail = async (submissionid) => {
    setDetailModal({ submissionid, loading: true });
    try {
      const res = await axiosInstance.get(`/surveys/${submissionid}`);
      if (res.data.success) setDetailModal({ ...res.data, submissionid, loading: false });
    } catch {
      toast.error("Failed to load survey detail");
      setDetailModal(null);
    }
  };

  const orgTypeOptions = useMemo(() =>
    [...new Set(surveys.map(s => s.orgtype).filter(Boolean))].sort(), [surveys]);

  const filtered = useMemo(() => surveys.filter(s => {
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .sp-page { min-height:100vh; width:100%; background-color:${CREAM}; font-family:'Inter',-apple-system,sans-serif; padding:40px; }
        .sp-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
        .sp-title-row { display:flex; align-items:center; gap:14px; }
        .sp-icon-badge { width:48px; height:48px; border-radius:14px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .sp-title    { color:${BLUE_DEEP}; font-size:24px; font-weight:800; letter-spacing:-0.3px; }
        .sp-subtitle { color:rgba(44,61,131,0.55); font-size:13.5px; margin-top:2px; }
        .sp-refresh-btn { display:flex; align-items:center; gap:8px; padding:13px 22px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; color:#fff; font-family:'Inter',sans-serif; background:linear-gradient(135deg,${PINK} 0%,${PINK_DARK} 100%); box-shadow:0 10px 26px rgba(205,54,107,0.32); transition:all .2s; }
        .sp-refresh-btn:hover { transform:translateY(-2px); }
        .sp-stats { display:flex; gap:14px; margin-bottom:24px; flex-wrap:wrap; }
        .sp-stat-card { flex:1; min-width:180px; background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 8px 24px rgba(44,61,131,0.06); display:flex; align-items:center; gap:14px; }
        .sp-stat-icon { width:42px; height:42px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .sp-stat-num   { font-size:22px; font-weight:800; color:${BLUE_DEEP}; line-height:1.1; }
        .sp-stat-label { font-size:11.5px; color:rgba(44,61,131,0.5); font-weight:600; margin-top:2px; }
        .sp-table-card { background:#fff; border-radius:20px; border-top:4px solid; box-shadow:0 18px 50px rgba(44,61,131,0.08); overflow:hidden; }
        .sp-table-head { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:1px solid rgba(44,61,131,0.08); flex-wrap:wrap; gap:12px; }
        .sp-table-head-left { display:flex; align-items:center; gap:10px; }
        .sp-table-head-title { font-size:14px; font-weight:800; color:${BLUE_DEEP}; }
        .sp-table-count { font-size:11.5px; font-weight:700; padding:4px 12px; border-radius:999px; }
        .sp-filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .sp-search-wrap { display:flex; align-items:center; gap:8px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; }
        .sp-search-wrap svg { color:rgba(44,61,131,0.4); }
        .sp-search-input { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:500; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; width:160px; }
        .sp-search-input::placeholder { color:rgba(44,61,131,0.35); }
        .sp-filter-select-wrap { display:flex; align-items:center; gap:7px; padding:8px 14px; background:#fff; border:1.5px solid rgba(44,61,131,0.12); border-radius:999px; cursor:pointer; }
        .sp-filter-select { border:none; outline:none; background:transparent; font-size:12.5px; font-weight:600; color:${BLUE_DEEP}; font-family:'Inter',sans-serif; cursor:pointer; appearance:none; -webkit-appearance:none; padding-right:4px; }
        .sp-table-wrap { overflow-x:auto; }
        table.sp-table { width:100%; border-collapse:collapse; }
        .sp-table thead th { text-align:left; padding:13px 24px; font-size:10.5px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase; color:rgba(44,61,131,0.45); background:rgba(44,61,131,0.025); white-space:nowrap; }
        .sp-table tbody td { padding:15px 24px; font-size:13.5px; color:${BLUE_DEEP}; border-top:1px solid rgba(44,61,131,0.06); white-space:nowrap; }
        .sp-table tbody tr:hover { background:rgba(205,54,107,0.02); }
        .sp-org-cell { display:flex; align-items:center; gap:10px; }
        .sp-avatar { width:34px; height:34px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,${BLUE},${BLUE_DEEP}); color:#fff; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; }
        .sp-orgname { font-weight:700; }
        .sp-orgtype { font-size:11.5px; color:rgba(44,61,131,0.45); margin-top:1px; }
        .sp-district-pill { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700; color:${BLUE}; background:rgba(44,61,131,0.06); padding:5px 12px; border-radius:999px; }
        .sp-date { color:rgba(44,61,131,0.55); font-size:12.5px; }
        .sp-status-badge { padding:4px 12px; border-radius:999px; font-size:11.5px; font-weight:700; }
        .sp-view-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; color:${PINK}; background:rgba(205,54,107,0.08); transition:all .15s; font-family:'Inter',sans-serif; }
        .sp-view-btn:hover { background:rgba(205,54,107,0.16); }
        .sp-empty { padding:70px 20px; text-align:center; color:rgba(44,61,131,0.4); font-size:13.5px; }
        .sp-empty-icon { width:56px; height:56px; border-radius:16px; margin:0 auto 14px; background:rgba(44,61,131,0.05); display:flex; align-items:center; justify-content:center; color:rgba(44,61,131,0.3); }
        .sp-loading { padding:60px 20px; text-align:center; color:rgba(44,61,131,0.4); }
        /* Modal */
        .sp-overlay { position:fixed; inset:0; z-index:1000; background:rgba(29,42,96,0.45); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; animation:spFade .2s ease both; }
        @keyframes spFade { from{opacity:0} to{opacity:1} }
        .sp-modal { width:100%; max-width:560px; background:#fff; border-radius:20px; border-top:4px solid ${PINK}; box-shadow:0 30px 70px rgba(29,42,96,0.35); padding:28px 30px; max-height:88vh; overflow-y:auto; animation:spUp .3s cubic-bezier(.22,.9,.36,1) both; }
        @keyframes spUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .sp-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid rgba(44,61,131,0.08); }
        .sp-modal-title { font-size:17px; font-weight:800; color:${BLUE_DEEP}; }
        .sp-modal-sub   { font-size:12px; color:${PINK}; font-weight:600; margin-top:2px; }
        .sp-modal-close { width:30px; height:30px; border-radius:9px; border:none; background:rgba(44,61,131,0.06); color:rgba(44,61,131,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:18px; font-weight:700; line-height:1; }
        .sp-modal-close:hover { background:rgba(44,61,131,0.12); }
        .sp-modal-section { margin-bottom:20px; }
        .sp-modal-section-title { font-size:11px; font-weight:800; letter-spacing:0.7px; text-transform:uppercase; color:rgba(44,61,131,0.45); margin-bottom:12px; }
        .sp-modal-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .sp-modal-info-item { background:rgba(44,61,131,0.03); border-radius:10px; padding:10px 14px; }
        .sp-modal-info-label { font-size:10.5px; color:rgba(44,61,131,0.45); font-weight:700; margin-bottom:3px; }
        .sp-modal-info-val   { font-size:13.5px; font-weight:700; color:${BLUE_DEEP}; }
        .sp-answers-grid { display:flex; flex-direction:column; gap:8px; }
        .sp-answer-row { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(44,61,131,0.025); border-radius:10px; }
        .sp-answer-q   { font-size:12.5px; color:${BLUE_DEEP}; font-weight:500; }
        .sp-answer-qid { font-size:11px; color:rgba(44,61,131,0.4); margin-right:8px; }
        .sp-ans-yes { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#15803d; background:rgba(34,197,94,0.12); }
        .sp-ans-no  { padding:3px 12px; border-radius:999px; font-size:11.5px; font-weight:700; color:#b91c1c; background:rgba(239,68,68,0.12); }
        @media (max-width:700px) { .sp-page{padding:20px;} .sp-stats{flex-direction:column;} .sp-modal-info-grid{grid-template-columns:1fr;} }
      `}</style>

      <div className="sp-page">
        {/* Header */}
        <div className="sp-header">
          <div className="sp-title-row">
            <div className="sp-icon-badge" style={{background: config.bg, color: config.color}}>
              {config.icon}
            </div>
            <div>
              <div className="sp-title">{config.title}</div>
              <div className="sp-subtitle">{config.subtitle}</div>
            </div>
          </div>
          <button className="sp-refresh-btn" onClick={fetchSurveys}>
            <FiShield size={16}/> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="sp-stats">
          <div className="sp-stat-card">
            <div className="sp-stat-icon" style={{background: config.bg, color: config.color}}>
              <FiClipboard size={18}/>
            </div>
            <div>
              <div className="sp-stat-num">{filtered.length}</div>
              <div className="sp-stat-label">{config.title}</div>
            </div>
          </div>
          <div className="sp-stat-card">
            <div className="sp-stat-icon" style={{background:"rgba(44,61,131,0.06)", color:BLUE}}>
              <FiMapPin size={18}/>
            </div>
            <div>
              <div className="sp-stat-num">{new Set(filtered.map(s=>s.district)).size}</div>
              <div className="sp-stat-label">Districts</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="sp-table-card" style={{borderTopColor: config.color}}>
          <div className="sp-table-head">
            <div className="sp-table-head-left">
              <span className="sp-table-head-title">{config.title}</span>
              <span className="sp-table-count" style={{color: config.color, background: config.bg}}>
                {filtered.length} record{filtered.length!==1?"s":""}
              </span>
            </div>
            <div className="sp-filters">
              <div className="sp-search-wrap">
                <FiSearch size={13}/>
                <input className="sp-search-input" placeholder="Search org, contact..." value={search} onChange={e=>setSearch(e.target.value)}/>
              </div>
              {!isDistrictAdmin && (
                <div className="sp-filter-select-wrap">
                  <FiMapPin size={13}/>
                  <select className="sp-filter-select" value={filterDistrict} onChange={e=>setFilterDistrict(e.target.value)}>
                    <option value="all">All Districts</option>
                    {MH_DISTRICTS.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                  <FiChevronDown size={13}/>
                </div>
              )}
              <div className="sp-filter-select-wrap">
                <FiFilter size={13}/>
                <select className="sp-filter-select" value={filterOrgType} onChange={e=>setFilterOrgType(e.target.value)}>
                  <option value="all">All Types</option>
                  {orgTypeOptions.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                <FiChevronDown size={13}/>
              </div>
            </div>
          </div>

          {loading ? <div className="sp-loading">Loading…</div>
          : filtered.length===0 ? (
            <div className="sp-empty">
              <div className="sp-empty-icon">{config.icon}</div>
              No {config.title.toLowerCase()} found.
            </div>
          ) : (
            <div className="sp-table-wrap">
              <table className="sp-table">
                <thead><tr>
                  <th>Organization</th>
                  <th>Contact Person</th>
                  <th>Mobile</th>
                  <th>District</th>
                  <th>Taluka</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr></thead>
                <tbody>
                  {filtered.map(s=>(
                    <tr key={s.submissionid}>
                      <td>
                        <div className="sp-org-cell">
                          <div className="sp-avatar">{(s.orgname||"?").charAt(0).toUpperCase()}</div>
                          <div>
                            <div className="sp-orgname">{s.orgname||"—"}</div>
                            <div className="sp-orgtype">{s.orgtype||"—"}</div>
                          </div>
                        </div>
                      </td>
                      <td>{s.concernname||"—"}</td>
                      <td>{s.concernmobile||"—"}</td>
                      <td><span className="sp-district-pill"><FiMapPin size={11}/> {s.district||"—"}</span></td>
                      <td>{s.taluka||"—"}</td>
                      <td className="sp-date">
                        {s.submittedat?new Date(s.submittedat).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"—"}
                      </td>
                      <td>
                        <span className="sp-status-badge" style={{color: config.color, background: config.bg}}>
                          {config.badge}
                        </span>
                      </td>
                      <td>
                        <button className="sp-view-btn" onClick={()=>openDetail(s.submissionid)}>
                          <FiEye size={13}/> View
                        </button>
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
        <div className="sp-overlay" onClick={()=>setDetailModal(null)}>
          <div className="sp-modal" onClick={e=>e.stopPropagation()}>
            <div className="sp-modal-head">
              <div>
                <div className="sp-modal-title">Survey Detail</div>
                <div className="sp-modal-sub">Submission #{detailModal.submissionid}</div>
              </div>
              <button className="sp-modal-close" onClick={()=>setDetailModal(null)}>×</button>
            </div>
            {detailModal.loading
              ? <div style={{padding:"40px 0",textAlign:"center",color:"rgba(44,61,131,0.4)"}}>Loading…</div>
              : (<>
                <div className="sp-modal-section">
                  <div className="sp-modal-section-title">Organization Info</div>
                  <div className="sp-modal-info-grid">
                    {[
                      ["Org Name",  detailModal.submission?.orgname],
                      ["Org Type",  detailModal.submission?.orgtype],
                      ["District",  detailModal.submission?.district],
                      ["Taluka",    detailModal.submission?.taluka],
                      ["Ward",      detailModal.submission?.ward],
                      ["Contact",   detailModal.submission?.concernname],
                      ["Mobile",    detailModal.submission?.concernmobile],
                      ["Submitted", detailModal.submission?.submittedat
                        ? new Date(detailModal.submission.submittedat).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})
                        : "—"],
                    ].map(([label,val])=>(
                      <div key={label} className="sp-modal-info-item">
                        <div className="sp-modal-info-label">{label}</div>
                        <div className="sp-modal-info-val">{val||"—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sp-modal-section">
                  <div className="sp-modal-section-title">
                    Survey Answers ({Object.keys(detailModal.answers||{}).length} questions)
                  </div>
                  <div className="sp-answers-grid">
                    {Object.entries(detailModal.answers||{}).map(([qid,ans])=>(
                      <div key={qid} className="sp-answer-row">
                        <span className="sp-answer-q">
                          <span className="sp-answer-qid">Q{qid}.</span> Question {qid}
                        </span>
                        <span className={ans==="yes"?"sp-ans-yes":"sp-ans-no"}>
                          {ans==="yes"?"✓ Yes":"✗ No"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>)}
          </div>
        </div>
      )}
    </>
  );
}