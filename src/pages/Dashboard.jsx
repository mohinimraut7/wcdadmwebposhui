// // import React, { useState, useEffect, useCallback, useRef } from "react";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import axiosInstance from "../services/axiosInstance";
// // import citizenAxios from "../services/citizenAxios";
// // import axios from "axios";

// // const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // const P = {
// //   teal:"#4CABC1", tealDeep:"#49ACC3", tealDark:"#187484",
// //   gold:"#CE9A54", goldDeep:"#CA9D28", sage:"#66A962", cream:"#F5E7C2",
// //   card1From:"#4CABC1", card1To:"#49ACC3",
// //   card2From:"#CE9A54", card2To:"#CA9D28",
// //   card3From:"#66A962", card3To:"#4a8f47",
// //   card4From:"#F5E7C2", card4To:"#e0c98a",
// //   bg:"#f0f7f9", white:"#ffffff", text:"#1a3a40", muted:"#6b8f95", border:"#d8edf1",
// // };
// // const ACCENT = [P.teal, P.gold, P.sage, P.tealDeep, P.goldDeep, P.tealDark, P.gold, P.teal];

// // const FULL_ACCESS_ROLES = ["Super Admin", "Guardian Minister", "Mayor", "Admin"];

// // const getAuthUser = () => {
// //   try { return JSON.parse(localStorage.getItem("authUser") || "{}"); } catch { return {}; }
// // };

// // const STATUS_CFG = {
// //   pending:      {bg:"#fef9c3",color:"#92400e",border:"#fde68a",dot:"#f59e0b",label:"Pending"},
// //   approved:     {bg:"#dcfce7",color:"#166534",border:"#86efac",dot:"#16a34a",label:"Approved"},
// //   rejected:     {bg:"#fee2e2",color:"#991b1b",border:"#fca5a5",dot:"#ef4444",label:"Rejected"},
// //   "in progress":{bg:"#dbeafe",color:"#1e40af",border:"#93c5fd",dot:"#3b82f6",label:"In Progress"},
// //   resolved:     {bg:"#f0fdf4",color:"#166534",border:"#bbf7d0",dot:"#22c55e",label:"Resolved"},
// // };
// // const sc = s => STATUS_CFG[(s||"pending").toLowerCase()] || STATUS_CFG.pending;

// // function Sparkline({ color="#fff", data=[30,45,35,60,40,70,55] }) {
// //   const w=90,h=36,max=Math.max(...data),min=Math.min(...data);
// //   const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/(max-min+1))*(h-4)-2}`).join(" ");
// //   const gid=`sg${color.replace('#','')}`;
// //   return (
// //     <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{opacity:.75}}>
// //       <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
// //         <stop offset="0%" stopColor={color} stopOpacity=".45"/>
// //         <stop offset="100%" stopColor={color} stopOpacity="0"/>
// //       </linearGradient></defs>
// //       <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${gid})`}/>
// //       <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //     </svg>
// //   );
// // }

// // function Donut({ pct=0 }) {
// //   const r=46,c=2*Math.PI*r,dash=(pct/100)*c;
// //   return (
// //     <svg width={112} height={112} viewBox="0 0 112 112">
// //       <circle cx={56} cy={56} r={r} fill="none" stroke={P.border} strokeWidth={12}/>
// //       <circle cx={56} cy={56} r={r} fill="none" stroke={P.teal} strokeWidth={12}
// //         strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round" transform="rotate(-90 56 56)"
// //         style={{transition:"stroke-dasharray 1s ease"}}/>
// //       <text x={56} y={52} textAnchor="middle" fontSize={20} fontWeight={900} fill={P.tealDark}>{pct}%</text>
// //       <text x={56} y={66} textAnchor="middle" fontSize={9} fill={P.muted} fontWeight={700} letterSpacing={.8}>RESOLVED</text>
// //     </svg>
// //   );
// // }

// // function MiniBar({ data=[], color=P.teal }) {
// //   const max=Math.max(...data,1);
// //   return (
// //     <div style={{display:"flex",alignItems:"flex-end",gap:3,height:38}}>
// //       {data.map((v,i)=>(
// //         <div key={i} style={{flex:1,borderRadius:"3px 3px 0 0",minHeight:4,
// //           background:i===data.length-1?color:`${color}66`,height:`${(v/max)*100}%`}}/>
// //       ))}
// //     </div>
// //   );
// // }

// // function Av({ name="", size=28, color=P.teal }) {
// //   const ini=name.split(" ").filter(Boolean).map(n=>n[0]).join("").slice(0,2).toUpperCase()||"?";
// //   return (
// //     <div style={{width:size,height:size,borderRadius:"50%",
// //       background:`linear-gradient(135deg,${color},${color}cc)`,
// //       display:"flex",alignItems:"center",justifyContent:"center",
// //       color:"#fff",fontSize:size*.34,fontWeight:800,flexShrink:0,
// //       border:"2.5px solid #fff",boxShadow:`0 2px 8px ${color}44`}}>
// //       {ini}
// //     </div>
// //   );
// // }

// // function toMin(t="08:00 AM") {
// //   if(!t) return 0;
// //   const [tp,per]=(t||"08:00 AM").split(" ");
// //   const [h,m]=(tp||"08:00").split(":").map(Number);
// //   let H=h||8; if(per==="PM"&&H!==12)H+=12; if(per==="AM"&&H===12)H=0;
// //   return Math.max(0,(H*60+(m||0))-(8*60));
// // }

// // function getWeekDates(base) {
// //   const d=new Date(base), day=d.getDay(), diff=day===0?-6:1-day;
// //   const mon=new Date(d); mon.setDate(d.getDate()+diff);
// //   return Array.from({length:7},(_,i)=>{ const dt=new Date(mon); dt.setDate(mon.getDate()+i); return dt; });
// // }
// // function isSameDay(a,b) {
// //   return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
// // }
// // const DAYS_SHORT=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// // function CompactPopup({ appt, color, onClose, anchorRect }) {
// //   const cfg    = sc(appt.status);
// //   const popRef = useRef(null);
// //   const [pos, setPos] = useState({ top:0, left:0, ready:false });
// //   const POPUP_W = 242;

// //   const calcPos = useCallback(() => {
// //     if (!anchorRect || !popRef.current) return;
// //     const PH  = popRef.current.offsetHeight || 320;
// //     const vw  = window.innerWidth;
// //     const vh  = window.innerHeight;
// //     const pad = 10;
// //     let left = anchorRect.right + 8;
// //     if (left + POPUP_W > vw - pad) left = anchorRect.left - POPUP_W - 8;
// //     left = Math.max(pad, Math.min(left, vw - POPUP_W - pad));
// //     let top = anchorRect.top;
// //     if (top + PH > vh - pad) top = vh - PH - pad;
// //     top = Math.max(pad, top);
// //     setPos({ top, left, ready: true });
// //   }, [anchorRect]);

// //   useEffect(() => { const raf = requestAnimationFrame(calcPos); return () => cancelAnimationFrame(raf); }, [calcPos]);
// //   useEffect(() => { window.addEventListener("resize", calcPos); return () => window.removeEventListener("resize", calcPos); }, [calcPos]);
// //   useEffect(() => {
// //     const fn = e => { if (popRef.current && !popRef.current.contains(e.target)) onClose(); };
// //     document.addEventListener("mousedown", fn);
// //     return () => document.removeEventListener("mousedown", fn);
// //   }, [onClose]);
// //   useEffect(() => {
// //     let t;
// //     const fn = () => { clearTimeout(t); t = setTimeout(onClose, 120); };
// //     window.addEventListener("scroll", fn, true);
// //     return () => { window.removeEventListener("scroll", fn, true); clearTimeout(t); };
// //   }, [onClose]);
// //   useEffect(() => {
// //     const fn = e => { if (e.key === "Escape") onClose(); };
// //     document.addEventListener("keydown", fn);
// //     return () => document.removeEventListener("keydown", fn);
// //   }, [onClose]);

// //   return (
// //     <div ref={popRef} style={{
// //       position:"fixed", top:pos.top, left:pos.left,
// //       opacity:pos.ready?1:0, transition:"opacity .1s", zIndex:99999,
// //       width:POPUP_W, background:P.white, borderRadius:14,
// //       boxShadow:"0 8px 36px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.10)",
// //       border:`1px solid ${P.border}`, overflow:"hidden",
// //       animation:"popIn .15s cubic-bezier(.34,1.4,.64,1)",
// //     }}>
// //       <div style={{background:`linear-gradient(135deg,${color},${color}dd)`,padding:"11px 12px 10px",display:"flex",alignItems:"center",gap:10}}>
// //         <Av name={appt.fullName} size={36} color={color}/>
// //         <div style={{flex:1,minWidth:0}}>
// //           <div style={{fontSize:13,fontWeight:900,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{appt.fullName||"—"}</div>
// //           <div style={{fontSize:10,color:"rgba(255,255,255,0.82)",marginTop:2,fontWeight:600}}>{appt.slotTime||"—"}</div>
// //         </div>
// //         <button onClick={e=>{e.stopPropagation();onClose();}} style={{background:"rgba(255,255,255,0.22)",border:"none",borderRadius:"50%",width:22,height:22,cursor:"pointer",color:"#fff",fontSize:13,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1}}>✕</button>
// //       </div>
// //       <div style={{padding:"10px 13px 12px"}}>
// //         <PRow icon="📱" val={appt.mobileNumber||"—"} bold/>
// //         <PRow icon="📍" val={`Ward: ${appt.ward||"—"}`}/>
// //         {appt.purpose && <PRow icon="🎯" val={appt.purpose.slice(0,44)+(appt.purpose.length>44?"…":"")}/>}
// //         <PRow icon="👥" val={`Visitors: ${appt.numberOfVisitors||1}`}/>
// //         {appt.preferredDate && <PRow icon="📅" val={new Date(appt.preferredDate+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}/>}
// //         <div style={{marginTop:8,marginBottom:8}}>
// //           <span style={{display:"inline-flex",alignItems:"center",gap:6,background:cfg.bg,color:cfg.color,border:`1.5px solid ${cfg.border}`,padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:800}}>
// //             <span style={{width:7,height:7,borderRadius:"50%",background:cfg.dot,display:"inline-block"}}/>
// //             {cfg.label}
// //           </span>
// //         </div>
// //         {(appt.tokenId||appt._id)&&(
// //           <div style={{fontSize:9.5,color:P.muted,fontWeight:600,fontFamily:"monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
// //             Token: {appt.tokenId||appt._id?.slice(-12)||"—"}
// //           </div>
// //         )}
// //         <div style={{borderTop:`1px solid ${P.border}`,marginTop:10,paddingTop:8,display:"flex",justifyContent:"flex-end"}}>
// //           <span style={{fontSize:11.5,color:P.teal,fontWeight:800,cursor:"pointer"}}>View Details ↗</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function PRow({ icon, val, bold=false }) {
// //   return (
// //     <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
// //       <span style={{fontSize:13,flexShrink:0,marginTop:1}}>{icon}</span>
// //       <span style={{fontSize:11.5,fontWeight:bold?700:600,color:bold?P.text:P.muted,lineHeight:1.4}}>{val}</span>
// //     </div>
// //   );
// // }

// // function ApptCard({ appt, color }) {
// //   const [anchorRect, setAnchorRect] = useState(null);
// //   const cardRef = useRef(null);
// //   const isOpen  = !!anchorRect;

// //   const handleClick = useCallback(e => {
// //     e.stopPropagation();
// //     if (isOpen) { setAnchorRect(null); return; }
// //     const rect = cardRef.current?.getBoundingClientRect();
// //     if (rect) setAnchorRect({ ...rect });
// //   }, [isOpen]);

// //   const handleClose = useCallback(() => setAnchorRect(null), []);

// //   return (
// //     <>
// //       <div ref={cardRef} onClick={handleClick} style={{
// //         background:isOpen?`${color}22`:`${color}14`,
// //         border:`1.5px solid ${isOpen?color:color+"55"}`,
// //         borderLeft:`3px solid ${color}`,
// //         borderRadius:"0 8px 8px 0",
// //         padding:"5px 8px", cursor:"pointer", marginBottom:4,
// //         userSelect:"none", transition:"all .13s",
// //         boxShadow:isOpen?`0 4px 14px ${color}33`:"none",
// //       }}
// //         onMouseEnter={e=>{e.currentTarget.style.background=`${color}26`;e.currentTarget.style.borderColor=color;e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 4px 14px ${color}33`;}}
// //         onMouseLeave={e=>{e.currentTarget.style.background=isOpen?`${color}22`:`${color}14`;e.currentTarget.style.borderColor=isOpen?color:`${color}55`;e.currentTarget.style.borderLeftColor=color;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=isOpen?`0 4px 14px ${color}33`:"none";}}
// //       >
// //         <div style={{display:"flex",alignItems:"center",gap:6}}>
// //           <Av name={appt.fullName} size={20} color={color}/>
// //           <div style={{flex:1,minWidth:0}}>
// //             <div style={{fontSize:10.5,fontWeight:800,color:P.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{appt.fullName||"—"}</div>
// //             <div style={{fontSize:9,fontWeight:700,color:color,marginTop:1,display:"flex",alignItems:"center",gap:5}}>
// //               {appt.slotTime||"—"}
// //               <span style={{width:5,height:5,borderRadius:"50%",flexShrink:0,background:sc(appt.status).dot,display:"inline-block"}}/>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {isOpen && <CompactPopup appt={appt} color={color} onClose={handleClose} anchorRect={anchorRect}/>}
// //     </>
// //   );
// // }

// // function CalendarPanel({ appointments=[], mayorSlots=[], loading=false }) {
// //   const [view,     setView]     = useState("week");
// //   const [weekBase, setWeekBase] = useState(new Date());
// //   const [search,   setSearch]   = useState("");

// //   const weekDates = getWeekDates(weekBase);
// //   const today     = new Date();

// //   const filtered = appointments.filter(a => {
// //     if (!search) return true;
// //     const q = search.toLowerCase();
// //     return (a.fullName||"").toLowerCase().includes(q)||(a.purpose||"").toLowerCase().includes(q)||(a.ward||"").toLowerCase().includes(q)||(a.mobileNumber||"").includes(q);
// //   });

// //   const ds = dt => `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,"0")}`;
// //   const appsForDate = dt => filtered.filter(a => (a.preferredDate||"").slice(0,10) === ds(dt));

// //   const todayStr = ds(today);
// //   const dayAppts = filtered.filter(a => (a.preferredDate||"").slice(0,10) === todayStr);
// //   const approvedCnt = filtered.filter(a => (a.status||"").toLowerCase() === "approved").length;
// //   const pendingCnt  = filtered.filter(a => (a.status||"").toLowerCase() === "pending").length;
// //   const monthLabel = weekDates[0].toLocaleDateString("en-IN",{month:"long",year:"numeric"});
// //   const hours = Array.from({length:10},(_,i) => 8+i);
// //   const fmtH = h => h<12?`${h} AM`:h===12?"12 PM":`${h-12} PM`;

// //   return (
// //     <div className="dc" style={{animationDelay:".3s",background:P.white,borderRadius:16,overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.07)",border:`1px solid ${P.border}`,display:"flex",flexDirection:"column"}}>
// //       <div style={{padding:"13px 16px 10px",borderBottom:`1px solid ${P.border}`}}>
// //         <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10,gap:8,flexWrap:"wrap"}}>
// //           <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
// //             <div>
// //               <h3 style={{margin:0,fontSize:14,fontWeight:900,color:P.tealDark}}>📅 Today's Appointments</h3>
// //               <p style={{margin:"2px 0 0",fontSize:10,color:P.muted,fontWeight:600}}>{today.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
// //             </div>
// //             <div style={{background:`linear-gradient(135deg,${P.teal},${P.tealDark})`,color:"#fff",fontSize:12,fontWeight:900,padding:"3px 12px",borderRadius:20,boxShadow:`0 3px 10px ${P.teal}44`,whiteSpace:"nowrap"}}>{filtered.length} All Appointments</div>
// //           </div>
// //           <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
// //             <div style={{position:"relative"}}>
// //               <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",fontSize:11,color:P.muted}}>🔍</span>
// //               <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{border:`1.5px solid ${P.border}`,borderRadius:8,padding:"5px 10px 5px 26px",fontSize:11,color:P.text,outline:"none",background:P.bg,width:130,fontFamily:"inherit"}}/>
// //             </div>
// //             <div style={{display:"flex",background:P.bg,border:`1px solid ${P.border}`,borderRadius:9,padding:2}}>
// //               {["Day","Week"].map(v=>(
// //                 <button key={v} onClick={()=>setView(v.toLowerCase())} style={{padding:"4px 12px",borderRadius:7,border:"none",background:view===v.toLowerCase()?`linear-gradient(135deg,${P.teal},${P.tealDark})`:"transparent",color:view===v.toLowerCase()?"#fff":P.muted,fontSize:11,fontWeight:800,cursor:"pointer",transition:"all .15s"}}>{v}</button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
// //           {view==="week"?(
// //             <div style={{display:"flex",alignItems:"center",gap:8}}>
// //               <button onClick={()=>{const d=new Date(weekBase);d.setDate(d.getDate()-7);setWeekBase(d);}} style={{background:P.bg,border:`1px solid ${P.border}`,borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:14,color:P.tealDark,fontWeight:800}}>‹</button>
// //               <span style={{fontSize:12,fontWeight:800,color:P.tealDark,minWidth:120,textAlign:"center"}}>{monthLabel}</span>
// //               <button onClick={()=>{const d=new Date(weekBase);d.setDate(d.getDate()+7);setWeekBase(d);}} style={{background:P.bg,border:`1px solid ${P.border}`,borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:14,color:P.tealDark,fontWeight:800}}>›</button>
// //             </div>
// //           ):<div/>}
// //           <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
// //             {[{l:"Today",v:dayAppts.length,c:P.teal},{l:"Approved",v:approvedCnt,c:P.sage},{l:"Pending",v:pendingCnt,c:P.gold}].map(({l,v,c})=>(
// //               <span key={l} style={{background:`${c}18`,border:`1px solid ${c}44`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800,color:c,whiteSpace:"nowrap"}}>{v} {l}</span>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {mayorSlots.length>0&&(
// //         <div style={{display:"flex",gap:6,flexWrap:"wrap",padding:"5px 16px",background:`${P.cream}88`,borderBottom:`1px solid ${P.border}`}}>
// //           <span style={{fontSize:9,fontWeight:800,color:P.tealDark,textTransform:"uppercase",letterSpacing:.8,alignSelf:"center"}}>Mayor Available:</span>
// //           {mayorSlots.map((s,i)=>(
// //             <span key={i} style={{fontSize:9.5,fontWeight:700,color:P.tealDark,background:`${P.teal}1a`,border:`1px solid ${P.teal}33`,borderRadius:20,padding:"2px 9px"}}>{s.start} – {s.end}</span>
// //           ))}
// //         </div>
// //       )}

// //       {loading?(
// //         <div style={{textAlign:"center",padding:"48px 0",color:P.muted}}>
// //           <div style={{width:26,height:26,border:`3px solid ${P.border}`,borderTopColor:P.teal,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 10px"}}/>
// //           Loading appointments…
// //         </div>
// //       ):view==="week"?(
// //         <div style={{overflowX:"auto",overflowY:"auto",maxHeight:380}}>
// //           <div style={{minWidth:560}}>
// //             <div style={{display:"grid",gridTemplateColumns:"50px repeat(7,1fr)",borderBottom:`1.5px solid ${P.border}`,background:P.bg,position:"sticky",top:0,zIndex:4}}>
// //               <div style={{borderRight:`1px solid ${P.border}`}}/>
// //               {weekDates.map((dt,i)=>{
// //                 const isToday=isSameDay(dt,today),cnt=appsForDate(dt).length;
// //                 return(
// //                   <div key={i} style={{padding:"7px 3px",textAlign:"center",borderRight:i<6?`1px solid ${P.border}`:undefined,background:isToday?`${P.teal}0e`:"transparent"}}>
// //                     <div style={{fontSize:9.5,fontWeight:700,color:isToday?P.teal:P.muted,letterSpacing:.4}}>{DAYS_SHORT[i]}</div>
// //                     <div style={{width:27,height:27,borderRadius:"50%",margin:"2px auto 0",background:isToday?`linear-gradient(135deg,${P.teal},${P.tealDark})`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:isToday?"#fff":P.text}}>{dt.getDate()}</div>
// //                     {cnt>0&&<div style={{marginTop:2,fontSize:8,fontWeight:800,color:isToday?"#fff":P.teal,background:isToday?`${P.teal}cc`:`${P.teal}18`,borderRadius:20,padding:"1px 5px",display:"inline-block"}}>{cnt}</div>}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //             {hours.map(hour=>(
// //               <div key={hour} style={{display:"grid",gridTemplateColumns:"50px repeat(7,1fr)",borderBottom:`1px solid ${P.border}55`,minHeight:54}}>
// //                 <div style={{borderRight:`1px solid ${P.border}`,padding:"4px 5px 0 0",textAlign:"right",fontSize:9,fontWeight:700,color:P.muted,background:P.bg,position:"sticky",left:0,zIndex:2}}>{fmtH(hour)}</div>
// //                 {weekDates.map((dt,di)=>{
// //                   const isToday=isSameDay(dt,today);
// //                   const slotAppts=appsForDate(dt).filter(a=>{const m=toMin(a.slotTime||"");return m>=(hour-8)*60&&m<(hour-8+1)*60;});
// //                   return(
// //                     <div key={di} style={{borderRight:di<6?`1px solid ${P.border}55`:undefined,padding:"3px 3px",background:isToday?`${P.teal}05`:"transparent"}}>
// //                       {slotAppts.map((appt,ai)=>{const gIdx=filtered.indexOf(appt);return <ApptCard key={ai} appt={appt} color={ACCENT[gIdx%ACCENT.length]}/>;
// //                       })}
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       ):(
// //         <div style={{overflowY:"auto",maxHeight:380}}>
// //           {dayAppts.length===0?(
// //             <div style={{textAlign:"center",padding:"44px 0",color:P.muted}}>
// //               <div style={{fontSize:32,marginBottom:8}}>📅</div>
// //               <div style={{fontWeight:700,fontSize:13,color:P.text,marginBottom:3}}>No appointments today</div>
// //               <div style={{fontSize:11}}>Switch to Week view to browse other days</div>
// //             </div>
// //           ):(
// //             <div style={{padding:"8px 16px"}}>
// //               {hours.map(hour=>{
// //                 const label=hour<12?`${hour}:00 AM`:hour===12?"12:00 PM":`${hour-12}:00 PM`;
// //                 const hAppts=dayAppts.filter(a=>{const m=toMin(a.slotTime||"");return m>=(hour-8)*60&&m<(hour-8+1)*60;});
// //                 return(
// //                   <div key={hour} style={{display:"flex",gap:10,marginBottom:hAppts.length?8:2}}>
// //                     <div style={{width:56,fontSize:9,fontWeight:hAppts.length?800:600,color:hAppts.length?P.teal:P.border,textAlign:"right",paddingTop:5,flexShrink:0,fontFamily:"monospace"}}>{label}</div>
// //                     <div style={{flex:1,borderTop:hAppts.length?"none":`1px solid ${P.border}33`,paddingTop:hAppts.length?0:5}}>
// //                       {hAppts.length>0&&(
// //                         <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(hAppts.length,3)},1fr)`,gap:6}}>
// //                           {hAppts.map((appt,ai)=>{const gIdx=filtered.indexOf(appt);return <ApptCard key={ai} appt={appt} color={ACCENT[gIdx%ACCENT.length]}/>;
// //                           })}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       <div style={{borderTop:`1px solid ${P.border}`,padding:"6px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",background:P.bg,flexWrap:"wrap",gap:4}}>
// //         <div style={{display:"flex",alignItems:"center",gap:5}}>
// //           <span style={{width:7,height:7,borderRadius:"50%",background:P.sage,display:"inline-block",animation:"pulse 2s infinite",boxShadow:`0 0 6px ${P.sage}`}}/>
// //           <span style={{fontSize:9.5,color:P.muted,fontWeight:700}}>Live · 8:00 AM – 6:00 PM</span>
// //         </div>
// //         <span style={{fontSize:9.5,color:P.muted}}>{filtered.length} total appointments</span>
// //       </div>
// //     </div>
// //   );
// // }

// // function ProgressBar({ value, max, color }) {
// //   const pct = max > 0 ? Math.round((value / max) * 100) : 0;
// //   return (
// //     <div style={{ height: 6, borderRadius: 99, background: P.bg, overflow: "hidden" }}>
// //       <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 1s ease" }}/>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Dashboard
// // // ─────────────────────────────────────────────────────────────────────────────
// // export default function Dashboard() {
// //   const navigate = useNavigate();
// //   const { user } = useSelector(s => s.auth);

// //   const [stats,        setStats]        = useState({total:0,pending:0,resolved:0,inProgress:0});
// //   const [recent,       setRecent]       = useState([]);
// //   const [talukaData,   setTalukaData]   = useState({});
// //   const [weeklyData,   setWeeklyData]   = useState([4,7,5,9,12,8,15]);
// //   const [loading,      setLoading]      = useState(true);
// //   const [activeTab,    setActiveTab]    = useState("all");

// //   const [appointments, setAppointments] = useState([]);
// //   const [apptLoading,  setApptLoading]  = useState(true);
// //   const [mayorSlots,   setMayorSlots]   = useState([]);
// //   const [peopleOnline, setPeopleOnline] = useState(0);

// //   const [meetingStats, setMeetingStats] = useState({
// //     totalMeetings: 0,
// //     totalSubjects: 0,
// //     approved: 0,
// //     rejected: 0,
// //     onHold: 0,
// //     postponed: 0,
// //     notConducted: 0,
// //     actionTakenSubjects: 0,
// //     subjectsByType: { General: 0, Administrative: 0, Contract: 0 },
// //     actionProgress: {},
// //     departmentStats: {},
// //   });
// //   const [meetingLoading, setMeetingLoading] = useState(true);

// //   // ── Role & dept helpers ───────────────────────────────────────────────────
// //   const authUser     = getAuthUser();
// //   const userRole     = authUser?.role || "";
// //   const userDept     = authUser?.departmentName || "";
// //   const isFullAccess = FULL_ACCESS_ROLES.includes(userRole);

// //   // ── Fetch Inward (dept-filtered for dept users) ───────────────────────────
// //   const fetchDashboard = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res  = await axiosInstance.get("/inwardAll");
// //       let data   = res.data?.data || [];

// //       // For department users, filter inward records tagged to their department
// //       if (!isFullAccess && userDept) {
// //         data = data.filter(d =>
// //           (d.mainDepartment && d.mainDepartment === userDept) ||
// //           (d.departmentName && d.departmentName === userDept) ||
// //           (Array.isArray(d.departments) && d.departments.includes(userDept))
// //         );
// //       }

// //       setStats({
// //         total:      data.length,
// //         pending:    data.filter(d => d.status==="Pending").length,
// //         resolved:   data.filter(d => d.status==="Resolved").length,
// //         inProgress: data.filter(d => d.status==="In Progress").length,
// //       });

// //       // Taluka tracking — only for full access
// //       if (isFullAccess) {
// //         const tMap={};
// //         data.forEach(d => { if(d.taluka) tMap[d.taluka]=(tMap[d.taluka]||0)+1; });
// //         setTalukaData(tMap);
// //       }

// //       const now=Date.now(), wk=Array(7).fill(0);
// //       data.forEach(d => { const diff=Math.floor((now-new Date(d.createdAt))/86400000); if(diff>=0&&diff<7)wk[6-diff]++; });
// //       setWeeklyData(wk.map(v=>v||Math.floor(2+Math.random()*6)));
// //       setRecent(data.slice(0,8));
// //     } catch(e) { console.error(e); }
// //     finally { setLoading(false); }
// //   }, [isFullAccess, userDept]);

// //   const fetchAppointments = useCallback(async () => {
// //     // Appointments calendar only shown for full-access roles
// //     if (!isFullAccess) { setApptLoading(false); return; }
// //     setApptLoading(true);
// //     try {
// //       const res = await citizenAxios.get("/citizen/admin/all-appointments");
// //       if(res.data.success) setAppointments(res.data.appointments||[]);
// //     } catch(e) { console.error(e); setAppointments([]); }
// //     finally { setApptLoading(false); }
// //   }, [isFullAccess]);

// //   const fetchMayorSlots = useCallback(async () => {
// //     if (!isFullAccess) return;
// //     try {
// //       const res = await axios.get(`${BASE_URL}/api/availability/get`);
// //       if(res.data.success) {
// //         const ts=new Date().toISOString().slice(0,10);
// //         const rec=res.data.data.find(a=>a.date===ts);
// //         setMayorSlots(rec?.timeSlots||[]);
// //       }
// //     } catch(e) { console.error(e); }
// //   }, [isFullAccess]);

// //   // ── Fetch Meeting Analytics ───────────────────────────────────────────────
// //   const fetchMeetingStats = useCallback(async () => {
// //     setMeetingLoading(true);
// //     try {
// //       const res  = await axiosInstance.get("/getMeetings");
// //       const data = res.data?.data || [];

// //       // Collect subjects based on role
// //       const allSubjects = [];
// //       data.forEach(m => {
// //         (m.subjects || []).forEach(sub => {
// //           if (isFullAccess || (Array.isArray(sub.tagTo) && sub.tagTo.includes(userDept))) {
// //             allSubjects.push({ ...sub, meetingNumber: m.meetingNumber });
// //           }
// //         });
// //       });

// //       // Filter meetings based on role
// //       const meetings = isFullAccess
// //         ? data
// //         : data.filter(m => (m.subjects || []).some(sub => Array.isArray(sub.tagTo) && sub.tagTo.includes(userDept)));

// //       const approved     = allSubjects.filter(s => s.decisionInMeeting === "Approved").length;
// //       const rejected     = allSubjects.filter(s => s.decisionInMeeting === "Rejected").length;
// //       const onHold       = allSubjects.filter(s => s.decisionInMeeting === "On-Hold").length;
// //       const postponed    = allSubjects.filter(s => s.decisionInMeeting === "Postponed").length;
// //       const notConducted = allSubjects.filter(s => s.decisionInMeeting === "Not Conducted").length;
// //       const actionTaken  = allSubjects.filter(s => s.actionTaken && s.actionTaken !== "").length;

// //       const subjectsByType = {
// //         General:        allSubjects.filter(s => s.subjectType === "General").length,
// //         Administrative: allSubjects.filter(s => s.subjectType === "Administrative and Financial Approval").length,
// //         Contract:       allSubjects.filter(s => s.subjectType === "Contract Approval").length,
// //       };

// //       const actionProgress = {};
// //       allSubjects.forEach(s => {
// //         if (s.actionTaken) actionProgress[s.actionTaken] = (actionProgress[s.actionTaken] || 0) + 1;
// //       });

// //       // Department wise stats — all depts for full access, only own dept for dept user
// //       const departmentStats = {};
// //       allSubjects.forEach(s => {
// //         (s.tagTo || []).forEach(dept => {
// //           // For dept users, only include their own department
// //           if (!isFullAccess && dept !== userDept) return;
// //           if (!departmentStats[dept]) departmentStats[dept] = { total: 0, approved: 0, actionTaken: 0 };
// //           departmentStats[dept].total++;
// //           if (s.decisionInMeeting === "Approved") departmentStats[dept].approved++;
// //           if (s.actionTaken) departmentStats[dept].actionTaken++;
// //         });
// //       });

// //       setMeetingStats({
// //         totalMeetings: meetings.length,
// //         totalSubjects: allSubjects.length,
// //         approved, rejected, onHold, postponed, notConducted,
// //         actionTakenSubjects: actionTaken,
// //         subjectsByType,
// //         actionProgress,
// //         departmentStats,
// //       });
// //     } catch(e) { console.error(e); }
// //     finally { setMeetingLoading(false); }
// //   }, [isFullAccess, userDept]);

// //   useEffect(() => {
// //     fetchDashboard(); fetchAppointments(); fetchMayorSlots(); fetchMeetingStats();
// //     const iv = setInterval(() => setPeopleOnline(Math.floor(12+Math.random()*8)), 4000);
// //     setPeopleOnline(Math.floor(12+Math.random()*8));
// //     return () => clearInterval(iv);
// //   }, [fetchDashboard, fetchAppointments, fetchMayorSlots, fetchMeetingStats]);

// //   const resRate = stats.total > 0 ? Math.round((stats.resolved/stats.total)*100) : 0;
// //   const statusColor = {"Pending":P.gold,"Resolved":P.sage,"In Progress":P.teal,"Rejected":"#d9534f"};
// //   const statusBg    = {"Pending":`${P.gold}22`,"Resolved":`${P.sage}22`,"In Progress":`${P.teal}22`,"Rejected":"#fde8e8"};
// //   const filteredRecent = activeTab==="all" ? recent : recent.filter(r=>r.status===activeTab);

// //   // Stat cards — same structure for both, but values differ (dept-filtered above)
// //   const cards = [
// //     {label:"TOTAL APPLICATIONS",value:stats.total.toLocaleString(),   sub:"▲ 12% last week",from:P.card1From,to:P.card1To,spark:[40,55,45,70,60,85,75],dark:false},
// //     {label:"PENDING",           value:stats.pending.toLocaleString(),  sub:"▼ 5% last week", from:P.card2From,to:P.card2To,spark:[30,50,35,60,40,70,55],dark:false},
// //     {label:"RESOLVED",          value:stats.resolved.toLocaleString(), sub:"▲ 8% last week", from:P.card3From,to:P.card3To,spark:[20,40,30,55,45,65,60],dark:false},
// //     {label:"IN PROGRESS",       value:stats.inProgress.toLocaleString(),sub:"— ongoing",     from:P.card4From,to:P.card4To,spark:[15,30,25,40,35,50,45],dark:true},
// //   ];

// //   return (
// //     <div style={{minHeight:"100vh",background:P.bg,fontFamily:"'Nunito','Segoe UI',sans-serif"}}>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
// //         @keyframes fadeUp {from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
// //         @keyframes popIn  {from{opacity:0;transform:scale(.92) translateY(-4px)}to{opacity:1;transform:none}}
// //         @keyframes pulse  {0%,100%{opacity:1}50%{opacity:.35}}
// //         @keyframes spin   {to{transform:rotate(360deg)}}
// //         .dc{animation:fadeUp .4s ease both;}
// //         .tbl-row:hover{background:${P.teal}12!important;cursor:pointer;}
// //         ::-webkit-scrollbar{width:5px;height:5px;}
// //         ::-webkit-scrollbar-track{background:transparent;}
// //         ::-webkit-scrollbar-thumb{background:${P.border};border-radius:99px;}
// //         *{box-sizing:border-box;}
// //         .dash-grid-4    {display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
// //         .dash-grid-cal  {display:grid;grid-template-columns:1fr 288px;gap:18px;}
// //         .dash-grid-track{display:grid;grid-template-columns:260px 1fr;gap:18px;}
// //         .mtg-grid-3     {display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
// //         @media(max-width:1100px){
// //           .dash-grid-cal  {grid-template-columns:1fr!important;}
// //           .dash-grid-track{grid-template-columns:1fr!important;}
// //           .mtg-grid-3     {grid-template-columns:1fr 1fr!important;}
// //         }
// //         @media(max-width:800px){
// //           .dash-grid-4{grid-template-columns:repeat(2,1fr)!important;gap:10px!important;}
// //           .mtg-grid-3 {grid-template-columns:1fr!important;}
// //         }
// //         @media(max-width:480px){
// //           .dash-grid-4{grid-template-columns:1fr!important;}
// //           .dash-pad{padding:12px 10px!important;}
// //         }
// //       `}</style>

// //       <div className="dash-pad" style={{padding:"20px 24px",maxWidth:1440,margin:"0 auto"}}>

// //         {/* Accent bar */}
// //         <div style={{height:4,background:`linear-gradient(90deg,${P.tealDark},${P.teal},${P.gold},${P.goldDeep},${P.cream},${P.goldDeep},${P.teal})`,borderRadius:99,marginBottom:20}}/>

// //         {/* Page header */}
// //         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
// //           <div>
// //             <h2 style={{margin:0,fontSize:19,fontWeight:900,color:P.tealDark,letterSpacing:-.3}}>Analytic Overview</h2>
// //             <p style={{margin:"3px 0 0",fontSize:11,color:P.muted}}>
// //               Good {new Date().getHours()<12?"Morning":new Date().getHours()<17?"Afternoon":"Evening"}, {user?.fullName?.split(" ")[0]||"Admin"} 👋
// //               {!isFullAccess && userDept && (
// //                 <span style={{marginLeft:8,background:`${P.teal}18`,color:P.tealDark,border:`1px solid ${P.teal}33`,borderRadius:20,padding:"1px 10px",fontSize:10,fontWeight:800}}>
// //                   {userDept}
// //                 </span>
// //               )}
// //             </p>
// //           </div>
// //           <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
// //             <button onClick={()=>{fetchDashboard();fetchAppointments();fetchMayorSlots();fetchMeetingStats();}}
// //               style={{background:P.white,border:`1px solid ${P.border}`,borderRadius:9,padding:"6px 13px",fontSize:11,fontWeight:700,color:P.tealDark,cursor:"pointer"}}>
// //               ↻ Refresh
// //             </button>
// //             {isFullAccess && (
// //               <div style={{display:"flex",alignItems:"center",gap:6,background:P.white,border:`1px solid ${P.border}`,borderRadius:10,padding:"6px 12px"}}>
// //                 <span style={{width:7,height:7,borderRadius:"50%",background:P.sage,display:"inline-block",animation:"pulse 2s infinite",boxShadow:`0 0 7px ${P.sage}`}}/>
// //                 <span style={{fontSize:11,fontWeight:700,color:P.tealDark}}>{peopleOnline} Online</span>
// //               </div>
// //             )}
// //             <div style={{background:P.white,border:`1px solid ${P.border}`,borderRadius:9,padding:"6px 12px",fontSize:11,fontWeight:700,color:P.tealDark}}>THIS YEAR ▾</div>
// //           </div>
// //         </div>

// //         {loading ? (
// //           <div style={{textAlign:"center",padding:80,color:P.teal,fontWeight:700}}>Loading dashboard…</div>
// //         ) : (
// //           <>
// //             {/* ── 4 Stat Cards — always visible, dept users see their dept counts ── */}
// //             {isFullAccess && (
// //             <div className="dash-grid-4" style={{marginBottom:18}}>
// //               {cards.map((card,i)=>(
// //                 <div key={i} className="dc" style={{animationDelay:`${i*.07}s`,borderRadius:16,background:`linear-gradient(135deg,${card.from},${card.to})`,padding:"16px 18px",boxShadow:`0 8px 28px ${card.from}55`,position:"relative",overflow:"hidden",minHeight:105}}>
// //                   <div style={{position:"absolute",top:-18,right:-18,width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,0.13)"}}/>
// //                   <div style={{position:"absolute",bottom:-12,right:8,width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.09)"}}/>
// //                   <div style={{fontSize:9,fontWeight:800,color:card.dark?"#6b5020":"rgba(255,255,255,.88)",letterSpacing:.9,textTransform:"uppercase",marginBottom:4}}>{card.label}</div>
// //                   <div style={{fontSize:26,fontWeight:900,color:card.dark?P.tealDark:"#fff",letterSpacing:-1,marginBottom:2}}>{card.value}</div>
// //                   <div style={{fontSize:9.5,color:card.dark?"#8a6830":"rgba(255,255,255,.72)",fontWeight:600,marginBottom:7}}>{card.sub}</div>
// //                   <Sparkline color={card.dark?"#9a7828":"#fff"} data={card.spark}/>
// //                 </div>
// //               ))}
// //             </div>
// //             )}

// //             {/* ══════════════════════════════════════════════════════════════
// //                 FULL ACCESS ONLY: Calendar + Status panel
// //             ══════════════════════════════════════════════════════════════ */}
// //             {isFullAccess && (
// //               <div className="dash-grid-cal" style={{marginBottom:18}}>
// //                 <CalendarPanel appointments={appointments} mayorSlots={mayorSlots} loading={apptLoading}/>

// //                 {/* Status Panel */}
// //                 <div className="dc" style={{animationDelay:".37s",background:P.white,borderRadius:16,padding:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.05)",border:`1px solid ${P.border}`,display:"flex",flexDirection:"column"}}>
// //                   <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
// //                     <h3 style={{margin:0,fontSize:13,fontWeight:900,color:P.tealDark}}>Status</h3>
// //                     <div style={{background:P.bg,border:`1px solid ${P.border}`,borderRadius:7,padding:"3px 8px",fontSize:9.5,fontWeight:700,color:P.tealDark}}>TODAY ▾</div>
// //                   </div>
// //                   <div style={{display:"flex",justifyContent:"center",margin:"2px 0 6px"}}>
// //                     <Donut pct={resRate}/>
// //                   </div>
// //                   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
// //                     {[{l:"BOOKED",v:stats.total,c:P.teal},{l:"PROGRESS",v:stats.inProgress,c:P.gold},{l:"PENDING",v:stats.pending,c:"#d9534f"}].map(({l,v,c})=>(
// //                       <div key={l} style={{textAlign:"center",padding:"8px 3px",background:P.bg,borderRadius:9,border:`1px solid ${P.border}`}}>
// //                         <div style={{fontSize:15,fontWeight:900,color:c}}>{v}</div>
// //                         <div style={{fontSize:7,fontWeight:800,color:P.muted,letterSpacing:.4,textTransform:"uppercase",marginTop:2}}>{l}</div>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   <div style={{borderTop:`1px solid ${P.border}`,paddingTop:8,marginBottom:8}}>
// //                     <div style={{fontSize:10,fontWeight:800,color:P.tealDark,marginBottom:6}}>📅 Appointments</div>
// //                     {[
// //                       {l:"Total",       v:appointments.length,                                                         c:P.teal},
// //                       {l:"Approved",    v:appointments.filter(a=>(a.status||"").toLowerCase()==="approved").length,    c:P.sage},
// //                       {l:"Pending",     v:appointments.filter(a=>(a.status||"").toLowerCase()==="pending").length,     c:P.gold},
// //                       {l:"In Progress", v:appointments.filter(a=>(a.status||"").toLowerCase()==="in progress").length, c:P.tealDeep},
// //                     ].map(({l,v,c})=>(
// //                       <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"2.5px 0"}}>
// //                         <span style={{display:"flex",alignItems:"center",gap:4,fontSize:9.5,color:P.muted,fontWeight:600}}>
// //                           <span style={{width:5,height:5,borderRadius:"50%",background:c,display:"inline-block"}}/>{l}
// //                         </span>
// //                         <span style={{fontSize:10.5,fontWeight:800,color:c}}>{v}</span>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   {mayorSlots.length>0&&(
// //                     <div style={{borderTop:`1px solid ${P.border}`,paddingTop:7,marginBottom:8}}>
// //                       <div style={{fontSize:10,fontWeight:800,color:P.tealDark,marginBottom:5}}>🏛 Mayor Today</div>
// //                       {mayorSlots.map((s,i)=>(
// //                         <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",fontSize:9.5,color:P.muted,fontWeight:600}}>
// //                           <span>Slot {i+1}</span>
// //                           <span style={{color:P.tealDark,fontWeight:800}}>{s.start} – {s.end}</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}

// //                   <div style={{borderTop:`1px solid ${P.border}`,paddingTop:8}}>
// //                     <div style={{fontSize:10.5,fontWeight:800,color:P.tealDark,marginBottom:6}}>📈 Weekly Trend</div>
// //                     <MiniBar data={weeklyData} color={P.teal}/>
// //                     <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
// //                       {["M","T","W","T","F","S","S"].map((d,i)=>(
// //                         <span key={i} style={{fontSize:8.5,color:P.muted,flex:1,textAlign:"center",fontWeight:700}}>{d}</span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* ══════════════════════════════════════════════════════════════
// //                 FULL ACCESS ONLY: Tracking + Recent Applications
// //             ══════════════════════════════════════════════════════════════ */}
// //             {isFullAccess && (
// //               <div className="dash-grid-track" style={{marginBottom:18}}>
// //                 <div className="dc" style={{animationDelay:".44s",background:P.white,borderRadius:16,padding:"18px",boxShadow:"0 4px 20px rgba(0,0,0,0.05)",border:`1px solid ${P.border}`}}>
// //                   <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
// //                     <h3 style={{margin:0,fontSize:13,fontWeight:900,color:P.tealDark}}>Tracking</h3>
// //                     <div style={{background:P.bg,border:`1px solid ${P.border}`,borderRadius:7,padding:"3px 8px",fontSize:9.5,fontWeight:700,color:P.tealDark}}>THIS YEAR ▾</div>
// //                   </div>
// //                   <div style={{display:"flex",justifyContent:"space-between",padding:"0 2px 7px",borderBottom:`1px solid ${P.border}`,marginBottom:5}}>
// //                     <span style={{fontSize:9,fontWeight:800,color:P.muted,textTransform:"uppercase",letterSpacing:.5}}>Region</span>
// //                     <span style={{fontSize:9,fontWeight:800,color:P.muted,textTransform:"uppercase",letterSpacing:.5}}>Amount</span>
// //                   </div>
// //                   {Object.entries(talukaData).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([taluka,count],i)=>{
// //                     const cols=[P.teal,P.gold,P.sage,P.tealDeep,P.goldDeep,P.tealDark];
// //                     const c=cols[i%cols.length];
// //                     return(
// //                       <div key={taluka} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 2px",borderBottom:`1px solid ${P.border}55`}}>
// //                         <div style={{display:"flex",alignItems:"center",gap:7}}>
// //                           <div style={{width:7,height:7,borderRadius:"50%",background:c}}/>
// //                           <span style={{fontSize:11.5,fontWeight:600,color:P.text}}>{taluka}</span>
// //                         </div>
// //                         <span style={{fontSize:11.5,fontWeight:800,color:c}}>{count}</span>
// //                       </div>
// //                     );
// //                   })}
// //                   {!Object.keys(talukaData).length&&<div style={{textAlign:"center",color:P.muted,fontSize:12,padding:"18px 0"}}>No data yet</div>}
// //                 </div>

// //                 <div className="dc" style={{animationDelay:".51s",background:P.white,borderRadius:16,padding:"18px 20px",boxShadow:"0 4px 20px rgba(0,0,0,0.05)",border:`1px solid ${P.border}`}}>
// //                   <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
// //                     <div>
// //                       <h3 style={{margin:0,fontSize:14,fontWeight:900,color:P.tealDark}}>Recent Applications</h3>
// //                       <p style={{margin:"2px 0 0",fontSize:10,color:P.muted}}>Latest inward complaints</p>
// //                     </div>
// //                     <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
// //                       {["all","Pending","Resolved","In Progress"].map(tab=>(
// //                         <button key={tab} onClick={()=>setActiveTab(tab)} style={{
// //                           border:`1px solid ${activeTab===tab?P.teal:P.border}`,
// //                           background:activeTab===tab?`linear-gradient(135deg,${P.teal},${P.tealDark})`:P.white,
// //                           color:activeTab===tab?"#fff":P.muted,
// //                           borderRadius:8,padding:"4px 11px",fontSize:10.5,fontWeight:700,cursor:"pointer",
// //                           boxShadow:activeTab===tab?`0 4px 12px ${P.teal}44`:"none",transition:"all .2s"}}>
// //                           {tab==="all"?"All":tab}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <div style={{overflowX:"auto"}}>
// //                     <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5}}>
// //                       <thead>
// //                         <tr style={{background:P.bg}}>
// //                           {["Inward No","Applicant","Subject","Taluka","Department","Priority","Status","Date"].map(h=>(
// //                             <th key={h} style={{padding:"8px 10px",textAlign:"left",color:P.tealDark,fontWeight:800,fontSize:9.5,whiteSpace:"nowrap",letterSpacing:.3,textTransform:"uppercase",borderBottom:`2px solid ${P.border}`}}>{h}</th>
// //                           ))}
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {filteredRecent.length===0?(
// //                           <tr><td colSpan={8} style={{textAlign:"center",padding:28,color:P.muted}}>No applications found</td></tr>
// //                         ):filteredRecent.map((item,i)=>(
// //                           <tr key={i} className="tbl-row" onClick={()=>navigate("/allapplication")} style={{borderBottom:`1px solid ${P.border}55`,transition:"background .15s"}}>
// //                             <td style={{padding:"8px 10px",color:P.teal,fontWeight:800,whiteSpace:"nowrap",fontFamily:"monospace",fontSize:10.5}}>{item.inwardNo||"—"}</td>
// //                             <td style={{padding:"8px 10px",fontWeight:700,color:P.text}}>{item.fullName||"—"}</td>
// //                             <td style={{padding:"8px 10px",color:P.muted,maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.subject||"—"}</td>
// //                             <td style={{padding:"8px 10px",color:P.muted}}>{item.taluka||"—"}</td>
// //                             <td style={{padding:"8px 10px",color:P.muted,whiteSpace:"nowrap"}}>{item.mainDepartment||"—"}</td>
// //                             <td style={{padding:"8px 10px"}}>
// //                               <span style={{fontSize:9.5,fontWeight:800,padding:"2px 8px",borderRadius:20,background:item.priority==="Emergency"?"#fde8e8":item.priority==="Urgent"?`${P.gold}22`:`${P.sage}22`,color:item.priority==="Emergency"?"#d9534f":item.priority==="Urgent"?P.goldDeep:P.sage,border:`1px solid ${item.priority==="Emergency"?"#f5c6c6":item.priority==="Urgent"?P.gold+"44":P.sage+"44"}`}}>
// //                                 {item.priority||"Normal"}
// //                               </span>
// //                             </td>
// //                             <td style={{padding:"8px 10px"}}>
// //                               <span style={{fontSize:9.5,fontWeight:800,padding:"2px 8px",borderRadius:20,background:statusBg[item.status]||`${P.border}55`,color:statusColor[item.status]||P.muted,border:`1px solid ${statusColor[item.status]||P.border}44`}}>
// //                                 {item.status||"—"}
// //                               </span>
// //                             </td>
// //                             <td style={{padding:"8px 10px",color:P.muted,whiteSpace:"nowrap",fontSize:10.5}}>
// //                               {item.submissionDate||(item.createdAt?new Date(item.createdAt).toLocaleDateString("en-IN"):"—")}
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                   <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
// //                     <span style={{fontSize:10.5,color:P.muted}}>Showing {filteredRecent.length} of {stats.total}</span>
// //                     <div style={{display:"flex",gap:8}}>
// //                       <button onClick={()=>navigate("/allapplication")} style={{background:`linear-gradient(135deg,${P.teal},${P.tealDark})`,color:"#fff",border:"none",borderRadius:9,padding:"6px 14px",fontSize:11,fontWeight:800,cursor:"pointer",boxShadow:`0 4px 14px ${P.teal}55`}}>All Applications →</button>
// //                       <button onClick={()=>navigate("/applicationcitizens")} style={{background:`linear-gradient(135deg,${P.gold},${P.goldDeep})`,color:"#fff",border:"none",borderRadius:9,padding:"6px 14px",fontSize:11,fontWeight:800,cursor:"pointer",boxShadow:`0 4px 14px ${P.gold}55`}}>Citizen Appts →</button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* ════════════════════════════════════════════════════════════════
// //                 MEETING ANALYTICS SECTION
// //                 - Full access: everything shown
// //                 - Dept user: only Subject Type Breakdown + own dept row
// //             ════════════════════════════════════════════════════════════════ */}
// //             {!meetingLoading && (
// //               <div className="dc" style={{ animationDelay: ".58s", marginBottom: 18 }}>

// //                 {/* Section header */}
// //                 <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
// //                   <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg,${P.teal},${P.border})`, borderRadius: 99 }}/>
// //                   <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
// //                     <span style={{ fontSize: 18 }}>🏛</span>
// //                     <span style={{ fontSize: 14, fontWeight: 900, color: P.tealDark, whiteSpace: "nowrap" }}>Meeting Proceedings Analytics</span>
// //                   </div>
// //                   <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg,${P.border},${P.teal})`, borderRadius: 99 }}/>
// //                 </div>

// //                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
// //                   <p style={{ margin: 0, fontSize: 10.5, color: P.muted, fontWeight: 600 }}>
// //                     Sabha Kamkaj — Subject wise progress tracking
// //                     {!isFullAccess && userDept && (
// //                       <span style={{marginLeft:8,background:`${P.teal}18`,color:P.tealDark,border:`1px solid ${P.teal}33`,borderRadius:20,padding:"1px 10px",fontSize:10,fontWeight:800}}>
// //                         {userDept}
// //                       </span>
// //                     )}
// //                   </p>
// //                   <button onClick={() => navigate("/meetings")} style={{
// //                     background: `linear-gradient(135deg,${P.teal},${P.tealDark})`,
// //                     color: "#fff", border: "none", borderRadius: 9, padding: "6px 14px",
// //                     fontSize: 11, fontWeight: 800, cursor: "pointer",
// //                     boxShadow: `0 4px 14px ${P.teal}55` }}>
// //                     View Meetings →
// //                   </button>
// //                 </div>

// //                 {/* Top 4 Meeting stat cards — always visible (values are role-filtered) */}
// //                 <div className="dash-grid-4" style={{ marginBottom: 16 }}>
// //                   {[
// //                     { label: "TOTAL MEETINGS",  value: meetingStats.totalMeetings,      from: P.card1From, to: P.card1To,   spark: [2,3,1,4,2,5,3] },
// //                     { label: "TOTAL SUBJECTS",  value: meetingStats.totalSubjects,       from: P.card2From, to: P.card2To,   spark: [5,8,6,10,7,12,9] },
// //                     { label: "APPROVED",        value: meetingStats.approved,            from: P.card3From, to: P.card3To,   spark: [3,5,4,7,5,9,7] },
// //                     { label: "ACTION TAKEN",    value: meetingStats.actionTakenSubjects, from: P.tealDeep,  to: P.tealDark,  spark: [1,2,2,4,3,5,4] },
// //                   ].map((c, i) => (
// //                     <div key={i} style={{ borderRadius: 14, background: `linear-gradient(135deg,${c.from},${c.to})`,
// //                       padding: "14px 16px", boxShadow: `0 6px 20px ${c.from}44`,
// //                       position: "relative", overflow: "hidden", minHeight: 90 }}>
// //                       <div style={{ position: "absolute", top: -14, right: -14, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.13)" }}/>
// //                       <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,.85)", letterSpacing: .8, textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
// //                       <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: -1, marginBottom: 4 }}>{c.value}</div>
// //                       <Sparkline color="#fff" data={c.spark}/>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {/* ── FULL ACCESS: Decision Breakdown + Action Progress + Subject Type ── */}
// //                 {isFullAccess ? (
// //                   <div className="mtg-grid-3" style={{ marginBottom: 14 }}>

// //                     {/* Decision Breakdown */}
// //                     <div style={{ background: P.white, borderRadius: 14, padding: "16px",
// //                       border: `1px solid ${P.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
// //                       <div style={{ fontSize: 11, fontWeight: 900, color: P.tealDark, marginBottom: 12 }}>📊 Decision Breakdown</div>
// //                       {[
// //                         { l: "Approved",      v: meetingStats.approved,      c: P.sage },
// //                         { l: "Rejected",      v: meetingStats.rejected,      c: "#d9534f" },
// //                         { l: "On-Hold",       v: meetingStats.onHold,        c: P.gold },
// //                         { l: "Postponed",     v: meetingStats.postponed,     c: P.tealDeep },
// //                         { l: "Not Conducted", v: meetingStats.notConducted,  c: P.muted },
// //                       ].map(({ l, v, c }) => {
// //                         const pct = meetingStats.totalSubjects > 0 ? Math.round((v / meetingStats.totalSubjects) * 100) : 0;
// //                         return (
// //                           <div key={l} style={{ marginBottom: 10 }}>
// //                             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// //                               <span style={{ fontSize: 11, fontWeight: 700, color: P.text }}>{l}</span>
// //                               <span style={{ fontSize: 11, fontWeight: 800, color: c }}>
// //                                 {v} <span style={{ color: P.muted, fontWeight: 600, fontSize: 10 }}>({pct}%)</span>
// //                               </span>
// //                             </div>
// //                             <ProgressBar value={v} max={meetingStats.totalSubjects} color={c}/>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>

// //                     {/* Action Taken Progress */}
// //                     <div style={{ background: P.white, borderRadius: 14, padding: "16px",
// //                       border: `1px solid ${P.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
// //                       <div style={{ fontSize: 11, fontWeight: 900, color: P.tealDark, marginBottom: 12 }}>⚡ Action Taken Progress</div>
// //                       {Object.keys(meetingStats.actionProgress).length === 0 ? (
// //                         <div style={{ textAlign: "center", color: P.muted, fontSize: 11, padding: "24px 0" }}>
// //                           <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
// //                           No action taken yet
// //                         </div>
// //                       ) : (
// //                         Object.entries(meetingStats.actionProgress)
// //                           .sort((a, b) => b[1] - a[1])
// //                           .map(([action, count], i) => {
// //                             const cols = [P.teal, P.gold, P.sage, P.tealDeep, P.goldDeep, P.tealDark];
// //                             const c = cols[i % cols.length];
// //                             return (
// //                               <div key={action} style={{ marginBottom: 10 }}>
// //                                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// //                                   <span style={{ fontSize: 10, fontWeight: 700, color: P.text,
// //                                     overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{action}</span>
// //                                   <span style={{ fontSize: 11, fontWeight: 800, color: c, flexShrink: 0, marginLeft: 6 }}>{count}</span>
// //                                 </div>
// //                                 <ProgressBar value={count} max={meetingStats.totalSubjects} color={c}/>
// //                               </div>
// //                             );
// //                           })
// //                       )}
// //                     </div>

// //                     {/* Subject Type */}
// //                     <div style={{ background: P.white, borderRadius: 14, padding: "16px",
// //                       border: `1px solid ${P.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
// //                       <div style={{ fontSize: 11, fontWeight: 900, color: P.tealDark, marginBottom: 12 }}>📋 Subject Type Breakdown</div>
// //                       {[
// //                         { l: "General",                    v: meetingStats.subjectsByType.General,        c: P.teal,    icon: "📄" },
// //                         { l: "Administrative & Financial", v: meetingStats.subjectsByType.Administrative,  c: P.gold,    icon: "💰" },
// //                         { l: "Contract Approval",          v: meetingStats.subjectsByType.Contract,        c: P.sage,    icon: "📝" },
// //                       ].map(({ l, v, c, icon }) => (
// //                         <div key={l} style={{ display: "flex", alignItems: "center", gap: 12,
// //                           padding: "12px 0", borderBottom: `1px solid ${P.border}55` }}>
// //                           <div style={{ width: 40, height: 40, borderRadius: 10,
// //                             background: `${c}18`, border: `1.5px solid ${c}33`,
// //                             display: "flex", alignItems: "center", justifyContent: "center",
// //                             fontSize: 18, flexShrink: 0 }}>{icon}</div>
// //                           <div style={{ flex: 1, minWidth: 0 }}>
// //                             <div style={{ fontSize: 10, fontWeight: 700, color: P.muted,
// //                               overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{l}</div>
// //                             <div style={{ fontSize: 20, fontWeight: 900, color: c }}>{v}</div>
// //                           </div>
// //                           <div style={{ fontSize: 9, fontWeight: 800, color: c,
// //                             background: `${c}18`, padding: "2px 8px", borderRadius: 20, flexShrink: 0 }}>
// //                             {meetingStats.totalSubjects > 0 ? Math.round((v / meetingStats.totalSubjects) * 100) : 0}%
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   /* ── DEPT USER: Only Subject Type Breakdown (their counts) ── */
// //                   <div style={{ marginBottom: 14 }}>
// //                     <div style={{ background: P.white, borderRadius: 14, padding: "16px",
// //                       border: `1px solid ${P.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
// //                       maxWidth: 480 }}>
// //                       <div style={{ fontSize: 11, fontWeight: 900, color: P.tealDark, marginBottom: 12 }}>📋 Subject Type Breakdown</div>
// //                       {[
// //                         { l: "General",                    v: meetingStats.subjectsByType.General,        c: P.teal,    icon: "📄" },
// //                         { l: "Administrative & Financial", v: meetingStats.subjectsByType.Administrative,  c: P.gold,    icon: "💰" },
// //                         { l: "Contract Approval",          v: meetingStats.subjectsByType.Contract,        c: P.sage,    icon: "📝" },
// //                       ].map(({ l, v, c, icon }) => (
// //                         <div key={l} style={{ display: "flex", alignItems: "center", gap: 12,
// //                           padding: "12px 0", borderBottom: `1px solid ${P.border}55` }}>
// //                           <div style={{ width: 40, height: 40, borderRadius: 10,
// //                             background: `${c}18`, border: `1.5px solid ${c}33`,
// //                             display: "flex", alignItems: "center", justifyContent: "center",
// //                             fontSize: 18, flexShrink: 0 }}>{icon}</div>
// //                           <div style={{ flex: 1, minWidth: 0 }}>
// //                             <div style={{ fontSize: 10, fontWeight: 700, color: P.muted,
// //                               overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{l}</div>
// //                             <div style={{ fontSize: 20, fontWeight: 900, color: c }}>{v}</div>
// //                           </div>
// //                           <div style={{ fontSize: 9, fontWeight: 800, color: c,
// //                             background: `${c}18`, padding: "2px 8px", borderRadius: 20, flexShrink: 0 }}>
// //                             {meetingStats.totalSubjects > 0 ? Math.round((v / meetingStats.totalSubjects) * 100) : 0}%
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* ── Department-wise table ── */}
// //                 {/* Full access: all departments */}
// //                 {isFullAccess && Object.keys(meetingStats.departmentStats).length > 0 && (
// //                   <div style={{ background: P.white, borderRadius: 14, padding: "16px 18px",
// //                     border: `1px solid ${P.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
// //                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
// //                       <div style={{ fontSize: 11, fontWeight: 900, color: P.tealDark }}>🏢 Department-wise Subject Progress</div>
// //                       <span style={{ fontSize: 9.5, color: P.muted, fontWeight: 600 }}>
// //                         {Object.keys(meetingStats.departmentStats).length} departments
// //                       </span>
// //                     </div>
// //                     <div style={{ overflowX: "auto" }}>
// //                       <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
// //                         <thead>
// //                           <tr style={{ background: P.bg }}>
// //                             {["Department", "Total Subjects", "Approved", "Action Taken", "Completion"].map(h => (
// //                               <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: P.tealDark,
// //                                 fontWeight: 800, fontSize: 9.5, whiteSpace: "nowrap", letterSpacing: .3,
// //                                 textTransform: "uppercase", borderBottom: `2px solid ${P.border}` }}>{h}</th>
// //                             ))}
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {Object.entries(meetingStats.departmentStats)
// //                             .sort((a, b) => b[1].total - a[1].total)
// //                             .map(([dept, dStats], i) => {
// //                               const cols = [P.teal, P.gold, P.sage, P.tealDeep, P.goldDeep, P.tealDark];
// //                               const c = cols[i % cols.length];
// //                               const completionPct = dStats.total > 0 ? Math.round((dStats.actionTaken / dStats.total) * 100) : 0;
// //                               return (
// //                                 <tr key={dept} style={{ borderBottom: `1px solid ${P.border}55`, transition: "background .15s" }}
// //                                   onMouseEnter={e => e.currentTarget.style.background = `${P.teal}08`}
// //                                   onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
// //                                   <td style={{ padding: "10px 12px" }}>
// //                                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //                                       <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }}/>
// //                                       <span style={{ fontWeight: 700, color: P.text, fontSize: 12 }}>{dept}</span>
// //                                     </div>
// //                                   </td>
// //                                   <td style={{ padding: "10px 12px" }}>
// //                                     <span style={{ fontWeight: 800, color: c, fontSize: 13 }}>{dStats.total}</span>
// //                                   </td>
// //                                   <td style={{ padding: "10px 12px" }}>
// //                                     <span style={{ display: "inline-flex", alignItems: "center", gap: 5,
// //                                       background: `${P.sage}18`, color: P.sage, border: `1px solid ${P.sage}33`,
// //                                       padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 800 }}>
// //                                       ✓ {dStats.approved}
// //                                     </span>
// //                                   </td>
// //                                   <td style={{ padding: "10px 12px" }}>
// //                                     <span style={{ display: "inline-flex", alignItems: "center", gap: 5,
// //                                       background: `${P.teal}18`, color: P.teal, border: `1px solid ${P.teal}33`,
// //                                       padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 800 }}>
// //                                       ⚡ {dStats.actionTaken}
// //                                     </span>
// //                                   </td>
// //                                   <td style={{ padding: "10px 12px", minWidth: 120 }}>
// //                                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //                                       <div style={{ flex: 1, height: 6, borderRadius: 99, background: P.bg, overflow: "hidden" }}>
// //                                         <div style={{ height: "100%", width: `${completionPct}%`, background: c, borderRadius: 99, transition: "width 1s ease" }}/>
// //                                       </div>
// //                                       <span style={{ fontSize: 10, fontWeight: 800, color: c, minWidth: 30, textAlign: "right" }}>{completionPct}%</span>
// //                                     </div>
// //                                   </td>
// //                                 </tr>
// //                               );
// //                             })}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Dept user: show ONLY their own department row in a focused card */}
// //                 {!isFullAccess && userDept && meetingStats.departmentStats[userDept] && (
// //                   <div style={{ background: P.white, borderRadius: 14, padding: "16px 18px",
// //                     border: `1px solid ${P.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
// //                     <div style={{ fontSize: 11, fontWeight: 900, color: P.tealDark, marginBottom: 14 }}>
// //                       🏢 Your Department Progress
// //                     </div>
// //                     {(() => {
// //                       const dStats = meetingStats.departmentStats[userDept];
// //                       const completionPct = dStats.total > 0 ? Math.round((dStats.actionTaken / dStats.total) * 100) : 0;
// //                       return (
// //                         <>
// //                           {/* Dept name badge */}
// //                           <div style={{ marginBottom: 14, padding: "8px 12px", background: `${P.teal}10`,
// //                             border: `1.5px solid ${P.teal}30`, borderRadius: 10,
// //                             fontSize: 12, fontWeight: 800, color: P.tealDark }}>
// //                             {userDept}
// //                           </div>
// //                           {/* 3 stat mini-cards */}
// //                           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 14 }}>
// //                             {[
// //                               { l: "Total Subjects",  v: dStats.total,       c: P.teal,    icon: "📋" },
// //                               { l: "Approved",        v: dStats.approved,    c: P.sage,    icon: "✅" },
// //                               { l: "Action Taken",    v: dStats.actionTaken, c: P.gold,    icon: "⚡" },
// //                             ].map(({ l, v, c, icon }) => (
// //                               <div key={l} style={{ textAlign: "center", padding: "14px 10px",
// //                                 background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
// //                                 <div style={{ fontSize: 22, marginBottom: 5 }}>{icon}</div>
// //                                 <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
// //                                 <div style={{ fontSize: 9.5, fontWeight: 700, color: P.muted, marginTop: 3,
// //                                   textTransform: "uppercase", letterSpacing: .4 }}>{l}</div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                           {/* Completion progress bar */}
// //                           <div>
// //                             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
// //                               <span style={{ fontSize: 11, fontWeight: 700, color: P.text }}>Completion Rate</span>
// //                               <span style={{ fontSize: 11, fontWeight: 800, color: P.teal }}>{completionPct}%</span>
// //                             </div>
// //                             <div style={{ height: 8, borderRadius: 99, background: P.bg, overflow: "hidden" }}>
// //                               <div style={{ height: "100%", width: `${completionPct}%`,
// //                                 background: `linear-gradient(90deg,${P.teal},${P.tealDark})`,
// //                                 borderRadius: 99, transition: "width 1s ease" }}/>
// //                             </div>
// //                           </div>
// //                         </>
// //                       );
// //                     })()}
// //                   </div>
// //                 )}

// //                 {/* Dept user: no meeting data for their dept */}
// //                 {!isFullAccess && userDept && !meetingStats.departmentStats[userDept] && meetingStats.totalSubjects === 0 && (
// //                   <div style={{ background: P.white, borderRadius: 14, padding: "32px 18px",
// //                     border: `1px solid ${P.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
// //                     textAlign: "center" }}>
// //                     <div style={{ fontSize: 32, marginBottom: 8 }}>🏛</div>
// //                     <div style={{ fontWeight: 700, fontSize: 13, color: P.text, marginBottom: 4 }}>
// //                       No meeting subjects assigned yet
// //                     </div>
// //                     <div style={{ fontSize: 11, color: P.muted }}>
// //                       Subjects tagged to <strong>{userDept}</strong> will appear here
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {/* Footer */}
// //             <div style={{textAlign:"center",color:P.muted,fontSize:10.5,padding:"12px 0 4px"}}>
// //               © {new Date().getFullYear()} Vasai-Virar City Municipal Corporation · Janata Darbar System
// //               <span style={{margin:"0 8px",color:P.gold}}>◆</span>
// //               स्थापना : ३ जुलै २००९
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
//   AreaChart,
//   Legend,
// } from "recharts";

// // ─── Data ────────────────────────────────────────────────────────────────────

// const revenueData = [
//   { day: "Mon", online: 12000, offline: 8000 },
//   { day: "Tue", online: 18000, offline: 6000 },
//   { day: "Wed", online: 10000, offline: 15000 },
//   { day: "Thu", online: 22000, offline: 9000 },
//   { day: "Fri", online: 16000, offline: 11000 },
//   { day: "Sat", online: 20000, offline: 7000 },
//   { day: "Sun", online: 14000, offline: 13000 },
// ];

// const visitorData = [
//   { month: "Jan", loyal: 300, new: 250, unique: 200 },
//   { month: "Feb", loyal: 280, new: 290, unique: 230 },
//   { month: "Mar", loyal: 320, new: 260, unique: 210 },
//   { month: "Apr", loyal: 350, new: 300, unique: 280 },
//   { month: "May", loyal: 370, new: 340, unique: 300 },
//   { month: "Jun", loyal: 310, new: 380, unique: 270 },
//   { month: "Jul", loyal: 340, new: 360, unique: 310 },
//   { month: "Aug", loyal: 360, new: 320, unique: 330 },
//   { month: "Sep", loyal: 380, new: 310, unique: 350 },
//   { month: "Oct", loyal: 330, new: 290, unique: 290 },
//   { month: "Nov", loyal: 310, new: 270, unique: 260 },
//   { month: "Dec", loyal: 290, new: 250, unique: 240 },
// ];

// const satisfactionData = [
//   { month: "Jan", last: 3200, current: 2800 },
//   { month: "Feb", last: 2800, current: 3400 },
//   { month: "Mar", last: 3500, current: 3000 },
//   { month: "Apr", last: 3000, current: 3800 },
//   { month: "May", last: 3200, current: 3200 },
//   { month: "Jun", last: 2900, current: 4200 },
//   { month: "Jul", last: 3100, current: 4504 },
// ];

// const targetData = [
//   { month: "Jan", reality: 7000, target: 8000 },
//   { month: "Feb", reality: 8000, target: 9000 },
//   { month: "Mar", reality: 7500, target: 8500 },
//   { month: "Apr", reality: 9000, target: 10000 },
//   { month: "May", reality: 8823, target: 11000 },
//   { month: "Jun", reality: 10000, target: 12000 },
//   { month: "Jul", reality: 9500, target: 12123 },
// ];

// const volumeData = [
//   { name: "A", volume: 900, service: 600 },
//   { name: "B", volume: 1135, service: 635 },
//   { name: "C", volume: 800, service: 550 },
//   { name: "D", volume: 1050, service: 700 },
//   { name: "E", volume: 950, service: 580 },
// ];

// const topProducts = [
//   { rank: "01", name: "Home Decor Range", popularity: 45, color: "#4361ee" },
//   { rank: "02", name: "Disney Princess Pink Bag III", popularity: 29, color: "#06d6a0" },
//   { rank: "03", name: "Bathroom Essentials", popularity: 18, color: "#7b2d8b" },
//   { rank: "04", name: "Apple Smartwatches", popularity: 25, color: "#f4a261" },
// ];

// // ─── Stat Card ────────────────────────────────────────────────────────────────

// const StatCard = ({ icon, value, label, change, changePositive, bg }) => (
//   <div className="stat-card" style={{ background: bg }}>
//     <div className="stat-icon">{icon}</div>
//     <div className="stat-value">{value}</div>
//     <div className="stat-label">{label}</div>
//     <div className={`stat-change ${changePositive ? "positive" : "negative"}`}>
//       {changePositive ? "▲" : "▼"} {change}
//     </div>
//   </div>
// );

// // ─── Dashboard Page ───────────────────────────────────────────────────────────

// const Dashboard = () => {
//   return (
//     <div className="dashboard">

//       {/* Row 1: Today's Sales + Visitor Insights */}
//       <div className="dashboard-row dashboard-row--2col">

//         {/* Today's Sales */}
//         <div className="card card--sales">
//           <div className="card-header">
//             <div>
//               <h3 className="card-title">Today's Sales</h3>
//               <p className="card-subtitle">Sales Summary</p>
//             </div>
//             <button className="export-btn">
//               <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
//                 <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Export
//             </button>
//           </div>
//           <div className="stat-cards-grid">
//             <StatCard
//               bg="#fff0f0"
//               icon={<span style={{ fontSize: 20 }}>🛍️</span>}
//               value="$1k"
//               label="Total Sales"
//               change="+8% from yesterday"
//               changePositive={true}
//             />
//             <StatCard
//               bg="#fff8f0"
//               icon={<span style={{ fontSize: 20 }}>📦</span>}
//               value="300"
//               label="Total Order"
//               change="+5% from yesterday"
//               changePositive={true}
//             />
//             <StatCard
//               bg="#f0fff8"
//               icon={<span style={{ fontSize: 20 }}>✅</span>}
//               value="5"
//               label="Product Sold"
//               change="+1.2% from yesterday"
//               changePositive={true}
//             />
//             <StatCard
//               bg="#f5f0ff"
//               icon={<span style={{ fontSize: 20 }}>👤</span>}
//               value="8"
//               label="New Customers"
//               change="0.5% from yesterday"
//               changePositive={false}
//             />
//           </div>
//         </div>

//         {/* Visitor Insights */}
//         <div className="card">
//           <h3 className="card-title">Visitor Insights</h3>
//           <ResponsiveContainer width="100%" height={160}>
//             <LineChart data={visitorData}>
//               <XAxis dataKey="month" tick={{ fontSize: 10 }} />
//               <YAxis tick={{ fontSize: 10 }} />
//               <Tooltip />
//               <Line type="monotone" dataKey="loyal" stroke="#7b2d8b" strokeWidth={2} dot={false} />
//               <Line type="monotone" dataKey="new" stroke="#e63946" strokeWidth={2} dot={false} />
//               <Line type="monotone" dataKey="unique" stroke="#06d6a0" strokeWidth={2} dot={false} />
//             </LineChart>
//           </ResponsiveContainer>
//           <div className="chart-legend">
//             <span className="legend-dot" style={{ background: "#7b2d8b" }}></span> Loyal Customers
//             <span className="legend-dot" style={{ background: "#e63946" }}></span> New Customers
//             <span className="legend-dot" style={{ background: "#06d6a0" }}></span> Unique Customers
//           </div>
//         </div>
//       </div>

//       {/* Row 2: Total Revenue + Customer Satisfaction + Target vs Reality */}
//       <div className="dashboard-row dashboard-row--3col">

//         {/* Total Revenue */}
//         <div className="card">
//           <h3 className="card-title">Total Revenue</h3>
//           <ResponsiveContainer width="100%" height={180}>
//             <BarChart data={revenueData} barGap={4}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//               <XAxis dataKey="day" tick={{ fontSize: 10 }} />
//               <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
//               <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
//               <Bar dataKey="online" fill="#4361ee" radius={[4, 4, 0, 0]} />
//               <Bar dataKey="offline" fill="#06d6a0" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className="chart-legend">
//             <span className="legend-dot" style={{ background: "#4361ee" }}></span> Online Sales
//             <span className="legend-dot" style={{ background: "#06d6a0" }}></span> Offline Sales
//           </div>
//         </div>

//         {/* Customer Satisfaction */}
//         <div className="card">
//           <h3 className="card-title">Customer Satisfaction</h3>
//           <ResponsiveContainer width="100%" height={180}>
//             <AreaChart data={satisfactionData}>
//               <defs>
//                 <linearGradient id="lastGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#4361ee" stopOpacity={0.15} />
//                   <stop offset="95%" stopColor="#4361ee" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="currGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#06d6a0" stopOpacity={0.2} />
//                   <stop offset="95%" stopColor="#06d6a0" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//               <XAxis dataKey="month" tick={{ fontSize: 10 }} />
//               <YAxis tick={{ fontSize: 10 }} />
//               <Tooltip />
//               <Area type="monotone" dataKey="last" stroke="#4361ee" strokeWidth={2} fill="url(#lastGrad)" dot={{ r: 3, fill: "#4361ee" }} />
//               <Area type="monotone" dataKey="current" stroke="#06d6a0" strokeWidth={2} fill="url(#currGrad)" dot={{ r: 3, fill: "#06d6a0" }} />
//             </AreaChart>
//           </ResponsiveContainer>
//           <div className="satisfaction-footer">
//             <span><span className="legend-dot" style={{ background: "#4361ee" }}></span> Last Month <strong>$3,004</strong></span>
//             <span><span className="legend-dot" style={{ background: "#06d6a0" }}></span> This Month <strong>$4,504</strong></span>
//           </div>
//         </div>

//         {/* Target vs Reality */}
//         <div className="card">
//           <h3 className="card-title">Target vs Reality</h3>
//           <ResponsiveContainer width="100%" height={180}>
//             <BarChart data={targetData} barGap={4}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//               <XAxis dataKey="month" tick={{ fontSize: 10 }} />
//               <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
//               <Tooltip />
//               <Bar dataKey="reality" fill="#f4a261" radius={[4, 4, 0, 0]} />
//               <Bar dataKey="target" fill="#4361ee" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className="target-footer">
//             <div className="target-item">
//               <span className="target-dot" style={{ background: "#f4a261" }}></span>
//               <div>
//                 <div className="target-item-label">Reality Sales</div>
//                 <div className="target-item-sub">Global</div>
//               </div>
//               <span className="target-item-val" style={{ color: "#f4a261" }}>8,823</span>
//             </div>
//             <div className="target-item">
//               <span className="target-dot" style={{ background: "#4361ee" }}></span>
//               <div>
//                 <div className="target-item-label">Target Sales</div>
//                 <div className="target-item-sub">Commerce</div>
//               </div>
//               <span className="target-item-val" style={{ color: "#4361ee" }}>12,123</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Row 3: Top Products + Sales Map + Volume vs Service */}
//       <div className="dashboard-row dashboard-row--3col">

//         {/* Top Products */}
//         <div className="card">
//           <h3 className="card-title">Top Products</h3>
//           <table className="products-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Popularity</th>
//                 <th>Sales</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topProducts.map((p) => (
//                 <tr key={p.rank}>
//                   <td className="product-rank">{p.rank}</td>
//                   <td className="product-name">{p.name}</td>
//                   <td className="product-bar-cell">
//                     <div className="product-bar-track">
//                       <div
//                         className="product-bar-fill"
//                         style={{ width: `${p.popularity}%`, background: p.color }}
//                       ></div>
//                     </div>
//                   </td>
//                   <td>
//                     <span className="product-badge" style={{ background: p.color + "22", color: p.color }}>
//                       {p.popularity}%
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Sales Mapping */}
//         <div className="card map-card">
//           <h3 className="card-title">Sales Mapping by Country</h3>
//           <div className="map-placeholder">
//             <svg viewBox="0 0 400 220" width="100%" height="180">
//               {/* Simple world outline shapes */}
//               <rect width="400" height="220" fill="#f8faff" rx="8" />
//               {/* North America */}
//               <ellipse cx="100" cy="90" rx="55" ry="40" fill="#f0a500" opacity="0.8" />
//               {/* South America */}
//               <ellipse cx="120" cy="155" rx="35" ry="45" fill="#e63946" opacity="0.7" />
//               {/* Europe */}
//               <ellipse cx="195" cy="80" rx="25" ry="22" fill="#d3d3d3" opacity="0.6" />
//               {/* Africa */}
//               <ellipse cx="205" cy="145" rx="30" ry="40" fill="#d3d3d3" opacity="0.5" />
//               {/* Asia */}
//               <ellipse cx="295" cy="85" rx="70" ry="45" fill="#7b2d8b" opacity="0.7" />
//               {/* Australia */}
//               <ellipse cx="330" cy="155" rx="30" ry="22" fill="#06d6a0" opacity="0.7" />
//               {/* Dots */}
//               <circle cx="100" cy="90" r="5" fill="white" />
//               <circle cx="120" cy="155" r="5" fill="white" />
//               <circle cx="295" cy="85" r="5" fill="white" />
//               <circle cx="330" cy="155" r="5" fill="white" />
//             </svg>
//           </div>
//         </div>

//         {/* Volume vs Service Level */}
//         <div className="card">
//           <h3 className="card-title">Volume vs Service Level</h3>
//           <ResponsiveContainer width="100%" height={180}>
//             <BarChart data={volumeData} barGap={4}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//               <XAxis dataKey="name" tick={{ fontSize: 10 }} />
//               <YAxis tick={{ fontSize: 10 }} />
//               <Tooltip />
//               <Bar dataKey="volume" fill="#4361ee" radius={[4, 4, 0, 0]} />
//               <Bar dataKey="service" fill="#06d6a0" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className="volume-footer">
//             <span><span className="legend-dot" style={{ background: "#4361ee" }}></span> Volume <strong>1,135</strong></span>
//             <span><span className="legend-dot" style={{ background: "#06d6a0" }}></span> Services <strong>635</strong></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ClipboardCheck,
  Users,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MapPin,
  UserPlus,
  FileText,
} from "lucide-react";

// ---------- Data ----------

const monthlyVolume = [
  { month: "Jan", value: 58, type: "this" },
  { month: "Feb", value: 92, type: "last" },
  { month: "Mar", value: 50, type: "this" },
  { month: "Apr", value: 100, type: "last" },
  { month: "May", value: 65, type: "this" },
  { month: "Jun", value: 88, type: "last" },
  { month: "Jul", value: 60, type: "this" },
];

const complianceData = [
  { name: "Compliant", value: 74, color: "#2a3a8c" },
  { name: "Partial", value: 16, color: "#e0b568" },
  { name: "Non-Compliant", value: 10, color: "#d6356f" },
];

const visitorInsights = [
  { month: "J", value: 12 },
  { month: "F", value: 38 },
  { month: "M", value: 22 },
  { month: "A", value: 68 },
  { month: "M", value: 42 },
  { month: "J", value: 78 },
  { month: "J", value: 55 },
  { month: "A", value: 62 },
  { month: "S", value: 45 },
  { month: "O", value: 85 },
  { month: "N", value: 50 },
  { month: "D", value: 72 },
];

const targetVsReality = [
  { quarter: "Q1", value: 70 },
  { quarter: "Q2", value: 88 },
  { quarter: "Q3", value: 55 },
  { quarter: "Q4", value: 82 },
];

const topCategories = [
  { name: "School Inspections", value: 340, max: 340, color: "#2a3a8c" },
  { name: "Anganwadi Centers", value: 280, max: 340, color: "#d6356f" },
  { name: "Health Centers", value: 210, max: 340, color: "#e0b568" },
  { name: "Water Facilities", value: 175, max: 340, color: "#3fbf8f" },
  { name: "Road Infrastructure", value: 130, max: 340, color: "#2a3a8c" },
];

const recentActivity = [
  {
    icon: ClipboardCheck,
    iconBg: "#e7e9fb",
    iconColor: "#2a3a8c",
    title: "School Inspection completed",
    subtitle: "Pune District",
    time: "2 min ago",
  },
  {
    icon: AlertTriangle,
    iconBg: "#fbe3ea",
    iconColor: "#d6356f",
    title: "Non-compliance flagged",
    subtitle: "Nashik Zone",
    time: "15 min ago",
  },
  {
    icon: UserPlus,
    iconBg: "#e1f6ec",
    iconColor: "#2fa973",
    title: "New officer registered",
    subtitle: "Mumbai HQ",
    time: "1 hr ago",
  },
  {
    icon: FileText,
    iconBg: "#fbeedc",
    iconColor: "#d99a3d",
    title: "Report submitted",
    subtitle: "Aurangabad",
    time: "3 hr ago",
  },
  {
    icon: MapPin,
    iconBg: "#e7e9fb",
    iconColor: "#2a3a8c",
    title: "Anganwadi visit logged",
    subtitle: "Nagpur",
    time: "5 hr ago",
  },
];

// ---------- Small building blocks ----------

function Pill({ trend, label }) {
  const isUp = trend.startsWith("+");
  const positiveColor = isUp ? "#1f9d63" : "#d6356f";
  const bg = isUp ? "#e1f6ec" : "#fde6ed";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: bg,
          color: positiveColor,
          fontSize: 13,
          fontWeight: 600,
          borderRadius: 20,
          padding: "3px 10px",
        }}
      >
        {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {trend}
      </span>
      <span style={{ color: "#8a8fa3", fontSize: 13.5 }}>{label}</span>
    </div>
  );
}

function StatCard({ label, value, icon, iconBg, iconColor, trend, trendLabel }) {
  const Icon = icon;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: "22px 24px",
        flex: 1,
        boxShadow: "0 1px 3px rgba(20,20,43,0.04)",
        border: "1px solid #eef0f5",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ color: "#7d8198", fontSize: 14.5 }}>{label}</span>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={18} color={iconColor} />
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#1c1e2b", marginTop: 10, marginBottom: 14 }}>
        {value}
      </div>
      <Pill trend={trend} label={trendLabel} />
    </div>
  );
}

function CardShell({ children, style }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: "26px 28px",
        border: "1px solid #eef0f5",
        boxShadow: "0 1px 3px rgba(20,20,43,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CategoryBar({ name, value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#2c2e3d", fontSize: 15, fontWeight: 500 }}>{name}</span>
        <span style={{ color: "#1c1e2b", fontSize: 15, fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: 8, background: "#eef0f5", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 8 }} />
      </div>
    </div>
  );
}

function ActivityRow({ icon, iconBg, iconColor, title, subtitle, time }) {
  const Icon = icon;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "12px 0",
        borderBottom: "1px solid #f1f2f6",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={17} color={iconColor} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1c1e2b" }}>{title}</div>
        <div style={{ fontSize: 13.5, color: "#8a8fa3", marginTop: 2 }}>{subtitle}</div>
      </div>
      <div style={{ fontSize: 13, color: "#aeb1c2", whiteSpace: "nowrap" }}>{time}</div>
    </div>
  );
}

// ---------- Main Dashboard ----------

export default function Dashboard() {
  return (
    <div
      style={{
        background: "#f4f5f9",
        minHeight: "100vh",
        padding: "28px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1500, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(115deg, #36408f 0%, #6a3f9e 45%, #c43d72 100%)",
            borderRadius: 20,
            padding: "34px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            color: "#fff",
          }}
        >
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>Good Morning, Super Admin</h1>
            <p style={{ margin: "8px 0 0", fontSize: 15.5, opacity: 0.85 }}>
              Here's what's happening in WCD Inspections today — Maharashtra State
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.14)",
                borderRadius: 16,
                padding: "16px 30px",
                textAlign: "center",
                minWidth: 120,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 700 }}>47</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>Today's Inspections</div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.14)",
                borderRadius: 16,
                padding: "16px 30px",
                textAlign: "center",
                minWidth: 120,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 700 }}>12</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>Pending Reports</div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <StatCard
            label="Total Inspections"
            value="1,284"
            icon={ClipboardCheck}
            iconBg="#2a3a8c"
            iconColor="#fff"
            trend="+12.5%"
            trendLabel="vs last month"
          />
          <StatCard
            label="Active Officers"
            value="86"
            icon={Users}
            iconBg="#d6356f"
            iconColor="#fff"
            trend="+4.2%"
            trendLabel="this quarter"
          />
          <StatCard
            label="Compliance Rate"
            value="74.3%"
            icon={ShieldCheck}
            iconBg="#e0b568"
            iconColor="#fff"
            trend="-2.1%"
            trendLabel="vs last month"
          />
          <StatCard
            label="Open Issues"
            value="138"
            icon={AlertTriangle}
            iconBg="#2fa973"
            iconColor="#fff"
            trend="-8.7%"
            trendLabel="resolved faster"
          />
        </div>

        {/* Monthly volume + Compliance donut */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <CardShell style={{ flex: 2, minWidth: 420 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#1c1e2b" }}>
                  Monthly Inspections Volume
                </h3>
                <p style={{ margin: "4px 0 0", color: "#8a8fa3", fontSize: 14 }}>
                  Completed inspections per month
                </p>
              </div>
              <div style={{ display: "flex", gap: 18 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#5c5f72" }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#3d4a9e", display: "inline-block" }} />
                  This Month
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#5c5f72" }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#d6356f", display: "inline-block" }} />
                  Last Month
                </span>
              </div>
            </div>
            <div style={{ height: 280, marginTop: 18 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyVolume} barCategoryGap="35%">
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9b9eae", fontSize: 13 }}
                  />
                  <YAxis hide domain={[0, 110]} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {monthlyVolume.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.type === "this" ? "#5a67b8" : "#d6608f"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell style={{ flex: 1, minWidth: 320 }}>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#1c1e2b" }}>
              Compliance Rate
            </h3>
            <p style={{ margin: "4px 0 0", color: "#8a8fa3", fontSize: 14 }}>Current Quarter</p>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 12 }}>
              <div style={{ width: 160, height: 160, position: "relative", flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceData}
                      dataKey="value"
                      innerRadius={52}
                      outerRadius={75}
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`c-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#1c1e2b" }}>74%</div>
                  <div style={{ fontSize: 12.5, color: "#9b9eae" }}>Score</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {complianceData.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: d.color,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 14.5, color: "#5c5f72", flex: 1 }}>{d.name}</span>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: "#1c1e2b" }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardShell>
        </div>

        {/* Visitor Insights + Target vs Reality */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <CardShell style={{ flex: 2, minWidth: 420 }}>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#1c1e2b" }}>
              Visitor Insights
            </h3>
            <p style={{ margin: "4px 0 0", color: "#8a8fa3", fontSize: 14 }}>
              Officer visits across districts — 2024
            </p>
            <div style={{ height: 300, marginTop: 18 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorInsights}>
                  <defs>
                    <linearGradient id="visitorFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d6356f" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#d6356f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9b9eae", fontSize: 13 }}
                  />
                  <YAxis hide domain={[0, 95]} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#d6356f"
                    strokeWidth={2.5}
                    fill="url(#visitorFill)"
                    dot={{ r: 4, fill: "#fff", stroke: "#d6356f", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell style={{ flex: 1, minWidth: 320 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#1c1e2b" }}>
                  Target vs Reality
                </h3>
                <p style={{ margin: "4px 0 0", color: "#8a8fa3", fontSize: 14 }}>
                  Quarterly inspection targets
                </p>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#5c5f72", whiteSpace: "nowrap" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#e0b568", display: "inline-block" }} />
                This Month
              </span>
            </div>
            <div style={{ height: 300, marginTop: 18 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={targetVsReality} barCategoryGap="40%">
                  <XAxis
                    dataKey="quarter"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9b9eae", fontSize: 13 }}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#e8c891" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardShell>
        </div>

        {/* Top categories + Recent activity */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <CardShell style={{ flex: 1, minWidth: 380 }}>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#1c1e2b" }}>
              Top Inspection Categories
            </h3>
            <p style={{ margin: "4px 0 0", color: "#8a8fa3", fontSize: 14 }}>
              By volume this quarter
            </p>
            <div style={{ marginTop: 24 }}>
              {topCategories.map((c) => (
                <CategoryBar key={c.name} {...c} />
              ))}
            </div>
          </CardShell>

          <CardShell style={{ flex: 1, minWidth: 380 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#1c1e2b" }}>
                  Recent Activity
                </h3>
                <p style={{ margin: "4px 0 0", color: "#8a8fa3", fontSize: 14 }}>
                  Live inspection updates
                </p>
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#3d4a9e",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View All
              </button>
            </div>
            <div style={{ marginTop: 14 }}>
              {recentActivity.map((a, i) => (
                <ActivityRow key={i} {...a} />
              ))}
            </div>
          </CardShell>
        </div>
      </div>
    </div>
  );
}