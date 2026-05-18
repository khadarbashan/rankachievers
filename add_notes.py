#!/usr/bin/env python3
"""
Rank Achievers — Notes System
Rich text editor in Admin + Notes viewer for Students
Run from: ~/Downloads/rankachievers/
python3 add_notes.py
"""

with open("src/App.jsx", "r") as f:
    c = f.read()

# ═══════════════════════════════════════════════════════════════
# 1. ADD NOTES EDITOR CSS
# ═══════════════════════════════════════════════════════════════

old_scrollbar_css = "  ::-webkit-scrollbar { width: 6px; height: 6px; }"

new_scrollbar_css = """  ::-webkit-scrollbar { width: 6px; height: 6px; }

  /* ══════════════════════════════════════
     NOTES EDITOR
  ══════════════════════════════════════ */
  .ra-editor {
    min-height: 320px;
    padding: 20px;
    border-radius: 14px;
    border: 1.5px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: #fff;
    font-size: 14px;
    line-height: 1.8;
    outline: none;
    transition: border-color 0.2s;
    font-family: var(--font);
  }
  .ra-editor:focus {
    border-color: #FF6A00;
    background: rgba(255,106,0,0.05);
    box-shadow: 0 0 0 3px rgba(255,106,0,0.12);
  }
  .ra-editor h1 { font-size: 22px; font-weight: 800; color: #FF6A00; margin: 16px 0 8px; }
  .ra-editor h2 { font-size: 18px; font-weight: 700; color: #ff9a00; margin: 14px 0 6px; }
  .ra-editor h3 { font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.8); margin: 12px 0 6px; }
  .ra-editor p  { margin: 6px 0; color: rgba(255,255,255,0.8); }
  .ra-editor ul, .ra-editor ol { margin: 8px 0 8px 24px; color: rgba(255,255,255,0.75); }
  .ra-editor li { margin: 4px 0; }
  .ra-editor strong { color: #fff; font-weight: 700; }
  .ra-editor em { color: rgba(255,255,255,0.7); font-style: italic; }
  .ra-editor u  { text-decoration-color: #FF6A00; }
  .ra-editor blockquote {
    border-left: 3px solid #FF6A00;
    padding: 8px 16px;
    margin: 12px 0;
    background: rgba(255,106,0,0.08);
    border-radius: 0 8px 8px 0;
    color: rgba(255,255,255,0.7);
    font-style: italic;
  }
  .ra-editor code {
    background: rgba(255,255,255,0.08);
    padding: 2px 8px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 13px;
    color: #ff9a00;
  }
  .ra-editor table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 13px;
  }
  .ra-editor table th {
    background: rgba(255,106,0,0.15);
    color: #FF6A00;
    padding: 8px 12px;
    text-align: left;
    font-weight: 700;
    border: 1px solid rgba(255,106,0,0.2);
  }
  .ra-editor table td {
    padding: 7px 12px;
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
  }
  .ra-editor table tr:hover td { background: rgba(255,255,255,0.04); }

  /* Notes viewer */
  .ra-notes-view { line-height: 1.8; color: rgba(255,255,255,0.85); }
  .ra-notes-view h1 { font-size: 22px; font-weight: 800; color: #FF6A00; margin: 20px 0 10px; }
  .ra-notes-view h2 { font-size: 18px; font-weight: 700; color: #ff9a00; margin: 16px 0 8px; border-bottom: 1px solid rgba(255,106,0,0.2); padding-bottom: 6px; }
  .ra-notes-view h3 { font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.9); margin: 14px 0 6px; }
  .ra-notes-view p  { margin: 8px 0; }
  .ra-notes-view ul, .ra-notes-view ol { margin: 10px 0 10px 24px; }
  .ra-notes-view li { margin: 6px 0; }
  .ra-notes-view strong { color: #fff; font-weight: 700; }
  .ra-notes-view blockquote {
    border-left: 3px solid #FF6A00;
    padding: 10px 18px;
    margin: 14px 0;
    background: rgba(255,106,0,0.08);
    border-radius: 0 10px 10px 0;
    color: rgba(255,255,255,0.7);
    font-style: italic;
  }
  .ra-notes-view code {
    background: rgba(255,255,255,0.08);
    padding: 2px 8px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 13px;
    color: #ff9a00;
  }
  .ra-notes-view table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 13px;
    border-radius: 10px;
    overflow: hidden;
  }
  .ra-notes-view table th {
    background: rgba(255,106,0,0.15);
    color: #FF6A00;
    padding: 10px 14px;
    text-align: left;
    font-weight: 700;
    border: 1px solid rgba(255,106,0,0.2);
  }
  .ra-notes-view table td {
    padding: 8px 14px;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .ra-notes-view table tr:nth-child(even) td { background: rgba(255,255,255,0.03); }
  .ra-notes-view table tr:hover td { background: rgba(255,106,0,0.06); }

  /* Toolbar buttons */
  .ra-toolbar-btn {
    padding: 5px 10px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    line-height: 1;
  }
  .ra-toolbar-btn:hover {
    background: rgba(255,106,0,0.15);
    border-color: rgba(255,106,0,0.4);
    color: #FF6A00;
  }
  .ra-toolbar-btn.active {
    background: rgba(255,106,0,0.2);
    border-color: #FF6A00;
    color: #FF6A00;
  }"""

c = c.replace(old_scrollbar_css, new_scrollbar_css)
print("✅ 1. Notes CSS added")

# ═══════════════════════════════════════════════════════════════
# 2. ADD NotesEditorModal COMPONENT (for Admin)
# ═══════════════════════════════════════════════════════════════

old_admin_page = "// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────"

NOTES_COMPONENTS = '''// ─── NOTES EDITOR MODAL (Admin) ──────────────────────────────────────────────
function NotesEditorModal({examType, topic, existingContent, onSave, onClose}){
  const editorRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const et = EXAM_TYPES.find(e=>e.id===examType)||EXAM_TYPES[0];

  useEffect(()=>{
    // Lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ document.body.style.overflow = prev; };
  },[]);

  useEffect(()=>{
    // Set initial content
    if(editorRef.current && existingContent){
      editorRef.current.innerHTML = existingContent;
    }
  },[]);

  const exec = (cmd, val=null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  const insertTable = () => {
    const table = `<table>
      <thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr></thead>
      <tbody>
        <tr><td>Row 1</td><td>Data</td><td>Data</td></tr>
        <tr><td>Row 2</td><td>Data</td><td>Data</td></tr>
      </tbody>
    </table><p></p>`;
    exec("insertHTML", table);
  };

  const handleSave = async () => {
    const content = editorRef.current?.innerHTML || "";
    if(!content.trim() || content === "<br>"){
      alert("Please add some content before saving");
      return;
    }
    setSaving(true);
    try {
      await setDoc(
        doc(db, "notes", `${examType}_${topic.id}`),
        {
          examType,
          topicId: topic.id,
          topicName: topic.name,
          content,
          updatedAt: serverTimestamp(),
          wordCount: content.replace(/<[^>]*>/g,"").trim().split(/\s+/).length,
        }
      );
      setSaved(true);
      setTimeout(()=>{ setSaved(false); onSave && onSave(); }, 1500);
    } catch(e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const TOOLBAR = [
    { label:"B",      cmd:"bold",          title:"Bold",       style:{fontWeight:"bold"} },
    { label:"I",      cmd:"italic",        title:"Italic",     style:{fontStyle:"italic"} },
    { label:"U",      cmd:"underline",     title:"Underline",  style:{textDecoration:"underline"} },
    { label:"H1",     cmd:"formatBlock",   val:"h1",           title:"Heading 1" },
    { label:"H2",     cmd:"formatBlock",   val:"h2",           title:"Heading 2" },
    { label:"H3",     cmd:"formatBlock",   val:"h3",           title:"Heading 3" },
    { label:"¶",      cmd:"formatBlock",   val:"p",            title:"Paragraph" },
    { label:"• List", cmd:"insertUnorderedList", title:"Bullet list" },
    { label:"1. List",cmd:"insertOrderedList",   title:"Numbered list" },
    { label:"❝",      cmd:"formatBlock",   val:"blockquote",   title:"Quote" },
    { label:"Code",   cmd:"insertHTML",    val:"<code>code here</code>", title:"Inline code" },
  ];

  return(
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",
      backdropFilter:"blur(8px)",zIndex:999999,
      display:"flex",alignItems:"stretch",justifyContent:"center",
      padding:"20px",
    }}>
      <div style={{
        background:"rgba(12,12,16,0.98)",
        border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:24,
        width:"100%",maxWidth:860,
        display:"flex",flexDirection:"column",
        overflow:"hidden",
        boxShadow:"0 40px 80px rgba(0,0,0,0.9)",
        animation:"raPop .25s ease both",
      }}>
        {/* Header */}
        <div style={{
          padding:"18px 24px",
          borderBottom:"1px solid rgba(255,255,255,0.08)",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          background:"rgba(255,255,255,0.03)",
          flexShrink:0,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{
              width:38,height:38,borderRadius:10,
              background:et.color+"20",border:`1px solid ${et.color}30`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,
            }}>{topic.icon||et.icon}</div>
            <div>
              <div style={{fontWeight:800,fontSize:15,color:"#fff"}}>{topic.name} Notes</div>
              <div style={{fontSize:11,color:et.color,fontWeight:600}}>{et.icon} {et.label} · Rich Text Editor</div>
            </div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {saved&&<span style={{fontSize:12,color:"#22c55e",fontWeight:700}}>✅ Saved!</span>}
            <button onClick={handleSave} disabled={saving} style={{
              padding:"9px 22px",borderRadius:10,border:"none",
              background:saving?"rgba(255,255,255,0.1)":"linear-gradient(135deg,#FF6A00,#ff9a00)",
              color:saving?"rgba(255,255,255,0.4)":"#fff",
              fontWeight:800,fontSize:13,cursor:saving?"not-allowed":"pointer",
              display:"flex",alignItems:"center",gap:8,
              boxShadow:saving?"none":"0 4px 16px rgba(255,106,0,0.4)",
            }}>
              {saving&&<div style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"raSpin .7s linear infinite"}}/>}
              {saving?"Saving...":"💾 Save Notes"}
            </button>
            <button onClick={onClose} style={{
              width:34,height:34,borderRadius:9,
              border:"1px solid rgba(255,255,255,0.1)",
              background:"rgba(255,255,255,0.06)",
              color:"rgba(255,255,255,0.5)",fontSize:16,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>✕</button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          padding:"10px 16px",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
          display:"flex",gap:5,flexWrap:"wrap",alignItems:"center",
          background:"rgba(255,255,255,0.02)",
          flexShrink:0,
        }}>
          {TOOLBAR.map(t=>(
            <button key={t.label}
              className="ra-toolbar-btn"
              title={t.title}
              style={{...t.style}}
              onMouseDown={e=>{
                e.preventDefault();
                if(t.cmd==="insertHTML") exec(t.cmd, t.val);
                else exec(t.cmd, t.val||null);
              }}>
              {t.label}
            </button>
          ))}
          <div style={{width:1,height:20,background:"rgba(255,255,255,0.1)",margin:"0 4px"}}/>
          <button className="ra-toolbar-btn" title="Insert Table" onMouseDown={e=>{e.preventDefault();insertTable();}}>
            📊 Table
          </button>
          <button className="ra-toolbar-btn" title="Horizontal Rule" onMouseDown={e=>{e.preventDefault();exec("insertHorizontalRule");}}>
            ─ Divider
          </button>
          <button className="ra-toolbar-btn" title="Clear formatting" onMouseDown={e=>{e.preventDefault();exec("removeFormat");}}>
            ✕ Clear
          </button>
          <div style={{marginLeft:"auto",fontSize:11,color:"rgba(255,255,255,0.25)"}}>
            Tip: Select text then click formatting buttons
          </div>
        </div>

        {/* Editor */}
        <div style={{flex:1,overflow:"auto",padding:"4px"}}>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="ra-editor"
            style={{
              minHeight:"100%",
              borderRadius:12,
              border:"none",
              background:"transparent",
            }}
            data-placeholder="Start writing notes here...&#10;&#10;Tips:&#10;• Use H1, H2, H3 for headings&#10;• Use bullet lists for key points&#10;• Use blockquote for important formulas&#10;• Use Table for comparison charts"
            onInput={()=>{}}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding:"10px 20px",
          borderTop:"1px solid rgba(255,255,255,0.06)",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          background:"rgba(255,255,255,0.02)",
          flexShrink:0,
          fontSize:11,color:"rgba(255,255,255,0.25)",
        }}>
          <span>📝 Rich Text Editor · Bold, Italic, Headings, Lists, Tables, Blockquotes</span>
          <span>Content saved to Firestore · Students see it instantly</span>
        </div>
      </div>
    </div>
  );
}

// ─── NOTES VIEWER MODAL (Students) ────────────────────────────────────────────
function NotesViewerModal({examType, topic, onClose}){
  const [notes, setNotes]   = useState(null);
  const [loading, setLoading] = useState(true);
  const et = EXAM_TYPES.find(e=>e.id===examType)||EXAM_TYPES[0];

  useEffect(()=>{
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ document.body.style.overflow = prev; };
  },[]);

  useEffect(()=>{
    setLoading(true);
    getDoc(doc(db,"notes",`${examType}_${topic.id}`))
      .then(d=>{
        if(d.exists()) setNotes(d.data());
        else setNotes(null);
      })
      .catch(()=>setNotes(null))
      .finally(()=>setLoading(false));
  },[examType, topic.id]);

  return(
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",
      backdropFilter:"blur(8px)",zIndex:999999,
      display:"flex",alignItems:"stretch",justifyContent:"center",
      padding:"20px",
    }}>
      <div style={{
        background:"rgba(10,10,14,0.98)",
        border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:24,
        width:"100%",maxWidth:760,
        display:"flex",flexDirection:"column",
        overflow:"hidden",
        boxShadow:"0 40px 80px rgba(0,0,0,0.9)",
        animation:"raPop .25s ease both",
      }}>
        {/* Header */}
        <div style={{
          padding:"18px 24px",
          borderBottom:"1px solid rgba(255,255,255,0.08)",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          background:`linear-gradient(135deg,${et.color}12,transparent)`,
          flexShrink:0,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{
              width:44,height:44,borderRadius:13,
              background:`linear-gradient(135deg,${et.color}25,${et.color}10)`,
              border:`1.5px solid ${et.color}30`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,
            }}>{topic.icon||et.icon}</div>
            <div>
              <div style={{fontWeight:900,fontSize:17,color:"#fff",letterSpacing:"-0.3px"}}>{topic.name}</div>
              <div style={{fontSize:11,color:et.color,fontWeight:600,marginTop:2}}>
                {et.icon} {et.label}
                {notes&&<span style={{color:"rgba(255,255,255,0.3)",marginLeft:8}}>· {notes.wordCount||0} words</span>}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width:34,height:34,borderRadius:9,
            border:"1px solid rgba(255,255,255,0.1)",
            background:"rgba(255,255,255,0.06)",
            color:"rgba(255,255,255,0.5)",fontSize:16,cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>✕</button>
        </div>

        {/* Content */}
        <div style={{flex:1,overflow:"auto",padding:"28px 32px"}}>
          {loading?(
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:200,gap:12}}>
              <div style={{width:28,height:28,border:"2px solid rgba(255,106,0,0.2)",borderTop:"2px solid #FF6A00",borderRadius:"50%",animation:"raSpin .7s linear infinite"}}/>
              <span style={{color:"rgba(255,255,255,0.4)"}}>Loading notes...</span>
            </div>
          ):!notes?(
            <div style={{textAlign:"center",padding:"60px 20px"}}>
              <div style={{fontSize:56,marginBottom:16}}>📭</div>
              <div style={{fontWeight:800,fontSize:18,color:"rgba(255,255,255,0.6)",marginBottom:8}}>No notes yet</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.3)"}}>
                Notes for {topic.name} haven&apos;t been added yet.<br/>Check back soon!
              </div>
            </div>
          ):(
            <div
              className="ra-notes-view"
              dangerouslySetInnerHTML={{__html: notes.content}}
            />
          )}
        </div>

        {/* Footer */}
        {notes&&(
          <div style={{
            padding:"12px 24px",
            borderTop:"1px solid rgba(255,255,255,0.06)",
            display:"flex",justifyContent:"space-between",alignItems:"center",
            background:"rgba(255,255,255,0.02)",
            flexShrink:0,
          }}>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.25)"}}>
              📚 {topic.name} · {et.label} Study Notes
            </span>
            <button onClick={onClose} style={{
              padding:"8px 20px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.1)",
              background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.6)",
              fontWeight:700,fontSize:12,cursor:"pointer",transition:"all .2s",
            }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

'''

c = c.replace(old_admin_page, NOTES_COMPONENTS + old_admin_page)
print("✅ 2. NotesEditorModal + NotesViewerModal components added")

# ═══════════════════════════════════════════════════════════════
# 3. ADD NOTES TAB TO ADMIN PAGE
# ═══════════════════════════════════════════════════════════════

# Add notes state variables inside AdminPage
old_admin_tabs = "  const TABS=[{id:\"students\",l:\"👥 Students\"},{id:\"exams\",l:\"🎯 Exam Types\"},{id:\"banners\",l:\"🖼️ Banners\"},{id:\"questions\",l:\"📝 Add Question\"},{id:\"editq\",l:\"✏️ Edit Questions\"},{id:\"bulk\",l:\"📤 Bulk Upload\"},{id:\"notices\",l:\"📢 Notices\"},{id:\"settings\",l:\"⚙️ Settings\"}];"

new_admin_tabs = """  // Notes state
  const [notesExam,setNotesExam]   = useState("ssc");
  const [notesTopic,setNotesTopic] = useState(null);
  const [editingNotes,setEditingNotes] = useState(false);
  const [notesExistMap,setNotesExistMap] = useState({});
  const notesET = liveExamTypes.find(e=>e.id===notesExam)||liveExamTypes[0];

  useEffect(()=>{
    if(tab!=="notes") return;
    // Check which topics have notes
    const checkNotes = async()=>{
      const map = {};
      for(const et of liveExamTypes){
        for(const t of (et.topics||[])){
          const d = await getDoc(doc(db,"notes",`${et.id}_${t.id}`));
          if(d.exists()) map[`${et.id}_${t.id}`] = true;
        }
      }
      setNotesExistMap(map);
    };
    checkNotes();
  },[tab, liveExamTypes]);

  const TABS=[{id:"students",l:"👥 Students"},{id:"exams",l:"🎯 Exam Types"},{id:"banners",l:"🖼️ Banners"},{id:"questions",l:"📝 Add Question"},{id:"editq",l:"✏️ Edit Questions"},{id:"bulk",l:"📤 Bulk Upload"},{id:"notices",l:"📢 Notices"},{id:"notes",l:"📖 Notes"},{id:"settings",l:"⚙️ Settings"}];"""

if old_admin_tabs in c:
    c = c.replace(old_admin_tabs, new_admin_tabs)
    print("✅ 3. Notes tab + state added to AdminPage")

# ═══════════════════════════════════════════════════════════════
# 4. ADD NOTES TAB UI (inside AdminPage return)
# ═══════════════════════════════════════════════════════════════

old_settings_tab = "      {/* SETTINGS */}"

new_notes_tab = """      {/* NOTES TAB */}
      {tab==="notes"&&(
        <div>
          {editingNotes&&notesTopic&&(
            <NotesEditorModal
              examType={notesExam}
              topic={notesTopic}
              existingContent={null}
              onSave={()=>{
                setEditingNotes(false);
                setNotesExistMap(m=>({...m,[`${notesExam}_${notesTopic.id}`]:true}));
              }}
              onClose={()=>setEditingNotes(false)}
            />
          )}

          {/* Exam selector */}
          <div style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <div style={{width:3,height:18,background:"linear-gradient(180deg,#FF6A00,transparent)",borderRadius:2}}/>
              <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.18em"}}>SELECT EXAM</span>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {liveExamTypes.map(e=>(
                <button key={e.id} onClick={()=>{setNotesExam(e.id);setNotesTopic(null);}} style={{
                  padding:"12px 22px",borderRadius:14,fontWeight:700,fontSize:14,cursor:"pointer",
                  transition:"all .2s",
                  border:`1.5px solid ${notesExam===e.id?e.color:"rgba(255,255,255,0.1)"}`,
                  background:notesExam===e.id?e.color+"22":"rgba(255,255,255,0.04)",
                  color:notesExam===e.id?e.color:"rgba(255,255,255,0.5)",
                  boxShadow:notesExam===e.id?`0 4px 16px ${e.color}30`:"none",
                }}>
                  {e.icon} {e.label}
                  <span style={{display:"block",fontSize:9,opacity:.7,marginTop:1}}>{e.fullName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Topics grid */}
          <div style={{marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:3,height:18,background:"linear-gradient(180deg,#FF6A00,transparent)",borderRadius:2}}/>
            <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.18em"}}>SELECT TOPIC TO EDIT NOTES</span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
            {(notesET?.topics||[]).map(t=>{
              const hasNotes = notesExistMap[`${notesExam}_${t.id}`];
              return(
                <div key={t.id} style={{
                  borderRadius:16,padding:18,
                  background:hasNotes?"rgba(255,106,0,0.06)":"rgba(255,255,255,0.03)",
                  border:`1.5px solid ${hasNotes?"rgba(255,106,0,0.25)":"rgba(255,255,255,0.08)"}`,
                  transition:"all .25s ease",
                  cursor:"pointer",
                }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=notesET.color+"50";e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=hasNotes?"rgba(255,106,0,0.25)":"rgba(255,255,255,0.08)";e.currentTarget.style.background=hasNotes?"rgba(255,106,0,0.06)":"rgba(255,255,255,0.03)";e.currentTarget.style.transform="none";}}>

                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                    <div style={{
                      width:44,height:44,borderRadius:12,flexShrink:0,
                      background:notesET.color+"18",
                      border:`1px solid ${notesET.color}30`,
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                    }}>{t.icon||notesET.icon}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:2}}>{t.name}</div>
                      <div style={{fontSize:10,color:notesET.color,fontWeight:600}}>{notesET.label}</div>
                    </div>
                    {hasNotes&&(
                      <div style={{
                        padding:"3px 10px",borderRadius:20,
                        background:"rgba(34,197,94,0.15)",
                        border:"1px solid rgba(34,197,94,0.3)",
                        fontSize:10,fontWeight:700,color:"#22c55e",
                        flexShrink:0,
                      }}>✅ Notes</div>
                    )}
                  </div>

                  <button
                    onClick={()=>{setNotesTopic(t);setEditingNotes(true);}}
                    style={{
                      width:"100%",padding:"9px 0",borderRadius:10,border:"none",
                      background:hasNotes
                        ?"rgba(255,106,0,0.15)"
                        :`linear-gradient(135deg,${notesET.color},${notesET.color}cc)`,
                      color:hasNotes?notesET.color:"#fff",
                      fontWeight:700,fontSize:12,cursor:"pointer",
                      border:hasNotes?`1px solid ${notesET.color}40`:"none",
                      transition:"all .2s",
                    }}>
                    {hasNotes?"✏️ Edit Notes":"➕ Add Notes"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SETTINGS */}"""

if old_settings_tab in c:
    c = c.replace(old_settings_tab, new_notes_tab)
    print("✅ 4. Notes tab UI added to Admin")

# ═══════════════════════════════════════════════════════════════
# 5. ADD NOTES BUTTON TO STUDENT TestsPage
# ═══════════════════════════════════════════════════════════════

# Add notesModal state to TestsPage
old_tests_state = """  const [localExam,setLocalExam]=useState(examType||"ssc");
  const [selTopic,setSelTopic]=useState(null);
  const [modeModal,setModeModal]=useState(null);
  const [settings,setSettingsState]=useState({contentMode:"free"});
  const [userAccess,setUserAccess]=useState(true);
  const isMobile=useMobile();"""

new_tests_state = """  const [localExam,setLocalExam]=useState(examType||"ssc");
  const [selTopic,setSelTopic]=useState(null);
  const [modeModal,setModeModal]=useState(null);
  const [notesModal,setNotesModal]=useState(null);
  const [notesExistMap,setNotesExistMap]=useState({});
  const [settings,setSettingsState]=useState({contentMode:"free"});
  const [userAccess,setUserAccess]=useState(true);
  const isMobile=useMobile();"""

if old_tests_state in c:
    c = c.replace(old_tests_state, new_tests_state)
    print("✅ 5a. notesModal state added to TestsPage")

# Add notes existence check in TestsPage useEffect
old_tests_effect = """  useEffect(()=>{ if(examType&&examType!==localExam) setLocalExam(examType); },[examType]);
  useEffect(()=>{
    getSettings().then(s=>setSettingsState(s));
    if(user?.uid) checkAccess(user.uid).then(a=>setUserAccess(a));
  },[user]);"""

new_tests_effect = """  useEffect(()=>{ if(examType&&examType!==localExam) setLocalExam(examType); },[examType]);

  // Check which topics have notes
  useEffect(()=>{
    const et = (examTypes||EXAM_TYPES).find(e=>e.id===localExam)||EXAM_TYPES[0];
    const checkNotes = async()=>{
      const map = {};
      for(const t of (et.topics||[])){
        try{
          const d = await getDoc(doc(db,"notes",`${localExam}_${t.id}`));
          if(d.exists()) map[`${localExam}_${t.id}`] = true;
        }catch(e){}
      }
      setNotesExistMap(map);
    };
    checkNotes();
  },[localExam]);

  useEffect(()=>{
    getSettings().then(s=>setSettingsState(s));
    if(user?.uid) checkAccess(user.uid).then(a=>setUserAccess(a));
  },[user]);"""

if old_tests_effect in c:
    c = c.replace(old_tests_effect, new_tests_effect)
    print("✅ 5b. Notes existence check added to TestsPage")

# Add notes button to test card and notes viewer modal
old_card_button = """                  <button onClick={()=>{if(isPaidLocked){alert("Content locked.");return;}setModeModal(testObj);}}
                    className={isPaidLocked?"":"btn-primary"}
                    style={{
                      width:"100%",padding:"11px 0",borderRadius:12,border:"none",
                      background:isPaidLocked?"rgba(255,255,255,0.05)":`linear-gradient(135deg,${et.color},${et.color}dd)`,
                      color:isPaidLocked?"rgba(255,255,255,0.2)":"#fff",
                      fontWeight:800,fontSize:13,cursor:isPaidLocked?"not-allowed":"pointer",
                      boxShadow:isPaidLocked?"none":`0 4px 16px ${et.color}40`,transition:"all .25s",
                    }}
                    onMouseOver={e=>{if(!isPaidLocked){e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 8px 24px ${et.color}55`;}}}
                    onMouseOut={e=>{if(!isPaidLocked){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 16px ${et.color}40`;}}}>
                    {isPaidLocked?"🔒 Locked":"Start Test →"}</button>"""

new_card_button = """                  <div style={{display:"flex",gap:8}}>
                    {/* Notes button - show if notes exist */}
                    {notesExistMap[`${localExam}_${topic.id}`]&&di===0&&(
                      <button onClick={()=>setNotesModal(topic)} style={{
                        padding:"11px 14px",borderRadius:12,border:`1.5px solid ${et.color}40`,
                        background:et.color+"12",color:et.color,
                        fontWeight:700,fontSize:12,cursor:"pointer",
                        transition:"all .2s",flexShrink:0,
                      }}
                      title="View topic notes"
                      onMouseOver={e=>{e.currentTarget.style.background=et.color+"22";e.currentTarget.style.transform="translateY(-1px)";}}
                      onMouseOut={e=>{e.currentTarget.style.background=et.color+"12";e.currentTarget.style.transform="none";}}>
                        📖
                      </button>
                    )}
                    <button onClick={()=>{if(isPaidLocked){alert("Content locked.");return;}setModeModal(testObj);}}
                      className={isPaidLocked?"":"btn-primary"}
                      style={{
                        flex:1,padding:"11px 0",borderRadius:12,border:"none",
                        background:isPaidLocked?"rgba(255,255,255,0.05)":`linear-gradient(135deg,${et.color},${et.color}dd)`,
                        color:isPaidLocked?"rgba(255,255,255,0.2)":"#fff",
                        fontWeight:800,fontSize:13,cursor:isPaidLocked?"not-allowed":"pointer",
                        boxShadow:isPaidLocked?"none":`0 4px 16px ${et.color}40`,transition:"all .25s",
                      }}
                      onMouseOver={e=>{if(!isPaidLocked){e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 8px 24px ${et.color}55`;}}}
                      onMouseOut={e=>{if(!isPaidLocked){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 16px ${et.color}40`;}}}>
                      {isPaidLocked?"🔒 Locked":"Start Test →"}</button>
                  </div>"""

if old_card_button in c:
    c = c.replace(old_card_button, new_card_button)
    print("✅ 5c. Notes button added to test cards")

# Add NotesViewerModal render at the end of TestsPage
old_mode_modal_render = "      {modeModal&&<ExamModeModal test={modeModal} onConfirm={isTimed=>{onStartTest({...modeModal,timed:isTimed});setModeModal(null);}} onCancel={()=>setModeModal(null)}/>}"

new_mode_modal_render = """      {modeModal&&<ExamModeModal test={modeModal} onConfirm={isTimed=>{onStartTest({...modeModal,timed:isTimed});setModeModal(null);}} onCancel={()=>setModeModal(null)}/>}
      {notesModal&&<NotesViewerModal examType={localExam} topic={notesModal} onClose={()=>setNotesModal(null)}/>}"""

if old_mode_modal_render in c:
    c = c.replace(old_mode_modal_render, new_mode_modal_render)
    print("✅ 5d. NotesViewerModal rendered in TestsPage")

# ═══════════════════════════════════════════════════════════════
# 6. ADD TOPIC-LEVEL "VIEW NOTES" BUTTON in topic filter pills
# ═══════════════════════════════════════════════════════════════
old_topic_pills = """        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
          <button onClick={()=>setSelTopic(null)} style={{
            padding:"6px 14px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s",
            border:`1.5px solid ${!selTopic?et.color:"rgba(255,255,255,0.1)"}`,
            background:!selTopic?et.color+"20":"rgba(255,255,255,0.04)",
            color:!selTopic?et.color:"rgba(255,255,255,0.4)",
          }}>All Topics</button>
          {(et.topics||[]).map(t=>(
            <button key={t.id} onClick={()=>setSelTopic(t.id)} style={{
              padding:"6px 14px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s",
              border:`1.5px solid ${selTopic===t.id?et.color:"rgba(255,255,255,0.1)"}`,
              background:selTopic===t.id?et.color+"20":"rgba(255,255,255,0.04)",
              color:selTopic===t.id?et.color:"rgba(255,255,255,0.4)",
            }}>{t.icon} {t.name}</button>
          ))}
        </div>"""

new_topic_pills = """        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20,alignItems:"center"}}>
          <button onClick={()=>setSelTopic(null)} style={{
            padding:"6px 14px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s",
            border:`1.5px solid ${!selTopic?et.color:"rgba(255,255,255,0.1)"}`,
            background:!selTopic?et.color+"20":"rgba(255,255,255,0.04)",
            color:!selTopic?et.color:"rgba(255,255,255,0.4)",
          }}>All Topics</button>
          {(et.topics||[]).map(t=>(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:4}}>
              <button onClick={()=>setSelTopic(t.id)} style={{
                padding:"6px 14px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s",
                border:`1.5px solid ${selTopic===t.id?et.color:"rgba(255,255,255,0.1)"}`,
                background:selTopic===t.id?et.color+"20":"rgba(255,255,255,0.04)",
                color:selTopic===t.id?et.color:"rgba(255,255,255,0.4)",
              }}>{t.icon} {t.name}</button>
              {notesExistMap[`${localExam}_${t.id}`]&&(
                <button onClick={()=>setNotesModal(t)} title="View notes" style={{
                  width:24,height:24,borderRadius:8,border:`1px solid ${et.color}40`,
                  background:et.color+"12",color:et.color,fontSize:12,
                  cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
                  transition:"all .2s",flexShrink:0,
                }}
                onMouseOver={e=>{e.currentTarget.style.background=et.color+"25";e.currentTarget.style.transform="scale(1.1)";}}
                onMouseOut={e=>{e.currentTarget.style.background=et.color+"12";e.currentTarget.style.transform="scale(1)";}}>
                  📖
                </button>
              )}
            </div>
          ))}
        </div>"""

if old_topic_pills in c:
    c = c.replace(old_topic_pills, new_topic_pills)
    print("✅ 6. Notes icon added to topic filter pills")

with open("src/App.jsx", "w") as f:
    f.write(c)

print("""
✅ NOTES SYSTEM COMPLETE!

HOW IT WORKS:
═══════════════
ADMIN:
  1. Go to Admin → "📖 Notes" tab
  2. Select exam (SSC / Banking / Railways)
  3. Click on any topic card
  4. Write rich notes in the editor (H1, H2, lists, tables, bold, etc.)
  5. Click "Save Notes" → saved to Firestore instantly

STUDENTS:
  1. Go to Tests → Select exam
  2. Topic pills with 📖 icon = notes available
  3. Click 📖 icon on topic pill OR card → Notes viewer modal opens
  4. Read full formatted notes

FIRESTORE STRUCTURE:
  notes/{examId}_{topicId}
    examType: "ssc"
    topicId: "ssc_arith"
    topicName: "Arithmetic"
    content: "<h1>Arithmetic Notes</h1>..."
    wordCount: 450
    updatedAt: timestamp

Run:
  npm run build && git add -A && git commit -m "Feature: rich text notes system for admin + students" && git push
""")
