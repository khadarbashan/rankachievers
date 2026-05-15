import { useState, useEffect, useRef, useCallback } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, collection, query, where, orderBy, limit, getDocs, onSnapshot, serverTimestamp, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ─── FIREBASE CONFIG ──────────────────────────────────────────────────────────
// Replace these values with your Firebase project config
// Get from: https://console.firebase.google.com → Your Project → Settings → Web App

const firebaseConfig = {
  apiKey: "AIzaSyCdjsy9rF3a9yQMK9T7el980wnrQyO1Atk",
  authDomain: "rank-achievers.firebaseapp.com",
  projectId: "rank-achievers",
  storageBucket: "rank-achievers.firebasestorage.app",
  messagingSenderId: "945705830932",
  appId: "1:945705830932:web:6f373103a09fbd2512b501"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const gProvider = new GoogleAuthProvider();

// ─── ADMIN EMAIL ──────────────────────────────────────────────────────────────
// Admin email — used only for role detection, NOT for login
// Admin account must be created manually in Firebase Console
const ADMIN_EMAIL = "nkhadar@gmail.com";

// ─── EXAM TYPES ───────────────────────────────────────────────────────────────
// ── Default exam types (fallback if Firestore not loaded yet) ──
const DEFAULT_EXAM_TYPES = [
  { id:"ssc",      label:"SSC",      fullName:"Staff Selection Commission", icon:"🏛️", color:"#FF6A00", bg:"#fff5ee", desc:"CGL · CHSL · MTS · CPO · GD Constable",
    topics:[{id:"ssc_arith",name:"Arithmetic",icon:"➕"},{id:"ssc_alg",name:"Algebra",icon:"🔣"},{id:"ssc_num",name:"Number System",icon:"🔢"},{id:"ssc_simp",name:"Simplification",icon:"✖️"},{id:"ssc_di",name:"Data Interpretation",icon:"📊"},{id:"ssc_geo",name:"Geometry",icon:"📐"}]},
  { id:"banking",  label:"Banking",  fullName:"Banking & Insurance",        icon:"🏦", color:"#1d4ed8", bg:"#eff6ff", desc:"IBPS PO · SBI PO · RBI · NABARD · LIC",
    topics:[{id:"bnk_qa",name:"Quantitative Aptitude",icon:"🔢"},{id:"bnk_da",name:"Data Analysis",icon:"📊"},{id:"bnk_re",name:"Reasoning",icon:"🧠"},{id:"bnk_en",name:"English",icon:"📝"},{id:"bnk_ga",name:"General Awareness",icon:"🌍"},{id:"bnk_cp",name:"Computer Knowledge",icon:"💻"}]},
  { id:"railways", label:"Railways", fullName:"Indian Railways",            icon:"🚂", color:"#16a34a", bg:"#f0fdf4", desc:"RRB NTPC · Group D · ALP · JE",
    topics:[{id:"rly_ma",name:"Mathematics",icon:"📐"},{id:"rly_gi",name:"General Intelligence",icon:"🧩"},{id:"rly_sc",name:"General Science",icon:"🔬"},{id:"rly_ga",name:"General Awareness",icon:"🌍"},{id:"rly_re",name:"Reasoning",icon:"🧠"},{id:"rly_te",name:"Technical Ability",icon:"⚙️"}]}
];

// Global mutable exam types — updated from Firestore
let EXAM_TYPES = [...DEFAULT_EXAM_TYPES];

// Hook to load exam types from Firestore and sync globally
function useExamTypes(){
  const [examTypes,setExamTypes]=useState(DEFAULT_EXAM_TYPES);
  useEffect(()=>{
    const snap=onSnapshot(doc(db,"settings","examTypes"),d=>{
      if(d.exists()&&d.data().types?.length>0){
        const loaded=d.data().types;
        EXAM_TYPES=loaded;
        setExamTypes(loaded);
      }
    });
    return snap;
  },[]);
  return examTypes;
}

// Save exam types to Firestore
async function saveExamTypes(types){
  await setDoc(doc(db,"settings","examTypes"),{types});
  EXAM_TYPES=types;
}

const DIFFS  = ["easy","medium","hard"];
const DCOL   = {easy:"#22c55e",medium:"#f59e0b",hard:"#ef4444"};
const DBG    = {easy:"#f0fdf4",medium:"#fffbeb",hard:"#fef2f2"};
const fmtT   = s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

// ─── RESPONSIVE HOOK ─────────────────────────────────────────────────────────
function useMobile(){
  const [mobile,setMobile]=useState(window.innerWidth<=768);
  useEffect(()=>{
    const handler=()=>setMobile(window.innerWidth<=768);
    window.addEventListener("resize",handler);
    return()=>window.removeEventListener("resize",handler);
  },[]);
  return mobile;
}

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component{
  constructor(props){super(props);this.state={hasError:false,error:null};}
  static getDerivedStateFromError(error){return{hasError:true,error};}
  componentDidCatch(error,info){console.error("App error:",error,info);}
  render(){
    if(this.state.hasError){
      return(
        <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#000",gap:20,padding:32,textAlign:"center"}}>
          <div style={{fontSize:48}}>⚠️</div>
          <div style={{color:"#fff",fontWeight:700,fontSize:18}}>Something went wrong</div>
          <div style={{color:"#888",fontSize:13,maxWidth:400}}>{this.state.error?.message||"An unexpected error occurred."}</div>
          <button onClick={()=>window.location.reload()} style={{padding:"10px 28px",borderRadius:10,border:"none",background:"#FF6A00",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:8}}>Reload App</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
const IS = {width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #f0f0f0",fontSize:14,marginBottom:6,outline:"none",boxSizing:"border-box",fontFamily:"inherit",background:"#fff"};
const LS = {display:"block",fontSize:12,fontWeight:700,color:"#444",marginBottom:5};
const ES = {color:"#dc2626",fontSize:12,marginBottom:10,marginTop:-2,paddingLeft:4};

function Err({m}){return m?<div style={ES}>⚠ {m}</div>:null;}

function PwdInput({value,onChange,placeholder}){
  const [show,setShow]=useState(false);
  return(
    <div style={{position:"relative",marginBottom:6}}>
      <input type={show?"text":"password"} value={value} onChange={onChange} placeholder={placeholder||"Password"} style={{...IS,marginBottom:0,paddingRight:44}}/>
      <button type="button" onClick={()=>setShow(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#888"}}>{show?"🙈":"👁️"}</button>
    </div>
  );
}

function Logo({white=false}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:40,height:40,background:"linear-gradient(135deg,#FF6A00,#ff9a00)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:18,boxShadow:"0 2px 12px #FF6A0060"}}>RA</div>
      <div>
        <div style={{fontWeight:800,fontSize:15,color:white?"#fff":"#000",lineHeight:1.1}}>Rank Achievers</div>
        <div style={{fontSize:10,color:"#FF6A00",fontWeight:700,letterSpacing:1}}>ACADEMY · ANANTAPUR</div>
      </div>
    </div>
  );
}

function Spinner({size=24,color="#FF6A00"}){
  return(
    <div style={{width:size,height:size,border:`3px solid ${color}30`,borderTop:`3px solid ${color}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
  );
}

// ─── FIREBASE HOOKS ───────────────────────────────────────────────────────────

function useAuth(){
  const [user,setUser]=useState(undefined); // undefined=loading, null=logged out
  const [justLoggedIn,setJustLoggedIn]=useState(false);
  const prevUid=useRef(null);

  useEffect(()=>{
    const unsub=onAuthStateChanged(auth, async fbUser=>{
      if(!fbUser){
        prevUid.current=null;
        setUser(null);
        return;
      }
      // detect new login (uid changed from null/different)
      const isNewLogin = prevUid.current !== fbUser.uid;
      prevUid.current = fbUser.uid;

      try {
        const snap=await getDoc(doc(db,"users",fbUser.uid));
        let profile;
        if(snap.exists()){
          profile={uid:fbUser.uid,...snap.data()};
          // Sync latest Google photo
          if(fbUser.photoURL && profile.photoURL !== fbUser.photoURL){
            await updateDoc(doc(db,"users",fbUser.uid),{photoURL:fbUser.photoURL});
            profile.photoURL=fbUser.photoURL;
          }
        } else {
          // Role always "student" from frontend — admin set manually in Firestore
          profile={uid:fbUser.uid,name:fbUser.displayName||fbUser.email.split("@")[0],email:fbUser.email,role:"student",photoURL:fbUser.photoURL||null,googleLogin:true,createdAt:serverTimestamp(),accessEnabled:false};
          await setDoc(doc(db,"users",fbUser.uid),profile);
        }
        setUser(profile);
        if(isNewLogin) setJustLoggedIn(true);
      } catch(e){
        console.error("Auth profile error:",e);
        setUser(null);
      }
    });
    return unsub;
  },[]);
  return {user, justLoggedIn, clearJustLoggedIn:()=>setJustLoggedIn(false)};
}

async function loginGoogle(){
  const result=await signInWithPopup(auth,gProvider);
  return result.user;
}

async function loginEmail(email,password){
  const result=await signInWithEmailAndPassword(auth,email,password);
  return result.user;
}

async function registerEmail(email,password,name,phone){
  // Role is ALWAYS student from frontend — admin is set manually in Firebase Console
  const result=await createUserWithEmailAndPassword(auth,email,password);
  await updateProfile(result.user,{displayName:name});
  const profile={uid:result.user.uid,name,email,phone:phone||"",role:"student",googleLogin:false,createdAt:serverTimestamp(),accessEnabled:false};
  await setDoc(doc(db,"users",result.user.uid),profile);
  return result.user;
}

async function logout(){
  await signOut(auth);
}

// Settings helpers
async function getSettings(){
  const snap=await getDoc(doc(db,"settings","global"));
  return snap.exists()?snap.data():{contentMode:"free"};
}
async function setSettings(data){
  await setDoc(doc(db,"settings","global"),data,{merge:true});
}

// Check if user has content access
async function checkAccess(uid){
  const snap=await getDoc(doc(db,"users",uid));
  if(!snap.exists()) return false;
  const d=snap.data();
  if(d.role==="admin") return true;
  const st=await getSettings();
  if(st.contentMode==="free") return true;
  return !!d.accessEnabled;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function NavBar({page,setPage,user,examType,setExamType,showNotifPanel,setShowNotifPanel,unreadCount,setUnreadCount,notices}){
  const [menuOpen,setMenuOpen]=useState(false);
  const isMobile=window.innerWidth<=768;
  return(
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"#fff",borderBottom:"2px solid #FF6A00",padding:"0 16px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 2px 16px #FF6A0015"}}>
        <button onClick={()=>{setPage("home");setMenuOpen(false);}} style={{background:"none",border:"none",cursor:"pointer"}}><Logo/></button>

        {/* Desktop nav */}
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"nowrap"}} className="desktop-nav">
          {user && EXAM_TYPES.map(e=>(
            <button key={e.id} onClick={()=>{setExamType(e.id);setPage("tests");}} style={{padding:"5px 10px",borderRadius:20,border:"2px solid",borderColor:examType===e.id?e.color:"#e0e0e0",background:examType===e.id?e.color:"#fff",color:examType===e.id?"#fff":"#555",fontWeight:700,fontSize:11,cursor:"pointer",display:isMobile?"none":"flex"}}>{e.icon} {e.label}</button>
          ))}
          {!isMobile&&["home","leaderboard"].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",background:page===p?"#FF6A00":"transparent",color:page===p?"#fff":"#000",fontWeight:700,fontSize:13}}>{p==="leaderboard"?"🏆":p.charAt(0).toUpperCase()+p.slice(1)}</button>
          ))}
          {user?(
            <>
              {!isMobile&&<button onClick={()=>setPage("dashboard")} style={{padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",background:page==="dashboard"?"#FF6A00":"#fff0e6",color:page==="dashboard"?"#fff":"#FF6A00",fontWeight:700,fontSize:13}}>Dashboard</button>}
              {!isMobile&&user.role==="admin"&&<button onClick={()=>setPage("admin")} style={{padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",background:page==="admin"?"#000":"#f0f0f0",color:page==="admin"?"#fff":"#000",fontWeight:700,fontSize:13}}>⚙️ Admin</button>}
              <button onClick={()=>{setShowNotifPanel(p=>!p);localStorage.setItem("ra_last_notice",Date.now().toString());setUnreadCount&&setUnreadCount(0);}} style={{position:"relative",background:"none",border:"none",cursor:"pointer",fontSize:22,padding:"4px 6px",lineHeight:1}}>
                🔔{unreadCount>0&&<span style={{position:"absolute",top:-2,right:-2,background:"#ef4444",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #fff"}}>{unreadCount}</span>}
              </button>
              <button onClick={()=>{setPage("profile");setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px 4px 4px",borderRadius:24,border:"2px solid #f0f0f0",background:"#fff",cursor:"pointer"}}>
                {user.photoURL?<img src={user.photoURL} alt="" style={{width:26,height:26,borderRadius:"50%"}}/>:<div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff"}}>{user.name?.charAt(0).toUpperCase()}</div>}
                {!isMobile&&<span style={{fontWeight:700,fontSize:12,color:"#000"}}>{user.name?.split(" ")[0]}</span>}
              </button>
            </>
          ):(
            <button onClick={()=>setPage("auth")} style={{padding:"6px 16px",borderRadius:8,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>Login</button>
          )}
          {/* Hamburger — mobile only */}
          {isMobile&&<button onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontSize:24,padding:"4px",color:"#000",marginLeft:4}}>{menuOpen?"✕":"☰"}</button>}
        </div>
      </nav>

      {/* Mobile Slide-down Menu */}
      {isMobile&&menuOpen&&(
        <div style={{position:"fixed",top:60,left:0,right:0,background:"#fff",zIndex:99,borderBottom:"2px solid #FF6A00",padding:"16px",boxShadow:"0 8px 24px #00000020"}}>
          {/* Exam types */}
          {user&&(
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#888",marginBottom:8,letterSpacing:1}}>CHOOSE EXAM</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {EXAM_TYPES.map(e=>(
                  <button key={e.id} onClick={()=>{setExamType(e.id);setPage("tests");setMenuOpen(false);}} style={{padding:"8px 16px",borderRadius:20,border:"2px solid",borderColor:examType===e.id?e.color:"#e0e0e0",background:examType===e.id?e.color:"#fff",color:examType===e.id?"#fff":"#555",fontWeight:700,fontSize:13,cursor:"pointer"}}>{e.icon} {e.label}</button>
                ))}
              </div>
            </div>
          )}
          {/* Nav links */}
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {[
              {l:"🏠 Home",p:"home"},
              {l:"📝 Practice Tests",p:"tests"},
              {l:"🏆 Leaderboard",p:"leaderboard"},
              ...(user?[{l:"📊 Dashboard",p:"dashboard"}]:[]),
              ...(user?.role==="admin"?[{l:"⚙️ Admin Panel",p:"admin"}]:[]),
            ].map(item=>(
              <button key={item.p} onClick={()=>{setPage(item.p);setMenuOpen(false);}} style={{padding:"12px 16px",borderRadius:10,border:"none",background:page===item.p?"#FF6A00":"#f8f8f8",color:page===item.p?"#fff":"#000",fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"left"}}>
                {item.l}
              </button>
            ))}
            {!user&&<button onClick={()=>{setPage("auth");setMenuOpen(false);}} style={{padding:"12px 16px",borderRadius:10,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",textAlign:"left",marginTop:8}}>Login / Register</button>}
            {user&&<button onClick={()=>{setPage("profile");setMenuOpen(false);}} style={{padding:"12px 16px",borderRadius:10,border:"none",background:"#f8f8f8",color:"#000",fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"left"}}>👤 {user.name?.split(" ")[0]} (Profile)</button>}
          </div>
        </div>
      )}
    </>
  );
}

// ─── NOTICE MODAL (shown after login) ─────────────────────────────────────────
function NoticeModal({notices, onClose}){
  const [idx,setIdx]=useState(0);
  const n=notices[idx];
  if(!n) return null;
  return(
    <div style={{position:"fixed",inset:0,background:"#00000095",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,maxWidth:520,width:"100%",overflow:"hidden",boxShadow:"0 24px 80px #00000060"}}>
        {/* Header */}
        <div style={{background:"linear-gradient(135deg,#FF6A00,#ff9a00)",padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:"#fff",fontWeight:900,fontSize:18}}>📢 Announcement</div>
            <div style={{color:"rgba(255,255,255,.8)",fontSize:12,marginTop:2}}>Rank Achievers Academy · Anantapur</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:"50%",width:32,height:32,color:"#fff",fontWeight:900,cursor:"pointer",fontSize:16}}>✕</button>
        </div>
        {/* Body */}
        <div style={{padding:"28px 28px 20px"}}>
          {n.imageUrl&&<img src={n.imageUrl} alt="notice" style={{width:"100%",borderRadius:12,marginBottom:20,objectFit:"cover",maxHeight:200}}/>}
          <div style={{fontWeight:900,fontSize:20,marginBottom:10,color:"#000"}}>{n.title}</div>
          <p style={{color:"#555",lineHeight:1.7,fontSize:15,margin:0}}>{n.body}</p>
          {n.link&&<a href={n.link} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:16,padding:"10px 24px",borderRadius:10,background:"#FF6A00",color:"#fff",fontWeight:800,textDecoration:"none",fontSize:14}}>Learn More →</a>}
        </div>
        {/* Footer */}
        <div style={{padding:"12px 24px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:12,color:"#aaa"}}>{idx+1} of {notices.length}</div>
          <div style={{display:"flex",gap:10}}>
            {notices.length>1&&idx<notices.length-1&&(
              <button onClick={()=>setIdx(i=>i+1)} style={{padding:"9px 20px",borderRadius:10,border:"2px solid #FF6A00",background:"#fff",color:"#FF6A00",fontWeight:700,cursor:"pointer",fontSize:13}}>Next →</button>
            )}
            <button onClick={()=>{localStorage.setItem("ra_last_notice",Date.now().toString());onClose();}} style={{padding:"9px 20px",borderRadius:10,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:13}}>Got it ✓</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATION BELL PANEL ───────────────────────────────────────────────────
function NotifPanel({notices,onClose}){
  return(
    <div style={{position:"fixed",top:68,right:16,width:340,maxHeight:480,background:"#fff",borderRadius:16,boxShadow:"0 8px 40px #00000025",border:"2px solid #f0f0f0",zIndex:9998,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"14px 18px",borderBottom:"2px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontWeight:900,fontSize:15}}>📢 Announcements</div>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#888"}}>✕</button>
      </div>
      <div style={{overflowY:"auto",flex:1}}>
        {notices.length===0
          ?<div style={{padding:32,textAlign:"center",color:"#aaa"}}>No announcements yet</div>
          :notices.map((n,i)=>(
            <div key={n.id||i} style={{padding:"14px 18px",borderBottom:"1px solid #f8f8f8"}}>
              <div style={{fontWeight:800,fontSize:14,marginBottom:4}}>{n.title}</div>
              <div style={{fontSize:13,color:"#666",lineHeight:1.5}}>{n.body}</div>
              {n.link&&<a href={n.link} target="_blank" rel="noreferrer" style={{fontSize:12,color:"#FF6A00",fontWeight:700,textDecoration:"none"}}>Read more →</a>}
              <div style={{fontSize:11,color:"#ccc",marginTop:6}}>{n.createdAt?.seconds?new Date(n.createdAt.seconds*1000).toLocaleDateString("en-IN"):""}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function AuthPage({onLogin}){
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const handleGoogle=async()=>{
    setLoading(true);setError("");
    try{
      await loginGoogle();
      onLogin();
    }catch(err){
      const msg=err.code==="auth/popup-closed-by-user"?"Popup closed. Please try again."
        :err.code==="auth/cancelled-popup-request"?"Please try again."
        :err.code==="auth/unauthorized-domain"?"Domain not authorized. Contact admin."
        :err.code==="auth/network-request-failed"?"No internet connection."
        :"Login failed. Please try again.";
      setError(msg);
    }finally{setLoading(false);}
  };

  return(
    <div style={{paddingTop:60,minHeight:"100vh",background:"linear-gradient(135deg,#000 0%,#1a0800 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:window.innerWidth<=768?"70px 20px 40px":"80px 20px 40px"}}>
      {/* Background grid */}
      <div style={{position:"fixed",inset:0,opacity:.04,backgroundImage:"linear-gradient(#FF6A00 1px,transparent 1px),linear-gradient(90deg,#FF6A00 1px,transparent 1px)",backgroundSize:"36px 36px",pointerEvents:"none"}}/>
      {/* Glow orbs */}
      <div style={{position:"fixed",top:-100,left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(#FF6A0018,transparent 70%)",pointerEvents:"none"}}/>

      <div style={{position:"relative",width:"100%",maxWidth:420,animation:"raFadeUp .6s ease both"}}>
        {/* Card */}
        <div style={{background:"#0d0d0d",borderRadius:24,padding:"40px 36px",border:"1px solid #FF6A0030",boxShadow:"0 24px 80px #00000080"}}>

          {/* Logo */}
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{width:64,height:64,borderRadius:18,background:"linear-gradient(135deg,#FF6A00,#ff9a00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#fff",margin:"0 auto 16px",boxShadow:"0 8px 32px #FF6A0060"}}>RA</div>
            <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6}}>Rank Achievers</div>
            <div style={{fontSize:12,color:"#FF6A00",fontWeight:700,letterSpacing:"0.15em"}}>ACADEMY · ANANTAPUR</div>
            <div style={{marginTop:12,fontSize:14,color:"#555"}}>Sign in to start your preparation</div>
          </div>

          {/* Error */}
          {error&&(
            <div style={{background:"#1a0000",border:"1px solid #ef444440",borderRadius:12,padding:"12px 16px",marginBottom:20,fontSize:13,color:"#f87171",display:"flex",alignItems:"center",gap:8}}>
              <span>⚠️</span>{error}
            </div>
          )}

          {/* Google Button */}
          <button onClick={handleGoogle} disabled={loading} style={{width:"100%",padding:"16px 0",borderRadius:14,border:"1px solid #2a2a2a",background:loading?"#111":"#161616",color:"#fff",fontSize:15,fontWeight:600,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:12,transition:"all .2s",boxShadow:loading?"none":"0 4px 24px #00000040"}}
            onMouseOver={e=>{if(!loading){e.currentTarget.style.background="#1e1e1e";e.currentTarget.style.borderColor="#FF6A0060";e.currentTarget.style.boxShadow="0 8px 32px #FF6A0025";}}}
            onMouseOut={e=>{if(!loading){e.currentTarget.style.background="#161616";e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.boxShadow="0 4px 24px #00000040";}}}>
            {loading?(
              <Spinner size={20} color="#FF6A00"/>
            ):(
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.5 1.2 8.9 3.2l6.6-6.6C35.4 2.5 30.1 0 24 0 14.8 0 7 5.4 3.2 13.2l7.7 6C12.7 13.2 17.9 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.1-10 6.1-17z"/>
                <path fill="#FBBC05" d="M10.9 28.8A14.7 14.7 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8l-7.7-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l8.3-6z"/>
                <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.4 2.2-6.1 0-11.3-3.7-13.1-9.1l-8.3 6C7 42.6 14.8 48 24 48z"/>
              </svg>
            )}
            <span>{loading?"Signing in...":"Continue with Google"}</span>
          </button>

          {/* Features */}
          <div style={{marginTop:28,display:"flex",flexDirection:"column",gap:10}}>
            {[
              {i:"⚡",t:"Instant login","d":"No registration, no password needed"},
              {i:"☁️",t:"Auto sync","d":"Your scores saved across all devices"},
              {i:"🔒",t:"Secure","d":"Powered by Google authentication"},
            ].map(f=>(
              <div key={f.t} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,background:"#111",border:"1px solid #1a1a1a"}}>
                <span style={{fontSize:18,flexShrink:0}}>{f.i}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{f.t}</div>
                  <div style={{fontSize:11,color:"#555"}}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{marginTop:24,textAlign:"center",fontSize:11,color:"#333"}}>
            SSC · Banking · Railways Practice Platform
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── HOME PAGE ────────────────────────────────────────────────────────────────
// ─── CSS KEYFRAMES ────────────────────────────────────────────────────────────
const _heroStyle = document.createElement("style");
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
if(!document.getElementById("ra-hero-css")) document.head.appendChild(_heroStyle);

// ─── HERO ANIMATION ────────────────────────────────────────────────────────────
function HeroAnimation({isMobile}){
  const [step,setStep]    = useState(0);
  const [visible,setVisible] = useState(false);
  const [typed,setTyped]  = useState(0);
  const [autoPlay,setAutoPlay] = useState(true);
  const autoRef = useRef(null);

  const STEPS = [
    { id:0, icon:"🔐", label:"Login",        color:"#FF6A00", sub:"Google or email — instant access" },
    { id:1, icon:"🎯", label:"Choose Exam",   color:"#1d4ed8", sub:"SSC · Banking · Railways" },
    { id:2, icon:"📚", label:"Pick Topic",    color:"#16a34a", sub:"6 topics · 3 difficulty levels" },
    { id:3, icon:"⚙️", label:"Select Mode",   color:"#7c3aed", sub:"Timed 30-min or Practice" },
    { id:4, icon:"✏️", label:"Take the Exam", color:"#FF6A00", sub:"30 questions · live timer" },
    { id:5, icon:"📊", label:"View Results",  color:"#059669", sub:"Score · accuracy · time analysis" },
    { id:6, icon:"💡", label:"Solutions",     color:"#d97706", sub:"Step-by-step + YouTube video" },
    { id:7, icon:"🏆", label:"Dashboard",     color:"#dc2626", sub:"Cloud progress + leaderboard" },
  ];

  const startAuto=useCallback(()=>{
    clearInterval(autoRef.current);
    autoRef.current=setInterval(()=>setStep(s=>(s+1)%STEPS.length),2800);
  },[]);

  useEffect(()=>{
    setTimeout(()=>setVisible(true),80);
    startAuto();
    return()=>clearInterval(autoRef.current);
  },[]);

  useEffect(()=>{
    setTyped(0);
    const iv=setInterval(()=>setTyped(t=>t<STEPS[step].label.length?t+1:t),55);
    return()=>clearInterval(iv);
  },[step]);

  const goTo=i=>{
    setStep(i);
    clearInterval(autoRef.current);
    autoRef.current=setInterval(()=>setStep(s=>(s+1)%STEPS.length),2800);
  };

  const cur = STEPS[step];

  return(
    <div style={{width:"100%",maxWidth:560,opacity:visible?1:0,transition:"opacity .7s ease",animation:visible?"raFadeUp .7s ease both":"none"}}>

      {/* ═══ MAIN HERO CARD ═══ */}
      <div className="ra-step-card" style={{background:"#0c0c0c",borderRadius:24,overflow:"hidden",border:`1px solid ${cur.color}30`,marginBottom:16,position:"relative",minHeight:420,transition:"border-color .4s ease"}}>

        {/* Animated background orbs */}
        <div style={{position:"absolute",top:-60,right:-60,width:280,height:280,borderRadius:"50%",background:`radial-gradient(circle,${cur.color}18,transparent 70%)`,animation:"raOrb 8s ease-in-out infinite",pointerEvents:"none",transition:"background .5s"}}/>
        <div style={{position:"absolute",bottom:-80,left:-40,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,#1d4ed815,transparent 70%)",animation:"raOrb 11s ease-in-out infinite reverse",pointerEvents:"none"}}/>

        {/* Progress bar */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"#111",zIndex:2}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${cur.color},${cur.color}bb)`,transition:"width .6s cubic-bezier(.4,0,.2,1)",width:`${((step+1)/STEPS.length)*100}%`}}/>
        </div>

        {/* Step dots */}
        <div style={{position:"absolute",top:12,left:0,right:0,display:"flex",justifyContent:"center",gap:6,zIndex:2}}>
          {STEPS.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{width:i===step?20:6,height:6,borderRadius:3,background:i===step?cur.color:i<step?cur.color+"60":"#222",transition:"all .3s ease",cursor:"pointer"}}/>
          ))}
        </div>

        {/* Content area */}
        <div style={{padding:"40px 32px 32px",position:"relative",zIndex:1}}>

          {/* Step header */}
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
            {/* Icon with pulse ring */}
            <div style={{width:64,height:64,borderRadius:18,background:`linear-gradient(135deg,${cur.color},${cur.color}aa)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0,animation:"raDrift 3.5s ease-in-out infinite",boxShadow:`0 8px 32px ${cur.color}50`,transition:"background .4s,box-shadow .4s"}}>
              {cur.icon}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",color:cur.color,marginBottom:6,transition:"color .4s"}}>
                STEP {step+1} OF {STEPS.length}
              </div>
              {/* Typewriter title */}
              <div style={{fontSize:28,fontWeight:900,color:"#fff",lineHeight:1.1,display:"flex",alignItems:"center",gap:4}}>
                <span style={{overflow:"hidden",whiteSpace:"nowrap"}}>
                  {cur.label.substring(0,typed)}
                </span>
                <span style={{display:"inline-block",width:2,height:28,background:cur.color,borderRadius:2,animation:"raBlink 1s step-end infinite",transition:"background .4s"}}/>
              </div>
              <div style={{fontSize:13,color:"#555",marginTop:4}}>{cur.sub}</div>
            </div>
          </div>

          {/* ── STEP CONTENT PANELS ── */}

          {/* STEP 0: Login */}
          {step===0&&(
            <div style={{animation:"raSlideIn .4s ease"}}>
              <div style={{background:"#141414",borderRadius:16,padding:20,border:"1px solid #1e1e1e"}}>
                <div style={{display:"flex",gap:10,marginBottom:12}}>
                  <div style={{flex:1,background:"#0d0d0d",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#888",border:"1px solid #1e1e1e"}}>📧 email@gmail.com</div>
                  <div style={{background:"linear-gradient(90deg,#FF6A00,#ff9a00)",borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700,color:"#fff",whiteSpace:"nowrap",boxShadow:"0 4px 20px #FF6A0050"}}>Login →</div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",background:"#0d0d0d",borderRadius:10,padding:"10px 14px",border:"1px solid #1e1e1e"}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:"linear-gradient(135deg,#4285f4,#34a853,#fbbc05,#ea4335)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",flexShrink:0}}>G</div>
                  <span style={{fontSize:13,color:"#777"}}>Continue with Google</span>
                </div>
                <div style={{marginTop:12,padding:"8px 12px",background:"#FF6A0010",borderRadius:8,border:"1px solid #FF6A0020"}}>
                  <div style={{fontSize:10,color:"#666"}}>✓ 8+ chars &nbsp;✓ Uppercase &nbsp;✓ Number &nbsp;✓ Symbol</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Choose Exam */}
          {step===1&&(
            <div style={{animation:"raSlideIn .4s ease",display:"flex",flexDirection:"column",gap:10}}>
              {[{l:"SSC",c:"#FF6A00",i:"🏛️",d:"CGL · CHSL · MTS · CPO",sel:true},{l:"Banking",c:"#1d4ed8",i:"🏦",d:"IBPS PO · SBI · RBI · LIC"},{l:"Railways",c:"#16a34a",i:"🚂",d:"NTPC · Group D · ALP"}].map(e=>(
                <div key={e.l} style={{background:e.sel?`linear-gradient(135deg,${e.c}22,${e.c}11)`:"#0f0f0f",borderRadius:14,padding:"14px 16px",border:`1.5px solid ${e.sel?e.c+"80":"#1a1a1a"}`,display:"flex",alignItems:"center",gap:14,transition:"all .3s"}}>
                  <div style={{width:40,height:40,borderRadius:11,background:e.c+"20",border:`1px solid ${e.c}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{e.i}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:15,color:e.sel?e.c:"#555"}}>{e.l}</div>
                    <div style={{fontSize:11,color:"#444"}}>{e.d}</div>
                  </div>
                  {e.sel&&<div style={{background:e.c,borderRadius:20,padding:"3px 12px",fontSize:10,fontWeight:700,color:"#fff"}}>Selected ✓</div>}
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: Pick Topic */}
          {step===2&&(
            <div style={{animation:"raSlideIn .4s ease"}}>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
                {[{n:"➕ Arithmetic",s:true},{n:"🔣 Algebra"},{n:"🔢 Number System"},{n:"✖️ Simplification"},{n:"📊 Data Interpretation"},{n:"📐 Geometry"}].map(t=>(
                  <div key={t.n} style={{padding:"7px 13px",borderRadius:20,background:t.s?"#FF6A00":"#111",border:`1px solid ${t.s?"#FF6A00":"#222"}`,color:t.s?"#fff":"#555",fontSize:11,fontWeight:t.s?700:400}}>{t.n}</div>
                ))}
              </div>
              <div style={{display:"flex",gap:10}}>
                {[{d:"Easy",c:"#22c55e",n:30},{d:"Medium",c:"#f59e0b",n:30},{d:"Hard",c:"#ef4444",n:30}].map(d=>(
                  <div key={d.d} style={{flex:1,background:`${d.c}10`,borderRadius:12,padding:"14px 10px",textAlign:"center",border:`1px solid ${d.c}30`}}>
                    <div style={{fontSize:16,fontWeight:900,color:d.c}}>{d.n}</div>
                    <div style={{fontSize:10,color:d.c+"aa",fontWeight:700,marginTop:2}}>{d.d}</div>
                    <div style={{fontSize:9,color:"#444",marginTop:2}}>questions</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Select Mode */}
          {step===3&&(
            <div style={{animation:"raSlideIn .4s ease",display:"flex",gap:12}}>
              <div style={{flex:1,background:"#FF6A0012",borderRadius:16,padding:"20px 16px",border:"1.5px solid #FF6A0050",textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:8}}>⏱️</div>
                <div style={{fontWeight:800,fontSize:15,color:"#FF6A00",marginBottom:4}}>Timed Mode</div>
                <div style={{fontSize:11,color:"#666",marginBottom:12}}>30-minute countdown<br/>Auto-submit on timeout</div>
                <div style={{background:"#FF6A00",borderRadius:20,padding:"5px 0",fontSize:11,fontWeight:700,color:"#fff",animation:"raPulseRing 2s ease-in-out infinite"}}>Selected ✓</div>
              </div>
              <div style={{flex:1,background:"#111",borderRadius:16,padding:"20px 16px",border:"1px solid #1e1e1e",textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:8}}>🧘</div>
                <div style={{fontWeight:800,fontSize:15,color:"#444",marginBottom:4}}>Practice Mode</div>
                <div style={{fontSize:11,color:"#333",marginBottom:12}}>No time limit<br/>Per-question stopwatch</div>
                <div style={{background:"#1a1a1a",borderRadius:20,padding:"5px 0",fontSize:11,color:"#444"}}>Select →</div>
              </div>
            </div>
          )}

          {/* STEP 4: Take Exam */}
          {step===4&&(
            <div style={{animation:"raSlideIn .4s ease"}}>
              <div style={{background:"#080808",borderRadius:16,overflow:"hidden",border:"1px solid #1a1a1a"}}>
                {/* Exam header */}
                <div style={{background:"#000",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:12,fontWeight:700,color:"#ccc"}}>🏛️ Arithmetic – Test 1</span>
                  <div style={{display:"flex",gap:6}}>
                    <span style={{background:"#22c55e",color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700,fontFamily:"monospace"}}>⏱ 28:34</span>
                    <span style={{background:"#1e293b",color:"#94a3b8",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700,fontFamily:"monospace"}}>🕐 01:12</span>
                  </div>
                </div>
                <div style={{padding:"16px"}}>
                  <div style={{fontSize:13,color:"#bbb",marginBottom:12,lineHeight:1.5,fontWeight:600}}>Q.7: If the sum of two numbers is 24 and their difference is 8, find their product.</div>
                  {[{o:"A",t:"118"},{o:"B",t:"128",sel:true},{o:"C",t:"138"},{o:"D",t:"148"}].map(opt=>(
                    <div key={opt.o} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:9,marginBottom:6,border:`1px solid ${opt.sel?"#FF6A00":"#1a1a1a"}`,background:opt.sel?"#FF6A0012":"transparent",cursor:"pointer"}}>
                      <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${opt.sel?"#FF6A00":"#333"}`,background:opt.sel?"#FF6A00":"transparent",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {opt.sel&&<div style={{width:6,height:6,borderRadius:"50%",background:"#fff"}}/>}
                      </div>
                      <span style={{fontSize:12,color:opt.sel?"#FF6A00":"#555",fontWeight:opt.sel?700:400}}>{opt.o}. {opt.t} {opt.sel?"✓":""}</span>
                    </div>
                  ))}
                  {/* Palette strip */}
                  <div style={{display:"flex",gap:4,marginTop:12,flexWrap:"wrap"}}>
                    {Array.from({length:10},(_,i)=>(
                      <div key={i} style={{width:28,height:28,borderRadius:6,background:i<6?"#22c55e":i===6?"#ef4444":i===7?"#FF6A00":"#1e1e1e",border:i===6?"2px solid #000":"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff"}}>{i+1}</div>
                    ))}
                    <div style={{fontSize:9,color:"#333",alignSelf:"center",marginLeft:4}}>+20 more →</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Results */}
          {step===5&&(
            <div style={{animation:"raSlideIn .4s ease"}}>
              <div style={{display:"flex",gap:10,marginBottom:12}}>
                {[{l:"Score",v:"24/30",c:"#FF6A00"},{l:"Accuracy",v:"80%",c:"#22c55e"},{l:"Time",v:"22:16",c:"#f59e0b"}].map(s=>(
                  <div key={s.l} style={{flex:1,background:"#0d0d0d",borderRadius:12,padding:"14px 10px",textAlign:"center",border:"1px solid #1a1a1a"}}>
                    <div style={{fontSize:22,fontWeight:900,color:s.c}}>{s.v}</div>
                    <div style={{fontSize:10,color:"#444",marginTop:3}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#0d0d0d",borderRadius:12,padding:"14px 16px",border:"1px solid #1a1a1a",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:11,color:"#555"}}>Performance</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#FF6A00"}}>80%</span>
                </div>
                <div style={{background:"#1a1a1a",borderRadius:4,height:8,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:4,background:"linear-gradient(90deg,#FF6A00,#ff9a00)","--pct":"80%",animation:"raProgress 1.2s ease both",width:"80%"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:10}}>
                  <span style={{color:"#22c55e"}}>✅ 24 correct</span>
                  <span style={{color:"#ef4444"}}>❌ 6 wrong</span>
                  <span style={{color:"#555"}}>⬜ 0 skipped</span>
                </div>
              </div>
              {/* Top slow Qs */}
              <div style={{fontSize:10,color:"#444",marginBottom:6}}>⏰ Slowest questions:</div>
              {[{q:7,t:"2m 34s",w:90},{q:13,t:"1m 58s",w:71},{q:22,t:"1m 20s",w:51}].map(r=>(
                <div key={r.q} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                  <span style={{fontSize:10,color:"#555",width:36}}>Q.{r.q}</span>
                  <div style={{flex:1,background:"#0d0d0d",borderRadius:3,height:5,overflow:"hidden"}}>
                    <div style={{height:"100%",width:r.w+"%",background:"#ef4444",borderRadius:3}}/>
                  </div>
                  <span style={{fontSize:10,color:"#ef4444",width:52,textAlign:"right"}}>{r.t}</span>
                </div>
              ))}
            </div>
          )}

          {/* STEP 6: Solutions */}
          {step===6&&(
            <div style={{animation:"raSlideIn .4s ease"}}>
              <div style={{display:"flex",gap:6,marginBottom:12}}>
                {["All (30)","✅ Correct 24","❌ Wrong 6","⬜ Skipped 0"].map((f,i)=>(
                  <div key={f} style={{padding:"5px 10px",borderRadius:20,background:i===0?"#FF6A00":"#111",border:`1px solid ${i===0?"#FF6A00":"#222"}`,color:i===0?"#fff":"#555",fontSize:10,fontWeight:i===0?700:400,cursor:"pointer"}}>{f}</div>
                ))}
              </div>
              {[{q:7,ok:true,ans:"B. 128",exp:"x+y=24, x-y=8 → x=16, y=8 → 16×8=128"},{q:13,ok:false,ans:"C. 45%",exp:"Profit% = (SP−CP)/CP × 100 = 45%"},{q:3,ok:true,ans:"A. 25%",exp:"SP = 125, CP = 100 → 25% profit"}].map((r,i)=>(
                <div key={i} style={{background:"#0d0d0d",borderRadius:12,padding:"12px 14px",marginBottom:8,border:`1px solid ${r.ok?"#22c55e18":"#ef444418"}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:10,background:r.ok?"#dcfce720":"#fee2e220",color:r.ok?"#22c55e":"#ef4444",borderRadius:6,padding:"2px 8px",fontWeight:700,border:`1px solid ${r.ok?"#22c55e30":"#ef444430"}`}}>{r.ok?"✅":"❌"} Q.{r.q}</span>
                      <span style={{fontSize:11,color:"#888"}}>{r.ans}</span>
                    </div>
                    <span style={{fontSize:13,color:"#FF6A00",cursor:"pointer"}}>▶ Video</span>
                  </div>
                  <div style={{fontSize:10,color:"#555",paddingLeft:2}}>💡 {r.exp}</div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 7: Dashboard */}
          {step===7&&(
            <div style={{animation:"raSlideIn .4s ease"}}>
              {[{e:"SSC",p:80,c:"#FF6A00",i:"🏛️"},{e:"Banking",p:65,c:"#1d4ed8",i:"🏦"},{e:"Railways",p:72,c:"#16a34a",i:"🚂"}].map(s=>(
                <div key={s.e} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:12,color:"#888",display:"flex",alignItems:"center",gap:6}}><span>{s.i}</span>{s.e}</span>
                    <span style={{fontSize:12,fontWeight:700,color:s.c}}>{s.p}%</span>
                  </div>
                  <div style={{background:"#111",borderRadius:6,height:8,overflow:"hidden"}}>
                    <div style={{height:"100%",width:s.p+"%",background:s.c,borderRadius:6,transition:"width 1.2s ease"}}/>
                  </div>
                </div>
              ))}
              <div style={{background:"#080808",borderRadius:14,padding:"14px 16px",border:"1px solid #1a1a1a",marginTop:10}}>
                <div style={{fontSize:11,fontWeight:700,color:"#FF6A00",marginBottom:10}}>🏆 Leaderboard</div>
                {[{r:"🥇",n:"Arjun Sharma",s:93,hl:false},{r:"🥈",n:"Priya Reddy",s:90,hl:false},{r:"🎯",n:"You",s:80,hl:true,rank:"#3"}].map(l=>(
                  <div key={l.n} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #111"}}>
                    <span style={{fontSize:16}}>{l.r}</span>
                    <span style={{flex:1,fontSize:12,color:l.hl?"#FF6A00":"#777",fontWeight:l.hl?800:400}}>{l.n}</span>
                    <span style={{fontSize:12,fontWeight:700,color:l.hl?"#FF6A00":"#555"}}>{l.s}%{l.rank?` (${l.rank})`:""}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:10,padding:"7px 12px",background:"#0a1a0a",borderRadius:8,border:"1px solid #1a2a1a"}}>
                <span style={{fontSize:10,color:"#22c55e"}}>☁️ All scores synced in real-time across all devices</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ STEP CHIPS ═══ */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:isMobile?"center":"flex-start"}}>
        {STEPS.map((s,i)=>(
          <div key={i} className="ra-chip" onClick={()=>goTo(i)} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:20,border:`1px solid ${step===i?s.color+"60":"#1e1e1e"}`,background:step===i?s.color+"18":"#0a0a0a",boxShadow:step===i?`0 0 12px ${s.color}30`:"none"}}>
            <span style={{fontSize:13}}>{s.icon}</span>
            <span style={{fontSize:11,fontWeight:step===i?700:400,color:step===i?s.color:"#444"}}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NOTICE STRIP ────────────────────────────────────────────────────────────
function NoticeStrip({notices,setShowNoticeModal}){
  const [idx,setIdx]=useState(0);
  useEffect(()=>{
    if(notices.length<=1) return;
    const t=setInterval(()=>setIdx(i=>(i+1)%notices.length),3500);
    return()=>clearInterval(t);
  },[notices.length]);
  if(!notices.length) return null;
  const n=notices[idx];
  return(
    <div onClick={()=>setShowNoticeModal&&setShowNoticeModal(true)} style={{background:"rgba(255,106,0,0.08)",borderRadius:12,padding:"10px 14px",border:"1px solid rgba(255,106,0,0.2)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"background .2s"}}
      onMouseOver={e=>e.currentTarget.style.background="rgba(255,106,0,0.14)"}
      onMouseOut={e=>e.currentTarget.style.background="rgba(255,106,0,0.08)"}>
      <span style={{fontSize:16,flexShrink:0}}>📢</span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:12,color:"#FF6A00",marginBottom:1}}>{n.title}</div>
        <div style={{fontSize:11,color:"#888",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.body}</div>
      </div>
      {notices.length>1&&(
        <div style={{display:"flex",gap:3,flexShrink:0}}>
          {notices.map((_,i)=><div key={i} style={{width:i===idx?16:5,height:5,borderRadius:3,background:i===idx?"#FF6A00":"#444",transition:"all .3s"}}/>)}
        </div>
      )}
    </div>
  );
}

// ─── BANNER SLIDER ───────────────────────────────────────────────────────────
function BannerSlider({banners}){
  const [idx,setIdx]=useState(0);
  const timerRef=useRef(null);

  useEffect(()=>{
    if(banners.length<=1) return;
    timerRef.current=setInterval(()=>setIdx(i=>(i+1)%banners.length),4000);
    return()=>clearInterval(timerRef.current);
  },[banners.length]);

  if(!banners.length) return null;
  const b=banners[idx];

  return(
    <div style={{position:"relative",width:"100%",overflow:"hidden",borderRadius:16,marginBottom:24}}>
      {/* Slide */}
      <div style={{
        width:"100%",minHeight:window.innerWidth<=768?160:220,
        background:b.bgColor||"linear-gradient(135deg,#FF6A00,#ff9a00)",
        borderRadius:16,overflow:"hidden",position:"relative",
        display:"flex",alignItems:"center",
        transition:"all .4s ease"
      }}>
        {b.imageUrl?(
          <img src={b.imageUrl} alt={b.title} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,opacity:.5}}/>
        ):null}
        <div style={{position:"relative",padding:window.innerWidth<=768?"20px 20px":"28px 36px",zIndex:1}}>
          {b.badge&&<div style={{display:"inline-block",background:"rgba(255,255,255,.2)",color:"#fff",padding:"4px 14px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10}}>{b.badge}</div>}
          <div style={{fontWeight:900,fontSize:window.innerWidth<=768?"18px":"26px",color:"#fff",lineHeight:1.2,marginBottom:8}}>{b.title}</div>
          <div style={{fontSize:window.innerWidth<=768?12:14,color:"rgba(255,255,255,.85)",lineHeight:1.5,maxWidth:500}}>{b.subtitle}</div>
          {b.btnText&&b.btnLink&&(
            <a href={b.btnLink} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:14,padding:"9px 22px",background:"#fff",color:b.bgColor||"#FF6A00",borderRadius:10,fontWeight:800,fontSize:13,textDecoration:"none"}}>
              {b.btnText} →
            </a>
          )}
        </div>
      </div>

      {/* Dots */}
      {banners.length>1&&(
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:10}}>
          {banners.map((_,i)=>(
            <button key={i} onClick={()=>setIdx(i)} style={{width:i===idx?24:8,height:8,borderRadius:4,border:"none",background:i===idx?"#FF6A00":"#e0e0e0",cursor:"pointer",transition:"all .3s",padding:0}}/>
          ))}
        </div>
      )}

      {/* Arrows */}
      {banners.length>1&&(
        <>
          <button onClick={()=>setIdx(i=>(i-1+banners.length)%banners.length)} style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,.4)",border:"none",borderRadius:"50%",width:32,height:32,color:"#fff",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <button onClick={()=>setIdx(i=>(i+1)%banners.length)} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,.4)",border:"none",borderRadius:"50%",width:32,height:32,color:"#fff",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        </>
      )}
    </div>
  );
}

function HomePage({setPage,user,setExamType,banners=[],examTypes,notices=[],setShowNoticeModal}){
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
}

// ─── EXAM MODE MODAL ──────────────────────────────────────────────────────────
function ExamModeModal({test,onConfirm,onCancel}){
  const [timed,setTimed]=useState(null);
  const et=EXAM_TYPES.find(e=>e.id===test.examType)||EXAM_TYPES[0];
  return(
    <div style={{position:"fixed",inset:0,background:"#00000095",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,padding:36,maxWidth:460,width:"100%",boxShadow:"0 20px 60px #00000050",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:12}}>📋</div>
        <h2 style={{fontWeight:900,fontSize:22,marginBottom:4}}>{test.title}</h2>
        <p style={{color:"#666",fontSize:14,marginBottom:28}}>{et.icon} {et.label} · 30 Questions</p>
        <div style={{fontWeight:800,fontSize:16,marginBottom:14,color:"#333"}}>Choose Exam Mode</div>
        <div style={{display:"flex",gap:14,marginBottom:28}}>
          {[
            {val:true,icon:"⏱️",title:"Timed Mode",desc:"30-min countdown · Auto-submit on timeout",col:"#FF6A00"},
            {val:false,icon:"🧘",title:"Practice Mode",desc:"No time limit · Focus on learning",col:"#22c55e"}
          ].map(opt=>(
            <div key={String(opt.val)} onClick={()=>setTimed(opt.val)} style={{flex:1,padding:20,borderRadius:16,border:"2px solid",borderColor:timed===opt.val?opt.col:"#e0e0e0",background:timed===opt.val?`${opt.col}15`:"#fafafa",cursor:"pointer",transition:"all .2s"}}>
              <div style={{fontSize:32,marginBottom:8}}>{opt.icon}</div>
              <div style={{fontWeight:800,fontSize:15,color:timed===opt.val?opt.col:"#333",marginBottom:4}}>{opt.title}</div>
              <div style={{fontSize:12,color:"#888"}}>{opt.desc}</div>
              {timed===opt.val&&<div style={{marginTop:8,background:opt.col,color:"#fff",borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700,display:"inline-block"}}>Selected ✓</div>}
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onCancel} style={{flex:1,padding:"12px 0",borderRadius:12,border:"2px solid #e0e0e0",background:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>timed!==null&&onConfirm(timed)} disabled={timed===null} style={{flex:2,padding:"12px 0",borderRadius:12,border:"none",background:timed===null?"#e0e0e0":timed?"linear-gradient(90deg,#FF6A00,#ff9a00)":"linear-gradient(90deg,#22c55e,#16a34a)",color:timed===null?"#999":"#fff",fontWeight:800,fontSize:15,cursor:timed===null?"not-allowed":"pointer"}}>
            {timed===null?"Select a mode":timed?"Start Timed Exam →":"Start Practice →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TESTS PAGE ───────────────────────────────────────────────────────────────
function TestsPage({user,onStartTest,examType,setExamType,examTypes}){
  const [selTopic,setSelTopic]=useState(null);
  const [modeModal,setModeModal]=useState(null);
  const [settings,setSettingsState]=useState({contentMode:"free"});
  const [userAccess,setUserAccess]=useState(true);

  useEffect(()=>{
    getSettings().then(s=>setSettingsState(s));
    if(user?.uid) checkAccess(user.uid).then(a=>setUserAccess(a));
  },[user]);

  const ETs=examTypes||EXAM_TYPES;
  const et=ETs.find(e=>e.id===examType)||ETs[0];
  const isPaidLocked=settings.contentMode==="paid"&&!userAccess&&user?.role!=="admin";

  return(
    <div style={{paddingTop:80,padding:window.innerWidth<=768?"70px 16px 32px":"80px 40px 40px",maxWidth:1100,margin:"0 auto"}}>
      {/* Exam tabs */}
      <div style={{display:"flex",gap:window.innerWidth<=768?8:12,marginBottom:window.innerWidth<=768?16:28,flexWrap:"wrap"}}>
        {ETs.filter(e=>e.visible!==false).map(e=>(
          <button key={e.id} onClick={()=>{setExamType(e.id);setSelTopic(null);}} style={{padding:"12px 24px",borderRadius:14,border:"2px solid",borderColor:examType===e.id?e.color:"#e0e0e0",background:examType===e.id?e.color:"#fff",color:examType===e.id?"#fff":"#555",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:examType===e.id?`0 4px 20px ${e.color}40`:"none"}}>
            {e.icon} {e.label}<span style={{display:"block",fontSize:10,opacity:.8,marginTop:2}}>{e.fullName}</span>
          </button>
        ))}
      </div>
      {isPaidLocked&&(
        <div style={{background:"linear-gradient(135deg,#1a1a1a,#2d1500)",borderRadius:16,padding:"22px 28px",marginBottom:28,border:"2px solid #FF6A00",display:"flex",alignItems:"center",gap:18}}>
          <span style={{fontSize:36}}>🔒</span>
          <div style={{flex:1}}><div style={{color:"#FF6A00",fontWeight:900,fontSize:17,marginBottom:4}}>Premium Content Locked</div><div style={{color:"#aaa",fontSize:13}}>Contact Rank Achievers admin to enable your access.</div></div>
        </div>
      )}
      <h2 style={{fontWeight:900,fontSize:22,marginBottom:6}}><span style={{color:et.color}}>{et.icon} {et.label}</span> Practice Tests</h2>
      <p style={{color:"#666",marginBottom:24}}>{et.fullName} — {et.topics.length} topics · 3 levels each · Scores saved to cloud ☁️</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
        <button onClick={()=>setSelTopic(null)} style={{padding:"7px 18px",borderRadius:20,border:"2px solid",borderColor:!selTopic?et.color:"#e0e0e0",background:!selTopic?et.color:"#fff",color:!selTopic?"#fff":"#666",fontWeight:700,fontSize:12,cursor:"pointer"}}>All Topics</button>
        {et.topics.map(t=><button key={t.id} onClick={()=>setSelTopic(t.id)} style={{padding:"7px 18px",borderRadius:20,border:"2px solid",borderColor:selTopic===t.id?et.color:"#e0e0e0",background:selTopic===t.id?et.color:"#fff",color:selTopic===t.id?"#fff":"#666",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.icon} {t.name}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:18}}>
        {et.topics.filter(t=>!selTopic||t.id===selTopic).flatMap(topic=>
          DIFFS.map((diff,di)=>{
            const testObj={id:`${topic.id}_${diff}`,topic_id:topic.id,topicName:topic.name,difficulty:diff,title:`${topic.name} – Test ${di+1}`,duration:1800,examType:et.id};
            return(
              <div key={testObj.id} style={{border:"2px solid",borderColor:isPaidLocked?"#e0e0e0":"#f0f0f0",borderRadius:16,padding:22,background:isPaidLocked?"#fafafa":"#fff",opacity:isPaidLocked?.7:1,transition:"all .2s",boxShadow:"0 2px 12px #00000006"}}
                onMouseOver={e=>{if(!isPaidLocked){e.currentTarget.style.borderColor=et.color;e.currentTarget.style.boxShadow=`0 8px 24px ${et.color}20`;}}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=isPaidLocked?"#e0e0e0":"#f0f0f0";e.currentTarget.style.boxShadow="0 2px 12px #00000006";}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:12}}>
                  <span style={{fontSize:26}}>{topic.icon}</span>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    {isPaidLocked&&<span>🔒</span>}
                    <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:DBG[diff],color:DCOL[diff]}}>{diff.toUpperCase()}</span>
                  </div>
                </div>
                <div style={{fontSize:11,color:et.color,fontWeight:700,marginBottom:3}}>{et.label}</div>
                <h3 style={{fontWeight:800,fontSize:14,marginBottom:8}}>{topic.name} — Test {di+1}</h3>
                <div style={{display:"flex",gap:12,marginBottom:16}}>
                  <span style={{fontSize:12,color:"#666"}}>📝 30 Qs</span>
                  <span style={{fontSize:12,color:"#666"}}>⏱️ 30 Min</span>
                  <span style={{fontSize:12,color:"#888"}}>☁️ Cloud saved</span>
                </div>
                <button onClick={()=>{if(isPaidLocked){alert("Content locked. Contact admin.");return;}setModeModal(testObj);}} style={{width:"100%",padding:"10px 0",borderRadius:10,border:"none",background:isPaidLocked?"#e0e0e0":`linear-gradient(90deg,${et.color},${et.color}cc)`,color:isPaidLocked?"#999":"#fff",fontWeight:800,fontSize:13,cursor:isPaidLocked?"not-allowed":"pointer"}}>
                  {isPaidLocked?"🔒 Locked":"Start Test →"}
                </button>
              </div>
            );
          })
        )}
      </div>
      {modeModal&&<ExamModeModal test={modeModal} onConfirm={isTimed=>{onStartTest({...modeModal,timed:isTimed});setModeModal(null);}} onCancel={()=>setModeModal(null)}/>}
    </div>
  );
}

// ─── TEST PAGE ────────────────────────────────────────────────────────────────
// ─── GLOBAL QUESTION GENERATOR ───────────────────────────────────────────────
// Used by TestPage (live) AND by admin seeder (to push to Firestore)
function generateQuestionsForTest(test){
  const et = EXAM_TYPES.find(e=>e.id===test.examType)||EXAM_TYPES[0];
  const topic = et.topics.find(t=>t.id===test.topic_id)||et.topics[0];
  return Array.from({length:30},(_,i)=>({
    id:`${test.id}_q${i}`,
    testId: test.id,
    testTitle: test.title,
    examType: test.examType,
    topicId: test.topic_id,
    topicName: topic?.name||"General",
    difficulty: test.difficulty,
    question_text:`Q${i+1}: If the sum of two numbers is ${20+i} and their difference is ${4+i}, what is their product?`,
    option_a:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2)-10)}`,
    option_b:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2))}`,
    option_c:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2)+10)}`,
    option_d:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2)+20)}`,
    correct_answer:"b",
    explanation:`x+y=${20+i}, x-y=${4+i} → x=${12+i}, y=8 → Product=${(12+i)*8}`,
    youtube_link:"https://www.youtube.com/embed/dQw4w9WgXcQ",
    isSeeded: true,
  }));
}

// All possible tests across all exam types & topics
function getAllTests(){
  const tests=[];
  EXAM_TYPES.forEach(et=>{
    et.topics.forEach(topic=>{
      ["easy","medium","hard"].forEach((diff,di)=>{
        tests.push({
          id:`${topic.id}_${diff}`,
          topic_id:topic.id,
          topicName:topic.name,
          difficulty:diff,
          title:`${topic.name} – Test ${di+1}`,
          duration:1800,
          examType:et.id,
        });
      });
    });
  });
  return tests;
}

function TestPage({test,user,onFinish}){
  // ── ALL HOOKS MUST BE AT TOP — NO EXCEPTIONS ──
  const [questions,setQuestions]=useState(()=>generateQuestionsForTest(test));
  const [qLoading,setQLoading]=useState(false);
  const [current,setCurrent]=useState(0);
  const [answers,setAnswers]=useState({});
  const [status,setStatus]=useState({});
  const [timeLeft,setTimeLeft]=useState(test.duration);
  const [qTimes,setQTimes]=useState({});
  const [liveQSec,setLiveQSec]=useState(0);
  const [showWarning,setShowWarning]=useState(false);
  const [showSubmitModal,setShowSubmitModal]=useState(false);
  const [bookmarked,setBookmarked]=useState(new Set());
  const [saving,setSaving]=useState(false);
  const timerRef=useRef(null);
  const qTimerRef=useRef(null);
  const submitRef=useRef(null);
  const qStartRef=useRef(Date.now());
  const qTimesRef=useRef({});

  // Sync qTimes ref
  useEffect(()=>{qTimesRef.current=qTimes;},[qTimes]);

  // Try loading from Firestore in background — replace generated if found
  useEffect(()=>{
    let cancelled=false;
    (async()=>{
      try{
        const snap=await getDocs(query(
          collection(db,"questions"),
          where("testId","==",test.id),
          limit(30)
        ));
        if(!cancelled && snap.docs.length>=5){
          setQuestions(snap.docs.map(d=>({id:d.id,...d.data()})));
        }
      }catch(e){
        // silently ignore — generated questions already loaded
      }
    })();
    return()=>{cancelled=true;};
  },[test.id]);

  const et=EXAM_TYPES.find(e=>e.id===test.examType)||EXAM_TYPES[0];
  const isTimed=test.timed!==false;

  useEffect(()=>{
    submitRef.current=async()=>{
      clearInterval(timerRef.current);clearInterval(qTimerRef.current);
      const el=Math.floor((Date.now()-qStartRef.current)/1000);
      const fqt={...qTimesRef.current};fqt[current]=(fqt[current]||0)+el;
      const cc=questions.reduce((a,q,i)=>a+(answers[i]===q.correct_answer?1:0),0);
      const result={test,questions,answers:{...answers},qTimes:fqt,score:cc,total:questions.length,accuracy:Math.round(cc/questions.length*100),timeSpent:test.duration-timeLeft,auto:true,mode:isTimed?"timed":"practice"};
      setSaving(true);
      try{
        if(user?.uid){
          await addDoc(collection(db,"attempts"),{
            userId:user.uid,userName:user.name,
            testId:test.id,testTitle:test.title,
            examType:test.examType,topicId:test.topic_id,
            difficulty:test.difficulty,mode:result.mode,
            score:cc,total:questions.length,accuracy:result.accuracy,
            timeSpent:result.timeSpent,createdAt:serverTimestamp(),
          });
          await updateDoc(doc(db,"users",user.uid),{totalTests:increment(1)});
        }
      }catch(e){console.error(e);}
      finally{setSaving(false);}
      onFinish(result);
    };
  });

  useEffect(()=>{
    if(!isTimed) return;
    timerRef.current=setInterval(()=>setTimeLeft(t=>{
      if(t<=1){clearInterval(timerRef.current);setTimeout(()=>submitRef.current&&submitRef.current(),0);return 0;}
      return t-1;
    }),1000);
    return()=>clearInterval(timerRef.current);
  },[isTimed]);

  useEffect(()=>{
    const base=qTimesRef.current[current]||0;
    setLiveQSec(base);qStartRef.current=Date.now();
    clearInterval(qTimerRef.current);
    qTimerRef.current=setInterval(()=>setLiveQSec(base+Math.floor((Date.now()-qStartRef.current)/1000)),1000);
    return()=>clearInterval(qTimerRef.current);
  },[current]);

  useEffect(()=>{
    const h=e=>{e.preventDefault();setShowWarning(true);return "";};
    window.addEventListener("beforeunload",h);
    return()=>window.removeEventListener("beforeunload",h);
  },[]);

  const saveQTime=useCallback(()=>{
    const el=Math.floor((Date.now()-qStartRef.current)/1000);
    const up={...qTimesRef.current,[current]:(qTimesRef.current[current]||0)+el};
    setQTimes(up);qTimesRef.current=up;qStartRef.current=Date.now();
  },[current]);

  const goTo=idx=>{saveQTime();setStatus(p=>({...p,[current]:p[current]||"visited"}));setCurrent(idx);};
  const saveAndNext=()=>{saveQTime();setStatus(p=>({...p,[current]:answers[current]?"answered":(p[current]||"visited")}));if(current<questions.length-1)setCurrent(c=>c+1);};
  const markReview=()=>{saveQTime();setStatus(p=>({...p,[current]:"review"}));if(current<questions.length-1)setCurrent(c=>c+1);};

  const handleSubmit=(auto=false)=>{
    clearInterval(timerRef.current);clearInterval(qTimerRef.current);
    const el=Math.floor((Date.now()-qStartRef.current)/1000);
    const fqt={...qTimesRef.current};fqt[current]=(fqt[current]||0)+el;
    const cc=questions.reduce((a,q,i)=>a+(answers[i]===q.correct_answer?1:0),0);
    const result={test,questions,answers:{...answers},qTimes:fqt,score:cc,total:questions.length,accuracy:Math.round(cc/questions.length*100),timeSpent:test.duration-timeLeft,auto,mode:isTimed?"timed":"practice"};
    setSaving(true);
    (async()=>{
      try{
        if(user?.uid){
          await addDoc(collection(db,"attempts"),{
            userId:user.uid,userName:user.name,
            testId:test.id,testTitle:test.title,
            examType:test.examType,topicId:test.topic_id,
            difficulty:test.difficulty,mode:result.mode,
            score:cc,total:questions.length,accuracy:result.accuracy,
            timeSpent:result.timeSpent,createdAt:serverTimestamp(),
          });
          await updateDoc(doc(db,"users",user.uid),{totalTests:increment(1)});
        }
      }catch(e){console.error(e);}
      finally{setSaving(false);}
      onFinish(result);
    })();
  };

  const q=questions[current];
  const pc=i=>{const s=status[i];return s==="answered"?"#22c55e":s==="review"?"#FF6A00":s==="visited"?"#ef4444":"#e5e7eb";};
  const tc=timeLeft<300?"#ef4444":timeLeft<600?"#f59e0b":"#22c55e";

  if(saving) return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#000",gap:20}}>
      <Spinner size={48} color="#FF6A00"/>
      <div style={{color:"#fff",fontWeight:700,fontSize:18}}>Saving your results to cloud... ☁️</div>
    </div>
  );

  if(!q) return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#000",gap:20}}>
      <Spinner size={48} color="#FF6A00"/>
      <div style={{color:"#fff",fontWeight:700,fontSize:16}}>Preparing test...</div>
    </div>
  );

  return(
    <div style={{paddingTop:60,height:"100vh",display:"flex",flexDirection:"column",background:"#f8f8f8",overflow:"hidden"}}>
      {/* Header */}
      <div style={{background:"#000",color:"#fff",padding:window.innerWidth<=768?"8px 12px":"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexShrink:0}}>
        <div style={{minWidth:0,flex:1}}>
          <div style={{fontWeight:800,fontSize:window.innerWidth<=768?12:14,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{et.icon} {test.title}</div>
          <div style={{fontSize:10,marginTop:2,color:isTimed?"#f59e0b":"#22c55e",fontWeight:700}}>{isTimed?"⏱️ Timed":"🧘 Practice"}</div>
        </div>
        <div style={{display:"flex",gap:window.innerWidth<=768?6:14,alignItems:"center",flexShrink:0}}>
          {isTimed?(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:9,color:"#aaa",marginBottom:1,letterSpacing:.5}}>LEFT</div>
              <div style={{background:tc,color:"#fff",padding:window.innerWidth<=768?"4px 10px":"6px 16px",borderRadius:8,fontWeight:900,fontSize:window.innerWidth<=768?15:20,fontFamily:"monospace",boxShadow:`0 0 12px ${tc}60`}}>⏱{fmtT(timeLeft)}</div>
            </div>
          ):(
            <div style={{background:"#22c55e20",border:"1px solid #22c55e40",borderRadius:8,padding:window.innerWidth<=768?"4px 8px":"8px 16px",textAlign:"center"}}>
              <div style={{fontSize:window.innerWidth<=768?9:11,color:"#22c55e",fontWeight:700}}>🧘 Practice</div>
            </div>
          )}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:9,color:"#aaa",marginBottom:1,letterSpacing:.5}}>THIS Q</div>
            <div style={{background:liveQSec>120?"#dc2626":liveQSec>60?"#f59e0b":"#334155",color:"#fff",padding:window.innerWidth<=768?"4px 10px":"6px 16px",borderRadius:8,fontWeight:900,fontSize:window.innerWidth<=768?15:20,fontFamily:"monospace",transition:"background .5s"}}>🕐{fmtT(liveQSec)}</div>
          </div>
        </div>
        <button onClick={()=>setShowSubmitModal(true)} style={{padding:window.innerWidth<=768?"6px 12px":"8px 20px",borderRadius:8,border:"none",background:"#FF6A00",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:window.innerWidth<=768?12:14,whiteSpace:"nowrap",boxShadow:"0 0 12px #FF6A0070"}}>Submit</button>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden",flexDirection:window.innerWidth<=768?"column":"row"}}>
        {/* Question panel */}
        <div style={{flex:1,padding:window.innerWidth<=768?"10px 12px":24,overflowY:"auto",minHeight:0}}>
          <div style={{background:"#fff",borderRadius:16,padding:26,boxShadow:"0 2px 16px #0000000a"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <span style={{background:et.color,color:"#fff",padding:"4px 14px",borderRadius:20,fontSize:13,fontWeight:700}}>Q.{current+1}/{questions.length}</span>
                <div style={{display:"flex",alignItems:"center",gap:6,background:liveQSec>120?"#fee2e2":liveQSec>60?"#fef9c3":"#f0fdf4",border:"2px solid",borderColor:liveQSec>120?"#fca5a5":liveQSec>60?"#fde047":"#86efac",padding:"4px 10px",borderRadius:20}}>
                  <span>🕐</span>
                  <span style={{fontFamily:"monospace",fontWeight:900,fontSize:14,color:liveQSec>120?"#dc2626":liveQSec>60?"#854d0e":"#166634"}}>{fmtT(liveQSec)}</span>
                  <span style={{fontSize:11,color:"#888"}}>on this Q</span>
                </div>
              </div>
              <button onClick={()=>setBookmarked(p=>{const n=new Set(p);n.has(current)?n.delete(current):n.add(current);return n;})} style={{background:"none",border:"none",cursor:"pointer",fontSize:20}}>{bookmarked.has(current)?"🔖":"📌"}</button>
            </div>
            <p style={{fontSize:16,fontWeight:600,lineHeight:1.6,marginBottom:24,color:"#111"}}>{q.question_text}</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {["a","b","c","d"].map(opt=>(
                <label key={opt} onClick={()=>setAnswers(p=>({...p,[current]:opt}))} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderRadius:12,border:"2px solid",borderColor:answers[current]===opt?et.color:"#e5e7eb",background:answers[current]===opt?"#fff5ee":"#fff",cursor:"pointer",transition:"all .15s"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",border:"2px solid",borderColor:answers[current]===opt?et.color:"#ccc",background:answers[current]===opt?et.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {answers[current]===opt&&<div style={{width:8,height:8,borderRadius:"50%",background:"#fff"}}/>}
                  </div>
                  <span style={{fontWeight:answers[current]===opt?700:500}}><b style={{color:et.color}}>{opt.toUpperCase()}.</b> {q[`option_${opt}`]}</span>
                </label>
              ))}
            </div>
            <div style={{display:"flex",gap:8,marginTop:window.innerWidth<=768?16:24}}>
              <button onClick={()=>current>0&&goTo(current-1)} disabled={current===0} style={{padding:window.innerWidth<=768?"10px 14px":"10px 20px",borderRadius:10,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer",fontSize:window.innerWidth<=768?13:13,opacity:current===0?.4:1}}>←</button>
              <button onClick={markReview} style={{padding:window.innerWidth<=768?"10px 14px":"10px 20px",borderRadius:10,border:`2px solid ${et.color}`,background:"#fff",color:et.color,fontWeight:700,cursor:"pointer",fontSize:13}}>🔖</button>
              <button onClick={saveAndNext} style={{flex:1,padding:"10px 16px",borderRadius:10,border:"none",background:`linear-gradient(90deg,${et.color},${et.color}cc)`,color:"#fff",fontWeight:800,cursor:"pointer",fontSize:14}}>Save & Next →</button>
            </div>
          </div>
        </div>

        {/* Palette */}
        {window.innerWidth<=768?(
          <div style={{background:"#fff",borderTop:"2px solid #FF6A00",padding:"8px 12px",flexShrink:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:11,fontWeight:700,color:"#555"}}>Question Palette</div>
              <div style={{display:"flex",gap:10,fontSize:11}}>
                <span style={{color:"#22c55e",fontWeight:700}}>✅{Object.values(status).filter(s=>s==="answered").length}</span>
                <span style={{color:"#FF6A00",fontWeight:700}}>🔖{Object.values(status).filter(s=>s==="review").length}</span>
                <span style={{color:"#888",fontWeight:700}}>⬜{questions.length-Object.keys(status).length}</span>
              </div>
            </div>
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch"}}>
              {questions.map((_,i)=>(
                <button key={i} onClick={()=>goTo(i)} style={{minWidth:34,height:34,borderRadius:8,border:"2px solid",borderColor:current===i?"#000":"transparent",background:pc(i),color:pc(i)==="#e5e7eb"?"#555":"#fff",fontWeight:800,fontSize:12,cursor:"pointer",flexShrink:0,boxShadow:current===i?"0 0 0 3px #FF6A0060":"none",transform:current===i?"scale(1.15)":"scale(1)",transition:"transform .15s"}}>{i+1}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
              {[["#22c55e","Answered"],["#ef4444","Not Ans."],["#e5e7eb","Not Visited"],["#FF6A00","Review"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}>
                  <div style={{width:10,height:10,borderRadius:3,background:c,flexShrink:0}}/>
                  <span style={{color:"#666"}}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        ):(
          <div style={{width:250,background:"#fff",borderLeft:"2px solid #f0f0f0",padding:18,overflowY:"auto",flexShrink:0}}>
            <h3 style={{fontWeight:800,fontSize:13,marginBottom:12}}>Question Palette</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["#22c55e","Answered"],["#ef4444","Not Ans."],["#e5e7eb","Not Visited"],["#FF6A00","Review"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}>
                  <div style={{width:10,height:10,borderRadius:3,background:c}}/>
                  <span style={{color:"#555"}}>{l}</span>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
              {questions.map((_,i)=>(
                <button key={i} onClick={()=>goTo(i)} style={{width:36,height:36,borderRadius:7,border:"2px solid",borderColor:current===i?"#000":"transparent",background:pc(i),color:pc(i)==="#e5e7eb"?"#555":"#fff",fontWeight:800,fontSize:12,cursor:"pointer",boxShadow:current===i?"0 0 0 3px #00000030":"none"}}>{i+1}</button>
              ))}
            </div>
            <div style={{marginTop:14,padding:12,background:"#f8f8f8",borderRadius:10}}>
              <div style={{fontSize:11,color:"#666",marginBottom:6}}>Progress</div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                <span>✅ {Object.values(status).filter(s=>s==="answered").length}</span>
                <span>🔖 {Object.values(status).filter(s=>s==="review").length}</span>
                <span>⬜ {questions.length-Object.keys(status).length}</span>
              </div>
            </div>
            <div style={{marginTop:12,padding:"8px 12px",background:"#f0fdf4",borderRadius:10,border:"1px solid #86efac"}}>
              <div style={{fontSize:11,color:"#16a34a",fontWeight:700}}>☁️ Auto-saved to cloud</div>
            </div>
          </div>
        )}
      </div>

      {showSubmitModal&&(
        <div style={{position:"fixed",inset:0,background:"#00000090",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,maxWidth:380,width:"90%",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:10}}>📋</div>
            <h3 style={{fontWeight:900,fontSize:18,marginBottom:14}}>Submit Test?</h3>
            <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:18,textAlign:"left"}}>
              {[["✅ Answered",Object.values(status).filter(s=>s==="answered").length,"#22c55e"],["🔖 For Review",Object.values(status).filter(s=>s==="review").length,"#FF6A00"],["⬜ Skipped",questions.length-Object.keys(status).length,"#ef4444"]].map(([l,v,c])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:"#555"}}>{l}</span><span style={{fontWeight:800,color:c}}>{v}</span></div>
              ))}
            </div>
            <p style={{fontSize:12,color:"#888",marginBottom:18}}>☁️ Results will be saved to cloud</p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowSubmitModal(false)} style={{flex:1,padding:"11px 0",borderRadius:10,border:"2px solid #e0e0e0",background:"#fff",fontWeight:800,cursor:"pointer"}}>Continue</button>
              <button onClick={()=>{setShowSubmitModal(false);handleSubmit();}} style={{flex:1,padding:"11px 0",borderRadius:10,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer"}}>Submit →</button>
            </div>
          </div>
        </div>
      )}
      {showWarning&&(
        <div style={{position:"fixed",inset:0,background:"#00000090",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,maxWidth:360,width:"90%",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:10}}>⚠️</div>
            <h3 style={{fontWeight:900,marginBottom:8}}>Don&apos;t Leave!</h3>
            <p style={{color:"#666",marginBottom:20}}>Navigating away will end your test.</p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowWarning(false)} style={{flex:1,padding:12,borderRadius:10,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer"}}>Stay</button>
              <button onClick={()=>handleSubmit()} style={{flex:1,padding:12,borderRadius:10,border:"none",background:"#FF6A00",color:"#fff",fontWeight:800,cursor:"pointer"}}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultPage({result,onViewSolutions,onBack}){
  const {score,total,accuracy,timeSpent,test,auto}=result;
  const et=EXAM_TYPES.find(e=>e.id===test.examType)||EXAM_TYPES[0];
  const grade=accuracy>=80?{g:"Excellent! 🏆",c:"#22c55e"}:accuracy>=60?{g:"Good Job! 🎯",c:"#f59e0b"}:{g:"Keep Going! 📚",c:"#ef4444"};
  const timeSorted=result.questions.map((q,i)=>({qIndex:i,qNum:i+1,text:q.question_text,timeTaken:result.qTimes[i]||0,correct:result.answers[i]===q.correct_answer,answered:!!result.answers[i]})).filter(q=>q.timeTaken>0).sort((a,b)=>b.timeTaken-a.timeTaken).slice(0,10);
  const maxTime=timeSorted[0]?.timeTaken||1;
  return(
    <div style={{paddingTop:80,padding:window.innerWidth<=768?"70px 16px 32px":"80px 40px 40px",maxWidth:680,margin:"0 auto"}}>
      {auto&&<div style={{background:"#fff3cd",border:"2px solid #ffc107",borderRadius:10,padding:"10px 18px",marginBottom:20,textAlign:"center"}}>⏰ Time up! Auto-submitted.</div>}
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:56,marginBottom:10}}>{accuracy>=80?"🏆":accuracy>=60?"🎯":"📚"}</div>
        <h1 style={{fontSize:28,fontWeight:900,color:grade.c,marginBottom:4}}>{grade.g}</h1>
        <p style={{color:"#666"}}>{et.icon} {test.title} · {result.mode==="practice"?"🧘 Practice Mode":"⏱️ Timed Mode"}</p>
        <div style={{marginTop:8,background:"#f0fdf4",borderRadius:10,padding:"6px 16px",display:"inline-block",border:"1px solid #86efac"}}>
          <span style={{fontSize:12,color:"#16a34a",fontWeight:700}}>☁️ Results saved to your cloud account</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:window.innerWidth<=768?"repeat(2,1fr)":"repeat(2,1fr)",gap:10,marginBottom:20}}>
        {[{l:"Score",v:`${score}/${total}`,i:"📝"},{l:"Accuracy",v:`${accuracy}%`,i:"🎯"},{l:"Time Spent",v:fmtT(timeSpent),i:"⏱️"},{l:"Difficulty",v:(test.difficulty||"Mixed").toUpperCase(),i:"💪"}].map(item=>(
          <div key={item.l} style={{background:"#fff",border:"2px solid #f0f0f0",borderRadius:14,padding:"20px 16px",textAlign:"center"}}>
            <div style={{fontSize:26,marginBottom:6}}>{item.i}</div>
            <div style={{fontSize:22,fontWeight:900,color:et.color}}>{item.v}</div>
            <div style={{fontSize:12,color:"#888",marginTop:3}}>{item.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#fff",borderRadius:14,padding:22,marginBottom:20,border:"2px solid #f0f0f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontWeight:700}}>Performance</span><span style={{color:et.color,fontWeight:800}}>{accuracy}%</span></div>
        <div style={{background:"#f0f0f0",borderRadius:8,height:12,overflow:"hidden"}}><div style={{height:"100%",borderRadius:8,width:`${accuracy}%`,background:`linear-gradient(90deg,${et.color},${et.color}cc)`,transition:"width 1s ease"}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:12,color:"#888"}}>
          <span>✅ {score}</span><span>❌ {total-score-(total-Object.keys(result.answers).length)}</span><span>⬜ {total-Object.keys(result.answers).length}</span>
        </div>
      </div>
      {timeSorted.length>0&&(
        <div style={{background:"#fff",borderRadius:14,padding:22,marginBottom:20,border:"2px solid #f0f0f0"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <span style={{fontSize:26}}>⏰</span>
            <div><h3 style={{fontWeight:900,fontSize:16,margin:0}}>Top 10 Time-Killing Questions</h3><p style={{color:"#888",fontSize:12,margin:"2px 0 0"}}>Questions where you spent the most time</p></div>
          </div>
          {timeSorted.map((item,rank)=>{
            const pct=Math.round(item.timeTaken/maxTime*100);
            const bc=rank===0?"#ef4444":rank<3?"#f97316":"#FF6A00";
            return(
              <div key={item.qIndex} style={{background:rank===0?"#fff5f5":"#fafafa",borderRadius:10,padding:"10px 14px",marginBottom:8,border:"2px solid",borderColor:rank===0?"#fca5a5":"#f0f0f0"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:bc,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:10}}>#{rank+1}</div>
                    <span style={{fontWeight:700,fontSize:13}}>Q.{item.qNum}</span>
                    <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,background:item.correct?"#dcfce7":item.answered?"#fee2e2":"#f3f4f6",color:item.correct?"#16a34a":item.answered?"#dc2626":"#6b7280"}}>{item.correct?"✅":item.answered?"❌":"⬜"}</span>
                  </div>
                  <span style={{fontFamily:"monospace",fontWeight:900,fontSize:15,color:bc}}>{fmtT(item.timeTaken)}</span>
                </div>
                <div style={{background:"#f0f0f0",borderRadius:6,height:6,overflow:"hidden"}}><div style={{height:"100%",borderRadius:6,width:pct+"%",background:bc,transition:"width 1.2s ease"}}/></div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{display:"flex",gap:12}}>
        <button onClick={onBack} style={{flex:1,padding:"12px 0",borderRadius:12,border:"2px solid #e0e0e0",background:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>← Tests</button>
        <button onClick={onViewSolutions} style={{flex:2,padding:"12px 0",borderRadius:12,border:"none",background:`linear-gradient(90deg,${et.color},${et.color}cc)`,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>📖 View Solutions →</button>
      </div>
    </div>
  );
}

// ─── SOLUTIONS PAGE ───────────────────────────────────────────────────────────
function SolutionsPage({result,onBack}){
  const {questions,answers}=result;
  const et=EXAM_TYPES.find(e=>e.id===result.test.examType)||EXAM_TYPES[0];
  const [filter,setFilter]=useState("all");
  const filtered=questions.filter((q,i)=>{
    if(filter==="correct") return answers[i]===q.correct_answer;
    if(filter==="wrong")   return answers[i]&&answers[i]!==q.correct_answer;
    if(filter==="skipped") return !answers[i];
    return true;
  });
  return(
    <div style={{paddingTop:80,padding:window.innerWidth<=768?"70px 16px 32px":"80px 40px 40px",maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:22}}>
        <button onClick={onBack} style={{padding:"8px 14px",borderRadius:8,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer"}}>← Back</button>
        <h1 style={{fontSize:24,fontWeight:900,margin:0}}>Answers & <span style={{color:et.color}}>Solutions</span></h1>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {[["all",`All (${questions.length})`],["correct",`✅ Correct (${questions.filter((q,i)=>answers[i]===q.correct_answer).length})`],["wrong",`❌ Wrong (${questions.filter((q,i)=>answers[i]&&answers[i]!==q.correct_answer).length})`],["skipped",`⬜ Skipped (${questions.filter((_,i)=>!answers[i]).length})`]].map(([f,l])=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:"7px 14px",borderRadius:20,border:"2px solid",borderColor:filter===f?et.color:"#e0e0e0",background:filter===f?et.color:"#fff",color:filter===f?"#fff":"#666",fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {filtered.map(q=>{
          const i=questions.indexOf(q);const ua=answers[i];const correct=ua===q.correct_answer;const skipped=!ua;
          return(
            <div key={q.id} style={{background:"#fff",borderRadius:14,padding:22,border:"2px solid",borderColor:skipped?"#e5e7eb":correct?"#22c55e40":"#ef444440"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                <span style={{background:skipped?"#e5e7eb":correct?"#dcfce7":"#fee2e2",color:skipped?"#666":correct?"#16a34a":"#dc2626",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:800}}>{skipped?"⬜ Skipped":correct?"✅ Correct":"❌ Wrong"}</span>
                <span style={{color:"#888",fontSize:12}}>Q.{i+1}</span>
                <span style={{color:"#aaa",fontSize:11}}>⏱ {fmtT(result.qTimes[i]||0)}</span>
              </div>
              <p style={{fontWeight:600,marginBottom:12,lineHeight:1.6}}>{q.question_text}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                {["a","b","c","d"].map(opt=>{
                  const isc=opt===q.correct_answer;const isu=opt===ua;
                  return <div key={opt} style={{padding:"10px 12px",borderRadius:10,fontSize:13,background:isc?"#dcfce7":isu&&!isc?"#fee2e2":"#f8f8f8",border:"2px solid",borderColor:isc?"#22c55e":isu&&!isc?"#ef4444":"transparent",fontWeight:isc||isu?700:400}}><b style={{color:et.color}}>{opt.toUpperCase()}.</b> {q[`option_${opt}`]}{isc?" ✅":""}{isu&&!isc?" ❌":""}</div>;
                })}
              </div>
              <div style={{background:"#fff8f0",borderRadius:10,padding:14,marginBottom:10}}>
                <div style={{color:"#FF6A00",fontWeight:800,marginBottom:6,fontSize:13}}>💡 Explanation</div>
                <pre style={{margin:0,whiteSpace:"pre-wrap",fontSize:13,color:"#333",fontFamily:"inherit"}}>{q.explanation}</pre>
              </div>
              <details><summary style={{color:et.color,fontWeight:700,fontSize:13,cursor:"pointer"}}>▶ Watch Video Solution</summary>
                <div style={{marginTop:8,borderRadius:8,overflow:"hidden"}}><iframe src={q.youtube_link} width="100%" height="200" title="sol" frameBorder="0" allowFullScreen style={{display:"block"}}/></div>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage({user,setPage}){
  const [attempts,setAttempts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [settings,setSettingsState]=useState({contentMode:"free"});
  const [userAccess,setUserAccess]=useState(true);

  useEffect(()=>{
    if(!user?.uid) return;
    getSettings().then(s=>setSettingsState(s));
    checkAccess(user.uid).then(a=>setUserAccess(a));
    const q=query(collection(db,"attempts"),where("userId","==",user.uid),orderBy("createdAt","desc"),limit(20));
    const unsub=onSnapshot(q,snap=>{
      setAttempts(snap.docs.map(d=>({id:d.id,...d.data()})));
      setLoading(false);
    },()=>setLoading(false));
    return unsub;
  },[user]);

  const total=attempts.length;
  const avgAcc=total?Math.round(attempts.reduce((a,r)=>a+(r.accuracy||0),0)/total):0;
  const avgTime=total?Math.round(attempts.reduce((a,r)=>a+(r.timeSpent||0),0)/total):0;
  const isPaid=settings.contentMode==="paid";

  return(
    <div style={{paddingTop:80,padding:window.innerWidth<=768?"70px 16px 32px":"80px 40px 40px",maxWidth:900,margin:"0 auto"}}>
      {/* Profile card */}
      <div style={{background:"linear-gradient(135deg,#000,#1a0a00)",borderRadius:20,padding:26,display:"flex",alignItems:"center",gap:22,marginBottom:24,border:"2px solid #FF6A0030"}}>
        {user?.photoURL
          ?<img src={user.photoURL} alt="" style={{width:68,height:68,borderRadius:"50%",flexShrink:0}}/>
          :<div style={{width:68,height:68,borderRadius:"50%",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#fff",flexShrink:0}}>{user?.name?.charAt(0).toUpperCase()}</div>
        }
        <div style={{flex:1}}>
          <div style={{color:"#fff",fontWeight:900,fontSize:18}}>{user?.name}</div>
          <div style={{color:"#888",fontSize:13}}>{user?.email}</div>
          {user?.googleLogin&&<div style={{color:"#4285f4",fontSize:12,fontWeight:700,marginTop:2}}>🔵 Google Account</div>}
          <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
            <span style={{background:"#FF6A00",color:"#fff",padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:700}}>{user?.role?.toUpperCase()}</span>
            {isPaid&&<span style={{background:userAccess?"#22c55e":"#ef4444",color:"#fff",padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:700}}>{userAccess?"✅ Access Enabled":"🔒 Locked"}</span>}
            <span style={{background:"#334155",color:"#94a3b8",padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:700}}>☁️ Cloud Synced</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
          <button onClick={()=>setPage("tests")} style={{padding:"9px 18px",borderRadius:10,border:"none",background:"#FF6A00",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:13}}>📝 Practice</button>
          <button onClick={()=>setPage("leaderboard")} style={{padding:"9px 18px",borderRadius:10,border:"2px solid #FF6A00",background:"transparent",color:"#FF6A00",fontWeight:700,cursor:"pointer",fontSize:13}}>🏆 Leaderboard</button>
        </div>
      </div>

      {isPaid&&!userAccess&&(
        <div style={{background:"#fff3cd",border:"2px solid #ffc107",borderRadius:12,padding:"14px 20px",marginBottom:20,display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontSize:26}}>🔒</span>
          <div><div style={{fontWeight:800,marginBottom:2}}>Access not enabled</div><div style={{fontSize:13,color:"#666"}}>Contact Rank Achievers admin to unlock all content.</div></div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:window.innerWidth<=768?"repeat(1,1fr)":"repeat(3,1fr)",gap:14,marginBottom:24}}>
        {[{l:"Tests Attempted",v:loading?"...":total,i:"📝"},{l:"Average Accuracy",v:loading?"...":`${avgAcc}%`,i:"🎯"},{l:"Avg Time/Test",v:loading?"...":fmtT(avgTime),i:"⏱️"}].map(s=>(
          <div key={s.l} style={{background:"#fff",borderRadius:14,padding:"20px 16px",border:"2px solid #f0f0f0",textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:6}}>{s.i}</div>
            <div style={{fontSize:24,fontWeight:900,color:"#FF6A00"}}>{s.v}</div>
            <div style={{fontSize:12,color:"#888",marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── Per-Exam Breakdown ── */}
      {!loading&&attempts.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:window.innerWidth<=768?"1fr":"repeat(3,1fr)",gap:14,marginBottom:20}}>
          {EXAM_TYPES.map(et=>{
            const ea=attempts.filter(a=>a.examType===et.id);
            const eAcc=ea.length?Math.round(ea.reduce((s,a)=>s+(a.accuracy||0),0)/ea.length):0;
            const best=ea.length?Math.max(...ea.map(a=>a.accuracy||0)):0;
            return(
              <div key={et.id} style={{background:"#fff",borderRadius:14,padding:"16px 18px",border:`2px solid ${et.color}30`}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <span style={{fontSize:22}}>{et.icon}</span>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,color:et.color}}>{et.label}</div>
                    <div style={{fontSize:11,color:"#888"}}>{ea.length} tests taken</div>
                  </div>
                </div>
                {ea.length===0?(
                  <div style={{fontSize:12,color:"#ccc",textAlign:"center",padding:"8px 0"}}>Not attempted yet</div>
                ):(
                  <>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:8}}>
                      <span style={{color:"#666"}}>Avg Accuracy</span>
                      <span style={{fontWeight:800,color:eAcc>=80?"#22c55e":eAcc>=60?"#f59e0b":"#ef4444"}}>{eAcc}%</span>
                    </div>
                    <div style={{background:"#f0f0f0",borderRadius:6,height:8,marginBottom:8,overflow:"hidden"}}>
                      <div style={{height:"100%",borderRadius:6,width:eAcc+"%",background:et.color,transition:"width 1s"}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#888"}}>
                      <span>Best: <b style={{color:et.color}}>{best}%</b></span>
                      <span>Tests: <b>{ea.length}</b></span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── All Attempts Table ── */}
      <div style={{background:"#fff",borderRadius:14,padding:22,border:"2px solid #f0f0f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
          <h3 style={{fontWeight:900,margin:0}}>All Attempts History</h3>
          <span style={{fontSize:12,color:"#22c55e",fontWeight:600}}>☁️ Live from cloud</span>
        </div>
        {loading?(
          <div style={{display:"flex",justifyContent:"center",padding:32}}><Spinner/></div>
        ):attempts.length===0?(
          <div style={{textAlign:"center",padding:40,color:"#aaa"}}>
            <div style={{fontSize:48,marginBottom:12}}>📚</div>
            <p style={{marginBottom:16,fontSize:15}}>No tests attempted yet.<br/>Start practicing to see your progress here!</p>
            <button onClick={()=>setPage("tests")} style={{padding:"12px 28px",borderRadius:10,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:15}}>Start First Test →</button>
          </div>
        ):(
          window.innerWidth<=768?(
            /* Mobile card view */
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {attempts.map((a,i)=>{
                const et=EXAM_TYPES.find(e=>e.id===a.examType);
                return(
                  <div key={a.id||i} style={{background:"#f9f9f9",borderRadius:12,padding:"14px 16px",border:"2px solid #f0f0f0"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:8}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{a.testTitle}</div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          <span style={{background:et?.color||"#FF6A00",color:"#fff",padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700}}>{et?.icon} {a.examType?.toUpperCase()}</span>
                          <span style={{background:"#f0f0f0",color:"#555",padding:"2px 8px",borderRadius:10,fontSize:10}}>{a.mode==="practice"?"🧘 Practice":"⏱️ Timed"}</span>
                        </div>
                      </div>
                      <span style={{background:a.accuracy>=80?"#dcfce7":a.accuracy>=60?"#fef9c3":"#fee2e2",color:a.accuracy>=80?"#16a34a":a.accuracy>=60?"#854d0e":"#dc2626",padding:"4px 12px",borderRadius:20,fontSize:14,fontWeight:900,flexShrink:0}}>{a.accuracy}%</span>
                    </div>
                    <div style={{display:"flex",gap:16,fontSize:12,color:"#888"}}>
                      <span>📝 {a.score}/{a.total}</span>
                      <span>⏱️ {fmtT(a.timeSpent||0)}</span>
                      <span style={{marginLeft:"auto",fontSize:11}}>{a.createdAt?.seconds?new Date(a.createdAt.seconds*1000).toLocaleDateString("en-IN"):""}</span>
                    </div>
                    {/* Mini accuracy bar */}
                    <div style={{marginTop:8,background:"#e5e7eb",borderRadius:4,height:4,overflow:"hidden"}}>
                      <div style={{height:"100%",width:a.accuracy+"%",background:a.accuracy>=80?"#22c55e":a.accuracy>=60?"#f59e0b":"#ef4444",borderRadius:4}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          ):(
            /* Desktop table view */
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"2px solid #f0f0f0",background:"#f9f9f9"}}>
                    {["#","Test","Exam","Topic","Mode","Score","Accuracy","Time","Date"].map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,color:"#888",fontWeight:700,whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((a,i)=>{
                    const et=EXAM_TYPES.find(e=>e.id===a.examType);
                    return(
                      <tr key={a.id||i} style={{borderBottom:"1px solid #f8f8f8",transition:"background .15s"}}
                        onMouseOver={e=>e.currentTarget.style.background="#fff8f0"}
                        onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{padding:"12px",fontSize:12,color:"#aaa",fontWeight:700}}>#{i+1}</td>
                        <td style={{padding:"12px",fontWeight:600,fontSize:13,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.testTitle}</td>
                        <td style={{padding:"12px"}}>
                          <span style={{background:et?.color||"#FF6A00",color:"#fff",padding:"3px 10px",borderRadius:10,fontSize:11,fontWeight:700}}>{et?.icon} {a.examType?.toUpperCase()}</span>
                        </td>
                        <td style={{padding:"12px",fontSize:12,color:"#666"}}>{a.topicId?.split("_")[1]||"-"}</td>
                        <td style={{padding:"12px",fontSize:12}}>{a.mode==="practice"?"🧘 Practice":"⏱️ Timed"}</td>
                        <td style={{padding:"12px",fontSize:13,fontWeight:700}}>{a.score}/{a.total}</td>
                        <td style={{padding:"12px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{width:50,height:6,background:"#f0f0f0",borderRadius:3,overflow:"hidden"}}>
                              <div style={{height:"100%",width:a.accuracy+"%",background:a.accuracy>=80?"#22c55e":a.accuracy>=60?"#f59e0b":"#ef4444",borderRadius:3}}/>
                            </div>
                            <span style={{fontWeight:800,fontSize:13,color:a.accuracy>=80?"#16a34a":a.accuracy>=60?"#854d0e":"#dc2626"}}>{a.accuracy}%</span>
                          </div>
                        </td>
                        <td style={{padding:"12px",fontSize:12,color:"#666",whiteSpace:"nowrap"}}>{fmtT(a.timeSpent||0)}</td>
                        <td style={{padding:"12px",fontSize:11,color:"#aaa",whiteSpace:"nowrap"}}>{a.createdAt?.seconds?new Date(a.createdAt.seconds*1000).toLocaleDateString("en-IN"):"-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────
function LeaderboardPage(){
  const [allAttempts,setAllAttempts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [examFilter,setExamFilter]=useState("all");
  const [diffFilter,setDiffFilter]=useState("all");
  const [lastUpdate,setLastUpdate]=useState(null);

  useEffect(()=>{
    // onSnapshot = live updates, no composite index needed (just limit)
    const q=query(collection(db,"attempts"),orderBy("createdAt","desc"),limit(200));
    const unsub=onSnapshot(q,snap=>{
      const attempts=snap.docs.map(d=>({id:d.id,...d.data()}));
      setAllAttempts(attempts);
      setLoading(false);
      setLastUpdate(new Date());
    },err=>{
      console.error("Leaderboard error:",err);
      // fallback: no orderBy
      getDocs(query(collection(db,"attempts"),limit(200))).then(snap=>{
        setAllAttempts(snap.docs.map(d=>({id:d.id,...d.data()})));
        setLoading(false);
        setLastUpdate(new Date());
      });
    });
    return unsub;
  },[]);

  // Build leaderboard: best attempt per student per exam
  const buildLeaderboard=(attempts,examF,diffF)=>{
    let filtered=attempts;
    if(examF!=="all") filtered=filtered.filter(a=>a.examType===examF);
    if(diffF!=="all") filtered=filtered.filter(a=>a.difficulty===diffF);

    // Best attempt per user (highest accuracy, then score, then fastest time)
    const best={};
    filtered.forEach(a=>{
      const key=a.userId;
      if(!key) return;
      const prev=best[key];
      if(!prev
        ||(a.accuracy||0)>(prev.accuracy||0)
        ||((a.accuracy||0)===(prev.accuracy||0)&&(a.score||0)>(prev.score||0))
        ||((a.accuracy||0)===(prev.accuracy||0)&&(a.score||0)===(prev.score||0)&&(a.timeSpent||9999)<(prev.timeSpent||9999))
      ){best[key]=a;}
    });

    return Object.values(best)
      .sort((a,b)=>(b.accuracy||0)-(a.accuracy||0)||(b.score||0)-(a.score||0)||(a.timeSpent||9999)-(b.timeSpent||9999))
      .slice(0,20);
  };

  const leaders=buildLeaderboard(allAttempts,examFilter,diffFilter);
  const isMobile=window.innerWidth<=768;

  return(
    <div style={{paddingTop:80,padding:isMobile?"70px 16px 32px":"80px 40px 40px",maxWidth:800,margin:"0 auto"}}>

      {/* Header */}
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:48,marginBottom:8}}>🏆</div>
        <h1 style={{fontSize:28,fontWeight:900,margin:"0 0 6px"}}>Live <span style={{color:"#FF6A00"}}>Leaderboard</span></h1>
        <p style={{color:"#888",fontSize:13,margin:0}}>
          Real scores · Updates instantly when students submit tests ☁️
          {lastUpdate&&<span style={{marginLeft:8,color:"#22c55e",fontWeight:600}}>● Live</span>}
        </p>
      </div>

      {/* Stats bar */}
      {!loading&&(
        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",justifyContent:"center"}}>
          {[
            {l:"Total Attempts",v:allAttempts.length,c:"#FF6A00"},
            {l:"Students",v:new Set(allAttempts.map(a=>a.userId)).size,c:"#1d4ed8"},
            {l:"Avg Accuracy",v:allAttempts.length?Math.round(allAttempts.reduce((s,a)=>s+(a.accuracy||0),0)/allAttempts.length)+"%":"—",c:"#22c55e"},
            {l:"Top Score",v:allAttempts.length?(Math.max(...allAttempts.map(a=>a.accuracy||0))+"%"):"—",c:"#f59e0b"},
          ].map(s=>(
            <div key={s.l} style={{background:"#fff",borderRadius:12,padding:"10px 18px",border:"2px solid #f0f0f0",textAlign:"center",minWidth:100}}>
              <div style={{fontWeight:900,fontSize:18,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:"#888",marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div style={{display:"flex",gap:8,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>setExamFilter("all")} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:examFilter==="all"?"#FF6A00":"#e0e0e0",background:examFilter==="all"?"#FF6A00":"#fff",color:examFilter==="all"?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>All Exams</button>
        {EXAM_TYPES.map(e=><button key={e.id} onClick={()=>setExamFilter(e.id)} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:examFilter===e.id?e.color:"#e0e0e0",background:examFilter===e.id?e.color:"#fff",color:examFilter===e.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{e.icon} {e.label}</button>)}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>setDiffFilter("all")} style={{padding:"5px 12px",borderRadius:20,border:"2px solid",borderColor:diffFilter==="all"?"#555":"#e0e0e0",background:diffFilter==="all"?"#555":"#fff",color:diffFilter==="all"?"#fff":"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>All Levels</button>
        {["easy","medium","hard"].map(d=><button key={d} onClick={()=>setDiffFilter(d)} style={{padding:"5px 12px",borderRadius:20,border:"2px solid",borderColor:diffFilter===d?DCOL[d]:"#e0e0e0",background:diffFilter===d?DBG[d]:"#fff",color:diffFilter===d?DCOL[d]:"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>{d.charAt(0).toUpperCase()+d.slice(1)}</button>)}
      </div>

      {/* Table */}
      <div style={{background:"#fff",borderRadius:18,overflow:"hidden",border:"2px solid #f0f0f0",boxShadow:"0 4px 24px #00000008"}}>
        <div style={{background:"#000",padding:"12px 20px",display:"flex",gap:10,alignItems:"center"}}>
          <div style={{color:"#FF6A00",fontWeight:800,fontSize:12,width:36}}>#</div>
          <div style={{color:"#FF6A00",fontWeight:800,fontSize:12,flex:2}}>Student</div>
          <div style={{color:"#FF6A00",fontWeight:800,fontSize:12,flex:1}}>Exam</div>
          {!isMobile&&<div style={{color:"#FF6A00",fontWeight:800,fontSize:12,width:60}}>Score</div>}
          <div style={{color:"#FF6A00",fontWeight:800,fontSize:12,width:60}}>Accuracy</div>
          {!isMobile&&<div style={{color:"#FF6A00",fontWeight:800,fontSize:12,width:56}}>Time</div>}
        </div>

        {loading?(
          <div style={{display:"flex",justifyContent:"center",padding:40}}><Spinner/></div>
        ):leaders.length===0?(
          <div style={{textAlign:"center",padding:40}}>
            <div style={{fontSize:40,marginBottom:12}}>🎯</div>
            <p style={{color:"#aaa",marginBottom:16}}>No attempts yet for this filter.</p>
            <p style={{color:"#ccc",fontSize:13}}>Be the first to submit a test!</p>
          </div>
        ):leaders.map((l,i)=>{
          const et=EXAM_TYPES.find(e=>e.id===l.examType);
          const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":null;
          return(
            <div key={l.id||i} style={{padding:"12px 20px",display:"flex",gap:10,alignItems:"center",borderBottom:"1px solid #f8f8f8",background:i===0?"linear-gradient(90deg,#fff8f0,#fff)":i<3?"#fffcf9":"#fff",transition:"background .2s"}}
              onMouseOver={e=>e.currentTarget.style.background="#fff5ee"}
              onMouseOut={e=>e.currentTarget.style.background=i===0?"linear-gradient(90deg,#fff8f0,#fff)":i<3?"#fffcf9":"#fff"}>
              {/* Rank */}
              <div style={{width:36,fontWeight:900,fontSize:medal?20:14,color:medal?"inherit":"#aaa"}}>
                {medal||`#${i+1}`}
              </div>
              {/* Student */}
              <div style={{flex:2,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.userName||"Student"}</div>
                {l.testTitle&&<div style={{fontSize:10,color:"#aaa",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.testTitle}</div>}
              </div>
              {/* Exam */}
              <div style={{flex:1}}>
                <span style={{background:et?.color+"20"||"#f0f0f0",color:et?.color||"#888",padding:"3px 8px",borderRadius:10,fontSize:10,fontWeight:700}}>{et?.icon} {l.examType?.toUpperCase()}</span>
              </div>
              {/* Score */}
              {!isMobile&&<div style={{width:60,fontWeight:700,fontSize:13,color:"#FF6A00"}}>{l.score}/{l.total}</div>}
              {/* Accuracy */}
              <div style={{width:60}}>
                <div style={{fontWeight:800,fontSize:13,color:l.accuracy>=80?"#16a34a":l.accuracy>=60?"#d97706":"#dc2626"}}>{l.accuracy}%</div>
                <div style={{background:"#f0f0f0",height:3,borderRadius:2,marginTop:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:l.accuracy+"%",background:l.accuracy>=80?"#22c55e":l.accuracy>=60?"#f59e0b":"#ef4444",borderRadius:2}}/>
                </div>
              </div>
              {/* Time */}
              {!isMobile&&<div style={{width:56,fontSize:12,color:"#888"}}>{fmtT(l.timeSpent||0)}</div>}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div style={{textAlign:"center",marginTop:16,fontSize:12,color:"#aaa"}}>
        Showing best attempt per student · Updates live as tests are submitted
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ────────────────────────────────────────────────────────────
function ProfilePage({user,setUser,setPage}){
  const [tab,setTab]=useState("info");
  const [form,setForm]=useState({name:user?.name||"",phone:user?.phone||""});
  const [pf,setPf]=useState({cur:"",nw:"",cf:""});
  const [err,setErr]=useState({});
  const [saved,setSaved]=useState(false);
  const [loading,setLoading]=useState(false);

  const saveInfo=async()=>{
    if(!form.name.trim()){setErr({name:"Required"});return;}
    setLoading(true);
    try{
      await updateDoc(doc(db,"users",user.uid),{name:form.name.trim(),phone:form.phone.trim()});
      await updateProfile(auth.currentUser,{displayName:form.name.trim()});
      setUser(u=>({...u,name:form.name.trim(),phone:form.phone.trim()}));
      setSaved(true);setTimeout(()=>setSaved(false),2000);
    }catch(e){setErr({name:e.message});}
    finally{setLoading(false);}
  };

  const handleLogout=async()=>{
    await logout();
    setUser(null);
    setPage("home");
  };

  return(
    <div style={{paddingTop:80,padding:window.innerWidth<=768?"70px 16px 32px":"80px 40px 40px",maxWidth:600,margin:"0 auto"}}>
      <div style={{background:"linear-gradient(135deg,#000,#1a0a00)",borderRadius:18,padding:24,display:"flex",alignItems:"center",gap:18,marginBottom:22,border:"2px solid #FF6A0030"}}>
        {user?.photoURL
          ?<img src={user.photoURL} alt="" style={{width:64,height:64,borderRadius:"50%",flexShrink:0}}/>
          :<div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:900,color:"#fff",flexShrink:0}}>{user?.name?.charAt(0).toUpperCase()}</div>
        }
        <div style={{flex:1}}>
          <div style={{color:"#fff",fontWeight:900,fontSize:17}}>{user?.name}</div>
          <div style={{color:"#888",fontSize:13}}>{user?.email}</div>
          {user?.googleLogin&&<div style={{color:"#4285f4",fontSize:12,fontWeight:700,marginTop:2}}>🔵 Google Account · Cloud synced</div>}
        </div>
        <button onClick={handleLogout} style={{padding:"7px 14px",borderRadius:9,border:"none",background:"#dc2626",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:12}}>Logout</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["info","👤 Profile"],["danger","⚠️ Delete Account"]].map(([t,l])=>(
          <button key={t} onClick={()=>{setTab(t);setErr({});setSaved(false);}} style={{padding:"8px 14px",borderRadius:9,border:"2px solid",borderColor:tab===t?(t==="danger"?"#dc2626":"#FF6A00"):"#e0e0e0",background:tab===t?(t==="danger"?"#dc2626":"#FF6A00"):"#fff",color:tab===t?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      <div style={{background:"#fff",borderRadius:18,padding:26,border:"2px solid #f0f0f0"}}>
        {saved&&<div style={{background:"#dcfce7",border:"2px solid #86efac",borderRadius:9,padding:"9px 14px",marginBottom:14,fontSize:13,color:"#166534",fontWeight:600}}>✅ Saved to cloud!</div>}
        {tab==="info"&&(
          <>
            <h3 style={{fontWeight:900,marginBottom:18}}>Edit Profile</h3>
            <label style={LS}>Full Name</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={IS}/><Err m={err.name}/>
            <label style={LS}>Email (cannot change)</label><input value={user?.email} disabled style={{...IS,background:"#f5f5f5",color:"#888"}}/>
            <label style={LS}>Mobile</label><input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} style={IS} maxLength={10}/>
            {user?.googleLogin&&<div style={{background:"#eff6ff",borderRadius:10,padding:12,marginBottom:14,fontSize:13,color:"#1d4ed8"}}>🔵 Password managed by Google. Use Google account settings to change it.</div>}
            <button onClick={saveInfo} disabled={loading} style={{padding:"11px 28px",borderRadius:10,border:"none",background:loading?"#ccc":"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:8}}>
              {loading&&<Spinner size={16} color="#fff"/>}Save to Cloud
            </button>
          </>
        )}
        {tab==="danger"&&(
          <>
            <h3 style={{fontWeight:900,color:"#dc2626",marginBottom:10}}>Delete Account</h3>
            <p style={{color:"#666",marginBottom:18,lineHeight:1.6}}>This permanently deletes your account and all test data from the cloud. <b>Cannot be undone.</b></p>
            <button onClick={async()=>{
              if(!window.confirm("Permanently delete your account and all data?")) return;
              await deleteDoc(doc(db,"users",user.uid));
              await auth.currentUser?.delete();
              setUser(null);setPage("home");
            }} style={{padding:"11px 28px",borderRadius:10,border:"none",background:"#dc2626",color:"#fff",fontWeight:800,cursor:"pointer"}}>🗑️ Delete Account Permanently</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage(){
  const [tab,setTab]=useState("students");
  const [settings,setSettingsState]=useState({contentMode:"free"});
  const [students,setStudents]=useState([]);
  const [access,setAccess]=useState({});
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    getSettings().then(s=>setSettingsState(s));
    const q=query(collection(db,"users"),where("role","==","student"));
    const unsub=onSnapshot(q,snap=>{
      const list=snap.docs.map(d=>({id:d.id,...d.data()}));
      setStudents(list);
      const ac={};list.forEach(s=>{ac[s.uid||s.id]=s.accessEnabled||false;});
      setAccess(ac);setLoading(false);
    });
    return unsub;
  },[]);

  const toggleMode=async()=>{
    const nm={...settings,contentMode:settings.contentMode==="free"?"paid":"free"};
    setSettingsState(nm);await setSettings(nm);
  };

  const toggleAccess=async(uid,current)=>{
    const newVal=!current;
    setAccess(p=>({...p,[uid]:newVal}));
    await updateDoc(doc(db,"users",uid),{accessEnabled:newVal});
  };

  // Questions
  const [examType,setExamType]=useState("ssc");
  const [topicId,setTopicId]=useState(null);
  const [qf,setQf]=useState({difficulty:"easy",question_text:"",option_a:"",option_b:"",option_c:"",option_d:"",correct_answer:"a",explanation:"",youtube_link:""});
  const [qSaving,setQSaving]=useState(false);
  const [qSaved,setQSaved]=useState(false);
  const et=EXAM_TYPES.find(e=>e.id===examType)||EXAM_TYPES[0];
  const curTopic=et.topics.find(t=>t.id===topicId)||et.topics[0];

  const saveQ=async()=>{
    if(!qf.question_text.trim()||!qf.option_a.trim()||!qf.option_b.trim()){alert("Fill question + options A & B");return;}
    setQSaving(true);
    try{
      await addDoc(collection(db,"questions"),{
        ...qf,examType,topicId:curTopic.id,topicName:curTopic.name,
        createdAt:serverTimestamp(),
      });
      setQSaved(true);setTimeout(()=>setQSaved(false),2000);
      setQf(f=>({...f,question_text:"",option_a:"",option_b:"",option_c:"",option_d:"",explanation:"",youtube_link:""}));
    }catch(e){alert("Save failed: "+e.message);}
    finally{setQSaving(false);}
  };

  // Students create form
  const [sf,setSf]=useState({name:"",email:"",phone:"",password:"",confirmPwd:""});
  const [se,setSe]=useState({});
  const [sOk,setSok]=useState(false);
  const [search,setSearch]=useState("");
  const [cred,setCred]=useState(null);
  const [spw,setSpw]=useState(false);const [scw,setScw]=useState(false);

  const createStu=async()=>{
    const e={};
    if(!sf.name.trim()) e.name="Required";
    if(!sf.email.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sf.email)) e.email="Valid email required";
    if(!sf.password||sf.password.length<6) e.password="Min 6 chars";
    if(sf.password!==sf.confirmPwd) e.confirmPwd="Mismatch";
    setSe(e);if(Object.keys(e).length) return;
    try{
      await registerEmail(sf.email,sf.password,sf.name,sf.phone,"student");
      setCred({name:sf.name,email:sf.email,password:sf.password});
      setSf({name:"",email:"",phone:"",password:"",confirmPwd:""});setSe({});
      setSok(true);setTimeout(()=>setSok(false),3000);
    }catch(err){setSe({email:err.code==="auth/email-already-in-use"?"Already registered":err.message});}
  };

  // Edit Questions state
  const [allQuestions,setAllQuestions]=useState([]);
  const [qLoading,setQLoading]=useState(false);
  const [qSearch,setQSearch]=useState("");
  const [editingQ,setEditingQ]=useState(null); // question being edited
  const [editQForm,setEditQForm]=useState({});
  const [qExamFilter,setQExamFilter]=useState("ssc");
  const [delQId,setDelQId]=useState(null);
  const [qSaveMsg,setQSaveMsg]=useState("");


  // ── Exam Types state ──
  const [liveExamTypes,setLiveExamTypes]=useState(DEFAULT_EXAM_TYPES);
  const [editingET,setEditingET]=useState(null);
  const [etForm,setEtForm]=useState({});
  const [etSaving,setEtSaving]=useState(false);
  const [etMsg,setEtMsg]=useState("");
  const [addingTopic,setAddingTopic]=useState(null); // examType id
  const [newTopicName,setNewTopicName]=useState("");
  const [newTopicIcon,setNewTopicIcon]=useState("📌");

  useEffect(()=>{
    const unsub=onSnapshot(doc(db,"settings","examTypes"),d=>{
      if(d.exists()&&d.data().types?.length>0) setLiveExamTypes(d.data().types);
      else setLiveExamTypes(DEFAULT_EXAM_TYPES);
    });
    return unsub;
  },[]);

  const saveExamTypeEdit=async()=>{
    if(!etForm.label||!etForm.fullName) return;
    setEtSaving(true);
    const updated=liveExamTypes.map(e=>e.id===editingET?{...e,...etForm}:e);
    try{
      await saveExamTypes(updated);
      setEtMsg("✅ Saved!");setTimeout(()=>setEtMsg(""),2500);
      setEditingET(null);setEtForm({});
    }catch(e){setEtMsg("❌ "+e.message);}
    finally{setEtSaving(false);}
  };

  const toggleExamVisible=async(id)=>{
    const updated=liveExamTypes.map(e=>e.id===id?{...e,visible:e.visible===false?true:false}:e);
    await saveExamTypes(updated);
  };

  const addTopic=async(etId)=>{
    if(!newTopicName.trim()) return;
    const tid=`${etId}_${Date.now()}`;
    const updated=liveExamTypes.map(e=>e.id===etId?{...e,topics:[...e.topics,{id:tid,name:newTopicName.trim(),icon:newTopicIcon}]}:e);
    await saveExamTypes(updated);
    setNewTopicName("");setNewTopicIcon("📌");setAddingTopic(null);
  };

  const deleteTopic=async(etId,topicId)=>{
    const updated=liveExamTypes.map(e=>e.id===etId?{...e,topics:e.topics.filter(t=>t.id!==topicId)}:e);
    await saveExamTypes(updated);
  };

  // ── Banners state ──
  const [adminBanners,setAdminBanners]=useState([]);
  const [bannerForm,setBannerForm]=useState({title:"",subtitle:"",badge:"",imageUrl:"",bgColor:"#FF6A00",btnText:"",btnLink:"",order:0});
  const [bannerSaving,setBannerSaving]=useState(false);
  const [bannerMsg,setBannerMsg]=useState("");
  const [delBannerId,setDelBannerId]=useState(null);
  const [editingBanner,setEditingBanner]=useState(null);

  useEffect(()=>{
    const q=query(collection(db,"banners"),orderBy("order","asc"),limit(20));
    const unsub=onSnapshot(q,snap=>setAdminBanners(snap.docs.map(d=>({id:d.id,...d.data()}))));
    return unsub;
  },[]);

  const saveBanner=async()=>{
    if(!bannerForm.title.trim()){alert("Title required");return;}
    setBannerSaving(true);
    try{
      if(editingBanner){
        await updateDoc(doc(db,"banners",editingBanner),bannerForm);
        setEditingBanner(null);
      } else {
        await addDoc(collection(db,"banners"),{...bannerForm,createdAt:serverTimestamp()});
      }
      setBannerForm({title:"",subtitle:"",badge:"",imageUrl:"",bgColor:"#FF6A00",btnText:"",btnLink:"",order:adminBanners.length});
      setBannerMsg("✅ Banner saved!");setTimeout(()=>setBannerMsg(""),2500);
    }catch(e){setBannerMsg("❌ "+e.message);}
    finally{setBannerSaving(false);}
  };

  const deleteBanner=async(id)=>{
    await deleteDoc(doc(db,"banners",id));
    setDelBannerId(null);
  };

  const moveBanner=async(id,dir)=>{
    const idx=adminBanners.findIndex(b=>b.id===id);
    const swapIdx=idx+dir;
    if(swapIdx<0||swapIdx>=adminBanners.length) return;
    const a=adminBanners[idx];const b=adminBanners[swapIdx];
    await updateDoc(doc(db,"banners",a.id),{order:b.order??swapIdx});
    await updateDoc(doc(db,"banners",b.id),{order:a.order??idx});
  };

  const [seedLoading,setSeedLoading]=useState(false);
  const [seedMsg,setSeedMsg]=useState("");
  const [seedDone,setSeedDone]=useState(false);

  // Seed all generated questions to Firestore (one-time)
  const seedAllQuestions=async()=>{
    setSeedLoading(true);setSeedMsg("");setSeedDone(false);
    try{
      const allTests=getAllTests();
      let added=0;let skipped=0;
      for(const test of allTests){
        // Check how many questions exist for this test
        const existing=await getDocs(query(
          collection(db,"questions"),
          where("testId","==",test.id),
          limit(30)
        ));
        if(existing.docs.length>=30){
          skipped+=30;
          continue; // already fully seeded
        }
        // Seed missing questions
        const qs=generateQuestionsForTest(test);
        const existingIds=new Set(existing.docs.map(d=>d.data().id));
        for(const q of qs){
          if(!existingIds.has(q.id)){
            await addDoc(collection(db,"questions"),{...q,createdAt:serverTimestamp()});
            added++;
          }
        }
      }
      setSeedMsg(`✅ Added ${added} questions · ${skipped} already existed`);
      setSeedDone(true);
    }catch(e){
      setSeedMsg("❌ Error: "+e.message);
    }finally{setSeedLoading(false);}
  };

  useEffect(()=>{
    if(tab!=="editq") return;
    setQLoading(true);
    // Load up to 2000 questions (all seeded + manually added)
    // SSC alone = 6 topics × 3 diffs × 30 = 540, total 3 exams = 1620+
    const q=query(collection(db,"questions"),limit(2000));
    const unsub=onSnapshot(q,snap=>{
      setAllQuestions(snap.docs.map(d=>({id:d.id,...d.data()})));
      setQLoading(false);
    });
    return unsub;
  },[tab]);

  const saveEditQ=async()=>{
    if(!editingQ) return;
    try{
      await updateDoc(doc(db,"questions",editingQ),editQForm);
      setEditingQ(null);setEditQForm({});
      setQSaveMsg("✅ Question updated!");setTimeout(()=>setQSaveMsg(""),3000);
    }catch(e){setQSaveMsg("❌ Error: "+e.message);}
  };

  const deleteQuestion=async(id)=>{
    try{
      await deleteDoc(doc(db,"questions",id));
      setDelQId(null);
    }catch(e){alert("Delete failed: "+e.message);}
  };

  // ── Bulk delete state ──
  const [bulkDelMode,setBulkDelMode]=useState(false);
  const [bulkDelExam,setBulkDelExam]=useState("");
  const [bulkDelTopic,setBulkDelTopic]=useState("");
  const [bulkDelDiff,setBulkDelDiff]=useState("");
  const [bulkDelLoading,setBulkDelLoading]=useState(false);
  const [bulkDelMsg,setBulkDelMsg]=useState("");
  const [bulkDelConfirm,setBulkDelConfirm]=useState(false);

  // Count questions matching bulk delete selection
  const bulkDelCount=allQuestions.filter(q=>{
    if(bulkDelExam&&q.examType!==bulkDelExam) return false;
    if(bulkDelTopic&&q.topicId!==bulkDelTopic&&q.topicName!==bulkDelTopic) return false;
    if(bulkDelDiff&&q.difficulty!==bulkDelDiff) return false;
    return true;
  }).length;

  const bulkDeleteQuestions=async()=>{
    if(!bulkDelExam){alert("Select at least an exam type");return;}
    setBulkDelLoading(true);setBulkDelMsg("");
    try{
      // Get all matching question docs
      let q=query(collection(db,"questions"),where("examType","==",bulkDelExam),limit(2000));
      const snap=await getDocs(q);
      let toDelete=snap.docs;
      // Filter further by topic/difficulty client-side
      if(bulkDelTopic) toDelete=toDelete.filter(d=>{
        const data=d.data();
        return data.topicId===bulkDelTopic||data.topicName===bulkDelTopic;
      });
      if(bulkDelDiff) toDelete=toDelete.filter(d=>d.data().difficulty===bulkDelDiff);
      // Delete in batches
      let deleted=0;
      for(const d of toDelete){
        await deleteDoc(doc(db,"questions",d.id));
        deleted++;
      }
      setBulkDelMsg(`✅ Deleted ${deleted} questions from Firestore`);
      setBulkDelConfirm(false);
      setBulkDelExam("");setBulkDelTopic("");setBulkDelDiff("");
    }catch(e){
      setBulkDelMsg("❌ Error: "+e.message);
    }finally{setBulkDelLoading(false);}
  };

  const [qTopicFilter,setQTopicFilter]=useState("");
  const [qDiffFilter,setQDiffFilter]=useState("");

  const filteredQs=allQuestions.filter(q=>{
    const matchExam=!qExamFilter||q.examType===qExamFilter;
    const matchTopic=!qTopicFilter||q.topicId===qTopicFilter||q.topicName===qTopicFilter;
    const matchDiff=!qDiffFilter||q.difficulty===qDiffFilter;
    const matchSearch=!qSearch||
      q.question_text?.toLowerCase().includes(qSearch.toLowerCase())||
      q.topicName?.toLowerCase().includes(qSearch.toLowerCase())||
      q.testTitle?.toLowerCase().includes(qSearch.toLowerCase());
    return matchExam&&matchTopic&&matchDiff&&matchSearch;
  });

  // Notices
  const [dbNotices,setDbNotices]=useState([]);
  const [nf,setNf]=useState({title:"",body:"",link:"",imageUrl:""});
  const [nSaving,setNSaving]=useState(false);
  const [nSaved,setNSaved]=useState(false);
  const [delNoticeId,setDelNoticeId]=useState(null);

  useEffect(()=>{
    const q=query(collection(db,"notices"),orderBy("createdAt","desc"));
    const unsub=onSnapshot(q,snap=>setDbNotices(snap.docs.map(d=>({id:d.id,...d.data()}))));
    return unsub;
  },[]);

  const saveNotice=async()=>{
    if(!nf.title.trim()||!nf.body.trim()){alert("Title and body required");return;}
    setNSaving(true);
    try{
      await addDoc(collection(db,"notices"),{...nf,createdAt:serverTimestamp()});
      setNf({title:"",body:"",link:"",imageUrl:""});
      setNSaved(true);setTimeout(()=>setNSaved(false),2000);
    }catch(e){alert("Error: "+e.message);}
    finally{setNSaving(false);}
  };

  const deleteNotice=async(id)=>{
    await deleteDoc(doc(db,"notices",id));
    setDelNoticeId(null);
  };

  // Bulk upload
  const [upFile,setUpFile]=useState(null);
  const [upRows,setUpRows]=useState([]);
  const [upMsg,setUpMsg]=useState("");
  const [upLoading,setUpLoading]=useState(false);
  const fRef=useRef(null);

  const handleFile=e=>{
    const file=e.target.files[0];if(!file) return;
    setUpFile(file);setUpRows([]);setUpMsg("");
    const r=new FileReader();
    r.onload=ev=>{
      // Proper CSV parser that handles quoted commas
      const parseCSVLine=line=>{
        const result=[];let cur="";let inQ=false;
        for(let i=0;i<line.length;i++){
          if(line[i]==='"'){inQ=!inQ;}
          else if(line[i]===","&&!inQ){result.push(cur.trim());cur="";}
          else{cur+=line[i];}
        }
        result.push(cur.trim());
        return result;
      };

      const lines=ev.target.result.trim().split(/\r?\n/).filter(Boolean);
      if(lines.length<2){setUpMsg("❌ Need header row + at least 1 data row");return;}

      const hdrs=parseCSVLine(lines[0]).map(h=>h.toLowerCase().replace(/"/g,"").trim());
      const miss=["question_text","option_a","option_b","correct_answer"].filter(req=>!hdrs.includes(req));
      if(miss.length){setUpMsg(`❌ Missing required columns: ${miss.join(", ")}`);return;}

      const rows=lines.slice(1).map((l,i)=>{
        const vals=parseCSVLine(l);
        const o={};
        hdrs.forEach((h,idx)=>{
          let v=(vals[idx]||"").trim().replace(/^"|"$/g,"");
          // Normalize difficulty: Easy→easy, Medium→medium, Hard→hard
          if(h==="difficulty") v=v.toLowerCase();
          // Normalize correct_answer: B→b, A→a
          if(h==="correct_answer") v=v.toLowerCase().replace(/\..*$/,"");// "B." → "b"
          o[h]=v;
        });
        return{...o,_row:i+2};
      });

      // Count by difficulty
      const diffCounts={easy:0,medium:0,hard:0};
      rows.forEach(r=>{
        const d=r.difficulty?.toLowerCase();
        if(diffCounts[d]!==undefined) diffCounts[d]++;
      });
      const diffSummary=Object.entries(diffCounts).filter(([,v])=>v>0).map(([d,v])=>`${v} ${d}`).join(", ");

      setUpRows(rows);
      setUpMsg(`✅ ${rows.length} rows ready — ${diffSummary} · Will create 3 separate tests`);
    };
    r.readAsText(file);
  };

  const importBulk=async()=>{
    if(!examType){alert("Select exam type first");return;}
    if(!topicId){alert("Select a topic first");return;}
    setUpLoading(true);
    try{
      const selET=liveExamTypes.find(e=>e.id===examType)||DEFAULT_EXAM_TYPES.find(e=>e.id===examType);
      const selTopic=(selET?.topics||[]).find(t=>t.id===topicId);
      const fallbackDiff=qf.difficulty||"easy";

      // Group rows by difficulty — each difficulty gets its own testId
      const VALID_DIFFS=["easy","medium","hard"];
      let saved=0;const summary={easy:0,medium:0,hard:0};

      for(const r of upRows){
        // Use row's own difficulty if valid, else fall back to Step 3 selection
        const rowDiff=VALID_DIFFS.includes(r.difficulty?.trim().toLowerCase())
          ? r.difficulty.trim().toLowerCase()
          : fallbackDiff;

        const testId=`${topicId}_${rowDiff}`;
        const testTitle=`${selTopic?.name||topicId} – Test ${VALID_DIFFS.indexOf(rowDiff)+1}`;

        await addDoc(collection(db,"questions"),{
          question_text: r.question_text||"",
          option_a:      r.option_a||"",
          option_b:      r.option_b||"",
          option_c:      r.option_c||"",
          option_d:      r.option_d||"",
          correct_answer:(r.correct_answer||"a").toLowerCase().trim(),
          explanation:   r.explanation||"",
          youtube_link:  r.youtube_link||"",
          difficulty:    rowDiff,
          examType:      examType,
          topicId:       topicId,
          topicName:     selTopic?.name||topicId,
          testId:        testId,
          testTitle:     testTitle,
          createdAt:     serverTimestamp(),
          isSeeded:      false,
          addedByAdmin:  true,
        });
        saved++;
        if(summary[rowDiff]!==undefined) summary[rowDiff]++;
        else summary[rowDiff]=1;
      }

      const parts=Object.entries(summary).filter(([,v])=>v>0).map(([d,v])=>`${v} ${d}`);
      setUpMsg(`✅ ${saved} questions saved → ${selET?.label} / ${selTopic?.name}: ${parts.join(" · ")} (3 separate tests)`);
      setUpRows([]);setUpFile(null);if(fRef.current)fRef.current.value="";
    }catch(err){
      setUpMsg("❌ Import failed: "+err.message);
    }finally{setUpLoading(false);}
  };

  const filtStu=students.filter(s=>s.name?.toLowerCase().includes(search.toLowerCase())||s.email?.toLowerCase().includes(search.toLowerCase()));
  const TABS=[{id:"students",l:"👥 Students"},{id:"exams",l:"🎯 Exam Types"},{id:"banners",l:"🖼️ Banners"},{id:"questions",l:"📝 Add Question"},{id:"editq",l:"✏️ Edit Questions"},{id:"bulk",l:"📤 Bulk Upload"},{id:"notices",l:"📢 Notices"},{id:"settings",l:"⚙️ Settings"}];

  return(
    <div style={{paddingTop:80,padding:window.innerWidth<=768?"70px 14px 32px":"80px 28px 40px",maxWidth:1000,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:10}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:900,margin:0}}>Admin Dashboard</h1>
          <p style={{color:"#888",margin:"3px 0 0",fontSize:12}}>Rank Achievers Academy · Anantapur · Firebase Backend ☁️</p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:9,border:"2px solid",borderColor:tab===t.id?"#FF6A00":"#e0e0e0",background:tab===t.id?"#FF6A00":"#fff",color:tab===t.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.l}</button>)}
        </div>
      </div>

      {/* ── EXAM TYPES TAB ── */}
      {tab==="exams"&&(
        <div>
          {etMsg&&<div style={{padding:"10px 16px",borderRadius:10,marginBottom:16,fontSize:13,fontWeight:700,background:etMsg.startsWith("✅")?"#dcfce7":"#fee2e2",color:etMsg.startsWith("✅")?"#166534":"#dc2626"}}>{etMsg}</div>}
          <div style={{display:"grid",gridTemplateColumns:window.innerWidth<=768?"1fr":"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
            {liveExamTypes.map(et=>(
              <div key={et.id} style={{background:"#fff",borderRadius:18,padding:22,border:"2px solid",borderColor:editingET===et.id?et.color:"#f0f0f0"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <span style={{fontSize:28}}>{et.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:900,fontSize:16,color:et.color}}>{et.label}</div>
                    <div style={{fontSize:12,color:"#888"}}>{et.fullName}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div onClick={()=>toggleExamVisible(et.id)} style={{width:40,height:22,borderRadius:11,background:et.visible===false?"#e0e0e0":"#22c55e",position:"relative",cursor:"pointer",transition:"background .3s",flexShrink:0}}>
                      <div style={{position:"absolute",top:2,left:et.visible===false?2:20,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .3s",boxShadow:"0 1px 4px #00000030"}}/>
                    </div>
                    <span style={{fontSize:10,color:et.visible===false?"#aaa":"#22c55e",fontWeight:700,whiteSpace:"nowrap"}}>{et.visible===false?"Hidden":"Shown"}</span>
                  </div>
                </div>

                {editingET===et.id?(
                  <div>
                    <label style={LS}>Label</label><input value={etForm.label||""} onChange={e=>setEtForm(f=>({...f,label:e.target.value}))} style={IS} placeholder="SSC"/>
                    <label style={LS}>Full Name</label><input value={etForm.fullName||""} onChange={e=>setEtForm(f=>({...f,fullName:e.target.value}))} style={IS}/>
                    <label style={LS}>Description</label><input value={etForm.desc||""} onChange={e=>setEtForm(f=>({...f,desc:e.target.value}))} style={IS}/>
                    <label style={LS}>Icon (emoji)</label><input value={etForm.icon||""} onChange={e=>setEtForm(f=>({...f,icon:e.target.value}))} style={IS}/>
                    <label style={LS}>Color</label>
                    <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center"}}>
                      <input type="color" value={etForm.color||"#FF6A00"} onChange={e=>setEtForm(f=>({...f,color:e.target.value}))} style={{width:44,height:38,borderRadius:8,border:"2px solid #f0f0f0",cursor:"pointer"}}/>
                      <input value={etForm.color||""} onChange={e=>setEtForm(f=>({...f,color:e.target.value}))} style={{...IS,marginBottom:0,flex:1}}/>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={saveExamTypeEdit} disabled={etSaving} style={{flex:2,padding:"10px 0",borderRadius:10,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                        {etSaving&&<Spinner size={14} color="#fff"/>}Save
                      </button>
                      <button onClick={()=>{setEditingET(null);setEtForm({});}} style={{flex:1,padding:"10px 0",borderRadius:10,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer"}}>Cancel</button>
                    </div>
                  </div>
                ):(
                  <>
                    <p style={{fontSize:12,color:"#666",marginBottom:12}}>{et.desc}</p>
                    <button onClick={()=>{setEditingET(et.id);setEtForm({label:et.label,fullName:et.fullName,desc:et.desc,icon:et.icon,color:et.color});}} style={{width:"100%",padding:"8px 0",borderRadius:10,border:`2px solid ${et.color}`,background:et.bg||"#fff5ee",color:et.color,fontWeight:700,cursor:"pointer",marginBottom:12,fontSize:13}}>✏️ Edit Exam Details</button>
                    <div style={{fontSize:12,fontWeight:700,color:"#555",marginBottom:8}}>Topics ({et.topics?.length||0})</div>
                    <div style={{maxHeight:160,overflowY:"auto",display:"flex",flexDirection:"column",gap:5,marginBottom:10}}>
                      {(et.topics||[]).map(t=>(
                        <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:"#f8f8f8",borderRadius:8}}>
                          <span style={{fontSize:14}}>{t.icon}</span>
                          <span style={{flex:1,fontSize:12,fontWeight:600}}>{t.name}</span>
                          <button onClick={()=>deleteTopic(et.id,t.id)} style={{padding:"2px 8px",borderRadius:6,border:"none",background:"#fee2e2",color:"#dc2626",fontSize:10,fontWeight:700,cursor:"pointer"}}>✕</button>
                        </div>
                      ))}
                    </div>
                    {addingTopic===et.id?(
                      <div style={{background:"#f8f8f8",borderRadius:10,padding:12,border:"2px solid #FF6A0030"}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#FF6A00",marginBottom:8}}>➕ New Topic</div>
                        <div style={{display:"flex",gap:6,marginBottom:8}}>
                          <input value={newTopicIcon} onChange={e=>setNewTopicIcon(e.target.value)} style={{...IS,width:44,marginBottom:0,textAlign:"center",padding:"8px 4px"}} maxLength={4}/>
                          <input value={newTopicName} onChange={e=>setNewTopicName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTopic(et.id)} style={{...IS,flex:1,marginBottom:0}} placeholder="Topic name..."/>
                        </div>
                        <div style={{display:"flex",gap:6}}>
                          <button onClick={()=>addTopic(et.id)} style={{flex:1,padding:"8px 0",borderRadius:8,border:"none",background:"#FF6A00",color:"#fff",fontWeight:700,cursor:"pointer"}}>Add</button>
                          <button onClick={()=>{setAddingTopic(null);setNewTopicName("");}} style={{flex:1,padding:"8px 0",borderRadius:8,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer"}}>Cancel</button>
                        </div>
                      </div>
                    ):(
                      <button onClick={()=>setAddingTopic(et.id)} style={{width:"100%",padding:"7px 0",borderRadius:9,border:"2px dashed #e0e0e0",background:"#fff",color:"#888",fontWeight:700,cursor:"pointer",fontSize:12}}>+ Add Topic</button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BANNERS TAB ── */}
      {tab==="banners"&&(
        <div style={{display:"grid",gridTemplateColumns:window.innerWidth<=768?"1fr":"1fr 1fr",gap:22,alignItems:"start"}}>
          <div style={{background:"#fff",borderRadius:18,padding:26,border:"2px solid #f0f0f0"}}>
            <h3 style={{fontWeight:900,marginBottom:4}}>{editingBanner?"✏️ Edit Banner":"🖼️ Add Banner"}</h3>
            <p style={{color:"#888",fontSize:13,marginBottom:16}}>Banners auto-scroll on the home page</p>
            {bannerMsg&&<div style={{padding:"9px 14px",borderRadius:9,marginBottom:12,fontSize:13,fontWeight:700,background:bannerMsg.startsWith("✅")?"#dcfce7":"#fee2e2",color:bannerMsg.startsWith("✅")?"#166534":"#dc2626"}}>{bannerMsg}</div>}

            {bannerForm.title&&(
              <div style={{background:bannerForm.bgColor||"#FF6A00",borderRadius:12,padding:"14px 18px",marginBottom:14,position:"relative",overflow:"hidden"}}>
                {bannerForm.imageUrl&&<img src={bannerForm.imageUrl} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.4}}/>}
                <div style={{position:"relative"}}>
                  {bannerForm.badge&&<div style={{fontSize:9,color:"rgba(255,255,255,.8)",fontWeight:700,marginBottom:4}}>{bannerForm.badge}</div>}
                  <div style={{fontWeight:900,color:"#fff",fontSize:14}}>{bannerForm.title}</div>
                  {bannerForm.subtitle&&<div style={{color:"rgba(255,255,255,.75)",fontSize:11,marginTop:3}}>{bannerForm.subtitle}</div>}
                  {bannerForm.btnText&&<div style={{marginTop:8,display:"inline-block",background:"#fff",color:bannerForm.bgColor||"#FF6A00",padding:"4px 12px",borderRadius:7,fontSize:11,fontWeight:800}}>{bannerForm.btnText}</div>}
                </div>
              </div>
            )}

            <label style={LS}>Title *</label>
            <input value={bannerForm.title} onChange={e=>setBannerForm(f=>({...f,title:e.target.value}))} style={IS} placeholder="e.g. SSC CGL 2025 Dates Released!"/>
            <label style={LS}>Subtitle</label>
            <input value={bannerForm.subtitle} onChange={e=>setBannerForm(f=>({...f,subtitle:e.target.value}))} style={IS} placeholder="Short description..."/>
            <label style={LS}>Badge</label>
            <input value={bannerForm.badge} onChange={e=>setBannerForm(f=>({...f,badge:e.target.value}))} style={IS} placeholder="🔥 NEW · IMPORTANT"/>
            <label style={LS}>Background Color</label>
            <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center"}}>
              <input type="color" value={bannerForm.bgColor} onChange={e=>setBannerForm(f=>({...f,bgColor:e.target.value}))} style={{width:44,height:38,borderRadius:8,border:"2px solid #f0f0f0",cursor:"pointer"}}/>
              <input value={bannerForm.bgColor} onChange={e=>setBannerForm(f=>({...f,bgColor:e.target.value}))} style={{...IS,marginBottom:0,flex:1}}/>
              {["#FF6A00","#1d4ed8","#16a34a","#7c3aed","#dc2626","#000"].map(c=>(
                <div key={c} onClick={()=>setBannerForm(f=>({...f,bgColor:c}))} style={{width:22,height:22,borderRadius:"50%",background:c,cursor:"pointer",border:bannerForm.bgColor===c?"3px solid #333":"2px solid #e0e0e0",flexShrink:0}}/>
              ))}
            </div>
            <label style={LS}>Image URL (optional)</label>
            <input value={bannerForm.imageUrl} onChange={e=>setBannerForm(f=>({...f,imageUrl:e.target.value}))} style={IS} placeholder="https://..."/>
            <label style={LS}>Button Text</label>
            <input value={bannerForm.btnText} onChange={e=>setBannerForm(f=>({...f,btnText:e.target.value}))} style={IS} placeholder="Apply Now"/>
            <label style={LS}>Button Link</label>
            <input value={bannerForm.btnLink} onChange={e=>setBannerForm(f=>({...f,btnLink:e.target.value}))} style={IS} placeholder="https://..."/>
            <label style={LS}>Display Order (0 = first)</label>
            <input type="number" value={bannerForm.order} onChange={e=>setBannerForm(f=>({...f,order:parseInt(e.target.value)||0}))} style={IS}/>

            <div style={{display:"flex",gap:10}}>
              <button onClick={saveBanner} disabled={bannerSaving} style={{flex:2,padding:"12px 0",borderRadius:11,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                {bannerSaving&&<Spinner size={16} color="#fff"/>}{editingBanner?"💾 Update":"🖼️ Add Banner"}
              </button>
              {editingBanner&&<button onClick={()=>{setEditingBanner(null);setBannerForm({title:"",subtitle:"",badge:"",imageUrl:"",bgColor:"#FF6A00",btnText:"",btnLink:"",order:adminBanners.length});}} style={{flex:1,padding:"12px 0",borderRadius:11,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer"}}>Cancel</button>}
            </div>
          </div>

          <div style={{background:"#fff",borderRadius:18,padding:26,border:"2px solid #f0f0f0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h3 style={{fontWeight:900,margin:0}}>Live Banners</h3>
              <span style={{background:"#FF6A00",color:"#fff",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:800}}>{adminBanners.length} · ☁️</span>
            </div>
            {adminBanners.length===0?(
              <div style={{textAlign:"center",padding:40,color:"#aaa"}}>
                <div style={{fontSize:48,marginBottom:12}}>🖼️</div>
                <p>No banners yet. Add one to show it on the home page.</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {adminBanners.map((b,i)=>(
                  <div key={b.id} style={{borderRadius:12,overflow:"hidden",border:"2px solid #f0f0f0"}}>
                    <div style={{background:b.bgColor||"#FF6A00",padding:"12px 16px",position:"relative",overflow:"hidden",minHeight:60}}>
                      {b.imageUrl&&<img src={b.imageUrl} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.35}}/>}
                      <div style={{position:"relative"}}>
                        {b.badge&&<div style={{fontSize:9,color:"rgba(255,255,255,.8)",fontWeight:700,marginBottom:3}}>{b.badge}</div>}
                        <div style={{fontWeight:800,color:"#fff",fontSize:13}}>{b.title}</div>
                        {b.subtitle&&<div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginTop:2}}>{b.subtitle}</div>}
                      </div>
                    </div>
                    <div style={{padding:"8px 12px",display:"flex",gap:6,alignItems:"center",background:"#f9f9f9"}}>
                      <button onClick={()=>moveBanner(b.id,-1)} disabled={i===0} style={{padding:"4px 8px",borderRadius:6,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,fontSize:11,cursor:"pointer",opacity:i===0?.4:1}}>↑</button>
                      <button onClick={()=>moveBanner(b.id,1)} disabled={i===adminBanners.length-1} style={{padding:"4px 8px",borderRadius:6,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,fontSize:11,cursor:"pointer",opacity:i===adminBanners.length-1?.4:1}}>↓</button>
                      <button onClick={()=>{setEditingBanner(b.id);setBannerForm({title:b.title||"",subtitle:b.subtitle||"",badge:b.badge||"",imageUrl:b.imageUrl||"",bgColor:b.bgColor||"#FF6A00",btnText:b.btnText||"",btnLink:b.btnLink||"",order:b.order||0});}} style={{flex:1,padding:"5px 0",borderRadius:7,border:"2px solid #FF6A00",background:"#fff5ee",color:"#FF6A00",fontWeight:700,fontSize:11,cursor:"pointer"}}>✏️ Edit</button>
                      {delBannerId===b.id?(
                        <><button onClick={()=>deleteBanner(b.id)} style={{padding:"5px 10px",borderRadius:7,border:"none",background:"#dc2626",color:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>Delete</button>
                        <button onClick={()=>setDelBannerId(null)} style={{padding:"5px 8px",borderRadius:7,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,fontSize:10,cursor:"pointer"}}>✕</button></>
                      ):(
                        <button onClick={()=>setDelBannerId(b.id)} style={{padding:"5px 10px",borderRadius:7,border:"none",background:"#fee2e2",color:"#dc2626",fontWeight:700,fontSize:11,cursor:"pointer"}}>🗑️</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {tab==="settings"&&(
        <div style={{background:"#fff",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
          <h3 style={{fontWeight:900,marginBottom:6}}>Content Access Settings</h3>
          <p style={{color:"#888",fontSize:13,marginBottom:24}}>Firebase-backed — changes apply instantly for all students.</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",background:settings.contentMode==="free"?"#f0fdf4":"#fff5ee",borderRadius:14,border:"2px solid",borderColor:settings.contentMode==="free"?"#86efac":"#FF6A00",marginBottom:28}}>
            <div>
              <div style={{fontWeight:900,fontSize:17,color:settings.contentMode==="free"?"#16a34a":"#FF6A00"}}>{settings.contentMode==="free"?"🆓 Free Mode — All content is public":"🔒 Paid Mode — Students need admin approval"}</div>
              <div style={{color:"#888",fontSize:13,marginTop:3}}>{settings.contentMode==="free"?"Every student can access all tests without restriction.":"Only students you individually enable can access content."}</div>
            </div>
            <div onClick={toggleMode} style={{width:60,height:32,borderRadius:16,background:settings.contentMode==="free"?"#22c55e":"#ccc",position:"relative",cursor:"pointer",transition:"background .3s",flexShrink:0,marginLeft:20}}>
              <div style={{position:"absolute",top:3,left:settings.contentMode==="free"?31:3,width:26,height:26,borderRadius:"50%",background:"#fff",transition:"left .3s",boxShadow:"0 2px 6px #00000030"}}/>
            </div>
          </div>
          {settings.contentMode==="paid"&&(
            <>
              <h4 style={{fontWeight:800,marginBottom:12}}>Student Access Control <span style={{fontSize:11,color:"#888",fontWeight:400}}>— changes save to Firebase instantly</span></h4>
              {loading?<div style={{display:"flex",justifyContent:"center",padding:24}}><Spinner/></div>
              :students.length===0?<div style={{textAlign:"center",padding:28,color:"#aaa"}}>No students yet.</div>
              :<div style={{display:"flex",flexDirection:"column",gap:10}}>
                {students.map(s=>{
                  const ena=!!access[s.uid||s.id];
                  return(
                    <div key={s.uid||s.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",background:"#f9f9f9",borderRadius:11,border:"2px solid",borderColor:ena?"#86efac":"#f0f0f0"}}>
                      <div style={{width:38,height:38,borderRadius:"50%",background:ena?"#22c55e":"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:15,flexShrink:0}}>{s.name?.charAt(0)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:13}}>{s.name}</div>
                        <div style={{fontSize:11,color:"#888"}}>{s.email}</div>
                      </div>
                      <span style={{fontSize:12,fontWeight:700,color:ena?"#16a34a":"#dc2626"}}>{ena?"✅ Enabled":"🔒 Locked"}</span>
                      <div onClick={()=>toggleAccess(s.uid||s.id,ena)} style={{width:48,height:26,borderRadius:13,background:ena?"#22c55e":"#e0e0e0",position:"relative",cursor:"pointer",transition:"background .3s",flexShrink:0}}>
                        <div style={{position:"absolute",top:2,left:ena?24:2,width:22,height:22,borderRadius:"50%",background:"#fff",transition:"left .3s",boxShadow:"0 1px 4px #00000030"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>}
            </>
          )}
        </div>
      )}

      {/* STUDENTS */}
      {tab==="students"&&(
        <div>
          {cred&&(
            <div style={{position:"fixed",inset:0,background:"#00000090",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{background:"#fff",borderRadius:18,padding:32,maxWidth:400,width:"90%",textAlign:"center"}}>
                <div style={{fontSize:44,marginBottom:10}}>🎉</div>
                <h3 style={{fontWeight:900,marginBottom:6}}>Account Created in Firebase!</h3>
                <p style={{color:"#666",fontSize:13,marginBottom:18}}>Share these login credentials</p>
                <div style={{background:"#f8f8f8",borderRadius:12,padding:18,textAlign:"left",marginBottom:18,border:"2px solid #FF6A0030"}}>
                  {[["NAME",cred.name],["EMAIL",cred.email],["PASSWORD",cred.password]].map(([l,v])=>(
                    <div key={l} style={{marginBottom:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:"#888",marginBottom:3}}>{l}</div>
                      <div style={{fontWeight:700,fontFamily:"monospace",background:"#fff",padding:"7px 10px",borderRadius:7,border:"2px solid",borderColor:l==="PASSWORD"?"#FF6A00":"#e0e0e0",color:l==="PASSWORD"?"#FF6A00":"#000"}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{const t=`Rank Achievers Academy\nName: ${cred.name}\nEmail: ${cred.email}\nPassword: ${cred.password}\nLogin: www.rankachievers.in`;navigator.clipboard?.writeText(t).then(()=>alert("Copied!"));}} style={{flex:1,padding:"10px 0",borderRadius:9,border:"2px solid #FF6A00",background:"#fff",color:"#FF6A00",fontWeight:800,cursor:"pointer"}}>📋 Copy</button>
                  <button onClick={()=>setCred(null)} style={{flex:1,padding:"10px 0",borderRadius:9,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer"}}>Done ✓</button>
                </div>
              </div>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:window.innerWidth<=768?"1fr":"1fr 1fr",gap:22,alignItems:"start"}}>
            <div style={{background:"#fff",borderRadius:18,padding:26,border:"2px solid #f0f0f0"}}>
              <h3 style={{fontWeight:900,marginBottom:4}}>➕ Create Student Account</h3>
              <p style={{color:"#888",fontSize:13,marginBottom:18}}>Creates real Firebase auth account</p>
              {sOk&&<div style={{background:"#dcfce7",border:"2px solid #86efac",borderRadius:9,padding:"9px 14px",marginBottom:12,fontSize:13,color:"#166534",fontWeight:600}}>✅ Account created in Firebase!</div>}
              <label style={LS}>Full Name *</label><input value={sf.name} onChange={e=>{setSf(f=>({...f,name:e.target.value}));setSe(p=>({...p,name:""}));}} style={IS} placeholder="Student name"/><Err m={se.name}/>
              <label style={LS}>Email *</label><input value={sf.email} type="email" onChange={e=>{setSf(f=>({...f,email:e.target.value}));setSe(p=>({...p,email:""}));}} style={IS} placeholder="student@example.com"/><Err m={se.email}/>
              <label style={LS}>Mobile</label><input value={sf.phone} maxLength={10} onChange={e=>setSf(f=>({...f,phone:e.target.value}))} style={IS} placeholder="10-digit (optional)"/>
              <label style={LS}>Password *</label>
              <div style={{position:"relative",marginBottom:6}}>
                <input type={spw?"text":"password"} value={sf.password} onChange={e=>{setSf(f=>({...f,password:e.target.value}));setSe(p=>({...p,password:""}));}} placeholder="Min 6 chars" style={{...IS,marginBottom:0,paddingRight:38}}/>
                <button onClick={()=>setSpw(s=>!s)} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:14}}>{spw?"🙈":"👁️"}</button>
              </div><Err m={se.password}/>
              <label style={LS}>Confirm Password *</label>
              <div style={{position:"relative",marginBottom:6}}>
                <input type={scw?"text":"password"} value={sf.confirmPwd} onChange={e=>{setSf(f=>({...f,confirmPwd:e.target.value}));setSe(p=>({...p,confirmPwd:""}));}} placeholder="Re-enter" style={{...IS,marginBottom:0,paddingRight:38}}/>
                <button onClick={()=>setScw(s=>!s)} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:14}}>{scw?"🙈":"👁️"}</button>
              </div><Err m={se.confirmPwd}/>
              <button onClick={createStu} style={{width:"100%",padding:"12px 0",borderRadius:11,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",marginTop:6}}>🎓 Create Firebase Account</button>
            </div>
            <div style={{background:"#fff",borderRadius:18,padding:26,border:"2px solid #f0f0f0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <h3 style={{fontWeight:900,margin:0}}>All Students</h3>
                <span style={{background:"#FF6A00",color:"#fff",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:800}}>{students.length} · Live ☁️</span>
              </div>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search..." style={{...IS,marginBottom:12}}/>
              {loading?<div style={{display:"flex",justifyContent:"center",padding:24}}><Spinner/></div>
              :<div style={{display:"flex",flexDirection:"column",gap:9,maxHeight:420,overflowY:"auto"}}>
                {filtStu.length===0?<div style={{textAlign:"center",padding:24,color:"#aaa"}}>No students yet</div>
                :filtStu.map(s=>{
                  const uid=s.uid||s.id;const ena=!!access[uid];
                  return(
                    <div key={uid} style={{background:"#f9f9f9",borderRadius:11,padding:"11px 13px",border:"2px solid #f0f0f0",display:"flex",alignItems:"center",gap:9}}>
                      <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:14,flexShrink:0}}>{s.name?.charAt(0)}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,fontSize:12}}>{s.name}</div>
                        <div style={{fontSize:11,color:"#888"}}>{s.email}</div>
                      </div>
                      {settings.contentMode==="paid"&&(
                        <div onClick={()=>toggleAccess(uid,ena)} title={ena?"Disable":"Enable"} style={{width:40,height:22,borderRadius:11,background:ena?"#22c55e":"#e0e0e0",position:"relative",cursor:"pointer",transition:"background .3s",flexShrink:0}}>
                          <div style={{position:"absolute",top:2,left:ena?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .3s",boxShadow:"0 1px 4px #00000030"}}/>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>}
            </div>
          </div>
        </div>
      )}

      {/* ADD QUESTION */}
      {tab==="questions"&&(
        <div style={{background:"#fff",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
          <div style={{display:"flex",gap:10,marginBottom:18}}>
            {EXAM_TYPES.map(e=><button key={e.id} onClick={()=>{setExamType(e.id);setTopicId(null);}} style={{flex:1,padding:"11px 0",borderRadius:11,border:"2px solid",borderColor:examType===e.id?e.color:"#e0e0e0",background:examType===e.id?e.color:"#fff",color:examType===e.id?"#fff":"#555",fontWeight:800,fontSize:14,cursor:"pointer"}}>{e.icon} {e.label}</button>)}
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
            {et.topics.map(t=><button key={t.id} onClick={()=>setTopicId(t.id)} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:(topicId||et.topics[0].id)===t.id?et.color:"#e0e0e0",background:(topicId||et.topics[0].id)===t.id?et.color:"#fff",color:(topicId||et.topics[0].id)===t.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.icon} {t.name}</button>)}
          </div>
          <div style={{background:et.bg,border:`2px solid ${et.color}40`,borderRadius:11,padding:"9px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:13}}>📌 Saving to Firestore: <span style={{color:et.color}}>{et.label} → {curTopic?.name}</span></span>
            <span style={{background:DBG[qf.difficulty],color:DCOL[qf.difficulty],padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{qf.difficulty.toUpperCase()}</span>
          </div>
          {qSaved&&<div style={{background:"#dcfce7",border:"2px solid #86efac",borderRadius:9,padding:"9px 14px",marginBottom:14,fontSize:13,color:"#166534",fontWeight:600}}>✅ Saved to Firebase Firestore!</div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><label style={LS}>Difficulty</label><select value={qf.difficulty} onChange={e=>setQf(f=>({...f,difficulty:e.target.value}))} style={IS}>{["easy","medium","hard"].map(d=><option key={d} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>)}</select></div>
            <div><label style={LS}>Correct Answer</label><select value={qf.correct_answer} onChange={e=>setQf(f=>({...f,correct_answer:e.target.value}))} style={IS}>{["a","b","c","d"].map(o=><option key={o} value={o}>Option {o.toUpperCase()}</option>)}</select></div>
          </div>
          <label style={LS}>Question Text *</label>
          <textarea value={qf.question_text} onChange={e=>setQf(f=>({...f,question_text:e.target.value}))} rows={3} style={{...IS,resize:"vertical"}} placeholder="Enter the question..."/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
            {["a","b","c","d"].map(opt=>(
              <div key={opt}>
                <label style={{...LS,color:qf.correct_answer===opt?et.color:"#444"}}>Option {opt.toUpperCase()} {qf.correct_answer===opt?"✅":""}</label>
                <input value={qf[`option_${opt}`]} onChange={e=>setQf(f=>({...f,[`option_${opt}`]:e.target.value}))} style={{...IS,borderColor:qf.correct_answer===opt?et.color:"#f0f0f0",background:qf.correct_answer===opt?et.bg:"#fff"}} placeholder={`Option ${opt.toUpperCase()}...`}/>
              </div>
            ))}
          </div>
          <label style={LS}>Explanation</label>
          <textarea value={qf.explanation} onChange={e=>setQf(f=>({...f,explanation:e.target.value}))} rows={3} style={{...IS,resize:"vertical"}} placeholder="Step-by-step solution..."/>
          <label style={LS}>YouTube Link</label>
          <input value={qf.youtube_link} onChange={e=>setQf(f=>({...f,youtube_link:e.target.value}))} style={IS} placeholder="https://www.youtube.com/embed/VIDEO_ID"/>
          <button onClick={saveQ} disabled={qSaving} style={{padding:"12px 32px",borderRadius:11,border:"none",background:qSaving?"#ccc":`linear-gradient(90deg,${et.color},${et.color}cc)`,color:"#fff",fontWeight:800,fontSize:14,cursor:qSaving?"not-allowed":"pointer",marginTop:6,display:"flex",alignItems:"center",gap:8}}>
            {qSaving&&<Spinner size={16} color="#fff"/>}💾 Save to Firestore
          </button>
        </div>
      )}

      {/* NOTICES TAB */}
      {tab==="notices"&&(
        <div style={{display:"grid",gridTemplateColumns:window.innerWidth<=768?"1fr":"1fr 1fr",gap:22,alignItems:"start"}}>
          {/* Create Notice */}
          <div style={{background:"#fff",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
            <h3 style={{fontWeight:900,marginBottom:4}}>📢 Post Announcement</h3>
            <p style={{color:"#888",fontSize:13,marginBottom:20}}>Students see this as a popup after login and in the 🔔 bell</p>
            {nSaved&&<div style={{background:"#dcfce7",border:"2px solid #86efac",borderRadius:9,padding:"9px 14px",marginBottom:14,fontSize:13,color:"#166534",fontWeight:600}}>✅ Announcement posted!</div>}
            <label style={LS}>Title *</label>
            <input value={nf.title} onChange={e=>setNf(f=>({...f,title:e.target.value}))} style={IS} placeholder="e.g. SSC CGL 2025 Exam Dates Released!"/>
            <label style={LS}>Message *</label>
            <textarea value={nf.body} onChange={e=>setNf(f=>({...f,body:e.target.value}))} rows={4} style={{...IS,resize:"vertical"}} placeholder="Full announcement text..."/>
            <label style={LS}>Link (optional)</label>
            <input value={nf.link} onChange={e=>setNf(f=>({...f,link:e.target.value}))} style={IS} placeholder="https://... (exam notification, form link)"/>
            <label style={LS}>Image URL (optional)</label>
            <input value={nf.imageUrl} onChange={e=>setNf(f=>({...f,imageUrl:e.target.value}))} style={IS} placeholder="https://... (banner image)"/>
            <button onClick={saveNotice} disabled={nSaving} style={{width:"100%",padding:"12px 0",borderRadius:11,border:"none",background:nSaving?"#ccc":"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:14,cursor:nSaving?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {nSaving&&<Spinner size={16} color="#fff"/>}📢 Post Announcement
            </button>
          </div>

          {/* Live Notices List */}
          <div style={{background:"#fff",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h3 style={{fontWeight:900,margin:0}}>Live Announcements</h3>
              <span style={{background:"#FF6A00",color:"#fff",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:800}}>{dbNotices.length} · Live ☁️</span>
            </div>
            {dbNotices.length===0
              ?<div style={{textAlign:"center",padding:32,color:"#aaa",fontSize:14}}>No announcements yet.<br/>Post one to notify students.</div>
              :<div style={{display:"flex",flexDirection:"column",gap:12,maxHeight:460,overflowY:"auto"}}>
                {dbNotices.map(n=>(
                  <div key={n.id} style={{background:"#f9f9f9",borderRadius:12,padding:"14px 16px",border:"2px solid #f0f0f0"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:6}}>
                      <div style={{fontWeight:800,fontSize:14,color:"#000",flex:1,marginRight:10}}>{n.title}</div>
                      {delNoticeId===n.id
                        ?<div style={{display:"flex",gap:6,flexShrink:0}}>
                          <button onClick={()=>deleteNotice(n.id)} style={{padding:"4px 10px",borderRadius:7,border:"none",background:"#dc2626",color:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>Delete</button>
                          <button onClick={()=>setDelNoticeId(null)} style={{padding:"4px 10px",borderRadius:7,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>Cancel</button>
                        </div>
                        :<button onClick={()=>setDelNoticeId(n.id)} style={{padding:"4px 10px",borderRadius:7,border:"none",background:"#fee2e2",color:"#dc2626",fontWeight:700,fontSize:11,cursor:"pointer",flexShrink:0}}>🗑️ Delete</button>
                      }
                    </div>
                    <p style={{fontSize:13,color:"#666",lineHeight:1.5,margin:"0 0 6px"}}>{n.body}</p>
                    {n.link&&<a href={n.link} target="_blank" rel="noreferrer" style={{fontSize:12,color:"#FF6A00",fontWeight:700}}>🔗 {n.link.substring(0,40)}...</a>}
                    <div style={{fontSize:11,color:"#ccc",marginTop:6}}>{n.createdAt?.seconds?new Date(n.createdAt.seconds*1000).toLocaleDateString("en-IN","dd/MM/yyyy"):"Just now"}</div>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      )}

      {/* EDIT QUESTIONS */}
      {tab==="editq"&&(
        <div style={{background:"#fff",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",flexWrap:"wrap",gap:12,marginBottom:16}}>
              <div>
                <h3 style={{fontWeight:900,margin:0}}>✏️ Manage All Questions</h3>
                <p style={{color:"#888",fontSize:13,marginTop:4}}>Edit, delete or update any question across all exams</p>
              </div>
              {qSaveMsg&&<div style={{padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:700,background:qSaveMsg.startsWith("✅")?"#dcfce7":"#fee2e2",color:qSaveMsg.startsWith("✅")?"#166534":"#dc2626"}}>{qSaveMsg}</div>}
            </div>

            {/* Seed / Re-seed banner */}
            {!qLoading&&(
              <div style={{background:"#f8f8f8",borderRadius:12,padding:"12px 18px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
                <div>
                  <span style={{fontSize:13,fontWeight:700,color:"#333"}}>📊 Question Bank Status</span>
                  <div style={{fontSize:12,color:"#888",marginTop:2}}>
                    {EXAM_TYPES.map(et=>{
                      const cnt=allQuestions.filter(q=>q.examType===et.id).length;
                      const expected=et.topics.length*3*30;
                      return <span key={et.id} style={{marginRight:14,color:cnt>=expected?"#22c55e":cnt>0?"#f59e0b":"#ef4444"}}>
                        {et.icon} {et.label}: {cnt}/{expected}
                      </span>;
                    })}
                  </div>
                </div>
                <button onClick={seedAllQuestions} disabled={seedLoading||seedDone} style={{padding:"8px 18px",borderRadius:9,border:"none",background:seedDone?"#22c55e":seedLoading?"#aaa":"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:700,fontSize:12,cursor:seedLoading||seedDone?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                  {seedLoading&&<Spinner size={12} color="#fff"/>}
                  {seedLoading?"Seeding...":seedDone?"✅ Done":"⬆️ Seed / Fix Missing"}
                </button>
              </div>
            )}

            {/* Seed banner — show if no questions yet */}
            {!qLoading&&allQuestions.length<100&&(
              <div style={{background:"linear-gradient(135deg,#1a0800,#2d1000)",borderRadius:14,padding:"18px 22px",border:"2px solid #FF6A0050",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                  <div style={{flex:1}}>
                    <div style={{color:"#FF6A00",fontWeight:900,fontSize:16,marginBottom:4}}>🚀 Initialize Question Bank</div>
                    <div style={{color:"#aaa",fontSize:13,lineHeight:1.5}}>
                      Click to seed all <b style={{color:"#fff"}}>{getAllTests().length * 30} practice questions</b> ({getAllTests().length} tests × 30 questions) across SSC, Banking & Railways into Firestore. Do this once — then you can edit all questions here.
                    </div>
                  </div>
                  <button onClick={seedAllQuestions} disabled={seedLoading||seedDone} style={{
                    padding:"12px 24px",borderRadius:12,border:"none",
                    background:seedDone?"#22c55e":seedLoading?"#555":"linear-gradient(90deg,#FF6A00,#ff9a00)",
                    color:"#fff",fontWeight:800,fontSize:14,cursor:seedLoading||seedDone?"not-allowed":"pointer",
                    whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8,flexShrink:0
                  }}>
                    {seedLoading?<><Spinner size={16} color="#fff"/>Seeding...</>:seedDone?"✅ Done!":"⬆️ Seed Questions"}
                  </button>
                </div>
                {seedMsg&&<div style={{marginTop:12,padding:"8px 14px",borderRadius:9,fontSize:13,fontWeight:600,background:seedMsg.startsWith("✅")?"#dcfce7":"#fee2e2",color:seedMsg.startsWith("✅")?"#166534":"#dc2626"}}>{seedMsg}</div>}
                {seedLoading&&<div style={{marginTop:12,color:"#888",fontSize:12}}>⏳ This may take 1-2 minutes for {getAllTests().length * 30} questions. Please wait...</div>}
              </div>
            )}

            {/* Stats row */}
            {!qLoading&&allQuestions.length>0&&(
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:4,alignItems:"center"}}>
                {EXAM_TYPES.map(et=>{
                  const cnt=allQuestions.filter(q=>q.examType===et.id).length;
                  const expected=et.topics?.length*3*30||0;
                  return(
                    <div key={et.id} style={{background:et.bg||"#fff5ee",border:`2px solid ${et.color}30`,borderRadius:10,padding:"8px 14px",display:"flex",gap:6,alignItems:"center"}}>
                      <span style={{fontSize:14}}>{et.icon}</span>
                      <span style={{fontWeight:700,fontSize:13,color:et.color}}>{cnt}</span>
                      <span style={{fontSize:11,color:"#888"}}>/ {expected}</span>
                      <span style={{fontSize:11,color:"#888"}}>{et.label}</span>
                    </div>
                  );
                })}
                <div style={{background:"#f0fdf4",border:"2px solid #86efac",borderRadius:10,padding:"8px 14px",display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:14}}>📚</span>
                  <span style={{fontWeight:700,fontSize:13,color:"#16a34a"}}>{allQuestions.length}</span>
                  <span style={{fontSize:11,color:"#888"}}>Total</span>
                </div>
                <button onClick={()=>setBulkDelMode(m=>!m)} style={{padding:"8px 14px",borderRadius:10,border:"2px solid #dc2626",background:bulkDelMode?"#dc2626":"#fff",color:bulkDelMode?"#fff":"#dc2626",fontWeight:700,fontSize:12,cursor:"pointer",marginLeft:"auto"}}>
                  {bulkDelMode?"✕ Close":"🗑️ Bulk Delete by Topic"}
                </button>
              </div>
            )}

            {/* ── BULK DELETE PANEL ── */}
            {bulkDelMode&&(
              <div style={{background:"#fff5f5",border:"2px solid #fca5a5",borderRadius:14,padding:"18px 20px",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                  <span style={{fontSize:22}}>🗑️</span>
                  <div>
                    <div style={{fontWeight:900,fontSize:15,color:"#dc2626"}}>Bulk Delete Questions from Firestore</div>
                    <div style={{fontSize:12,color:"#888",marginTop:2}}>Select exam, topic, difficulty — then delete all matching questions permanently</div>
                  </div>
                </div>

                {/* Step 1: Exam */}
                <div style={{marginBottom:12}}>
                  <label style={{...LS,color:"#dc2626"}}>Step 1 — Select Exam *</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {EXAM_TYPES.map(e=>(
                      <button key={e.id} onClick={()=>{setBulkDelExam(e.id);setBulkDelTopic("");setBulkDelDiff("");setBulkDelConfirm(false);}} style={{padding:"8px 16px",borderRadius:10,border:"2px solid",borderColor:bulkDelExam===e.id?e.color:"#e0e0e0",background:bulkDelExam===e.id?e.color:"#fff",color:bulkDelExam===e.id?"#fff":"#555",fontWeight:700,cursor:"pointer",fontSize:12}}>
                        {e.icon} {e.label} ({allQuestions.filter(q=>q.examType===e.id).length})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Topic */}
                {bulkDelExam&&(
                  <div style={{marginBottom:12}}>
                    <label style={{...LS,color:"#dc2626"}}>Step 2 — Select Topic (optional — leave blank to delete ALL topics)</label>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <button onClick={()=>{setBulkDelTopic("");setBulkDelConfirm(false);}} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:!bulkDelTopic?"#dc2626":"#e0e0e0",background:!bulkDelTopic?"#fee2e2":"#fff",color:!bulkDelTopic?"#dc2626":"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>
                        All Topics ({allQuestions.filter(q=>q.examType===bulkDelExam).length})
                      </button>
                      {(EXAM_TYPES.find(e=>e.id===bulkDelExam)?.topics||[]).map(t=>{
                        const cnt=allQuestions.filter(q=>q.examType===bulkDelExam&&(q.topicId===t.id||q.topicName===t.name)).length;
                        return(
                          <button key={t.id} onClick={()=>{setBulkDelTopic(t.id);setBulkDelConfirm(false);}} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:bulkDelTopic===t.id?"#dc2626":"#e0e0e0",background:bulkDelTopic===t.id?"#fee2e2":"#fff",color:bulkDelTopic===t.id?"#dc2626":"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>
                            {t.icon} {t.name} ({cnt})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Difficulty */}
                {bulkDelExam&&(
                  <div style={{marginBottom:16}}>
                    <label style={{...LS,color:"#dc2626"}}>Step 3 — Select Difficulty (optional)</label>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <button onClick={()=>{setBulkDelDiff("");setBulkDelConfirm(false);}} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:!bulkDelDiff?"#dc2626":"#e0e0e0",background:!bulkDelDiff?"#fee2e2":"#fff",color:!bulkDelDiff?"#dc2626":"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>All Levels</button>
                      {["easy","medium","hard"].map(d=>(
                        <button key={d} onClick={()=>{setBulkDelDiff(d);setBulkDelConfirm(false);}} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:bulkDelDiff===d?DCOL[d]:"#e0e0e0",background:bulkDelDiff===d?DBG[d]:"#fff",color:bulkDelDiff===d?DCOL[d]:"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>{d.charAt(0).toUpperCase()+d.slice(1)}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary + Confirm */}
                {bulkDelExam&&(
                  <div style={{background:"#fff",borderRadius:12,padding:"14px 18px",border:"2px solid #fca5a5",marginBottom:12}}>
                    <div style={{fontSize:13,color:"#555",marginBottom:8}}>
                      ⚠️ This will permanently delete{" "}
                      <b style={{color:"#dc2626",fontSize:16}}>{bulkDelCount}</b>{" "}
                      questions from Firestore matching:
                    </div>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                      <span style={{background:"#fee2e2",color:"#dc2626",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>
                        {EXAM_TYPES.find(e=>e.id===bulkDelExam)?.icon} {EXAM_TYPES.find(e=>e.id===bulkDelExam)?.label}
                      </span>
                      {bulkDelTopic?(
                        <span style={{background:"#fee2e2",color:"#dc2626",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>
                          {(EXAM_TYPES.find(e=>e.id===bulkDelExam)?.topics||[]).find(t=>t.id===bulkDelTopic)?.name||"Topic"}
                        </span>
                      ):<span style={{background:"#fee2e2",color:"#dc2626",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>All Topics</span>}
                      {bulkDelDiff?(
                        <span style={{background:DBG[bulkDelDiff],color:DCOL[bulkDelDiff],padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>{bulkDelDiff.toUpperCase()}</span>
                      ):<span style={{background:"#f0f0f0",color:"#888",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>All Difficulties</span>}
                    </div>
                    {bulkDelCount===0&&<div style={{color:"#888",fontSize:12,marginTop:8}}>No questions match this selection.</div>}
                  </div>
                )}

                {bulkDelMsg&&<div style={{padding:"10px 16px",borderRadius:9,marginBottom:12,fontSize:13,fontWeight:600,background:bulkDelMsg.startsWith("✅")?"#dcfce7":"#fee2e2",color:bulkDelMsg.startsWith("✅")?"#16a34a":"#dc2626"}}>{bulkDelMsg}</div>}

                {bulkDelExam&&bulkDelCount>0&&(
                  !bulkDelConfirm?(
                    <button onClick={()=>setBulkDelConfirm(true)} style={{padding:"11px 28px",borderRadius:10,border:"none",background:"#dc2626",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>
                      🗑️ Delete {bulkDelCount} Questions →
                    </button>
                  ):(
                    <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                      <div style={{fontWeight:700,color:"#dc2626",fontSize:14}}>⚠️ Are you sure? This cannot be undone!</div>
                      <button onClick={bulkDeleteQuestions} disabled={bulkDelLoading} style={{padding:"11px 24px",borderRadius:10,border:"none",background:"#dc2626",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
                        {bulkDelLoading&&<Spinner size={14} color="#fff"/>}
                        {bulkDelLoading?`Deleting...`:`Yes, Delete ${bulkDelCount} Questions`}
                      </button>
                      <button onClick={()=>setBulkDelConfirm(false)} style={{padding:"11px 20px",borderRadius:10,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer"}}>Cancel</button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Exam filter */}
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            <button onClick={()=>{setQExamFilter("");setQTopicFilter("");}} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:!qExamFilter?"#FF6A00":"#e0e0e0",background:!qExamFilter?"#FF6A00":"#fff",color:!qExamFilter?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>All Exams</button>
            {EXAM_TYPES.map(e=><button key={e.id} onClick={()=>{setQExamFilter(e.id);setQTopicFilter("");}} style={{padding:"6px 14px",borderRadius:20,border:"2px solid",borderColor:qExamFilter===e.id?e.color:"#e0e0e0",background:qExamFilter===e.id?e.color:"#fff",color:qExamFilter===e.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{e.icon} {e.label}</button>)}
          </div>

          {/* Topic filter — shows when exam selected */}
          {qExamFilter&&(
            <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
              <button onClick={()=>setQTopicFilter("")} style={{padding:"5px 12px",borderRadius:20,border:"2px solid",borderColor:!qTopicFilter?"#333":"#e0e0e0",background:!qTopicFilter?"#333":"#fff",color:!qTopicFilter?"#fff":"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>All Topics</button>
              {(EXAM_TYPES.find(e=>e.id===qExamFilter)?.topics||[]).map(t=>(
                <button key={t.id} onClick={()=>setQTopicFilter(t.id)} style={{padding:"5px 12px",borderRadius:20,border:"2px solid",borderColor:qTopicFilter===t.id?"#333":"#e0e0e0",background:qTopicFilter===t.id?"#333":"#fff",color:qTopicFilter===t.id?"#fff":"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>{t.icon} {t.name}</button>
              ))}
            </div>
          )}

          {/* Difficulty filter */}
          <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
            <button onClick={()=>setQDiffFilter("")} style={{padding:"5px 12px",borderRadius:20,border:"2px solid",borderColor:!qDiffFilter?"#555":"#e0e0e0",background:!qDiffFilter?"#555":"#fff",color:!qDiffFilter?"#fff":"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>All Levels</button>
            {["easy","medium","hard"].map(d=><button key={d} onClick={()=>setQDiffFilter(d)} style={{padding:"5px 12px",borderRadius:20,border:"2px solid",borderColor:qDiffFilter===d?DCOL[d]:"#e0e0e0",background:qDiffFilter===d?DBG[d]:"#fff",color:qDiffFilter===d?DCOL[d]:"#555",fontWeight:700,fontSize:11,cursor:"pointer"}}>{d.charAt(0).toUpperCase()+d.slice(1)}</button>)}
          </div>

          {/* Search */}
          <input value={qSearch} onChange={e=>setQSearch(e.target.value)} placeholder="🔍 Search by question text, topic or test name..." style={{...IS,marginBottom:14}}/>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <span style={{fontSize:13,color:"#555",fontWeight:600}}>
              Showing <b style={{color:"#FF6A00"}}>{filteredQs.length}</b>
              {qExamFilter&&<> of <b>{allQuestions.filter(q=>q.examType===qExamFilter).length}</b> {qExamFilter.toUpperCase()} questions</>}
              {!qExamFilter&&<> of <b>{allQuestions.length}</b> total questions</>}
            </span>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:12,color:"#22c55e",fontWeight:600}}>☁️ Live</span>
              {qLoading&&<Spinner size={14} color="#FF6A00"/>}
            </div>
          </div>

          {qLoading?(
            <div style={{display:"flex",justifyContent:"center",padding:40}}><Spinner/></div>
          ):filteredQs.length===0?(
            <div style={{textAlign:"center",padding:40,color:"#aaa"}}>
              <div style={{fontSize:48,marginBottom:16}}>📭</div>
              {allQuestions.length===0?(
                <div>
                  <p style={{fontSize:15,marginBottom:8,color:"#555",fontWeight:600}}>No questions in Firestore yet.</p>
                  <p style={{fontSize:13,marginBottom:20}}>Click <b style={{color:"#FF6A00"}}>"⬆️ Seed Questions"</b> above to load all {getAllTests().length*30} practice questions into Firestore so you can edit them here.</p>
                  <button onClick={seedAllQuestions} disabled={seedLoading} style={{padding:"12px 24px",borderRadius:12,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer"}}>⬆️ Seed All Questions Now</button>
                </div>
              ):(
                <p>No questions match your filters. Try changing the exam, topic or difficulty filter.</p>
              )}
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:12,maxHeight:600,overflowY:"auto"}}>
              {filteredQs.map(q=>(
                <div key={q.id} style={{background:"#f9f9f9",borderRadius:12,padding:"14px 16px",border:"2px solid",borderColor:editingQ===q.id?"#FF6A00":"#f0f0f0"}}>
                  {editingQ===q.id?(
                    /* ── Edit Form ── */
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                        <div style={{fontWeight:700,color:"#FF6A00",fontSize:13}}>✏️ Editing Question</div>
                        <button onClick={()=>{setEditingQ(null);setEditQForm({});}} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#888"}}>✕</button>
                      </div>
                      <label style={LS}>Question Text</label>
                      <textarea value={editQForm.question_text||""} onChange={e=>setEditQForm(f=>({...f,question_text:e.target.value}))} rows={3} style={{...IS,resize:"vertical"}}/>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
                        {["a","b","c","d"].map(opt=>(
                          <div key={opt}>
                            <label style={{...LS,color:editQForm.correct_answer===opt?"#FF6A00":"#444"}}>Option {opt.toUpperCase()} {editQForm.correct_answer===opt?"✅":""}</label>
                            <input value={editQForm[`option_${opt}`]||""} onChange={e=>setEditQForm(f=>({...f,[`option_${opt}`]:e.target.value}))} style={{...IS,borderColor:editQForm.correct_answer===opt?"#FF6A00":"#f0f0f0"}}/>
                          </div>
                        ))}
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                        <div>
                          <label style={LS}>Correct Answer</label>
                          <select value={editQForm.correct_answer||"a"} onChange={e=>setEditQForm(f=>({...f,correct_answer:e.target.value}))} style={IS}>
                            {["a","b","c","d"].map(o=><option key={o} value={o}>Option {o.toUpperCase()}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={LS}>Difficulty</label>
                          <select value={editQForm.difficulty||"easy"} onChange={e=>setEditQForm(f=>({...f,difficulty:e.target.value}))} style={IS}>
                            {["easy","medium","hard"].map(d=><option key={d} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>)}
                          </select>
                        </div>
                      </div>
                      <label style={LS}>Explanation</label>
                      <textarea value={editQForm.explanation||""} onChange={e=>setEditQForm(f=>({...f,explanation:e.target.value}))} rows={2} style={{...IS,resize:"vertical"}}/>
                      <label style={LS}>YouTube Link</label>
                      <input value={editQForm.youtube_link||""} onChange={e=>setEditQForm(f=>({...f,youtube_link:e.target.value}))} style={IS} placeholder="https://www.youtube.com/embed/..."/>
                      <div style={{display:"flex",gap:10,marginTop:4}}>
                        <button onClick={saveEditQ} style={{flex:2,padding:"10px 0",borderRadius:10,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,cursor:"pointer"}}>💾 Save Changes</button>
                        <button onClick={()=>{setEditingQ(null);setEditQForm({});}} style={{flex:1,padding:"10px 0",borderRadius:10,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer"}}>Cancel</button>
                      </div>
                    </div>
                  ):(
                    /* ── View Row ── */
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",gap:10}}>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                            <span style={{background:EXAM_TYPES.find(e=>e.id===q.examType)?.color||"#FF6A00",color:"#fff",padding:"2px 10px",borderRadius:20,fontSize:10,fontWeight:700}}>{q.examType?.toUpperCase()}</span>
                            <span style={{background:DBG[q.difficulty]||"#f0f0f0",color:DCOL[q.difficulty]||"#666",padding:"2px 10px",borderRadius:20,fontSize:10,fontWeight:700}}>{q.difficulty?.toUpperCase()}</span>
                            <span style={{background:"#f0f0f0",color:"#555",padding:"2px 10px",borderRadius:20,fontSize:10,fontWeight:600}}>{q.topicName}</span>
                          </div>
                          <p style={{fontSize:13,fontWeight:600,color:"#000",lineHeight:1.5,margin:0}}>{q.question_text?.substring(0,120)}{q.question_text?.length>120?"...":""}</p>
                          <div style={{display:"flex",gap:10,marginTop:6,flexWrap:"wrap"}}>
                            {["a","b","c","d"].map(opt=>(
                              <span key={opt} style={{fontSize:11,color:q.correct_answer===opt?"#FF6A00":"#888",fontWeight:q.correct_answer===opt?700:400}}>
                                {opt.toUpperCase()}: {q[`option_${opt}`]?.substring(0,20)}{q.correct_answer===opt?" ✅":""}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{display:"flex",gap:6,flexShrink:0}}>
                          <button onClick={()=>{setEditingQ(q.id);setEditQForm({...q});}} style={{padding:"6px 12px",borderRadius:8,border:"2px solid #FF6A00",background:"#fff5ee",color:"#FF6A00",fontWeight:700,fontSize:12,cursor:"pointer"}}>✏️ Edit</button>
                          {delQId===q.id?(
                            <div style={{display:"flex",gap:4}}>
                              <button onClick={()=>deleteQuestion(q.id)} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#dc2626",color:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>Confirm</button>
                              <button onClick={()=>setDelQId(null)} style={{padding:"6px 10px",borderRadius:8,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>✕</button>
                            </div>
                          ):(
                            <button onClick={()=>setDelQId(q.id)} style={{padding:"6px 12px",borderRadius:8,border:"none",background:"#fee2e2",color:"#dc2626",fontWeight:700,fontSize:12,cursor:"pointer"}}>🗑️</button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BULK UPLOAD */}
      {tab==="bulk"&&(()=>{
        const bulkET=liveExamTypes.find(e=>e.id===examType)||liveExamTypes[0];
        const bulkTopics=bulkET?.topics||[];
        const bulkTopic=bulkTopics.find(t=>t.id===topicId);
        const bulkDiff=qf.difficulty||"easy";
        const allSelected=!!examType&&!!topicId;
        return(
          <div style={{background:"#fff",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
            <h3 style={{fontWeight:900,marginBottom:4}}>📤 Bulk Upload Questions</h3>
            <p style={{color:"#888",marginBottom:20,fontSize:13}}>3 steps: choose exam → choose topic → upload CSV</p>

            {/* STEP 1 — Exam */}
            <div style={{background:"#f8f8f8",borderRadius:14,padding:"16px 18px",marginBottom:14,border:"2px solid",borderColor:examType?"#FF6A00":"#e0e0e0"}}>
              <div style={{fontWeight:800,fontSize:13,marginBottom:10,color:examType?"#FF6A00":"#555"}}>
                {examType?"✅":"1️⃣"} Choose Exam Type
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {liveExamTypes.filter(e=>e.visible!==false).map(e=>(
                  <button key={e.id} onClick={()=>{setExamType(e.id);setTopicId(null);}} style={{padding:"10px 20px",borderRadius:10,border:"2px solid",borderColor:examType===e.id?e.color:"#e0e0e0",background:examType===e.id?e.color:"#fff",color:examType===e.id?"#fff":"#555",fontWeight:700,cursor:"pointer",fontSize:13,transition:"all .2s"}}>
                    {e.icon} {e.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2 — Topic */}
            <div style={{background:"#f8f8f8",borderRadius:14,padding:"16px 18px",marginBottom:14,border:"2px solid",borderColor:topicId?"#FF6A00":"#e0e0e0",opacity:examType?1:0.5}}>
              <div style={{fontWeight:800,fontSize:13,marginBottom:10,color:topicId?"#FF6A00":"#555"}}>
                {topicId?"✅":"2️⃣"} Choose Topic {!examType&&"— select exam first"}
              </div>
              {examType?(
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {bulkTopics.map(t=>(
                    <button key={t.id} onClick={()=>setTopicId(t.id)} style={{padding:"8px 16px",borderRadius:20,border:"2px solid",borderColor:topicId===t.id?"#000":"#e0e0e0",background:topicId===t.id?"#000":"#fff",color:topicId===t.id?"#fff":"#555",fontWeight:700,cursor:"pointer",fontSize:12,transition:"all .2s"}}>
                      {t.icon} {t.name}
                    </button>
                  ))}
                </div>
              ):(
                <p style={{color:"#ccc",fontSize:13,margin:0}}>Select an exam type first</p>
              )}
            </div>

            {/* STEP 3 — Difficulty */}
            <div style={{background:"#f8f8f8",borderRadius:14,padding:"16px 18px",marginBottom:14,border:"2px solid",borderColor:topicId?"#FF6A00":"#e0e0e0",opacity:topicId?1:0.5}}>
              <div style={{fontWeight:800,fontSize:13,marginBottom:10,color:"#555"}}>
                3️⃣ Choose Difficulty Level
              </div>
              <div style={{display:"flex",gap:8}}>
                {["easy","medium","hard"].map(d=>(
                  <button key={d} onClick={()=>setQf(f=>({...f,difficulty:d}))} style={{padding:"8px 24px",borderRadius:10,border:"2px solid",borderColor:bulkDiff===d?DCOL[d]:"#e0e0e0",background:bulkDiff===d?DBG[d]:"#fff",color:bulkDiff===d?DCOL[d]:"#555",fontWeight:800,cursor:"pointer",fontSize:13,transition:"all .2s"}}>
                    {d.charAt(0).toUpperCase()+d.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination banner */}
            {allSelected&&(
              <div style={{background:bulkET.bg||"#fff5ee",border:`2px solid ${bulkET.color}`,borderRadius:12,padding:"14px 20px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,color:"#888",fontWeight:600,marginBottom:4}}>📌 Questions will be saved to Firestore under:</div>
                  <div style={{fontWeight:900,fontSize:17,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:bulkET.color}}>{bulkET.icon} {bulkET.label}</span>
                    <span style={{color:"#ccc"}}>→</span>
                    <span style={{color:"#333"}}>{bulkTopic?.icon} {bulkTopic?.name}</span>
                  </div>
                </div>
                <div style={{textAlign:"center"}}>
                  <span style={{background:DBG[bulkDiff],color:DCOL[bulkDiff],padding:"6px 16px",borderRadius:20,fontSize:13,fontWeight:800,display:"block"}}>{bulkDiff.toUpperCase()}</span>
                  <span style={{fontSize:11,color:"#888",marginTop:4,display:"block"}}>difficulty</span>
                </div>
              </div>
            )}

            {/* File Upload */}
            {!allSelected?(
              <div style={{textAlign:"center",padding:"32px 20px",background:"#f8f8f8",borderRadius:14,border:"2px dashed #e0e0e0",marginBottom:16}}>
                <div style={{fontSize:48,marginBottom:12}}>☝️</div>
                <p style={{color:"#888",fontSize:14,fontWeight:600}}>Complete Steps 1 &amp; 2 above</p>
                <p style={{color:"#aaa",fontSize:12}}>Select exam type and topic to unlock file upload</p>
              </div>
            ):(
              <div onClick={()=>fRef.current?.click()} style={{border:"2px dashed #FF6A00",borderRadius:14,padding:"32px",marginBottom:16,background:"#fff8f0",textAlign:"center",cursor:"pointer",transition:"background .2s"}}
                onMouseOver={e=>e.currentTarget.style.background="#fff0e0"} onMouseOut={e=>e.currentTarget.style.background="#fff8f0"}>
                <div style={{fontSize:44,marginBottom:10}}>📂</div>
                <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>{upFile?`📄 ${upFile.name}`:"Click to Choose CSV File"}</div>
                <div style={{color:"#888",fontSize:12}}>{upFile?`${upRows.length} question rows detected — ready to import`:"or drag & drop your .csv file here"}</div>
                <input ref={fRef} type="file" accept=".csv,.txt" onChange={handleFile} style={{display:"none"}}/>
              </div>
            )}

            {/* Status message */}
            {upMsg&&(
              <div style={{padding:"12px 18px",borderRadius:10,marginBottom:16,fontSize:13,fontWeight:600,background:upMsg.startsWith("✅")?"#dcfce7":"#fee2e2",color:upMsg.startsWith("✅")?"#16a34a":"#dc2626",border:`2px solid ${upMsg.startsWith("✅")?"#86efac":"#fca5a5"}`}}>
                {upMsg}
              </div>
            )}

            {/* Preview table + import button */}
            {upRows.length>0&&(
              <>
                <div style={{overflowX:"auto",marginBottom:16}}>
                  {/* Difficulty split summary */}
                  {(()=>{
                    const dc={easy:0,medium:0,hard:0};
                    upRows.forEach(r=>{const d=r.difficulty?.toLowerCase();if(dc[d]!==undefined)dc[d]++;});
                    const hasMix=Object.values(dc).filter(v=>v>0).length>1;
                    return hasMix&&(
                      <div style={{background:"#f0fdf4",border:"2px solid #86efac",borderRadius:12,padding:"12px 16px",marginBottom:12}}>
                        <div style={{fontWeight:800,fontSize:13,color:"#16a34a",marginBottom:8}}>✅ Auto-split into 3 separate tests by difficulty:</div>
                        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                          {Object.entries(dc).filter(([,v])=>v>0).map(([d,v])=>{
                            const tid=`${topicId}_${d}`;
                            const selET=liveExamTypes.find(e=>e.id===examType);
                            const selTopic=(selET?.topics||[]).find(t=>t.id===topicId);
                            return(
                              <div key={d} style={{background:DBG[d],border:`2px solid ${DCOL[d]}40`,borderRadius:10,padding:"8px 16px"}}>
                                <div style={{fontWeight:800,color:DCOL[d],fontSize:13}}>{d.toUpperCase()} — {v} questions</div>
                                <div style={{fontSize:11,color:"#888",marginTop:2}}>→ {selTopic?.name} – Test {["easy","medium","hard"].indexOf(d)+1}</div>
                                <div style={{fontSize:10,color:"#aaa"}}>testId: {tid}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                  <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>Preview (first 5 rows):</div>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                    <thead>
                      <tr style={{background:"#000",color:"#FF6A00"}}>
                        {["#","Question","Opt A","Opt B","Ans","Difficulty → Test"].map(h=>(
                          <th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:700}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {upRows.slice(0,8).map((r,i)=>{
                        const rowDiff=["easy","medium","hard"].includes(r.difficulty?.toLowerCase())?r.difficulty.toLowerCase():(qf.difficulty||"easy");
                        return(
                          <tr key={i} style={{borderBottom:"1px solid #f0f0f0",background:i%2?"#f9f9f9":"#fff"}}>
                            <td style={{padding:"7px 10px",color:"#FF6A00",fontWeight:700}}>{i+1}</td>
                            <td style={{padding:"7px 10px",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.question_text}</td>
                            <td style={{padding:"7px 10px",maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.option_a}</td>
                            <td style={{padding:"7px 10px",maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.option_b}</td>
                            <td style={{padding:"7px 10px",color:"#FF6A00",fontWeight:800}}>{r.correct_answer?.toUpperCase()}</td>
                            <td style={{padding:"7px 10px"}}>
                              <span style={{background:DBG[rowDiff],color:DCOL[rowDiff],padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700}}>{rowDiff.toUpperCase()}</span>
                              <span style={{fontSize:9,color:"#aaa",marginLeft:6}}>Test {["easy","medium","hard"].indexOf(rowDiff)+1}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {upRows.length>8&&<div style={{textAlign:"center",color:"#aaa",fontSize:12,marginTop:8}}>...and {upRows.length-8} more rows</div>}
                </div>
                <button onClick={importBulk} disabled={upLoading} style={{width:"100%",padding:"14px 0",borderRadius:12,border:"none",background:upLoading?"#ccc":"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:15,cursor:upLoading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:upLoading?"none":"0 4px 20px #FF6A0050"}}>
                  {upLoading&&<Spinner size={18} color="#fff"/>}
                  {upLoading?`Saving ${upRows.length} questions...`:`⬆️ Import ${upRows.length} Questions → ${bulkET.label} / ${bulkTopic?.name} / ${bulkDiff}`}
                </button>
              </>
            )}

            {/* CSV format guide */}
            <div style={{marginTop:20,background:"#f8f8f8",borderRadius:12,padding:18}}>
              <div style={{fontWeight:800,marginBottom:10,fontSize:13}}>📋 Required CSV Format:</div>
              <code style={{fontSize:11,color:"#333",display:"block",whiteSpace:"pre",lineHeight:1.9,overflowX:"auto",fontFamily:"monospace"}}>
{`question_text,option_a,option_b,option_c,option_d,correct_answer,explanation,youtube_link,difficulty
"What is 15% of 200?","20","25","30","35","c","15/100 × 200 = 30","https://youtube.com/embed/xxx","easy"
"Solve: 2x + 5 = 15","3","4","5","6","c","2x=10, x=5","","medium"`}
              </code>
              <div style={{marginTop:10,fontSize:11,color:"#888"}}>
                ⚠️ <b>correct_answer</b> must be: a, b, c, or d &nbsp;|&nbsp;
                <b>difficulty</b> must be: easy, medium, or hard (optional — uses Step 3 selection if blank)
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── CSS ANIMATION ────────────────────────────────────────────────────────────
const spinStyle = document.createElement("style");
spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(spinStyle);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const {user:fbUser, justLoggedIn, clearJustLoggedIn} = useAuth();
  const examTypes = useExamTypes(); // live from Firestore
  const [page,setPage]   = useState("home");
  const [examType,setExamType] = useState("ssc");
  const [activeTest,setActiveTest] = useState(null);
  const [testResult,setTestResult] = useState(null);
  const [notices,setNotices] = useState([]);
  const [banners,setBanners] = useState([]);
  const [showNoticeModal,setShowNoticeModal] = useState(false);
  const [showNotifPanel,setShowNotifPanel] = useState(false);
  const [unreadCount,setUnreadCount] = useState(0);

  // Admin is created manually in Firebase Console — no seeding needed

  // Load banners from Firestore
  useEffect(()=>{
    const q=query(collection(db,"banners"),orderBy("order","asc"),limit(10));
    const unsub=onSnapshot(q,snap=>setBanners(snap.docs.map(d=>({id:d.id,...d.data()}))));
    return unsub;
  },[]);

  // Load notices from Firestore
  useEffect(()=>{
    const q = query(collection(db,"notices"), orderBy("createdAt","desc"), limit(10));
    const unsub = onSnapshot(q, snap=>{
      const list = snap.docs.map(d=>({id:d.id,...d.data()}));
      setNotices(list);
      const lastSeen = parseInt(localStorage.getItem("ra_last_notice")||"0");
      const newCount = list.filter(n=>{
        const t = n.createdAt?.seconds ? n.createdAt.seconds*1000 : 0;
        return t > lastSeen;
      }).length;
      setUnreadCount(newCount);
    });
    return unsub;
  },[]);

  // Redirect after login + show notice modal
  useEffect(()=>{
    if(justLoggedIn && fbUser){
      clearJustLoggedIn();
      if(fbUser.role==="admin"){
        setPage("admin");
      } else {
        setPage("home");
        // Show notice modal to student if there are notices
        if(notices.length>0) setShowNoticeModal(true);
      }
    }
  },[justLoggedIn, fbUser, notices]);

  const handleLogin = () => {
    // Redirect handled by justLoggedIn effect above
  };

  const handleStartTest = test => {
    if(!fbUser){ setPage("auth"); return; }
    setActiveTest(test);
    setTestResult(null);
    setPage("test");
  };

  const handleFinish = result => {
    setTestResult(result);
    setPage("result");
  };

  // ── Loading screen ──
  if(fbUser === undefined){
    return(
      <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#000",gap:20}}>
        <Logo white/>
        <Spinner size={40} color="#FF6A00"/>
        <div style={{color:"#888",fontSize:14}}>Loading Rank Achievers...</div>
      </div>
    );
  }

  // ── Full-screen test (no navbar) ──
  if(page==="test" && activeTest){
    return(
      <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
        <TestPage test={activeTest} user={fbUser} onFinish={handleFinish}/>
      </div>
    );
  }

  return(
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",minHeight:"100vh",background:"#fff"}}>
      <NavBar
        page={page} setPage={setPage}
        user={fbUser}
        examType={examType} setExamType={setExamType}
        showNotifPanel={showNotifPanel} setShowNotifPanel={setShowNotifPanel}
        unreadCount={unreadCount} setUnreadCount={setUnreadCount}
        notices={notices}
      />

      {showNoticeModal && notices.length>0 && <NoticeModal notices={notices} onClose={()=>setShowNoticeModal(false)}/>}
      {showNotifPanel && <NotifPanel notices={notices} onClose={()=>setShowNotifPanel(false)}/>}
      {page==="home"      && <HomePage    setPage={setPage} user={fbUser} setExamType={setExamType} banners={banners} examTypes={examTypes} notices={notices} setShowNoticeModal={setShowNoticeModal}/>}
      {page==="auth"      && !fbUser      && <AuthPage    onLogin={handleLogin}/>}
      {page==="auth"      && fbUser       && <HomePage    setPage={setPage} user={fbUser} setExamType={setExamType}/>}
      {page==="tests"     && <TestsPage   user={fbUser} onStartTest={handleStartTest} examType={examType} setExamType={setExamType} examTypes={examTypes}/>}
      {page==="result"    && testResult   && <ResultPage    result={testResult} onViewSolutions={()=>setPage("solutions")} onBack={()=>setPage("tests")}/>}
      {page==="solutions" && testResult   && <SolutionsPage result={testResult} onBack={()=>setPage("result")}/>}
      {page==="dashboard" && fbUser       && <DashboardPage user={fbUser} setPage={setPage}/>}
      {page==="leaderboard"               && <LeaderboardPage/>}
      {page==="profile"   && fbUser       && <ProfilePage   user={fbUser} setUser={()=>{}} setPage={setPage}/>}
      {page==="admin"     && fbUser?.role==="admin" && <AdminPage/>}
    </div>
  );
}
