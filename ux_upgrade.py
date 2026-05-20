#!/usr/bin/env python3
"""
Rank Achievers — UX Upgrade
1. Dashboard: score history, topic accuracy, streak counter
2. Loading skeleton + branded splash screen
Run from: ~/Downloads/rankachievers/
python3 ux_upgrade.py
"""

with open("src/App.jsx", "r") as f:
    c = f.read()

# ═══════════════════════════════════════════════════════════════
# 1. BRANDED LOADING SPLASH (index.html)
# ═══════════════════════════════════════════════════════════════
with open("index.html", "r") as f:
    html = f.read()

old_root = '    <div id="root" id="main-content">'
new_root = '''    <div id="root" id="main-content"></div>

    <!-- Branded splash — removed by React after hydration -->
    <div id="ra-splash" style="position:fixed;inset:0;background:#060608;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity .4s ease">
      <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
        <!-- Logo -->
        <div style="width:72px;height:72px;background:linear-gradient(135deg,#FF6A00,#ff9a00);border-radius:20px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:28px;box-shadow:0 8px 32px rgba(255,106,0,0.5);letter-spacing:-1px;font-family:'Segoe UI',sans-serif">RA</div>
        <div style="text-align:center">
          <div style="font-weight:800;font-size:20px;color:#fff;font-family:'Segoe UI',sans-serif;letter-spacing:-0.3px">Rank Achievers</div>
          <div style="font-size:11px;color:#FF6A00;font-weight:700;letter-spacing:0.18em;margin-top:4px;font-family:'Segoe UI',sans-serif">ACADEMY · ANANTAPUR</div>
        </div>
        <!-- Spinner -->
        <div style="width:36px;height:36px;border:3px solid rgba(255,106,0,0.2);border-top:3px solid #FF6A00;border-radius:50%;animation:splashSpin .7s linear infinite"/>
        <div style="font-size:12px;color:rgba(255,255,255,0.3);font-family:'Segoe UI',sans-serif">Loading your practice platform...</div>
      </div>
      <style>@keyframes splashSpin{to{transform:rotate(360deg)}}</style>
    </div>
    <script>
      // Remove splash after React mounts
      window.__removeSplash = function(){
        var s = document.getElementById('ra-splash');
        if(s){ s.style.opacity='0'; setTimeout(function(){ s.remove(); }, 450); }
      };
    </script>
    <!-- placeholder (real root moved above) -->
    <div style="display:none">'''

if old_root in html:
    html = html.replace(old_root, new_root)
    # Close the hidden div
    html = html.replace('    <script type="module" src="/src/main.jsx"></script>', '    </div>\n    <script type="module" src="/src/main.jsx"></script>')
    with open("index.html", "w") as f:
        f.write(html)
    print("✅ 1. Branded splash screen added to index.html")
else:
    print("⚠️ 1. index.html root not found")

# ═══════════════════════════════════════════════════════════════
# 2. CALL removeSplash after App mounts
# ═══════════════════════════════════════════════════════════════
old_app_effect = "  // ── Dynamic page titles for SEO ──\n  useEffect(()=>{"
new_app_effect = """  // ── Remove splash screen after mount ──
  useEffect(()=>{
    if(window.__removeSplash) window.__removeSplash();
  },[]);

  // ── Dynamic page titles for SEO ──
  useEffect(()=>{"""

if old_app_effect in c:
    c = c.replace(old_app_effect, new_app_effect)
    print("✅ 2. Splash removal on mount added")

# ═══════════════════════════════════════════════════════════════
# 3. ADD SKELETON LOADER CSS
# ═══════════════════════════════════════════════════════════════
old_css_end = "  /* ══ ADMIN DARK OVERRIDES ══ */"
new_css_end = """  /* ══ SKELETON LOADERS ══ */
  .ra-skeleton {
    background: linear-gradient(90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.09) 50%,
      rgba(255,255,255,0.04) 75%
    );
    background-size: 200% 100%;
    animation: raShimmer 1.6s infinite;
    border-radius: 8px;
  }
  .ra-skeleton-card {
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 18px;
  }
  .ra-skeleton-text { height: 14px; margin: 6px 0; }
  .ra-skeleton-title { height: 20px; margin: 0 0 10px; width: 60%; }
  .ra-skeleton-avatar { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; }
  .ra-skeleton-btn { height: 38px; border-radius: 10px; margin-top: 12px; }

  /* ══ ADMIN DARK OVERRIDES ══ */"""

if old_css_end in c:
    c = c.replace(old_css_end, new_css_end)
    print("✅ 3. Skeleton CSS added")

# ═══════════════════════════════════════════════════════════════
# 4. UPGRADE DashboardPage with streak + topic accuracy + history
# ═══════════════════════════════════════════════════════════════
old_dash_start = "// ─── DASHBOARD ────────────────────────────────────────────────────────────────\nfunction DashboardPage({user,setPage}){"
old_dash_end   = "\n// ─── LEADERBOARD"

dash_start = c.find(old_dash_start)
dash_end   = c.find("\n// ─── LEADERBOARD", dash_start)

NEW_DASHBOARD = """// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage({user,setPage}){
  const [attempts, setAttempts]   = useState([]);
  const [loading,  setLoading]    = useState(true);
  const isMobile = useMobile();

  useEffect(()=>{
    if(!user?.uid) return;
    const q = query(
      collection(db,"attempts"),
      where("userId","==",user.uid),
      orderBy("createdAt","desc"),
      limit(50)
    );
    const unsub = onSnapshot(q, snap=>{
      setAttempts(snap.docs.map(d=>({id:d.id,...d.data()})));
      setLoading(false);
    });
    return unsub;
  },[user]);

  // ── Computed stats ──
  const totalTests   = attempts.length;
  const totalQ       = attempts.reduce((s,a)=>s+(a.total||0),0);
  const totalCorrect = attempts.reduce((s,a)=>s+(a.score||0),0);
  const avgAccuracy  = totalQ>0 ? Math.round((totalCorrect/totalQ)*100) : 0;
  const avgScore     = totalTests>0 ? Math.round(attempts.reduce((s,a)=>s+(a.accuracy||0),0)/totalTests) : 0;
  const bestScore    = attempts.length>0 ? Math.max(...attempts.map(a=>a.accuracy||0)) : 0;

  // ── Streak calculation ──
  const streak = useMemo(()=>{
    if(!attempts.length) return 0;
    const days = new Set(attempts.map(a=>{
      const d = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      return d.toDateString();
    }));
    let count = 0;
    const today = new Date();
    for(let i=0;i<365;i++){
      const d = new Date(today);
      d.setDate(d.getDate()-i);
      if(days.has(d.toDateString())) count++;
      else if(i>0) break;
    }
    return count;
  },[attempts]);

  // ── Topic-wise accuracy ──
  const topicStats = useMemo(()=>{
    const map = {};
    attempts.forEach(a=>{
      const key = a.topicName||a.topicId||"Unknown";
      const exam = a.examType||"ssc";
      if(!map[key]) map[key]={name:key,exam,correct:0,total:0,tests:0};
      map[key].correct += a.score||0;
      map[key].total   += a.total||0;
      map[key].tests   += 1;
    });
    return Object.values(map)
      .map(t=>({...t,accuracy:t.total>0?Math.round((t.correct/t.total)*100):0}))
      .sort((a,b)=>b.tests-a.tests)
      .slice(0,8);
  },[attempts]);

  // ── Exam-wise breakdown ──
  const examStats = useMemo(()=>{
    const map = {};
    attempts.forEach(a=>{
      const k = a.examType||"ssc";
      if(!map[k]) map[k]={id:k,tests:0,correct:0,total:0};
      map[k].tests   += 1;
      map[k].correct += a.score||0;
      map[k].total   += a.total||0;
    });
    return Object.values(map).map(e=>({
      ...e,
      accuracy:e.total>0?Math.round((e.correct/e.total)*100):0,
      et:EXAM_TYPES.find(x=>x.id===e.id)||EXAM_TYPES[0],
    }));
  },[attempts]);

  // ── Recent 7 days activity ──
  const weekActivity = useMemo(()=>{
    const days = [];
    for(let i=6;i>=0;i--){
      const d = new Date();
      d.setDate(d.getDate()-i);
      const key = d.toDateString();
      const dayAttempts = attempts.filter(a=>{
        const ad = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt||0);
        return ad.toDateString()===key;
      });
      days.push({
        label:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()],
        count:dayAttempts.length,
        accuracy:dayAttempts.length>0?Math.round(dayAttempts.reduce((s,a)=>s+(a.accuracy||0),0)/dayAttempts.length):0,
        isToday:i===0,
      });
    }
    return days;
  },[attempts]);

  if(loading) return(
    <div style={{minHeight:"100vh",background:"#060608",paddingTop:74,padding:isMobile?"74px 14px 100px":"74px 36px 60px"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        {/* Skeleton */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:24}}>
          {[1,2,3,4].map(i=>(
            <div key={i} className="ra-skeleton-card">
              <div className="ra-skeleton ra-skeleton-title"/>
              <div className="ra-skeleton ra-skeleton-text" style={{width:"40%"}}/>
            </div>
          ))}
        </div>
        <div className="ra-skeleton-card" style={{height:200,marginBottom:16}}><div className="ra-skeleton" style={{height:"100%"}}/></div>
        <div className="ra-skeleton-card" style={{height:280}}><div className="ra-skeleton" style={{height:"100%"}}/></div>
      </div>
    </div>
  );

  if(!user) return(
    <div style={{minHeight:"100vh",background:"#060608",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:16}}>🔐</div>
        <div style={{color:"#fff",fontWeight:700,fontSize:18,marginBottom:8}}>Login to see your progress</div>
        <button onClick={()=>setPage("auth")} style={{padding:"12px 28px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer"}}>Login →</button>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#060608",paddingTop:64,padding:isMobile?"68px 14px 100px":"74px 36px 60px"}} className={isMobile?"ra-mobile-pb":""}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>

        {/* ── Header ── */}
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28,animation:"raFadeUp .4s ease both"}}>
          <div style={{width:52,height:52,borderRadius:16,background:"linear-gradient(135deg,rgba(255,106,0,0.2),rgba(255,106,0,0.1))",border:"1.5px solid rgba(255,106,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>📊</div>
          <div>
            <h1 style={{fontSize:isMobile?20:26,fontWeight:900,color:"#fff",margin:0,letterSpacing:"-0.5px"}}>My Progress</h1>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:2}}>{user.name||user.email} · {totalTests} tests completed</div>
          </div>
          {streak>0&&(
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,padding:"10px 16px",borderRadius:14,background:"linear-gradient(135deg,rgba(255,106,0,0.15),rgba(255,154,0,0.1))",border:"1px solid rgba(255,106,0,0.25)"}}>
              <span style={{fontSize:24,animation:"firePulse 1.5s ease-in-out infinite"}}>🔥</span>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:900,color:"#FF6A00",lineHeight:1}}>{streak}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",fontWeight:600}}>day streak</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Stat cards ── */}
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:12,marginBottom:24,animation:"raFadeUp .4s ease .05s both"}}>
          {[
            {icon:"📝",label:"Tests Done",value:totalTests,color:"#FF6A00"},
            {icon:"🎯",label:"Avg Accuracy",value:`${avgScore}%`,color:"#22c55e"},
            {icon:"⭐",label:"Best Score",value:`${bestScore}%`,color:"#f59e0b"},
            {icon:"❓",label:"Questions",value:totalQ,color:"#3b82f6"},
          ].map((s,i)=>(
            <div key={s.label} style={{
              borderRadius:16,padding:"16px 18px",
              background:"rgba(255,255,255,0.03)",
              border:`1px solid ${s.color}25`,
              animation:`raFadeUp .4s ease ${i*0.06}s both`,
              transition:"all .3s ease",
            }}
            onMouseOver={e=>{e.currentTarget.style.background=`${s.color}10`;e.currentTarget.style.borderColor=`${s.color}40`;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor=`${s.color}25`;e.currentTarget.style.transform="none";}}>
              <div style={{fontSize:22,marginBottom:8}}>{s.icon}</div>
              <div style={{fontSize:isMobile?22:28,fontWeight:900,color:s.color,letterSpacing:"-0.5px",lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:4,fontWeight:500}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Weekly Activity ── */}
        <div style={{
          borderRadius:20,padding:"20px 22px",
          background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.07)",
          marginBottom:16,
          animation:"raFadeUp .4s ease .1s both",
        }}>
          <div style={{fontWeight:800,fontSize:15,color:"#fff",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
            <span>📅</span> Weekly Activity
            <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500,marginLeft:4}}>Last 7 days</span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"flex-end",height:80}}>
            {weekActivity.map((d,i)=>{
              const maxH = 64;
              const h = d.count>0 ? Math.max(12, Math.min(maxH, d.count*16)) : 4;
              return(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{
                    width:"100%",height:h,
                    borderRadius:6,
                    background:d.count>0
                      ?(d.isToday?"linear-gradient(180deg,#FF6A00,#ff9a00)":"rgba(255,106,0,0.5)")
                      :"rgba(255,255,255,0.06)",
                    transition:"height .5s ease",
                    position:"relative",
                    title:`${d.count} tests`,
                  }}>
                    {d.count>0&&<div style={{position:"absolute",top:-20,left:"50%",transform:"translateX(-50%)",fontSize:10,fontWeight:700,color:"#FF6A00",whiteSpace:"nowrap"}}>{d.count}</div>}
                  </div>
                  <div style={{fontSize:10,color:d.isToday?"#FF6A00":"rgba(255,255,255,0.35)",fontWeight:d.isToday?700:500}}>{d.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Exam-wise breakdown ── */}
        {examStats.length>0&&(
          <div style={{
            borderRadius:20,padding:"20px 22px",
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.07)",
            marginBottom:16,
            animation:"raFadeUp .4s ease .15s both",
          }}>
            <div style={{fontWeight:800,fontSize:15,color:"#fff",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
              <span>🏆</span> Exam-wise Performance
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {examStats.map(e=>(
                <div key={e.id}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:16}}>{e.et.icon}</span>
                      <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{e.et.label}</span>
                      <span style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{e.tests} tests</span>
                    </div>
                    <span style={{fontSize:13,fontWeight:800,color:e.accuracy>=70?"#22c55e":e.accuracy>=50?"#f59e0b":"#ef4444"}}>{e.accuracy}%</span>
                  </div>
                  <div style={{height:8,borderRadius:4,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
                    <div style={{
                      height:"100%",
                      width:`${e.accuracy}%`,
                      borderRadius:4,
                      background:e.accuracy>=70?"linear-gradient(90deg,#22c55e,#16a34a)":e.accuracy>=50?"linear-gradient(90deg,#f59e0b,#d97706)":"linear-gradient(90deg,#ef4444,#dc2626)",
                      transition:"width 1s ease",
                    }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Topic-wise accuracy ── */}
        {topicStats.length>0&&(
          <div style={{
            borderRadius:20,padding:"20px 22px",
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.07)",
            marginBottom:16,
            animation:"raFadeUp .4s ease .2s both",
          }}>
            <div style={{fontWeight:800,fontSize:15,color:"#fff",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
              <span>📚</span> Topic-wise Accuracy
              <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500}}>Top {topicStats.length} topics</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {topicStats.map((t,i)=>{
                const et = EXAM_TYPES.find(e=>e.id===t.exam)||EXAM_TYPES[0];
                const col = t.accuracy>=70?"#22c55e":t.accuracy>=50?"#f59e0b":"#ef4444";
                return(
                  <div key={t.name} style={{animation:`raFadeUp .4s ease ${i*0.04}s both`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
                        <span style={{fontSize:12,color:et.color,fontWeight:700,flexShrink:0}}>{et.icon}</span>
                        <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.8)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</span>
                        <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",flexShrink:0}}>{t.tests}×</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                        <span style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{t.correct}/{t.total}</span>
                        <span style={{fontSize:12,fontWeight:800,color:col,minWidth:36,textAlign:"right"}}>{t.accuracy}%</span>
                      </div>
                    </div>
                    <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
                      <div style={{
                        height:"100%",width:`${t.accuracy}%`,borderRadius:3,
                        background:`linear-gradient(90deg,${col},${col}99)`,
                        transition:"width 1s ease",
                      }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Recent attempts ── */}
        <div style={{
          borderRadius:20,padding:"20px 22px",
          background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.07)",
          animation:"raFadeUp .4s ease .25s both",
        }}>
          <div style={{fontWeight:800,fontSize:15,color:"#fff",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
            <span>🕐</span> Recent Tests
          </div>
          {attempts.length===0?(
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:44,marginBottom:12}}>📝</div>
              <div style={{fontWeight:700,fontSize:16,color:"rgba(255,255,255,0.5)",marginBottom:8}}>No tests yet</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.3)",marginBottom:20}}>Start a practice test to see your progress here</div>
              <button onClick={()=>setPage("tests")} style={{padding:"11px 24px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>Start Practicing →</button>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {attempts.slice(0,10).map((a,i)=>{
                const et = EXAM_TYPES.find(e=>e.id===a.examType)||EXAM_TYPES[0];
                const acc = a.accuracy||Math.round(((a.score||0)/(a.total||30))*100);
                const col = acc>=70?"#22c55e":acc>=50?"#f59e0b":"#ef4444";
                const date = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt||0);
                const dateStr = date.toLocaleDateString("en-IN",{day:"numeric",month:"short"});
                return(
                  <div key={a.id} style={{
                    display:"flex",alignItems:"center",gap:12,
                    padding:"12px 14px",borderRadius:12,
                    background:"rgba(255,255,255,0.03)",
                    border:"1px solid rgba(255,255,255,0.06)",
                    transition:"all .2s",
                    animation:`raFadeUp .3s ease ${i*0.04}s both`,
                  }}
                  onMouseOver={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}
                  onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";}}>
                    {/* Exam icon */}
                    <div style={{width:36,height:36,borderRadius:10,flexShrink:0,background:et.color+"18",border:`1px solid ${et.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{et.icon}</div>
                    {/* Info */}
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:13,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.topicName||a.testTitle||"Practice Test"}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:2}}>
                        {et.label} · {a.timed?"⏱️ Timed":"🧘 Practice"} · {dateStr}
                      </div>
                    </div>
                    {/* Score */}
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:16,fontWeight:900,color:col}}>{acc}%</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{a.score||0}/{a.total||30}</div>
                    </div>
                    {/* Difficulty badge */}
                    <div style={{
                      padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:700,flexShrink:0,
                      background:a.difficulty==="hard"?"rgba(239,68,68,0.15)":a.difficulty==="medium"?"rgba(245,158,11,0.15)":"rgba(34,197,94,0.15)",
                      color:a.difficulty==="hard"?"#ef4444":a.difficulty==="medium"?"#f59e0b":"#22c55e",
                    }}>{(a.difficulty||"easy").toUpperCase()}</div>
                  </div>
                );
              })}
              {attempts.length>10&&(
                <div style={{textAlign:"center",padding:"8px 0",fontSize:12,color:"rgba(255,255,255,0.3)"}}>
                  Showing 10 of {attempts.length} attempts
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

"""

if dash_start > 0 and dash_end > 0:
    c = c[:dash_start] + NEW_DASHBOARD + c[dash_end:]
    print("✅ 4. DashboardPage fully upgraded")
else:
    print(f"⚠️ Dashboard not found: start={dash_start}, end={dash_end}")

# ═══════════════════════════════════════════════════════════════
# 5. ADD useMemo import
# ═══════════════════════════════════════════════════════════════
if "useMemo" not in c:
    c = c.replace(
        'import { useState, useEffect, useRef, useCallback, createPortal } from "react";',
        'import { useState, useEffect, useRef, useCallback, createPortal, useMemo } from "react";'
    )
    print("✅ 5. useMemo imported")
else:
    print("✅ 5. useMemo already imported")

with open("src/App.jsx", "w") as f:
    f.write(c)

print("""
✅ UX UPGRADE COMPLETE!

Run:
  npm run build && git add -A && git commit -m "UX: dashboard progress + streak + skeleton + splash" && git push
""")
