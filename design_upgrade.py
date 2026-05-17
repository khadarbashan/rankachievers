#!/usr/bin/env python3
"""
Rank Achievers — Complete Design Upgrade
Run from: ~/Downloads/rankachievers/
Usage: python3 design_upgrade.py
"""

import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# ═══════════════════════════════════════════════════════════════
# 1. INJECT GLOBAL CSS — Glassmorphism + Animations + Google Font
# ═══════════════════════════════════════════════════════════════

OLD_HERO_CSS = '''const _heroStyle = document.createElement("style");
_heroStyle.id = "ra-hero-css";
_heroStyle.textContent = `
  @keyframes raFadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raFadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes raSlideIn  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes raSlideUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raPulseRing{ 0%,100%{box-shadow:0 0 0 0 rgba(255,106,0,.4)} 50%{box-shadow:0 0 0 12px rgba(255,106,0,0)} }
  @keyframes raDrift    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes raOrb      { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-15px) scale(1.05)} 66%{transform:translate(-10px,10px) scale(.97)} 100%{transform:translate(0,0) scale(1)} }
  @keyframes raSpin     { to{transform:rotate(360deg)} }
  @keyframes raProgress { from{width:0} to{width:var(--pct)} }
  @keyframes raBlink    { 0%,100%{opacity:1} 49%{opacity:1} 50%,99%{opacity:0} }
  @keyframes raTypeIn   { from{max-width:0} to{max-width:300px} }
  @keyframes raScoreIn  { from{stroke-dasharray:0 251} }
  .ra-step-card { transition: all .35s cubic-bezier(.4,0,.2,1) !important; }
  .ra-step-card:hover { transform: scale(1.01) !important; }
  .ra-chip { transition: all .2s ease !important; cursor:pointer; }
  .ra-chip:hover { transform: translateY(-1px) !important; }
`;
if(!document.getElementById("ra-hero-css")) document.head.appendChild(_heroStyle);'''

NEW_HERO_CSS = '''const _heroStyle = document.createElement("style");
_heroStyle.id = "ra-hero-css";
_heroStyle.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  :root {
    --ra-primary: #FF6A00;
    --ra-primary-light: #ff9a00;
    --ra-primary-glow: rgba(255,106,0,0.25);
    --ra-glass: rgba(255,255,255,0.07);
    --ra-glass-border: rgba(255,255,255,0.12);
    --ra-glass-hover: rgba(255,255,255,0.12);
    --ra-surface: rgba(15,15,15,0.9);
    --ra-font: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
  }

  * { font-family: var(--ra-font) !important; }

  @keyframes raFadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raFadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes raSlideIn  { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
  @keyframes raSlideUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raSlideRight{ from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
  @keyframes raPulseRing{ 0%,100%{box-shadow:0 0 0 0 rgba(255,106,0,.5)} 50%{box-shadow:0 0 0 14px rgba(255,106,0,0)} }
  @keyframes raDrift    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes raOrb      { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-15px) scale(1.05)} 66%{transform:translate(-10px,10px) scale(.97)} 100%{transform:translate(0,0) scale(1)} }
  @keyframes raSpin     { to{transform:rotate(360deg)} }
  @keyframes raProgress { from{width:0} to{width:var(--pct)} }
  @keyframes raBlink    { 0%,49%{opacity:1} 50%,99%{opacity:0} }
  @keyframes raGlow     { 0%,100%{opacity:.6} 50%{opacity:1} }
  @keyframes raPop      { 0%{transform:scale(0.9);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
  @keyframes raShimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes raCountUp  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raFloat    { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-6px) rotate(1deg)} 66%{transform:translateY(3px) rotate(-1deg)} }
  @keyframes raScoreIn  { from{stroke-dasharray:0 1000} }
  @keyframes raBounce   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
  @keyframes raBnav     { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }

  /* Glass card */
  .ra-glass {
    background: var(--ra-glass) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border: 1px solid var(--ra-glass-border) !important;
  }
  .ra-glass:hover {
    background: var(--ra-glass-hover) !important;
    border-color: rgba(255,106,0,0.3) !important;
    transform: translateY(-2px);
    transition: all .25s cubic-bezier(.4,0,.2,1) !important;
  }

  /* Cards */
  .ra-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    transition: all .3s cubic-bezier(.4,0,.2,1);
  }
  .ra-card:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,106,0,0.35);
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,106,0,0.15);
  }

  /* Buttons */
  .ra-btn-primary {
    background: linear-gradient(135deg, #FF6A00, #ff9a00);
    color: #fff;
    border: none;
    border-radius: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 4px 20px rgba(255,106,0,0.4);
  }
  .ra-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(255,106,0,0.5);
    filter: brightness(1.05);
  }
  .ra-btn-primary:active { transform: scale(0.97); }

  /* Step cards */
  .ra-step-card { transition: all .35s cubic-bezier(.4,0,.2,1) !important; }
  .ra-step-card:hover { transform: scale(1.01) translateY(-2px) !important; }

  /* Chips */
  .ra-chip { transition: all .2s ease !important; cursor:pointer; }
  .ra-chip:hover { transform: translateY(-2px) !important; box-shadow: 0 4px 16px rgba(255,106,0,0.3) !important; }

  /* Bottom nav */
  .ra-bnav {
    animation: raBnav .4s cubic-bezier(.4,0,.2,1) both;
  }
  .ra-bnav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 8px 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: all .2s cubic-bezier(.4,0,.2,1);
    flex: 1;
    border: none;
    background: none;
    position: relative;
  }
  .ra-bnav-item:active { transform: scale(0.92); }
  .ra-bnav-item.active .ra-bnav-icon {
    color: #FF6A00;
    transform: translateY(-2px);
  }
  .ra-bnav-item.active .ra-bnav-label { color: #FF6A00; font-weight: 700; }
  .ra-bnav-icon {
    font-size: 22px;
    transition: all .2s cubic-bezier(.4,0,.2,1);
    color: #555;
  }
  .ra-bnav-label {
    font-size: 10px;
    font-weight: 500;
    color: #555;
    transition: color .2s;
    white-space: nowrap;
  }
  .ra-bnav-dot {
    position: absolute;
    top: 6px;
    right: 10px;
    width: 8px;
    height: 8px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid #000;
    animation: raBounce 2s ease-in-out infinite;
  }
  .ra-bnav-pip {
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    border-radius: 2px;
    background: #FF6A00;
    opacity: 0;
    transition: opacity .2s;
  }
  .ra-bnav-item.active .ra-bnav-pip { opacity: 1; }

  /* Gradient text */
  .ra-gradient-text {
    background: linear-gradient(135deg, #FF6A00, #ff9a00, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Shimmer loading */
  .ra-shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,.05) 25%, rgba(255,255,255,.1) 50%, rgba(255,255,255,.05) 75%);
    background-size: 200% 100%;
    animation: raShimmer 1.5s infinite;
  }

  /* Stat cards */
  .ra-stat-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 16px;
    text-align: center;
    transition: all .3s ease;
    animation: raFadeUp .5s ease both;
  }
  .ra-stat-card:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,106,0,0.3);
    transform: translateY(-2px);
  }

  /* Input style */
  .ra-input {
    width: 100%;
    padding: 14px 18px;
    border-radius: 14px;
    border: 1.5px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.06);
    color: #fff;
    font-size: 14px;
    font-family: var(--ra-font);
    outline: none;
    transition: all .2s;
    box-sizing: border-box;
  }
  .ra-input:focus {
    border-color: #FF6A00;
    background: rgba(255,106,0,0.08);
    box-shadow: 0 0 0 3px rgba(255,106,0,0.15);
  }
  .ra-input::placeholder { color: rgba(255,255,255,0.3); }

  /* Notification badge pulse */
  @keyframes raPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
  .ra-notif-badge { animation: raPulse 2s ease-in-out infinite; }

  /* Page transitions */
  .ra-page-enter { animation: raFadeUp .3s cubic-bezier(.4,0,.2,1) both; }

  /* Glow orbs */
  .ra-orb { animation: raOrb 12s ease-in-out infinite; }
  .ra-orb-2 { animation: raOrb 16s ease-in-out infinite reverse; }

  /* Exam cards */
  .ra-exam-card {
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    transition: all .3s cubic-bezier(.4,0,.2,1);
    border: 1.5px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
  }
  .ra-exam-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0,0,0,0.5);
  }

  /* Mobile padding for bottom nav */
  .ra-mobile-pb { padding-bottom: 80px; }

  /* Score ring */
  @keyframes ringFill { from{stroke-dasharray:0 1000} }

  /* Fire pulse */
  @keyframes firePulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }

  /* Test card hover */
  .ra-test-card {
    transition: all .25s cubic-bezier(.4,0,.2,1);
  }
  .ra-test-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.35) !important;
  }
`;
if(!document.getElementById("ra-hero-css")) document.head.appendChild(_heroStyle);'''

content = content.replace(OLD_HERO_CSS, NEW_HERO_CSS, 1)
print("✅ 1. Global CSS upgraded")

# ═══════════════════════════════════════════════════════════════
# 2. REPLACE NAVBAR with glassmorphism desktop + bottom nav mobile
# ═══════════════════════════════════════════════════════════════

OLD_NAVBAR_START = "// ─── NAVBAR ───────────────────────────────────────────────────────────────────\nfunction NavBar({page,setPage,user,examType,setExamType,showNotifPanel,setShowNotifPanel,unreadCount,setUnreadCount,notices}){"
OLD_NAVBAR_END = "// ─── NOTICE MODAL (shown after login) ─────────────────────────────────────────"

nav_start = content.find(OLD_NAVBAR_START)
nav_end = content.find(OLD_NAVBAR_END)

NEW_NAVBAR = '''// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function NavBar({page,setPage,user,examType,setExamType,showNotifPanel,setShowNotifPanel,unreadCount,setUnreadCount,notices}){
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const isMobile=useMobile();

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>10);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);

  const navItems=[
    {p:"home",icon:"🏠",label:"Home"},
    {p:"tests",icon:"📝",label:"Tests"},
    {p:"leaderboard",icon:"🏆",label:"Board"},
    {p:"dashboard",icon:"📊",label:"Progress",requireAuth:true},
    {p:"profile",icon:"👤",label:"Profile",requireAuth:true},
  ];

  return(
    <>
      {/* ── DESKTOP TOPBAR ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,
        height:64,
        background:scrolled?"rgba(0,0,0,0.85)":"rgba(0,0,0,0.6)",
        backdropFilter:"blur(24px)",
        WebkitBackdropFilter:"blur(24px)",
        borderBottom:`1px solid ${scrolled?"rgba(255,106,0,0.3)":"rgba(255,255,255,0.08)"}`,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 20px",
        transition:"all .3s ease",
        boxShadow:scrolled?"0 8px 32px rgba(0,0,0,0.5)":"none",
      }}>
        {/* Logo */}
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",gap:10}}>
          <div style={{
            width:36,height:36,
            background:"linear-gradient(135deg,#FF6A00,#ff9a00)",
            borderRadius:10,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontWeight:900,color:"#fff",fontSize:15,
            boxShadow:"0 4px 16px rgba(255,106,0,0.5)",
            flexShrink:0,
          }}>RA</div>
          <div style={{display:isMobile?"none":"block"}}>
            <div style={{fontWeight:800,fontSize:14,color:"#fff",lineHeight:1.1,letterSpacing:"-0.3px"}}>Rank Achievers</div>
            <div style={{fontSize:9,color:"#FF6A00",fontWeight:700,letterSpacing:"0.15em"}}>ACADEMY · ANANTAPUR</div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        {!isMobile&&(
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            {[
              {p:"home",l:"Home"},
              {p:"tests",l:"Tests"},
              {p:"leaderboard",l:"Leaderboard"},
              ...(user?[{p:"dashboard",l:"Dashboard"}]:[]),
            ].map(item=>(
              <button key={item.p} onClick={()=>setPage(item.p)} style={{
                padding:"7px 16px",
                borderRadius:10,
                border:"none",
                background:page===item.p?"rgba(255,106,0,0.15)":"transparent",
                color:page===item.p?"#FF6A00":"rgba(255,255,255,0.7)",
                fontWeight:page===item.p?700:500,
                fontSize:13,
                cursor:"pointer",
                transition:"all .2s",
                letterSpacing:"-0.2px",
              }}
              onMouseOver={e=>{if(page!==item.p){e.currentTarget.style.color="#fff";e.currentTarget.style.background="rgba(255,255,255,0.07)";}}}
              onMouseOut={e=>{if(page!==item.p){e.currentTarget.style.color="rgba(255,255,255,0.7)";e.currentTarget.style.background="transparent";}}}
              >{item.l}</button>
            ))}
            {user&&user.role==="admin"&&(
              <button onClick={()=>setPage("admin")} style={{
                padding:"7px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",
                background:page==="admin"?"rgba(255,255,255,0.1)":"transparent",
                color:"rgba(255,255,255,0.7)",fontWeight:600,fontSize:13,cursor:"pointer",transition:"all .2s",
              }}>⚙️ Admin</button>
            )}
          </div>
        )}

        {/* Right side */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {/* Exam type pills — desktop only */}
          {!isMobile&&user&&(
            <div style={{display:"flex",gap:4,marginRight:4}}>
              {EXAM_TYPES.map(e=>(
                <button key={e.id} onClick={()=>{setExamType(e.id);setPage("tests");}} style={{
                  padding:"5px 12px",borderRadius:20,
                  border:`1.5px solid ${examType===e.id?e.color:"rgba(255,255,255,0.12)"}`,
                  background:examType===e.id?e.color+"25":"transparent",
                  color:examType===e.id?e.color:"rgba(255,255,255,0.5)",
                  fontWeight:600,fontSize:11,cursor:"pointer",
                  transition:"all .2s",
                }}>{e.icon} {e.label}</button>
              ))}
            </div>
          )}

          {/* Bell */}
          {user&&(
            <button onClick={()=>{setShowNotifPanel(p=>!p);localStorage.setItem("ra_last_notice",Date.now().toString());setUnreadCount&&setUnreadCount(0);}} style={{
              position:"relative",background:"rgba(255,255,255,0.07)",
              border:"1px solid rgba(255,255,255,0.12)",
              borderRadius:10,width:36,height:36,
              display:"flex",alignItems:"center",justifyContent:"center",
              cursor:"pointer",fontSize:16,transition:"all .2s",flexShrink:0,
            }}
            onMouseOver={e=>{e.currentTarget.style.background="rgba(255,106,0,0.15)";e.currentTarget.style.borderColor="rgba(255,106,0,0.4)";}}
            onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}>
              🔔
              {unreadCount>0&&<span className="ra-notif-badge" style={{position:"absolute",top:-3,right:-3,background:"#ef4444",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #000"}}>{unreadCount}</span>}
            </button>
          )}

          {/* User avatar or Login */}
          {user?(
            <button onClick={()=>setPage("profile")} style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"5px 12px 5px 5px",
              borderRadius:24,
              border:"1.5px solid rgba(255,255,255,0.12)",
              background:"rgba(255,255,255,0.07)",
              cursor:"pointer",transition:"all .2s",
            }}
            onMouseOver={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)";e.currentTarget.style.borderColor="rgba(255,106,0,0.4)";}}
            onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}>
              {user.photoURL
                ?<img src={user.photoURL} alt="" style={{width:26,height:26,borderRadius:"50%",objectFit:"cover"}}/>
                :<div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff"}}>{user.name?.charAt(0).toUpperCase()}</div>
              }
              {!isMobile&&<span style={{fontWeight:600,fontSize:12,color:"#fff"}}>{user.name?.split(" ")[0]}</span>}
            </button>
          ):(
            <button onClick={()=>setPage("auth")} className="ra-btn-primary" style={{padding:"8px 18px",fontSize:13,borderRadius:12,border:"none",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(255,106,0,0.4)"}}>
              {isMobile?"Login":"Get Started →"}
            </button>
          )}

          {/* Hamburger — mobile only when no bottom nav needed */}
          {isMobile&&!user&&<button onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"rgba(255,255,255,0.8)",padding:4}}>{menuOpen?"✕":"☰"}</button>}
        </div>
      </nav>

      {/* Mobile hamburger menu — only for logged-out */}
      {isMobile&&menuOpen&&!user&&(
        <div style={{
          position:"fixed",top:64,left:0,right:0,
          background:"rgba(0,0,0,0.95)",
          backdropFilter:"blur(20px)",
          WebkitBackdropFilter:"blur(20px)",
          zIndex:199,
          borderBottom:"1px solid rgba(255,255,255,0.1)",
          padding:16,
          animation:"raFadeUp .2s ease",
        }}>
          {[{l:"🏠 Home",p:"home"},{l:"📝 Tests",p:"tests"},{l:"🏆 Leaderboard",p:"leaderboard"}].map(item=>(
            <button key={item.p} onClick={()=>{setPage(item.p);setMenuOpen(false);}} style={{
              width:"100%",padding:"13px 16px",borderRadius:12,border:"none",
              background:page===item.p?"rgba(255,106,0,0.15)":"transparent",
              color:page===item.p?"#FF6A00":"rgba(255,255,255,0.8)",
              fontWeight:600,fontSize:15,cursor:"pointer",textAlign:"left",
              marginBottom:4,transition:"all .2s",
            }}>{item.l}</button>
          ))}
          <button onClick={()=>{setPage("auth");setMenuOpen(false);}} className="ra-btn-primary" style={{
            width:"100%",padding:"14px 0",marginTop:8,borderRadius:14,border:"none",
            background:"linear-gradient(135deg,#FF6A00,#ff9a00)",
            color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",
          }}>Login / Register →</button>
        </div>
      )}

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      {isMobile&&(
        <div className="ra-bnav" style={{
          position:"fixed",bottom:0,left:0,right:0,zIndex:200,
          background:"rgba(8,8,8,0.92)",
          backdropFilter:"blur(24px)",
          WebkitBackdropFilter:"blur(24px)",
          borderTop:"1px solid rgba(255,255,255,0.1)",
          display:"flex",alignItems:"center",
          paddingBottom:"env(safe-area-inset-bottom, 0px)",
          paddingTop:6,
          paddingLeft:4,
          paddingRight:4,
          boxShadow:"0 -8px 32px rgba(0,0,0,0.6)",
        }}>
          {[
            {p:"home",icon:"🏠",label:"Home"},
            {p:"tests",icon:"📝",label:"Tests"},
            {p:"leaderboard",icon:"🏆",label:"Board"},
            ...(user?[{p:"dashboard",icon:"📊",label:"Progress"}]:[{p:"auth",icon:"🔑",label:"Login"}]),
            ...(user?[{p:"profile",icon:"👤",label:"Profile"}]:[]),
          ].map(item=>(
            <button key={item.p}
              className={`ra-bnav-item${page===item.p?" active":""}`}
              onClick={()=>{
                if(item.p==="profile"||item.p==="dashboard"){
                  if(!user){setPage("auth");return;}
                }
                setPage(item.p);
              }}
            >
              {item.p==="leaderboard"&&unreadCount>0&&<span className="ra-bnav-dot"/>}
              <span className="ra-bnav-icon">{item.icon}</span>
              <span className="ra-bnav-label">{item.label}</span>
              <span className="ra-bnav-pip"/>
            </button>
          ))}
          {user&&user.role==="admin"&&(
            <button className={`ra-bnav-item${page==="admin"?" active":""}`} onClick={()=>setPage("admin")}>
              <span className="ra-bnav-icon">⚙️</span>
              <span className="ra-bnav-label">Admin</span>
              <span className="ra-bnav-pip"/>
            </button>
          )}
        </div>
      )}
    </>
  );
}

'''

content = content[:nav_start] + NEW_NAVBAR + content[nav_end:]
print("✅ 2. NavBar replaced with glassmorphism + mobile bottom nav")

# ═══════════════════════════════════════════════════════════════
# 3. UPGRADE HOME PAGE — modern layout with glassmorphism cards
# ═══════════════════════════════════════════════════════════════

OLD_HOME = '''function HomePage({setPage,user,setExamType,banners=[],examTypes,notices=[],setShowNoticeModal}){
  const [sel,setSel]=useState(null);
  const ETs=examTypes||EXAM_TYPES;
  const isMobile=window.innerWidth<=768;

  return(
    <div style={{paddingTop:60,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{flex:1,minHeight:"calc(100vh - 60px)",background:"linear-gradient(135deg,#000 0%,#1a0800 40%,#000 100%)",display:"flex",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.05,backgroundImage:"linear-gradient(#FF6A00 1px,transparent 1px),linear-gradient(90deg,#FF6A00 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
        <div style={{position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(#FF6A0030,transparent 70%)"}}/>
        <div style={{position:"absolute",bottom:-100,left:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(#FF6A0020,transparent 70%)"}}/>

        <div style={{flex:1,display:"flex",position:"relative",maxWidth:1400,margin:"0 auto",width:"100%",padding:isMobile?"12px":"0",gap:0,alignItems:"stretch",flexDirection:isMobile?"column":"row",overflowY:isMobile?"auto":"hidden"}}>

          {/* ── LEFT HALF: Courses, Banners, Notices ── */}
          <div style={{flex:"0 0 42%",maxWidth:isMobile?"100%":"42%",padding:isMobile?"16px":"40px 32px 40px 40px",overflowY:"auto",borderRight:isMobile?"none":"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",gap:20}}>

            {/* Banners */}
            {banners.length>0&&<BannerSlider banners={banners}/>}

            {/* Notices strip */}
            <NoticeStrip notices={notices} setShowNoticeModal={setShowNoticeModal}/>

            {/* Courses/Exam cards */}
            <div>
              <div style={{color:"#aaa",fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:12}}>CHOOSE YOUR COURSE</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {ETs.filter(et=>et.visible!==false).map((et,idx)=>(
                  <div key={et.id}
                    onClick={()=>{setSel(et.id);setExamType(et.id);if(user)setPage("tests");else setPage("auth");}}
                    style={{background:sel===et.id?`linear-gradient(135deg,${et.color},${et.color}dd)`:"rgba(255,255,255,0.04)",borderRadius:14,padding:"14px 18px",cursor:"pointer",border:"1px solid",borderColor:sel===et.id?et.color:"rgba(255,255,255,0.08)",transition:"all .25s",animation:`fadeUp .5s ease ${idx*0.1}s both`}}
                    onMouseOver={e=>{if(sel!==et.id){e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.borderColor=et.color+"80";}}}
                    onMouseOut={e=>{if(sel!==et.id){e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}}
                  >
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <div style={{width:44,height:44,borderRadius:12,background:sel===et.id?"rgba(255,255,255,.2)":et.color+"25",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,border:`1px solid ${et.color}40`}}>{et.icon}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:800,fontSize:15,color:sel===et.id?"#fff":et.color,marginBottom:2}}>{et.label}</div>
                        <div style={{fontSize:11,color:sel===et.id?"rgba(255,255,255,.7)":"#666",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{et.fullName}</div>
                        <div style={{fontSize:10,color:sel===et.id?"rgba(255,255,255,.5)":"#444",marginTop:3}}>{et.desc}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                        <span style={{fontSize:10,color:sel===et.id?"rgba(255,255,255,.6)":"#555"}}>{et.topics?.length||6} topics</span>
                        <span style={{background:sel===et.id?"rgba(255,255,255,.2)":et.color+"20",color:sel===et.id?"#fff":et.color,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>{sel===et.id?"Selected ✓":"Start →"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              {[["50K+","Students","#FF6A00"],["1620+","Questions","#22c55e"],["3","Exams","#1d4ed8"],["☁️","Cloud Sync","#f59e0b"]].map(([v,l,c])=>(
                <div key={l} style={{flex:1,minWidth:80,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px 10px",textAlign:"center",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{fontSize:18,fontWeight:900,color:c}}>{v}</div>
                  <div style={{fontSize:10,color:"#555",marginTop:3}}>{l}</div>
                </div>
              ))}
            </div>

            {/* Login CTA if not logged in */}
            {!user&&(
              <button onClick={()=>setPage("auth")} style={{width:"100%",padding:"14px 0",borderRadius:12,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 24px #FF6A0060"}} onMouseOver={e=>e.currentTarget.style.filter="brightness(1.1)"} onMouseOut={e=>e.currentTarget.style.filter="brightness(1)"}>
                Get Started Free →
              </button>
            )}
            {user&&(
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setPage("tests")} style={{flex:2,padding:"13px 0",borderRadius:12,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer"}}>Start Practice →</button>
                <button onClick={()=>setPage("leaderboard")} style={{flex:1,padding:"13px 0",borderRadius:12,border:"1px solid #FF6A00",background:"transparent",color:"#FF6A00",fontSize:13,fontWeight:700,cursor:"pointer"}}>🏆 Board</button>
              </div>
            )}
          </div>

          {/* ── RIGHT HALF: Animated Hero ── */}
          <div style={{flex:1,padding:isMobile?"16px":"40px 40px 40px 32px",display:"flex",alignItems:"center",justifyContent:"center",minHeight:isMobile?"auto":"calc(100vh - 120px)"}}>
            <HeroAnimation isMobile={isMobile}/>
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div style={{background:"#FF6A00",padding:isMobile?"12px 16px":"16px 40px",display:"flex",justifyContent:"center",gap:isMobile?"16px":"40px",flexWrap:"wrap"}}>
        {[["⏱️","Real Timer"],["📹","Video Solutions"],["☁️","Cloud Scores"],["🔵","Google Login"],["📱","PWA App"]].map(([i,l])=>(
          <div key={l} style={{textAlign:"center"}}><span style={{fontSize:16}}>{i}</span><div style={{fontSize:10,color:"#ffe0c0",fontWeight:700,marginTop:2}}>{l}</div></div>
        ))}
      </div>
    </div>
  );
}'''

NEW_HOME = '''function HomePage({setPage,user,setExamType,banners=[],examTypes,notices=[],setShowNoticeModal}){
  const [sel,setSel]=useState(null);
  const [hoveredET,setHoveredET]=useState(null);
  const ETs=examTypes||EXAM_TYPES;
  const isMobile=useMobile();

  return(
    <div style={{paddingTop:64,minHeight:"100vh",background:"#050505",position:"relative",overflowX:"hidden"}} className={isMobile?"ra-mobile-pb":""}>

      {/* ── Background ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 50%, rgba(255,106,0,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,154,0,0.06) 0%, transparent 45%), radial-gradient(circle at 60% 80%, rgba(29,78,216,0.05) 0%, transparent 40%)"}}/>
        <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:"linear-gradient(rgba(255,106,0,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,106,0,0.8) 1px,transparent 1px)",backgroundSize:"48px 48px"}}/>
        <div className="ra-orb" style={{position:"absolute",top:"-20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,106,0,0.12),transparent 70%)"}}/>
        <div className="ra-orb-2" style={{position:"absolute",bottom:"-20%",left:"-10%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,154,0,0.08),transparent 70%)"}}/>
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:1400,margin:"0 auto",padding:isMobile?"16px":"40px 40px 60px",display:"flex",flexDirection:isMobile?"column":"row",gap:isMobile?24:48,alignItems:"flex-start"}}>

        {/* ── LEFT COLUMN ── */}
        <div style={{flex:"0 0 44%",maxWidth:isMobile?"100%":"44%",display:"flex",flexDirection:"column",gap:20}}>

          {/* Banners */}
          {banners.length>0&&<BannerSlider banners={banners}/>}

          {/* Notices */}
          <NoticeStrip notices={notices} setShowNoticeModal={setShowNoticeModal}/>

          {/* Hero text — only on mobile at top */}
          {isMobile&&!user&&(
            <div style={{textAlign:"center",padding:"8px 0 4px"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#FF6A00",letterSpacing:"0.2em",marginBottom:10}}>ANANTAPUR'S #1 PLATFORM</div>
              <h1 style={{fontSize:28,fontWeight:900,color:"#fff",lineHeight:1.15,margin:"0 0 10px",letterSpacing:"-0.5px"}}>
                Crack SSC, Banking<br/>&amp; Railways <span className="ra-gradient-text">Together</span>
              </h1>
              <p style={{fontSize:14,color:"rgba(255,255,255,0.5)",lineHeight:1.6,margin:0}}>
                1620+ questions · Cloud scores · Live leaderboard
              </p>
            </div>
          )}

          {/* Course cards label */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <div style={{width:3,height:16,background:"linear-gradient(180deg,#FF6A00,#ff9a00)",borderRadius:2}}/>
              <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.18em"}}>CHOOSE YOUR EXAM</span>
            </div>

            {/* Exam cards */}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {ETs.filter(et=>et.visible!==false).map((et,idx)=>{
                const isSelected=sel===et.id;
                const isHovered=hoveredET===et.id;
                return(
                  <div key={et.id}
                    className="ra-exam-card"
                    onClick={()=>{setSel(et.id);setExamType(et.id);if(user)setPage("tests");else setPage("auth");}}
                    onMouseEnter={()=>setHoveredET(et.id)}
                    onMouseLeave={()=>setHoveredET(null)}
                    style={{
                      background:isSelected?`linear-gradient(135deg,${et.color}22,${et.color}10)`:"rgba(255,255,255,0.04)",
                      borderColor:isSelected?et.color:isHovered?et.color+"60":"rgba(255,255,255,0.08)",
                      animation:`raFadeUp .5s ease ${idx*0.08}s both`,
                      boxShadow:isSelected?`0 0 0 1px ${et.color}40, 0 16px 40px rgba(0,0,0,0.4)`:"none",
                    }}
                  >
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      {/* Icon */}
                      <div style={{
                        width:50,height:50,borderRadius:14,flexShrink:0,
                        background:isSelected?`linear-gradient(135deg,${et.color},${et.color}bb)`:et.color+"20",
                        border:`1.5px solid ${isSelected?"transparent":et.color+"30"}`,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,
                        boxShadow:isSelected?`0 8px 24px ${et.color}50`:"none",
                        transition:"all .3s",
                      }}>{et.icon}</div>

                      {/* Text */}
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:800,fontSize:15,color:isSelected?"#fff":et.color,marginBottom:2,letterSpacing:"-0.2px"}}>{et.label}</div>
                        <div style={{fontSize:11,color:isSelected?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.35)",marginBottom:4}}>{et.fullName}</div>
                        <div style={{fontSize:10,color:isSelected?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.2)"}}>{et.desc}</div>
                      </div>

                      {/* Badge */}
                      <div style={{textAlign:"center",flexShrink:0}}>
                        <div style={{
                          background:isSelected?"rgba(255,255,255,0.2)":et.color+"18",
                          color:isSelected?"#fff":et.color,
                          borderRadius:20,padding:"5px 12px",
                          fontSize:11,fontWeight:700,
                          border:`1px solid ${isSelected?"rgba(255,255,255,0.2)":et.color+"30"}`,
                          transition:"all .3s",
                        }}>{isSelected?"✓ Selected":"Start →"}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:4}}>{et.topics?.length||6} topics</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {[["50K+","Students","#FF6A00"],["1620+","Questions","#22c55e"],["3","Exams","#3b82f6"],["☁️","Synced","#f59e0b"]].map(([v,l,c],i)=>(
              <div key={l} className="ra-stat-card" style={{animationDelay:`${i*0.08}s`}}>
                <div style={{fontSize:isMobile?16:18,fontWeight:900,color:c,lineHeight:1}}>{v}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginTop:4,fontWeight:600,letterSpacing:"0.05em"}}>{l}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          {!user?(
            <button onClick={()=>setPage("auth")} className="ra-btn-primary" style={{
              width:"100%",padding:"16px 0",borderRadius:16,border:"none",
              background:"linear-gradient(135deg,#FF6A00,#ff9a00)",
              color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",
              boxShadow:"0 8px 32px rgba(255,106,0,0.45)",
              letterSpacing:"-0.2px",
            }}>
              Start Free Practice →
            </button>
          ):(
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setPage("tests")} className="ra-btn-primary" style={{
                flex:2,padding:"14px 0",borderRadius:14,border:"none",
                background:"linear-gradient(135deg,#FF6A00,#ff9a00)",
                color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",
              }}>Start Practice →</button>
              <button onClick={()=>setPage("leaderboard")} style={{
                flex:1,padding:"14px 0",borderRadius:14,
                border:"1.5px solid rgba(255,106,0,0.4)",
                background:"rgba(255,106,0,0.08)",
                color:"#FF6A00",fontSize:13,fontWeight:700,cursor:"pointer",
                transition:"all .2s",
              }}>🏆 Board</button>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN — Hero ── */}
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",paddingTop:isMobile?0:8,gap:24}}>

          {/* Desktop hero headline */}
          {!isMobile&&(
            <div style={{textAlign:"center",animation:"raFadeUp .6s ease .1s both"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#FF6A00",letterSpacing:"0.2em",marginBottom:12}}>ANANTAPUR'S #1 TEST PLATFORM</div>
              <h1 style={{fontSize:42,fontWeight:900,color:"#fff",lineHeight:1.1,margin:"0 0 14px",letterSpacing:"-1px"}}>
                Crack SSC, Banking<br/>&amp; Railways <span className="ra-gradient-text">Together</span>
              </h1>
              <p style={{fontSize:16,color:"rgba(255,255,255,0.45)",lineHeight:1.6,maxWidth:480,margin:"0 auto"}}>
                1620+ curated questions · Real exam timers · Cloud-synced scores · Live leaderboard
              </p>
            </div>
          )}

          {/* Feature pills */}
          <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",animation:"raFadeUp .6s ease .2s both"}}>
            {[["⏱️","Timed Mode"],["📹","Video Solutions"],["☁️","Cloud Sync"],["🔵","Google Login"],["🏆","Leaderboard"],["📱","PWA App"]].map(([icon,label])=>(
              <div key={label} style={{
                display:"flex",alignItems:"center",gap:6,
                padding:"7px 14px",borderRadius:20,
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)",
                fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.7)",
                transition:"all .2s",
              }}
              onMouseOver={e=>{e.currentTarget.style.background="rgba(255,106,0,0.12)";e.currentTarget.style.borderColor="rgba(255,106,0,0.3)";e.currentTarget.style.color="#FF6A00";}}
              onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.color="rgba(255,255,255,0.7)";}}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>

          {/* Animated hero widget */}
          <div style={{width:"100%",maxWidth:520,animation:"raFadeUp .7s ease .3s both"}}>
            <HeroAnimation isMobile={isMobile}/>
          </div>
        </div>
      </div>
    </div>
  );
}'''

if OLD_HOME in content:
    content = content.replace(OLD_HOME, NEW_HOME, 1)
    print("✅ 3. HomePage upgraded with glassmorphism + modern layout")
else:
    print("⚠️  3. HomePage: exact match not found — skipping (apply manually)")

# ═══════════════════════════════════════════════════════════════
# 4. UPGRADE SPINNER — smoother, branded
# ═══════════════════════════════════════════════════════════════
OLD_SPINNER = '''function Spinner({size=24,color="#FF6A00"}){
  return(
    <div style={{width:size,height:size,border:`3px solid ${color}30`,borderTop:`3px solid ${color}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
  );
}'''

NEW_SPINNER = '''function Spinner({size=24,color="#FF6A00"}){
  return(
    <div style={{width:size,height:size,position:"relative",flexShrink:0}}>
      <div style={{width:size,height:size,border:`2.5px solid ${color}20`,borderTop:`2.5px solid ${color}`,borderRight:`2.5px solid ${color}60`,borderRadius:"50%",animation:"spin 0.7s cubic-bezier(.4,0,.2,1) infinite"}}/>
    </div>
  );
}'''

content = content.replace(OLD_SPINNER, NEW_SPINNER, 1)
print("✅ 4. Spinner upgraded")

# ═══════════════════════════════════════════════════════════════
# 5. UPGRADE AUTH PAGE — glassmorphism login card
# ═══════════════════════════════════════════════════════════════
OLD_AUTH_RETURN = '''  return(
    <div style={{paddingTop:60,minHeight:"100vh",background:"linear-gradient(135deg,#000 0%,#1a0800 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:window.innerWidth<=768?"70px 20px 40px":"80px 20px 40px"}}>
      {/* Background grid */}
      <div style={{position:"fixed",inset:0,opacity:.04,backgroundImage:"linear-gradient(#FF6A00 1px,transparent 1px),linear-gradient(90deg,#FF6A00 1px,transparent 1px)",backgroundSize:"36px 36px",pointerEvents:"none"}}/>
      {/* Glow orbs */}
      <div style={{position:"fixed",top:-100,left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(#FF6A0018,transparent 70%)",pointerEvents:"none"}}/>

      <div style={{position:"relative",width:"100%",maxWidth:420,animation:"raFadeUp .6s ease both"}}>
        {/* Card */}
        <div style={{background:"#0d0d0d",borderRadius:24,padding:"40px 36px",border:"1px solid #FF6A0030",boxShadow:"0 24px 80px #00000080"}}>'''

NEW_AUTH_RETURN = '''  return(
    <div style={{paddingTop:64,minHeight:"100vh",background:"#050505",display:"flex",alignItems:"center",justifyContent:"center",padding:useMobile()?"74px 20px 100px":"80px 20px 40px",position:"relative",overflow:"hidden"}}>
      {/* Background */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 40%, rgba(255,106,0,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,154,0,0.07) 0%, transparent 40%)"}}/>
        <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:"linear-gradient(rgba(255,106,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,106,0,1) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
      </div>

      <div style={{position:"relative",width:"100%",maxWidth:400,animation:"raPop .5s cubic-bezier(.4,0,.2,1) both"}}>
        {/* Card */}
        <div style={{
          background:"rgba(12,12,12,0.9)",
          backdropFilter:"blur(32px)",
          WebkitBackdropFilter:"blur(32px)",
          borderRadius:28,padding:"40px 36px",
          border:"1px solid rgba(255,106,0,0.2)",
          boxShadow:"0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
        }}>'''

content = content.replace(OLD_AUTH_RETURN, NEW_AUTH_RETURN, 1)
print("✅ 5. AuthPage upgraded")

# ═══════════════════════════════════════════════════════════════
# 6. FIX ALL paddingTop:80 → paddingTop:64 for new navbar height
# ═══════════════════════════════════════════════════════════════
content = content.replace("paddingTop:80,padding:window.innerWidth<=768?\"70px 16px 32px\"","paddingTop:74,padding:window.innerWidth<=768?\"74px 16px 100px\"")
content = content.replace("paddingTop:80,padding:window.innerWidth<=768?\"70px 14px 32px\"","paddingTop:74,padding:window.innerWidth<=768?\"74px 14px 100px\"")
content = re.sub(r'"80px 40px 40px"', '"74px 40px 40px"', content)
print("✅ 6. Padding adjusted for new navbar + bottom nav")

# ═══════════════════════════════════════════════════════════════
# 7. UPGRADE TEST CARDS
# ═══════════════════════════════════════════════════════════════
old_test_card = '''              <div key={testObj.id} style={{border:"2px solid",borderColor:isPaidLocked?"#e0e0e0":"#f0f0f0",borderRadius:16,padding:22,background:isPaidLocked?"#fafafa":"#fff",opacity:isPaidLocked?.7:1,transition:"all .2s",boxShadow:"0 2px 12px #00000006"}}
                onMouseOver={e=>{if(!isPaidLocked){e.currentTarget.style.borderColor=et.color;e.currentTarget.style.boxShadow=`0 8px 24px ${et.color}20`;}}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=isPaidLocked?"#e0e0e0":"#f0f0f0";e.currentTarget.style.boxShadow="0 2px 12px #00000006";}}>'''

new_test_card = '''              <div key={testObj.id} className="ra-test-card" style={{border:"1.5px solid",borderColor:isPaidLocked?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.08)",borderRadius:20,padding:22,background:"rgba(255,255,255,0.03)",opacity:isPaidLocked?.5:1,boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}
                onMouseOver={e=>{if(!isPaidLocked){e.currentTarget.style.borderColor=et.color+"60";e.currentTarget.style.background="rgba(255,255,255,0.06)";}}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=isPaidLocked?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.08)";e.currentTarget.style.background="rgba(255,255,255,0.03)";}}>'''

content = content.replace(old_test_card, new_test_card, 1)
print("✅ 7. Test cards upgraded")

# ═══════════════════════════════════════════════════════════════
# 8. UPGRADE TESTS PAGE background
# ═══════════════════════════════════════════════════════════════
old_tests_div = '  return(\n    <div style={{paddingTop:74,padding:window.innerWidth<=768?"74px 16px 100px":"74px 40px 40px",maxWidth:1100,margin:"0 auto"}}>'
new_tests_div = '  return(\n    <div style={{paddingTop:74,padding:window.innerWidth<=768?"74px 16px 100px":"74px 40px 40px",maxWidth:1100,margin:"0 auto",minHeight:"100vh",background:"#050505"}} className={useMobile()?"ra-mobile-pb":""}>'
content = content.replace(old_tests_div, new_tests_div, 1)
print("✅ 8. TestsPage background upgraded")

# ═══════════════════════════════════════════════════════════════
# 9. UPGRADE LOGO component
# ═══════════════════════════════════════════════════════════════
OLD_LOGO = '''function Logo({white=false}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:40,height:40,background:"linear-gradient(135deg,#FF6A00,#ff9a00)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:18,boxShadow:"0 2px 12px #FF6A0060"}}>RA</div>
      <div>
        <div style={{fontWeight:800,fontSize:15,color:white?"#fff":"#000",lineHeight:1.1}}>Rank Achievers</div>
        <div style={{fontSize:10,color:"#FF6A00",fontWeight:700,letterSpacing:1}}>ACADEMY · ANANTAPUR</div>
      </div>
    </div>
  );
}'''

NEW_LOGO = '''function Logo({white=false}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{
        width:38,height:38,
        background:"linear-gradient(135deg,#FF6A00,#ff9a00)",
        borderRadius:11,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontWeight:900,color:"#fff",fontSize:16,
        boxShadow:"0 4px 16px rgba(255,106,0,0.5)",
        letterSpacing:"-0.5px",
        flexShrink:0,
      }}>RA</div>
      <div>
        <div style={{fontWeight:800,fontSize:14,color:"#fff",lineHeight:1.1,letterSpacing:"-0.3px"}}>Rank Achievers</div>
        <div style={{fontSize:9,color:"#FF6A00",fontWeight:700,letterSpacing:"0.15em"}}>ACADEMY · ANANTAPUR</div>
      </div>
    </div>
  );
}'''

content = content.replace(OLD_LOGO, NEW_LOGO, 1)
print("✅ 9. Logo upgraded")

# ═══════════════════════════════════════════════════════════════
# 10. Add Google Font to index.html
# ═══════════════════════════════════════════════════════════════
try:
    with open("index.html", "r") as f:
        html = f.read()

    if "Plus+Jakarta+Sans" not in html:
        html = html.replace(
            "<style>",
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">\n    <style>',
            1
        )
        # Add font to body
        html = html.replace(
            'font-family:"Segoe UI",system-ui,-apple-system,sans-serif;',
            'font-family:"Plus Jakarta Sans","Segoe UI",system-ui,-apple-system,sans-serif;'
        )
        with open("index.html", "w") as f:
            f.write(html)
        print("✅ 10. Google Font added to index.html")
    else:
        print("✅ 10. Google Font already in index.html")
except:
    print("⚠️  10. index.html not found — skip font injection")

# ═══════════════════════════════════════════════════════════════
# WRITE OUTPUT
# ═══════════════════════════════════════════════════════════════
with open("src/App.jsx", "w") as f:
    f.write(content)

print("\n" + "="*60)
print("✅ Design upgrade complete!")
print("="*60)
print("\nNext steps:")
print("  npm run build && git add -A && git commit -m 'Design: glassmorphism + bottom nav + modern UI' && git push")
