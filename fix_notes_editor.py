#!/usr/bin/env python3
"""
Fix: Notes editor opens properly for each subtopic in Admin
Run from: ~/Downloads/rankachievers/
python3 fix_notes_editor.py
"""

with open("src/App.jsx", "r") as f:
    c = f.read()

# ══════════════════════════════════════════════════════════════
# FIND where NotesEditorModal function starts and replace it
# with a version that pre-loads existing content
# ══════════════════════════════════════════════════════════════

import re

# Find the function
start = c.find("function NotesEditorModal(")
end_marker = "\n// ─── NOTES PAGE"
end = c.find(end_marker, start)

print(f"NotesEditorModal found at char {start}, ends at {end}")

NEW_EDITOR = '''function NotesEditorModal({examType, topic, onSave, onClose, subtopicId=null, subtopicTitle=null}){
  const editorRef  = useRef(null);
  const [saving,   setSaving]  = useState(false);
  const [saved,    setSaved]   = useState(false);
  const [loading,  setLoading] = useState(true);
  const et = EXAM_TYPES.find(e=>e.id===examType)||EXAM_TYPES[0];

  const docId = subtopicId
    ? `${examType}_${topic.id}_${subtopicId}`
    : `${examType}_${topic.id}`;

  // Lock body scroll
  useEffect(()=>{
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ document.body.style.overflow = prev; };
  },[]);

  // Load existing content
  useEffect(()=>{
    setLoading(true);
    getDoc(doc(db,"notes",docId))
      .then(d=>{
        if(d.exists() && editorRef.current){
          const html = d.data().content || "";
          editorRef.current.innerHTML = html;
        }
      })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[docId]);

  const exec = (cmd, val=null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  const insertTable = () => {
    exec("insertHTML", `<table>
      <thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr></thead>
      <tbody>
        <tr><td>Row 1</td><td>Data</td><td>Data</td></tr>
        <tr><td>Row 2</td><td>Data</td><td>Data</td></tr>
      </tbody>
    </table><p></p>`);
  };

  const handleSave = async () => {
    const content = editorRef.current?.innerHTML || "";
    if(!content.trim() || content === "<br>"){
      alert("Please add some content before saving");
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db,"notes",docId),{
        examType,
        topicId:       topic.id,
        topicName:     topic.name,
        subtopicId:    subtopicId||null,
        subtopicTitle: subtopicTitle||null,
        content,
        updatedAt:  serverTimestamp(),
        wordCount:  content.replace(/<[^>]*>/g,"").trim().split(/\s+/).length,
      });
      setSaved(true);
      setTimeout(()=>{ setSaved(false); onSave&&onSave(); }, 1200);
    } catch(e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const COLORS = [
    "#ffffff","#FF6A00","#ff9a00","#22c55e",
    "#3b82f6","#a855f7","#ec4899","#ef4444",
    "#f59e0b","#06b6d4","#84cc16","#64748b",
  ];
  const HIGHLIGHTS = [
    "rgba(255,106,0,0.35)","rgba(34,197,94,0.35)",
    "rgba(59,130,246,0.35)","rgba(234,179,8,0.4)",
    "rgba(168,85,247,0.35)","rgba(239,68,68,0.35)",
  ];

  const displayTitle = subtopicTitle || topic.name;

  return(
    <div style={{
      position:"fixed",inset:0,
      background:"rgba(0,0,0,0.92)",
      backdropFilter:"blur(8px)",
      zIndex:999999,
      display:"flex",alignItems:"stretch",
      justifyContent:"center",
      padding:"10px",
    }}>
      <div style={{
        background:"rgba(10,10,14,0.99)",
        border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:20,
        width:"100%",maxWidth:920,
        height:"100%",
        display:"flex",flexDirection:"column",
        overflow:"hidden",
        boxShadow:"0 40px 80px rgba(0,0,0,0.9)",
        animation:"raPop .2s ease both",
      }}>

        {/* ── Header ── */}
        <div style={{
          padding:"14px 20px",
          borderBottom:"1px solid rgba(255,255,255,0.08)",
          display:"flex",alignItems:"center",
          justifyContent:"space-between",
          background:"rgba(255,255,255,0.03)",
          flexShrink:0,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{
              width:40,height:40,borderRadius:12,
              background:et.color+"20",border:`1px solid ${et.color}30`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,
            }}>{topic.icon||et.icon}</div>
            <div>
              <div style={{fontWeight:800,fontSize:15,color:"#fff",letterSpacing:"-0.2px"}}>
                {displayTitle}
              </div>
              <div style={{fontSize:11,color:et.color,fontWeight:600,marginTop:1}}>
                {et.icon} {et.label} · {subtopicTitle?`${topic.name} › ${subtopicTitle}`:"Topic Notes"}
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {saved&&<span style={{fontSize:12,color:"#22c55e",fontWeight:700,animation:"raFadeIn .3s ease"}}>✅ Saved!</span>}
            <button onClick={handleSave} disabled={saving||loading} style={{
              padding:"9px 20px",borderRadius:10,border:"none",
              background:(saving||loading)?"rgba(255,255,255,0.08)":"linear-gradient(135deg,#FF6A00,#ff9a00)",
              color:(saving||loading)?"rgba(255,255,255,0.3)":"#fff",
              fontWeight:800,fontSize:13,cursor:(saving||loading)?"not-allowed":"pointer",
              display:"flex",alignItems:"center",gap:7,
              boxShadow:(saving||loading)?"none":"0 4px 16px rgba(255,106,0,0.4)",
              transition:"all .2s",
            }}>
              {saving?(
                <><div style={{width:13,height:13,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"raSpin .7s linear infinite"}}/>Saving...</>
              ):"💾 Save Notes"}
            </button>
            <button onClick={onClose} style={{
              width:34,height:34,borderRadius:9,
              border:"1px solid rgba(255,255,255,0.1)",
              background:"rgba(255,255,255,0.06)",
              color:"rgba(255,255,255,0.5)",
              fontSize:16,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all .2s",
            }}>✕</button>
          </div>
        </div>

        {/* ── Toolbar Row 1: Formatting ── */}
        <div style={{
          padding:"8px 14px",
          borderBottom:"1px solid rgba(255,255,255,0.05)",
          display:"flex",gap:4,flexWrap:"wrap",alignItems:"center",
          background:"rgba(255,255,255,0.02)",
          flexShrink:0,
        }}>
          {[
            {l:"B",  cmd:"bold",                style:{fontWeight:"bold"},   title:"Bold"},
            {l:"I",  cmd:"italic",              style:{fontStyle:"italic"},  title:"Italic"},
            {l:"U",  cmd:"underline",           style:{textDecoration:"underline"}, title:"Underline"},
            {l:"H1", cmd:"formatBlock",val:"h1",title:"Heading 1"},
            {l:"H2", cmd:"formatBlock",val:"h2",title:"Heading 2"},
            {l:"H3", cmd:"formatBlock",val:"h3",title:"Heading 3"},
            {l:"¶",  cmd:"formatBlock",val:"p", title:"Paragraph"},
            {l:"• List",  cmd:"insertUnorderedList",title:"Bullet list"},
            {l:"1. List", cmd:"insertOrderedList",  title:"Numbered list"},
            {l:"❝",  cmd:"formatBlock",val:"blockquote",title:"Quote"},
            {l:"Code",cmd:"insertHTML",val:"<code>code</code>",title:"Code"},
          ].map(t=>(
            <button key={t.l} className="ra-toolbar-btn" title={t.title}
              style={t.style||{}}
              onMouseDown={e=>{
                e.preventDefault();
                if(t.cmd==="insertHTML") exec(t.cmd,t.val);
                else exec(t.cmd,t.val||null);
              }}>{t.l}</button>
          ))}
          <div style={{width:1,height:18,background:"rgba(255,255,255,0.1)",margin:"0 3px"}}/>
          <button className="ra-toolbar-btn" title="Table"   onMouseDown={e=>{e.preventDefault();insertTable();}}>📊 Table</button>
          <button className="ra-toolbar-btn" title="Divider" onMouseDown={e=>{e.preventDefault();exec("insertHorizontalRule");}}>─ Divider</button>
          <div style={{width:1,height:18,background:"rgba(255,255,255,0.1)",margin:"0 3px"}}/>
          <button className="ra-toolbar-btn" title="Align Left"   onMouseDown={e=>{e.preventDefault();exec("justifyLeft");}}>⬅</button>
          <button className="ra-toolbar-btn" title="Align Center" onMouseDown={e=>{e.preventDefault();exec("justifyCenter");}}>↔</button>
          <button className="ra-toolbar-btn" title="Align Right"  onMouseDown={e=>{e.preventDefault();exec("justifyRight");}}>➡</button>
          <button className="ra-toolbar-btn" title="Justify"      onMouseDown={e=>{e.preventDefault();exec("justifyFull");}}>≡</button>
          <div style={{width:1,height:18,background:"rgba(255,255,255,0.1)",margin:"0 3px"}}/>
          <button className="ra-toolbar-btn" title="Clear format" onMouseDown={e=>{e.preventDefault();exec("removeFormat");}}>✕ Clear</button>
        </div>

        {/* ── Toolbar Row 2: Colors ── */}
        <div style={{
          padding:"7px 14px",
          borderBottom:"1px solid rgba(255,255,255,0.05)",
          display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",
          background:"rgba(255,255,255,0.015)",
          flexShrink:0,
        }}>
          <span style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,0.3)",whiteSpace:"nowrap"}}>A Text:</span>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {COLORS.map(col=>(
              <div key={col} title={col}
                onMouseDown={e=>{e.preventDefault();exec("foreColor",col);}}
                style={{
                  width:20,height:20,borderRadius:"50%",background:col,
                  cursor:"pointer",border:"1.5px solid rgba(255,255,255,0.15)",
                  transition:"transform .15s",flexShrink:0,
                }}
                onMouseOver={e=>e.currentTarget.style.transform="scale(1.3)"}
                onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}
              />
            ))}
          </div>
          <div style={{width:1,height:18,background:"rgba(255,255,255,0.1)"}}/>
          <span style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,0.3)",whiteSpace:"nowrap"}}>🖍 Highlight:</span>
          <div style={{display:"flex",gap:4}}>
            {HIGHLIGHTS.map(col=>(
              <div key={col}
                onMouseDown={e=>{e.preventDefault();exec("hiliteColor",col);}}
                style={{
                  width:20,height:20,borderRadius:5,background:col,
                  cursor:"pointer",border:"1.5px solid rgba(255,255,255,0.15)",
                  transition:"transform .15s",flexShrink:0,
                }}
                onMouseOver={e=>e.currentTarget.style.transform="scale(1.3)"}
                onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}
              />
            ))}
            <div
              onMouseDown={e=>{e.preventDefault();exec("hiliteColor","transparent");}}
              style={{
                width:20,height:20,borderRadius:5,cursor:"pointer",
                border:"1.5px solid rgba(255,255,255,0.2)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:10,color:"rgba(255,255,255,0.4)",transition:"transform .15s",
              }}
              onMouseOver={e=>e.currentTarget.style.transform="scale(1.3)"}
              onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}
            >✕</div>
          </div>
          <div style={{marginLeft:"auto",fontSize:10,color:"rgba(255,255,255,0.18)"}}>
            Select text first → apply color
          </div>
        </div>

        {/* ── Editor ── */}
        <div style={{flex:1,overflow:"auto",padding:"6px"}}>
          {loading?(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:12,flexDirection:"column"}}>
              <div style={{width:32,height:32,border:"3px solid rgba(255,106,0,0.2)",borderTop:"3px solid #FF6A00",borderRadius:"50%",animation:"raSpin .7s linear infinite"}}/>
              <span style={{color:"rgba(255,255,255,0.35)",fontSize:13}}>Loading existing content...</span>
            </div>
          ):(
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="ra-editor"
              style={{
                minHeight:"100%",height:"100%",
                borderRadius:12,border:"none",
                background:"transparent",
                fontSize:15,lineHeight:1.9,
              }}
              data-placeholder="Start writing notes here...&#10;&#10;• Use H1, H2, H3 for headings&#10;• Bullet lists for key points&#10;• Blockquote for important formulas&#10;• Table for comparisons"
            />
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding:"8px 18px",
          borderTop:"1px solid rgba(255,255,255,0.06)",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          background:"rgba(255,255,255,0.02)",
          flexShrink:0,fontSize:10,color:"rgba(255,255,255,0.2)",
        }}>
          <span>📝 {displayTitle} · Rich Text Editor</span>
          <span>Saved to Firestore · Students see instantly</span>
        </div>
      </div>
    </div>
  );
}

'''

if start > 0 and end > 0:
    c = c[:start] + NEW_EDITOR + c[end:]
    print("✅ NotesEditorModal fully replaced")
else:
    print("❌ Could not find NotesEditorModal")

with open("src/App.jsx", "w") as f:
    f.write(c)
print("Done!")
