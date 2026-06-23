import React, { useState, useEffect } from "react";
import JansanwadAppform from "./JansanwadAppform";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
const statusConfig = {
  Pending:      { dot: "bg-yellow-400", text: "text-yellow-700", bg: "bg-yellow-50",  border: "border-yellow-200", label: "Pending"     },
  Resolved:     { dot: "bg-green-500",  text: "text-green-700",  bg: "bg-green-50",   border: "border-green-200",  label: "Resolved"    },
  Rejected:     { dot: "bg-red-500",    text: "text-red-700",    bg: "bg-red-50",     border: "border-red-200",    label: "Rejected"    },
  "In Progress":{ dot: "bg-blue-500",   text: "text-blue-700",   bg: "bg-blue-50",    border: "border-blue-200",   label: "In Progress" },
};

const priorityConfig = {
  Normal:    { color: "text-gray-600",   bg: "bg-gray-100",    border: "border-gray-200"   },
  Urgent:    { color: "text-orange-700", bg: "bg-orange-50",   border: "border-orange-200" },
  Emergency: { color: "text-red-700",    bg: "bg-red-50",      border: "border-red-200"    },
  High:      { color: "text-red-700",    bg: "bg-red-50",      border: "border-red-200"    },
};

const avatarColors = [
  "bg-blue-500","bg-teal-500","bg-violet-500",
  "bg-pink-500","bg-amber-500","bg-cyan-500","bg-emerald-500","bg-rose-500",
];

function Avatar({ name, index }) {
  const initials = name ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const color = avatarColors[index % avatarColors.length];
  return (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm ring-2 ring-white`}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig["Pending"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const cfg = priorityConfig[priority] || priorityConfig["Normal"];
  const icon = (priority === "Urgent" || priority === "Emergency" || priority === "High") ? "🔴" : "⚪";
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
      {icon} {priority}
    </span>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "--";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─────────────────────────────────────────────
//  REPLY MODAL
// ─────────────────────────────────────────────
function ReplyModal({ record, onClose, onSubmit }) {
  const [replyText, setReplyText]     = useState("");
  const [newStatus, setNewStatus]     = useState(record.status || "Pending");
  const [newPriority, setNewPriority] = useState(record.priority || "Normal");
  const [submitting, setSubmitting]   = useState(false);

  if (!record) return null;

  const handleSubmit = async () => {
    if (!replyText.trim()) {
      alert("कृपया reply message लिहा.");
      return;
    }
    setSubmitting(true);
    await onSubmit({
      applicationId: record._id,
      replyMessage:  replyText,
      status:        newStatus,
      priority:      newPriority,
    });
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-indigo-600 to-blue-600 rounded-t-2xl">
          <div>
            <p className="text-xs text-indigo-200 font-medium tracking-wide uppercase">Reply to Application</p>
            <h2 className="text-lg font-bold text-white">{record.inwardNo} — {record.fullName}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition-colors text-sm"
          >✕</button>
        </div>

        <div className="p-6 space-y-5">

          {/* Applicant quick info */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div>
              <p className="text-xs text-gray-400">Applicant</p>
              <p className="font-medium text-gray-800">{record.fullName || "--"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Mobile</p>
              <p className="font-medium text-gray-800">{record.mobile || "--"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Subject</p>
              <p className="font-medium text-gray-800">{record.subject || "--"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Office</p>
              <p className="font-medium text-gray-800">{record.office || "--"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Submitted By</p>
              <p className="font-medium text-gray-800">
                {record.submittedByName || "--"}
                {record.submittedByRole && (
                  <span className="ml-1.5 text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    {record.submittedByRole}
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Submitted On</p>
              <p className="font-medium text-gray-800">{record.submissionDate ? new Date(record.submissionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "--"}</p>
            </div>
          </div>

          {/* Status Change */}
          <div>
            <label className="block text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1.5">
              Status बदला
            </label>
            <div className="flex flex-wrap gap-2">
              {["Pending", "In Progress", "Resolved", "Rejected"].map((s) => {
                const cfg = statusConfig[s];
                const active = newStatus === s;
                return (
                  <button
                    key={s}
                    onClick={() => setNewStatus(s)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all
                      ${active ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-2 ring-offset-1 ring-blue-400` : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Change — Resolved असेल तर लपवा */}
          {newStatus !== "Resolved" && (
          <div>
            <label className="block text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1.5">
              Priority बदला
            </label>
            <div className="flex flex-wrap gap-2">
              {["Normal", "High", "Urgent", "Emergency"].map((p) => {
                const cfg = priorityConfig[p];
                const active = newPriority === p;
                return (
                  <button
                    key={p}
                    onClick={() => setNewPriority(p)}
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold border transition-all
                      ${active ? `${cfg.bg} ${cfg.color} ${cfg.border} ring-2 ring-offset-1 ring-blue-400` : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}
                  >
                    {p === "Normal" ? "⚪" : "🔴"} {p}
                  </button>
                );
              })}
            </div>
          </div>
          )}

          {/* Reply Message */}
          <div>
            <label className="block text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1.5">
              Reply Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Applicant ला reply message लिहा..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{replyText.length} characters</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl hover:from-indigo-700 hover:to-blue-700 disabled:opacity-60 transition-all shadow-md flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>📨 Send Reply</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  DETAIL MODAL (unchanged)
// ─────────────────────────────────────────────
function DetailModal({ record, onClose }) {
  if (!record) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
          <div>
            <p className="text-xs text-blue-200 font-medium tracking-wide uppercase">Application Detail</p>
            <h2 className="text-lg font-bold text-white">{record.inwardNo}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition-colors text-sm">✕</button>
        </div>
        <div className="p-6 space-y-5">
          <Section title="Citizen Details">
            <Row label="Full Name"  value={record.fullName} />
            <Row label="Mobile"     value={record.mobile} />
            <Row label="Email"      value={record.email} />
            <Row label="Category"   value={record.category} />
            <Row label="Ward No"    value={record.wardNo} />
            <Row label="Address"    value={record.address} />
            <Row label="Pincode"    value={record.pincode} />
            <Row label="Taluka"     value={record.taluka} />
            <Row label="District"   value={record.district} />
          </Section>
          <Section title="Identity">
            <Row label="Type"   value={record.identityType} />
            <Row label="Number" value={record.identityNumber} />
          </Section>
          <Section title="Complaint">
            <Row label="Subject"     value={record.subject} />
            <Row label="Description" value={record.description} />
          </Section>
          <Section title="Office & Workflow">
            <Row label="Office"          value={record.office} />
            <Row label="Main Department" value={record.mainDepartment} />
            <Row label="Sub Department"  value={record.subDepartment} />
            {record.status !== "Resolved" && <Row label="Priority" value={record.priority} />}
            <Row label="Tag To"          value={Array.isArray(record.tagTo) ? record.tagTo.join(", ") : record.tagTo} />
            <Row label="Follow Up"       value={record.followUp} />
            <Row label="Status"          value={record.status} />
            <Row label="Submitted On"    value={formatDate(record.submissionDate)} />
            {/* Resolved By */}
            {record.status === "Resolved" && (() => {
              const resolvedReply = record.replies?.find((r) => r.status === "Resolved");
              if (!resolvedReply) return null;
              return (
                <>
                  <Row label="Resolved By"   value={resolvedReply.repliedByName || "—"} />
                  <Row label="Resolved Role"  value={resolvedReply.repliedByRole || "—"} />
                  <Row label="Resolved On"    value={resolvedReply.createdAt ? new Date(resolvedReply.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "—"} />
                </>
              );
            })()}
          </Section>
          {record.documents && (
            <Section title="Document">
              <a href={record.documents} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                📄 View Document
              </a>
            </Section>
          )}

          {/* ── REPLIES / RESOLVED BY ── */}
          {record.replies && record.replies.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
                Replies ({record.replies.length})
              </p>
              <div className="space-y-3">
                {record.replies.map((reply, i) => {
                  const cfg = statusConfig[reply.status] || statusConfig["Pending"];
                  const isResolved = reply.status === "Resolved";
                  return (
                    <div key={i} className={`rounded-xl border px-4 py-3 ${isResolved ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {/* Avatar */}
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${isResolved ? "bg-green-500" : "bg-indigo-500"}`}>
                            {reply.repliedByName ? reply.repliedByName.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() : "?"}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-800 leading-tight">
                              {reply.repliedByName || "—"}
                            </div>
                            {reply.repliedByRole && (
                              <div className="text-xs text-indigo-600 font-semibold">{reply.repliedByRole}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {reply.status && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              {reply.status}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {reply.createdAt ? new Date(reply.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed pl-9 ${isResolved ? "text-green-800" : "text-gray-700"}`}>
                        {reply.replyMessage}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">{title}</p>
      <div className="bg-gray-50 rounded-xl px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value || "--"}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
export default function AllApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected]         = useState(null);   // Detail Modal
  const [replyTarget, setReplyTarget]   = useState(null);   // Reply Modal

  const navigate = useNavigate();

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const authUserRaw = localStorage.getItem("authUser");
      const authUser    = authUserRaw ? JSON.parse(authUserRaw) : null;

      const res = await axiosInstance.get("/getAllApplications", {
        params: {
          role:                   authUser?.role,
          userId:                 authUser?.id,
          userOffice:             authUser?.office,
          userDepartmentCategory: authUser?.departmentCategory,
        }
      });

      const data = res.data;
      if (data.success) setApplications(data.data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Reply Submit ──
  const handleReplySubmit = async ({ applicationId, replyMessage, status, priority }) => {
    try {
      const authUserRaw = localStorage.getItem("authUser");
      const authUser    = authUserRaw ? JSON.parse(authUserRaw) : null;

      // authUser मध्ये submittedByName / submittedByRole keys आहेत
      const repliedByName = authUser?.submittedByName || authUser?.name || authUser?.fullName || "";
      const repliedByRole = authUser?.submittedByRole || authUser?.role || "";
      const repliedById   = authUser?.submittedById   || authUser?.id  || "";

      await axiosInstance.post("/replyApplication", {
        applicationId,
        replyMessage,
        status,
        priority,
        repliedBy:     repliedById,
        repliedByName: repliedByName,
        repliedByRole: repliedByRole,
      });

      // Local state update
      const newReply = {
        replyMessage,
        status,
        priority,
        repliedBy:     repliedById,
        repliedByName: repliedByName,
        repliedByRole: repliedByRole,
        createdAt:     new Date().toISOString(),
      };
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status, priority, replies: [...(app.replies || []), newReply] }
            : app
        )
      );

      alert("✅ Reply यशस्वीरित्या पाठवली!");
      setReplyTarget(null);
    } catch (err) {
      console.error("Reply error:", err);
      alert("❌ Reply पाठवताना error आला. पुन्हा try करा.");
    }
  };

  const filtered = applications.filter((app) => {
    const matchSearch =
      !search ||
      app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      app.inwardNo?.toLowerCase().includes(search.toLowerCase()) ||
      app.subject?.toLowerCase().includes(search.toLowerCase()) ||
      app.mobile?.includes(search);
    const matchStatus = statusFilter === "All" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = ["All", "Pending", "In Progress", "Resolved", "Rejected"].map((s) => ({
    label: s,
    count: s === "All" ? applications.length : applications.filter((a) => a.status === s).length,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              All Applications
              <span className="text-base font-bold text-blue-600 bg-blue-100 px-3 py-0.5 rounded-full border border-blue-200">
                {applications.length}
              </span>
            </h1>
            <p className="text-base font-medium text-gray-500 mt-1">Janata Darbar — Inward Records</p>
          </div>
          {/* <button onClick={fetchApplications}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all">
            🔄 Refresh
          </button> */}
          <div className="flex items-center gap-3">
  <button onClick={fetchApplications}
    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all">
    🔄 Refresh
  </button>
  <button onClick={() => navigate("/Jansanwadappform")}
  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all">
  ➕ Add
</button>
</div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-5 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input type="text" placeholder="Search by name, inward no, subject..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" />
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {statusCounts.map(({ label, count }) => (
              <button key={label} onClick={() => setStatusFilter(label)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${statusFilter === label ? "bg-white text-blue-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
                {label}
                <span className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${statusFilter === label ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4, overflow: "hidden", boxShadow: "0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px rgba(0,0,0,.14),0 1px 3px rgba(0,0,0,.12)", fontFamily: "'Roboto','Segoe UI',sans-serif" }}>
          <style>{`
            .mui-th { padding: 0 16px; height: 56px; font-weight: 500; font-size: .875rem; color: rgba(0,0,0,.87); text-align: left; white-space: nowrap; background: #fff; border-bottom: 1px solid rgba(224,224,224,1); }
            .mui-tr { border-bottom: 1px solid rgba(224,224,224,1); cursor: pointer; transition: background .15s; }
            .mui-tr:last-child { border-bottom: none; }
            .mui-tr:hover { background: rgba(0,0,0,.04) !important; }
            .mui-td { padding: 0 16px; height: 52px; vertical-align: middle; font-size: .875rem; }
            .inward-chip { display:inline-block; padding: 2px 8px; background:#f5f5f5; border:1px solid #e0e0e0; border-radius:4px; font-family:monospace; font-size:.8125rem; color:rgba(0,0,0,.7); }
            .doc-link { display:inline-flex; align-items:center; gap:4px; color:#1976d2; font-size:.875rem; font-weight:500; text-decoration:none; padding:4px 8px; border-radius:4px; }
            .doc-link:hover { background:rgba(25,118,210,.08); }
            .reply-btn { display:inline-flex; align-items:center; gap:4px; color:#fff; background:#4f46e5; font-size:.8125rem; font-weight:600; border:none; padding:5px 12px; border-radius:6px; cursor:pointer; transition:background .15s; }
            .reply-btn:hover { background:#4338ca; }
            .mui-footer { display:flex; align-items:center; justify-content:space-between; padding:0 16px; height:52px; border-top:1px solid rgba(224,224,224,1); font-size:.875rem; color:rgba(0,0,0,.6); }
          `}</style>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Reply","#","Applicant","Inward No","Status","Subject","Office","Priority","Date","Submitted By","Reply By","Document"].map((h) => (
                    <th key={h} className="mui-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={12} style={{ textAlign: "center", padding: "64px 0", color: "rgba(0,0,0,.38)" }}>
                      <div style={{ width: 32, height: 32, margin: "0 auto 12px", border: "3px solid #e0e0e0", borderTopColor: "#1976d2", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                      <div>Loading applications…</div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={12} style={{ textAlign: "center", padding: "64px 0", color: "rgba(0,0,0,.38)" }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>📭</div>
                      <div>No applications found</div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((app, index) => {
                    // शेवटची reply शोधा (resolvedBy साठी)
                    const lastReply = app.replies && app.replies.length > 0
                      ? app.replies[app.replies.length - 1]
                      : null;
                    const resolvedReply = app.replies?.find((r) => r.status === "Resolved") || null;

                    return (
                    <tr
                      key={app._id}
                      onClick={() => setSelected(app)}
                      className="mui-tr"
                      style={{ background: index % 2 === 0 ? "#fff" : "#fafafa" }}
                    >
                      {/* ── REPLY BUTTON — पहिला column ── */}
                      <td className="mui-td" style={{ width: 90 }} onClick={(e) => e.stopPropagation()}>
                        <button
                          className="reply-btn"
                          onClick={() => setReplyTarget(app)}
                        >
                          📨 Reply
                        </button>
                      </td>

                      <td className="mui-td" style={{ color: "rgba(0,0,0,.54)", width: 60 }}>{index + 1}</td>
                      <td className="mui-td" style={{ minWidth: 180 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <Avatar name={app.fullName} index={index} />
                          <div>
                            <div style={{ fontSize: ".75rem", color: "rgba(0,0,0,.54)", marginTop: 1 }}>{app.mobile}</div>
                            <div style={{ fontSize: ".875rem", fontWeight: 400, color: "rgba(0,0,0,.87)", lineHeight: 1.4 }}>{app.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="mui-td" style={{ width: 130 }}><span className="inward-chip">{app.inwardNo}</span></td>
                      <td className="mui-td" style={{ width: 110 }}><StatusBadge status={app.status} /></td>
                      <td className="mui-td" style={{ minWidth: 160, maxWidth: 200 }}>
                        <div style={{ fontSize: ".875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }}>{app.subject || "—"}</div>
                        <div style={{ fontSize: ".75rem", color: "rgba(0,0,0,.54)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }}>{app.office}</div>
                      </td>
                      <td className="mui-td" style={{ minWidth: 140, maxWidth: 180 }}>
                        <div style={{ fontSize: ".875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{app.mainDepartment || "—"}</div>
                        <div style={{ fontSize: ".75rem", color: "rgba(0,0,0,.54)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{app.subDepartment}</div>
                      </td>
                      <td className="mui-td" style={{ width: 100 }}>{app.status !== "Resolved" ? <PriorityBadge priority={app.priority} /> : <span style={{ color: "rgba(0,0,0,.26)" }}>—</span>}</td>
                      <td className="mui-td" style={{ width: 110, whiteSpace: "nowrap" }}>{formatDate(app.submissionDate)}</td>

                      {/* ── SUBMITTED BY ── */}
                      <td className="mui-td" style={{ minWidth: 150 }}>
                        {app.submittedByName ? (
                          <div>
                            <div style={{ fontSize: ".8125rem", fontWeight: 600, color: "rgba(0,0,0,.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 130 }}>
                              {app.submittedByName}
                            </div>
                            {app.submittedByRole && (
                              <div style={{ fontSize: ".7rem", color: "rgba(0,0,0,.4)", whiteSpace: "nowrap" }}>
                                {app.submittedByRole}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: "rgba(0,0,0,.26)" }}>—</span>
                        )}
                      </td>

                      {/* ── REPLY BY — फक्त पहिला ── */}
                      <td className="mui-td" style={{ minWidth: 150 }}>
                        {app.replies && app.replies.length > 0 ? (() => {
                          const firstReply = app.replies[0];
                          const isResolved = firstReply.status === "Resolved";
                          const moreCount  = app.replies.length - 1;
                          return (
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: isResolved ? "#22c55e" : "#6366f1", display: "inline-block" }} />
                                <div style={{ fontSize: ".8125rem", fontWeight: 600, color: isResolved ? "#15803d" : "rgba(0,0,0,.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 120 }}>
                                  {firstReply.repliedByName || "—"}
                                </div>
                              </div>
                              {firstReply.repliedByRole && (
                                <div style={{ fontSize: ".7rem", color: "rgba(0,0,0,.4)", whiteSpace: "nowrap", paddingLeft: 11 }}>
                                  {firstReply.repliedByRole}
                                </div>
                              )}
                              {moreCount > 0 && (
                                <div style={{ fontSize: ".7rem", color: "#6366f1", fontWeight: 600, paddingLeft: 11, marginTop: 1 }}>
                                  +{moreCount} more
                                </div>
                              )}
                            </div>
                          );
                        })() : (
                          <span style={{ color: "rgba(0,0,0,.26)" }}>—</span>
                        )}
                      </td>

                      <td className="mui-td" style={{ width: 80 }} onClick={(e) => e.stopPropagation()}>
                        {app.documents ? (
                          <a href={app.documents} target="_blank" rel="noreferrer" className="doc-link">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="#1976d2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                            View
                          </a>
                        ) : (
                          <span style={{ color: "rgba(0,0,0,.26)" }}>—</span>
                        )}
                      </td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length > 0 && (
            <div className="mui-footer">
              <span>Showing <strong style={{ color: "rgba(0,0,0,.87)" }}>{filtered.length}</strong> of{" "}
                <strong style={{ color: "rgba(0,0,0,.87)" }}>{applications.length}</strong> applications</span>
              <span style={{ color: "rgba(0,0,0,.38)", fontSize: ".8125rem" }}>👆 Click any row to view full details</span>
            </div>
          )}
        </div>

      </div>

      {/* Detail Modal */}
      {selected && <DetailModal record={selected} onClose={() => setSelected(null)} />}

      {/* Reply Modal */}
      {replyTarget && (
        <ReplyModal
          record={replyTarget}
          onClose={() => setReplyTarget(null)}
          onSubmit={handleReplySubmit}
        />
      )}
    </div>
  );
}