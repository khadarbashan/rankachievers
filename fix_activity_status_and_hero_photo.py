#!/usr/bin/env python3
"""
Two fixes for the Python course:

  1. Stale "Typing" status bug — when a student closes the tab/browser or
     loses connection, the admin panel kept showing "Typing" forever because
     nothing ever marked them as gone. Now: (a) the page tries to write
     "away" the moment the tab closes/backgrounds, and (b) the admin view
     falls back to "Idle" once a card hasn't updated in 30+ seconds,
     regardless of what status was last saved — so it's correct even if
     the browser kills the page before the "away" write can complete.

  2. Faculty home page redesign — photo is now a full-bleed background for
     the hero section (institute header + your name + login button), with
     a warm spotlight glow over your face and a dark gradient for text
     legibility. Stats and course units below stay on the plain dark
     background, unchanged.

Run from: ~/Downloads/rankachievers/
    python3 fix_activity_status_and_hero_photo.py

Safe to re-run: checks if already applied before patching.
Requires: add_faculty_home.py must have already been run once.
"""

import sys

FILE = "src/App.jsx"

with open(FILE, "r") as f:
    content = f.read()

original_length = len(content)
steps_applied = []
steps_skipped = []


# ══════════════════════════════════════════════════════════════════════════
# FIX 1 — usePyActivitySync: detect tab close/background, write "away" status
# ══════════════════════════════════════════════════════════════════════════
OLD_HOOK = '''function usePyActivitySync(user, topicTitle, unitTitle, tcIndex, tcQuestion) {
  const lastSentRef = useRef(0);
  const pendingRef = useRef(null);
  const timerRef = useRef(null);

  const sync = useCallback((code, status) => {
    if (!user?.uid) return; // only track logged-in students
    const now = Date.now();
    const doWrite = () => {
      lastSentRef.current = Date.now();
      setDoc(doc(db, "python_activity", user.uid), {
        uid: user.uid,
        name: user.name || user.email || "Student",
        email: user.email || null,
        unitTitle: unitTitle || null,
        topicTitle: topicTitle || null,
        problemIndex: tcIndex,
        question: tcQuestion ? tcQuestion.slice(0, 140) : null,
        code: (code || "").slice(0, 4000), // cap size to keep doc small & cheap
        status: status || "typing", // typing | running | pass | fail
        updatedAt: serverTimestamp(),
      }, { merge: true }).catch(() => {});
    };

    if (now - lastSentRef.current >= PY_ACTIVITY_SYNC_MS) {
      doWrite();
    } else {
      // throttle: schedule a trailing write so the last keystrokes aren't lost
      pendingRef.current = { code, status };
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (pendingRef.current) doWrite();
      }, PY_ACTIVITY_SYNC_MS - (now - lastSentRef.current));
    }
  }, [user, unitTitle, topicTitle, tcIndex, tcQuestion]);

  // Clean up on unmount: mark the student as no longer on this problem.
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return sync;
}'''

NEW_HOOK = '''function usePyActivitySync(user, topicTitle, unitTitle, tcIndex, tcQuestion) {
  const lastSentRef = useRef(0);
  const pendingRef = useRef(null);
  const timerRef = useRef(null);
  const lastCodeRef = useRef("");

  const sync = useCallback((code, status) => {
    if (!user?.uid) return; // only track logged-in students
    lastCodeRef.current = code || "";
    const now = Date.now();
    const doWrite = (overrideStatus) => {
      lastSentRef.current = Date.now();
      setDoc(doc(db, "python_activity", user.uid), {
        uid: user.uid,
        name: user.name || user.email || "Student",
        email: user.email || null,
        unitTitle: unitTitle || null,
        topicTitle: topicTitle || null,
        problemIndex: tcIndex,
        question: tcQuestion ? tcQuestion.slice(0, 140) : null,
        code: (lastCodeRef.current || "").slice(0, 4000), // cap size to keep doc small & cheap
        status: overrideStatus || status || "typing", // typing | running | pass | fail | away
        updatedAt: serverTimestamp(),
      }, { merge: true }).catch(() => {});
    };

    if (now - lastSentRef.current >= PY_ACTIVITY_SYNC_MS) {
      doWrite();
    } else {
      // throttle: schedule a trailing write so the last keystrokes aren't lost
      pendingRef.current = { code, status };
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (pendingRef.current) doWrite();
      }, PY_ACTIVITY_SYNC_MS - (now - lastSentRef.current));
    }
  }, [user, unitTitle, topicTitle, tcIndex, tcQuestion]);

  // Mark the student "away" as soon as we can detect they've left — tab closed,
  // switched apps, or browser backgrounded. This is best-effort: browsers don't
  // guarantee async work completes during unload, so this is a fast path, and
  // the admin tab's staleness fallback (PY_ACTIVITY_STALE_MS) is the real safety net.
  useEffect(() => {
    if (!user?.uid) return;
    const markAway = () => {
      try {
        setDoc(doc(db, "python_activity", user.uid), {
          status: "away",
          updatedAt: serverTimestamp(),
        }, { merge: true }).catch(() => {});
      } catch (e) { /* best-effort only */ }
    };
    const handleVisibility = () => { if (document.hidden) markAway(); };
    window.addEventListener("beforeunload", markAway);
    window.addEventListener("pagehide", markAway);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("beforeunload", markAway);
      window.removeEventListener("pagehide", markAway);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user]);

  // Clean up timers on unmount (e.g. navigating to a different problem within the app).
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return sync;
}'''

if "markAway" in content:
    steps_skipped.append("1. Tab-close/away detection already present")
elif OLD_HOOK in content:
    content = content.replace(OLD_HOOK, NEW_HOOK, 1)
    steps_applied.append("1. Added tab-close/background detection (writes 'away' status)")
else:
    print("❌ FIX 1 FAILED: could not find the exact usePyActivitySync hook. Aborting — no changes written.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# FIX 2 — Admin tab: status badge falls back to "Idle" once stale, regardless
# of last-saved status. This is the safety net if the "away" write never lands.
# ══════════════════════════════════════════════════════════════════════════
OLD_BADGE = '''  const statusBadge = (status) => {
    const map = {
      typing: { l: "✍️ Typing", c: "#3b82f6" },
      running: { l: "⏳ Running", c: "#f59e0b" },
      pass: { l: "✅ Passed", c: "#22c55e" },
      fail: { l: "✕ Failed", c: "#ef4444" },
    };
    return map[status] || map.typing;
  };

  const renderCard = (a, active) => {
    const sb = statusBadge(a.status);
    const t = a.updatedAt?.seconds ? a.updatedAt.seconds * 1000 : 0;
    const secsAgo = Math.max(0, Math.round((now - t) / 1000));
    const timeLabel = secsAgo < 5 ? "just now" : secsAgo < 60 ? `${secsAgo}s ago` : `${Math.round(secsAgo / 60)}m ago`;
    const open = expandedUid === a.uid;'''

NEW_BADGE = '''  const statusBadge = (status, secsAgo) => {
    // Once a card has gone quiet for a while, the last-saved status (e.g. "typing")
    // is no longer trustworthy — the student may have closed the tab, lost connection,
    // or backgrounded the app without our cleanup write ever reaching Firestore.
    if (secsAgo >= PY_ACTIVITY_STALE_MS / 1000) {
      return { l: "💤 Idle", c: "#6b7280" };
    }
    const map = {
      typing: { l: "✍️ Typing", c: "#3b82f6" },
      running: { l: "⏳ Running", c: "#f59e0b" },
      pass: { l: "✅ Passed", c: "#22c55e" },
      fail: { l: "✕ Failed", c: "#ef4444" },
      away: { l: "🚪 Left the page", c: "#6b7280" },
    };
    return map[status] || map.typing;
  };

  const renderCard = (a, active) => {
    const t = a.updatedAt?.seconds ? a.updatedAt.seconds * 1000 : 0;
    const secsAgo = Math.max(0, Math.round((now - t) / 1000));
    const sb = statusBadge(a.status, secsAgo);
    const timeLabel = secsAgo < 5 ? "just now" : secsAgo < 60 ? `${secsAgo}s ago` : `${Math.round(secsAgo / 60)}m ago`;
    const open = expandedUid === a.uid;'''

if '"💤 Idle"' in content:
    steps_skipped.append("2. Idle/staleness fallback already present in admin status badge")
elif OLD_BADGE in content:
    content = content.replace(OLD_BADGE, NEW_BADGE, 1)
    steps_applied.append("2. Admin status badge now falls back to Idle once stale")
else:
    print("❌ FIX 2 FAILED: could not find the exact statusBadge/renderCard block. Aborting — no changes written.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# FIX 3 — Full-bleed photo hero with spotlight lighting
# ══════════════════════════════════════════════════════════════════════════
OLD_HERO = '''function PythonCourseHome({ onStart, user, onJoinClass }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 0 60px" }}>
      {/* Institute header — bold, capital, as required */}
      <div style={{ textAlign: "center", padding: "36px 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 40 }}>
        <h1 style={{ fontSize: "clamp(18px,3.2vw,26px)", fontWeight: 900, letterSpacing: "0.02em", textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1.4 }}>
          ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY AND SCIENCES, ANANTAPUR
        </h1>
        <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700, color: "#FF6A00", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Department of Electronics &amp; Communication Engineering
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(255,106,0,0.12)", border: "1px solid rgba(255,106,0,0.3)", fontSize: 12, fontWeight: 700, color: "#FF6A00", marginBottom: 24 }}>
          🐍 PYTHON CLASSES STARTING SOON
        </div>

        {/* Faculty card — photo is the signature element, kept prominent */}
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: window.innerWidth <= 480 ? 18 : 26, marginBottom: 32 }}>
          <div style={{ position: "relative", flexShrink: 0, margin: "0 auto" }}>
            <div style={{ position: "absolute", inset: -5, borderRadius: 18, background: "linear-gradient(135deg,#FF6A00,#ff9a00)", opacity: 0.4, filter: "blur(14px)" }} />
            <img
              src="/images/khadar-basha.jpg"
              alt="Dr. N. Khadar Basha, Professor, Department of ECE"
              style={{ position: "relative", width: window.innerWidth <= 480 ? 130 : 150, height: window.innerWidth <= 480 ? 147 : 170, borderRadius: 14, objectFit: "cover", objectPosition: "center 20%", border: "2px solid rgba(255,106,0,0.45)", boxShadow: "0 12px 32px rgba(0,0,0,0.5)", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div style={{ textAlign: window.innerWidth <= 480 ? "center" : "left", width: window.innerWidth <= 480 ? "100%" : "auto" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Dr. N. Khadar Basha</div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>Professor, Department of ECE</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.6, maxWidth: 360 }}>
              Anantha Lakshmi Institute of Technology and Sciences, Anantapur
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "clamp(26px,4.5vw,38px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 14, color: "#fff" }}>
          Learn Python Programming<br /><span style={{ background: "linear-gradient(135deg,#FF6A00,#ff9a00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for B.Tech First Years</span>
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
          Complete first-year syllabus — from variables to OOP and file handling — with worked examples and {PY_TOTAL_TESTS}+ runnable practice problems. Code executes right on your phone, no installation needed.
        </p>

        {/* Join / login CTA */}
        {user ? (
          <button onClick={onStart} style={{ padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
            Start Learning →
          </button>
        ) : (
          <div>
            <button onClick={onJoinClass} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
              🔐 Login to Join the Class
            </button>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 10 }}>'''

NEW_HERO = '''function PythonCourseHome({ onStart, user, onJoinClass }) {
  const isMobile = window.innerWidth <= 480;
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 0 60px" }}>

      {/* ── Hero — photo as full-bleed background, text overlaid ── */}
      <div style={{
        position: "relative", width: "100%", minHeight: isMobile ? 560 : 620,
        backgroundImage: "url(/images/khadar-basha.jpg)",
        backgroundSize: "cover", backgroundPosition: "center 18%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        marginBottom: 40, overflow: "hidden",
      }}>
        {/* Spotlight glow centered on the face, warm orange light */}
        <div style={{
          position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
          width: "70%", height: "55%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,154,0,0.35) 0%, rgba(255,106,0,0.12) 45%, transparent 75%)",
          pointerEvents: "none",
        }} />
        {/* Dark vignette from the edges so the photo doesn't fight the header */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center 20%, transparent 30%, rgba(6,6,8,0.55) 75%, rgba(6,6,8,0.85) 100%)",
          pointerEvents: "none",
        }} />
        {/* Strong gradient at the bottom so overlaid text stays legible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(6,6,8,0.55) 0%, rgba(6,6,8,0.15) 30%, rgba(6,6,8,0.4) 65%, rgba(6,6,8,0.96) 100%)",
          pointerEvents: "none",
        }} />

        {/* Institute header — sits over the top of the photo */}
        <div style={{ position: "relative", textAlign: "center", padding: "32px 20px 0" }}>
          <h1 style={{
            fontSize: "clamp(17px,3vw,25px)", fontWeight: 900, letterSpacing: "0.02em",
            textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1.4,
            textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.9)",
          }}>
            ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY AND SCIENCES, ANANTAPUR
          </h1>
          <div style={{
            marginTop: 8, fontSize: 12.5, fontWeight: 700, color: "#ffb066",
            letterSpacing: "0.08em", textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}>
            Department of Electronics &amp; Communication Engineering
          </div>
        </div>

        {/* Name + CTA — sits over the bottom of the photo, in the dark gradient zone */}
        <div style={{ position: "relative", padding: "0 20px 28px", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px",
            borderRadius: 100, background: "rgba(255,106,0,0.22)", border: "1px solid rgba(255,154,0,0.5)",
            fontSize: 12, fontWeight: 700, color: "#ffb066", marginBottom: 14,
            backdropFilter: "blur(4px)",
          }}>
            🐍 PYTHON CLASSES STARTING SOON
          </div>
          <div style={{ fontSize: isMobile ? 21 : 26, fontWeight: 900, color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}>
            Dr. N. Khadar Basha
          </div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", marginTop: 3, textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>
            Professor, Department of ECE
          </div>
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,38px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 14, color: "#fff" }}>
          Learn Python Programming<br /><span style={{ background: "linear-gradient(135deg,#FF6A00,#ff9a00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for B.Tech First Years</span>
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
          Complete first-year syllabus — from variables to OOP and file handling — with worked examples and {PY_TOTAL_TESTS}+ runnable practice problems. Code executes right on your phone, no installation needed.
        </p>

        {/* Join / login CTA */}
        {user ? (
          <button onClick={onStart} style={{ padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
            Start Learning →
          </button>
        ) : (
          <div>
            <button onClick={onJoinClass} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#FF6A00,#ff9a00)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,106,0,0.35)" }}>
              🔐 Login to Join the Class
            </button>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 10 }}>'''

if "backgroundImage: \"url(/images/khadar-basha.jpg)\"" in content:
    steps_skipped.append("3. Full-bleed photo hero already present")
elif OLD_HERO in content:
    content = content.replace(OLD_HERO, NEW_HERO, 1)
    steps_applied.append("3. Replaced faculty card with full-bleed photo hero (spotlight lighting, overlaid text)")
else:
    print("❌ FIX 3 FAILED: could not find the exact current hero section to replace.")
    print("   This usually means fix_faculty_photo_size.py wasn't run first, or the file was hand-edited.")
    print("   Aborting — no changes written.")
    sys.exit(1)


# ══════════════════════════════════════════════════════════════════════════
# Write back
# ══════════════════════════════════════════════════════════════════════════
with open(FILE, "w") as f:
    f.write(content)

print("=" * 70)
print(f"{FILE}: {original_length} → {len(content)} chars")
print("=" * 70)
if steps_applied:
    print("\n✅ APPLIED:")
    for s in steps_applied:
        print(f"   {s}")
if steps_skipped:
    print("\n⏭️  SKIPPED (already applied):")
    for s in steps_skipped:
        print(f"   {s}")

print("\nNext steps:")
print("  1. npm run build")
print("  2. If clean: git add -A && git commit -m 'Fix stale activity status + full-bleed photo hero' && git push")
print("  3. Check the Admin -> Python Activity tab: close a test student's tab, wait ~30s,")
print("     the card should switch from 'Typing' to 'Idle' (or 'Left the page' if the browser")
print("     managed to send the close signal in time)")
print("  4. Check the Python course home page (logged out) — photo should now be a full-bleed")
print("     background behind the header/name/login button, with a warm glow over your face")
