// Rank Achievers Service Worker — v2
const CACHE = "ra-v2";
const PRECACHE = ["/", "/index.html", "/manifest.json"];

// ── Install ──
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// ── Activate ──
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch — network first, cache fallback ──
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  if(e.request.url.includes("firestore") || e.request.url.includes("googleapis")) return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("/")))
  );
});

// ── Push notifications ──
self.addEventListener("push", e => {
  const data = e.data?.json() || {};
  const title   = data.title   || "Rank Achievers";
  const body    = data.body    || "Time to practice!";
  const icon    = data.icon    || "/icons/icon-192.png";
  const badge   = data.badge   || "/icons/icon-96.png";
  const url     = data.url     || "/";
  const tag     = data.tag     || "ra-reminder";

  e.waitUntil(
    self.registration.showNotification(title, {
      body, icon, badge, tag,
      vibrate: [200, 100, 200],
      data: { url },
      actions: [
        { action: "practice", title: "Start Practice →" },
        { action: "dismiss",  title: "Later"            },
      ],
    })
  );
});

// ── Notification click ──
self.addEventListener("notificationclick", e => {
  e.notification.close();
  if(e.action === "dismiss") return;
  const url = e.notification.data?.url || "/";
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(location.origin));
      if(existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});

// ── Background sync — daily reminder ──
self.addEventListener("periodicsync", e => {
  if(e.tag === "ra-daily-reminder"){
    e.waitUntil(
      self.registration.showNotification("Daily Practice Reminder 🎯", {
        body: "Don't break your streak! Practice SSC, Banking or Railways today.",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-96.png",
        tag: "ra-daily",
        data: { url: "/?page=tests" },
      })
    );
  }
});
