import React, { useState, useEffect } from "react";
import JansanwadAppform from "./JansanwadAppform";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

// ── Style constants (Availability.jsx palette) ────────────────────────────────
const C = {
  bg:         "#f0f4f0",
  white:      "#fff",
  dark:       "#1a4a2e",
  green:      "#1a7a4a",
  greenLight: "#e8f5ee",
  greenBadge: "#d4edda",
  greenBorder:"#c8e0cc",
  muted:      "#5a7a6a",
  rowHover:   "#f8fdf8",
  rowBorder:  "#eef4ee",
  red:        "#c0392b",
  redLight:   "#fdecea",
};

// ── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
  Pending:      { bg:"#fff8e1", color:"#b26a00", border:"#ffe082", dot:"#f59e0b", label:"Pending"     },
  Resolved:     { bg:C.greenLight, color:C.green, border:"#a8d5b5", dot:"#22c55e", label:"Resolved"   },
  Rejected:     { bg:C.redLight, color:C.red, border:"#f5c6cb", dot:C.red, label:"Rejected"           },
  "In Progress":{ bg:"#e8f0fe", color:"#1a4a8a", border:"#93c5fd", dot:"#3b82f6", label:"In Progress" },
};
function sc(status) { return statusConfig[status] || statusConfig["Pending"]; }

const priorityConfig = {
  Normal:    { color: C.muted,   bg: "#f0f4f0",  border: C.greenBorder },
  Urgent:    { color: "#b26a00", bg: "#fff8e1",  border: "#ffe082"     },
  Emergency: { color: C.red,     bg: C.redLight, border: "#f5c6cb"     },
  High:      { color: C.red,     bg: C.redLight, border: "#f5c6cb"     },
};

const AVATAR_COLORS = ["#6366f1","#0ea5e9","#f59e0b","#10b981","#ef4444","#8b5cf6","#ec4899","#14b8a6"];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < (name||"").length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function initials(name) {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}
function formatDate(dateStr) {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
}

// ── Badges ────────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = sc(status);
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:700, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, whiteSpace:"nowrap" }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:cfg.dot, display:"inline-block" }} />{cfg.label}
    </span>
  );
}
function PriorityBadge({ priority }) {
  const cfg = priorityConfig[priority] || priorityConfig["Normal"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 9px", borderRadius:8, fontSize:11, fontWeight:700, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}` }}>
      {(priority==="Urgent"||priority==="Emergency"||priority==="High")?"🔴":"⚪"} {priority}
    </span>
  );
}

// ── Mobile Card ───────────────────────────────────────────────────────────────
function AppCard({ app, onReply, onView }) {
  const cfg   = sc(app.status);
  const color = avatarColor(app.fullName);
  return (
    <div style={{ background:C.white, borderRadius:12, border:`1.5px solid ${C.greenBorder}`, padding:"14px 16px", marginBottom:10, boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}
      onClick={() => onView(app)}>
      {/* Top */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:40, height:40, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:14, flexShrink:0 }}>
            {initials(app.fullName)}
          </div>
          <div>
            <p style={{ margin:0, fontSize:14, fontWeight:700, color:C.dark }}>{app.fullName||"—"}</p>
            <p style={{ margin:0, fontSize:12, color:C.muted }}>{app.mobile||"—"}</p>
          </div>
        </div>
        <StatusBadge status={app.status} />
      </div>
      {/* Chips */}
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8, flexWrap:"wrap" }}>
        <span style={{ background:C.greenLight, color:C.green, borderRadius:6, padding:"2px 9px", fontSize:11, fontWeight:700, fontFamily:"monospace" }}>{app.tokenNo||"—"}</span>
        {app.status!=="Resolved"&&app.priority&&<PriorityBadge priority={app.priority}/>}
      </div>
      {app.subject&&<p style={{ margin:"0 0 8px", fontSize:13, color:C.dark, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{app.subject}</p>}
      {/* Meta */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"3px 10px", fontSize:11, color:C.muted, marginBottom:12 }}>
        {app.mainDepartment&&<span>🏢 {app.mainDepartment}</span>}
        {app.submissionDate&&<span>📅 {formatDate(app.submissionDate)}</span>}
        {app.submittedByName&&<span>👤 {app.submittedByName}</span>}
      </div>
      {/* Actions */}
      <div style={{ display:"flex", gap:8 }} onClick={e=>e.stopPropagation()}>
        <button onClick={()=>onReply(app)} style={{ flex:1, background:C.greenLight, border:`1.5px solid ${C.green}`, borderRadius:8, padding:"8px 0", cursor:"pointer", color:C.green, fontSize:13, fontWeight:700 }}>📨 Reply</button>
        <button onClick={()=>onView(app)}  style={{ flex:1, background:"#f8fdf8",    border:`1.5px solid ${C.greenBorder}`, borderRadius:8, padding:"8px 0", cursor:"pointer", color:C.dark,  fontSize:13, fontWeight:600 }}>👁 View</button>
        {app.documents&&(
          <a href={app.documents} target="_blank" rel="noreferrer" style={{ flex:1, background:C.greenLight, border:`1.5px solid ${C.greenBorder}`, borderRadius:8, padding:"8px 0", cursor:"pointer", color:C.green, fontSize:13, fontWeight:600, textDecoration:"none", textAlign:"center" }}>📄 Doc</a>
        )}
      </div>
    </div>
  );
}

// ── TOKEN CHECK MODAL ─────────────────────────────────────────────────────────
function TokenCheckModal({ onClose, onProceed }) {
  const [hasToken, setHasToken]       = useState(null);
  const [tokenInput, setTokenInput]   = useState("");
  const [fetching, setFetching]       = useState(false);
  const [fetchError, setFetchError]   = useState("");
  const [citizenData, setCitizenData] = useState(null);

  const handleFetchToken = async () => {
    if (!tokenInput.trim()) { setFetchError("कृपया Token Number टाका."); return; }
    setFetching(true); setFetchError(""); setCitizenData(null);
    try {
      const res = await axiosInstance.get(`/citizen/appointment/token/${tokenInput.trim()}`);
      if (res.data.success && res.data.appointment) setCitizenData(res.data.appointment);
      else setFetchError("Token सापडले नाही ❌");
    } catch (err) { setFetchError(err?.response?.data?.message || "Token fetch करताना error आला ❌"); }
    finally { setFetching(false); }
  };

  const handleProceed = () => {
    if (hasToken === "yes") { if (!citizenData) { setFetchError("आधी Token Fetch करा."); return; } onProceed(citizenData); }
    else { onProceed(null); }
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.45)", padding:16 }}>
      <div style={{ background:C.white, borderRadius:16, width:"100%", maxWidth:440, maxHeight:"92vh", overflowY:"auto", boxShadow:"0 8px 48px rgba(0,0,0,0.2)", fontFamily:"'Segoe UI', sans-serif" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:`2px solid ${C.greenBadge}`, background:C.greenLight, borderRadius:"16px 16px 0 0" }}>
          <div>
            <p style={{ margin:0, fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>New Application</p>
            <h3 style={{ margin:"3px 0 0", fontSize:18, fontWeight:700, color:C.dark }}>Token आहे का?</h3>
          </div>
          <button onClick={onClose} style={{ background:C.white, border:"none", borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:18, color:C.dark }}>✕</button>
        </div>
        <div style={{ padding:20 }}>
          <p style={{ margin:"0 0 14px", fontSize:13, fontWeight:600, color:C.muted }}>Already have token? (Citizen ने आधी appointment घेतली आहे का?)</p>
          <div style={{ display:"flex", gap:10, marginBottom:16 }}>
            {[["yes","✅ Yes"],["no","❌ No"]].map(([v,label])=>(
              <button key={v} onClick={()=>{setHasToken(v);setFetchError("");setCitizenData(null);setTokenInput("");}}
                style={{ flex:1, padding:"10px 0", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", border:`1.5px solid ${C.greenBorder}`, transition:"all .15s", background:hasToken===v?(v==="yes"?C.green:C.dark):C.white, color:hasToken===v?"#fff":C.muted }}>
                {label}
              </button>
            ))}
          </div>

          {hasToken === "yes" && (
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, fontWeight:700, color:C.dark, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.4 }}>Token Number</label>
              <div style={{ display:"flex", gap:8 }}>
                <input type="text" placeholder="e.g. VVCMC-20260323-0008" value={tokenInput}
                  onChange={e=>{setTokenInput(e.target.value);setFetchError("");setCitizenData(null);}}
                  onKeyDown={e=>{if(e.key==="Enter")handleFetchToken();}}
                  style={{ flex:1, padding:"9px 12px", fontSize:13, border:`1.5px solid ${C.greenBorder}`, borderRadius:8, outline:"none", color:C.dark, background:"#f8fdf8", fontFamily:"'Segoe UI', sans-serif", minWidth:0 }}
                />
                <button onClick={handleFetchToken} disabled={fetching}
                  style={{ padding:"9px 14px", background:fetching?"#888":C.green, color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:fetching?"not-allowed":"pointer", flexShrink:0 }}>
                  {fetching?"...":"🔍 Fetch"}
                </button>
              </div>
              {fetchError&&<p style={{ color:C.red, fontSize:12, marginTop:6, fontWeight:600 }}>{fetchError}</p>}
              {citizenData&&(
                <div style={{ marginTop:12, background:C.greenLight, border:`1.5px solid ${C.greenBorder}`, borderRadius:10, padding:"12px 14px" }}>
                  <p style={{ fontSize:11, fontWeight:700, color:C.green, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>✅ Citizen सापडला</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 14px", fontSize:12 }}>
                    {[["Name",citizenData.fullName],["Mobile",citizenData.mobileNumber],["Token",citizenData.tokenId],["Ward",citizenData.ward],["Date",citizenData.preferredDate],["Slot",citizenData.microSlot||citizenData.slotTime]].map(([k,v])=>(
                      <div key={k}><span style={{ color:C.muted, fontSize:11 }}>{k}</span><p style={{ margin:"2px 0 0", fontWeight:700, color:C.dark }}>{v||"--"}</p></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {hasToken === "no" && (
            <div style={{ background:"#f8fdf8", border:`1.5px solid ${C.greenBorder}`, borderRadius:10, padding:"12px 14px", fontSize:13, color:C.muted, marginBottom:14 }}>
              📝 रिकामा form उघडेल. Citizen ची माहिती manually भरावी लागेल.
            </div>
          )}
          {hasToken !== null && (
            <div style={{ display:"flex", gap:10, marginTop:8 }}>
              <button onClick={onClose} style={{ flex:1, background:"#f0f4f0", border:"none", borderRadius:8, padding:"11px 0", fontWeight:600, cursor:"pointer", color:C.dark, fontSize:13 }}>Cancel</button>
              <button onClick={handleProceed} disabled={hasToken==="yes"&&!citizenData}
                style={{ flex:2, background:(hasToken==="yes"&&!citizenData)?"#888":C.green, color:"#fff", border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:(hasToken==="yes"&&!citizenData)?"not-allowed":"pointer", fontSize:13 }}>
                ➕ Open Form
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── REPLY MODAL (bottom sheet on mobile) ─────────────────────────────────────
function ReplyModal({ record, onClose, onSubmit }) {
  const [replyText, setReplyText]     = useState("");
  const [newStatus, setNewStatus]     = useState(record.status || "Pending");
  const [newPriority, setNewPriority] = useState(record.priority || "Normal");
  const [submitting, setSubmitting]   = useState(false);
  const [replyDoc, setReplyDoc]       = useState(null);

  if (!record) return null;

  const handleSubmit = async () => {
    if (!replyText.trim()) { alert("कृपया reply message लिहा."); return; }
    setSubmitting(true);
    await onSubmit({ applicationId:record._id, replyMessage:replyText, status:newStatus, priority:newPriority, replyDocument:replyDoc });
    setSubmitting(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(0,0,0,0.45)" }}
      onClick={onClose}>
      <div style={{ background:C.white, borderRadius:"20px 20px 0 0", width:"100%", maxWidth:640, maxHeight:"95vh", overflowY:"auto", boxShadow:"0 -8px 48px rgba(0,0,0,0.2)", fontFamily:"'Segoe UI', sans-serif" }}
        onClick={e=>e.stopPropagation()}>

        {/* Drag handle */}
        <div style={{ width:40, height:4, borderRadius:2, background:C.greenBorder, margin:"10px auto 0" }} />

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", borderBottom:`2px solid ${C.greenBadge}`, background:C.greenLight }}>
          <div style={{ minWidth:0 }}>
            <p style={{ margin:0, fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>Reply to Application</p>
            <h3 style={{ margin:"3px 0 0", fontSize:15, fontWeight:700, color:C.dark, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{record.tokenNo} — {record.fullName}</h3>
          </div>
          <button onClick={onClose} style={{ background:C.white, border:"none", borderRadius:8, width:34, height:34, cursor:"pointer", fontSize:16, color:C.dark, flexShrink:0, marginLeft:10 }}>✕</button>
        </div>

        <div style={{ padding:"16px 20px" }}>
          {/* Quick info */}
          <div style={{ border:`1.5px solid ${C.greenBorder}`, borderRadius:10, overflow:"hidden", marginBottom:16 }}>
            {[["Applicant",record.fullName],["Mobile",record.mobile],["Subject",record.subject],["Office",record.office],
              ["Submitted By",record.submittedByName+(record.submittedByRole?` (${record.submittedByRole})`:"")] ,
              ["Submitted On",record.submissionDate?new Date(record.submissionDate).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"--"]
            ].filter(([,v])=>v).map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 14px", borderBottom:`1px solid ${C.rowBorder}`, fontSize:13, gap:8 }}>
                <span style={{ color:C.muted, fontWeight:600, flexShrink:0, minWidth:100 }}>{k}</span>
                <span style={{ color:C.dark, fontWeight:700, textAlign:"right", wordBreak:"break-word" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Status */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.dark, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:0.4 }}>Status बदला</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["Pending","In Progress","Resolved","Rejected"].map(s=>{
                const cfg=sc(s); const active=newStatus===s;
                return <button key={s} onClick={()=>setNewStatus(s)} style={{ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer", border:`1.5px solid ${active?cfg.border:C.greenBorder}`, background:active?cfg.bg:"#f8fdf8", color:active?cfg.color:C.muted, transition:"all .15s" }}>
                  <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:active?cfg.dot:"#a8c8b0", marginRight:4, verticalAlign:"middle" }}/>{s}
                </button>;
              })}
            </div>
          </div>

          {/* Priority */}
          {newStatus !== "Resolved" && (
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, fontWeight:700, color:C.dark, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:0.4 }}>Priority बदला</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {["Normal","High","Urgent","Emergency"].map(p=>{
                  const cfg=priorityConfig[p]||priorityConfig["Normal"]; const active=newPriority===p;
                  return <button key={p} onClick={()=>setNewPriority(p)} style={{ padding:"6px 12px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer", border:`1.5px solid ${active?cfg.border:C.greenBorder}`, background:active?cfg.bg:"#f8fdf8", color:active?cfg.color:C.muted, transition:"all .15s" }}>
                    {p==="Normal"?"⚪":"🔴"} {p}
                  </button>;
                })}
              </div>
            </div>
          )}

          {/* Reply text */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.dark, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:0.4 }}>Reply Message <span style={{ color:C.red }}>*</span></label>
            <textarea rows={4} placeholder="Applicant ला reply message लिहा..." value={replyText} onChange={e=>setReplyText(e.target.value)}
              style={{ width:"100%", padding:"10px 14px", fontSize:13, border:`1.5px solid ${C.greenBorder}`, borderRadius:8, outline:"none", fontFamily:"'Segoe UI', sans-serif", resize:"vertical", boxSizing:"border-box", color:C.dark, background:"#f8fdf8" }}
              onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.greenBorder}
            />
            <p style={{ fontSize:11, color:C.muted, textAlign:"right", margin:"4px 0 0" }}>{replyText.length} characters</p>
          </div>

          {/* File upload */}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.dark, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:0.4 }}>
              Reply Document <span style={{ color:C.muted, fontWeight:400, fontSize:11 }}>(Optional)</span>
            </label>
            <div style={{ border:`2px dashed ${C.greenBorder}`, borderRadius:10, padding:14, background:"#f8fdf8" }}>
              <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", flexWrap:"wrap" }}>
                <span style={{ padding:"7px 14px", background:C.green, color:"#fff", fontSize:12, fontWeight:700, borderRadius:8, whiteSpace:"nowrap" }}>
                  📎 Choose File
                  <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display:"none" }} onChange={e=>setReplyDoc(e.target.files[0]||null)} />
                </span>
                <span style={{ fontSize:13, color:C.muted, wordBreak:"break-all" }}>{replyDoc?replyDoc.name:"PDF, DOC, or Image"}</span>
              </label>
              {replyDoc&&(
                <div style={{ marginTop:10, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.white, border:`1.5px solid ${C.greenBorder}`, borderRadius:8, padding:"8px 12px" }}>
                  <div style={{ minWidth:0 }}>
                    <p style={{ margin:0, fontSize:12, fontWeight:700, color:C.green, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>✅ {replyDoc.name}</p>
                    <p style={{ margin:0, fontSize:11, color:C.muted }}>{(replyDoc.size/1024).toFixed(1)} KB</p>
                  </div>
                  <button onClick={()=>setReplyDoc(null)} style={{ background:"none", border:"none", cursor:"pointer", color:C.red, fontSize:18, fontWeight:700, flexShrink:0, marginLeft:8 }}>✕</button>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onClose} style={{ flex:1, background:"#f0f4f0", border:"none", borderRadius:8, padding:"12px 0", fontWeight:600, cursor:"pointer", color:C.dark, fontSize:14 }}>Cancel</button>
            <button onClick={handleSubmit} disabled={submitting} style={{ flex:2, background:submitting?"#888":C.green, color:"#fff", border:"none", borderRadius:8, padding:"12px 0", fontWeight:700, cursor:submitting?"not-allowed":"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {submitting?<><span style={{ width:13, height:13, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin .7s linear infinite", display:"inline-block" }}/>Sending…</>:"📨 Send Reply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DETAIL MODAL (bottom sheet) ───────────────────────────────────────────────
function DetailModal({ record, onClose }) {
  if (!record) return null;

  const InfoRow = ({ label, value }) => (
    <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 14px", borderBottom:`1px solid ${C.rowBorder}`, fontSize:13, gap:8 }}>
      <span style={{ color:C.muted, fontWeight:600, flexShrink:0, minWidth:110 }}>{label}</span>
      <span style={{ color:C.dark, fontWeight:700, textAlign:"right", wordBreak:"break-word" }}>{value||"--"}</span>
    </div>
  );
  const SectionTitle = ({ title }) => (
    <div style={{ padding:"8px 14px 6px", background:C.greenLight, borderBottom:`1px solid ${C.greenBorder}` }}>
      <span style={{ fontSize:11, fontWeight:700, color:C.green, textTransform:"uppercase", letterSpacing:1 }}>{title}</span>
    </div>
  );

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(0,0,0,0.45)" }}
      onClick={onClose}>
      <div style={{ background:C.white, borderRadius:"20px 20px 0 0", width:"100%", maxWidth:640, maxHeight:"95vh", overflowY:"auto", boxShadow:"0 -8px 48px rgba(0,0,0,0.2)", fontFamily:"'Segoe UI', sans-serif" }}
        onClick={e=>e.stopPropagation()}>

        <div style={{ width:40, height:4, borderRadius:2, background:C.greenBorder, margin:"10px auto 0" }} />

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", borderBottom:`2px solid ${C.greenBadge}`, background:C.greenLight }}>
          <div>
            <p style={{ margin:0, fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>Application Detail</p>
            <h3 style={{ margin:"3px 0 0", fontSize:16, fontWeight:700, color:C.dark }}>{record.tokenNo}</h3>
          </div>
          <button onClick={onClose} style={{ background:C.white, border:"none", borderRadius:8, width:34, height:34, cursor:"pointer", fontSize:16, color:C.dark }}>✕</button>
        </div>

        <div style={{ padding:"0 0 20px" }}>
          {[
            ["Citizen Details",[["Full Name",record.fullName],["Mobile",record.mobile],["Email",record.email],["Category",record.category],["Ward No",record.wardNo],["Address",record.address],["Pincode",record.pincode],["Taluka",record.taluka],["District",record.district]]],
            ["Identity",       [["Type",record.identityType],["Number",record.identityNumber]]],
            ["Complaint",      [["Subject",record.subject],["Description",record.description]]],
            ["Office & Workflow",[
              ["Office",record.office],["Main Department",record.mainDepartment],["Sub Department",record.subDepartment],
              ...(record.status!=="Resolved"?[["Priority",record.priority]]:[]),
              ["Tag To",Array.isArray(record.tagTo)?record.tagTo.join(", "):record.tagTo],
              ["Follow Up",record.followUp],["Status",record.status],["Submitted On",formatDate(record.submissionDate)],
              ...(record.status==="Resolved"?(()=>{const r=record.replies?.find(r=>r.status==="Resolved");return r?[["Resolved By",r.repliedByName],["Resolved Role",r.repliedByRole],["Resolved On",r.createdAt?new Date(r.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"—"]]:[];})():[]),
            ]],
          ].map(([title,rows])=>(
            <div key={title} style={{ border:`1.5px solid ${C.greenBorder}`, borderRadius:10, overflow:"hidden", margin:"14px 16px 0" }}>
              <SectionTitle title={title}/>
              {rows.filter(([,v])=>v).map(([k,v])=><InfoRow key={k} label={k} value={v}/>)}
            </div>
          ))}

          {record.documents&&(
            <div style={{ margin:"14px 16px 0", padding:"12px 14px", background:C.greenLight, border:`1.5px solid ${C.greenBorder}`, borderRadius:10 }}>
              <p style={{ margin:"0 0 8px", fontSize:11, fontWeight:700, color:C.green, textTransform:"uppercase", letterSpacing:1 }}>Document</p>
              <a href={record.documents} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"7px 14px", background:C.green, color:"#fff", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none" }}>📄 View Document</a>
            </div>
          )}

          {record.replies&&record.replies.length>0&&(
            <div style={{ margin:"14px 16px 0" }}>
              <p style={{ fontSize:11, fontWeight:700, color:C.green, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Replies ({record.replies.length})</p>
              {record.replies.map((reply,i)=>{
                const cfg=sc(reply.status); const isResolved=reply.status==="Resolved";
                return (
                  <div key={i} style={{ borderRadius:10, border:`1.5px solid ${isResolved?"#a8d5b5":C.greenBorder}`, padding:"12px 14px", background:isResolved?C.greenLight:"#f8fdf8", marginBottom:8 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8, flexWrap:"wrap", gap:6 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:isResolved?C.green:"#6366f1", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:700 }}>
                          {reply.repliedByName?reply.repliedByName.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase():"?"}
                        </div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{reply.repliedByName||"—"}</div>
                          {reply.repliedByRole&&<div style={{ fontSize:11, color:C.green, fontWeight:600 }}>{reply.repliedByRole}</div>}
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        {reply.status&&<span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:700, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}` }}><span style={{ width:5,height:5,borderRadius:"50%",background:cfg.dot }}/>{reply.status}</span>}
                        <span style={{ fontSize:11, color:C.muted }}>{reply.createdAt?new Date(reply.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):""}</span>
                      </div>
                    </div>
                    <p style={{ fontSize:13, color:isResolved?C.green:C.dark, margin:0, paddingLeft:36 }}>{reply.replyMessage}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PAGINATION COMPONENT ──────────────────────────────────────────────────────
function Pagination({ page, totalPages, total, limit, onPageChange, onLimitChange }) {
  if (totalPages <= 1 && total <= 10) return null;

  const pages = [];
  const delta = 2;
  const left  = Math.max(1, page - delta);
  const right = Math.min(totalPages, page + delta);

  if (left > 1)          { pages.push(1); if (left > 2) pages.push("..."); }
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages){ if (right < totalPages - 1) pages.push("..."); pages.push(totalPages); }

  const btnBase = { padding:"6px 12px", borderRadius:7, fontSize:13, fontWeight:600, cursor:"pointer", border:`1.5px solid ${C.greenBorder}`, transition:"all .15s", minWidth:36, textAlign:"center" };

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderTop:`1px solid ${C.rowBorder}`, flexWrap:"wrap", gap:10 }}>

      {/* ── Rows per page selector ── */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:12, color:C.muted, fontWeight:600, whiteSpace:"nowrap" }}>Rows per page:</span>
        <select value={limit} onChange={e => onLimitChange(Number(e.target.value))}
          style={{ padding:"5px 10px", fontSize:13, border:`1.5px solid ${C.greenBorder}`, borderRadius:7, outline:"none", color:C.dark, background:C.white, cursor:"pointer", fontFamily:"'Segoe UI', sans-serif" }}>
          {[10, 20, 50, 100].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span style={{ fontSize:12, color:C.muted, whiteSpace:"nowrap" }}>
          of <strong style={{ color:C.dark }}>{total}</strong>
        </span>
      </div>

      {/* ── Page buttons ── */}
      {totalPages > 1 && (
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
          <button onClick={()=>onPageChange(page-1)} disabled={page===1}
            style={{ ...btnBase, background:page===1?"#f0f4f0":C.white, color:page===1?"#aaa":C.green, cursor:page===1?"not-allowed":"pointer" }}>
            ‹ Prev
          </button>

          {pages.map((p,i)=>
            p === "..." ? (
              <span key={`dot-${i}`} style={{ padding:"6px 4px", fontSize:13, color:C.muted }}>…</span>
            ) : (
              <button key={p} onClick={()=>onPageChange(p)}
                style={{ ...btnBase, background:p===page?C.green:C.white, color:p===page?"#fff":C.dark, border:`1.5px solid ${p===page?C.green:C.greenBorder}` }}>
                {p}
              </button>
            )
          )}

          <button onClick={()=>onPageChange(page+1)} disabled={page===totalPages}
            style={{ ...btnBase, background:page===totalPages?"#f0f4f0":C.white, color:page===totalPages?"#aaa":C.green, cursor:page===totalPages?"not-allowed":"pointer" }}>
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AllApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected]         = useState(null);
  const [replyTarget, setReplyTarget]   = useState(null);
  const [showTokenCheck, setShowTokenCheck] = useState(false);
  const [showForm, setShowForm]             = useState(false);
  const [prefillData, setPrefillData]       = useState(null);
  const [toast, setToast]               = useState(null);

  // ── Pagination state ──
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]           = useState(0);
  const [limit, setLimit]           = useState(20);   // ← was const LIMIT = 20

  const navigate = useNavigate();

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => { fetchApplications(1, 20); }, []);

  // ── accepts both pageNum and limitNum ──
  const fetchApplications = async (pageNum = page, limitNum = limit) => {
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
          userDepartmentName:     authUser?.departmentName,
          page:                   pageNum,
          limit:                  limitNum,
        },
      });
      if (res.data.success) {
        setApplications(res.data.data || []);
        setTotal(res.data.total || 0);
        setTotalPages(res.data.totalPages || 1);
        setPage(pageNum);
      }
    } catch (err) { console.error("Error fetching applications:", err); }
    finally { setLoading(false); }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchApplications(newPage, limit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── NEW: reset to page 1 when limit changes ──
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchApplications(1, newLimit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddClick = () => setShowTokenCheck(true);

  const handleTokenCheckProceed = (citizenAppointment) => {
    setShowTokenCheck(false);
    if (citizenAppointment) {
      const normalizeWard = (ward) => ward ? ward.replace(/Ward\s+/i, "Ward-") : "";
      setPrefillData({
        fullName:     citizenAppointment.fullName     || "",
        mobile:       citizenAppointment.mobileNumber || "",
        email:        citizenAppointment.email        || "",
        address:      citizenAppointment.address      || "",
        pincode:      citizenAppointment.pincode      || "",
        wardNo:       citizenAppointment.ward         || "",
        ward:         normalizeWard(citizenAppointment.ward),
        visitorPhoto: citizenAppointment.visitorPhoto || "",
        _tokenId:       citizenAppointment.tokenId        || "",
        _citizenId:     citizenAppointment.citizenId      || "",
        _preferredDate: citizenAppointment.preferredDate  || "",
        _slotTime:      citizenAppointment.slotTime        || "",
        _microSlot:     citizenAppointment.microSlot       || "",
      });
    } else { setPrefillData(null); }
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setPrefillData(null);
    fetchApplications(page, limit);
  };

  const handleReplySubmit = async ({ applicationId, replyMessage, status, priority, replyDocument }) => {
    try {
      const authUserRaw = localStorage.getItem("authUser");
      const authUser    = authUserRaw ? JSON.parse(authUserRaw) : null;
      const repliedByName = authUser?.submittedByName || authUser?.name || authUser?.fullName || "";
      const repliedByRole = authUser?.submittedByRole || authUser?.role || "";
      const repliedById   = authUser?.submittedById   || authUser?.id  || "";
      const foundApp = applications.find(a => a._id === applicationId);
      const tokenNo  = foundApp?.tokenNo;
      if (!tokenNo) { showToast("Token No सापडले नाही ❌", "error"); return; }
      const apptRes = await axiosInstance.get(`/citizen/appointment/token/${tokenNo}`).catch(() => null);
      if (!apptRes?.data?.appointment?._id) { showToast("Citizen Appointment सापडले नाही ❌", "error"); return; }
      const citizenApptId = apptRes.data.appointment._id;
      const formData = new FormData();
      formData.append("status",        status.toLowerCase());
      formData.append("adminNote",     replyMessage);
      formData.append("replyMessage",  replyMessage);
      formData.append("priority",      priority);
      formData.append("repliedBy",     repliedById);
      formData.append("repliedByName", repliedByName);
      formData.append("repliedByRole", repliedByRole);
      if (replyDocument) formData.append("replyDocument", replyDocument);
      await axiosInstance.patch(`/citizen/admin/update-status/${citizenApptId}`, formData, { headers:{"Content-Type":"multipart/form-data"} });
      const newReply = { replyMessage, status, priority, repliedBy:repliedById, repliedByName, repliedByRole, createdAt:new Date().toISOString() };
      setApplications(prev => prev.map(app => app._id===applicationId ? { ...app, status, priority, replies:[...(app.replies||[]),newReply] } : app));
      showToast("Reply यशस्वीरित्या पाठवली! ✅");
      setReplyTarget(null);
    } catch (err) {
      console.error("Reply error:", err);
      showToast(err?.response?.data?.message || "Reply पाठवताना error आला ❌", "error");
    }
  };

  const filtered = applications.filter(app => {
    const matchSearch = !search ||
      app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      app.inwardNo?.toLowerCase().includes(search.toLowerCase()) ||
      app.subject?.toLowerCase().includes(search.toLowerCase()) ||
      app.mobile?.includes(search);
    const matchStatus = statusFilter === "All" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = ["All","Pending","In Progress","Resolved","Rejected"].map(s => ({
    label: s,
    count: s==="All" ? total : applications.filter(a=>a.status===s).length,
  }));

  return (
    <div style={{ fontFamily:"'Segoe UI', sans-serif", background:C.bg, minHeight:"100vh", padding:"16px" }}>

      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }

        .desk-table { display: block; }
        .mob-cards   { display: none; }

        @media (max-width: 768px) {
          .desk-table { display: none !important; }
          .mob-cards  { display: block !important; }
          .hdr-row   { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .hdr-btns  { width: 100%; display: flex !important; gap: 8px; }
          .hdr-btns button { flex: 1; }
          .flt-bar   { flex-direction: column !important; gap: 10px !important; }
          .flt-tabs  { overflow-x: auto !important; flex-wrap: nowrap !important; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
          .flt-tabs::-webkit-scrollbar { height: 3px; }
          .flt-tabs::-webkit-scrollbar-thumb { background: #c8e0cc; border-radius: 2px; }
          .srch-wrap { width: 100% !important; }
          .toast-box { left: 12px !important; right: 12px !important; }
        }

        @media (max-width: 480px) {
          .page-title { font-size: 20px !important; }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="toast-box" style={{ position:"fixed", top:16, right:16, zIndex:9999, background:toast.type==="success"?C.green:C.red, color:"#fff", padding:"12px 18px", borderRadius:10, boxShadow:"0 4px 16px rgba(0,0,0,0.2)", fontSize:14, fontWeight:600, animation:"fadeIn 0.3s ease" }}>
          {toast.msg}
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="hdr-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
        <div>
          <h1 className="page-title" style={{ margin:0, fontSize:24, fontWeight:700, color:C.dark, display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            All Applications
            <span style={{ background:C.greenBadge, color:C.green, borderRadius:20, padding:"2px 10px", fontSize:13, fontWeight:700 }}>{total}</span>
          </h1>
          <p style={{ margin:"4px 0 0", color:C.muted, fontSize:13 }}>जन संवाद - Applications</p>
        </div>
        <div className="hdr-btns" style={{ display:"flex", gap:10 }}>
          <button onClick={()=>fetchApplications(page, limit)} style={{ background:C.white, color:C.green, border:`2px solid ${C.green}`, borderRadius:8, padding:"9px 16px", fontWeight:600, fontSize:13, cursor:"pointer" }}>🔄 Refresh</button>
          <button onClick={handleAddClick}                     style={{ background:C.green, color:"#fff", border:"none", borderRadius:8, padding:"9px 16px", fontWeight:600, fontSize:13, cursor:"pointer" }}>➕ Add</button>
        </div>
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div style={{ background:C.white, borderRadius:12, padding:"12px 16px", marginBottom:14, boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
        <div className="flt-bar" style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div className="srch-wrap" style={{ position:"relative", flex:1 }}>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:14, color:C.muted }}>🔍</span>
            <input type="text" placeholder="Search by name, inward no, subject..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ width:"100%", padding:"9px 12px 9px 32px", fontSize:13, border:`1.5px solid ${C.greenBorder}`, borderRadius:8, outline:"none", color:C.dark, background:"#f8fdf8", boxSizing:"border-box", fontFamily:"'Segoe UI', sans-serif" }}
            />
          </div>
          <div className="flt-tabs" style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {statusCounts.map(({label,count})=>(
              <button key={label} onClick={()=>setStatusFilter(label)}
                style={{ padding:"7px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer", border:statusFilter===label?"none":`1.5px solid ${C.greenBorder}`, background:statusFilter===label?C.green:C.white, color:statusFilter===label?"#fff":C.muted, transition:"all .15s", whiteSpace:"nowrap" }}>
                {label} <span style={{ marginLeft:4, fontSize:11, fontWeight:700, background:statusFilter===label?"rgba(255,255,255,0.25)":C.greenBadge, color:statusFilter===label?"#fff":C.green, padding:"1px 6px", borderRadius:10 }}>{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="desk-table" style={{ background:C.white, borderRadius:12, boxShadow:"0 2px 12px rgba(0,0,0,0.07)", overflowX:"auto" }}>
        <div style={{ display:"flex", alignItems:"center", padding:"14px 20px 12px", borderBottom:`2px solid ${C.greenBadge}` }}>
          <h3 style={{ margin:0, fontSize:16, fontWeight:700, color:C.dark }}>
            Application Records
            <span style={{ background:C.greenBadge, color:C.green, borderRadius:20, padding:"2px 10px", fontSize:12, marginLeft:8 }}>{total}</span>
          </h3>
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:60, color:"#888" }}><div style={{ fontSize:32, marginBottom:12 }}>⏳</div>Loading applications...</div>
        ) : (
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:1200 }}>
            <thead>
              <tr style={{ background:"#f0f7f2" }}>
                {["Reply","#","Applicant","Token No","Status","Subject","Department","Priority","Date","Submitted By","Reply By","Document"].map(h=>(
                  <th key={h} style={{ padding:"12px 14px", textAlign:"left", fontSize:12, fontWeight:700, color:C.dark, borderBottom:`2px solid ${C.greenBadge}`, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={12} style={{ textAlign:"center", padding:48, color:"#888", fontSize:14 }}>
                  <div style={{ fontSize:36, marginBottom:10 }}>📭</div>
                  {search?"No matching applications found.":"No applications yet."}
                </td></tr>
              ) : filtered.map((app,index)=>(
                <tr key={app._id} style={{ borderBottom:`1px solid ${C.rowBorder}`, cursor:"pointer" }}
                  onMouseOver={e=>e.currentTarget.style.background=C.rowHover}
                  onMouseOut={e=>e.currentTarget.style.background="transparent"}
                  onClick={()=>setSelected(app)}>

                  <td style={{ padding:"10px 12px" }} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>setReplyTarget(app)} style={{ background:C.greenLight, border:`1.5px solid ${C.green}`, borderRadius:7, padding:"5px 11px", cursor:"pointer", color:C.green, fontSize:12, fontWeight:700 }}>📨 Reply</button>
                  </td>
                  <td style={{ padding:"10px 12px", fontSize:13, color:"#888" }}>{(page-1)*limit + index + 1}</td>
                  <td style={{ padding:"10px 12px", minWidth:160 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div style={{ width:34, height:34, borderRadius:"50%", background:avatarColor(app.fullName), display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:12, flexShrink:0 }}>{initials(app.fullName)}</div>
                      <div><p style={{ margin:0, fontSize:13, fontWeight:700, color:C.dark }}>{app.fullName||"—"}</p><p style={{ margin:0, fontSize:11, color:C.muted }}>{app.mobile}</p></div>
                    </div>
                  </td>
                  <td style={{ padding:"10px 12px" }}><span style={{ background:C.greenLight, color:C.green, borderRadius:6, padding:"2px 9px", fontSize:11, fontWeight:700, fontFamily:"monospace" }}>{app.tokenNo||"—"}</span></td>
                  <td style={{ padding:"10px 12px" }}><StatusBadge status={app.status}/></td>
                  <td style={{ padding:"10px 12px", maxWidth:180 }}><span style={{ display:"block", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:170, fontSize:13, color:C.dark }} title={app.subject}>{app.subject||"—"}</span></td>
                  <td style={{ padding:"10px 12px", maxWidth:160 }}>
                    <div style={{ fontSize:12, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:150, color:C.dark }}>{app.mainDepartment||"—"}</div>
                    {app.subDepartment&&<div style={{ fontSize:11, color:C.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:150 }}>{app.subDepartment}</div>}
                  </td>
                  <td style={{ padding:"10px 12px" }}>{app.status!=="Resolved"?<PriorityBadge priority={app.priority}/>:<span style={{ color:"#ccc" }}>—</span>}</td>
                  <td style={{ padding:"10px 12px", whiteSpace:"nowrap", fontSize:12, color:C.muted }}>{formatDate(app.submissionDate)}</td>
                  <td style={{ padding:"10px 12px", minWidth:130 }}>
                    {app.submittedByName?<div><div style={{ fontSize:12, fontWeight:700, color:C.dark, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:120 }}>{app.submittedByName}</div>{app.submittedByRole&&<div style={{ fontSize:11, color:C.muted }}>{app.submittedByRole}</div>}</div>:<span style={{ color:"#ccc" }}>—</span>}
                  </td>
                  <td style={{ padding:"10px 12px", minWidth:130 }}>
                    {app.replies&&app.replies.length>0?(()=>{
                      const first=app.replies[0]; const isResolved=first.status==="Resolved"; const more=app.replies.length-1;
                      return <div>
                        <div style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:7,height:7,borderRadius:"50%",background:isResolved?"#22c55e":"#6366f1",display:"inline-block",flexShrink:0 }}/><div style={{ fontSize:12,fontWeight:700,color:isResolved?C.green:C.dark,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:110 }}>{first.repliedByName||"—"}</div></div>
                        {first.repliedByRole&&<div style={{ fontSize:11,color:C.muted,paddingLeft:12 }}>{first.repliedByRole}</div>}
                        {more>0&&<div style={{ fontSize:11,color:"#6366f1",fontWeight:700,paddingLeft:12 }}>+{more} more</div>}
                      </div>;
                    })():<span style={{ color:"#ccc" }}>—</span>}
                  </td>
                  <td style={{ padding:"10px 12px" }} onClick={e=>e.stopPropagation()}>
                    {app.documents?<a href={app.documents} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:4, color:C.green, fontSize:12, fontWeight:600, padding:"4px 8px", borderRadius:6, background:C.greenLight, textDecoration:"none" }}>📄 View</a>:<span style={{ color:"#ccc" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && (
          <Pagination
            page={page} totalPages={totalPages} total={total} limit={limit}
            onPageChange={handlePageChange} onLimitChange={handleLimitChange}
          />
        )}
      </div>

      {/* ── MOBILE CARDS ── */}
      <div className="mob-cards">
        {loading ? (
          <div style={{ textAlign:"center", padding:48, color:"#888" }}><div style={{ fontSize:32, marginBottom:12 }}>⏳</div>Loading applications...</div>
        ) : filtered.length===0 ? (
          <div style={{ textAlign:"center", padding:48, color:"#888" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>📭</div>
            {search?"No matching applications found.":"No applications yet."}
          </div>
        ) : (
          <>
            <div style={{ fontSize:12, color:C.muted, marginBottom:10, padding:"0 2px" }}>
              Showing <strong style={{ color:C.dark }}>{(page-1)*limit+1}–{Math.min(page*limit,total)}</strong> of <strong style={{ color:C.dark }}>{total}</strong> applications
            </div>
            {filtered.map((app,index)=>(
              <AppCard key={app._id||index} app={app} index={index}
                onReply={a=>setReplyTarget(a)}
                onView={a=>setSelected(a)}
              />
            ))}
            <Pagination
              page={page} totalPages={totalPages} total={total} limit={limit}
              onPageChange={handlePageChange} onLimitChange={handleLimitChange}
            />
          </>
        )}
      </div>

      {/* Modals */}
      {selected      && <DetailModal record={selected}     onClose={()=>setSelected(null)}    />}
      {replyTarget   && <ReplyModal  record={replyTarget}  onClose={()=>setReplyTarget(null)} onSubmit={handleReplySubmit} />}
      {showTokenCheck && <TokenCheckModal onClose={()=>setShowTokenCheck(false)} onProceed={handleTokenCheckProceed} />}
      {showForm       && <JansanwadAppform onClose={handleFormClose} pretillData={prefillData} />}
    </div>
  );
}