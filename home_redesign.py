#!/usr/bin/env python3
"""
Rank Achievers — Stunning Home Page Redesign
Run from: ~/Downloads/rankachievers/
Usage: python3 home_redesign.py
"""

with open("src/App.jsx", "r") as f:
    content = f.read()

# ─────────────────────────────────────────────────────────────
# STEP 1 — Inject new global CSS keyframes & home-specific styles
# ─────────────────────────────────────────────────────────────

HOME_CSS_INJECT = '''
  /* ── HOME PAGE PREMIUM STYLES ── */

  @keyframes raCountUp   { from{opacity:0;transform:translateY(10px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes raOrbit     { from{transform:rotate(0deg) translateX(120px) rotate(0deg)} to{transform:rotate(360deg) translateX(120px) rotate(-360deg)} }
  @keyframes raMesh      { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes raBeam      { 0%{opacity:0;transform:scaleX(0)} 30%{opacity:1} 100%{opacity:0;transform:scaleX(1)} }
  @keyframes raTicker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes raCardIn    { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes raHeroPulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,106,0,0)} 50%{box-shadow:0 0 0 20px rgba(255,106,0,0.08)} }
  @keyframes raStagger0  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raStagger1  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raStagger2  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raStagger3  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

  .ra-home-exam-card {
    position: relative;
    overflow: hidden;
    border-radius: 22px;
    padding: 22px;
    cursor: pointer;
    transition: all .35s cubic-bezier(.4,0,.2,1);
    border: 1.5px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
  }
  .ra-home-exam-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 22px;
    opacity: 0;
    transition: opacity .35s ease;
    background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,106,0,0.12), transparent 60%);
  }
  .ra-home-exam-card:hover::before { opacity: 1; }
  .ra-home-exam-card:hover {
    transform: translateY(-6px);
    border-color: rgba(255,106,0,0.3);
    box-shadow: 0 28px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,106,0,0.15);
  }
  .ra-home-exam-card.selected {
    border-color: var(--card-color, #FF6A00);
    box-shadow: 0 0 0 1px var(--card-color, #FF6A00), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  .ra-stat-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    border-radius: 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    transition: all .3s ease;
    animation: raCardIn .6s ease both;
  }
  .ra-stat-pill:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,106,0,0.25);
    transform: translateY(-2px);
  }

  .ra-feature-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 16px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.65);
    cursor: default;
    transition: all .25s ease;
    white-space: nowrap;
  }
  .ra-feature-chip:hover {
    border-color: rgba(255,106,0,0.4);
    background: rgba(255,106,0,0.1);
    color: #FF6A00;
  }

  .ra-cta-primary {
    width: 100%;
    padding: 18px 0;
    border-radius: 18px;
    border: none;
    background: linear-gradient(135deg, #FF6A00 0%, #ff8c00 50%, #ff9a00 100%);
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    letter-spacing: -0.2px;
    transition: all .3s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 8px 32px rgba(255,106,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25);
  }
  .ra-cta-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity .3s;
  }
  .ra-cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(255,106,0,0.55);
  }
  .ra-cta-primary:hover::after { opacity: 1; }
  .ra-cta-primary:active { transform: scale(0.97); }

  .ra-ticker-wrap {
    overflow: hidden;
    width: 100%;
  }
  .ra-ticker {
    display: flex;
    gap: 40px;
    animation: raTicker 30s linear infinite;
    width: max-content;
  }
  .ra-ticker:hover { animation-play-state: paused; }

  .ra-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    border-radius: 100px;
    background: rgba(255,106,0,0.12);
    border: 1px solid rgba(255,106,0,0.3);
    font-size: 12px;
    font-weight: 700;
    color: #FF6A00;
    letter-spacing: 0.05em;
    animation: raCardIn .5s ease .1s both;
  }

  .ra-mesh-bg {
    background: linear-gradient(135deg, #FF6A00, #ff4500, #1d4ed8, #FF6A00);
    background-size: 400% 400%;
    animation: raMesh 8s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ra-glow-ring {
    animation: raHeroPulse 3s ease-in-out infinite;
  }

  .ra-live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 0 rgba(34,197,94,0.4);
    animation: raPulseRing 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  .ra-number-reveal {
    animation: raCountUp .7s cubic-bezier(.4,0,.2,1) both;
  }

  @media (max-width: 768px) {
    .ra-home-exam-card:hover { transform: none; }
  }
'''

# Inject into existing CSS block
content = content.replace(
    "  .page-fade { animation: raFadeUp .3s ease both; }\n`;",
    "  .page-fade { animation: raFadeUp .3s ease both; }\n" + HOME_CSS_INJECT + "\n`;"
)
print("✅ 1. Home CSS injected")

# ─────────────────────────────────────────────────────────────
# STEP 2 — Replace HomePage with the stunning new version
# ─────────────────────────────────────────────────────────────

OLD_HOME_START = "function HomePage({setPage,user,setExamType,banners=[],examTypes,notices=[],setShowNoticeModal}){"
OLD_HOME_END   = "// ─── EXAM MODE MODAL ──────────────────────────────────────────────────────────"

home_start = content.find(OLD_HOME_START)
home_end   = content.find(OLD_HOME_END)

NEW_HOME = '''function HomePage({setPage,user,setExamType,banners=[],examTypes,notices=[],setShowNoticeModal}){
  const [sel,setSel]=useState(null);
  const [hovered,setHovered]=useState(null);
  const [mousePos,setMousePos]=useState({x:50,y:50});
  const ETs=examTypes||EXAM_TYPES;
  const isMobile=useMobile();

  const handleCardMouseMove=(e,id)=>{
    const r=e.currentTarget.getBoundingClientRect();
    const x=Math.round(((e.clientX-r.left)/r.width)*100);
    const y=Math.round(((e.clientY-r.top)/r.height)*100);
    e.currentTarget.style.setProperty("--mx",x+"%");
    e.currentTarget.style.setProperty("--my",y+"%");
  };

  const TICKER_ITEMS=[
    "🏛️ SSC CGL 2025","🏦 IBPS PO","🚂 RRB NTPC","📊 Data Interpretation",
    "🔢 Quantitative Aptitude","🧠 Reasoning","🌍 General Awareness","⚙️ Technical Ability",
    "🏛️ SSC CHSL","🏦 SBI PO","🚂 RRB Group D","📐 Geometry",
  ];

  return(
    <div style={{
      minHeight:"100vh",
      background:"#060608",
      position:"relative",
      overflowX:"hidden",
      paddingTop:64,
    }} className={isMobile?"ra-mobile-pb":""}>

      {/* ══════════ BACKGROUND SYSTEM ══════════ */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {/* Deep mesh gradient */}
        <div style={{
          position:"absolute",inset:0,
          background:"radial-gradient(ellipse 80% 60% at 20% 0%, rgba(255,106,0,0.11) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(29,78,216,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 60% 40%, rgba(255,154,0,0.06) 0%, transparent 50%)",
        }}/>
        {/* Noise grain */}
        <div style={{
          position:"absolute",inset:0,opacity:0.025,
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize:"128px 128px",
        }}/>
        {/* Grid */}
        <div style={{
          position:"absolute",inset:0,opacity:0.03,
          backgroundImage:"linear-gradient(rgba(255,106,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,1) 1px, transparent 1px)",
          backgroundSize:"56px 56px",
        }}/>
        {/* Floating orbs */}
        <div className="ra-orb" style={{position:"absolute",top:"-15%",right:"-5%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,106,0,0.1) 0%,transparent 65%)"}}/>
        <div className="ra-orb-2" style={{position:"absolute",bottom:"-20%",left:"-8%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,78,216,0.08) 0%,transparent 60%)"}}/>
        <div style={{position:"absolute",top:"40%",left:"30%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,154,0,0.05) 0%,transparent 60%)",animation:"raOrb 20s ease-in-out infinite"}}/>
      </div>

      {/* ══════════ HERO SECTION ══════════ */}
      <div style={{position:"relative",zIndex:1,maxWidth:1320,margin:"0 auto",padding:isMobile?"20px 16px 0":"56px 48px 0",display:"flex",flexDirection:isMobile?"column":"row",gap:isMobile?28:56,alignItems:"flex-start"}}>

        {/* ── LEFT: Headline + Cards + CTA ── */}
        <div style={{flex:"0 0 46%",maxWidth:isMobile?"100%":"46%",display:"flex",flexDirection:"column",gap:isMobile?18:22}}>

          {/* Badge */}
          <div style={{animation:"raCardIn .5s ease .05s both"}}>
            <span className="ra-hero-badge">
              <span className="ra-live-dot"/>
              Anantapur&apos;s #1 Exam Platform
            </span>
          </div>

          {/* Headline */}
          <div style={{animation:"raCardIn .6s ease .1s both"}}>
            <h1 style={{
              fontSize:isMobile?30:46,
              fontWeight:900,
              color:"#fff",
              lineHeight:1.08,
              margin:"0 0 14px",
              letterSpacing:"-1.5px",
            }}>
              Crack <span className="ra-mesh-bg">SSC, Banking</span><br/>
              &amp; Railways — <span style={{color:"#FF6A00",fontStyle:"italic"}}>Together.</span>
            </h1>
            <p style={{
              fontSize:isMobile?14:16,
              color:"rgba(255,255,255,0.45)",
              lineHeight:1.65,
              margin:0,
              maxWidth:460,
              fontWeight:400,
            }}>
              Practice with 1620+ curated questions, real exam timers, and cloud-synced scores. Join students from Anantapur already cracking government exams.
            </p>
          </div>

          {/* Banners */}
          {banners.length>0&&(
            <div style={{animation:"raCardIn .6s ease .15s both"}}>
              <BannerSlider banners={banners}/>
            </div>
          )}

          {/* Notices */}
          {notices.length>0&&(
            <div style={{animation:"raCardIn .6s ease .18s both"}}>
              <NoticeStrip notices={notices} setShowNoticeModal={setShowNoticeModal}/>
            </div>
          )}

          {/* ── EXAM CARDS ── */}
          <div style={{animation:"raCardIn .6s ease .2s both"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:3,height:18,background:"linear-gradient(180deg,#FF6A00,rgba(255,106,0,0))",borderRadius:2}}/>
              <span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.35)",letterSpacing:"0.2em"}}>CHOOSE YOUR EXAM</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {ETs.filter(et=>et.visible!==false).map((et,idx)=>{
                const isSelected=sel===et.id;
                return(
                  <div
                    key={et.id}
                    className={`ra-home-exam-card${isSelected?" selected":""}`}
                    style={{"--card-color":et.color,animationDelay:`${0.22+idx*0.07}s`,animation:"raCardIn .6s ease both"}}
                    onClick={()=>{setSel(et.id);setExamType(et.id);if(user)setPage("tests");else setPage("auth");}}
                    onMouseMove={e=>handleCardMouseMove(e,et.id)}
                    onMouseEnter={()=>setHovered(et.id)}
                    onMouseLeave={()=>setHovered(null)}
                  >
                    {/* Selected glow line */}
                    {isSelected&&<div style={{position:"absolute",top:0,left:24,right:24,height:2,background:`linear-gradient(90deg,transparent,${et.color},transparent)`,borderRadius:"0 0 2px 2px"}}/>}

                    <div style={{display:"flex",alignItems:"center",gap:16,position:"relative"}}>
                      {/* Icon box */}
                      <div style={{
                        width:52,height:52,borderRadius:16,flexShrink:0,
                        background:isSelected?`linear-gradient(135deg,${et.color},${et.color}cc)`:`${et.color}18`,
                        border:`1.5px solid ${isSelected?"transparent":et.color+"30"}`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:26,
                        boxShadow:isSelected?`0 8px 24px ${et.color}60, inset 0 1px 0 rgba(255,255,255,0.2)`:`0 4px 12px ${et.color}20`,
                        transition:"all .35s ease",
                      }}>{et.icon}</div>

                      {/* Text */}
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{
                          fontWeight:800,fontSize:16,
                          color:isSelected?"#fff":et.color,
                          marginBottom:3,letterSpacing:"-0.3px",
                          transition:"color .3s",
                        }}>{et.label}</div>
                        <div style={{
                          fontSize:11,
                          color:isSelected?"rgba(255,255,255,0.55)":"rgba(255,255,255,0.3)",
                          marginBottom:5,fontWeight:500,
                        }}>{et.fullName}</div>
                        {/* Topic pills */}
                        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                          {(et.topics||[]).slice(0,3).map(t=>(
                            <span key={t.id} style={{
                              fontSize:9,fontWeight:600,
                              padding:"2px 8px",borderRadius:100,
                              background:isSelected?"rgba(255,255,255,0.12)":et.color+"15",
                              color:isSelected?"rgba(255,255,255,0.7)":et.color+"bb",
                              border:`1px solid ${isSelected?"rgba(255,255,255,0.1)":et.color+"25"}`,
                            }}>{t.name}</span>
                          ))}
                          {(et.topics||[]).length>3&&(
                            <span style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:100,color:"rgba(255,255,255,0.3)"}}>+{(et.topics||[]).length-3}</span>
                          )}
                        </div>
                      </div>

                      {/* Right badge */}
                      <div style={{flexShrink:0,textAlign:"right"}}>
                        <div style={{
                          padding:"7px 14px",borderRadius:100,
                          background:isSelected?et.color:`${et.color}18`,
                          color:isSelected?"#fff":et.color,
                          fontSize:11,fontWeight:700,
                          border:`1px solid ${isSelected?"transparent":et.color+"30"}`,
                          transition:"all .3s",
                          boxShadow:isSelected?`0 4px 16px ${et.color}50`:"none",
                        }}>{isSelected?"✓ Selected":"Start →"}</div>
                        <div style={{fontSize:9,color:"rgba(255,255,255,0.2)",marginTop:5,fontWeight:500}}>{et.topics?.length||6} topics · 3 levels</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,animation:"raCardIn .6s ease .38s both"}}>
            {[
              {v:"50,000+",l:"Students enrolled",icon:"👨‍🎓",c:"#FF6A00"},
              {v:"1,620+",l:"Practice questions",icon:"📝",c:"#22c55e"},
              {v:"3",l:"Exam categories",icon:"🏆",c:"#3b82f6"},
              {v:"Real-time",l:"Cloud sync",icon:"☁️",c:"#f59e0b"},
            ].map((s,i)=>(
              <div key={s.l} className="ra-stat-pill" style={{animationDelay:`${0.38+i*0.06}s`}}>
                <div style={{
                  width:38,height:38,borderRadius:12,flexShrink:0,
                  background:`${s.c}18`,border:`1px solid ${s.c}30`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,
                }}>{s.icon}</div>
                <div>
                  <div style={{fontSize:15,fontWeight:800,color:"#fff",letterSpacing:"-0.3px",lineHeight:1.1}}>{s.v}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:500,marginTop:2}}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div style={{display:"flex",flexDirection:"column",gap:10,animation:"raCardIn .6s ease .45s both"}}>
            {!user?(
              <>
                <button onClick={()=>setPage("auth")} className="ra-cta-primary">
                  Start Free Practice — No Sign-up Needed →
                </button>
                <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.25)",fontWeight:500}}>
                  Google login · Free forever · Cloud synced
                </div>
              </>
            ):(
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setPage("tests")} className="ra-cta-primary" style={{flex:2,padding:"16px 0",borderRadius:16,fontSize:15}}>
                  Continue Practice →
                </button>
                <button onClick={()=>setPage("leaderboard")} style={{
                  flex:1,padding:"16px 0",borderRadius:16,
                  border:"1.5px solid rgba(255,106,0,0.35)",
                  background:"rgba(255,106,0,0.08)",
                  color:"#FF6A00",fontSize:13,fontWeight:700,cursor:"pointer",
                  transition:"all .25s ease",
                }}
                onMouseOver={e=>{e.currentTarget.style.background="rgba(255,106,0,0.16)";e.currentTarget.style.borderColor="rgba(255,106,0,0.6)";}}
                onMouseOut={e=>{e.currentTarget.style.background="rgba(255,106,0,0.08)";e.currentTarget.style.borderColor="rgba(255,106,0,0.35)";}}>
                  🏆 Leaderboard
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Hero Widget ── */}
        <div style={{
          flex:1,
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          gap:20,
          paddingTop:isMobile?0:8,
          animation:"raCardIn .7s ease .15s both",
        }}>
          {/* Feature chips */}
          {!isMobile&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",maxWidth:500,marginBottom:4}}>
              {[
                {icon:"⏱️",label:"Real Exam Timer"},
                {icon:"📹",label:"Video Solutions"},
                {icon:"☁️",label:"Cloud Scores"},
                {icon:"🏆",label:"Live Leaderboard"},
                {icon:"🔵",label:"Google Login"},
                {icon:"📱",label:"PWA App"},
              ].map(f=>(
                <span key={f.label} className="ra-feature-chip">
                  {f.icon} {f.label}
                </span>
              ))}
            </div>
          )}

          {/* Hero animation widget */}
          <div style={{width:"100%",maxWidth:520}}>
            <HeroAnimation isMobile={isMobile}/>
          </div>

          {/* Social proof card */}
          {!isMobile&&(
            <div style={{
              width:"100%",maxWidth:520,
              background:"rgba(255,255,255,0.04)",
              backdropFilter:"blur(20px)",
              WebkitBackdropFilter:"blur(20px)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:20,
              padding:"16px 20px",
              display:"flex",alignItems:"center",gap:16,
              animation:"raCardIn .7s ease .4s both",
            }}>
              {/* Avatars */}
              <div style={{display:"flex",flexShrink:0}}>
                {["🧑‍💼","👩‍🎓","👨‍💻","👩‍🏫","🧑‍🎓"].map((a,i)=>(
                  <div key={i} style={{
                    width:32,height:32,borderRadius:"50%",
                    background:`hsl(${20+i*40},70%,45%)`,
                    border:"2px solid #060608",
                    marginLeft:i>0?-8:0,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:14,zIndex:5-i,position:"relative",
                  }}>{a}</div>
                ))}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:2}}>
                  50,000+ students already practicing
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>
                  Join thousands cracking SSC · Banking · Railways
                </div>
              </div>
              <div style={{flexShrink:0,textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:900,color:"#22c55e",letterSpacing:"-0.5px"}}>4.9★</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>Rating</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════ TICKER STRIP ══════════ */}
      <div style={{
        position:"relative",zIndex:1,
        marginTop:isMobile?32:48,
        padding:"14px 0",
        background:"rgba(255,106,0,0.06)",
        borderTop:"1px solid rgba(255,106,0,0.12)",
        borderBottom:"1px solid rgba(255,106,0,0.12)",
        overflow:"hidden",
      }}>
        <div className="ra-ticker-wrap">
          <div className="ra-ticker">
            {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i)=>(
              <span key={i} style={{
                fontSize:12,fontWeight:600,
                color:"rgba(255,106,0,0.7)",
                whiteSpace:"nowrap",
                display:"flex",alignItems:"center",gap:8,
              }}>
                {item}
                <span style={{color:"rgba(255,106,0,0.3)"}}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ WHY RANK ACHIEVERS SECTION ══════════ */}
      <div style={{position:"relative",zIndex:1,maxWidth:1320,margin:"0 auto",padding:isMobile?"40px 16px":"64px 48px"}}>
        {/* Section header */}
        <div style={{textAlign:"center",marginBottom:isMobile?28:44,animation:"raCardIn .6s ease both"}}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"6px 16px",borderRadius:100,
            background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.1)",
            fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",
            letterSpacing:"0.12em",marginBottom:16,
          }}>WHY STUDENTS CHOOSE US</div>
          <h2 style={{
            fontSize:isMobile?24:36,fontWeight:900,
            color:"#fff",margin:"0 0 12px",letterSpacing:"-0.8px",
          }}>
            Everything you need to <span style={{color:"#FF6A00"}}>crack the exam</span>
          </h2>
          <p style={{fontSize:15,color:"rgba(255,255,255,0.35)",maxWidth:480,margin:"0 auto",lineHeight:1.6}}>
            Built specifically for SSC, Banking & Railways aspirants in Anantapur
          </p>
        </div>

        {/* Feature grid */}
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:16}}>
          {[
            {icon:"⏱️",title:"Real Exam Environment",desc:"Full 30-minute timed tests with auto-submit, question palette, and live per-question timer — exactly like the real exam.",color:"#FF6A00",delay:".05s"},
            {icon:"📊",title:"Deep Performance Analytics",desc:"Track accuracy, time-per-question, topic-wise breakdown, and rank on live leaderboard updated in real-time.",color:"#22c55e",delay:".1s"},
            {icon:"📹",title:"Video Solutions",desc:"Every question has a step-by-step explanation with embedded YouTube video solution for visual learners.",color:"#3b82f6",delay:".15s"},
            {icon:"☁️",title:"Cloud Sync Everywhere",desc:"Your scores and progress sync instantly across phone, tablet, and laptop. Never lose your data.",color:"#f59e0b",delay:".2s"},
            {icon:"🏆",title:"Live Leaderboard",desc:"See where you stand among all students in real-time. Updated the moment someone submits a test.",color:"#a855f7",delay:".25s"},
            {icon:"📱",title:"Install as App",desc:"Add to your home screen for instant access, offline support, and a native app experience on any device.",color:"#ec4899",delay:".3s"},
          ].map((f,i)=>(
            <div key={f.title} style={{
              padding:"26px 24px",
              borderRadius:22,
              background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(255,255,255,0.07)",
              transition:"all .3s cubic-bezier(.4,0,.2,1)",
              animation:`raCardIn .6s ease ${f.delay} both`,
              cursor:"default",
            }}
            onMouseOver={e=>{
              e.currentTarget.style.background="rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor=f.color+"40";
              e.currentTarget.style.transform="translateY(-4px)";
              e.currentTarget.style.boxShadow=`0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px ${f.color}25`;
            }}
            onMouseOut={e=>{
              e.currentTarget.style.background="rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";
              e.currentTarget.style.transform="translateY(0)";
              e.currentTarget.style.boxShadow="none";
            }}>
              <div style={{
                width:48,height:48,borderRadius:14,marginBottom:18,
                background:f.color+"18",border:`1px solid ${f.color}30`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,
              }}>{f.icon}</div>
              <div style={{fontWeight:800,fontSize:16,color:"#fff",marginBottom:8,letterSpacing:"-0.2px"}}>{f.title}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.6,fontWeight:400}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ EXAM SPOTLIGHT STRIP ══════════ */}
      <div style={{
        position:"relative",zIndex:1,
        background:"rgba(255,255,255,0.02)",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        padding:isMobile?"28px 16px":"40px 48px",
      }}>
        <div style={{maxWidth:1320,margin:"0 auto"}}>
          <div style={{
            display:"grid",
            gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",
            gap:isMobile?12:20,
          }}>
            {ETs.filter(et=>et.visible!==false).map((et,idx)=>(
              <div key={et.id}
                onClick={()=>{setExamType(et.id);setPage("tests");}}
                style={{
                  padding:"22px 24px",borderRadius:20,cursor:"pointer",
                  background:`linear-gradient(135deg,${et.color}12,${et.color}06)`,
                  border:`1px solid ${et.color}25`,
                  transition:"all .3s ease",
                  animation:`raCardIn .6s ease ${idx*0.08}s both`,
                  display:"flex",alignItems:"center",gap:16,
                }}
                onMouseOver={e=>{
                  e.currentTarget.style.background=`linear-gradient(135deg,${et.color}20,${et.color}10)`;
                  e.currentTarget.style.borderColor=et.color+"60";
                  e.currentTarget.style.transform="translateY(-3px)";
                  e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,0.4)`;
                }}
                onMouseOut={e=>{
                  e.currentTarget.style.background=`linear-gradient(135deg,${et.color}12,${et.color}06)`;
                  e.currentTarget.style.borderColor=et.color+"25";
                  e.currentTarget.style.transform="translateY(0)";
                  e.currentTarget.style.boxShadow="none";
                }}
              >
                <div style={{fontSize:36}}>{et.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:17,color:"#fff",marginBottom:3,letterSpacing:"-0.3px"}}>{et.label}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:8}}>{et.desc}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {(et.topics||[]).slice(0,4).map(t=>(
                      <span key={t.id} style={{
                        fontSize:9,padding:"3px 9px",borderRadius:100,
                        background:et.color+"18",color:et.color,
                        border:`1px solid ${et.color}25`,fontWeight:600,
                      }}>{t.name}</span>
                    ))}
                  </div>
                </div>
                <div style={{flexShrink:0}}>
                  <div style={{
                    width:34,height:34,borderRadius:10,
                    background:et.color,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:16,fontWeight:900,color:"#fff",
                    boxShadow:`0 4px 16px ${et.color}50`,
                  }}>→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ BOTTOM CTA SECTION ══════════ */}
      <div style={{
        position:"relative",zIndex:1,
        maxWidth:1320,margin:"0 auto",
        padding:isMobile?"40px 16px 20px":"64px 48px 40px",
        textAlign:"center",
      }}>
        <div style={{
          background:"linear-gradient(135deg,rgba(255,106,0,0.1),rgba(255,154,0,0.06),rgba(29,78,216,0.08))",
          border:"1px solid rgba(255,106,0,0.2)",
          borderRadius:28,
          padding:isMobile?"32px 20px":"56px 48px",
          position:"relative",overflow:"hidden",
          animation:"raCardIn .7s ease both",
        }}>
          {/* Glow */}
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,106,0,0.12),transparent 70%)",pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <div style={{fontSize:isMobile?28:42,fontWeight:900,color:"#fff",marginBottom:14,letterSpacing:"-1px",lineHeight:1.1}}>
              Ready to start your<br/><span style={{color:"#FF6A00"}}>exam preparation?</span>
            </div>
            <p style={{fontSize:15,color:"rgba(255,255,255,0.4)",marginBottom:32,maxWidth:480,margin:"0 auto 32px",lineHeight:1.6}}>
              Free forever · No registration required · Google login in one click
            </p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>setPage(user?"tests":"auth")} style={{
                padding:"16px 36px",borderRadius:16,border:"none",
                background:"linear-gradient(135deg,#FF6A00,#ff9a00)",
                color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",
                boxShadow:"0 8px 32px rgba(255,106,0,0.5)",
                transition:"all .3s",letterSpacing:"-0.2px",
              }}
              onMouseOver={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(255,106,0,0.55)";}}
              onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 32px rgba(255,106,0,0.5)";}}>
                {user?"Start Practicing →":"Get Started Free →"}
              </button>
              <button onClick={()=>setPage("leaderboard")} style={{
                padding:"16px 28px",borderRadius:16,
                border:"1.5px solid rgba(255,255,255,0.15)",
                background:"rgba(255,255,255,0.06)",
                color:"rgba(255,255,255,0.7)",fontSize:15,fontWeight:600,cursor:"pointer",
                transition:"all .3s",
              }}
              onMouseOver={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";e.currentTarget.style.color="#fff";}}
              onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.color="rgba(255,255,255,0.7)";}}>
                🏆 View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

'''

content = content[:home_start] + NEW_HOME + content[home_end:]
print("✅ 2. HomePage fully replaced with premium design")

with open("src/App.jsx", "w") as f:
    f.write(content)

print("\n" + "="*60)
print("✅ Home page redesign complete!")
print("="*60)
print("\nRun:")
print("  npm run build && git add -A && git commit -m 'Design: stunning home page redesign' && git push")
