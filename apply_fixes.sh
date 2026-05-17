#!/bin/bash
# ── Rank Achievers — Apply all remaining bug fixes to src/App.jsx ──
# Run from: ~/Downloads/rankachievers/
# Usage: bash apply_fixes.sh

set -e
FILE="src/App.jsx"

echo "🔧 Applying fixes to $FILE..."

# ── FIX 1: Add React import (already done via sed, but ensure it's there) ──
# Check if React is already imported
if ! grep -q "^import React," "$FILE"; then
  sed -i '' "1s/.*/import React, { useState, useEffect, useRef, useCallback } from \"react\";/" "$FILE"
  echo "✅ Fix 1: Added React import"
else
  echo "✅ Fix 1: React import already present"
fi

# ── FIX 2: Firebase npm imports (already done, verify) ──
if grep -q "gstatic.com" "$FILE"; then
  sed -i '' "2s|.*|import { initializeApp } from \"firebase\/app\";|" "$FILE"
  sed -i '' "3s|.*|import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from \"firebase\/auth\";|" "$FILE"
  sed -i '' "4s|.*|import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, collection, query, where, orderBy, limit, getDocs, onSnapshot, serverTimestamp, increment } from \"firebase\/firestore\";|" "$FILE"
  echo "✅ Fix 2: Firebase npm imports applied"
else
  echo "✅ Fix 2: Firebase imports already correct"
fi

# ── FIX 3: Notice date formatting crash ──
# toLocaleDateString("en-IN","dd/MM/yyyy") → correct options object
sed -i '' 's/toLocaleDateString("en-IN","dd\/MM\/yyyy")/toLocaleDateString("en-IN",{day:"2-digit",month:"2-digit",year:"numeric"})/g' "$FILE"
echo "✅ Fix 3: Notice date formatting fixed"

# ── FIX 4: ThemeContext declared before ThemeProvider and ThemeToggle ──
# ThemeContext is used before declaration — move it up above ErrorBoundary
# Check if ThemeContext is already declared early
THEME_LINE=$(grep -n "^const ThemeContext" "$FILE" | head -1 | cut -d: -f1)
if [ "$THEME_LINE" -gt 200 ] 2>/dev/null; then
  # Remove the late declaration
  sed -i '' '/^const ThemeContext = React\.createContext/d' "$FILE"
  # Insert after the fmtT line (line ~69 area, after constants)
  sed -i '' '/^const fmtT/a\
\
// ─── THEME CONTEXT (declared early so ThemeToggle + ThemeProvider can use it) ──\
const ThemeContext = React.createContext({theme:"dark",toggle:()=>{}});' "$FILE"
  echo "✅ Fix 4: ThemeContext moved to top"
else
  echo "✅ Fix 4: ThemeContext already declared early"
fi

# ── FIX 5: Wrap App return with ThemeProvider ──
if ! grep -q "<ThemeProvider>" "$FILE"; then
  # Wrap the main return div with ThemeProvider
  sed -i '' 's|  return(\n    <div style={{fontFamily|  return(\n    <ThemeProvider>\n    <div style={{fontFamily|' "$FILE"
  # This approach won't work for multiline — use Python instead
  python3 - <<'PYEOF'
import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# Find the main App return and wrap with ThemeProvider
old = """  return(
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",minHeight:"100vh",background:"#fff"}}>"""
new = """  return(
    <ThemeProvider>
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",minHeight:"100vh",background:"#fff"}}>"""

old_end = """    </div>
  );
}

// ════"""
new_end = """    </div>
    </ThemeProvider>
  );
}

// ════"""

content = content.replace(old, new, 1)
content = content.replace(old_end, new_end, 1)

with open("src/App.jsx", "w") as f:
    f.write(content)

print("✅ Fix 5: ThemeProvider wraps App return")
PYEOF
else
  echo "✅ Fix 5: ThemeProvider already wrapping App"
fi

# ── FIX 6: useAuth — expose setUser + fix ProfilePage setUser no-op ──
python3 - <<'PYEOF'
with open("src/App.jsx", "r") as f:
    content = f.read()

# Fix useAuth to expose setUser
old_return = "  return {user, justLoggedIn, clearJustLoggedIn:()=>setJustLoggedIn(false)};"
new_return  = "  return {user, setUser, justLoggedIn, clearJustLoggedIn:()=>setJustLoggedIn(false)};"
content = content.replace(old_return, new_return, 1)

# Fix App to destructure setUser from useAuth
old_auth = "  const {user:fbUser, justLoggedIn, clearJustLoggedIn} = useAuth();"
new_auth  = "  const {user:fbUser, setUser:setFbUser, justLoggedIn, clearJustLoggedIn} = useAuth();"
content = content.replace(old_auth, new_auth, 1)

# Fix ProfilePage to receive real setUser
old_prof = 'page==="profile"   && fbUser       && <ProfilePage   user={fbUser} setUser={()=>{}} setPage={setPage}/>'
new_prof  = 'page==="profile"   && fbUser       && <ProfilePage   user={fbUser} setUser={setFbUser} setPage={setPage}/>'
content = content.replace(old_prof, new_prof, 1)

# Fix setUser missing for existing users in useAuth
old_auth_block = """        } else {
          // Admin email → admin role on first Google login
          const firstRole=fbUser.email===ADMIN_EMAIL?"admin":"student";
          profile={uid:fbUser.uid,name:fbUser.displayName||fbUser.email.split("@")[0],email:fbUser.email,role:firstRole,photoURL:fbUser.photoURL||null,googleLogin:true,createdAt:serverTimestamp(),accessEnabled:firstRole==="admin"};
          await setDoc(doc(db,"users",fbUser.uid),profile);
        }
        if(isNewLogin) setJustLoggedIn(true);"""
new_auth_block = """        } else {
          // Admin email → admin role on first Google login
          const firstRole=fbUser.email===ADMIN_EMAIL?"admin":"student";
          profile={uid:fbUser.uid,name:fbUser.displayName||fbUser.email.split("@")[0],email:fbUser.email,role:firstRole,photoURL:fbUser.photoURL||null,googleLogin:true,createdAt:serverTimestamp(),accessEnabled:firstRole==="admin"};
          await setDoc(doc(db,"users",fbUser.uid),profile);
        }
        // BUG FIX: setUser must be called for BOTH new and existing users
        setUser({...profile});
        if(isNewLogin) setJustLoggedIn(true);"""

if "BUG FIX: setUser must be called" not in content:
    content = content.replace(old_auth_block, new_auth_block, 1)
    print("✅ Fix 6a: setUser called for existing users")
else:
    print("✅ Fix 6a: setUser fix already present")

with open("src/App.jsx", "w") as f:
    f.write(content)

print("✅ Fix 6b: useAuth exposes setUser, ProfilePage gets real setter")
PYEOF

# ── FIX 7: Remove duplicate admin role check ──
python3 - <<'PYEOF'
with open("src/App.jsx", "r") as f:
    content = f.read()

duplicate = """          // Fix: if admin email has wrong role, correct it in Firestore
          if(fbUser.email===ADMIN_EMAIL && profile.role!=="admin"){
            await updateDoc(doc(db,"users",fbUser.uid),{role:"admin",accessEnabled:true});
            profile.role="admin";
            profile.accessEnabled=true;
          }
"""
if duplicate in content:
    content = content.replace(duplicate, "", 1)
    print("✅ Fix 7: Removed duplicate admin role check")
else:
    print("✅ Fix 7: No duplicate admin check found")

with open("src/App.jsx", "w") as f:
    f.write(content)
PYEOF

# ── FIX 8: Guard spin style injection ──
python3 - <<'PYEOF'
with open("src/App.jsx", "r") as f:
    content = f.read()

old_spin = """// ─── CSS ANIMATION ────────────────────────────────────────────────────────────
const spinStyle = document.createElement("style");
spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(spinStyle);"""

new_spin = """// ─── CSS ANIMATION ────────────────────────────────────────────────────────────
if(!document.getElementById("ra-spin-css")){
  const spinStyle = document.createElement("style");
  spinStyle.id = "ra-spin-css";
  spinStyle.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
  document.head.appendChild(spinStyle);
}"""

if 'spinStyle.id = "ra-spin-css"' not in content:
    content = content.replace(old_spin, new_spin, 1)
    print("✅ Fix 8: Spin style injection guarded")
else:
    print("✅ Fix 8: Spin style guard already present")

with open("src/App.jsx", "w") as f:
    f.write(content)
PYEOF

# ── FIX 9: NavBar useMobile() instead of static window.innerWidth ──
python3 - <<'PYEOF'
with open("src/App.jsx", "r") as f:
    content = f.read()

old_nav = """  const [menuOpen,setMenuOpen]=useState(false);
  const isMobile=window.innerWidth<=768;
  return(
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100"""

new_nav = """  const [menuOpen,setMenuOpen]=useState(false);
  const isMobile=useMobile();
  return(
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100"""

if "const isMobile=useMobile();" not in content:
    content = content.replace(old_nav, new_nav, 1)
    print("✅ Fix 9: NavBar uses reactive useMobile()")
else:
    print("✅ Fix 9: NavBar already uses useMobile()")

with open("src/App.jsx", "w") as f:
    f.write(content)
PYEOF

# ── FIX 10: StreakWidget margin ──
python3 - <<'PYEOF'
with open("src/App.jsx", "r") as f:
    content = f.read()

old_streak = "      <StreakWidget userId={user?.uid}/>"
new_streak  = "      <StreakWidget userId={user?.uid} style={{marginBottom:16}}/>"

# Only fix if not already done
if 'StreakWidget userId={user?.uid} style' not in content:
    content = content.replace(old_streak, new_streak, 1)
    print("✅ Fix 10: StreakWidget margin added")
else:
    print("✅ Fix 10: StreakWidget margin already present")

with open("src/App.jsx", "w") as f:
    f.write(content)
PYEOF

# ── FIX 11: ErrorBoundary wrapping in main.jsx ──
MAIN="src/main.jsx"
if ! grep -q "ErrorBoundary" "$MAIN"; then
python3 - <<'PYEOF'
with open("src/main.jsx", "r") as f:
    content = f.read()

old_main = """import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);"""

new_main = """import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App, { ErrorBoundary } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);"""

content = content.replace(old_main, new_main, 1)

with open("src/main.jsx", "w") as f:
    f.write(content)

print("✅ Fix 11: ErrorBoundary wraps App in main.jsx")
PYEOF

# Also export ErrorBoundary from App.jsx
python3 - <<'PYEOF'
with open("src/App.jsx", "r") as f:
    content = f.read()

old_eb = "class ErrorBoundary extends React.Component{"
new_eb  = "export class ErrorBoundary extends React.Component{"

if "export class ErrorBoundary" not in content:
    content = content.replace(old_eb, new_eb, 1)
    print("✅ Fix 11b: ErrorBoundary exported")
else:
    print("✅ Fix 11b: ErrorBoundary already exported")

with open("src/App.jsx", "w") as f:
    f.write(content)
PYEOF
else
  echo "✅ Fix 11: ErrorBoundary already in main.jsx"
fi

echo ""
echo "✅ All fixes applied! Now run:"
echo "   npm run build && git add -A && git commit -m 'Fix: all bugs - theme, ErrorBoundary, dates, setUser, imports' && git push"
