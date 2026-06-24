// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/slices/authSlice";
// import {
//   FiChevronLeft, FiChevronRight, FiX,
//   FiLayout, FiFileText, FiSettings,
//   FiLogOut, FiUsers, FiCalendar,
// } from "react-icons/fi";
// import logo from "../../assets/vvcmclogo.jpg";
// import { useSidebar } from "./SidebarContext";

// const TEAL_FROM = "#187484";
// const TEAL_TO   = "#0d4f5c";
// const GOLD      = "#CE9A54";

// const FULL_ACCESS_ROLES = ["Super Admin", "Guardian Minister","Mayor","Admin"];

// export default function Sidebar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((s) => s.auth);
//   const { mode, setMode } = useSidebar();

//   // ✅ ALL hooks must be declared before any early return
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // ✅ Early return AFTER all hooks
//   if (!user) return null;

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const handleOpenArrow    = () => setMode("open");
//   const handleCollapseArrow = () => setMode("collapsed");
//   const handleClose        = () => setMode("hidden");

//   const isOpen      = mode === "open";
//   const isCollapsed = mode === "collapsed";
//   const isHidden    = mode === "hidden";

//   // HIDDEN — render only the › floating button
//   if (isHidden) {
//     return (
//       <button
//         onClick={handleOpenArrow}
//         title="Open sidebar"
//         style={{
//           position: isMobile ? "fixed" : "relative",
//           top: isMobile ? 0 : "auto",
//           left: isMobile ? 0 : "auto",
//           alignSelf: "flex-start",
//           margin: isMobile ? undefined : "2px 0 0 2px",
//           zIndex: 200,
//           background: `linear-gradient(135deg, ${TEAL_FROM}, ${TEAL_TO})`,
//           color: "#fff", padding: "8px 10px", borderRadius: 10,
//           boxShadow: "0 4px 16px rgba(24,116,132,0.4)",
//           border: "none", cursor: "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           flexShrink: 0,
//           width: 40,
//         }}
//       >
//         <FiChevronRight size={18} />
//       </button>
//     );
//   }

//   return (
//     <>
//       {/* Backdrop overlay on mobile when open */}
//       {isMobile && isOpen && (
//         <div
//           onClick={handleClose}
//           style={{
//             position: "fixed", inset: 0, zIndex: 90,
//           }}
//         />
//       )}

//       <aside style={{
//         width: isOpen ? 230 : 64,
//         minHeight: "100vh",
//         background: `linear-gradient(175deg, ${TEAL_FROM} 0%, ${TEAL_TO} 100%)`,
//         display: "flex",
//         flexDirection: "column",
//         transition: "width 0.3s ease",
//         overflow: "visible",
//         boxShadow: "4px 0 24px rgba(13,79,92,0.35)",
//         position: isMobile ? "fixed" : "relative",
//         top: 0, left: 0,
//         zIndex: isMobile ? 100 : "auto",
//         height: isMobile ? "100vh" : "auto",
//         flexShrink: 0,
//       }}>

//         {/* Decorative circles */}
//         <div style={{ position:"absolute", top:-40,   right:-40, width:130, height:130, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
//         <div style={{ position:"absolute", bottom:120, left:-30,  width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }}/>
//         <div style={{ position:"absolute", bottom:-20, right:-20, width:80,  height:80,  borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }}/>

//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

//           .sb-link {
//             display: flex; align-items: center; gap: 12px;
//             border-radius: 12px;
//             // padding: 10px 16px;
//             // margin: 2px 10px;

//             padding: 10px 16px 10px 11px;  /* left padding 16 → 11px */
//             margin: 2px 10px 2px 5px;
//             text-decoration: none; color: rgba(255,255,255,0.72);
//             font-size: 13.5px; font-weight: 600;
//             font-family: 'Nunito','Segoe UI',sans-serif;
//             transition: all 0.2s ease; border-left: 3px solid transparent;
//             white-space: nowrap; overflow: hidden;
//           }
//           .sb-link:hover  { background: rgba(255,255,255,0.10); color:#fff; }
//           .sb-link.active {
//             background: rgba(255,255,255,0.16); color:#fff; font-weight:800;
//             border-left: 3px solid ${GOLD};
//             box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
//           }
//           .sb-link .sb-icon        { flex-shrink:0; opacity:0.8; }
//           .sb-link.active .sb-icon { opacity:1; }

//           .sb-link-collapsed {
//             display: flex; align-items: center; justify-content: center;
//             padding: 10px 0; border-radius: 12px; margin: 2px 8px;
//             text-decoration: none; color: rgba(255,255,255,0.72);
//             transition: all 0.2s ease; border-left: 3px solid transparent;
//           }
//           .sb-link-collapsed:hover  { background: rgba(255,255,255,0.10); color:#fff; }
//           .sb-link-collapsed.active {
//             background: rgba(255,255,255,0.16); color:#fff;
//             border-left: 3px solid ${GOLD};
//           }

//           .sb-pill-btn {
//             position: absolute; top: 50%; right: -14px;
//             transform: translateY(-50%);
//             width: 28px; height: 28px; border-radius: 50%;
//             background: ${TEAL_FROM};
//             border: 2px solid rgba(255,255,255,0.3);
//             box-shadow: 0 2px 10px rgba(13,79,92,0.5);
//             color: #fff; cursor: pointer;
//             display: flex; align-items: center; justify-content: center;
//             transition: background 0.2s; z-index: 60;
//           }
//           .sb-pill-btn:hover { background: ${GOLD}; border-color: ${GOLD}; }
//         `}</style>

//         {/* ── ‹ Collapse pill — only when OPEN ── */}
//         {isOpen && (
//           <button className="sb-pill-btn" onClick={handleCollapseArrow} title="Collapse sidebar">
//             <FiChevronLeft size={14}/>
//           </button>
//         )}

//         {/* ── × Close pill — only when COLLAPSED ── */}
//         {isCollapsed && (
//           <button className="sb-pill-btn" onClick={handleClose} title="Hide sidebar">
//             <FiX size={14}/>
//           </button>
//         )}

//         {/* ── Header / Logo ── */}
//         {isOpen ? (
//           <div style={{
//             padding: "24px 18px 18px",
//             paddingTop: isMobile ? "46px" : "24px",
//             display: "flex", flexDirection: "column",
//             alignItems: "center", gap: 6, overflow: "hidden",
//           }}>
//             <div style={{
//               color:`${GOLD}dd`, fontSize:15.5, fontWeight:800,
//               fontFamily:"'Noto Sans Devanagari','Nunito',sans-serif",
//               whiteSpace:"nowrap", letterSpacing:0.1, lineHeight:1.3,
//             }}>
//               वसई-विरार शहर महानगरपालिका
//             </div>
//             <div style={{
//               color:"#fff", fontSize:22, fontWeight:900,
//               fontFamily:"'Noto Sans Devanagari','Nunito',sans-serif",
//               whiteSpace:"nowrap", letterSpacing:0.3, lineHeight:1,
//               textShadow:`0 2px 10px ${GOLD}55`, textAlign:"center",
//             }}>
//               जन संवाद
//             </div>
//             <div style={{
//               width:140, height:140, borderRadius:"5%",
//               background:`linear-gradient(135deg,${GOLD},#b8832e)`,
//               boxShadow:`0 4px 14px ${GOLD}88`, overflow:"hidden",
//               border:"2px solid rgba(255,255,255,0.25)",
//               display:"flex", alignItems:"center", justifyContent:"center",
//             }}>
//               <img src={logo} alt="VVCMC"
//                 style={{ width:"100%", height:"100%", objectFit:"cover" }}
//                 onError={e=>{ e.target.style.display="none"; e.target.parentNode.innerHTML='<span style="font-size:24px">⚖️</span>'; }}
//               />
//             </div>
//           </div>
//         ) : (
//           <div style={{
//             width:"100%", padding:"20px 0",
//             display:"flex", alignItems:"center", justifyContent:"center",
//           }}>
//             <div style={{
//               width:40, height:40, borderRadius:10,
//               background:`linear-gradient(135deg,${GOLD},#b8832e)`,
//               boxShadow:`0 4px 14px ${GOLD}77`, overflow:"hidden",
//               display:"flex", alignItems:"center", justifyContent:"center",
//             }}>
//               <img src={logo} alt="जन संवाद"
//                 style={{ width:"100%", height:"100%", objectFit:"cover" }}
//                 onError={e=>{ e.target.style.display="none"; e.target.parentNode.innerHTML='<span style="font-size:18px">⚖️</span>'; }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Divider */}
//         <div style={{ margin:"0 16px 10px", borderTop:"1px solid rgba(255,255,255,0.1)" }}/>

//         {/* ── Nav ── */}
//         <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:2, paddingTop:4, overflowY:"auto", overflowX:"hidden" }}>
//           {isOpen ? (
//             <>
//               <NavLink to="/dashboard" className={({isActive})=>`sb-link${isActive?" active":""}`}>
//                 <span className="sb-icon"><FiLayout size={18}/></span><span>Dashboard</span>
//               </NavLink>

//               {/* {FULL_ACCESS_ROLES.includes(user?.role) && ( */}
//                 <NavLink to="/meetings" className={({isActive})=>`sb-link${isActive?" active":""}`}>
//                   <span className="sb-icon"><FiCalendar size={18}/></span><span>Meetings</span>
//                 </NavLink>
//               {/* )} */}
//                {/* {FULL_ACCESS_ROLES.includes(user?.role) && (
//                 <NavLink to="/meetingsubjects" className={({isActive})=>`sb-link${isActive?" active":""}`}>
//                   <span className="sb-icon"><FiCalendar size={18}/></span><span>Meetings Subjects</span>
//                 </NavLink>
//               )} */}
//               {FULL_ACCESS_ROLES.includes(user?.role) && (
//                 <NavLink to="/availability" className={({isActive})=>`sb-link${isActive?" active":""}`}>
//                   <span className="sb-icon"><FiCalendar size={18}/></span><span>Availability</span>
//                 </NavLink>
//               )}

//               <NavLink to="/allapplication" className={({isActive})=>`sb-link${isActive?" active":""}`}>
//                 <span className="sb-icon"><FiFileText size={18}/></span><span>Applications</span>
//               </NavLink>

//               {FULL_ACCESS_ROLES.includes(user?.role) && (
//                 <NavLink to="/allapplicationcitizens" className={({isActive})=>`sb-link${isActive?" active":""}`}>
//                   <span className="sb-icon"><FiFileText size={18}/></span><span>Appointment Applications</span>
//                 </NavLink>
//               )}
//               {FULL_ACCESS_ROLES.includes(user?.role) && (
//                 <NavLink to="/users" className={({isActive})=>`sb-link${isActive?" active":""}`}>
//                   <span className="sb-icon"><FiUsers size={18}/></span><span>Users</span>
//                 </NavLink>
//               )}
//             </>
//           ) : (
//             <>
//               <NavLink to="/dashboard"              className={({isActive})=>`sb-link-collapsed${isActive?" active":""}`}><FiLayout size={18}/></NavLink>
//               <NavLink to="/availability"           className={({isActive})=>`sb-link-collapsed${isActive?" active":""}`}><FiCalendar size={18}/></NavLink>
//               <NavLink to="/allapplication"         className={({isActive})=>`sb-link-collapsed${isActive?" active":""}`}><FiFileText size={18}/></NavLink>
//               <NavLink to="/allapplicationcitizens" className={({isActive})=>`sb-link-collapsed${isActive?" active":""}`}><FiFileText size={18}/></NavLink>
//               {FULL_ACCESS_ROLES.includes(user?.role) && (
//                 <NavLink to="/users" className={({isActive})=>`sb-link-collapsed${isActive?" active":""}`}><FiUsers size={18}/></NavLink>
//               )}
//             </>
//           )}
//         </nav>

//         {/* ── Bottom: Settings + User ── */}
//         <div style={{ marginTop:"auto" }}>
//           <div style={{ margin:"0 10px 4px" }}>
//             {isOpen ? (
//               <NavLink to="/settings" className={({isActive})=>`sb-link${isActive?" active":""}`} style={{ margin:0 }}>
//                 <span className="sb-icon"><FiSettings size={18}/></span><span>Settings</span>
//               </NavLink>
//             ) : (
//               <NavLink to="/settings" className={({isActive})=>`sb-link-collapsed${isActive?" active":""}`} style={{ margin:"2px 8px" }}>
//                 <FiSettings size={18}/>
//               </NavLink>
//             )}
//           </div>

//           <div style={{ margin:"6px 16px", borderTop:"1px solid rgba(255,255,255,0.1)" }}/>

//           <div style={{ padding: isOpen ? "10px 16px 20px" : "10px 0 20px" }}>
//             {isOpen ? (
//               <div>
//                 <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
//                   <div style={{
//                     width:34, height:34, borderRadius:"50%", flexShrink:0,
//                     background:`linear-gradient(135deg,${GOLD},#b8832e)`,
//                     display:"flex", alignItems:"center", justifyContent:"center",
//                     color:"#fff", fontSize:14, fontWeight:900,
//                     boxShadow:`0 3px 10px ${GOLD}66`, fontFamily:"'Nunito',sans-serif",
//                   }}>
//                     {(user?.fullName || user?.userName || "A")[0].toUpperCase()}
//                   </div>
//                   <div style={{ overflow:"hidden" }}>
//                     <div style={{ color:"#fff", fontSize:12.5, fontWeight:800, lineHeight:1.2, fontFamily:"'Nunito',sans-serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:130 }}>
//                       {user?.fullName || user?.userName || "Admin User"}
//                     </div>
//                     <div style={{ color:"rgba(255,255,255,0.55)", fontSize:10.5, fontWeight:600 }}>{user?.role}</div>
//                   </div>
//                 </div>
//                 {user?.departmentName && (
//                   <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.45)", fontWeight:600, marginBottom:10, paddingLeft:2 }}>
//                     Dept: <span style={{ color:"rgba(255,255,255,0.75)", fontWeight:700 }}>{user.departmentName}</span>
//                   </div>
//                 )}
//                 <button onClick={handleLogout} style={{
//                   width:"100%", background:"rgba(255,255,255,0.1)",
//                   color:"rgba(255,255,255,0.85)", border:"1px solid rgba(255,255,255,0.2)",
//                   borderRadius:10, padding:"8px", fontSize:11, fontWeight:800, cursor:"pointer",
//                   letterSpacing:0.8, textTransform:"uppercase",
//                   display:"flex", alignItems:"center", justifyContent:"center", gap:7,
//                   transition:"all .2s", fontFamily:"'Nunito',sans-serif",
//                 }}
//                   onMouseEnter={e=>{ e.currentTarget.style.background="rgba(220,50,50,0.3)"; e.currentTarget.style.borderColor="rgba(220,50,50,0.4)"; }}
//                   onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
//                 >
//                   <FiLogOut size={13}/> Logout
//                 </button>
//               </div>
//             ) : (
//               <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
//                 <div style={{
//                   width:34, height:34, borderRadius:"50%",
//                   background:`linear-gradient(135deg,${GOLD},#b8832e)`,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   color:"#fff", fontSize:13, fontWeight:900,
//                 }}>
//                   {(user?.fullName || user?.userName || "A")[0].toUpperCase()}
//                 </div>
//                 <button onClick={handleLogout} style={{
//                   background:"transparent", border:"none", cursor:"pointer",
//                   color:"rgba(255,255,255,0.5)", padding:6, borderRadius:8,
//                   display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s",
//                 }}
//                   onMouseEnter={e=>e.currentTarget.style.color="#fff"}
//                   onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
//                 >
//                   <FiLogOut size={17}/>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }






// import React, { useState } from "react";
// import {
//   ShieldCheck,
//   LayoutGrid,
//   MapPin,
//   Users,
//   Building2,
//   FileText,
//   Map,
//   Settings,
//   Zap,
// } from "lucide-react";

// const menuItems = [
//   { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
//   { key: "inspections", label: "Inspections", icon: MapPin },
//   { key: "users", label: "Users", icon: Users },
//   { key: "organizations", label: "Organizations", icon: Building2 },
//   { key: "reports", label: "Reports", icon: FileText },
//   { key: "districts", label: "Districts", icon: Map },
//   { key: "settings", label: "Settings", icon: Settings },
// ];

// export default function Sidebar({ active = "dashboard", onNavigate }) {
//   const [activeKey, setActiveKey] = useState(active);

//   const handleClick = (key) => {
//     setActiveKey(key);
//     if (onNavigate) onNavigate(key);
//   };

//   return (
//     <div
//       style={{
//         width: 264,
//         minHeight: "100vh",
//         background: "#363b7e",
//         display: "flex",
//         flexDirection: "column",
//         fontFamily:
//           "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* Logo / brand */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 14,
//           padding: "28px 24px 24px",
//           borderBottom: "1px solid rgba(255,255,255,0.12)",
//         }}
//       >
//         <div
//           style={{
//             width: 48,
//             height: 48,
//             borderRadius: "50%",
//             background: "#d6356f",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         >
//           <ShieldCheck size={24} color="#fff" />
//         </div>
//         <div>
//           <div style={{ color: "#fff", fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>
//             WCD
//           </div>
//           <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 2 }}>
//             Inspection Admin
//           </div>
//         </div>
//       </div>

//       {/* Main menu */}
//       <div style={{ padding: "24px 16px", flex: 1 }}>
//         <div
//           style={{
//             color: "rgba(255,255,255,0.45)",
//             fontSize: 12,
//             fontWeight: 700,
//             letterSpacing: "1.5px",
//             padding: "0 12px 14px",
//           }}
//         >
//           MAIN MENU
//         </div>

//         <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//           {menuItems.map(({ key, label, icon: Icon }) => {
//             const isActive = activeKey === key;
//             return (
//               <button
//                 key={key}
//                 onClick={() => handleClick(key)}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 14,
//                   width: "100%",
//                   padding: "13px 16px",
//                   borderRadius: 14,
//                   border: "none",
//                   cursor: "pointer",
//                   textAlign: "left",
//                   background: isActive ? "#d6356f" : "transparent",
//                   color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
//                   fontSize: 15.5,
//                   fontWeight: isActive ? 600 : 500,
//                   transition: "background 0.15s ease",
//                   position: "relative",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isActive) e.currentTarget.style.background = "transparent";
//                 }}
//               >
//                 <Icon size={19} strokeWidth={1.8} />
//                 <span style={{ flex: 1 }}>{label}</span>
//                 {isActive && (
//                   <span
//                     style={{
//                       width: 7,
//                       height: 7,
//                       borderRadius: "50%",
//                       background: "#fff",
//                       flexShrink: 0,
//                     }}
//                   />
//                 )}
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Pro access card */}
//       <div style={{ padding: "0 16px 28px" }}>
//         <div
//           style={{
//             background: "rgba(255,255,255,0.07)",
//             borderRadius: 18,
//             padding: "22px 20px",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
//             <div
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: "50%",
//                 background: "#e8b75a",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <Zap size={17} color="#363b7e" fill="#363b7e" />
//             </div>
//             <span style={{ color: "#fff", fontSize: 16.5, fontWeight: 700 }}>
//               Pro Access
//             </span>
//           </div>
//           <p
//             style={{
//               color: "rgba(255,255,255,0.65)",
//               fontSize: 13.5,
//               lineHeight: 1.4,
//               margin: "0 0 18px",
//             }}
//           >
//             Unlock advanced reports &amp; analytics
//           </p>
//           <button
//             style={{
//               width: "100%",
//               background: "linear-gradient(120deg, #e8b75a, #dca33e)",
//               border: "none",
//               borderRadius: 12,
//               padding: "13px 0",
//               color: "#363b7e",
//               fontSize: 15,
//               fontWeight: 700,
//               cursor: "pointer",
//             }}
//           >
//             Upgrade Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  LayoutGrid,
  MapPin,
  Users,
  Building2,
  FileText,
  Map,
  Settings,
  Zap,
} from "lucide-react";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
  { key: "inspections", label: "Inspections", icon: MapPin, path: "/posh-survey" },
  { key: "users", label: "Users", icon: Users, path: "/users" },
  { key: "organizations", label: "Organizations", icon: Building2, path: "/organizations" },
    { key: "surveys", label: "Surveys", icon: FiClipboard , path: "/surveys" },

  { key: "reports", label: "Reports", icon: FileText, path: "/reports" },
  { key: "districts", label: "Districts", icon: Map, path: "/districts" },
    { key: "district-admins", label: "District Admins", icon: ShieldCheck, path: "/wcd-district-admin" }, // ← हे add कर
  { key: "inspection-officer", label: "Inspection Officers", icon: ShieldCheck, path: "/wcd-district-insofficer" }, // ← हे add कर

  { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ active = "dashboard", onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(active);

  // Keep the highlighted item in sync with the actual URL,
  // so it stays correct even if the user navigates via back/forward.
  const currentItem =
    menuItems.find((item) => item.path === location.pathname) || null;
  const effectiveActiveKey = currentItem ? currentItem.key : activeKey;

  const handleClick = (item) => {
    setActiveKey(item.key);
    if (onNavigate) onNavigate(item.key);
    navigate(item.path);
  };

  return (
    <div
      style={{
        width: 264,
        minHeight: "100vh",
        background: "#363b7e",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Logo / brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "28px 24px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#d6356f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={24} color="#fff" />
        </div>
        <div>
          <div style={{ color: "#fff", fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>
            WCD
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 2 }}>
            Inspection Admin
          </div>
        </div>
      </div>

      {/* Main menu */}
      <div style={{ padding: "24px 16px", flex: 1 }}>
        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1.5px",
            padding: "0 12px 14px",
          }}
        >
          MAIN MENU
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {menuItems.map((item) => {
            const { key, label, icon: Icon } = item;
            const isActive = effectiveActiveKey === key;
            return (
              <button
                key={key}
                onClick={() => handleClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background: isActive ? "#d6356f" : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                  fontSize: 15.5,
                  fontWeight: isActive ? 600 : 500,
                  transition: "background 0.15s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span style={{ flex: 1 }}>{label}</span>
                {isActive && (
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#fff",
                      flexShrink: 0,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pro access card */}
      <div style={{ padding: "0 16px 28px" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.07)",
            borderRadius: 18,
            padding: "22px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#e8b75a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Zap size={17} color="#363b7e" fill="#363b7e" />
            </div>
            <span style={{ color: "#fff", fontSize: 16.5, fontWeight: 700 }}>
              Pro Access
            </span>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 13.5,
              lineHeight: 1.4,
              margin: "0 0 18px",
            }}
          >
            Unlock advanced reports &amp; analytics
          </p>
          <button
            style={{
              width: "100%",
              background: "linear-gradient(120deg, #e8b75a, #dca33e)",
              border: "none",
              borderRadius: 12,
              padding: "13px 0",
              color: "#363b7e",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}