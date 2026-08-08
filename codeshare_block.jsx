// ─── LIVE CODE SHARE SYSTEM ──────────────────────────────────────────────────
// Firestore doc: code_share/live
// Fields: uid, name, email, code, topicTitle, unitTitle, isSharing, sharedBy, updatedAt
//
// Flow:
//   Admin: clicks "Share" on any student in Python Activity tab
//         → writes student's current code to code_share/live with isSharing=true
//         → all viewers get a floating overlay showing that code live
//         → every time student's python_activity doc updates, code_share/live auto-syncs
//   Stop: admin clicks "Stop Sharing" → isSharing=false → overlay disappears for all

// ── Admin: Share button inside Python Activity student card ───────────────────
// (injected into the existing renderCard function)
function ShareCodeButton({ student, isCurrentlyShared, fbUser }) {
  const [loading, setLoading] = useState(false);

  const startSharing = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'code_share', 'live'), {
        uid: student.uid,
        name: student.name || student.email || 'Student',
        email: student.email || '',
        code: student.code || '# No code yet',
        topicTitle: student.topicTitle || '',
        unitTitle: student.unitTitle || '',
        isSharing: true,
        sharedBy: fbUser?.email,
        startedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } finally { setLoading(false); }
  };

  const stopSharing = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'code_share', 'live'), {
        isSharing: false,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } finally { setLoading(false); }
  };

  if (isCurrentlyShared) {
    return (
      <button
        onClick={stopSharing}
        disabled={loading}
        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, border: '1px solid #ef4444', background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
        {loading ? 'Stopping...' : 'Stop Sharing'}
      </button>
    );
  }

  return (
    <button
      onClick={startSharing}
      disabled={loading}
      style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, border: '1px solid rgba(255,106,0,0.4)', background: 'rgba(255,106,0,0.08)', color: '#FF6A00', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
    >
      📡 {loading ? 'Sharing...' : 'Share Screen'}
    </button>
  );
}

// ── Admin: sync watcher — keeps code_share/live in sync with student activity ──
// When admin shares a student, we watch that student's python_activity doc
// and push updates to code_share/live every time the student types
function useCodeShareSync(sharedUid, isSharing) {
  useEffect(() => {
    if (!sharedUid || !isSharing) return;
    // Watch the student's python_activity doc
    const unsub = onSnapshot(doc(db, 'python_activity', sharedUid), async (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      // Push their latest code to code_share/live
      await setDoc(doc(db, 'code_share', 'live'), {
        code: data.code || '# No code yet',
        topicTitle: data.topicTitle || '',
        unitTitle: data.unitTitle || '',
        status: data.status || 'typing',
        updatedAt: serverTimestamp(),
      }, { merge: true }).catch(() => {});
    });
    return unsub;
  }, [sharedUid, isSharing]);
}

// ── Student: Floating code overlay ────────────────────────────────────────────
function LiveCodeOverlay({ currentUser }) {
  const [shareData, setShareData] = useState(null);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'code_share', 'live'), snap => {
      if (snap.exists() && snap.data().isSharing) {
        const data = snap.data();
        // Don't show overlay to the student whose code is being shared
        if (data.uid === currentUser?.uid) return;
        setShareData(data);
      } else {
        setShareData(null);
      }
    });
    return unsub;
  }, [currentUser]);

  if (!shareData) return null;

  const lines = (shareData.code || '').split('\n');

  if (minimized) {
    return (
      <div
        onClick={() => setMinimized(false)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 8000,
          background: 'linear-gradient(135deg,#1a1a2e,#16213e)',
          border: '2px solid #FF6A00', borderRadius: 12,
          padding: '10px 16px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
        <span style={{ color: '#FF6A00', fontWeight: 800, fontSize: 12 }}>📡 Live: {shareData.name}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>▲ expand</span>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 8000,
      width: 'min(520px, calc(100vw - 40px))',
      maxHeight: '70vh',
      background: '#0d0d0f',
      border: '2px solid #FF6A00',
      borderRadius: 14,
      boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,106,0,0.2)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px',
        background: 'linear-gradient(135deg,rgba(255,106,0,0.15),rgba(255,154,0,0.05))',
        borderBottom: '1px solid rgba(255,106,0,0.2)',
        flexShrink: 0,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 12, color: '#FF6A00' }}>
            📡 Live Code — {shareData.name}
          </div>
          {shareData.topicTitle && (
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
              {shareData.unitTitle} → {shareData.topicTitle}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(shareData.code || '').catch(() => {});
            }}
            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 10, cursor: 'pointer', fontWeight: 600 }}
          >Copy</button>
          <button
            onClick={() => setMinimized(true)}
            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 10, cursor: 'pointer', fontWeight: 600 }}
          >▼ Min</button>
        </div>
      </div>

      {/* Code display — read only, syntax highlighted with line numbers */}
      <div style={{ flex: 1, overflow: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Menlo,Consolas,monospace', fontSize: 13, lineHeight: 1.6 }}>
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <td style={{ padding: '0 10px', color: 'rgba(255,255,255,0.2)', fontSize: 11, userSelect: 'none', textAlign: 'right', minWidth: 36, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  {i + 1}
                </td>
                <td style={{ padding: '0 14px', color: '#e5e5e5', whiteSpace: 'pre', overflow: 'visible' }}>
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer — live indicator */}
      <div style={{
        padding: '6px 14px',
        background: 'rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: 6,
        flexShrink: 0,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)' }}>
          Live — updates as {shareData.name} types · {lines.length} lines
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Read only</span>
      </div>
    </div>
  );
}
