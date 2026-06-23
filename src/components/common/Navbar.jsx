
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../redux/slices/authSlice";
// import { FiBell, FiHelpCircle, FiLogOut, FiSearch, FiChevronDown } from "react-icons/fi";
// import logo from "../../assets/vvcmclogo.jpg";
// import { useSidebar } from "./SidebarContext";

// const TEAL    = "#187484";
// const TEAL_TO = "#0d4f5c";
// const GOLD    = "#CE9A54";
// const GOLD_DP = "#CA9D28";
// const CREAM   = "#F5E7C2";

// function Avatar({ name }) {
//   const initials = (name || "A")
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
//   return (
//     <div style={{
//       width: 36, height: 36, borderRadius: "50%",
//       background: `linear-gradient(135deg, ${TEAL}, ${TEAL_TO})`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: 13, fontWeight: 900, color: "#fff",
//       flexShrink: 0,
//       fontFamily: "'Nunito','Segoe UI',sans-serif",
//       cursor: "pointer",
//       boxShadow: `0 2px 8px ${TEAL}55`,
//     }}>
//       {initials}
//     </div>
//   );
// }

// const Navbar = () => {
//   const { user }       = useSelector((state) => state.auth);
//   const dispatch       = useDispatch();
//   const navigate       = useNavigate();
//   const { mode }       = useSidebar();
//   const showBrand      = mode === "hidden";
//   const [dropdown, setDropdown] = useState(false);
//   const [peopleOnline, setPeopleOnline] = useState(16);
//   const dropRef        = useRef(null);

//   useEffect(() => {
//     const iv = setInterval(() => setPeopleOnline(Math.floor(12 + Math.random() * 8)), 4000);
//     return () => clearInterval(iv);
//   }, []);

//   useEffect(() => {
//     const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;700;900&display=swap');

//         .nb-wrap {
//           background: #ffffff;
//           height: 56px;
//           display: flex;
//           align-items: center;
//           padding: 0 20px;
//           gap: 12px;
//           border-bottom: 2px solid transparent;
//           border-image: linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_DP}, ${CREAM}, ${GOLD_DP}, ${GOLD}, transparent) 1;
//           box-shadow: 0 2px 12px rgba(24,116,132,0.08);
//           font-family: 'Nunito','Segoe UI',sans-serif;
//           position: relative;
//           z-index: 40;
//         }

//         .nb-search-box {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: #f0f7f9;
//           border: 1.5px solid #d8edf1;
//           border-radius: 10px;
//           padding: 7px 14px;
//           min-width: 260px;
//           transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .nb-search-box:focus-within {
//           border-color: ${TEAL};
//           box-shadow: 0 0 0 3px ${TEAL}18;
//         }
//         .nb-search-input {
//           border: none;
//           background: transparent;
//           outline: none;
//           font-size: 13px;
//           color: #1a3a40;
//           font-family: 'Nunito','Segoe UI',sans-serif;
//           width: 100%;
//         }
//         .nb-search-input::placeholder { color: #9bb5ba; font-weight: 500; }

//         .nb-category-btn {
//           display: flex; align-items: center; gap: 4px;
//           background: transparent; border: none; cursor: pointer;
//           color: #187484; font-size: 12px; font-weight: 700;
//           font-family: 'Nunito','Segoe UI',sans-serif;
//           padding: 0; white-space: nowrap;
//         }
//         .nb-category-btn:hover { color: ${GOLD_DP}; }

//         .nb-sep { width: 1px; height: 16px; background: #d8edf1; flex-shrink: 0; }

//         .nb-online {
//           display: flex; align-items: center; gap: 6px;
//           font-size: 13px; font-weight: 700;
//           color: #1a3a40;
//           white-space: nowrap;
//           font-family: 'Nunito','Segoe UI',sans-serif;
//         }
//         .nb-online-dot {
//           width: 8px; height: 8px; border-radius: 50%;
//           background: #66A962;
//           box-shadow: 0 0 6px #66A96288;
//           animation: nb-pulse 2s infinite;
//           flex-shrink: 0;
//         }
//         @keyframes nb-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

//         .nb-avatar-wrap { position: relative; }
//         .nb-dropdown {
//           position: absolute; top: calc(100% + 10px); right: 0;
//           background: #fff;
//           border: 1px solid #d8edf1;
//           border-radius: 14px;
//           box-shadow: 0 8px 32px rgba(24,116,132,0.14);
//           min-width: 200px;
//           z-index: 100;
//           overflow: hidden;
//           animation: nb-drop .18s ease;
//         }
//         @keyframes nb-drop { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }

//         .nb-dropdown-user {
//           padding: 14px 16px 12px;
//           border-bottom: 1px solid #f0f7f9;
//           background: linear-gradient(135deg, ${TEAL}0a, ${GOLD}0a);
//         }
//         .nb-dropdown-item {
//           display: flex; align-items: center; gap: 10px;
//           padding: 10px 16px;
//           font-size: 13px; font-weight: 600;
//           color: #1a3a40;
//           cursor: pointer;
//           transition: background 0.15s;
//           font-family: 'Nunito','Segoe UI',sans-serif;
//         }
//         .nb-dropdown-item:hover { background: #f0f7f9; }
//         .nb-dropdown-item.danger { color: #d9534f; }
//         .nb-dropdown-item.danger:hover { background: #fde8e8; }

//         .nb-brand-block {
//           display: flex; align-items: center; gap: 10px;
//           animation: nb-drop .25s ease;
//         }
//       `}</style>

//       <div className="nb-wrap">

//         {/* ── Brand — only when sidebar hidden ── */}
//         {showBrand && (
//           <div className="nb-brand-block" style={{ marginRight: 16 }}>
//             {/* Bigger Logo */}
//             <div style={{
//               width: 50, height: 50, borderRadius: 13, flexShrink: 0,
//               background: `linear-gradient(135deg, ${GOLD}, #b8832e)`,
//               overflow: "hidden", border: `2px solid ${GOLD}88`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: `0 4px 14px ${GOLD}66`,
//             }}>
//               <img src={logo} alt="जन संवाद" style={{ width:"100%", height:"100%", objectFit:"cover" }}
//                 onError={e => { e.target.style.display="none"; e.target.parentNode.innerHTML='<span style="font-size:22px">⚖️</span>'; }}/>
//             </div>

//             {/* Text block */}
//             <div style={{ lineHeight: 1.25 }}>
//               {/* वसई-विरार first — large bold */}
//               <div style={{
//                 fontSize: 15, fontWeight: 900, color: TEAL,
//                 fontFamily: "'Noto Sans Devanagari','Nunito',sans-serif",
//                 letterSpacing: 0.2,
//               }}>
//                 वसई-विरार शहर महानगरपालिका
//               </div>
//               {/* जन संवाद second — larger bold */}
//               <div style={{
//                 fontSize: 20, fontWeight: 900, color: TEAL_TO,
//                 fontFamily: "'Noto Sans Devanagari','Nunito',sans-serif",
//                 letterSpacing: 0.4, lineHeight: 1.1,
//               }}>
//                 जन संवाद
//               </div>
//               <div style={{ fontSize: 9, fontWeight: 700, color: "#9bb5ba", letterSpacing: 1.4, textTransform: "uppercase", marginTop: 1 }}>
//                 ADMIN PANEL · VVCMC
//               </div>
//             </div>

//             <div className="nb-sep" style={{ margin: "0 12px", height: 40 }}/>
//           </div>
//         )}

//         {/* ── Search Box ── */}
//         <div className="nb-search-box">
//           <FiSearch size={14} color="#9bb5ba"/>
//           <div className="nb-sep"/>
//           <button className="nb-category-btn">
//             All Category <FiChevronDown size={12}/>
//           </button>
//           <div className="nb-sep"/>
//           <input className="nb-search-input" placeholder="Search here…"/>
//         </div>

//         {/* Spacer */}
//         <div style={{ flex: 1 }}/>

//         {/* ── Online count ── */}
//         <div className="nb-online">
//           <span className="nb-online-dot"/>
//           {peopleOnline} Online
//         </div>

//         <div className="nb-sep"/>

//         {/* ── Avatar + Dropdown ── */}
//         <div className="nb-avatar-wrap" ref={dropRef}>
//           <div onClick={() => setDropdown(p => !p)}>
//             <Avatar name={user?.fullName || user?.userName || "Admin User"}/>
//           </div>

//           {dropdown && (
//             <div className="nb-dropdown">
//               {/* User info */}
//               <div className="nb-dropdown-user">
//                 <div style={{ fontSize:13, fontWeight:800, color:"#1a3a40" }}>
//                   {user?.fullName || user?.userName || "Admin User"}
//                 </div>
//                 <div style={{ fontSize:11, color:"#9bb5ba", fontWeight:600, marginTop:2 }}>{user?.role || "Admin"}</div>
//                 {user?.departmentName && (
//                   <div style={{ fontSize:11, color:"#9bb5ba", fontWeight:600, marginTop:1 }}>
//                     Dept: <span style={{ color: TEAL, fontWeight:700 }}>{user.departmentName}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Bell */}
//               <div className="nb-dropdown-item">
//                 <FiBell size={14} color={TEAL}/>
//                 Notifications
//               </div>

//               {/* Help */}
//               <div className="nb-dropdown-item">
//                 <FiHelpCircle size={14} color={TEAL}/>
//                 Help
//               </div>

//               {/* Logout */}
//               <div className="nb-dropdown-item danger" onClick={handleLogout}>
//                 <FiLogOut size={14}/>
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { FiBell, FiSearch, FiChevronDown, FiGlobe } from "react-icons/fi";

// Map route paths to page title + subtitle. Extend as new routes are added.
const PAGE_META = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back" },
  "/inspections": { title: "Inspections", subtitle: "Manage field inspections" },
  "/users": { title: "Users", subtitle: "Manage system users" },
  "/organizations": { title: "Organizations", subtitle: "Manage organizations" },
  "/reports": { title: "Reports", subtitle: "View and export reports" },
  "/districts": { title: "Districts", subtitle: "Manage districts" },
  "/settings": { title: "Settings", subtitle: "Configure your account" },
};

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "MR", label: "मराठी" },
  { code: "HI", label: "हिंदी" },
];

function Avatar({ name, photo }) {
  const initials = (name || "A")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (photo) {
    return (
      <img
        src={photo}
        alt={name || "User"}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          cursor: "pointer",
        }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #5a67b8, #363b7e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      {initials}
    </div>
  );
}

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userDropdown, setUserDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [hasUnread, setHasUnread] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const userDropRef = useRef(null);
  const langDropRef = useRef(null);

  const displayName = user?.fullName || user?.userName || "Super Admin";
  const displayHandle = user?.userName || "superadmin";

  const meta = PAGE_META[location.pathname] || { title: "Dashboard", subtitle: "Welcome back" };
  const pageTitle = meta.title;
  const pageSubtitle = `${meta.subtitle}, ${displayName}`;

  useEffect(() => {
    const handler = (e) => {
      if (userDropRef.current && !userDropRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
      if (langDropRef.current && !langDropRef.current.contains(e.target)) {
        setLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .nb2-wrap {
          background: #ffffff;
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 28px;
          gap: 20px;
          border-bottom: 1px solid #edeef2;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          z-index: 40;
          flex-wrap: wrap;
        }
        .nb2-title { font-size: 24px; font-weight: 700; color: #1c1e2b; margin: 0; line-height: 1.2; }
        .nb2-subtitle { font-size: 13.5px; color: #8a8fa3; margin: 2px 0 0; }

        .nb2-right { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }

        .nb2-search {
          display: flex; align-items: center; gap: 8px;
          background: #f4f5f9;
          border: 1px solid #eef0f5;
          border-radius: 10px;
          padding: 9px 16px;
          min-width: 260px;
        }
        .nb2-search:focus-within { border-color: #c7cbe8; }
        .nb2-search input {
          border: none; outline: none; background: transparent;
          font-size: 14px; color: #1c1e2b; width: 100%;
          font-family: inherit;
        }
        .nb2-search input::placeholder { color: #aeb1c2; }

        .nb2-lang-btn {
          display: flex; align-items: center; gap: 6px;
          background: #f4f5f9;
          border: 1px solid #eef0f5;
          border-radius: 24px;
          padding: 8px 14px;
          font-size: 13.5px;
          font-weight: 600;
          color: #5c5f72;
          cursor: pointer;
        }

        .nb2-bell-btn {
          position: relative;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #f4f5f9;
          border: 1px solid #eef0f5;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #5c5f72;
        }
        .nb2-bell-dot {
          position: absolute; top: 7px; right: 8px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #d6356f;
          border: 1.5px solid #fff;
        }

        .nb2-divider { width: 1px; height: 30px; background: #eef0f5; }

        .nb2-user { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .nb2-user-name { font-size: 14.5px; font-weight: 700; color: #1c1e2b; line-height: 1.2; }
        .nb2-user-handle { font-size: 12.5px; color: #aeb1c2; }

        .nb2-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: #fff;
          border: 1px solid #eef0f5;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(20,20,43,0.10);
          min-width: 190px;
          overflow: hidden;
          z-index: 100;
        }
        .nb2-dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px;
          font-size: 13.5px; font-weight: 600;
          color: #2c2e3d;
          cursor: pointer;
        }
        .nb2-dropdown-item:hover { background: #f4f5f9; }
        .nb2-dropdown-item.danger { color: #d6356f; }
        .nb2-dropdown-item.danger:hover { background: #fde6ed; }
        .nb2-dropdown-user {
          padding: 14px 16px 12px;
          border-bottom: 1px solid #f1f2f6;
        }
      `}</style>

      <div className="nb2-wrap">
        {/* Page title */}
        <div>
          <h1 className="nb2-title">{pageTitle}</h1>
          <p className="nb2-subtitle">{pageSubtitle}</p>
        </div>

        {/* Right controls */}
        <div className="nb2-right">
          {/* Search */}
          <div className="nb2-search">
            <FiSearch size={15} color="#aeb1c2" />
            <input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* Language dropdown */}
          <div style={{ position: "relative" }} ref={langDropRef}>
            <button className="nb2-lang-btn" onClick={() => setLangDropdown((p) => !p)}>
              <FiGlobe size={14} />
              {language}
              <FiChevronDown size={13} />
            </button>
            {langDropdown && (
              <div className="nb2-dropdown" style={{ minWidth: 140 }}>
                {LANGUAGES.map((l) => (
                  <div
                    key={l.code}
                    className="nb2-dropdown-item"
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdown(false);
                    }}
                  >
                    {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification bell */}
          <button
            className="nb2-bell-btn"
            onClick={() => setHasUnread(false)}
            title="Notifications"
          >
            <FiBell size={16} />
            {hasUnread && <span className="nb2-bell-dot" />}
          </button>

          <div className="nb2-divider" />

          {/* User + dropdown */}
          <div style={{ position: "relative" }} ref={userDropRef}>
            <div className="nb2-user" onClick={() => setUserDropdown((p) => !p)}>
              <Avatar name={displayName} photo={user?.profileImage} />
              <div>
                <div className="nb2-user-name">{displayName}</div>
                <div className="nb2-user-handle">{displayHandle}</div>
              </div>
              <FiChevronDown size={15} color="#aeb1c2" />
            </div>

            {userDropdown && (
              <div className="nb2-dropdown">
                <div className="nb2-dropdown-user">
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1c1e2b" }}>
                    {displayName}
                  </div>
                  <div style={{ fontSize: 12, color: "#aeb1c2", marginTop: 2 }}>
                    {user?.role || "Admin"}
                  </div>
                </div>
                <div
                  className="nb2-dropdown-item"
                  onClick={() => navigate("/settings")}
                >
                  Account Settings
                </div>
                <div className="nb2-dropdown-item danger" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}