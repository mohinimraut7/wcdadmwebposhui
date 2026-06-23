// // import React, { useState, useEffect, useMemo } from "react";
// // import { toast } from "react-toastify";
// // import {
// //   FiShield, FiUser, FiLock, FiPhone, FiMapPin,
// //   FiPlus, FiX, FiUsers, FiEye, FiEyeOff,
// //   FiCheckCircle, FiBriefcase, FiFilter, FiChevronDown, FiHome,
// // } from "react-icons/fi";
// // import wcdLogo from "../assets/wcdlogo.jpg";
// // import axios from "axios";

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

// // const EMPTY_FORM = {
// //   fullname: "", username: "", mobile: "", password: "",
// //   state: "Maharashtra", district: "", taluka: "", ward: "",
// // };

// // export default function WcdInspectionOfficer() {
// //   const [officers, setOfficers]     = useState([]);
// //   const [loading, setLoading]       = useState(true);
// //   const [modalOpen, setModalOpen]   = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [showPass, setShowPass]     = useState(false);
// //   const [form, setForm]             = useState(EMPTY_FORM);

// //   const [filterDistrict, setFilterDistrict] = useState("all");
// //   const [filterStatus,   setFilterStatus]   = useState("all");

// //   const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

// //   const fetchOfficers = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("token") || "";
// //       const res = await axios.get("http://127.0.0.1:8000/api/inspection-officer/get", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (res.data.success) setOfficers(res.data.data || []);
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Failed to load inspection officers");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchOfficers(); }, []);

// //   const openModal  = () => { setForm(EMPTY_FORM); setModalOpen(true); };
// //   const closeModal = () => { if (!submitting) setModalOpen(false); };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!form.fullname.trim())          { toast.error("Full name enter करा"); return; }
// //     if (!form.username.trim())          { toast.error("Username enter करा"); return; }
// //     if (!/^\d{10}$/.test(form.mobile)) { toast.error("वैध 10 अंकी मोबाईल नंबर टाका"); return; }
// //     if (!form.password)                 { toast.error("Password enter करा"); return; }
// //     if (!form.state.trim())            { toast.error("State enter करा"); return; }
// //     if (!form.district.trim())         { toast.error("District निवडा"); return; }

// //     try {
// //       setSubmitting(true);
// //       const token = localStorage.getItem("token") || "";
// //       const res = await axios.post("http://127.0.0.1:8000/api/inspection-officer/add", {
// //         fullname: form.fullname.trim(),
// //         username: form.username.trim().toLowerCase(),
// //         mobile:   form.mobile.trim(),
// //         password: form.password,
// //         state:    form.state.trim(),
// //         district: form.district.trim(),
// //         taluka:   form.taluka.trim(),
// //         ward:     form.ward.trim(),
// //       }, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       const data = res.data;
// //       if (!data.success) { toast.error(data.message || "Failed to add officer"); return; }
// //       toast.success("Inspection officer added successfully!");
// //       setModalOpen(false);
// //       fetchOfficers();
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Server error");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const districtOptions = useMemo(() => {
// //     const unique = [...new Set(officers.map((o) => o.district).filter(Boolean))].sort();
// //     return unique;
// //   }, [officers]);

// //   const filteredOfficers = useMemo(() => {
// //     return officers.filter((o) => {
// //       const districtMatch = filterDistrict === "all" || o.district === filterDistrict;
// //       const statusMatch =
// //         filterStatus === "all" ||
// //         (filterStatus === "active"   && !!o.mobile) ||
// //         (filterStatus === "inactive" && !o.mobile);
// //       return districtMatch && statusMatch;
// //     });
// //   }, [officers, filterDistrict, filterStatus]);

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; }

// //         .wio-page {
// //           min-height: 100vh; width: 100%;
// //           background-color: ${CREAM};
// //           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// //           padding: 40px;
// //         }
// //         .wio-header {
// //           display: flex; align-items: center; justify-content: space-between;
// //           margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
// //         }
// //         .wio-title-row { display: flex; align-items: center; gap: 14px; }
// //         .wio-icon-badge {
// //           width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
// //           background: rgba(205,54,107,0.10);
// //           display: flex; align-items: center; justify-content: center; color: ${PINK};
// //         }
// //         .wio-title { color: ${BLUE_DEEP}; font-size: 24px; font-weight: 800; letter-spacing: -0.3px; }
// //         .wio-subtitle { color: rgba(44,61,131,0.55); font-size: 13.5px; margin-top: 2px; }

// //         .wio-add-btn {
// //           display: flex; align-items: center; gap: 8px;
// //           padding: 13px 22px; border: none; border-radius: 12px;
// //           font-size: 14px; font-weight: 700; cursor: pointer;
// //           color: #fff; font-family: 'Inter', sans-serif;
// //           background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
// //           box-shadow: 0 10px 26px rgba(205,54,107,0.32);
// //           transition: all .2s;
// //         }
// //         .wio-add-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }

// //         .wio-stats { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
// //         .wio-stat-card {
// //           flex: 1; min-width: 180px;
// //           background: #fff; border-radius: 16px; padding: 18px 20px;
// //           box-shadow: 0 8px 24px rgba(44,61,131,0.06);
// //           display: flex; align-items: center; gap: 14px;
// //         }
// //         .wio-stat-icon {
// //           width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
// //           background: rgba(44,61,131,0.06);
// //           display: flex; align-items: center; justify-content: center; color: ${BLUE};
// //         }
// //         .wio-stat-num { font-size: 22px; font-weight: 800; color: ${BLUE_DEEP}; line-height: 1.1; }
// //         .wio-stat-label { font-size: 11.5px; color: rgba(44,61,131,0.5); font-weight: 600; margin-top: 2px; }

// //         .wio-table-card {
// //           background: #fff; border-radius: 20px;
// //           border-top: 4px solid ${PINK};
// //           box-shadow: 0 18px 50px rgba(44,61,131,0.08);
// //           overflow: hidden;
// //         }
// //         .wio-table-head {
// //           display: flex; align-items: center; justify-content: space-between;
// //           padding: 18px 24px; border-bottom: 1px solid rgba(44,61,131,0.08);
// //           flex-wrap: wrap; gap: 12px;
// //         }
// //         .wio-table-head-left { display: flex; align-items: center; gap: 10px; }
// //         .wio-table-head-title { font-size: 14px; font-weight: 800; color: ${BLUE_DEEP}; }
// //         .wio-table-count {
// //           font-size: 11.5px; font-weight: 700; color: ${PINK};
// //           background: rgba(205,54,107,0.08); padding: 4px 12px; border-radius: 999px;
// //         }

// //         .wio-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
// //         .wio-filter-select-wrap {
// //           display: flex; align-items: center; gap: 7px;
// //           padding: 8px 14px; background: #fff;
// //           border: 1.5px solid rgba(44,61,131,0.12); border-radius: 999px;
// //           cursor: pointer; transition: all .2s; position: relative;
// //         }
// //         .wio-filter-select-wrap:hover { border-color: rgba(44,61,131,0.28); background: rgba(44,61,131,0.02); }
// //         .wio-filter-select-wrap svg { color: rgba(44,61,131,0.45); flex-shrink: 0; }
// //         .wio-filter-select {
// //           border: none; outline: none; background: transparent;
// //           font-size: 12.5px; font-weight: 600; color: ${BLUE_DEEP};
// //           font-family: 'Inter', sans-serif; cursor: pointer;
// //           appearance: none; -webkit-appearance: none; padding-right: 4px;
// //         }

// //         .wio-table-wrap { overflow-x: auto; }
// //         table.wio-table { width: 100%; border-collapse: collapse; }
// //         .wio-table thead th {
// //           text-align: left; padding: 13px 20px;
// //           font-size: 10.5px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
// //           color: rgba(44,61,131,0.45); background: rgba(44,61,131,0.025); white-space: nowrap;
// //         }
// //         .wio-table tbody td {
// //           padding: 14px 20px; font-size: 13.5px; color: ${BLUE_DEEP};
// //           border-top: 1px solid rgba(44,61,131,0.06); white-space: nowrap;
// //         }
// //         .wio-table tbody tr:hover { background: rgba(205,54,107,0.02); }

// //         .wio-avatar-cell { display: flex; align-items: center; gap: 10px; }
// //         .wio-avatar {
// //           width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
// //           background: linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP});
// //           color: #fff; font-size: 13px; font-weight: 800;
// //           display: flex; align-items: center; justify-content: center;
// //         }
// //         .wio-fullname { font-weight: 700; }
// //         .wio-username { font-size: 11.5px; color: rgba(44,61,131,0.45); margin-top: 1px; }

// //         .wio-district-pill {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           font-size: 12px; font-weight: 700; color: ${BLUE};
// //           background: rgba(44,61,131,0.06); padding: 5px 12px; border-radius: 999px;
// //         }
// //         .wio-taluka-pill {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           font-size: 12px; font-weight: 700; color: #6b21a8;
// //           background: rgba(107,33,168,0.07); padding: 5px 12px; border-radius: 999px;
// //         }
// //         .wio-status-pill {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           font-size: 11.5px; font-weight: 700; padding: 4px 11px; border-radius: 999px;
// //         }
// //         .wio-status-pill.active   { color: #15803d; background: rgba(34,197,94,0.10); }
// //         .wio-status-pill.inactive { color: #b91c1c; background: rgba(239,68,68,0.10); }

// //         .wio-empty {
// //           padding: 70px 20px; text-align: center;
// //           color: rgba(44,61,131,0.4); font-size: 13.5px;
// //         }
// //         .wio-empty-icon {
// //           width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 14px;
// //           background: rgba(44,61,131,0.05);
// //           display: flex; align-items: center; justify-content: center; color: rgba(44,61,131,0.3);
// //         }
// //         .wio-loading { padding: 60px 20px; text-align: center; color: rgba(44,61,131,0.4); font-size: 13.5px; }

// //         /* Modal */
// //         .wio-overlay {
// //           position: fixed; inset: 0; z-index: 1000;
// //           background: rgba(29,42,96,0.45); backdrop-filter: blur(3px);
// //           display: flex; align-items: center; justify-content: center;
// //           padding: 20px; animation: wioFadeIn .2s ease both;
// //         }
// //         @keyframes wioFadeIn { from{opacity:0} to{opacity:1} }
// //         .wio-modal-card {
// //           width: 100%; max-width: 480px; background: #fff; border-radius: 20px;
// //           border-top: 4px solid ${PINK};
// //           box-shadow: 0 30px 70px rgba(29,42,96,0.35);
// //           padding: 30px 32px 28px; max-height: 90vh; overflow-y: auto;
// //           animation: wioSlideUp .3s cubic-bezier(.22,.9,.36,1) both;
// //         }
// //         @keyframes wioSlideUp { from{opacity:0;transform:translateY(20px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }

// //         .wio-modal-head {
// //           display: flex; align-items: flex-start; justify-content: space-between;
// //           padding-bottom: 18px; margin-bottom: 20px;
// //           border-bottom: 1px solid rgba(44,61,131,0.08);
// //         }
// //         .wio-modal-brand { display: flex; align-items: center; gap: 12px; }
// //         .wio-modal-icon {
// //           width: 44px; height: 44px; border-radius: 13px; flex-shrink: 0;
// //           background: rgba(205,54,107,0.10); overflow: hidden;
// //           display: flex; align-items: center; justify-content: center; color: ${PINK};
// //         }
// //         .wio-modal-title { color: ${BLUE_DEEP}; font-size: 17px; font-weight: 800; line-height: 1.2; }
// //         .wio-modal-sub { color: ${PINK}; font-size: 12px; font-weight: 600; margin-top: 2px; }
// //         .wio-modal-close {
// //           width: 30px; height: 30px; border-radius: 9px; border: none;
// //           background: rgba(44,61,131,0.06); color: rgba(44,61,131,0.5);
// //           display: flex; align-items: center; justify-content: center;
// //           cursor: pointer; transition: all .15s; flex-shrink: 0;
// //         }
// //         .wio-modal-close:hover { background: rgba(44,61,131,0.12); color: ${BLUE_DEEP}; }

// //         .wio-fld { margin-bottom: 16px; }
// //         .wio-flbl {
// //           display: block; font-size: 11px; font-weight: 700;
// //           color: rgba(44,61,131,0.55); margin-bottom: 8px;
// //           letter-spacing: 0.7px; text-transform: uppercase;
// //         }
// //         .wio-fwrap { display: flex; align-items: stretch; position: relative; }
// //         .wio-ficon {
// //           width: 42px; flex-shrink: 0;
// //           background: rgba(44,61,131,0.05);
// //           border: 1px solid rgba(44,61,131,0.12); border-right: none;
// //           border-radius: 12px 0 0 12px;
// //           display: flex; align-items: center; justify-content: center;
// //           color: rgba(44,61,131,0.40); transition: all .2s;
// //         }
// //         .wio-finput {
// //           width: 100%; padding: 12px 14px;
// //           border: 1px solid rgba(44,61,131,0.12); border-left: none;
// //           border-radius: 0 12px 12px 0;
// //           font-size: 14px; color: ${BLUE_DEEP}; background: #fff;
// //           outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif;
// //         }
// //         .wio-finput:focus { border-color: ${PINK}; box-shadow: 0 0 0 3px rgba(205,54,107,0.12); }
// //         .wio-finput::placeholder { color: rgba(44,61,131,0.30); }
// //         .wio-fwrap:focus-within .wio-ficon { border-color: ${PINK}; color: ${PINK}; }
// //         .wio-eye {
// //           position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
// //           background: none; border: none; cursor: pointer;
// //           color: rgba(44,61,131,0.4); display: flex; align-items: center;
// //         }
// //         .wio-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
// //         .wio-modal-btnrow { display: flex; gap: 10px; margin-top: 22px; }
// //         .wio-modal-ghost {
// //           flex: 0 0 auto; padding: 13px 20px; border-radius: 12px;
// //           border: 1.5px solid rgba(44,61,131,0.15);
// //           background: #fff; color: ${BLUE_DEEP};
// //           font-size: 13.5px; font-weight: 700; cursor: pointer;
// //           transition: all .2s; font-family: 'Inter', sans-serif;
// //         }
// //         .wio-modal-ghost:hover { background: rgba(44,61,131,0.04); }
// //         .wio-modal-submit {
// //           flex: 1; padding: 13px; border: none; border-radius: 12px;
// //           font-size: 14px; font-weight: 700; cursor: pointer;
// //           display: flex; align-items: center; justify-content: center; gap: 8px;
// //           color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
// //           background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
// //           box-shadow: 0 10px 26px rgba(205,54,107,0.32);
// //         }
// //         .wio-modal-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
// //         .wio-modal-submit:disabled { opacity: 0.5; cursor: not-allowed; }

// //         .wio-section-divider {
// //           font-size: 10.5px; font-weight: 800; letter-spacing: 0.8px;
// //           text-transform: uppercase; color: rgba(44,61,131,0.35);
// //           margin: 8px 0 14px; display: flex; align-items: center; gap: 10px;
// //         }
// //         .wio-section-divider::after {
// //           content: ''; flex: 1; height: 1px; background: rgba(44,61,131,0.08);
// //         }

// //         @media (max-width: 700px) {
// //           .wio-page { padding: 20px; }
// //           .wio-two-col { grid-template-columns: 1fr; }
// //           .wio-stats { flex-direction: column; }
// //           .wio-table-head { flex-direction: column; align-items: flex-start; }
// //         }
// //       `}</style>

// //       <div className="wio-page">

// //         {/* Header */}
// //         <div className="wio-header">
// //           <div className="wio-title-row">
// //             <div className="wio-icon-badge"><FiUsers size={22} /></div>
// //             <div>
// //               <div className="wio-title">Inspection Officers</div>
// //               <div className="wio-subtitle">Manage field-level inspection officers across Maharashtra</div>
// //             </div>
// //           </div>
// //           <button className="wio-add-btn" onClick={openModal}>
// //             <FiPlus size={17} /> Add Officer
// //           </button>
// //         </div>

// //         {/* Stats */}
// //         <div className="wio-stats">
// //           <div className="wio-stat-card">
// //             <div className="wio-stat-icon"><FiUsers size={18} /></div>
// //             <div>
// //               <div className="wio-stat-num">{officers.length}</div>
// //               <div className="wio-stat-label">Total Officers</div>
// //             </div>
// //           </div>
// //           <div className="wio-stat-card">
// //             <div className="wio-stat-icon"><FiMapPin size={18} /></div>
// //             <div>
// //               <div className="wio-stat-num">{new Set(officers.map((o) => o.district)).size}</div>
// //               <div className="wio-stat-label">Districts Covered</div>
// //             </div>
// //           </div>
// //           <div className="wio-stat-card">
// //             <div className="wio-stat-icon"><FiHome size={18} /></div>
// //             <div>
// //               <div className="wio-stat-num">{new Set(officers.map((o) => o.taluka).filter(Boolean)).size}</div>
// //               <div className="wio-stat-label">Talukas Covered</div>
// //             </div>
// //           </div>
// //           <div className="wio-stat-card">
// //             <div className="wio-stat-icon"><FiCheckCircle size={18} /></div>
// //             <div>
// //               <div className="wio-stat-num">{officers.filter((o) => !!o.mobile).length}</div>
// //               <div className="wio-stat-label">Active Officers</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="wio-table-card">
// //           <div className="wio-table-head">
// //             <div className="wio-table-head-left">
// //               <span className="wio-table-head-title">All Inspection Officers</span>
// //               <span className="wio-table-count">{filteredOfficers.length} record{filteredOfficers.length !== 1 ? "s" : ""}</span>
// //             </div>

// //             <div className="wio-filters">
// //               <div className="wio-filter-select-wrap">
// //                 <FiMapPin size={13} />
// //                 <select
// //                   className="wio-filter-select"
// //                   value={filterDistrict}
// //                   onChange={(e) => setFilterDistrict(e.target.value)}
// //                 >
// //                   <option value="all">All Districts</option>
// //                   {districtOptions.map((d) => (
// //                     <option key={d} value={d}>{d}</option>
// //                   ))}
// //                 </select>
// //                 <FiChevronDown size={13} />
// //               </div>

// //               <div className="wio-filter-select-wrap">
// //                 <FiFilter size={13} />
// //                 <select
// //                   className="wio-filter-select"
// //                   value={filterStatus}
// //                   onChange={(e) => setFilterStatus(e.target.value)}
// //                 >
// //                   <option value="all">All Status</option>
// //                   <option value="active">Active</option>
// //                   <option value="inactive">Inactive</option>
// //                 </select>
// //                 <FiChevronDown size={13} />
// //               </div>
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="wio-loading">Loading inspection officers…</div>
// //           ) : filteredOfficers.length === 0 ? (
// //             <div className="wio-empty">
// //               <div className="wio-empty-icon"><FiUsers size={24} /></div>
// //               {officers.length === 0
// //                 ? 'No officers added yet. Click "Add Officer" to create one.'
// //                 : "No records match the selected filters."}
// //             </div>
// //           ) : (
// //             <div className="wio-table-wrap">
// //               <table className="wio-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Name</th>
// //                     <th>Mobile</th>
// //                     <th>District</th>
// //                     <th>Taluka</th>
// //                     <th>Ward</th>
// //                     <th>Status</th>
// //                     <th>Added On</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredOfficers.map((o) => (
// //                     <tr key={o.id}>
// //                       <td>
// //                         <div className="wio-avatar-cell">
// //                           <div className="wio-avatar">{(o.fullname || "?").charAt(0).toUpperCase()}</div>
// //                           <div>
// //                             <div className="wio-fullname">{o.fullname}</div>
// //                             <div className="wio-username">@{o.username}</div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td>{o.mobile}</td>
// //                       <td><span className="wio-district-pill"><FiMapPin size={11} /> {o.district}</span></td>
// //                       <td>
// //                         {o.taluka
// //                           ? <span className="wio-taluka-pill"><FiHome size={11} /> {o.taluka}</span>
// //                           : "—"}
// //                       </td>
// //                       <td>{o.ward || "—"}</td>
// //                       <td>
// //                         <span className={`wio-status-pill ${o.mobile ? "active" : "inactive"}`}>
// //                           {o.mobile ? "Active" : "Inactive"}
// //                         </span>
// //                       </td>
// //                       <td>{o.created_at ? new Date(o.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Modal */}
// //       {modalOpen && (
// //         <div className="wio-overlay" onClick={closeModal}>
// //           <div className="wio-modal-card" onClick={(e) => e.stopPropagation()}>
// //             <div className="wio-modal-head">
// //               <div className="wio-modal-brand">
// //                 <div className="wio-modal-icon">
// //                   <img src={wcdLogo} alt="WCD" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 13 }} />
// //                 </div>
// //                 <div>
// //                   <div className="wio-modal-title">Add Inspection Officer</div>
// //                   <div className="wio-modal-sub">Create new field-level officer access</div>
// //                 </div>
// //               </div>
// //               <button className="wio-modal-close" onClick={closeModal}><FiX size={16} /></button>
// //             </div>

// //             <form onSubmit={handleSubmit}>

// //               {/* Basic Info */}
// //               <div className="wio-section-divider">Basic Info</div>

// //               <div className="wio-fld">
// //                 <label className="wio-flbl">Full Name</label>
// //                 <div className="wio-fwrap">
// //                   <span className="wio-ficon"><FiUser size={15} /></span>
// //                   <input className="wio-finput" placeholder="e.g. Suresh Jadhav" value={form.fullname} onChange={update("fullname")} />
// //                 </div>
// //               </div>

// //               <div className="wio-fld">
// //                 <label className="wio-flbl">Username</label>
// //                 <div className="wio-fwrap">
// //                   <span className="wio-ficon"><FiUser size={15} /></span>
// //                   <input className="wio-finput" placeholder="e.g. officer_pune1" value={form.username} onChange={update("username")} />
// //                 </div>
// //               </div>

// //               <div className="wio-two-col">
// //                 <div className="wio-fld">
// //                   <label className="wio-flbl">Mobile Number</label>
// //                   <div className="wio-fwrap">
// //                     <span className="wio-ficon"><FiPhone size={15} /></span>
// //                     <input
// //                       className="wio-finput" placeholder="10 digit" maxLength={10}
// //                       value={form.mobile}
// //                       onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="wio-fld">
// //                   <label className="wio-flbl">Password</label>
// //                   <div className="wio-fwrap">
// //                     <span className="wio-ficon"><FiLock size={15} /></span>
// //                     <input
// //                       className="wio-finput" type={showPass ? "text" : "password"}
// //                       placeholder="Create password" value={form.password} onChange={update("password")}
// //                       style={{ paddingRight: 40 }}
// //                     />
// //                     <button type="button" className="wio-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
// //                       {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Location */}
// //               <div className="wio-section-divider">Location</div>

// //               <div className="wio-two-col">
// //                 <div className="wio-fld">
// //                   <label className="wio-flbl">State</label>
// //                   <div className="wio-fwrap">
// //                     <span className="wio-ficon"><FiBriefcase size={15} /></span>
// //                     <input className="wio-finput" placeholder="Maharashtra" value={form.state} onChange={update("state")} />
// //                   </div>
// //                 </div>

// //                 <div className="wio-fld">
// //                   <label className="wio-flbl">District</label>
// //                   <div className="wio-fwrap">
// //                     <span className="wio-ficon"><FiMapPin size={15} /></span>
// //                     <select
// //                       className="wio-finput"
// //                       value={form.district}
// //                       onChange={update("district")}
// //                       style={{ cursor: "pointer" }}
// //                     >
// //                       <option value="">Select District</option>
// //                       {MH_DISTRICTS.map((d) => (
// //                         <option key={d} value={d}>{d}</option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="wio-two-col">
// //                 <div className="wio-fld">
// //                   <label className="wio-flbl">Taluka</label>
// //                   <div className="wio-fwrap">
// //                     <span className="wio-ficon"><FiHome size={15} /></span>
// //                     <input className="wio-finput" placeholder="e.g. Haveli" value={form.taluka} onChange={update("taluka")} />
// //                   </div>
// //                 </div>

// //                 <div className="wio-fld">
// //                   <label className="wio-flbl">Ward</label>
// //                   <div className="wio-fwrap">
// //                     <span className="wio-ficon"><FiMapPin size={15} /></span>
// //                     <input className="wio-finput" placeholder="e.g. Ward 5" value={form.ward} onChange={update("ward")} />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="wio-modal-btnrow">
// //                 <button type="button" className="wio-modal-ghost" onClick={closeModal}>Cancel</button>
// //                 <button type="submit" className="wio-modal-submit" disabled={submitting}>
// //                   {submitting ? "Adding..." : <><FiCheckCircle size={16} /> Add Officer</>}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }





// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShield, FiUser, FiLock, FiPhone, FiMapPin,
//   FiPlus, FiX, FiUsers, FiEye, FiEyeOff,
//   FiCheckCircle, FiBriefcase, FiFilter, FiChevronDown, FiHome,
// } from "react-icons/fi";
// import wcdLogo from "../assets/wcdlogo.jpg";
// import axios from "axios";

// const PINK      = "#CD366B";
// const PINK_DARK = "#b82a5c";
// const BLUE      = "#2C3D83";
// const BLUE_DEEP = "#1d2a60";
// const CREAM     = "#FBF3EE";

// // ─── Maharashtra District → Talukas Map ───────────────────────────────────
// const DISTRICT_TALUKA_MAP = {
//   "Ahmednagar": ["Nagar", "Shevgaon", "Pathardi", "Parner", "Sangamner", "Kopargaon", "Akole", "Shrirampur", "Nevasa", "Rahata", "Rahuri", "Shrigonda", "Karjat", "Jamkhed"],
//   "Akola": ["Akola", "Akot", "Telhara", "Balapur", "Patur", "Murtajapur", "Barshitakli"],
//   "Amravati": ["Amravati", "Bhatkuli", "Nandgaon Khandeshwar", "Dharni", "Chikhaldara", "Achalpur", "Chandurbazar", "Morshi", "Warud", "Daryapur", "Anjangaon-Surji", "Chandur", "Dhamangaon", "Tiosa"],
//   "Aurangabad": ["Aurangabad", "Kannad", "Soegaon", "Sillod", "Phulambri", "Khuldabad", "Vaijapur", "Gangapur", "Paithan"],
//   "Beed": ["Beed", "Georai", "Patoda", "Shirur-Kasar", "Ashti", "Majalgaon", "Wadwani", "Kaij", "Dharur", "Parli", "Ambajogai"],
//   "Bhandara": ["Bhandara", "Tumsar", "Pauni", "Mohadi", "Sakoli", "Lakhani", "Lakhandur"],
//   "Buldhana": ["Buldhana", "Chikhli", "Deulgaon Raja", "Jalgaon Jamod", "Sangrampur", "Malkapur", "Motala", "Nandura", "Khamgaon", "Shegaon", "Mehkar", "Sindkhed Raja", "Lonar"],
//   "Chandrapur": ["Chandrapur", "Saoli", "Mul", "Ballarpur", "Pombhurna", "Gondpimpri", "Warora", "Chimur", "Bhadravati", "Bramhapuri", "Nagbhid", "Sindewahi", "Rajura", "Korpana", "Jiwati"],
//   "Dhule": ["Dhule", "Sakri", "Sindkheda", "Shirpur"],
//   "Gadchiroli": ["Gadchiroli", "Dhanora", "Chamorshi", "Mulchera", "Desaiganj", "Armori", "Kurkheda", "Korchi", "Aheri", "Etapalli", "Bhamragad", "Sironcha"],
//   "Gondia": ["Gondia", "Goregaon", "Salekasa", "Tiroda", "Deori", "Amgaon", "Arjuni Morgaon", "Sadak-Arjuni"],
//   "Hingoli": ["Hingoli", "Sengaon", "Kalamnuri", "Basmath", "Aundha Nagnath"],
//   "Jalgaon": ["Jalgaon", "Jamner", "Erandol", "Dharangaon", "Bhusawal", "Raver", "Muktainagar", "Bodwad", "Yawal", "Amalner", "Parola", "Chopda", "Pachora", "Bhadgaon", "Chalisgaon"],
//   "Jalna": ["Jalna", "Bhokardan", "Jafrabad", "Badnapur", "Ambad", "Ghansawangi", "Partur", "Mantha"],
//   "Kolhapur": ["Karvir", "Panhala", "Shahuwadi", "Kagal", "Hatkanangale", "Shirol", "Radhanagari", "Gaganbawada", "Bhudargad", "Gadhinglaj", "Chandgad", "Ajra"],
//   "Latur": ["Latur", "Renapur", "Ausa", "Ahmedpur", "Jalkot", "Chakur", "Shirur Anantpal", "Nilanga", "Deoni", "Udgir"],
//   "Mumbai City": ["Mumbai City"],
//   "Mumbai Suburban": ["Kurla", "Andheri", "Borivali"],
//   "Nagpur": ["Nagpur Urban", "Nagpur Rural", "Kamptee", "Hingna", "Katol", "Narkhed", "Savner", "Kalameshwar", "Ramtek", "Mouda", "Parseoni", "Umred", "Kuhi", "Bhiwapur"],
//   "Nanded": ["Nanded", "Ardhapur", "Mudkhed", "Bhokar", "Umri", "Loha", "Kandhar", "Kinwat", "Himayatnagar", "Hadgaon", "Mahur", "Deglur", "Mukhed", "Dharmabad", "Biloli", "Naigaon"],
//   "Nandurbar": ["Nandurbar", "Navapur", "Shahada", "Talode", "Akkalkuwa", "Dhadgaon"],
//   "Nashik": ["Nashik", "Igatpuri", "Dindori", "Peth", "Trimbakeshwar", "Kalwan", "Deola", "Surgana", "Baglan", "Malegaon", "Nandgaon", "Chandwad", "Niphad", "Sinnar", "Yeola"],
//   "Osmanabad": ["Osmanabad", "Tuljapur", "Bhum", "Paranda", "Washi", "Kalamb", "Lohara", "Umarga"],
//   "Palghar": ["Palghar", "Vasai", "Dahanu", "Talasari", "Jawhar", "Mokhada", "Vada", "Vikramgad"],
//   "Parbhani": ["Parbhani", "Sonpeth", "Gangakhed", "Palam", "Purna", "Sailu", "Jintur", "Manwath", "Pathri"],
//   "Pune": ["Pune City", "Haveli", "Khed", "Junnar", "Ambegaon", "Maval", "Mulshi", "Shirur", "Purandhar", "Velhe", "Bhor", "Baramati", "Indapur", "Daund"],
//   "Raigad": ["Pen", "Alibag", "Murud", "Panvel", "Uran", "Karjat", "Khalapur", "Mangaon", "Tala", "Roha", "Sudhagad-Pali", "Mahad", "Poladpur", "Shrivardhan", "Mhasala"],
//   "Ratnagiri": ["Ratnagiri", "Sangameshwar", "Lanja", "Rajapur", "Chiplun", "Guhagar", "Dapoli", "Mandangad", "Khed"],
//   "Sangli": ["Miraj", "Kavathemahankal", "Tasgaon", "Jat", "Walwa", "Shirala", "Khanapur", "Atpadi", "Palus", "Kadegaon"],
//   "Satara": ["Satara", "Jaoli", "Koregaon", "Wai", "Mahabaleshwar", "Khandala", "Phaltan", "Maan", "Khatav", "Patan", "Karad"],
//   "Sindhudurg": ["Kankavli", "Vaibhavwadi", "Devgad", "Malwan", "Sawantwadi", "Kudal", "Vengurla", "Dodamarg"],
//   "Solapur": ["Barshi", "Solapur North", "Solapur South", "Akkalkot", "Madha", "Karmala", "Pandharpur", "Mohol", "Malshiras", "Sangole", "Mangalvedhe"],
//   "Thane": ["Thane", "Kalyan", "Murbad", "Shahapur", "Bhiwandi", "Ulhasnagar", "Ambarnath"],
//   "Wardha": ["Wardha", "Deoli", "Seloo", "Arvi", "Ashti", "Karanja", "Hinganghat", "Samudrapur"],
//   "Washim": ["Washim", "Malegaon", "Risod", "Mangrulpir", "Karanja", "Manora"],
//   "Yavatmal": ["Yavatmal", "Arni", "Babhulgaon", "Kalamb", "Darwha", "Digras", "Ner", "Pusad", "Umarkhed", "Mahagaon", "Kelapur", "Ralegaon", "Ghatanji", "Wani", "Maregaon", "Zari Jamani"],
// };

// const MH_DISTRICTS = Object.keys(DISTRICT_TALUKA_MAP).sort();

// const EMPTY_FORM = {
//   fullname: "", username: "", mobile: "", password: "",
//   state: "Maharashtra", district: "", taluka: "", ward: "",
// };

// export default function WcdInspectionOfficer() {
//   const [officers, setOfficers]     = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [modalOpen, setModalOpen]   = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [showPass, setShowPass]     = useState(false);
//   const [form, setForm]             = useState(EMPTY_FORM);

//   const [filterDistrict, setFilterDistrict] = useState("all");
//   const [filterStatus,   setFilterStatus]   = useState("all");

//   // Talukas for currently selected district in modal
//   const modalTalukas = form.district ? (DISTRICT_TALUKA_MAP[form.district] || []) : [];

//   const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

//   // District बदलला की taluka reset करा
//   const handleDistrictChange = (e) => {
//     setForm((p) => ({ ...p, district: e.target.value, taluka: "" }));
//   };

//   const fetchOfficers = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token") || "";
//       const res = await axios.get("http://127.0.0.1:8000/api/inspection-officer/get", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) setOfficers(res.data.data || []);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to load inspection officers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchOfficers(); }, []);

//   const openModal  = () => { setForm(EMPTY_FORM); setModalOpen(true); };
//   const closeModal = () => { if (!submitting) setModalOpen(false); };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.fullname.trim())          { toast.error("Full name enter करा"); return; }
//     if (!form.username.trim())          { toast.error("Username enter करा"); return; }
//     if (!/^\d{10}$/.test(form.mobile)) { toast.error("वैध 10 अंकी मोबाईल नंबर टाका"); return; }
//     if (!form.password)                 { toast.error("Password enter करा"); return; }
//     if (!form.state.trim())             { toast.error("State enter करा"); return; }
//     if (!form.district.trim())          { toast.error("District निवडा"); return; }
//     if (!form.taluka.trim())            { toast.error("Taluka निवडा"); return; }

//     try {
//       setSubmitting(true);
//       const token = localStorage.getItem("token") || "";
//       const res = await axios.post("http://127.0.0.1:8000/api/inspection-officer/add", {
//         fullname: form.fullname.trim(),
//         username: form.username.trim().toLowerCase(),
//         mobile:   form.mobile.trim(),
//         password: form.password,
//         state:    form.state.trim(),
//         district: form.district.trim(),
//         taluka:   form.taluka.trim(),
//         ward:     form.ward.trim(),
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = res.data;
//       if (!data.success) { toast.error(data.message || "Failed to add officer"); return; }
//       toast.success("Inspection officer added successfully!");
//       setModalOpen(false);
//       fetchOfficers();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Server error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const districtOptions = useMemo(() => {
//     const unique = [...new Set(officers.map((o) => o.district).filter(Boolean))].sort();
//     return unique;
//   }, [officers]);

//   const filteredOfficers = useMemo(() => {
//     return officers.filter((o) => {
//       const districtMatch = filterDistrict === "all" || o.district === filterDistrict;
//       const statusMatch =
//         filterStatus === "all" ||
//         (filterStatus === "active"   && !!o.mobile) ||
//         (filterStatus === "inactive" && !o.mobile);
//       return districtMatch && statusMatch;
//     });
//   }, [officers, filterDistrict, filterStatus]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }

//         .wio-page {
//           min-height: 100vh; width: 100%;
//           background-color: ${CREAM};
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           padding: 40px;
//         }
//         .wio-header {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
//         }
//         .wio-title-row { display: flex; align-items: center; gap: 14px; }
//         .wio-icon-badge {
//           width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
//           background: rgba(205,54,107,0.10);
//           display: flex; align-items: center; justify-content: center; color: ${PINK};
//         }
//         .wio-title { color: ${BLUE_DEEP}; font-size: 24px; font-weight: 800; letter-spacing: -0.3px; }
//         .wio-subtitle { color: rgba(44,61,131,0.55); font-size: 13.5px; margin-top: 2px; }

//         .wio-add-btn {
//           display: flex; align-items: center; gap: 8px;
//           padding: 13px 22px; border: none; border-radius: 12px;
//           font-size: 14px; font-weight: 700; cursor: pointer;
//           color: #fff; font-family: 'Inter', sans-serif;
//           background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
//           box-shadow: 0 10px 26px rgba(205,54,107,0.32);
//           transition: all .2s;
//         }
//         .wio-add-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }

//         .wio-stats { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
//         .wio-stat-card {
//           flex: 1; min-width: 180px;
//           background: #fff; border-radius: 16px; padding: 18px 20px;
//           box-shadow: 0 8px 24px rgba(44,61,131,0.06);
//           display: flex; align-items: center; gap: 14px;
//         }
//         .wio-stat-icon {
//           width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
//           background: rgba(44,61,131,0.06);
//           display: flex; align-items: center; justify-content: center; color: ${BLUE};
//         }
//         .wio-stat-num { font-size: 22px; font-weight: 800; color: ${BLUE_DEEP}; line-height: 1.1; }
//         .wio-stat-label { font-size: 11.5px; color: rgba(44,61,131,0.5); font-weight: 600; margin-top: 2px; }

//         .wio-table-card {
//           background: #fff; border-radius: 20px;
//           border-top: 4px solid ${PINK};
//           box-shadow: 0 18px 50px rgba(44,61,131,0.08);
//           overflow: hidden;
//         }
//         .wio-table-head {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 18px 24px; border-bottom: 1px solid rgba(44,61,131,0.08);
//           flex-wrap: wrap; gap: 12px;
//         }
//         .wio-table-head-left { display: flex; align-items: center; gap: 10px; }
//         .wio-table-head-title { font-size: 14px; font-weight: 800; color: ${BLUE_DEEP}; }
//         .wio-table-count {
//           font-size: 11.5px; font-weight: 700; color: ${PINK};
//           background: rgba(205,54,107,0.08); padding: 4px 12px; border-radius: 999px;
//         }

//         .wio-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
//         .wio-filter-select-wrap {
//           display: flex; align-items: center; gap: 7px;
//           padding: 8px 14px; background: #fff;
//           border: 1.5px solid rgba(44,61,131,0.12); border-radius: 999px;
//           cursor: pointer; transition: all .2s; position: relative;
//         }
//         .wio-filter-select-wrap:hover { border-color: rgba(44,61,131,0.28); background: rgba(44,61,131,0.02); }
//         .wio-filter-select-wrap svg { color: rgba(44,61,131,0.45); flex-shrink: 0; }
//         .wio-filter-select {
//           border: none; outline: none; background: transparent;
//           font-size: 12.5px; font-weight: 600; color: ${BLUE_DEEP};
//           font-family: 'Inter', sans-serif; cursor: pointer;
//           appearance: none; -webkit-appearance: none; padding-right: 4px;
//         }

//         .wio-table-wrap { overflow-x: auto; }
//         table.wio-table { width: 100%; border-collapse: collapse; }
//         .wio-table thead th {
//           text-align: left; padding: 13px 20px;
//           font-size: 10.5px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
//           color: rgba(44,61,131,0.45); background: rgba(44,61,131,0.025); white-space: nowrap;
//         }
//         .wio-table tbody td {
//           padding: 14px 20px; font-size: 13.5px; color: ${BLUE_DEEP};
//           border-top: 1px solid rgba(44,61,131,0.06); white-space: nowrap;
//         }
//         .wio-table tbody tr:hover { background: rgba(205,54,107,0.02); }

//         .wio-avatar-cell { display: flex; align-items: center; gap: 10px; }
//         .wio-avatar {
//           width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
//           background: linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP});
//           color: #fff; font-size: 13px; font-weight: 800;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .wio-fullname { font-weight: 700; }
//         .wio-username { font-size: 11.5px; color: rgba(44,61,131,0.45); margin-top: 1px; }

//         .wio-district-pill {
//           display: inline-flex; align-items: center; gap: 5px;
//           font-size: 12px; font-weight: 700; color: ${BLUE};
//           background: rgba(44,61,131,0.06); padding: 5px 12px; border-radius: 999px;
//         }
//         .wio-taluka-pill {
//           display: inline-flex; align-items: center; gap: 5px;
//           font-size: 12px; font-weight: 700; color: #6b21a8;
//           background: rgba(107,33,168,0.07); padding: 5px 12px; border-radius: 999px;
//         }
//         .wio-status-pill {
//           display: inline-flex; align-items: center; gap: 5px;
//           font-size: 11.5px; font-weight: 700; padding: 4px 11px; border-radius: 999px;
//         }
//         .wio-status-pill.active   { color: #15803d; background: rgba(34,197,94,0.10); }
//         .wio-status-pill.inactive { color: #b91c1c; background: rgba(239,68,68,0.10); }

//         .wio-empty {
//           padding: 70px 20px; text-align: center;
//           color: rgba(44,61,131,0.4); font-size: 13.5px;
//         }
//         .wio-empty-icon {
//           width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 14px;
//           background: rgba(44,61,131,0.05);
//           display: flex; align-items: center; justify-content: center; color: rgba(44,61,131,0.3);
//         }
//         .wio-loading { padding: 60px 20px; text-align: center; color: rgba(44,61,131,0.4); font-size: 13.5px; }

//         /* Modal */
//         .wio-overlay {
//           position: fixed; inset: 0; z-index: 1000;
//           background: rgba(29,42,96,0.45); backdrop-filter: blur(3px);
//           display: flex; align-items: center; justify-content: center;
//           padding: 20px; animation: wioFadeIn .2s ease both;
//         }
//         @keyframes wioFadeIn { from{opacity:0} to{opacity:1} }
//         .wio-modal-card {
//           width: 100%; max-width: 480px; background: #fff; border-radius: 20px;
//           border-top: 4px solid ${PINK};
//           box-shadow: 0 30px 70px rgba(29,42,96,0.35);
//           padding: 30px 32px 28px; max-height: 90vh; overflow-y: auto;
//           animation: wioSlideUp .3s cubic-bezier(.22,.9,.36,1) both;
//         }
//         @keyframes wioSlideUp { from{opacity:0;transform:translateY(20px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }

//         .wio-modal-head {
//           display: flex; align-items: flex-start; justify-content: space-between;
//           padding-bottom: 18px; margin-bottom: 20px;
//           border-bottom: 1px solid rgba(44,61,131,0.08);
//         }
//         .wio-modal-brand { display: flex; align-items: center; gap: 12px; }
//         .wio-modal-icon {
//           width: 44px; height: 44px; border-radius: 13px; flex-shrink: 0;
//           background: rgba(205,54,107,0.10); overflow: hidden;
//           display: flex; align-items: center; justify-content: center; color: ${PINK};
//         }
//         .wio-modal-title { color: ${BLUE_DEEP}; font-size: 17px; font-weight: 800; line-height: 1.2; }
//         .wio-modal-sub { color: ${PINK}; font-size: 12px; font-weight: 600; margin-top: 2px; }
//         .wio-modal-close {
//           width: 30px; height: 30px; border-radius: 9px; border: none;
//           background: rgba(44,61,131,0.06); color: rgba(44,61,131,0.5);
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; transition: all .15s; flex-shrink: 0;
//         }
//         .wio-modal-close:hover { background: rgba(44,61,131,0.12); color: ${BLUE_DEEP}; }

//         .wio-fld { margin-bottom: 16px; }
//         .wio-flbl {
//           display: block; font-size: 11px; font-weight: 700;
//           color: rgba(44,61,131,0.55); margin-bottom: 8px;
//           letter-spacing: 0.7px; text-transform: uppercase;
//         }
//         .wio-fwrap { display: flex; align-items: stretch; position: relative; }
//         .wio-ficon {
//           width: 42px; flex-shrink: 0;
//           background: rgba(44,61,131,0.05);
//           border: 1px solid rgba(44,61,131,0.12); border-right: none;
//           border-radius: 12px 0 0 12px;
//           display: flex; align-items: center; justify-content: center;
//           color: rgba(44,61,131,0.40); transition: all .2s;
//         }
//         .wio-finput {
//           width: 100%; padding: 12px 14px;
//           border: 1px solid rgba(44,61,131,0.12); border-left: none;
//           border-radius: 0 12px 12px 0;
//           font-size: 14px; color: ${BLUE_DEEP}; background: #fff;
//           outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif;
//         }
//         .wio-finput:focus { border-color: ${PINK}; box-shadow: 0 0 0 3px rgba(205,54,107,0.12); }
//         .wio-finput::placeholder { color: rgba(44,61,131,0.30); }
//         .wio-fwrap:focus-within .wio-ficon { border-color: ${PINK}; color: ${PINK}; }

//         /* Disabled select */
//         .wio-finput:disabled {
//           background: rgba(44,61,131,0.04);
//           color: rgba(44,61,131,0.35);
//           cursor: not-allowed;
//         }
//         .wio-fwrap:has(.wio-finput:disabled) .wio-ficon {
//           background: rgba(44,61,131,0.03);
//           color: rgba(44,61,131,0.25);
//         }

//         .wio-eye {
//           position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
//           background: none; border: none; cursor: pointer;
//           color: rgba(44,61,131,0.4); display: flex; align-items: center;
//         }
//         .wio-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//         .wio-modal-btnrow { display: flex; gap: 10px; margin-top: 22px; }
//         .wio-modal-ghost {
//           flex: 0 0 auto; padding: 13px 20px; border-radius: 12px;
//           border: 1.5px solid rgba(44,61,131,0.15);
//           background: #fff; color: ${BLUE_DEEP};
//           font-size: 13.5px; font-weight: 700; cursor: pointer;
//           transition: all .2s; font-family: 'Inter', sans-serif;
//         }
//         .wio-modal-ghost:hover { background: rgba(44,61,131,0.04); }
//         .wio-modal-submit {
//           flex: 1; padding: 13px; border: none; border-radius: 12px;
//           font-size: 14px; font-weight: 700; cursor: pointer;
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
//           background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
//           box-shadow: 0 10px 26px rgba(205,54,107,0.32);
//         }
//         .wio-modal-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
//         .wio-modal-submit:disabled { opacity: 0.5; cursor: not-allowed; }

//         .wio-section-divider {
//           font-size: 10.5px; font-weight: 800; letter-spacing: 0.8px;
//           text-transform: uppercase; color: rgba(44,61,131,0.35);
//           margin: 8px 0 14px; display: flex; align-items: center; gap: 10px;
//         }
//         .wio-section-divider::after {
//           content: ''; flex: 1; height: 1px; background: rgba(44,61,131,0.08);
//         }

//         /* Taluka hint */
//         .wio-taluka-hint {
//           font-size: 10.5px; color: rgba(44,61,131,0.40);
//           margin-top: 5px; padding-left: 2px;
//         }

//         @media (max-width: 700px) {
//           .wio-page { padding: 20px; }
//           .wio-two-col { grid-template-columns: 1fr; }
//           .wio-stats { flex-direction: column; }
//           .wio-table-head { flex-direction: column; align-items: flex-start; }
//         }
//       `}</style>

//       <div className="wio-page">

//         {/* Header */}
//         <div className="wio-header">
//           <div className="wio-title-row">
//             <div className="wio-icon-badge"><FiUsers size={22} /></div>
//             <div>
//               <div className="wio-title">Inspection Officers</div>
//               <div className="wio-subtitle">Manage field-level inspection officers across Maharashtra</div>
//             </div>
//           </div>
//           <button className="wio-add-btn" onClick={openModal}>
//             <FiPlus size={17} /> Add Officer
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="wio-stats">
//           <div className="wio-stat-card">
//             <div className="wio-stat-icon"><FiUsers size={18} /></div>
//             <div>
//               <div className="wio-stat-num">{officers.length}</div>
//               <div className="wio-stat-label">Total Officers</div>
//             </div>
//           </div>
//           <div className="wio-stat-card">
//             <div className="wio-stat-icon"><FiMapPin size={18} /></div>
//             <div>
//               <div className="wio-stat-num">{new Set(officers.map((o) => o.district)).size}</div>
//               <div className="wio-stat-label">Districts Covered</div>
//             </div>
//           </div>
//           <div className="wio-stat-card">
//             <div className="wio-stat-icon"><FiHome size={18} /></div>
//             <div>
//               <div className="wio-stat-num">{new Set(officers.map((o) => o.taluka).filter(Boolean)).size}</div>
//               <div className="wio-stat-label">Talukas Covered</div>
//             </div>
//           </div>
//           <div className="wio-stat-card">
//             <div className="wio-stat-icon"><FiCheckCircle size={18} /></div>
//             <div>
//               <div className="wio-stat-num">{officers.filter((o) => !!o.mobile).length}</div>
//               <div className="wio-stat-label">Active Officers</div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="wio-table-card">
//           <div className="wio-table-head">
//             <div className="wio-table-head-left">
//               <span className="wio-table-head-title">All Inspection Officers</span>
//               <span className="wio-table-count">{filteredOfficers.length} record{filteredOfficers.length !== 1 ? "s" : ""}</span>
//             </div>

//             <div className="wio-filters">
//               <div className="wio-filter-select-wrap">
//                 <FiMapPin size={13} />
//                 <select
//                   className="wio-filter-select"
//                   value={filterDistrict}
//                   onChange={(e) => setFilterDistrict(e.target.value)}
//                 >
//                   <option value="all">All Districts</option>
//                   {districtOptions.map((d) => (
//                     <option key={d} value={d}>{d}</option>
//                   ))}
//                 </select>
//                 <FiChevronDown size={13} />
//               </div>

//               <div className="wio-filter-select-wrap">
//                 <FiFilter size={13} />
//                 <select
//                   className="wio-filter-select"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//                 <FiChevronDown size={13} />
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="wio-loading">Loading inspection officers…</div>
//           ) : filteredOfficers.length === 0 ? (
//             <div className="wio-empty">
//               <div className="wio-empty-icon"><FiUsers size={24} /></div>
//               {officers.length === 0
//                 ? 'No officers added yet. Click "Add Officer" to create one.'
//                 : "No records match the selected filters."}
//             </div>
//           ) : (
//             <div className="wio-table-wrap">
//               <table className="wio-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Mobile</th>
//                     <th>District</th>
//                     <th>Taluka</th>
//                     <th>Ward</th>
//                     <th>Status</th>
//                     <th>Added On</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOfficers.map((o) => (
//                     <tr key={o.id}>
//                       <td>
//                         <div className="wio-avatar-cell">
//                           <div className="wio-avatar">{(o.fullname || "?").charAt(0).toUpperCase()}</div>
//                           <div>
//                             <div className="wio-fullname">{o.fullname}</div>
//                             <div className="wio-username">@{o.username}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{o.mobile}</td>
//                       <td><span className="wio-district-pill"><FiMapPin size={11} /> {o.district}</span></td>
//                       <td>
//                         {o.taluka
//                           ? <span className="wio-taluka-pill"><FiHome size={11} /> {o.taluka}</span>
//                           : "—"}
//                       </td>
//                       <td>{o.ward || "—"}</td>
//                       <td>
//                         <span className={`wio-status-pill ${o.mobile ? "active" : "inactive"}`}>
//                           {o.mobile ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td>{o.created_at ? new Date(o.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="wio-overlay" onClick={closeModal}>
//           <div className="wio-modal-card" onClick={(e) => e.stopPropagation()}>
//             <div className="wio-modal-head">
//               <div className="wio-modal-brand">
//                 <div className="wio-modal-icon">
//                   <img src={wcdLogo} alt="WCD" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 13 }} />
//                 </div>
//                 <div>
//                   <div className="wio-modal-title">Add Inspection Officer</div>
//                   <div className="wio-modal-sub">Create new field-level officer access</div>
//                 </div>
//               </div>
//               <button className="wio-modal-close" onClick={closeModal}><FiX size={16} /></button>
//             </div>

//             <form onSubmit={handleSubmit}>

//               {/* Basic Info */}
//               <div className="wio-section-divider">Basic Info</div>

//               <div className="wio-fld">
//                 <label className="wio-flbl">Full Name</label>
//                 <div className="wio-fwrap">
//                   <span className="wio-ficon"><FiUser size={15} /></span>
//                   <input className="wio-finput" placeholder="e.g. Suresh Jadhav" value={form.fullname} onChange={update("fullname")} />
//                 </div>
//               </div>

//               <div className="wio-fld">
//                 <label className="wio-flbl">Username</label>
//                 <div className="wio-fwrap">
//                   <span className="wio-ficon"><FiUser size={15} /></span>
//                   <input className="wio-finput" placeholder="e.g. officer_pune1" value={form.username} onChange={update("username")} />
//                 </div>
//               </div>

//               <div className="wio-two-col">
//                 <div className="wio-fld">
//                   <label className="wio-flbl">Mobile Number</label>
//                   <div className="wio-fwrap">
//                     <span className="wio-ficon"><FiPhone size={15} /></span>
//                     <input
//                       className="wio-finput" placeholder="10 digit" maxLength={10}
//                       value={form.mobile}
//                       onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
//                     />
//                   </div>
//                 </div>

//                 <div className="wio-fld">
//                   <label className="wio-flbl">Password</label>
//                   <div className="wio-fwrap">
//                     <span className="wio-ficon"><FiLock size={15} /></span>
//                     <input
//                       className="wio-finput" type={showPass ? "text" : "password"}
//                       placeholder="Create password" value={form.password} onChange={update("password")}
//                       style={{ paddingRight: 40 }}
//                     />
//                     <button type="button" className="wio-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
//                       {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Location */}
//               <div className="wio-section-divider">Location</div>

//               {/* State — full width */}
//               <div className="wio-fld">
//                 <label className="wio-flbl">State</label>
//                 <div className="wio-fwrap">
//                   <span className="wio-ficon"><FiBriefcase size={15} /></span>
//                   <input className="wio-finput" placeholder="Maharashtra" value={form.state} onChange={update("state")} />
//                 </div>
//               </div>

//               {/* District + Taluka — side by side, taluka is dropdown */}
//               <div className="wio-two-col">
//                 <div className="wio-fld">
//                   <label className="wio-flbl">District</label>
//                   <div className="wio-fwrap">
//                     <span className="wio-ficon"><FiMapPin size={15} /></span>
//                     <select
//                       className="wio-finput"
//                       value={form.district}
//                       onChange={handleDistrictChange}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <option value="">Select District</option>
//                       {MH_DISTRICTS.map((d) => (
//                         <option key={d} value={d}>{d}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="wio-fld">
//                   <label className="wio-flbl">Taluka</label>
//                   <div className="wio-fwrap">
//                     <span className="wio-ficon"><FiHome size={15} /></span>
//                     <select
//                       className="wio-finput"
//                       value={form.taluka}
//                       onChange={update("taluka")}
//                       disabled={!form.district}
//                       style={{ cursor: form.district ? "pointer" : "not-allowed" }}
//                     >
//                       <option value="">
//                         {form.district ? "Select Taluka" : "Select District First"}
//                       </option>
//                       {modalTalukas.map((t) => (
//                         <option key={t} value={t}>{t}</option>
//                       ))}
//                     </select>
//                   </div>
//                   {!form.district && (
//                     <div className="wio-taluka-hint">⬅ आधी District निवडा</div>
//                   )}
//                 </div>
//               </div>

//               {/* Ward — full width */}
//               <div className="wio-fld">
//                 <label className="wio-flbl">Ward</label>
//                 <div className="wio-fwrap">
//                   <span className="wio-ficon"><FiMapPin size={15} /></span>
//                   <input className="wio-finput" placeholder="e.g. Ward 5 (Optional)" value={form.ward} onChange={update("ward")} />
//                 </div>
//               </div>

//               <div className="wio-modal-btnrow">
//                 <button type="button" className="wio-modal-ghost" onClick={closeModal}>Cancel</button>
//                 <button type="submit" className="wio-modal-submit" disabled={submitting}>
//                   {submitting ? "Adding..." : <><FiCheckCircle size={16} /> Add Officer</>}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FiShield, FiUser, FiLock, FiPhone, FiMapPin,
  FiPlus, FiX, FiUsers, FiEye, FiEyeOff,
  FiCheckCircle, FiBriefcase, FiFilter, FiChevronDown, FiHome,
} from "react-icons/fi";
import wcdLogo from "../assets/wcdlogo.jpg";
import axios from "axios";

const PINK      = "#CD366B";
const PINK_DARK = "#b82a5c";
const BLUE      = "#2C3D83";
const BLUE_DEEP = "#1d2a60";
const CREAM     = "#FBF3EE";

// ─── Maharashtra District → Talukas Map ───────────────────────────────────
const DISTRICT_TALUKA_MAP = {
  "Ahmednagar": ["Nagar", "Shevgaon", "Pathardi", "Parner", "Sangamner", "Kopargaon", "Akole", "Shrirampur", "Nevasa", "Rahata", "Rahuri", "Shrigonda", "Karjat", "Jamkhed"],
  "Akola": ["Akola", "Akot", "Telhara", "Balapur", "Patur", "Murtajapur", "Barshitakli"],
  "Amravati": ["Amravati", "Bhatkuli", "Nandgaon Khandeshwar", "Dharni", "Chikhaldara", "Achalpur", "Chandurbazar", "Morshi", "Warud", "Daryapur", "Anjangaon-Surji", "Chandur", "Dhamangaon", "Tiosa"],
  "Aurangabad": ["Aurangabad", "Kannad", "Soegaon", "Sillod", "Phulambri", "Khuldabad", "Vaijapur", "Gangapur", "Paithan"],
  "Beed": ["Beed", "Georai", "Patoda", "Shirur-Kasar", "Ashti", "Majalgaon", "Wadwani", "Kaij", "Dharur", "Parli", "Ambajogai"],
  "Bhandara": ["Bhandara", "Tumsar", "Pauni", "Mohadi", "Sakoli", "Lakhani", "Lakhandur"],
  "Buldhana": ["Buldhana", "Chikhli", "Deulgaon Raja", "Jalgaon Jamod", "Sangrampur", "Malkapur", "Motala", "Nandura", "Khamgaon", "Shegaon", "Mehkar", "Sindkhed Raja", "Lonar"],
  "Chandrapur": ["Chandrapur", "Saoli", "Mul", "Ballarpur", "Pombhurna", "Gondpimpri", "Warora", "Chimur", "Bhadravati", "Bramhapuri", "Nagbhid", "Sindewahi", "Rajura", "Korpana", "Jiwati"],
  "Dhule": ["Dhule", "Sakri", "Sindkheda", "Shirpur"],
  "Gadchiroli": ["Gadchiroli", "Dhanora", "Chamorshi", "Mulchera", "Desaiganj", "Armori", "Kurkheda", "Korchi", "Aheri", "Etapalli", "Bhamragad", "Sironcha"],
  "Gondia": ["Gondia", "Goregaon", "Salekasa", "Tiroda", "Deori", "Amgaon", "Arjuni Morgaon", "Sadak-Arjuni"],
  "Hingoli": ["Hingoli", "Sengaon", "Kalamnuri", "Basmath", "Aundha Nagnath"],
  "Jalgaon": ["Jalgaon", "Jamner", "Erandol", "Dharangaon", "Bhusawal", "Raver", "Muktainagar", "Bodwad", "Yawal", "Amalner", "Parola", "Chopda", "Pachora", "Bhadgaon", "Chalisgaon"],
  "Jalna": ["Jalna", "Bhokardan", "Jafrabad", "Badnapur", "Ambad", "Ghansawangi", "Partur", "Mantha"],
  "Kolhapur": ["Karvir", "Panhala", "Shahuwadi", "Kagal", "Hatkanangale", "Shirol", "Radhanagari", "Gaganbawada", "Bhudargad", "Gadhinglaj", "Chandgad", "Ajra"],
  "Latur": ["Latur", "Renapur", "Ausa", "Ahmedpur", "Jalkot", "Chakur", "Shirur Anantpal", "Nilanga", "Deoni", "Udgir"],
  "Mumbai City": ["Mumbai City"],
  "Mumbai Suburban": ["Kurla", "Andheri", "Borivali"],
  "Nagpur": ["Nagpur Urban", "Nagpur Rural", "Kamptee", "Hingna", "Katol", "Narkhed", "Savner", "Kalameshwar", "Ramtek", "Mouda", "Parseoni", "Umred", "Kuhi", "Bhiwapur"],
  "Nanded": ["Nanded", "Ardhapur", "Mudkhed", "Bhokar", "Umri", "Loha", "Kandhar", "Kinwat", "Himayatnagar", "Hadgaon", "Mahur", "Deglur", "Mukhed", "Dharmabad", "Biloli", "Naigaon"],
  "Nandurbar": ["Nandurbar", "Navapur", "Shahada", "Talode", "Akkalkuwa", "Dhadgaon"],
  "Nashik": ["Nashik", "Igatpuri", "Dindori", "Peth", "Trimbakeshwar", "Kalwan", "Deola", "Surgana", "Baglan", "Malegaon", "Nandgaon", "Chandwad", "Niphad", "Sinnar", "Yeola"],
  "Osmanabad": ["Osmanabad", "Tuljapur", "Bhum", "Paranda", "Washi", "Kalamb", "Lohara", "Umarga"],
  "Palghar": ["Palghar", "Vasai", "Dahanu", "Talasari", "Jawhar", "Mokhada", "Vada", "Vikramgad"],
  "Parbhani": ["Parbhani", "Sonpeth", "Gangakhed", "Palam", "Purna", "Sailu", "Jintur", "Manwath", "Pathri"],
  "Pune": ["Pune City", "Haveli", "Khed", "Junnar", "Ambegaon", "Maval", "Mulshi", "Shirur", "Purandhar", "Velhe", "Bhor", "Baramati", "Indapur", "Daund"],
  "Raigad": ["Pen", "Alibag", "Murud", "Panvel", "Uran", "Karjat", "Khalapur", "Mangaon", "Tala", "Roha", "Sudhagad-Pali", "Mahad", "Poladpur", "Shrivardhan", "Mhasala"],
  "Ratnagiri": ["Ratnagiri", "Sangameshwar", "Lanja", "Rajapur", "Chiplun", "Guhagar", "Dapoli", "Mandangad", "Khed"],
  "Sangli": ["Miraj", "Kavathemahankal", "Tasgaon", "Jat", "Walwa", "Shirala", "Khanapur", "Atpadi", "Palus", "Kadegaon"],
  "Satara": ["Satara", "Jaoli", "Koregaon", "Wai", "Mahabaleshwar", "Khandala", "Phaltan", "Maan", "Khatav", "Patan", "Karad"],
  "Sindhudurg": ["Kankavli", "Vaibhavwadi", "Devgad", "Malwan", "Sawantwadi", "Kudal", "Vengurla", "Dodamarg"],
  "Solapur": ["Barshi", "Solapur North", "Solapur South", "Akkalkot", "Madha", "Karmala", "Pandharpur", "Mohol", "Malshiras", "Sangole", "Mangalvedhe"],
  "Thane": ["Thane", "Kalyan", "Murbad", "Shahapur", "Bhiwandi", "Ulhasnagar", "Ambarnath"],
  "Wardha": ["Wardha", "Deoli", "Seloo", "Arvi", "Ashti", "Karanja", "Hinganghat", "Samudrapur"],
  "Washim": ["Washim", "Malegaon", "Risod", "Mangrulpir", "Karanja", "Manora"],
  "Yavatmal": ["Yavatmal", "Arni", "Babhulgaon", "Kalamb", "Darwha", "Digras", "Ner", "Pusad", "Umarkhed", "Mahagaon", "Kelapur", "Ralegaon", "Ghatanji", "Wani", "Maregaon", "Zari Jamani"],
};

const MH_DISTRICTS = Object.keys(DISTRICT_TALUKA_MAP).sort();

// Ward options: None + A to K
const WARD_OPTIONS = ["None", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

const EMPTY_FORM = {
  fullname: "", username: "", mobile: "", password: "",
  state: "Maharashtra", district: "", taluka: "", ward: "",
};

export default function WcdInspectionOfficer() {
  const [officers, setOfficers]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [modalOpen, setModalOpen]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass]     = useState(false);
  const [form, setForm]             = useState(EMPTY_FORM);

  const [filterDistrict, setFilterDistrict] = useState("all");
  const [filterStatus,   setFilterStatus]   = useState("all");

  // Talukas for currently selected district in modal
  const modalTalukas = form.district ? (DISTRICT_TALUKA_MAP[form.district] || []) : [];

  const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  // District बदलला की taluka reset करा
  const handleDistrictChange = (e) => {
    setForm((p) => ({ ...p, district: e.target.value, taluka: "" }));
  };

  const fetchOfficers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const res = await axios.get("http://127.0.0.1:8000/api/inspection-officer/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setOfficers(res.data.data || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load inspection officers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOfficers(); }, []);

  const openModal  = () => { setForm(EMPTY_FORM); setModalOpen(true); };
  const closeModal = () => { if (!submitting) setModalOpen(false); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullname.trim())          { toast.error("Full name enter करा"); return; }
    if (!form.username.trim())          { toast.error("Username enter करा"); return; }
    if (!/^\d{10}$/.test(form.mobile)) { toast.error("वैध 10 अंकी मोबाईल नंबर टाका"); return; }
    if (!form.password)                 { toast.error("Password enter करा"); return; }
    if (!form.state.trim())             { toast.error("State enter करा"); return; }
    if (!form.district.trim())          { toast.error("District निवडा"); return; }
    if (!form.taluka.trim())            { toast.error("Taluka निवडा"); return; }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token") || "";
      const wardValue = (form.ward === "None" || form.ward === "") ? "" : form.ward;
      const res = await axios.post("http://127.0.0.1:8000/api/inspection-officer/add", {
        fullname: form.fullname.trim(),
        username: form.username.trim().toLowerCase(),
        mobile:   form.mobile.trim(),
        password: form.password,
        state:    form.state.trim(),
        district: form.district.trim(),
        taluka:   form.taluka.trim(),
        ward:     wardValue,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      if (!data.success) { toast.error(data.message || "Failed to add officer"); return; }
      toast.success("Inspection officer added successfully!");
      setModalOpen(false);
      fetchOfficers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setSubmitting(false);
    }
  };

  const districtOptions = useMemo(() => {
    const unique = [...new Set(officers.map((o) => o.district).filter(Boolean))].sort();
    return unique;
  }, [officers]);

  const filteredOfficers = useMemo(() => {
    return officers.filter((o) => {
      const districtMatch = filterDistrict === "all" || o.district === filterDistrict;
      const statusMatch =
        filterStatus === "all" ||
        (filterStatus === "active"   && !!o.mobile) ||
        (filterStatus === "inactive" && !o.mobile);
      return districtMatch && statusMatch;
    });
  }, [officers, filterDistrict, filterStatus]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .wio-page {
          min-height: 100vh; width: 100%;
          background-color: ${CREAM};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 40px;
        }
        .wio-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
        }
        .wio-title-row { display: flex; align-items: center; gap: 14px; }
        .wio-icon-badge {
          width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
          background: rgba(205,54,107,0.10);
          display: flex; align-items: center; justify-content: center; color: ${PINK};
        }
        .wio-title { color: ${BLUE_DEEP}; font-size: 24px; font-weight: 800; letter-spacing: -0.3px; }
        .wio-subtitle { color: rgba(44,61,131,0.55); font-size: 13.5px; margin-top: 2px; }

        .wio-add-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 22px; border: none; border-radius: 12px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          color: #fff; font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
          box-shadow: 0 10px 26px rgba(205,54,107,0.32);
          transition: all .2s;
        }
        .wio-add-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }

        .wio-stats { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
        .wio-stat-card {
          flex: 1; min-width: 180px;
          background: #fff; border-radius: 16px; padding: 18px 20px;
          box-shadow: 0 8px 24px rgba(44,61,131,0.06);
          display: flex; align-items: center; gap: 14px;
        }
        .wio-stat-icon {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          background: rgba(44,61,131,0.06);
          display: flex; align-items: center; justify-content: center; color: ${BLUE};
        }
        .wio-stat-num { font-size: 22px; font-weight: 800; color: ${BLUE_DEEP}; line-height: 1.1; }
        .wio-stat-label { font-size: 11.5px; color: rgba(44,61,131,0.5); font-weight: 600; margin-top: 2px; }

        .wio-table-card {
          background: #fff; border-radius: 20px;
          border-top: 4px solid ${PINK};
          box-shadow: 0 18px 50px rgba(44,61,131,0.08);
          overflow: hidden;
        }
        .wio-table-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px; border-bottom: 1px solid rgba(44,61,131,0.08);
          flex-wrap: wrap; gap: 12px;
        }
        .wio-table-head-left { display: flex; align-items: center; gap: 10px; }
        .wio-table-head-title { font-size: 14px; font-weight: 800; color: ${BLUE_DEEP}; }
        .wio-table-count {
          font-size: 11.5px; font-weight: 700; color: ${PINK};
          background: rgba(205,54,107,0.08); padding: 4px 12px; border-radius: 999px;
        }

        .wio-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .wio-filter-select-wrap {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 14px; background: #fff;
          border: 1.5px solid rgba(44,61,131,0.12); border-radius: 999px;
          cursor: pointer; transition: all .2s; position: relative;
        }
        .wio-filter-select-wrap:hover { border-color: rgba(44,61,131,0.28); background: rgba(44,61,131,0.02); }
        .wio-filter-select-wrap svg { color: rgba(44,61,131,0.45); flex-shrink: 0; }
        .wio-filter-select {
          border: none; outline: none; background: transparent;
          font-size: 12.5px; font-weight: 600; color: ${BLUE_DEEP};
          font-family: 'Inter', sans-serif; cursor: pointer;
          appearance: none; -webkit-appearance: none; padding-right: 4px;
        }

        .wio-table-wrap { overflow-x: auto; }
        table.wio-table { width: 100%; border-collapse: collapse; }
        .wio-table thead th {
          text-align: left; padding: 13px 20px;
          font-size: 10.5px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
          color: rgba(44,61,131,0.45); background: rgba(44,61,131,0.025); white-space: nowrap;
        }
        .wio-table tbody td {
          padding: 14px 20px; font-size: 13.5px; color: ${BLUE_DEEP};
          border-top: 1px solid rgba(44,61,131,0.06); white-space: nowrap;
        }
        .wio-table tbody tr:hover { background: rgba(205,54,107,0.02); }

        .wio-avatar-cell { display: flex; align-items: center; gap: 10px; }
        .wio-avatar {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP});
          color: #fff; font-size: 13px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
        }
        .wio-fullname { font-weight: 700; }
        .wio-username { font-size: 11.5px; color: rgba(44,61,131,0.45); margin-top: 1px; }

        .wio-district-pill {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 700; color: ${BLUE};
          background: rgba(44,61,131,0.06); padding: 5px 12px; border-radius: 999px;
        }
        .wio-taluka-pill {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 700; color: #6b21a8;
          background: rgba(107,33,168,0.07); padding: 5px 12px; border-radius: 999px;
        }
        .wio-status-pill {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11.5px; font-weight: 700; padding: 4px 11px; border-radius: 999px;
        }
        .wio-status-pill.active   { color: #15803d; background: rgba(34,197,94,0.10); }
        .wio-status-pill.inactive { color: #b91c1c; background: rgba(239,68,68,0.10); }

        .wio-empty {
          padding: 70px 20px; text-align: center;
          color: rgba(44,61,131,0.4); font-size: 13.5px;
        }
        .wio-empty-icon {
          width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 14px;
          background: rgba(44,61,131,0.05);
          display: flex; align-items: center; justify-content: center; color: rgba(44,61,131,0.3);
        }
        .wio-loading { padding: 60px 20px; text-align: center; color: rgba(44,61,131,0.4); font-size: 13.5px; }

        /* Modal */
        .wio-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(29,42,96,0.45); backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: wioFadeIn .2s ease both;
        }
        @keyframes wioFadeIn { from{opacity:0} to{opacity:1} }
        .wio-modal-card {
          width: 100%; max-width: 480px; background: #fff; border-radius: 20px;
          border-top: 4px solid ${PINK};
          box-shadow: 0 30px 70px rgba(29,42,96,0.35);
          padding: 30px 32px 28px; max-height: 90vh; overflow-y: auto;
          animation: wioSlideUp .3s cubic-bezier(.22,.9,.36,1) both;
        }
        @keyframes wioSlideUp { from{opacity:0;transform:translateY(20px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }

        .wio-modal-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding-bottom: 18px; margin-bottom: 20px;
          border-bottom: 1px solid rgba(44,61,131,0.08);
        }
        .wio-modal-brand { display: flex; align-items: center; gap: 12px; }
        .wio-modal-icon {
          width: 44px; height: 44px; border-radius: 13px; flex-shrink: 0;
          background: rgba(205,54,107,0.10); overflow: hidden;
          display: flex; align-items: center; justify-content: center; color: ${PINK};
        }
        .wio-modal-title { color: ${BLUE_DEEP}; font-size: 17px; font-weight: 800; line-height: 1.2; }
        .wio-modal-sub { color: ${PINK}; font-size: 12px; font-weight: 600; margin-top: 2px; }
        .wio-modal-close {
          width: 30px; height: 30px; border-radius: 9px; border: none;
          background: rgba(44,61,131,0.06); color: rgba(44,61,131,0.5);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .15s; flex-shrink: 0;
        }
        .wio-modal-close:hover { background: rgba(44,61,131,0.12); color: ${BLUE_DEEP}; }

        .wio-fld { margin-bottom: 16px; }
        .wio-flbl {
          display: block; font-size: 11px; font-weight: 700;
          color: rgba(44,61,131,0.55); margin-bottom: 8px;
          letter-spacing: 0.7px; text-transform: uppercase;
        }
        .wio-fwrap { display: flex; align-items: stretch; position: relative; }
        .wio-ficon {
          width: 42px; flex-shrink: 0;
          background: rgba(44,61,131,0.05);
          border: 1px solid rgba(44,61,131,0.12); border-right: none;
          border-radius: 12px 0 0 12px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(44,61,131,0.40); transition: all .2s;
        }
        .wio-finput {
          width: 100%; padding: 12px 14px;
          border: 1px solid rgba(44,61,131,0.12); border-left: none;
          border-radius: 0 12px 12px 0;
          font-size: 14px; color: ${BLUE_DEEP}; background: #fff;
          outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .wio-finput:focus { border-color: ${PINK}; box-shadow: 0 0 0 3px rgba(205,54,107,0.12); }
        .wio-finput::placeholder { color: rgba(44,61,131,0.30); }
        .wio-fwrap:focus-within .wio-ficon { border-color: ${PINK}; color: ${PINK}; }

        /* Disabled select */
        .wio-finput:disabled {
          background: rgba(44,61,131,0.04);
          color: rgba(44,61,131,0.35);
          cursor: not-allowed;
        }
        .wio-fwrap:has(.wio-finput:disabled) .wio-ficon {
          background: rgba(44,61,131,0.03);
          color: rgba(44,61,131,0.25);
        }

        .wio-eye {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(44,61,131,0.4); display: flex; align-items: center;
        }
        .wio-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .wio-modal-btnrow { display: flex; gap: 10px; margin-top: 22px; }
        .wio-modal-ghost {
          flex: 0 0 auto; padding: 13px 20px; border-radius: 12px;
          border: 1.5px solid rgba(44,61,131,0.15);
          background: #fff; color: ${BLUE_DEEP};
          font-size: 13.5px; font-weight: 700; cursor: pointer;
          transition: all .2s; font-family: 'Inter', sans-serif;
        }
        .wio-modal-ghost:hover { background: rgba(44,61,131,0.04); }
        .wio-modal-submit {
          flex: 1; padding: 13px; border: none; border-radius: 12px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          color: #fff; transition: all .2s; font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%);
          box-shadow: 0 10px 26px rgba(205,54,107,0.32);
        }
        .wio-modal-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(205,54,107,0.42); }
        .wio-modal-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .wio-section-divider {
          font-size: 10.5px; font-weight: 800; letter-spacing: 0.8px;
          text-transform: uppercase; color: rgba(44,61,131,0.35);
          margin: 8px 0 14px; display: flex; align-items: center; gap: 10px;
        }
        .wio-section-divider::after {
          content: ''; flex: 1; height: 1px; background: rgba(44,61,131,0.08);
        }

        /* Taluka hint */
        .wio-taluka-hint {
          font-size: 10.5px; color: rgba(44,61,131,0.40);
          margin-top: 5px; padding-left: 2px;
        }

        @media (max-width: 700px) {
          .wio-page { padding: 20px; }
          .wio-two-col { grid-template-columns: 1fr; }
          .wio-stats { flex-direction: column; }
          .wio-table-head { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="wio-page">

        {/* Header */}
        <div className="wio-header">
          <div className="wio-title-row">
            <div className="wio-icon-badge"><FiUsers size={22} /></div>
            <div>
              <div className="wio-title">Inspection Officers</div>
              <div className="wio-subtitle">Manage field-level inspection officers across Maharashtra</div>
            </div>
          </div>
          <button className="wio-add-btn" onClick={openModal}>
            <FiPlus size={17} /> Add Officer
          </button>
        </div>

        {/* Stats */}
        <div className="wio-stats">
          <div className="wio-stat-card">
            <div className="wio-stat-icon"><FiUsers size={18} /></div>
            <div>
              <div className="wio-stat-num">{officers.length}</div>
              <div className="wio-stat-label">Total Officers</div>
            </div>
          </div>
          <div className="wio-stat-card">
            <div className="wio-stat-icon"><FiMapPin size={18} /></div>
            <div>
              <div className="wio-stat-num">{new Set(officers.map((o) => o.district)).size}</div>
              <div className="wio-stat-label">Districts Covered</div>
            </div>
          </div>
          <div className="wio-stat-card">
            <div className="wio-stat-icon"><FiHome size={18} /></div>
            <div>
              <div className="wio-stat-num">{new Set(officers.map((o) => o.taluka).filter(Boolean)).size}</div>
              <div className="wio-stat-label">Talukas Covered</div>
            </div>
          </div>
          <div className="wio-stat-card">
            <div className="wio-stat-icon"><FiCheckCircle size={18} /></div>
            <div>
              <div className="wio-stat-num">{officers.filter((o) => !!o.mobile).length}</div>
              <div className="wio-stat-label">Active Officers</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="wio-table-card">
          <div className="wio-table-head">
            <div className="wio-table-head-left">
              <span className="wio-table-head-title">All Inspection Officers</span>
              <span className="wio-table-count">{filteredOfficers.length} record{filteredOfficers.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="wio-filters">
              <div className="wio-filter-select-wrap">
                <FiMapPin size={13} />
                <select
                  className="wio-filter-select"
                  value={filterDistrict}
                  onChange={(e) => setFilterDistrict(e.target.value)}
                >
                  <option value="all">All Districts</option>
                  {districtOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <FiChevronDown size={13} />
              </div>

              <div className="wio-filter-select-wrap">
                <FiFilter size={13} />
                <select
                  className="wio-filter-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <FiChevronDown size={13} />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="wio-loading">Loading inspection officers…</div>
          ) : filteredOfficers.length === 0 ? (
            <div className="wio-empty">
              <div className="wio-empty-icon"><FiUsers size={24} /></div>
              {officers.length === 0
                ? 'No officers added yet. Click "Add Officer" to create one.'
                : "No records match the selected filters."}
            </div>
          ) : (
            <div className="wio-table-wrap">
              <table className="wio-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>District</th>
                    <th>Taluka</th>
                    <th>Ward</th>
                    <th>Status</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOfficers.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <div className="wio-avatar-cell">
                          <div className="wio-avatar">{(o.fullname || "?").charAt(0).toUpperCase()}</div>
                          <div>
                            <div className="wio-fullname">{o.fullname}</div>
                            <div className="wio-username">@{o.username}</div>
                          </div>
                        </div>
                      </td>
                      <td>{o.mobile}</td>
                      <td><span className="wio-district-pill"><FiMapPin size={11} /> {o.district}</span></td>
                      <td>
                        {o.taluka
                          ? <span className="wio-taluka-pill"><FiHome size={11} /> {o.taluka}</span>
                          : "—"}
                      </td>
                      <td>{o.ward || "—"}</td>
                      <td>
                        <span className={`wio-status-pill ${o.mobile ? "active" : "inactive"}`}>
                          {o.mobile ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>{o.created_at ? new Date(o.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="wio-overlay" onClick={closeModal}>
          <div className="wio-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wio-modal-head">
              <div className="wio-modal-brand">
                <div className="wio-modal-icon">
                  <img src={wcdLogo} alt="WCD" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 13 }} />
                </div>
                <div>
                  <div className="wio-modal-title">Add Inspection Officer</div>
                  <div className="wio-modal-sub">Create new field-level officer access</div>
                </div>
              </div>
              <button className="wio-modal-close" onClick={closeModal}><FiX size={16} /></button>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Basic Info */}
              <div className="wio-section-divider">Basic Info</div>

              <div className="wio-fld">
                <label className="wio-flbl">Full Name</label>
                <div className="wio-fwrap">
                  <span className="wio-ficon"><FiUser size={15} /></span>
                  <input className="wio-finput" placeholder="e.g. Suresh Jadhav" value={form.fullname} onChange={update("fullname")} />
                </div>
              </div>

              <div className="wio-fld">
                <label className="wio-flbl">Username</label>
                <div className="wio-fwrap">
                  <span className="wio-ficon"><FiUser size={15} /></span>
                  <input className="wio-finput" placeholder="e.g. officer_pune1" value={form.username} onChange={update("username")} />
                </div>
              </div>

              <div className="wio-two-col">
                <div className="wio-fld">
                  <label className="wio-flbl">Mobile Number</label>
                  <div className="wio-fwrap">
                    <span className="wio-ficon"><FiPhone size={15} /></span>
                    <input
                      className="wio-finput" placeholder="10 digit" maxLength={10}
                      value={form.mobile}
                      onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                    />
                  </div>
                </div>

                <div className="wio-fld">
                  <label className="wio-flbl">Password</label>
                  <div className="wio-fwrap">
                    <span className="wio-ficon"><FiLock size={15} /></span>
                    <input
                      className="wio-finput" type={showPass ? "text" : "password"}
                      placeholder="Create password" value={form.password} onChange={update("password")}
                      style={{ paddingRight: 40 }}
                    />
                    <button type="button" className="wio-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                      {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="wio-section-divider">Location</div>

              {/* State — full width */}
              <div className="wio-fld">
                <label className="wio-flbl">State</label>
                <div className="wio-fwrap">
                  <span className="wio-ficon"><FiBriefcase size={15} /></span>
                  <input className="wio-finput" placeholder="Maharashtra" value={form.state} onChange={update("state")} />
                </div>
              </div>

              {/* District + Taluka — side by side, taluka is dropdown */}
              <div className="wio-two-col">
                <div className="wio-fld">
                  <label className="wio-flbl">District</label>
                  <div className="wio-fwrap">
                    <span className="wio-ficon"><FiMapPin size={15} /></span>
                    <select
                      className="wio-finput"
                      value={form.district}
                      onChange={handleDistrictChange}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="">Select District</option>
                      {MH_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="wio-fld">
                  <label className="wio-flbl">Taluka</label>
                  <div className="wio-fwrap">
                    <span className="wio-ficon"><FiHome size={15} /></span>
                    <select
                      className="wio-finput"
                      value={form.taluka}
                      onChange={update("taluka")}
                      disabled={!form.district}
                      style={{ cursor: form.district ? "pointer" : "not-allowed" }}
                    >
                      <option value="">
                        {form.district ? "Select Taluka" : "Select District First"}
                      </option>
                      {modalTalukas.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  {!form.district && (
                    <div className="wio-taluka-hint">⬅ आधी District निवडा</div>
                  )}
                </div>
              </div>

              {/* Ward — full width, dropdown A–K + None */}
              <div className="wio-fld">
                <label className="wio-flbl">Ward (Optional)</label>
                <div className="wio-fwrap">
                  <span className="wio-ficon"><FiMapPin size={15} /></span>
                  <select
                    className="wio-finput"
                    value={form.ward}
                    onChange={update("ward")}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">-- Select Ward --</option>
                    {WARD_OPTIONS.map((w) => (
                      <option key={w} value={w === "None" ? "" : w}>
                        {w === "None" ? "None (No Ward)" : `Ward ${w}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="wio-modal-btnrow">
                <button type="button" className="wio-modal-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="wio-modal-submit" disabled={submitting}>
                  {submitting ? "Adding..." : <><FiCheckCircle size={16} /> Add Officer</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}