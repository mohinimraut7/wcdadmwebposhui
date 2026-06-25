import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

// ── Color Theme (matching Availability & Applications pages) ──────────────────
const G = {
  primary:      "#1a5c45",   // dark green — main brand
  primaryHov:   "#154d3a",   // hover darker
  primaryLight: "#e8f5f0",   // very light green bg
  primaryBorder:"#b2d8cc",   // light green border
  primaryMid:   "#2d7a5f",   // medium green
  badge:        "#e8f5f0",   // badge background
  badgeText:    "#1a5c45",   // badge text
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const avatarColors = [
  "#1a5c45","#2d7a5f","#3a9b76","#0d4f5c",
  "#1e7a6e","#256b4a","#4a9e7c","#1b6b52",
];

const DEPARTMENTS = [
  "General Administration Department / Records Department HO",
  "Satellite City Department HO",
  "Establishment Department HO",
  "Accounting Department HO",
  "Construction department HO",
  "Inward-out Department HO",
  "Birth and Death Department HO",
  "Marriage Registration Department HO",
  "Commissioner Office HO",
  "Tax department HO",
  "Water Supply Department HO",
  "Advertisement Tax Department HO",
  "Mud and Bhuibhade Department HO",
  "Naharkat / License Certificates Department HO",
  "Market Recovery Department HO",
  "Unauthorized Construction Committee HO",
  "Accounting Department, (A) HO",
  "Unauthorized Construction Department HO",
  "Health Department HO",
  "Meeting Department HO",
  "Nulm department / hawker policy department HO",
  "Library department HO",
  "Local Body Tax Department HO",
  "Diwabatti Department HO",
  "Town Planning Department HO",
  "Environment / Tree Authority / Forests / Parks Department / Election Department / Census Department HO",
  "Audit Department HO",
  "IT DEPARTMENT",
  "Department of Hygiene Disorder Management HO",
  "Fire Brigade Department HO",
  "Legal Department",
  "Transportation / Vehicle Department HO",
  "Medical Health Department HO",
  "Women and Child welfare Department HO",
  "Handicapped welfare Department HO",
  "Disaster Management Departmengt HO",
  "Special Planning Authority Department HO",
];

function Avatar({ name = "", index }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      backgroundColor: avatarColors[index % avatarColors.length],
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: ".8125rem", fontWeight: 700,
      flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,.2)",
      border: "2px solid #fff",
    }}>
      {initials}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Shared field styles for modals ────────────────────────────────────────────
const fieldCls = {
  border: "1px solid #d1e8df",
  borderRadius: 8,
  padding: "10px 14px",
  transition: "border-color .2s",
  backgroundColor: "#fff",
};
const labelSt = { display: "block", fontSize: ".75rem", color: "#5a8a74", marginBottom: 3, fontWeight: 600, letterSpacing: ".02em" };
const inputSt = { width: "100%", outline: "none", fontSize: ".875rem", color: "#1a2e25", background: "transparent", border: "none", fontFamily: "inherit" };

// ── Detail Modal ──────────────────────────────────────────────────────────────
function DetailModal({ user, onClose }) {
  if (!user) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,.45)", backdropFilter:"blur(4px)", padding:16 }}>
      <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,.2)", width:"100%", maxWidth:480, maxHeight:"90vh", overflowY:"auto" }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${G.primary} 0%, ${G.primaryMid} 100%)`, borderRadius:"16px 16px 0 0", padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontSize:".7rem", color:"rgba(255,255,255,.7)", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", marginBottom:2 }}>User Detail</p>
            <h2 style={{ fontSize:"1.1rem", fontWeight:700, color:"#fff", margin:0 }}>{user.fullName}</h2>
          </div>
          <button onClick={onClose} style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.2)", border:"none", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:".875rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ padding:24 }}>
          <div style={{ background: G.primaryLight, borderRadius:10, padding:"14px 18px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px 24px" }}>
            {[
              ["Full Name",     user.fullName],
              ["Username",      user.userName],
              ["Mobile Number", user.mobileNumber],
              ["Email",         user.email],
              ["Department",    user.departmentName],
              ["Created At",    formatDate(user.createdAt)],
              ["Updated At",    formatDate(user.updatedAt)],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontSize:".7rem", color:"#5a8a74", marginBottom:2, fontWeight:600 }}>{label}</p>
                <p style={{ fontSize:".875rem", color:"#1a2e25", fontWeight:500, margin:0 }}>{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Edit User Modal ───────────────────────────────────────────────────────────
function EditUserModal({ user, onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName:       user.fullName       || "",
    userName:       user.userName       || "",
    mobileNumber:   user.mobileNumber   || "",
    email:          user.email          || "",
    password:       user.password       || "",
    departmentName: user.departmentName || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.userName || !form.mobileNumber || !form.email) {
      toast.warn("All required fields fill करा ❌"); return;
    }
    try {
      setSubmitting(true);
      const res = await axiosInstance.patch(`/users/${user._id}`, form);
      if (!res.data.success) { toast.error(res.data.message || "Update failed ❌"); return; }
      toast.success("User Updated Successfully ✅");
      onSuccess(); onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server Error ❌");
    } finally { setSubmitting(false); }
  };

  const canSave = form.fullName && form.userName && form.mobileNumber && form.email && !submitting;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,.45)", backdropFilter:"blur(4px)", padding:16 }}>
      <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,.2)", width:"100%", maxWidth:440, maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ background:`linear-gradient(135deg, ${G.primary} 0%, ${G.primaryMid} 100%)`, borderRadius:"16px 16px 0 0", padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontSize:".7rem", color:"rgba(255,255,255,.7)", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", marginBottom:2 }}>User Management</p>
            <h2 style={{ fontSize:"1.1rem", fontWeight:700, color:"#fff", margin:0 }}>Edit User — {user.fullName}</h2>
          </div>
          <button onClick={onClose} style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.2)", border:"none", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:".875rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ padding:"24px 28px" }}>
          <form onSubmit={handleUpdate} style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { label:"Full Name",     name:"fullName",     type:"text",     ph:"Enter full name" },
              { label:"Username",      name:"userName",     type:"text",     ph:"Enter username" },
              { label:"Mobile Number", name:"mobileNumber", type:"tel",      ph:"Enter mobile number" },
              { label:"Email",         name:"email",        type:"email",    ph:"Enter email" },
            ].map(({ label, name, type, ph }) => (
              <div key={name} style={fieldCls}>
                <label style={labelSt}>{label}</label>
                <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={ph} style={inputSt} maxLength={name==="mobileNumber"?10:undefined} />
              </div>
            ))}
            <div style={fieldCls}>
              <label style={labelSt}>Department Name</label>
              <select name="departmentName" value={form.departmentName} onChange={handleChange} style={{ ...inputSt, cursor:"pointer" }}>
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", gap:10, paddingTop:4 }}>
              <button type="button" onClick={onClose} style={{ flex:1, padding:"11px 0", borderRadius:8, border:`1px solid ${G.primaryBorder}`, background:"#fff", color:G.primary, fontWeight:600, fontSize:".875rem", cursor:"pointer" }}>
                Cancel
              </button>
              <button type="submit" disabled={!canSave} style={{ flex:1, padding:"11px 0", borderRadius:8, border:"none", background: canSave ? G.primary : "#ccc", color:"#fff", fontWeight:600, fontSize:".875rem", cursor: canSave ? "pointer" : "not-allowed", opacity: canSave ? 1 : .65 }}>
                {submitting ? "Saving..." : "💾 Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Add User Modal ────────────────────────────────────────────────────────────
function AddUserModal({ onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ fullName:"", userName:"", mobileNumber:"", email:"", password:"", departmentName:"" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.userName || !form.mobileNumber || !form.email || !form.password) {
      toast.warn("All fields required ❌"); return;
    }
    try {
      setSubmitting(true);
      const res = await axiosInstance.post("/register", form);
      if (!res.data.success) { toast.error(res.data.message || "Registration failed ❌"); return; }
      toast.success("User Added Successfully ✅");
      onSuccess(); onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server Error ❌");
    } finally { setSubmitting(false); }
  };

  const isDisabled = !form.fullName || !form.userName || !form.mobileNumber || !form.email || !form.password || submitting;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,.45)", backdropFilter:"blur(4px)", padding:16 }}>
      <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,.2)", width:"100%", maxWidth:440, maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ background:`linear-gradient(135deg, ${G.primary} 0%, ${G.primaryMid} 100%)`, borderRadius:"16px 16px 0 0", padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontSize:".7rem", color:"rgba(255,255,255,.7)", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", marginBottom:2 }}>User Management</p>
            <h2 style={{ fontSize:"1.1rem", fontWeight:700, color:"#fff", margin:0 }}>Add New User</h2>
          </div>
          <button onClick={onClose} style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.2)", border:"none", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:".875rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ padding:"24px 28px" }}>
          <form onSubmit={handleRegister} style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { label:"Full Name",     name:"fullName",     type:"text",     ph:"Enter full name" },
              { label:"Username",      name:"userName",     type:"text",     ph:"Enter username" },
              { label:"Mobile Number", name:"mobileNumber", type:"tel",      ph:"Enter mobile number" },
              { label:"Email",         name:"email",        type:"email",    ph:"Enter email" },
              { label:"Password",      name:"password",     type:"password", ph:"Enter password" },
            ].map(({ label, name, type, ph }) => (
              <div key={name} style={fieldCls}>
                <label style={labelSt}>{label}</label>
                <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={ph} style={inputSt} maxLength={name==="mobileNumber"?10:undefined} />
              </div>
            ))}
            <div style={fieldCls}>
              <label style={labelSt}>Department Name</label>
              <select name="departmentName" value={form.departmentName} onChange={handleChange} style={{ ...inputSt, cursor:"pointer" }}>
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", gap:10, paddingTop:4 }}>
              <button type="button" onClick={onClose} style={{ flex:1, padding:"11px 0", borderRadius:8, border:`1px solid ${G.primaryBorder}`, background:"#fff", color:G.primary, fontWeight:600, fontSize:".875rem", cursor:"pointer" }}>
                Cancel
              </button>
              <button type="submit" disabled={isDisabled} style={{ flex:1, padding:"11px 0", borderRadius:8, border:"none", background: isDisabled ? "#ccc" : G.primary, color:"#fff", fontWeight:600, fontSize:".875rem", cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? .65 : 1 }}>
                {submitting ? "Creating..." : "+ Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Main Users Component ──────────────────────────────────────────────────────
export default function Users() {
  const [users, setUsers]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [selected, setSelected]       = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [deletingId, setDeletingId]   = useState(null);
  const [editUser, setEditUser]       = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/getUsers");
      if (res.data.success) setUsers(res.data.users || []);
      else toast.error(res.data.message || "Users fetch failed ❌");
    } catch (err) {
      toast.error("Users fetch करताना error आला ❌");
    } finally { setLoading(false); }
  };

  const handleDelete = async (e, userId, fullName) => {
    e.stopPropagation();
    if (!window.confirm(`"${fullName}" ला delete करायचे आहे का?`)) return;
    try {
      setDeletingId(userId);
      const res = await axiosInstance.delete(`/deleteUser/${userId}`);
      if (res.data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        toast.success(`"${fullName}" Deleted Successfully ✅`);
      } else { toast.error(res.data.message || "Delete failed ❌"); }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server Error ❌");
    } finally { setDeletingId(null); }
  };

  const filtered = users.filter((u) =>
    !search ||
    u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    u.userName?.toLowerCase().includes(search.toLowerCase()) ||
    u.mobileNumber?.includes(search) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight:"100vh", background:"#f0f7f4", padding:24 }}>
      <style>{`
        @keyframes uspin { to { transform:rotate(360deg) } }
        .u-tr:hover { background: #e8f5f0 !important; }
        .u-del-btn:hover:not(:disabled) { background:#fee2e2 !important; border-color:#f87171 !important; }
        .u-edit-btn:hover { background:#d1fae5 !important; border-color:#6ee7b7 !important; }
        .u-ref-btn:hover { background:#e8f5f0 !important; color:#1a5c45 !important; border-color:#b2d8cc !important; }
        .u-add-btn:hover { background:#154d3a !important; }
        .u-search-input:focus { border-color: #1a5c45 !important; box-shadow: 0 0 0 3px rgba(26,92,69,.12) !important; }
      `}</style>

      <div style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* ── Page Header ── */}
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1a2e25", margin:0, display:"flex", alignItems:"center", gap:12 }}>
            All Users
            <span style={{ fontSize:".8125rem", fontWeight:700, color: G.primary, background: G.primaryLight, border:`1px solid ${G.primaryBorder}`, padding:"2px 10px", borderRadius:20 }}>
              {users.length}
            </span>
          </h1>
          <p style={{ color:"#5a8a74", fontSize:".9rem", fontWeight:500, marginTop:4 }}>Janata Darbar — User Management</p>
        </div>

        {/* ── Action Bar ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:16, flexWrap:"wrap" }}>
          {/* Search */}
          <div style={{ position:"relative", flex:"1 1 300px", maxWidth:480 }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#5a8a74", fontSize:".9rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, username, mobile, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="u-search-input"
              style={{ width:"100%", paddingLeft:36, paddingRight:14, paddingTop:9, paddingBottom:9, fontSize:".875rem", border:`1px solid ${G.primaryBorder}`, borderRadius:8, outline:"none", background:"#fff", color:"#1a2e25", transition:"border-color .2s, box-shadow .2s", boxSizing:"border-box" }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", gap:10, flexShrink:0 }}>
            <button onClick={fetchUsers} className="u-ref-btn"
              style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", border:`1px solid ${G.primaryBorder}`, borderRadius:8, background:"#fff", color:"#3a6b57", fontWeight:600, fontSize:".8125rem", cursor:"pointer", transition:"all .15s" }}>
              🔄 Refresh
            </button>
            <button onClick={() => setShowAddUser(true)} className="u-add-btn"
              style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 18px", border:"none", borderRadius:8, background: G.primary, color:"#fff", fontWeight:600, fontSize:".8125rem", cursor:"pointer", transition:"background .15s" }}>
              + Add User
            </button>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div style={{ background:"#fff", border:`1px solid ${G.primaryBorder}`, borderRadius:10, overflow:"hidden", boxShadow:"0 2px 8px rgba(26,92,69,.08)" }}>
          <style>{`
            .u-th { padding:0 16px; height:50px; font-weight:600; font-size:.8rem; color:${G.primary}; text-align:left; white-space:nowrap; background:${G.primaryLight}; border-bottom:1px solid ${G.primaryBorder}; letter-spacing:.04em; text-transform:uppercase; }
            .u-tr { border-bottom:1px solid #e8f2ee; cursor:pointer; transition:background .12s; }
            .u-tr:last-child { border-bottom:none; }
            .u-td { padding:0 16px; height:54px; vertical-align:middle; font-size:.875rem; }
            .u-mono { display:inline-block; padding:2px 8px; background:${G.primaryLight}; border:1px solid ${G.primaryBorder}; border-radius:4px; font-family:monospace; font-size:.8rem; color:${G.primary}; font-weight:600; }
            .u-footer { display:flex; align-items:center; justify-content:space-between; padding:0 16px; height:46px; border-top:1px solid ${G.primaryBorder}; background:${G.primaryLight}; font-size:.8125rem; color:${G.primaryMid}; }
            .u-del-btn { display:inline-flex; align-items:center; gap:4px; padding:5px 10px; border-radius:6px; font-size:.78rem; font-weight:600; border:1px solid #fca5a5; background:#fff5f5; color:#dc2626; cursor:pointer; transition:all .15s; }
            .u-del-btn:disabled { opacity:.5; cursor:not-allowed; }
            .u-edit-btn { display:inline-flex; align-items:center; gap:4px; padding:5px 10px; border-radius:6px; font-size:.78rem; font-weight:600; border:1px solid #6ee7b7; background:#f0fdf4; color:#065f46; cursor:pointer; transition:all .15s; }
          `}</style>

          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr>
                  {["#","User","Username","Mobile","Email","Department","Joined","Action"].map((h) => (
                    <th key={h} className="u-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign:"center", padding:"64px 0", color:"#5a8a74" }}>
                      <div style={{ width:32, height:32, margin:"0 auto 12px", border:`3px solid ${G.primaryBorder}`, borderTopColor: G.primary, borderRadius:"50%", animation:"uspin .8s linear infinite" }} />
                      <div style={{ fontWeight:500 }}>Loading users…</div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign:"center", padding:"64px 0", color:"#5a8a74" }}>
                      <div style={{ fontSize:40, marginBottom:8 }}>👤</div>
                      <div style={{ fontWeight:500 }}>No users found</div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, index) => (
                    <tr key={user._id} className="u-tr"
                      style={{ background: index % 2 === 0 ? "#fff" : "#fafcfb" }}
                      onClick={() => setSelected(user)}>
                      <td className="u-td" style={{ color:"#5a8a74", width:50, fontWeight:600 }}>{index + 1}</td>
                      <td className="u-td" style={{ minWidth:180 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <Avatar name={user.fullName} index={index} />
                          <div>
                            <div style={{ fontSize:".875rem", fontWeight:600, color:"#1a2e25", lineHeight:1.3 }}>{user.fullName}</div>
                            <div style={{ fontSize:".72rem", color:"#5a8a74", marginTop:1 }}>ID: {user._id?.slice(-6)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="u-td" style={{ width:140 }}><span className="u-mono">@{user.userName}</span></td>
                      <td className="u-td" style={{ width:140 }}>
                        <div style={{ fontSize:".875rem", color:"#2d5a45" }}>{user.mobileNumber || "—"}</div>
                      </td>
                      <td className="u-td" style={{ minWidth:180 }}>
                        <div style={{ fontSize:".875rem", color:"#2d5a45", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:200 }}>{user.email || "—"}</div>
                      </td>
                      <td className="u-td" style={{ minWidth:200 }}>
                        <div style={{ fontSize:".8rem", color:"#2d5a45", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:220 }} title={user.departmentName || "—"}>
                          {user.departmentName || <span style={{ color:"#a0c4b5" }}>—</span>}
                        </div>
                      </td>
                      <td className="u-td" style={{ width:120, whiteSpace:"nowrap", color:"#3a6b57", fontSize:".8125rem" }}>{formatDate(user.createdAt)}</td>
                      <td className="u-td" style={{ width:160 }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <button className="u-edit-btn" onClick={(e) => { e.stopPropagation(); setEditUser(user); }}>✏️ Edit</button>
                          <button className="u-del-btn" disabled={deletingId === user._id}
                            onClick={(e) => handleDelete(e, user._id, user.fullName)}>
                            {deletingId === user._id ? (
                              <><span style={{ width:11, height:11, border:"2px solid #fca5a5", borderTopColor:"#dc2626", borderRadius:"50%", display:"inline-block", animation:"uspin .7s linear infinite" }} />Deleting…</>
                            ) : <>🗑️ Delete</>}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length > 0 && (
            <div className="u-footer">
              <span>Showing <strong style={{ color: G.primary }}>{filtered.length}</strong> of <strong style={{ color: G.primary }}>{users.length}</strong> users</span>
              <span style={{ color:"#5a8a74", fontSize:".8rem" }}>👆 Click any row to view full details</span>
            </div>
          )}
        </div>
      </div>

      {selected    && <DetailModal  user={selected}  onClose={() => setSelected(null)} />}
      {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} onSuccess={fetchUsers} />}
      {editUser    && <EditUserModal user={editUser}  onClose={() => setEditUser(null)} onSuccess={fetchUsers} />}
    </div>
  );
}