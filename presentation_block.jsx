// ─── LIVE PRESENTATION SYSTEM ────────────────────────────────────────────────
// Firestore doc: presentation/live
// Fields: slideUrl, currentSlide, isLive, totalSlides, updatedAt
// Firestore collection: presentation_exits/{uid} — exit alerts for admin

// ── Helper: convert any Google Slides URL to embed URL ───────────────────────
function convertToEmbedUrl(url, slide = 1) {
  const match = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&slide=${slide}`;
}

function extractSlideId(url) {
  const match = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// ── Admin: Presentation Control Panel (inside Admin tab) ─────────────────────
function PresentationAdminPanel({ fbUser }) {
  const [slideUrl, setSlideUrl] = useState('');
  const [totalSlides, setTotalSlides] = useState(10);
  const [liveData, setLiveData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [exits, setExits] = useState([]);

  // Listen to live presentation state
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'presentation', 'live'), snap => {
      if (snap.exists()) setLiveData(snap.data());
      else setLiveData(null);
    });
    return unsub;
  }, []);

  // Listen to exit alerts
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'presentation_exits'), snap => {
      const newExits = [];
      snap.forEach(d => newExits.push({ id: d.id, ...d.data() }));
      newExits.sort((a, b) => (b.exitedAt?.seconds || 0) - (a.exitedAt?.seconds || 0));
      setExits(newExits);
    });
    return unsub;
  }, []);

  const startPresentation = async () => {
    if (!slideUrl.trim()) return;
    const embedBase = convertToEmbedUrl(slideUrl.trim(), 1);
    if (!embedBase) { alert('Invalid Google Slides URL. Please paste the sharing link from Google Slides.'); return; }
    setSaving(true);
    try {
      await setDoc(doc(db, 'presentation', 'live'), {
        slideUrl: slideUrl.trim(),
        embedBase,
        currentSlide: 1,
        totalSlides: totalSlides,
        isLive: true,
        startedBy: fbUser?.email,
        updatedAt: serverTimestamp(),
      });
    } finally { setSaving(false); }
  };

  const changeSlide = async (n) => {
    if (!liveData) return;
    const newSlide = Math.max(1, Math.min(liveData.totalSlides, n));
    const embedBase = convertToEmbedUrl(liveData.slideUrl, newSlide);
    await setDoc(doc(db, 'presentation', 'live'), {
      ...liveData,
      currentSlide: newSlide,
      embedBase,
      updatedAt: serverTimestamp(),
    });
  };

  const endPresentation = async () => {
    if (!window.confirm('End presentation for all users?')) return;
    await setDoc(doc(db, 'presentation', 'live'), {
      isLive: false,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  };

  const clearExits = async () => {
    for (const exit of exits) {
      await deleteDoc(doc(db, 'presentation_exits', exit.id)).catch(() => {});
    }
    setExits([]);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h3 style={{ fontWeight: 900, marginBottom: 4 }}>📽️ Live Presentation</h3>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>
        Paste a Google Slides sharing URL. All users on the Python course home page will see your slides live.
      </p>

      {/* Setup panel */}
      {(!liveData?.isLive) && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>GOOGLE SLIDES URL</label>
          <input
            value={slideUrl}
            onChange={e => setSlideUrl(e.target.value)}
            placeholder="https://docs.google.com/presentation/d/YOUR_ID/edit?usp=sharing"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.15)', background: '#111', color: '#fff', fontSize: 13, boxSizing: 'border-box', marginBottom: 12 }}
          />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>TOTAL SLIDES</label>
            <input
              type="number" min="1" max="200"
              value={totalSlides}
              onChange={e => setTotalSlides(parseInt(e.target.value) || 10)}
              style={{ width: 70, padding: '8px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.15)', background: '#111', color: '#fff', fontSize: 13 }}
            />
          </div>
          <button
            onClick={startPresentation}
            disabled={saving || !slideUrl.trim()}
            style={{ padding: '10px 24px', borderRadius: 9, border: 'none', background: 'linear-gradient(90deg,#FF6A00,#ff9a00)', color: '#fff', fontWeight: 800, fontSize: 13, cursor: saving || !slideUrl.trim() ? 'default' : 'pointer', opacity: saving || !slideUrl.trim() ? 0.5 : 1 }}
          >
            {saving ? 'Starting...' : '▶ Start Live Presentation'}
          </button>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
            Make sure your Google Slides is set to "Anyone with the link can view" before starting.
          </p>
        </div>
      )}

      {/* Live control panel */}
      {liveData?.isLive && (
        <div style={{ background: 'rgba(255,106,0,0.08)', border: '1px solid rgba(255,106,0,0.3)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
            <span style={{ fontWeight: 800, color: '#FF6A00' }}>LIVE — Slide {liveData.currentSlide} of {liveData.totalSlides}</span>
          </div>

          {/* Slide controls */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <button onClick={() => changeSlide(1)} style={btnStyle}>⏮ First</button>
            <button onClick={() => changeSlide(liveData.currentSlide - 1)} disabled={liveData.currentSlide <= 1} style={btnStyle(liveData.currentSlide <= 1)}>◀ Prev</button>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', minWidth: 60, textAlign: 'center' }}>{liveData.currentSlide} / {liveData.totalSlides}</span>
            <button onClick={() => changeSlide(liveData.currentSlide + 1)} disabled={liveData.currentSlide >= liveData.totalSlides} style={btnStyle(liveData.currentSlide >= liveData.totalSlides)}>Next ▶</button>
            <button onClick={() => changeSlide(liveData.totalSlides)} style={btnStyle}>Last ⏭</button>
          </div>

          {/* Jump to slide */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Jump to slide:</span>
            {Array.from({ length: Math.min(liveData.totalSlides, 20) }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => changeSlide(n)} style={{
                width: 28, height: 28, borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                background: liveData.currentSlide === n ? '#FF6A00' : 'rgba(255,255,255,0.08)',
                color: liveData.currentSlide === n ? '#fff' : 'rgba(255,255,255,0.5)',
              }}>{n}</button>
            ))}
            {liveData.totalSlides > 20 && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>+{liveData.totalSlides - 20} more</span>}
          </div>

          <button onClick={endPresentation} style={{ padding: '8px 20px', borderRadius: 9, border: '1px solid #ef4444', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            ⏹ End Presentation
          </button>
        </div>
      )}

      {/* Exit alerts */}
      {exits.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h4 style={{ fontWeight: 800, margin: 0, color: '#f59e0b' }}>⚠️ Students Who Exited Fullscreen ({exits.length})</h4>
            <button onClick={clearExits} style={{ fontSize: 11, color: '#888', background: 'none', border: '1px solid #333', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Clear All</button>
          </div>
          {exits.map(exit => {
            const time = exit.exitedAt?.seconds ? new Date(exit.exitedAt.seconds * 1000).toLocaleTimeString() : 'unknown';
            return (
              <div key={exit.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', marginBottom: 6, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 9 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#f59e0b', fontSize: 14, flexShrink: 0 }}>
                  {(exit.name || exit.email || '?')[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{exit.name || 'Unknown'}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{exit.email}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>Exited at slide {exit.slideAt}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{time}</div>
                </div>
                <button onClick={() => deleteDoc(doc(db, 'presentation_exits', exit.id))} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>×</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Helper style for slide control buttons
function btnStyle(disabled = false) {
  return {
    padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.06)', color: disabled ? 'rgba(255,255,255,0.2)' : '#fff',
    fontWeight: 700, fontSize: 12, cursor: disabled ? 'default' : 'pointer',
  };
}

// ── Student: Full-screen presentation viewer ──────────────────────────────────
function PresentationViewer({ user, onClose }) {
  const [liveData, setLiveData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const hasReportedExit = useRef(false);

  // Listen to live slide changes
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'presentation', 'live'), snap => {
      if (snap.exists()) setLiveData(snap.data());
    });
    return unsub;
  }, []);

  // Enter fullscreen on mount
  useEffect(() => {
    const el = containerRef.current;
    if (el?.requestFullscreen) el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }, []);

  // Detect fullscreen exit
  useEffect(() => {
    const handleFSChange = () => {
      const inFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(inFS);
      if (!inFS && !hasReportedExit.current && user && liveData) {
        hasReportedExit.current = true;
        // Report exit to Firestore → triggers admin alert
        setDoc(doc(db, 'presentation_exits', user.uid), {
          uid: user.uid,
          name: user.name || user.displayName || 'Unknown',
          email: user.email || 'unknown',
          slideAt: liveData.currentSlide,
          exitedAt: serverTimestamp(),
        }, { merge: true }).catch(() => {});
      }
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);
    };
  }, [user, liveData]);

  if (!liveData?.isLive) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📽️</div>
        <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Presentation has ended</div>
        <button onClick={onClose} style={{ marginTop: 24, padding: '10px 28px', borderRadius: 10, border: 'none', background: '#FF6A00', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Back to Course</button>
      </div>
    );
  }

  const embedUrl = liveData.embedBase || convertToEmbedUrl(liveData.slideUrl, liveData.currentSlide);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      {/* Viewer header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Live — Slide {liveData.currentSlide} of {liveData.totalSlides}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!isFullscreen && (
            <button
              onClick={() => {
                const el = containerRef.current;
                if (el?.requestFullscreen) el.requestFullscreen();
                else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
              }}
              style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
            >⛶ Fullscreen</button>
          )}
          <button onClick={onClose} style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>✕ Exit</button>
        </div>
      </div>

      {/* Slide iframe — student cannot control navigation */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <iframe
          key={`${liveData.currentSlide}-${embedUrl}`}
          src={embedUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
          title="Live Presentation"
        />
        {/* Overlay to block iframe clicks (prevents student navigation) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'not-allowed' }}
          onContextMenu={e => e.preventDefault()}
        />
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg,#FF6A00,#ff9a00)', width: `${(liveData.currentSlide / liveData.totalSlides) * 100}%`, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

// ── Course home: Live Presentation Banner ─────────────────────────────────────
function PresentationBanner({ user, onJoin }) {
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'presentation', 'live'), snap => {
      if (snap.exists() && snap.data().isLive) setLiveData(snap.data());
      else setLiveData(null);
    });
    return unsub;
  }, []);

  if (!liveData) return null;

  return (
    <div style={{ margin: '16px 20px 0', padding: '14px 18px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(255,106,0,0.15), rgba(255,154,0,0.08))', border: '1px solid rgba(255,106,0,0.35)', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0, boxShadow: '0 0 8px #22c55e' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, color: '#FF6A00', fontSize: 13 }}>📽️ Live Class in Progress — Slide {liveData.currentSlide}/{liveData.totalSlides}</div>
        <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Your teacher is presenting now. Join to follow along.</div>
      </div>
      {user ? (
        <button onClick={onJoin} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: 'linear-gradient(90deg,#FF6A00,#ff9a00)', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>
          Join Live ▶
        </button>
      ) : (
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Login to join</span>
      )}
    </div>
  );
}
