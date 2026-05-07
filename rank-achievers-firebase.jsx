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
  storageBucket: "rank-achievers.appspot.com",
  messagingSenderId: "945705830932",
  appId: "1:945705830932:web:6f373103a09fbd2512b501"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const gProvider = new GoogleAuthProvider();

// ─── ADMIN EMAIL ──────────────────────────────────────────────────────────────
const ADMIN_EMAIL = "nkhadar@gmail.com";

// ─── EXAM TYPES ───────────────────────────────────────────────────────────────
const EXAM_TYPES = [
  { id:"ssc",      label:"SSC",      fullName:"Staff Selection Commission", icon:"🏛️", color:"#FF6A00", bg:"#fff5ee", desc:"CGL · CHSL · MTS · CPO",
    topics:[{id:"ssc_arith",name:"Arithmetic",icon:"➕"},{id:"ssc_alg",name:"Algebra",icon:"🔣"},{id:"ssc_num",name:"Number System",icon:"🔢"},{id:"ssc_simp",name:"Simplification",icon:"✖️"},{id:"ssc_di",name:"Data Interpretation",icon:"📊"},{id:"ssc_geo",name:"Geometry",icon:"📐"}]},
  { id:"banking",  label:"Banking",  fullName:"Banking & Insurance",        icon:"🏦", color:"#1d4ed8", bg:"#eff6ff", desc:"IBPS PO · SBI PO · RBI · LIC",
    topics:[{id:"bnk_qa",name:"Quantitative Aptitude",icon:"🔢"},{id:"bnk_da",name:"Data Analysis",icon:"📊"},{id:"bnk_re",name:"Reasoning",icon:"🧠"},{id:"bnk_en",name:"English",icon:"📝"},{id:"bnk_ga",name:"General Awareness",icon:"🌍"},{id:"bnk_cp",name:"Computer Knowledge",icon:"💻"}]},
  { id:"railways", label:"Railways", fullName:"Indian Railways",            icon:"🚂", color:"#16a34a", bg:"#f0fdf4", desc:"RRB NTPC · Group D · ALP · JE",
    topics:[{id:"rly_ma",name:"Mathematics",icon:"📐"},{id:"rly_gi",name:"General Intelligence",icon:"🧩"},{id:"rly_sc",name:"General Science",icon:"🔬"},{id:"rly_ga",name:"General Awareness",icon:"🌍"},{id:"rly_re",name:"Reasoning",icon:"🧠"},{id:"rly_te",name:"Technical Ability",icon:"⚙️"}]}
];

const DIFFS  = ["easy","medium","hard"];
const DCOL   = {easy:"#22c55e",medium:"#f59e0b",hard:"#ef4444"};
const DBG    = {easy:"#f0fdf4",medium:"#fffbeb",hard:"#fef2f2"};
const fmtT   = s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

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
  const [user,setUser]=useState(undefined); // undefined = loading
  useEffect(()=>{
    const unsub=onAuthStateChanged(auth, async fbUser=>{
      if(!fbUser){setUser(null);return;}
      const snap=await getDoc(doc(db,"users",fbUser.uid));
      if(snap.exists()){
        setUser({uid:fbUser.uid,...snap.data()});
      } else {
        // New Google user — create profile
        const isAdmin=fbUser.email===ADMIN_EMAIL;
        const profile={uid:fbUser.uid,name:fbUser.displayName||fbUser.email.split("@")[0],email:fbUser.email,role:isAdmin?"admin":"student",photoURL:fbUser.photoURL||null,googleLogin:true,createdAt:serverTimestamp(),accessEnabled:false};
        await setDoc(doc(db,"users",fbUser.uid),profile);
        setUser({...profile});
      }
    });
    return unsub;
  },[]);
  return user;
}

async function loginGoogle(){
  const result=await signInWithPopup(auth,gProvider);
  return result.user;
}

async function loginEmail(email,password){
  const result=await signInWithEmailAndPassword(auth,email,password);
  return result.user;
}

async function registerEmail(email,password,name,phone,role){
  const result=await createUserWithEmailAndPassword(auth,email,password);
  await updateProfile(result.user,{displayName:name});
  const isAdmin=email===ADMIN_EMAIL;
  const profile={uid:result.user.uid,name,email,phone:phone||"",role:isAdmin?"admin":role,googleLogin:false,createdAt:serverTimestamp(),accessEnabled:false};
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
function NavBar({page,setPage,user,examType,setExamType}){
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"#fff",borderBottom:"2px solid #FF6A00",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 2px 16px #FF6A0015"}}>
      <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer"}}><Logo/></button>
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        {user && EXAM_TYPES.map(e=>(
          <button key={e.id} onClick={()=>{setExamType(e.id);setPage("tests");}} style={{padding:"5px 12px",borderRadius:20,border:"2px solid",borderColor:examType===e.id?e.color:"#e0e0e0",background:examType===e.id?e.color:"#fff",color:examType===e.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{e.icon} {e.label}</button>
        ))}
        {["home","leaderboard"].map(p=>(
          <button key={p} onClick={()=>setPage(p)} style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",background:page===p?"#FF6A00":"transparent",color:page===p?"#fff":"#000",fontWeight:700,fontSize:13,textTransform:"capitalize"}}>{p==="leaderboard"?"🏆 Board":p.charAt(0).toUpperCase()+p.slice(1)}</button>
        ))}
        {user?(
          <>
            <button onClick={()=>setPage("dashboard")} style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",background:page==="dashboard"?"#FF6A00":"#fff0e6",color:page==="dashboard"?"#fff":"#FF6A00",fontWeight:700,fontSize:13}}>Dashboard</button>
            {user.role==="admin"&&<button onClick={()=>setPage("admin")} style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",background:page==="admin"?"#000":"#f0f0f0",color:page==="admin"?"#fff":"#000",fontWeight:700,fontSize:13}}>⚙️ Admin</button>}
            <button onClick={()=>setPage("profile")} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px 5px 5px",borderRadius:24,border:"2px solid #f0f0f0",background:"#fff",cursor:"pointer"}}>
              {user.photoURL
                ?<img src={user.photoURL} alt="" style={{width:28,height:28,borderRadius:"50%"}}/>
                :<div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#FF6A00,#ff9a00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff"}}>{user.name?.charAt(0).toUpperCase()}</div>
              }
              <span style={{fontWeight:700,fontSize:13,color:"#000"}}>{user.name?.split(" ")[0]}</span>
            </button>
          </>
        ):(
          <button onClick={()=>setPage("auth")} style={{padding:"6px 20px",borderRadius:8,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",boxShadow:"0 2px 10px #FF6A0050"}}>Login / Register</button>
        )}
      </div>
    </nav>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function AuthPage({onLogin}){
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",phone:"",password:"",confirm:"",role:"student"});
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);
  const [gLoading,setGLoading]=useState(false);
  const [success,setSuccess]=useState("");

  const f=(k,v)=>{setForm(p=>({...p,[k]:v}));setErrors(p=>({...p,[k]:""}));};

  const validate=()=>{
    const e={};
    if(mode!=="forgot"){
      if(!form.email.trim()) e.email="Email required";
      else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email="Invalid email";
      if(!form.password) e.password="Password required";
      else if(form.password.length<6) e.password="Min 6 characters";
    }
    if(mode==="register"){
      if(!form.name.trim()) e.name="Name required";
      if(form.phone&&!/^[0-9]{10}$/.test(form.phone)) e.phone="10-digit number";
      if(!form.confirm) e.confirm="Confirm your password";
      else if(form.confirm!==form.password) e.confirm="Passwords do not match";
    }
    if(mode==="forgot"&&!form.email.trim()) e.email="Email required";
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleGoogle=async()=>{
    setGLoading(true);
    try{
      await loginGoogle();
      onLogin();
    }catch(err){
      setErrors({google:err.message.includes("popup-closed")?"Popup closed. Try again.":err.message});
    }finally{setGLoading(false);}
  };

  const handleSubmit=async()=>{
    if(!validate()) return;
    setLoading(true);
    try{
      if(mode==="register"){
        await registerEmail(form.email,form.password,form.name,form.phone,form.role);
        onLogin();
      } else if(mode==="login"){
        await loginEmail(form.email,form.password);
        onLogin();
      } else {
        setSuccess("Password reset email sent! Check your inbox.");
        // In production: await sendPasswordResetEmail(auth,form.email);
      }
    }catch(err){
      const msg=err.code==="auth/user-not-found"?"No account with this email. Please register."
        :err.code==="auth/wrong-password"?"Incorrect password. Try again."
        :err.code==="auth/email-already-in-use"?"Email already registered. Please login."
        :err.code==="auth/invalid-credential"?"Invalid email or password."
        :err.message;
      setErrors({submit:msg});
    }finally{setLoading(false);}
  };

  const sw=m=>{setMode(m);setErrors({});setSuccess("");};

  return(
    <div style={{paddingTop:60,minHeight:"100vh",background:"linear-gradient(135deg,#000 0%,#1a0500 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 20px 40px"}}>
      <div style={{background:"#fff",borderRadius:24,padding:"40px 40px 32px",width:"100%",maxWidth:440,boxShadow:"0 24px 80px #FF6A0040"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <Logo/>
          <h2 style={{marginTop:16,fontWeight:900,fontSize:22}}>{mode==="login"?"Welcome Back 👋":mode==="register"?"Create Account 🚀":"Reset Password 🔑"}</h2>
          <p style={{color:"#888",fontSize:13,marginTop:4}}>Rank Achievers Academy · Anantapur</p>
        </div>

        {/* Google Button */}
        <button onClick={handleGoogle} disabled={gLoading} style={{width:"100%",padding:"13px 0",borderRadius:12,border:"2px solid #e0e0e0",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontWeight:700,fontSize:15,cursor:gLoading?"wait":"pointer",marginBottom:14,boxShadow:"0 2px 8px #00000010",transition:"box-shadow .2s"}}
          onMouseOver={e=>e.currentTarget.style.boxShadow="0 4px 16px #00000020"}
          onMouseOut={e=>e.currentTarget.style.boxShadow="0 2px 8px #00000010"}>
          {gLoading?<Spinner size={20}/>:<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.5 1.2 8.9 3.2l6.6-6.6C35.4 2.5 30.1 0 24 0 14.8 0 7 5.4 3.2 13.2l7.7 6C12.7 13.2 17.9 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.1-10 6.1-17z"/><path fill="#FBBC05" d="M10.9 28.8A14.7 14.7 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8l-7.7-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l8.3-6z"/><path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.4 2.2-6.1 0-11.3-3.7-13.1-9.1l-8.3 6C7 42.6 14.8 48 24 48z"/></svg>}
          {gLoading?"Signing in with Google...":"Continue with Google"}
        </button>
        {errors.google&&<div style={{background:"#fee2e2",border:"2px solid #fca5a5",borderRadius:9,padding:"8px 12px",marginBottom:12,fontSize:13,color:"#dc2626"}}>{errors.google}</div>}

        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{flex:1,height:1,background:"#e0e0e0"}}/><span style={{color:"#aaa",fontSize:12,fontWeight:600}}>OR</span><div style={{flex:1,height:1,background:"#e0e0e0"}}/>
        </div>

        {mode!=="forgot"&&(
          <div style={{display:"flex",background:"#f5f5f5",borderRadius:12,padding:4,marginBottom:18}}>
            {["login","register"].map(m=><button key={m} onClick={()=>sw(m)} style={{flex:1,padding:"9px 0",borderRadius:9,border:"none",cursor:"pointer",background:mode===m?"#FF6A00":"transparent",color:mode===m?"#fff":"#666",fontWeight:700,fontSize:14}}>{m==="login"?"Login":"Register"}</button>)}
          </div>
        )}

        {errors.submit&&<div style={{background:"#fee2e2",border:"2px solid #fca5a5",borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:13,color:"#dc2626",fontWeight:600}}>⚠ {errors.submit}</div>}
        {success&&<div style={{background:"#dcfce7",border:"2px solid #86efac",borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:13,color:"#166534",fontWeight:600}}>✅ {success}</div>}

        {mode==="register"&&<><label style={LS}>Full Name *</label><input value={form.name} onChange={e=>f("name",e.target.value)} style={IS} placeholder="Your full name"/><Err m={errors.name}/></>}
        {mode==="register"&&<><label style={LS}>Mobile Number</label><input value={form.phone} onChange={e=>f("phone",e.target.value)} style={IS} placeholder="10-digit" maxLength={10}/><Err m={errors.phone}/></>}

        <label style={LS}>Email Address *</label>
        <input value={form.email} onChange={e=>f("email",e.target.value)} type="email" placeholder="you@gmail.com" style={{...IS,borderColor:errors.email?"#fca5a5":"#f0f0f0"}}/><Err m={errors.email}/>

        {mode!=="forgot"&&<><label style={LS}>{mode==="register"?"Create Password *":"Password *"}</label><PwdInput value={form.password} onChange={e=>f("password",e.target.value)} placeholder={mode==="register"?"Min 6 characters":"Enter password"}/><Err m={errors.password}/></>}

        {mode==="register"&&(
          <>
            <label style={LS}>Confirm Password *</label><PwdInput value={form.confirm} onChange={e=>f("confirm",e.target.value)} placeholder="Re-enter"/><Err m={errors.confirm}/>
            <label style={LS}>I am a</label>
            <div style={{display:"flex",gap:10,marginBottom:14}}>
              {["student","admin"].map(r=><button key={r} onClick={()=>f("role",r)} style={{flex:1,padding:"10px 0",borderRadius:10,border:"2px solid",borderColor:form.role===r?"#FF6A00":"#e0e0e0",background:form.role===r?"#fff5ee":"#fff",color:form.role===r?"#FF6A00":"#666",fontWeight:700,fontSize:14,cursor:"pointer"}}>{r==="student"?"🎓 Student":"⚙️ Admin"}</button>)}
            </div>
          </>
        )}

        {mode==="login"&&<div style={{textAlign:"right",marginBottom:12}}><button onClick={()=>sw("forgot")} style={{background:"none",border:"none",color:"#FF6A00",fontWeight:700,fontSize:13,cursor:"pointer"}}>Forgot Password?</button></div>}

        <button onClick={handleSubmit} disabled={loading} style={{width:"100%",padding:"14px 0",borderRadius:12,border:"none",background:loading?"#ccc":"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontSize:16,fontWeight:800,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          {loading&&<Spinner size={18} color="#fff"/>}
          {loading?"Please wait...":mode==="login"?"Login →":mode==="register"?"Create Account →":"Send Reset Link →"}
        </button>
        {mode==="forgot"&&<button onClick={()=>sw("login")} style={{width:"100%",marginTop:10,padding:"11px 0",borderRadius:12,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",color:"#555"}}>← Back to Login</button>}
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({setPage,user,setExamType}){
  const [sel,setSel]=useState(null);
  return(
    <div style={{paddingTop:60,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{flex:1,minHeight:"calc(100vh - 60px)",background:"linear-gradient(135deg,#000 0%,#1a0800 40%,#000 100%)",display:"flex",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.05,backgroundImage:"linear-gradient(#FF6A00 1px,transparent 1px),linear-gradient(90deg,#FF6A00 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
        <div style={{position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(#FF6A0030,transparent 70%)"}}/>
        <div style={{position:"absolute",bottom:-100,left:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(#FF6A0020,transparent 70%)"}}/>
        <div style={{flex:1,display:"flex",position:"relative",maxWidth:1200,margin:"0 auto",width:"100%",padding:"40px",gap:40,alignItems:"center"}}>
          {/* LEFT */}
          <div style={{flex:1}}>
            <div style={{display:"inline-block",background:"#FF6A00",color:"#fff",padding:"5px 18px",borderRadius:20,fontSize:12,fontWeight:700,letterSpacing:2,marginBottom:24}}>ANANTAPUR'S #1 EXAM PREP PLATFORM</div>
            <h1 style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:900,color:"#fff",lineHeight:1.05,margin:"0 0 20px",letterSpacing:-2}}>
              Crack Your<br/><span style={{color:"#FF6A00"}}>Dream Exam.</span><br/><span style={{fontSize:"60%",color:"#888"}}>Right Here in Anantapur.</span>
            </h1>
            <p style={{color:"#888",fontSize:17,maxWidth:480,marginBottom:36,lineHeight:1.7}}>India's most focused aptitude practice platform for SSC, Banking & Railways. Real exam simulation · Video solutions · Instant scores saved to cloud.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:40}}>
              <button onClick={()=>user?setPage("tests"):setPage("auth")} style={{padding:"15px 40px",borderRadius:12,border:"none",background:"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontSize:17,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 30px #FF6A0070"}}>Start Practice →</button>
              <button onClick={()=>setPage("leaderboard")} style={{padding:"15px 32px",borderRadius:12,border:"2px solid #FF6A00",background:"transparent",color:"#FF6A00",fontSize:15,fontWeight:700,cursor:"pointer"}}>🏆 Leaderboard</button>
            </div>
            <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
              {[["50K+","Students"],["10K+","Questions"],["95%","Selection Rate"],["☁️","Cloud Saved"]].map(([v,l])=>(
                <div key={l}><div style={{fontSize:24,fontWeight:900,color:"#FF6A00"}}>{v}</div><div style={{fontSize:11,color:"#666",fontWeight:600}}>{l}</div></div>
              ))}
            </div>
          </div>
          {/* RIGHT — Exam Selector */}
          <div style={{width:320,flexShrink:0}}>
            <div style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(10px)",borderRadius:24,padding:24,border:"1px solid rgba(255,106,0,0.25)"}}>
              <div style={{color:"#FF6A00",fontWeight:800,fontSize:14,marginBottom:4,letterSpacing:1}}>CHOOSE YOUR EXAM</div>
              <div style={{color:"#666",fontSize:12,marginBottom:20}}>Select to start your preparation</div>
              {EXAM_TYPES.map(et=>(
                <div key={et.id} onClick={()=>{setSel(et.id);setExamType(et.id);if(user)setPage("tests");else setPage("auth");}}
                  style={{background:sel===et.id?"linear-gradient(135deg,#FF6A00,#ff9a00)":"rgba(255,255,255,0.05)",borderRadius:16,padding:"18px 20px",marginBottom:12,cursor:"pointer",border:"2px solid",borderColor:sel===et.id?"#FF6A00":"rgba(255,255,255,0.1)",transition:"all .2s"}}
                  onMouseOver={e=>{if(sel!==et.id){e.currentTarget.style.borderColor="#FF6A00";e.currentTarget.style.background="rgba(255,106,0,0.12)";}}}
                  onMouseOut={e=>{if(sel!==et.id){e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.background="rgba(255,255,255,0.05)";}}}
                >
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <span style={{fontSize:30}}>{et.icon}</span>
                    <div style={{flex:1}}><div style={{fontWeight:800,fontSize:16,color:"#fff"}}>{et.label}</div><div style={{fontSize:11,color:sel===et.id?"rgba(255,255,255,.7)":"#777",marginTop:2}}>{et.desc}</div></div>
                    <span style={{color:sel===et.id?"#fff":"#555",fontSize:16}}>→</span>
                  </div>
                </div>
              ))}
              {!user&&<div style={{marginTop:8,padding:"10px 14px",background:"rgba(255,106,0,.1)",borderRadius:10,border:"1px solid rgba(255,106,0,.3)",textAlign:"center"}}><span style={{color:"#FF6A00",fontSize:13,fontWeight:600}}>Login required to practice →</span></div>}
            </div>
          </div>
        </div>
      </div>
      <div style={{background:"#FF6A00",padding:"18px 40px",display:"flex",justifyContent:"center",gap:48,flexWrap:"wrap"}}>
        {[["⏱️","Real Exam Timer"],["📹","Video Solutions"],["☁️","Cloud Scores"],["🔵","Google Login"],["🔒↔🆓","Access Control"]].map(([i,l])=>(
          <div key={l} style={{textAlign:"center"}}><span style={{fontSize:18}}>{i}</span><div style={{fontSize:11,color:"#ffe0c0",fontWeight:700,marginTop:2}}>{l}</div></div>
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
function TestsPage({user,onStartTest,examType,setExamType}){
  const [selTopic,setSelTopic]=useState(null);
  const [modeModal,setModeModal]=useState(null);
  const [settings,setSettingsState]=useState({contentMode:"free"});
  const [userAccess,setUserAccess]=useState(true);

  useEffect(()=>{
    getSettings().then(s=>setSettingsState(s));
    if(user?.uid) checkAccess(user.uid).then(a=>setUserAccess(a));
  },[user]);

  const et=EXAM_TYPES.find(e=>e.id===examType)||EXAM_TYPES[0];
  const isPaidLocked=settings.contentMode==="paid"&&!userAccess&&user?.role!=="admin";

  return(
    <div style={{paddingTop:80,padding:"80px 40px 40px",maxWidth:1100,margin:"0 auto"}}>
      {/* Exam tabs */}
      <div style={{display:"flex",gap:12,marginBottom:28,flexWrap:"wrap"}}>
        {EXAM_TYPES.map(e=>(
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
function TestPage({test,user,onFinish}){
  const questions=Array.from({length:30},(_,i)=>({
    id:`${test.id}_q${i}`,
    question_text:`Q${i+1}: If the sum of two numbers is ${20+i} and their difference is ${4+i}, what is their product?`,
    option_a:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2)-10)}`,
    option_b:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2))}`,
    option_c:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2)+10)}`,
    option_d:`${Math.round(((20+i+4+i)/2)*((20+i-4-i)/2)+20)}`,
    correct_answer:"b",
    explanation:`x+y=${20+i}, x-y=${4+i} → x=${12+i}, y=8 → Product=${(12+i)*8}`,
    youtube_link:"https://www.youtube.com/embed/dQw4w9WgXcQ",
  }));

  const et=EXAM_TYPES.find(e=>e.id===test.examType)||EXAM_TYPES[0];
  const isTimed=test.timed!==false;
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

  useEffect(()=>{qTimesRef.current=qTimes;},[qTimes]);

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
          await updateDoc(doc(db,"users",user.uid),{
            totalTests:increment(1),
            [`examStats.${test.examType}.tests`]:increment(1),
            [`examStats.${test.examType}.totalScore`]:increment(cc),
          });
        }
      }catch(e){console.error("Save attempt failed:",e);}
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

  return(
    <div style={{paddingTop:60,height:"100vh",display:"flex",flexDirection:"column",background:"#f8f8f8"}}>
      {/* Header */}
      <div style={{background:"#000",color:"#fff",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontWeight:800,fontSize:14}}>{et.icon} {test.title}</div>
          <div style={{fontSize:11,marginTop:2,color:isTimed?"#f59e0b":"#22c55e",fontWeight:700}}>{isTimed?"⏱️ Timed Mode":"🧘 Practice Mode (No Timer)"}</div>
        </div>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          {isTimed?(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:10,color:"#aaa",marginBottom:2,letterSpacing:1}}>TIME LEFT</div>
              <div style={{background:tc,color:"#fff",padding:"6px 16px",borderRadius:8,fontWeight:900,fontSize:20,fontFamily:"monospace",boxShadow:`0 0 16px ${tc}80`}}>⏱ {fmtT(timeLeft)}</div>
            </div>
          ):(
            <div style={{background:"#22c55e20",border:"2px solid #22c55e40",borderRadius:10,padding:"8px 16px",textAlign:"center"}}>
              <div style={{fontSize:11,color:"#22c55e",fontWeight:700}}>🧘 PRACTICE MODE</div>
              <div style={{fontSize:11,color:"#666"}}>No time limit</div>
            </div>
          )}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:10,color:"#aaa",marginBottom:2,letterSpacing:1}}>THIS QUESTION</div>
            <div style={{background:liveQSec>120?"#dc2626":liveQSec>60?"#f59e0b":"#334155",color:"#fff",padding:"6px 16px",borderRadius:8,fontWeight:900,fontSize:20,fontFamily:"monospace",transition:"background .5s"}}>🕐 {fmtT(liveQSec)}</div>
          </div>
        </div>
        <button onClick={()=>setShowSubmitModal(true)} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#FF6A00",color:"#fff",fontWeight:800,cursor:"pointer",boxShadow:"0 0 12px #FF6A0070"}}>Submit Test</button>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Question panel */}
        <div style={{flex:1,padding:24,overflowY:"auto"}}>
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
            <div style={{display:"flex",gap:10,marginTop:24}}>
              <button onClick={()=>current>0&&goTo(current-1)} disabled={current===0} style={{padding:"10px 20px",borderRadius:10,border:"2px solid #e0e0e0",background:"#fff",fontWeight:700,cursor:"pointer",fontSize:13}}>← Prev</button>
              <button onClick={markReview} style={{padding:"10px 20px",borderRadius:10,border:`2px solid ${et.color}`,background:"#fff",color:et.color,fontWeight:700,cursor:"pointer",fontSize:13}}>🔖 Review</button>
              <button onClick={saveAndNext} style={{flex:1,padding:"10px 20px",borderRadius:10,border:"none",background:`linear-gradient(90deg,${et.color},${et.color}cc)`,color:"#fff",fontWeight:800,cursor:"pointer",fontSize:13}}>Save & Next →</button>
            </div>
          </div>
        </div>
        {/* Palette */}
        <div style={{width:250,background:"#fff",borderLeft:"2px solid #f0f0f0",padding:18,overflowY:"auto"}}>
          <h3 style={{fontWeight:800,fontSize:13,marginBottom:12}}>Question Palette</h3>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
            {[["#22c55e","Answered"],["#ef4444","Not Ans."],["#e5e7eb","Not Visited"],["#FF6A00","Review"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}><div style={{width:10,height:10,borderRadius:3,background:c}}/><span style={{color:"#555"}}>{l}</span></div>
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
            <div style={{fontSize:11,color:"#16a34a",fontWeight:700}}>☁️ Results auto-saved to cloud</div>
          </div>
        </div>
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
            <p style={{fontSize:12,color:"#888",marginBottom:18}}>☁️ Results will be saved to cloud automatically</p>
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

// ─── RESULT PAGE ─────────────────────────────────────────────────────────────
function ResultPage({result,onViewSolutions,onBack}){
  const {score,total,accuracy,timeSpent,test,auto}=result;
  const et=EXAM_TYPES.find(e=>e.id===test.examType)||EXAM_TYPES[0];
  const grade=accuracy>=80?{g:"Excellent! 🏆",c:"#22c55e"}:accuracy>=60?{g:"Good Job! 🎯",c:"#f59e0b"}:{g:"Keep Going! 📚",c:"#ef4444"};
  const timeSorted=result.questions.map((q,i)=>({qIndex:i,qNum:i+1,text:q.question_text,timeTaken:result.qTimes[i]||0,correct:result.answers[i]===q.correct_answer,answered:!!result.answers[i]})).filter(q=>q.timeTaken>0).sort((a,b)=>b.timeTaken-a.timeTaken).slice(0,10);
  const maxTime=timeSorted[0]?.timeTaken||1;
  return(
    <div style={{paddingTop:80,padding:"80px 40px 40px",maxWidth:680,margin:"0 auto"}}>
      {auto&&<div style={{background:"#fff3cd",border:"2px solid #ffc107",borderRadius:10,padding:"10px 18px",marginBottom:20,textAlign:"center"}}>⏰ Time up! Auto-submitted.</div>}
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:56,marginBottom:10}}>{accuracy>=80?"🏆":accuracy>=60?"🎯":"📚"}</div>
        <h1 style={{fontSize:28,fontWeight:900,color:grade.c,marginBottom:4}}>{grade.g}</h1>
        <p style={{color:"#666"}}>{et.icon} {test.title} · {result.mode==="practice"?"🧘 Practice Mode":"⏱️ Timed Mode"}</p>
        <div style={{marginTop:8,background:"#f0fdf4",borderRadius:10,padding:"6px 16px",display:"inline-block",border:"1px solid #86efac"}}>
          <span style={{fontSize:12,color:"#16a34a",fontWeight:700}}>☁️ Results saved to your cloud account</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,marginBottom:20}}>
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
    <div style={{paddingTop:80,padding:"80px 40px 40px",maxWidth:800,margin:"0 auto"}}>
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
    <div style={{paddingTop:80,padding:"80px 40px 40px",maxWidth:900,margin:"0 auto"}}>
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
        <button onClick={()=>setPage("tests")} style={{padding:"10px 22px",borderRadius:10,border:"none",background:"#FF6A00",color:"#fff",fontWeight:800,cursor:"pointer"}}>Practice →</button>
      </div>

      {isPaid&&!userAccess&&(
        <div style={{background:"#fff3cd",border:"2px solid #ffc107",borderRadius:12,padding:"14px 20px",marginBottom:20,display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontSize:26}}>🔒</span>
          <div><div style={{fontWeight:800,marginBottom:2}}>Access not enabled</div><div style={{fontSize:13,color:"#666"}}>Contact Rank Achievers admin to unlock all content.</div></div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
        {[{l:"Tests Attempted",v:loading?"...":total,i:"📝"},{l:"Average Accuracy",v:loading?"...":`${avgAcc}%`,i:"🎯"},{l:"Avg Time/Test",v:loading?"...":fmtT(avgTime),i:"⏱️"}].map(s=>(
          <div key={s.l} style={{background:"#fff",borderRadius:14,padding:"20px 16px",border:"2px solid #f0f0f0",textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:6}}>{s.i}</div>
            <div style={{fontSize:24,fontWeight:900,color:"#FF6A00"}}>{s.v}</div>
            <div style={{fontSize:12,color:"#888",marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{background:"#fff",borderRadius:14,padding:22,border:"2px solid #f0f0f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{fontWeight:900,margin:0}}>Recent Attempts</h3>
          <span style={{fontSize:12,color:"#888"}}>☁️ Synced from cloud</span>
        </div>
        {loading?(
          <div style={{display:"flex",justifyContent:"center",padding:32}}><Spinner/></div>
        ):attempts.length===0?(
          <div style={{textAlign:"center",padding:32,color:"#aaa"}}>
            <p style={{marginBottom:16}}>No tests attempted yet.</p>
            <button onClick={()=>setPage("tests")} style={{padding:"10px 24px",borderRadius:10,border:"none",background:"#FF6A00",color:"#fff",fontWeight:800,cursor:"pointer"}}>Take First Test →</button>
          </div>
        ):(
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{borderBottom:"2px solid #f0f0f0"}}>{["Test","Exam","Mode","Score","Accuracy","Time"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontSize:11,color:"#888",fontWeight:700}}>{h}</th>)}</tr></thead>
            <tbody>{attempts.map((a,i)=>(
              <tr key={a.id||i} style={{borderBottom:"1px solid #f8f8f8"}}>
                <td style={{padding:"10px",fontWeight:600,fontSize:12}}>{a.testTitle}</td>
                <td style={{padding:"10px",fontSize:12}}>{EXAM_TYPES.find(e=>e.id===a.examType)?.icon} {a.examType?.toUpperCase()}</td>
                <td style={{padding:"10px",fontSize:11}}>{a.mode==="practice"?"🧘":"⏱️"} {a.mode}</td>
                <td style={{padding:"10px",fontSize:12}}>{a.score}/{a.total}</td>
                <td style={{padding:"10px"}}><span style={{background:a.accuracy>=80?"#dcfce7":a.accuracy>=60?"#fef9c3":"#fee2e2",color:a.accuracy>=80?"#16a34a":a.accuracy>=60?"#854d0e":"#dc2626",padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700}}>{a.accuracy}%</span></td>
                <td style={{padding:"10px",fontSize:12,color:"#666"}}>{fmtT(a.timeSpent||0)}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────
function LeaderboardPage(){
  const [leaders,setLeaders]=useState([]);
  const [loading,setLoading]=useState(true);
  const [examFilter,setExamFilter]=useState("all");

  useEffect(()=>{
    const q=query(collection(db,"attempts"),orderBy("accuracy","desc"),orderBy("createdAt","desc"),limit(50));
    getDocs(q).then(snap=>{
      const seen=new Set();
      const top=snap.docs.map(d=>({id:d.id,...d.data()})).filter(a=>{
        const key=`${a.userId}_${a.testId}`;
        if(seen.has(key)) return false;
        seen.add(key);return true;
      }).slice(0,20);
      setLeaders(top);setLoading(false);
    }).catch(()=>setLoading(false));
  },[]);

  const filtered=examFilter==="all"?leaders:leaders.filter(l=>l.examType===examFilter);

  return(
    <div style={{paddingTop:80,padding:"80px 40px 40px",maxWidth:700,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:44,marginBottom:8}}>🏆</div><h1 style={{fontSize:28,fontWeight:900}}>Live <span style={{color:"#FF6A00"}}>Leaderboard</span></h1><p style={{color:"#888",fontSize:13}}>Real scores from Rank Achievers students · Updated live ☁️</p></div>
      <div style={{display:"flex",gap:8,marginBottom:20,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>setExamFilter("all")} style={{padding:"7px 16px",borderRadius:20,border:"2px solid",borderColor:examFilter==="all"?"#FF6A00":"#e0e0e0",background:examFilter==="all"?"#FF6A00":"#fff",color:examFilter==="all"?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>All Exams</button>
        {EXAM_TYPES.map(e=><button key={e.id} onClick={()=>setExamFilter(e.id)} style={{padding:"7px 16px",borderRadius:20,border:"2px solid",borderColor:examFilter===e.id?e.color:"#e0e0e0",background:examFilter===e.id?e.color:"#fff",color:examFilter===e.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{e.icon} {e.label}</button>)}
      </div>
      <div style={{background:"#fff",borderRadius:18,overflow:"hidden",border:"2px solid #f0f0f0"}}>
        <div style={{background:"#000",padding:"12px 22px",display:"flex",gap:14}}>{["#","Student","Exam","Score","Acc","Time"].map((h,i)=><div key={h} style={{color:"#FF6A00",fontWeight:800,fontSize:12,flex:i===1?2:1}}>{h}</div>)}</div>
        {loading?(
          <div style={{display:"flex",justifyContent:"center",padding:32}}><Spinner/></div>
        ):filtered.length===0?(
          <div style={{textAlign:"center",padding:32,color:"#aaa"}}>No attempts yet. Be the first!</div>
        ):filtered.slice(0,10).map((l,i)=>(
          <div key={l.id} style={{padding:"13px 22px",display:"flex",gap:14,alignItems:"center",borderBottom:"1px solid #f0f0f0",background:i<3?"#fff8f0":"#fff"}}>
            <div style={{flex:1,fontWeight:900,fontSize:16}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}</div>
            <div style={{flex:2,fontWeight:700,fontSize:13}}>{l.userName||"Student"}</div>
            <div style={{flex:1,fontSize:12}}>{EXAM_TYPES.find(e=>e.id===l.examType)?.icon}</div>
            <div style={{flex:1,color:"#FF6A00",fontWeight:800,fontSize:13}}>{l.score}/{l.total}</div>
            <div style={{flex:1}}><span style={{background:"#dcfce7",color:"#16a34a",padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700}}>{l.accuracy}%</span></div>
            <div style={{flex:1,color:"#666",fontSize:12}}>{fmtT(l.timeSpent||0)}</div>
          </div>
        ))}
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
    <div style={{paddingTop:80,padding:"80px 40px 40px",maxWidth:600,margin:"0 auto"}}>
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
      const lines=ev.target.result.trim().split("\n").filter(Boolean);
      if(lines.length<2){setUpMsg("❌ Need header + data rows");return;}
      const hdrs=lines[0].split(",").map(h=>h.trim().toLowerCase().replace(/"/g,""));
      const miss=["question_text","option_a","option_b","correct_answer"].filter(r=>!hdrs.includes(r));
      if(miss.length){setUpMsg(`❌ Missing: ${miss.join(", ")}`);return;}
      const rows=lines.slice(1).map((l,i)=>{const v=l.split(",").map(x=>x.trim().replace(/"/g,""));const o={};hdrs.forEach((h,idx)=>o[h]=v[idx]||"");return{...o,_row:i+2};});
      setUpRows(rows);setUpMsg(`✅ ${rows.length} rows ready to import`);
    };r.readAsText(file);
  };

  const importBulk=async()=>{
    setUpLoading(true);
    try{
      const batch=upRows.map(r=>addDoc(collection(db,"questions"),{...r,examType,topicId:curTopic.id,topicName:curTopic.name,createdAt:serverTimestamp()}));
      await Promise.all(batch);
      setUpMsg(`✅ ${upRows.length} questions saved to Firestore!`);
      setUpRows([]);setUpFile(null);if(fRef.current)fRef.current.value="";
    }catch(err){setUpMsg("❌ Import failed: "+err.message);}
    finally{setUpLoading(false);}
  };

  const filtStu=students.filter(s=>s.name?.toLowerCase().includes(search.toLowerCase())||s.email?.toLowerCase().includes(search.toLowerCase()));
  const TABS=[{id:"students",l:"👥 Students"},{id:"questions",l:"📝 Questions"},{id:"bulk",l:"📤 Bulk Upload"},{id:"settings",l:"⚙️ Settings"}];

  return(
    <div style={{paddingTop:80,padding:"80px 28px 40px",maxWidth:1000,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:10}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:900,margin:0}}>Admin Dashboard</h1>
          <p style={{color:"#888",margin:"3px 0 0",fontSize:12}}>Rank Achievers Academy · Anantapur · Firebase Backend ☁️</p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:9,border:"2px solid",borderColor:tab===t.id?"#FF6A00":"#e0e0e0",background:tab===t.id?"#FF6A00":"#fff",color:tab===t.id?"#fff":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.l}</button>)}
        </div>
      </div>

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
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,alignItems:"start"}}>
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

      {/* BULK UPLOAD */}
      {tab==="bulk"&&(
        <div style={{background:"#fff",borderRadius:18,padding:28,border:"2px solid #f0f0f0"}}>
          <h3 style={{fontWeight:900,marginBottom:6}}>Bulk Upload to Firestore</h3>
          <p style={{color:"#888",marginBottom:20,fontSize:13}}>Upload CSV — each row saved as a Firestore question document</p>
          <div style={{display:"flex",gap:10,marginBottom:18}}>
            {EXAM_TYPES.map(e=><button key={e.id} onClick={()=>setExamType(e.id)} style={{flex:1,padding:"8px 0",borderRadius:9,border:"2px solid",borderColor:examType===e.id?e.color:"#e0e0e0",background:examType===e.id?e.color:"#fff",color:examType===e.id?"#fff":"#555",fontWeight:700,cursor:"pointer",fontSize:12}}>{e.icon} {e.label}</button>)}
          </div>
          <div onClick={()=>fRef.current?.click()} style={{border:"2px dashed #FF6A00",borderRadius:14,padding:"40px 32px",marginBottom:18,background:"#fff8f0",textAlign:"center",cursor:"pointer"}}
            onMouseOver={e=>e.currentTarget.style.background="#fff0e0"} onMouseOut={e=>e.currentTarget.style.background="#fff8f0"}>
            <div style={{fontSize:40,marginBottom:8}}>📂</div>
            <div style={{fontWeight:800,fontSize:14,marginBottom:4}}>{upFile?`📄 ${upFile.name}`:"Click to Choose CSV File"}</div>
            <div style={{color:"#888",fontSize:12}}>{upFile?`${upRows.length} rows detected`:"Rows will be saved to Firebase Firestore"}</div>
            <input ref={fRef} type="file" accept=".csv,.txt" onChange={handleFile} style={{display:"none"}}/>
          </div>
          {upMsg&&<div style={{padding:"10px 16px",borderRadius:9,marginBottom:14,fontSize:13,fontWeight:600,background:upMsg.startsWith("✅")?"#dcfce7":"#fee2e2",color:upMsg.startsWith("✅")?"#16a34a":"#dc2626"}}>{upMsg}</div>}
          {upRows.length>0&&(
            <>
              <div style={{overflowX:"auto",marginBottom:18}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                  <thead><tr style={{background:"#000",color:"#FF6A00"}}>{["#","Question","A","B","Ans","Diff"].map(h=><th key={h} style={{padding:"7px 9px",textAlign:"left",fontWeight:700}}>{h}</th>)}</tr></thead>
                  <tbody>{upRows.slice(0,5).map((r,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid #f0f0f0",background:i%2?"#f9f9f9":"#fff"}}>
                      <td style={{padding:"7px"}}>{i+1}</td>
                      <td style={{padding:"7px",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.question_text}</td>
                      <td style={{padding:"7px"}}>{r.option_a}</td><td style={{padding:"7px"}}>{r.option_b}</td>
                      <td style={{padding:"7px",color:"#FF6A00",fontWeight:700}}>{r.correct_answer?.toUpperCase()}</td>
                      <td style={{padding:"7px"}}>{r.difficulty||"easy"}</td>
                    </tr>
                  ))}</tbody>
                </table>
                {upRows.length>5&&<div style={{textAlign:"center",color:"#aaa",fontSize:11,marginTop:5}}>...and {upRows.length-5} more</div>}
              </div>
              <button onClick={importBulk} disabled={upLoading} style={{padding:"12px 32px",borderRadius:11,border:"none",background:upLoading?"#ccc":"linear-gradient(90deg,#FF6A00,#ff9a00)",color:"#fff",fontWeight:800,fontSize:14,cursor:upLoading?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:8}}>
                {upLoading&&<Spinner size={16} color="#fff"/>}⬆️ Import {upRows.length} Questions to Firestore
              </button>
            </>
          )}
          <div style={{marginTop:20,background:"#f8f8f8",borderRadius:11,padding:16}}>
            <div style={{fontWeight:800,marginBottom:8,fontSize:13}}>📋 CSV Format:</div>
            <code style={{fontSize:11,color:"#333",display:"block",whiteSpace:"pre",lineHeight:1.8,overflowX:"auto"}}>{`question_text,option_a,option_b,option_c,option_d,correct_answer,explanation,youtube_link,difficulty\n"What is 15% of 200?","20","25","30","35","c","15/100×200=30","","easy"`}</code>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CSS ANIMATION ────────────────────────────────────────────────────────────
const spinStyle = document.createElement("style");
spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(spinStyle);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const fbUser = useAuth(); // undefined=loading, null=logged out, obj=logged in
  const [page,setPage]   = useState("home");
  const [examType,setExamType] = useState("ssc");
  const [activeTest,setActiveTest] = useState(null);
  const [testResult,setTestResult] = useState(null);

  // Once auth state resolves, redirect admin to admin panel
  useEffect(()=>{
    if(fbUser && fbUser.role==="admin" && page==="home"){
      setPage("admin");
    }
  },[fbUser]);

  const handleLogin = () => {
    // Auth state change handled by useAuth hook automatically
    // Just redirect based on role after auth resolves
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
      />

      {page==="home"      && <HomePage    setPage={setPage} user={fbUser} setExamType={setExamType}/>}
      {page==="auth"      && <AuthPage    onLogin={handleLogin}/>}
      {page==="tests"     && <TestsPage   user={fbUser} onStartTest={handleStartTest} examType={examType} setExamType={setExamType}/>}
      {page==="result"    && testResult   && <ResultPage    result={testResult} onViewSolutions={()=>setPage("solutions")} onBack={()=>setPage("tests")}/>}
      {page==="solutions" && testResult   && <SolutionsPage result={testResult} onBack={()=>setPage("result")}/>}
      {page==="dashboard" && fbUser       && <DashboardPage user={fbUser} setPage={setPage}/>}
      {page==="leaderboard"               && <LeaderboardPage/>}
      {page==="profile"   && fbUser       && <ProfilePage   user={fbUser} setUser={()=>{}} setPage={setPage}/>}
      {page==="admin"     && fbUser?.role==="admin" && <AdminPage/>}
    </div>
  );
}
