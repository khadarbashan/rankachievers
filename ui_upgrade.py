#!/usr/bin/env python3
"""
Rank Achievers — Premium UI Upgrade
Glassmorphism + Dark Mode + Smooth Animations
Run from: ~/Downloads/rankachievers/
"""

with open("src/App.jsx", "r") as f:
    c = f.read()

# ═══════════════════════════════════════════════════════════════
# 1. FIND AND REPLACE GLOBAL CSS BLOCK
# ═══════════════════════════════════════════════════════════════

# Find the existing CSS injection
css_start = c.find("const _heroStyle = document.createElement")
css_end   = c.find("if(!document.getElementById(\"ra-hero-css\")) document.head.appendChild(_heroStyle);")
css_end   += len("if(!document.getElementById(\"ra-hero-css\")) document.head.appendChild(_heroStyle);")

NEW_CSS = '''const _heroStyle = document.createElement("style");
_heroStyle.id = "ra-hero-css";
_heroStyle.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

  /* ══════════════════════════════════════
     DESIGN TOKENS
  ══════════════════════════════════════ */
  :root {
    --ra-orange:       #FF6A00;
    --ra-orange-light: #ff9a00;
    --ra-orange-glow:  rgba(255,106,0,0.3);
    --ra-orange-glass: rgba(255,106,0,0.12);

    /* Glass */
    --glass-bg:        rgba(255,255,255,0.06);
    --glass-bg-hover:  rgba(255,255,255,0.10);
    --glass-border:    rgba(255,255,255,0.10);
    --glass-border-hover: rgba(255,106,0,0.35);
    --glass-blur:      20px;
    --glass-shadow:    0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);

    /* Dark surface */
    --surface-0: #060608;
    --surface-1: rgba(255,255,255,0.04);
    --surface-2: rgba(255,255,255,0.07);
    --surface-3: rgba(255,255,255,0.10);

    /* Text */
    --text-1: #ffffff;
    --text-2: rgba(255,255,255,0.65);
    --text-3: rgba(255,255,255,0.35);
    --text-4: rgba(255,255,255,0.18);

    /* Border */
    --border-1: rgba(255,255,255,0.08);
    --border-2: rgba(255,255,255,0.14);

    /* Radius */
    --r-sm: 10px;
    --r-md: 16px;
    --r-lg: 22px;
    --r-xl: 28px;

    /* Font */
    --font: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;

    /* Transitions */
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ══════════════════════════════════════
     BASE
  ══════════════════════════════════════ */
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: var(--font) !important;
  }

  body {
    background: var(--surface-0) !important;
    color: var(--text-1) !important;
    -webkit-font-smoothing: antialiased;
  }

  /* ══════════════════════════════════════
     KEYFRAMES
  ══════════════════════════════════════ */
  @keyframes raFadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raFadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes raSlideIn   { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
  @keyframes raSlideRight{ from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
  @keyframes raSlideUp   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes raPop       { 0%{opacity:0;transform:scale(0.88)} 70%{transform:scale(1.03)} 100%{opacity:1;transform:scale(1)} }
  @keyframes raOrb       { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(24px,-18px) scale(1.06)} 66%{transform:translate(-12px,12px) scale(0.96)} }
  @keyframes raSpin      { to{transform:rotate(360deg)} }
  @keyframes raPulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(255,106,0,.5)} 50%{box-shadow:0 0 0 14px rgba(255,106,0,0)} }
  @keyframes raDrift     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes raBlink     { 0%,49%{opacity:1} 50%,99%{opacity:0} }
  @keyframes raProgress  { from{width:0} to{width:var(--pct)} }
  @keyframes raTicker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes raGlow      { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes raBnav      { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes raShimmer   { from{background-position:-200% 0} to{background-position:200% 0} }
  @keyframes firePulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
  @keyframes ringFill    { from{stroke-dasharray:0 1000} }
  @keyframes countUp     { from{opacity:0;transform:translateY(8px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes liveDot     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(0.85)} }
  @keyframes gradShift   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

  /* ══════════════════════════════════════
     GLASSMORPHISM SYSTEM
  ══════════════════════════════════════ */
  .glass {
    background: var(--glass-bg) !important;
    backdrop-filter: blur(var(--glass-blur)) saturate(180%) !important;
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%) !important;
    border: 1px solid var(--glass-border) !important;
    box-shadow: var(--glass-shadow) !important;
  }

  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: var(--r-lg);
    box-shadow: var(--glass-shadow);
    transition: all 0.3s var(--ease);
    position: relative;
    overflow: hidden;
  }

  .glass-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .glass-card:hover {
    background: var(--glass-bg-hover);
    border-color: var(--glass-border-hover);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,106,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12);
    transform: translateY(-4px);
  }

  /* Gradient border glow */
  .glow-border {
    position: relative;
  }
  .glow-border::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(135deg, #FF6A00, #ff9a00, rgba(255,106,0,0));
    opacity: 0;
    transition: opacity 0.3s var(--ease);
    z-index: -1;
  }
  .glow-border:hover::after { opacity: 1; }

  /* ══════════════════════════════════════
     BUTTONS
  ══════════════════════════════════════ */
  .btn-primary {
    background: linear-gradient(135deg, #FF6A00, #ff9a00) !important;
    color: #fff !important;
    border: none !important;
    border-radius: var(--r-md) !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    position: relative;
    overflow: hidden;
    transition: all 0.25s var(--ease) !important;
    box-shadow: 0 4px 20px rgba(255,106,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2) !important;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn-primary:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 32px rgba(255,106,0,0.55) !important;
  }
  .btn-primary:hover::after { opacity: 1; }
  .btn-primary:active { transform: scale(0.97) !important; }

  .btn-ghost {
    background: var(--surface-1) !important;
    color: var(--text-2) !important;
    border: 1px solid var(--border-1) !important;
    border-radius: var(--r-sm) !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    transition: all 0.2s var(--ease) !important;
  }
  .btn-ghost:hover {
    background: var(--surface-2) !important;
    border-color: var(--border-2) !important;
    color: var(--text-1) !important;
    transform: translateY(-1px) !important;
  }

  /* ══════════════════════════════════════
     EXAM CARDS (TestsPage)
  ══════════════════════════════════════ */
  .ra-test-card {
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--r-lg);
    transition: all 0.3s var(--ease);
    position: relative;
    overflow: hidden;
  }
  .ra-test-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  }
  .ra-test-card:hover {
    background: var(--surface-2);
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.4);
  }

  /* ══════════════════════════════════════
     TOPIC FILTER PILLS
  ══════════════════════════════════════ */
  .topic-pill {
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--border-1);
    background: var(--surface-1);
    color: var(--text-3);
    transition: all 0.2s var(--ease);
    white-space: nowrap;
  }
  .topic-pill:hover {
    background: var(--surface-2);
    color: var(--text-2);
    border-color: var(--border-2);
    transform: translateY(-1px);
  }
  .topic-pill.active {
    color: #fff;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(0,0,0,0.3);
  }

  /* ══════════════════════════════════════
     NAVBAR — Glassmorphism
  ══════════════════════════════════════ */
  .ra-navbar {
    backdrop-filter: blur(24px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(24px) saturate(200%) !important;
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
    transition: all 0.3s var(--ease) !important;
  }
  .ra-navbar.scrolled {
    background: rgba(6,6,8,0.92) !important;
    border-bottom-color: rgba(255,106,0,0.2) !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
  }

  /* ══════════════════════════════════════
     BOTTOM NAV
  ══════════════════════════════════════ */
  .ra-bnav {
    animation: raBnav .4s var(--ease-bounce) both;
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
  }
  .ra-bnav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 8px 10px 6px;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s var(--ease-bounce);
    flex: 1;
    border: none;
    background: none;
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }
  .ra-bnav-item:active { transform: scale(0.88); }
  .ra-bnav-item.active .ra-bnav-icon { transform: translateY(-3px); filter: drop-shadow(0 0 8px var(--ra-orange)); }
  .ra-bnav-item.active .ra-bnav-label { color: var(--ra-orange); font-weight: 700; }
  .ra-bnav-icon { font-size: 22px; transition: all 0.25s var(--ease-bounce); color: rgba(255,255,255,0.35); }
  .ra-bnav-label { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.35); transition: color 0.2s; }
  .ra-bnav-dot { position: absolute; top: 5px; right: 8px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid var(--surface-0); animation: raPulseRing 2s ease-in-out infinite; }
  .ra-bnav-pip { position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 18px; height: 2.5px; border-radius: 2px; background: var(--ra-orange); opacity: 0; transition: opacity 0.2s; box-shadow: 0 0 8px var(--ra-orange); }
  .ra-bnav-item.active .ra-bnav-pip { opacity: 1; }

  /* ══════════════════════════════════════
     STEP CARDS (hero animation)
  ══════════════════════════════════════ */
  .ra-step-card {
    transition: all 0.35s var(--ease) !important;
    backdrop-filter: blur(12px);
  }
  .ra-step-card:hover { transform: scale(1.01) translateY(-2px) !important; }
  .ra-chip { transition: all 0.2s var(--ease) !important; cursor: pointer; }
  .ra-chip:hover { transform: translateY(-2px) !important; box-shadow: 0 4px 16px rgba(255,106,0,0.3) !important; }

  /* ══════════════════════════════════════
     HOME EXAM CARDS
  ══════════════════════════════════════ */
  .ra-home-exam-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--r-lg);
    padding: 22px;
    cursor: pointer;
    transition: all 0.35s var(--ease);
    border: 1px solid var(--border-1);
    background: var(--surface-1);
    backdrop-filter: blur(12px);
  }
  .ra-home-exam-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.35s var(--ease);
    background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,106,0,0.14), transparent 60%);
  }
  .ra-home-exam-card:hover::before { opacity: 1; }
  .ra-home-exam-card:hover {
    transform: translateY(-6px);
    border-color: rgba(255,106,0,0.35);
    box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,106,0,0.18), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .ra-home-exam-card.selected {
    border-color: var(--card-color, #FF6A00) !important;
    box-shadow: 0 0 0 1px var(--card-color, #FF6A00), 0 20px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12) !important;
  }

  /* ══════════════════════════════════════
     STAT PILLS
  ══════════════════════════════════════ */
  .ra-stat-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: var(--r-md);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    transition: all 0.3s var(--ease);
    animation: raFadeUp 0.6s var(--ease) both;
  }
  .ra-stat-pill:hover {
    background: var(--surface-2);
    border-color: rgba(255,106,0,0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  /* ══════════════════════════════════════
     FEATURE CHIPS
  ══════════════════════════════════════ */
  .ra-feature-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px;
    border-radius: 100px;
    border: 1px solid var(--border-1);
    background: var(--surface-1);
    font-size: 12px;
    font-weight: 600;
    color: var(--text-3);
    cursor: default;
    transition: all 0.25s var(--ease);
    white-space: nowrap;
    backdrop-filter: blur(8px);
  }
  .ra-feature-chip:hover {
    border-color: rgba(255,106,0,0.4);
    background: var(--ra-orange-glass);
    color: var(--ra-orange);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(255,106,0,0.2);
  }

  /* ══════════════════════════════════════
     GRADIENT TEXT
  ══════════════════════════════════════ */
  .ra-gradient-text {
    background: linear-gradient(135deg, #FF6A00, #ff9a00, #ffcc00);
    background-size: 200% 200%;
    animation: gradShift 4s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ra-mesh-bg {
    background: linear-gradient(135deg, #FF6A00, #ff4500, #1d4ed8, #FF6A00);
    background-size: 400% 400%;
    animation: gradShift 8s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ══════════════════════════════════════
     HERO BADGE
  ══════════════════════════════════════ */
  .ra-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    border-radius: 100px;
    background: rgba(255,106,0,0.12);
    border: 1px solid rgba(255,106,0,0.3);
    font-size: 12px;
    font-weight: 700;
    color: var(--ra-orange);
    letter-spacing: 0.05em;
    animation: raFadeUp 0.5s var(--ease) 0.1s both;
    backdrop-filter: blur(8px);
  }
  .ra-live-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
    animation: liveDot 1.5s ease-in-out infinite;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
  }

  /* ══════════════════════════════════════
     CTA BUTTON
  ══════════════════════════════════════ */
  .ra-cta-primary {
    width: 100%;
    padding: 17px 0;
    border-radius: var(--r-lg);
    border: none;
    background: linear-gradient(135deg, #FF6A00 0%, #ff8c00 50%, #ff9a00 100%);
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    letter-spacing: -0.2px;
    transition: all 0.3s var(--ease-bounce);
    box-shadow: 0 8px 32px rgba(255,106,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25);
  }
  .ra-cta-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s var(--ease);
  }
  .ra-cta-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(255,106,0,0.6);
  }
  .ra-cta-primary:hover::before { left: 100%; }
  .ra-cta-primary:active { transform: scale(0.97); }

  /* ══════════════════════════════════════
     TICKER
  ══════════════════════════════════════ */
  .ra-ticker-wrap { overflow: hidden; width: 100%; }
  .ra-ticker { display: flex; gap: 40px; animation: raTicker 30s linear infinite; width: max-content; }
  .ra-ticker:hover { animation-play-state: paused; }

  /* ══════════════════════════════════════
     SHIMMER LOADING
  ══════════════════════════════════════ */
  .ra-shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.09) 50%, rgba(255,255,255,.04) 75%);
    background-size: 200% 100%;
    animation: raShimmer 1.8s infinite;
  }

  /* ══════════════════════════════════════
     DARK MODE INPUT
  ══════════════════════════════════════ */
  .ra-input {
    width: 100%;
    padding: 13px 16px;
    border-radius: var(--r-md);
    border: 1.5px solid var(--border-1);
    background: var(--surface-1);
    color: var(--text-1);
    font-size: 14px;
    outline: none;
    transition: all 0.2s var(--ease);
    box-sizing: border-box;
    backdrop-filter: blur(8px);
  }
  .ra-input:focus {
    border-color: var(--ra-orange);
    background: var(--ra-orange-glass);
    box-shadow: 0 0 0 3px rgba(255,106,0,0.15);
  }
  .ra-input::placeholder { color: var(--text-4); }

  /* ══════════════════════════════════════
     MODAL BACKDROP
  ══════════════════════════════════════ */
  .ra-modal-backdrop {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px) saturate(150%);
    -webkit-backdrop-filter: blur(8px) saturate(150%);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: raFadeIn 0.2s var(--ease);
  }
  .ra-modal-card {
    background: rgba(14,14,18,0.95);
    backdrop-filter: blur(32px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--r-xl);
    box-shadow: 0 40px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,106,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08);
    animation: raPop 0.3s var(--ease-bounce) both;
  }

  /* ══════════════════════════════════════
     SCORE RING
  ══════════════════════════════════════ */
  @keyframes ringFill { from{stroke-dasharray:0 1000} }

  /* ══════════════════════════════════════
     SCROLLBAR
  ══════════════════════════════════════ */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,106,0,0.4); }

  /* ══════════════════════════════════════
     SELECTION
  ══════════════════════════════════════ */
  ::selection { background: rgba(255,106,0,0.3); color: #fff; }

  /* ══════════════════════════════════════
     PAGE TRANSITIONS
  ══════════════════════════════════════ */
  .ra-page-enter  { animation: raFadeUp 0.3s var(--ease) both; }
  .ra-page-exit   { animation: raFadeIn 0.15s var(--ease) reverse both; }

  /* ══════════════════════════════════════
     MOBILE SAFE AREA
  ══════════════════════════════════════ */
  .ra-mobile-pb { padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px)) !important; }

  /* ══════════════════════════════════════
     ORBS
  ══════════════════════════════════════ */
  .ra-orb   { animation: raOrb 12s ease-in-out infinite; }
  .ra-orb-2 { animation: raOrb 18s ease-in-out infinite reverse; }

  /* ══════════════════════════════════════
     NOTIFICATION BADGE
  ══════════════════════════════════════ */
  .ra-notif-badge { animation: raPulseRing 2s ease-in-out infinite; }

  /* ══════════════════════════════════════
     ADMIN DARK INPUTS
  ══════════════════════════════════════ */
  .ra-admin input, .ra-admin textarea, .ra-admin select {
    background: rgba(255,255,255,0.06) !important;
    border-color: rgba(255,255,255,0.1) !important;
    color: #fff !important;
    border-radius: 10px !important;
  }
  .ra-admin input:focus, .ra-admin textarea:focus, .ra-admin select:focus {
    border-color: #FF6A00 !important;
    background: rgba(255,106,0,0.08) !important;
    outline: none !important;
    box-shadow: 0 0 0 3px rgba(255,106,0,0.15) !important;
  }
  .ra-admin input::placeholder, .ra-admin textarea::placeholder { color: rgba(255,255,255,0.25) !important; }

  /* ══════════════════════════════════════
     LEADERBOARD
  ══════════════════════════════════════ */
  .ra-leader-row {
    transition: all 0.2s var(--ease);
    border-bottom: 1px solid var(--border-1);
  }
  .ra-leader-row:hover {
    background: var(--ra-orange-glass) !important;
  }

  /* ══════════════════════════════════════
     DASHBOARD CARDS
  ══════════════════════════════════════ */
  .ra-dash-card {
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--r-lg);
    transition: all 0.3s var(--ease);
  }
  .ra-dash-card:hover {
    background: var(--surface-2);
    border-color: var(--border-2);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  }

  /* ══════════════════════════════════════
     FIRE PULSE (streak)
  ══════════════════════════════════════ */
  @keyframes firePulse { 0%,100%{transform:scale(1);filter:brightness(1)} 50%{transform:scale(1.18);filter:brightness(1.3)} }

  /* ══════════════════════════════════════
     FOCUS VISIBLE
  ══════════════════════════════════════ */
  :focus-visible {
    outline: 2px solid var(--ra-orange);
    outline-offset: 2px;
    border-radius: 6px;
  }
`;
if(!document.getElementById("ra-hero-css")) document.head.appendChild(_heroStyle);'''

if css_start > 0 and css_end > 0:
    c = c[:css_start] + NEW_CSS + c[css_end:]
    print("✅ 1. Global CSS fully replaced with premium system")
else:
    print("❌ CSS block not found")

# ═══════════════════════════════════════════════════════════════
# 2. UPGRADE ENHANCEMENT CSS (streak, glass animations)
# ═══════════════════════════════════════════════════════════════
old_enh = '''const _enhStyle=document.createElement("style");
_enhStyle.id="ra-enh-css";
_enhStyle.textContent=`
  @keyframes firePulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
  @keyframes glassShimmer { from{background-position:-200% 0} to{background-position:200% 0} }
  @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ringFill { from{stroke-dasharray:0 1000} }
  .glass-hover:hover {
    background: rgba(255,255,255,0.09) !important;
    border-color: rgba(255,106,0,0.3) !important;
    transform: translateY(-2px);
    transition: all .25s ease !important;
  }
  .page-fade { animation: raFadeUp .3s ease both; }
`;
if(!document.getElementById("ra-enh-css")) document.head.appendChild(_enhStyle);'''

new_enh = '''// Enhancement CSS now merged into main CSS above'''

if old_enh in c:
    c = c.replace(old_enh, new_enh)
    print("✅ 2. Old enhancement CSS removed (merged into main)")

# ═══════════════════════════════════════════════════════════════
# 3. UPGRADE PageTransition — smooth fade+slide
# ═══════════════════════════════════════════════════════════════
old_pt = '''function PageTransition({children,pageKey}){
  const [show,setShow]=useState(false);
  const [content,setContent]=useState(children);
  const prevKey=useRef(pageKey);

  useEffect(()=>{
    if(pageKey!==prevKey.current){
      setShow(false);
      const t=setTimeout(()=>{setContent(children);setShow(true);prevKey.current=pageKey;},180);
      return()=>clearTimeout(t);
    } else {
      setShow(true);
    }
  },[pageKey,children]);

  return(
    <div style={{opacity:show?1:0,transform:show?"translateY(0)":"translateY(14px)",transition:"opacity .25s ease,transform .25s ease"}}>
      {content}
    </div>
  );
}'''

new_pt = '''function PageTransition({children,pageKey}){
  const [show,setShow]=useState(false);
  const [content,setContent]=useState(children);
  const [dir,setDir]=useState(1);
  const prevKey=useRef(pageKey);

  useEffect(()=>{
    if(pageKey!==prevKey.current){
      setShow(false);
      const t=setTimeout(()=>{
        setContent(children);
        setShow(true);
        prevKey.current=pageKey;
      },160);
      return()=>clearTimeout(t);
    } else {
      setShow(true);
    }
  },[pageKey,children]);

  return(
    <div style={{
      opacity:show?1:0,
      transform:show?"translateY(0) scale(1)":"translateY(16px) scale(0.99)",
      transition:"opacity 0.28s cubic-bezier(0.4,0,0.2,1), transform 0.28s cubic-bezier(0.4,0,0.2,1)",
      willChange:"opacity,transform",
    }}>
      {content}
    </div>
  );
}'''

if old_pt in c:
    c = c.replace(old_pt, new_pt)
    print("✅ 3. PageTransition upgraded with smooth scale+fade")

# ═══════════════════════════════════════════════════════════════
# 4. UPGRADE Spinner — multi-ring premium spinner
# ═══════════════════════════════════════════════════════════════
old_spin = '''function Spinner({size=24,color="#FF6A00"}){
  return(
    <div style={{width:size,height:size,position:"relative",flexShrink:0}}>
      <div style={{width:size,height:size,border:`2.5px solid ${color}20`,borderTop:`2.5px solid ${color}`,borderRight:`2.5px solid ${color}60`,borderRadius:"50%",animation:"spin 0.7s cubic-bezier(.4,0,.2,1) infinite"}}/>
    </div>
  );
}'''

new_spin = '''function Spinner({size=24,color="#FF6A00"}){
  return(
    <div style={{width:size,height:size,position:"relative",flexShrink:0}}>
      <div style={{
        position:"absolute",inset:0,
        border:`2px solid ${color}15`,
        borderTop:`2px solid ${color}`,
        borderRight:`2px solid ${color}50`,
        borderRadius:"50%",
        animation:"raSpin 0.7s cubic-bezier(.4,0,.2,1) infinite",
      }}/>
      <div style={{
        position:"absolute",
        inset:size*0.2,
        border:`1.5px solid ${color}10`,
        borderBottom:`1.5px solid ${color}40`,
        borderRadius:"50%",
        animation:"raSpin 1.1s cubic-bezier(.4,0,.2,1) infinite reverse",
      }}/>
    </div>
  );
}'''

if old_spin in c:
    c = c.replace(old_spin, new_spin)
    print("✅ 4. Spinner upgraded to dual-ring")

# ═══════════════════════════════════════════════════════════════
# 5. UPGRADE ExamModeModal — use glass classes
# ═══════════════════════════════════════════════════════════════
old_modal_div = '''    <div onClick={e=>{if(e.target===e.currentTarget)onCancel();}} style={{
      position:"fixed",top:0,left:0,right:0,bottom:0,
      background:"rgba(0,0,0,0.88)",zIndex:999999,
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"20px",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",
    }}>
      <div style={{
        background:"#111",border:"1px solid rgba(255,255,255,0.12)",
        borderRadius:24,padding:window.innerWidth<=768?"24px 20px":"36px",
        maxWidth:460,width:"100%",
        boxShadow:"0 32px 80px rgba(0,0,0,0.9)",
        textAlign:"center",
      }}>'''

new_modal_div = '''    <div onClick={e=>{if(e.target===e.currentTarget)onCancel();}} className="ra-modal-backdrop">
      <div className="ra-modal-card" style={{
        padding:window.innerWidth<=768?"24px 20px":"36px",
        maxWidth:460,width:"100%",textAlign:"center",
      }}>'''

if old_modal_div in c:
    c = c.replace(old_modal_div, new_modal_div)
    print("✅ 5. Modal uses glass classes")

# ═══════════════════════════════════════════════════════════════
# 6. UPGRADE test cards to use glass class
# ═══════════════════════════════════════════════════════════════
old_test_div = '''                <div key={testObj.id} style={{
                  borderRadius:16,padding:18,cursor:"pointer",
                  background:"rgba(255,255,255,0.03)",
                  border:`1.5px solid ${isPaidLocked?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.08)"}`,
                  opacity:isPaidLocked?0.5:1,transition:"all .25s ease",
                }}
                onMouseOver={e=>{if(!isPaidLocked){e.currentTarget.style.borderColor=et.color+"60";e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.transform="translateY(-2px)";}}}
                onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.transform="none";}}>'''

new_test_div = '''                <div key={testObj.id} className="ra-test-card" style={{
                  padding:18,cursor:"pointer",
                  opacity:isPaidLocked?0.45:1,
                  borderColor:isPaidLocked?"rgba(255,255,255,0.04)":"var(--border-1)",
                }}
                onMouseOver={e=>{if(!isPaidLocked){e.currentTarget.style.borderColor=et.color+"50";e.currentTarget.style.boxShadow=`0 20px 48px rgba(0,0,0,0.5),0 0 0 1px ${et.color}25`;}}}
                onMouseOut={e=>{if(!isPaidLocked){e.currentTarget.style.borderColor="var(--border-1)";e.currentTarget.style.boxShadow="none";}}}>'''

if old_test_div in c:
    c = c.replace(old_test_div, new_test_div)
    print("✅ 6. Test cards use glass class")

# ═══════════════════════════════════════════════════════════════
# 7. ADD hover microinteraction to Start Test button
# ═══════════════════════════════════════════════════════════════
old_start_btn = '''                  <button onClick={()=>{if(isPaidLocked){alert("Content locked.");return;}setModeModal(testObj);}} style={{
                    width:"100%",padding:"10px 0",borderRadius:10,border:"none",
                    background:isPaidLocked?"rgba(255,255,255,0.06)":`linear-gradient(135deg,${et.color},${et.color}cc)`,
                    color:isPaidLocked?"rgba(255,255,255,0.2)":"#fff",
                    fontWeight:800,fontSize:13,cursor:isPaidLocked?"not-allowed":"pointer",
                    boxShadow:isPaidLocked?"none":`0 4px 14px ${et.color}35`,transition:"all .2s",
                  }}>{isPaidLocked?"🔒 Locked":"Start Test →"}</button>'''

new_start_btn = '''                  <button onClick={()=>{if(isPaidLocked){alert("Content locked.");return;}setModeModal(testObj);}}
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
                    {isPaidLocked?"🔒 Locked":"Start Test →"}</button>'''

if old_start_btn in c:
    c = c.replace(old_start_btn, new_start_btn)
    print("✅ 7. Start Test button microinteraction added")

# ═══════════════════════════════════════════════════════════════
# 8. UPGRADE StreakWidget glass style
# ═══════════════════════════════════════════════════════════════
old_streak = '''    <div style={{background:"linear-gradient(135deg,#1a0800,#2d1200)",borderRadius:16,padding:"14px 18px",border:"1px solid #FF6A0030",display:"flex",alignItems:"center",gap:14}}>'''
new_streak  = '''    <div className="ra-stat-pill" style={{background:"linear-gradient(135deg,rgba(255,106,0,0.12),rgba(255,154,0,0.06))",border:"1px solid rgba(255,106,0,0.2)",borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,marginBottom:16}}>'''

if old_streak in c:
    c = c.replace(old_streak, new_streak)
    print("✅ 8. StreakWidget glass style")

# ═══════════════════════════════════════════════════════════════
# 9. UPGRADE index.html font + dark bg
# ═══════════════════════════════════════════════════════════════
try:
    with open("index.html","r") as f:
        html = f.read()
    
    if "Plus+Jakarta+Sans" not in html:
        html = html.replace(
            "<style>",
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">\n    <style>',
            1
        )
    
    html = html.replace(
        'font-family:"Segoe UI",system-ui,-apple-system,sans-serif;',
        'font-family:"Plus Jakarta Sans","Segoe UI",system-ui,-apple-system,sans-serif;'
    )
    html = html.replace(
        'background:#fff;',
        'background:#060608;'
    )
    
    with open("index.html","w") as f:
        f.write(html)
    print("✅ 9. index.html upgraded (font + dark bg)")
except Exception as e:
    print(f"⚠️ 9. index.html: {e}")

with open("src/App.jsx","w") as f:
    f.write(c)

print("\n" + "="*55)
print("✅ Premium UI upgrade complete!")
print("="*55)
print("\nRun: npm run build && git add -A && git commit -m 'UI: glassmorphism + dark mode + animations' && git push")
