#!/usr/bin/env python3
"""
Rank Achievers — Separate Tests & Notes pages with own navbars
Run from: ~/Downloads/rankachievers/
python3 restructure_notes.py
"""

with open("src/App.jsx", "r") as f:
    c = f.read()

# ═══════════════════════════════════════════════════════════════
# 1. ADD NotesPage as a separate full page component
# ═══════════════════════════════════════════════════════════════

# Insert NotesPage before TestsPage (find the marker)
NOTES_PAGE = '''// ─── NOTES PAGE ──────────────────────────────────────────────────────────────
function NotesPage({user, examType, setExamType, examTypes}){
  const [localExam, setLocalExam]     = useState(examType||"ssc");
  const [selTopic,  setSelTopic]      = useState(null);   // which topic is open
  const [notes,     setNotes]         = useState(null);   // loaded notes content
  const [loading,   setLoading]       = useState(false);
  const [notesMap,  setNotesMap]      = useState({});     // {key: true} for topics that have notes
  const isMobile = useMobile();
  const ETs = examTypes||EXAM_TYPES;
  const et  = ETs.find(e=>e.id===localExam)||ETs[0];

  // Sync with parent examType
  useEffect(()=>{
    if(examType && examType!==localExam) setLocalExam(examType);
  },[examType]);

  // When exam changes — check which topics have notes & clear selection
  useEffect(()=>{
    setSelTopic(null);
    setNotes(null);
    const check = async()=>{
      const map = {};
      for(const t of (et.topics||[])){
        try{
          const d = await getDoc(doc(db,"notes",`${localExam}_${t.id}`));
          if(d.exists()) map[t.id] = true;
        }catch(e){}
      }
      setNotesMap(map);
    };
    check();
  },[localExam]);

  // Load notes when topic selected
  useEffect(()=>{
    if(!selTopic) return;
    setLoading(true);
    setNotes(null);
    getDoc(doc(db,"notes",`${localExam}_${selTopic.id}`))
      .then(d=>{ if(d.exists()) setNotes(d.data()); else setNotes(null); })
      .catch(()=>setNotes(null))
      .finally(()=>setLoading(false));
  },[selTopic, localExam]);

  const switchExam = (id)=>{
    setLocalExam(id);
    setExamType(id);
    setSelTopic(null);
    setNotes(null);
  };

  return(
    <div style={{
      minHeight:"100vh",
      background:"#060608",
      paddingTop:64,
    }} className={isMobile?"ra-mobile-pb":""}>

      {/* ── Notes Navbar ── */}
      <div style={{
        position:"sticky",top:64,zIndex:100,
        background:"rgba(6,6,8,0.92)",
        backdropFilter:"blur(20px)",
        WebkitBackdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        padding:isMobile?"10px 14px":"12px 36px",
      }}>
        {/* Exam type tabs */}
        <div style={{
          display:"flex",gap:6,flexWrap:"wrap",
          maxWidth:1100,margin:"0 auto",
          alignItems:"center",
        }}>
          <span style={{
            fontSize:10,fontWeight:700,
            color:"rgba(255,255,255,0.3)",
            letterSpacing:"0.15em",
            marginRight:6,
            flexShrink:0,
          }}>📖 NOTES</span>
          {ETs.filter(e=>e.visible!==false).map(e=>(
            <button key={e.id} onClick={()=>switchExam(e.id)} style={{
              padding:isMobile?"7px 12px":"8px 18px",
              borderRadius:10,fontWeight:700,
              fontSize:isMobile?11:12,cursor:"pointer",
              transition:"all .2s",border:"1.5px solid",
              borderColor:localExam===e.id?e.color:"rgba(255,255,255,0.08)",
              background:localExam===e.id?e.color+"20":"transparent",
              color:localExam===e.id?e.color:"rgba(255,255,255,0.45)",
              boxShadow:localExam===e.id?`0 4px 14px ${e.color}25`:"none",
            }}>
              {e.icon} {e.label}
            </button>
          ))}
        </div>

        {/* Topic sub-navbar — only when exam selected */}
        {selTopic&&(
          <div style={{
            display:"flex",gap:6,flexWrap:"wrap",
            maxWidth:1100,margin:"8px auto 0",
            paddingTop:8,
            borderTop:"1px solid rgba(255,255,255,0.05)",
            alignItems:"center",
          }}>
            <button onClick={()=>{setSelTopic(null);setNotes(null);}} style={{
              padding:"5px 12px",borderRadius:20,fontSize:11,fontWeight:600,
              cursor:"pointer",transition:"all .2s",
              border:"1px solid rgba(255,255,255,0.1)",
              background:"rgba(255,255,255,0.06)",
              color:"rgba(255,255,255,0.5)",
              display:"flex",alignItems:"center",gap:5,
            }}>← All Topics</button>
            <span style={{color:"rgba(255,255,255,0.2)",fontSize:12}}>›</span>
            <span style={{
              padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:700,
              background:et.color+"20",color:et.color,
              border:`1px solid ${et.color}30`,
            }}>{selTopic.icon||et.icon} {selTopic.name}</span>
          </div>
        )}
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:isMobile?"20px 14px":"28px 36px"}}>

        {/* ── Topic list view ── */}
        {!selTopic&&(
          <div>
            {/* Header */}
            <div style={{marginBottom:24,animation:"raFadeUp .4s ease both"}}>
              <h1 style={{
                fontSize:isMobile?22:28,fontWeight:900,color:"#fff",
                margin:"0 0 6px",letterSpacing:"-0.5px",
              }}>
                <span style={{color:et.color}}>{et.icon} {et.label}</span> Study Notes
              </h1>
              <p style={{color:"rgba(255,255,255,0.35)",fontSize:13,margin:0}}>
                {et.fullName} · Click a topic to read its notes
              </p>
            </div>

            {/* Topics grid */}
            <div style={{
              display:"grid",
              gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(220px,1fr))",
              gap:12,
            }}>
              {(et.topics||[]).map((t,idx)=>{
                const hasNotes = notesMap[t.id];
                return(
                  <div key={t.id}
                    onClick={()=>{ if(hasNotes) setSelTopic(t); }}
                    style={{
                      borderRadius:18,padding:20,
                      background:hasNotes?"rgba(255,106,0,0.05)":"rgba(255,255,255,0.02)",
                      border:`1.5px solid ${hasNotes?"rgba(255,106,0,0.2)":"rgba(255,255,255,0.06)"}`,
                      cursor:hasNotes?"pointer":"default",
                      transition:"all .3s cubic-bezier(.4,0,.2,1)",
                      animation:`raFadeUp .4s ease ${idx*0.05}s both`,
                      position:"relative",overflow:"hidden",
                    }}
                    onMouseOver={e=>{if(hasNotes){
                      e.currentTarget.style.transform="translateY(-4px)";
                      e.currentTarget.style.borderColor=et.color+"50";
                      e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,0.4)`;
                      e.currentTarget.style.background=`rgba(255,106,0,0.09)`;
                    }}}
                    onMouseOut={e=>{
                      e.currentTarget.style.transform="none";
                      e.currentTarget.style.borderColor=hasNotes?"rgba(255,106,0,0.2)":"rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow="none";
                      e.currentTarget.style.background=hasNotes?"rgba(255,106,0,0.05)":"rgba(255,255,255,0.02)";
                    }}
                  >
                    {/* Top accent line */}
                    {hasNotes&&<div style={{
                      position:"absolute",top:0,left:0,right:0,height:2,
                      background:`linear-gradient(90deg,transparent,${et.color},transparent)`,
                    }}/>}

                    {/* Icon + name */}
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                      <div style={{
                        width:48,height:48,borderRadius:14,flexShrink:0,
                        background:hasNotes?et.color+"20":et.color+"0a",
                        border:`1.5px solid ${hasNotes?et.color+"35":et.color+"15"}`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:24,
                        boxShadow:hasNotes?`0 4px 16px ${et.color}20`:"none",
                      }}>{t.icon||et.icon}</div>
                      <div style={{flex:1}}>
                        <div style={{
                          fontWeight:800,fontSize:15,
                          color:hasNotes?"#fff":"rgba(255,255,255,0.4)",
                          marginBottom:3,letterSpacing:"-0.2px",
                        }}>{t.name}</div>
                        <div style={{fontSize:10,color:et.color,fontWeight:600,opacity:hasNotes?1:0.5}}>
                          {et.label}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div style={{
                      padding:"8px 14px",borderRadius:10,textAlign:"center",
                      background:hasNotes?"rgba(34,197,94,0.08)":"rgba(255,255,255,0.03)",
                      border:`1px solid ${hasNotes?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.05)"}`,
                    }}>
                      {hasNotes?(
                        <span style={{fontSize:12,fontWeight:700,color:"#22c55e",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                          <span>📖</span> Read Notes →
                        </span>
                      ):(
                        <span style={{fontSize:11,color:"rgba(255,255,255,0.2)",fontWeight:500}}>
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty state */}
            {(et.topics||[]).filter(t=>notesMap[t.id]).length===0&&(
              <div style={{
                textAlign:"center",padding:"60px 20px",
                animation:"raFadeUp .5s ease .2s both",
              }}>
                <div style={{fontSize:56,marginBottom:16}}>📚</div>
                <div style={{fontWeight:800,fontSize:18,color:"rgba(255,255,255,0.5)",marginBottom:8}}>
                  No notes added yet
                </div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.25)"}}>
                  {et.label} notes are being prepared.<br/>Check back soon!
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Notes content view ── */}
        {selTopic&&(
          <div style={{animation:"raFadeUp .3s ease both"}}>

            {/* Topic header */}
            <div style={{
              display:"flex",alignItems:"center",gap:16,
              marginBottom:28,
              padding:"20px 24px",
              borderRadius:18,
              background:`linear-gradient(135deg,${et.color}12,${et.color}05)`,
              border:`1px solid ${et.color}20`,
            }}>
              <div style={{
                width:56,height:56,borderRadius:16,flexShrink:0,
                background:`linear-gradient(135deg,${et.color}30,${et.color}15)`,
                border:`1.5px solid ${et.color}35`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:28,
                boxShadow:`0 8px 24px ${et.color}25`,
              }}>{selTopic.icon||et.icon}</div>
              <div>
                <div style={{fontWeight:900,fontSize:isMobile?18:22,color:"#fff",letterSpacing:"-0.5px",marginBottom:4}}>
                  {selTopic.name}
                </div>
                <div style={{fontSize:12,color:et.color,fontWeight:600}}>
                  {et.icon} {et.label} · Study Notes
                  {notes&&<span style={{color:"rgba(255,255,255,0.3)",marginLeft:10}}>· {notes.wordCount||0} words</span>}
                </div>
              </div>
            </div>

            {/* Notes content */}
            {loading?(
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:300,gap:14,flexDirection:"column"}}>
                <div style={{width:36,height:36,border:"3px solid rgba(255,106,0,0.2)",borderTop:"3px solid #FF6A00",borderRadius:"50%",animation:"raSpin .7s linear infinite"}}/>
                <span style={{color:"rgba(255,255,255,0.4)",fontSize:14}}>Loading notes...</span>
              </div>
            ):!notes?(
              <div style={{textAlign:"center",padding:"60px 20px"}}>
                <div style={{fontSize:52,marginBottom:16}}>📭</div>
                <div style={{fontWeight:800,fontSize:18,color:"rgba(255,255,255,0.5)",marginBottom:8}}>No notes yet</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.3)"}}>
                  Notes for {selTopic.name} haven&apos;t been added yet.
                </div>
              </div>
            ):(
              <div style={{
                background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:20,
                padding:isMobile?"20px":"36px 40px",
              }}>
                <div
                  className="ra-notes-view"
                  dangerouslySetInnerHTML={{__html: notes.content}}
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

'''

# Insert NotesPage before TestsPage
marker = "// ─── TESTS PAGE ───────────────────────────────────────────────────────────────"
if marker in c:
    c = c.replace(marker, NOTES_PAGE + marker)
    print("✅ 1. NotesPage component added")
else:
    print("⚠️  marker not found")

# ═══════════════════════════════════════════════════════════════
# 2. ADD notes page to App routing
# ═══════════════════════════════════════════════════════════════

old_tests_render = '      {page==="tests"     && <TestsPage   user={fbUser} onStartTest={handleStartTest} examType={examType} setExamType={setExamType} examTypes={examTypes} setPage={setPage}/>}'

new_tests_render = '''      {page==="tests"     && <TestsPage   user={fbUser} onStartTest={handleStartTest} examType={examType} setExamType={setExamType} examTypes={examTypes} setPage={setPage}/>}
      {page==="notes"     && <NotesPage    user={fbUser} examType={examType} setExamType={setExamType} examTypes={examTypes}/>}'''

if old_tests_render in c:
    c = c.replace(old_tests_render, new_tests_render)
    print("✅ 2. NotesPage route added to App")
else:
    print("⚠️  tests render not found")

# ═══════════════════════════════════════════════════════════════
# 3. ADD Notes to NavBar desktop + mobile bottom nav
# ═══════════════════════════════════════════════════════════════

# Desktop nav — add Notes link
old_nav_links = '''            {[
              {p:"home",l:"Home"},
              {p:"tests",l:"Tests",requireAuth:true},
              {p:"leaderboard",l:"Leaderboard"},
              ...(user?[{p:"dashboard",l:"Dashboard"}]:[]),
            ].map(item=>(
              <button key={item.p} onClick={()=>{if(item.requireAuth&&!user){setPage("auth");return;}setPage(item.p);}}'''

new_nav_links = '''            {[
              {p:"home",l:"Home"},
              {p:"tests",l:"Tests",requireAuth:true},
              {p:"notes",l:"📖 Notes",requireAuth:true},
              {p:"leaderboard",l:"Leaderboard"},
              ...(user?[{p:"dashboard",l:"Dashboard"}]:[]),
            ].map(item=>(
              <button key={item.p} onClick={()=>{if(item.requireAuth&&!user){setPage("auth");return;}setPage(item.p);}}'''

if old_nav_links in c:
    c = c.replace(old_nav_links, new_nav_links)
    print("✅ 3a. Notes added to desktop navbar")

# Mobile bottom nav — replace Progress with Notes
old_bnav = '''            {p:"home",icon:"🏠",label:"Home"},
            {p:"tests",icon:"📝",label:"Tests",requireAuth:true},
            {p:"leaderboard",icon:"🏆",label:"Board"},
            ...(user?[{p:"dashboard",icon:"📊",label:"Progress"}]:[{p:"auth",icon:"🔑",label:"Login"}]),
            ...(user?[{p:"profile",icon:"👤",label:"Profile"}]:[]),'''

new_bnav = '''            {p:"home",icon:"🏠",label:"Home"},
            {p:"tests",icon:"📝",label:"Tests",requireAuth:true},
            {p:"notes",icon:"📖",label:"Notes",requireAuth:true},
            {p:"leaderboard",icon:"🏆",label:"Board"},
            ...(user?[{p:"dashboard",icon:"📊",label:"Progress"}]:[{p:"auth",icon:"🔑",label:"Login"}]),
            ...(user?[{p:"profile",icon:"👤",label:"Profile"}]:[]),'''

if old_bnav in c:
    c = c.replace(old_bnav, new_bnav)
    print("✅ 3b. Notes added to mobile bottom nav")

# ═══════════════════════════════════════════════════════════════
# 4. REMOVE the mode toggle from TestsPage (clean up)
# ═══════════════════════════════════════════════════════════════

# Remove the Exams/Notes toggle buttons from TestsPage
old_toggle = '''        {/* ── Mode Toggle: Exams / Notes ── */}
        <div style={{display:"flex",gap:10,marginBottom:24,padding:"6px",background:"rgba(255,255,255,0.04)",borderRadius:16,border:"1px solid rgba(255,255,255,0.08)",width:"fit-content"}}>
          {[
            {id:"exams", icon:"📝", label:"Practice Tests"},
            {id:"notes", icon:"📖", label:"Study Notes"},
          ].map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)} style={{
              padding:"10px 24px",borderRadius:12,border:"none",
              fontWeight:700,fontSize:14,cursor:"pointer",
              transition:"all .25s cubic-bezier(.4,0,.2,1)",
              background:mode===m.id?"linear-gradient(135deg,#FF6A00,#ff9a00)":"transparent",
              color:mode===m.id?"#fff":"rgba(255,255,255,0.45)",
              boxShadow:mode===m.id?"0 4px 16px rgba(255,106,0,0.4)":"none",
              display:"flex",alignItems:"center",gap:8,
            }}>
              <span style={{fontSize:16}}>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        {/* ── Exam type selector (shared for both modes) ── */}'''

new_toggle = '''        {/* ── Exam type selector ── */}'''

if old_toggle in c:
    c = c.replace(old_toggle, new_toggle)
    print("✅ 4. Mode toggle removed from TestsPage")

# Remove notes mode section from TestsPage
old_notes_section = '''        {/* ══════════ NOTES MODE ══════════ */}
        {mode==="notes"&&(
          <div>
            <div style={{marginBottom:16}}>
              <h2 style={{fontSize:isMobile?20:24,fontWeight:900,color:"#fff",margin:"0 0 4px",letterSpacing:"-0.5px"}}>
                <span style={{color:et.color}}>{et.icon} {et.label}</span> Study Notes
              </h2>
              <p style={{color:"rgba(255,255,255,0.35)",fontSize:12,margin:0}}>
                {et.fullName} · Click any topic to read notes
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:`repeat(auto-fill,minmax(${isMobile?"100%":"220px"},1fr))`,gap:12}}>
              {(et.topics||[]).map(t=>{
                const hasNotes = notesExistMap[`${localExam}_${t.id}`];
                return(
                  <div key={t.id}
                    onClick={()=>hasNotes&&setNotesModal(t)}
                    style={{
                      borderRadius:16,padding:18,
                      background:hasNotes?"rgba(255,106,0,0.06)":"rgba(255,255,255,0.03)",
                      border:`1.5px solid ${hasNotes?"rgba(255,106,0,0.25)":"rgba(255,255,255,0.07)"}`,
                      cursor:hasNotes?"pointer":"default",
                      transition:"all .25s ease",
                      opacity:hasNotes?1:0.5,
                    }}
                    onMouseOver={e=>{if(hasNotes){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,0.4)`;e.currentTarget.style.borderColor=et.color+"60";}}}
                    onMouseOut={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=hasNotes?"rgba(255,106,0,0.25)":"rgba(255,255,255,0.07)";}}>

                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                      <div style={{
                        width:44,height:44,borderRadius:12,flexShrink:0,
                        background:hasNotes?et.color+"25":et.color+"10",
                        border:`1px solid ${et.color}${hasNotes?"40":"20"}`,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                      }}>{t.icon||et.icon}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:2}}>{t.name}</div>
                        <div style={{fontSize:10,color:et.color,fontWeight:600}}>{et.label}</div>
                      </div>
                    </div>

                    <div style={{
                      padding:"8px 12px",borderRadius:10,textAlign:"center",
                      background:hasNotes?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.04)",
                      border:`1px solid ${hasNotes?"rgba(34,197,94,0.25)":"rgba(255,255,255,0.06)"}`,
                      fontSize:12,fontWeight:700,
                      color:hasNotes?"#22c55e":"rgba(255,255,255,0.3)",
                    }}>
                      {hasNotes?"📖 Read Notes →":"No notes yet"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════ EXAMS MODE ══════════ */}
        {mode==="exams"&&(
        <div>'''

new_notes_section = '''        {/* ══════════ EXAMS ══════════ */}
        <div>'''

if old_notes_section in c:
    c = c.replace(old_notes_section, new_notes_section)
    print("✅ 5. Notes section removed from TestsPage")

# Remove mode state from TestsPage
old_mode_state = '  const [mode,setMode]=useState("exams");\n  const [localExam,setLocalExam]=useState(examType||"ssc");'
new_mode_state = '  const [localExam,setLocalExam]=useState(examType||"ssc");'

if old_mode_state in c:
    c = c.replace(old_mode_state, new_mode_state)
    print("✅ 6. mode state removed from TestsPage")

with open("src/App.jsx", "w") as f:
    f.write(c)
print("\n✅ All done! Run: npm run build")
