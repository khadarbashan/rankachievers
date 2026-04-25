# 🔥 Rank Achievers Academy — Firebase + Vercel Setup Guide
## www.rankachievers.in

---

## WHAT YOU GET
- ✅ Real Google Login (one click, no password)
- ✅ Email + Password Login
- ✅ All scores saved to Firebase cloud
- ✅ Live leaderboard (real student scores)
- ✅ Admin access control (enable/disable students)
- ✅ Questions stored in Firestore (not browser)
- ✅ Scales to 50,000+ students FREE
- ✅ Works at www.rankachievers.in

---

## STEP 1 — Create Firebase Project (FREE)

1. Go to: https://console.firebase.google.com
2. Click **"Add project"**
3. Project name: `rank-achievers`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

---

## STEP 2 — Enable Authentication

In Firebase Console → **Authentication** → **Get started**

### Enable Google Login:
1. Click **"Google"** provider
2. Toggle **Enable**
3. Support email: `nkhadar@gmail.com`
4. Click **Save**

### Enable Email/Password:
1. Click **"Email/Password"** provider
2. Toggle **Enable**
3. Click **Save**

---

## STEP 3 — Create Firestore Database

In Firebase Console → **Firestore Database** → **Create database**

1. Select **"Start in production mode"**
2. Choose region: **asia-south1** (Mumbai — closest to Anantapur)
3. Click **Enable**

### Set Security Rules:
Go to **Firestore → Rules** and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
      allow update: if request.auth.token.email == "nkhadar@gmail.com";
    }

    // Questions: anyone logged in can read, only admin writes
    match /questions/{qId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.email == "nkhadar@gmail.com";
    }

    // Attempts: users write own, anyone logged in reads (leaderboard)
    match /attempts/{aId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.userId;
    }

    // Settings: anyone reads, only admin writes
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth.token.email == "nkhadar@gmail.com";
    }
  }
}
```

Click **Publish**

---

## STEP 4 — Get Your Firebase Config

In Firebase Console → **Project Settings** (gear icon ⚙️) → **General**

Scroll down to **"Your apps"** → Click **"</>** Web" icon

1. App nickname: `rank-achievers-web`
2. Check **"Also set up Firebase Hosting"** → NO (we use Vercel)
3. Click **"Register app"**

You will see a config like this — **COPY ALL OF IT**:

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSyXXXXXXXXXXXXXXXXXXXXX",
  authDomain:        "rank-achievers.firebaseapp.com",
  projectId:         "rank-achievers",
  storageBucket:     "rank-achievers.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abcdef1234567890"
};
```

---

## STEP 5 — Add Config to App

Open `src/App.jsx` and find this section at the top:

```javascript
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

**Replace with your actual values from Step 4.**

---

## STEP 6 — Add Authorized Domain for Google Login

In Firebase Console → **Authentication** → **Settings** → **Authorized domains**

Add these domains:
- `localhost` (already there)
- `rank-achievers-xxx.vercel.app` (your Vercel URL — add after deploying)
- `www.rankachievers.in`
- `rankachievers.in`

---

## STEP 7 — Run Locally

```bash
cd ~/rank-achievers-firebase
npm install
npm run dev
```

Open http://localhost:5173

Test Google login → should work ✅

---

## STEP 8 — Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Build
npm run build

# Deploy
vercel --prod
```

Get your URL: `https://rank-achievers-xxx.vercel.app`

**Go back to Step 6** and add this URL to Firebase authorized domains.

---

## STEP 9 — Connect www.rankachievers.in

In Vercel Dashboard → Settings → Domains:
- Add: `www.rankachievers.in`
- Add: `rankachievers.in`

In your domain registrar DNS settings add:

| Type  | Name | Value                |
|-------|------|----------------------|
| CNAME | www  | cname.vercel-dns.com |
| A     | @    | 76.76.19.61          |
| A     | @    | 76.76.21.21          |

Wait 15 min–24 hours → **www.rankachievers.in is LIVE** ✅

Add `www.rankachievers.in` to Firebase authorized domains too.

---

## STEP 10 — Verify Everything

| Test                          | Expected Result              |
|-------------------------------|------------------------------|
| Google login                  | One-click, redirects to home |
| Login nkhadar@gmail.com       | Goes to Admin panel          |
| Student takes test            | Score appears in Dashboard   |
| Admin toggles paid mode       | Students see lock screen     |
| Admin enables student         | Student sees all content     |
| Leaderboard                   | Shows real student scores    |
| Refresh page                  | Still logged in              |

---

## FIRESTORE COLLECTIONS (created automatically)

| Collection  | What's stored                          |
|-------------|----------------------------------------|
| `users`     | Profile, role, accessEnabled flag      |
| `questions` | Questions added by admin               |
| `attempts`  | Every test attempt (score, time, etc.) |
| `settings`  | contentMode (free/paid)                |

---

## FREE TIER LIMITS (Firebase Spark Plan)

| Resource              | Free Limit         | Your Usage Estimate  |
|-----------------------|--------------------|----------------------|
| Auth users            | Unlimited          | ✅                   |
| Firestore reads/day   | 50,000             | ~1,000 students fine |
| Firestore writes/day  | 20,000             | ✅                   |
| Firestore storage     | 1 GB               | ✅ (years of data)   |
| Firebase Hosting      | 10 GB/month        | Not used (Vercel)    |

**Upgrade to Blaze (pay-as-you-go) only when you exceed 50K daily reads.**
At 50K students active daily → cost is roughly ₹500–2000/month.

---

## ADMIN CREDENTIALS

| Field    | Value               |
|----------|---------------------|
| Email    | nkhadar@gmail.com   |
| Password | Khadar@ra2          |
| OR       | Login with Google → auto-detects admin |

---

## QUICK UPDATE WORKFLOW

```bash
# Make changes to src/App.jsx
# Then:
git add .
git commit -m "your change description"
git push
# Vercel auto-deploys in 60 seconds ✅
```

---

## PROJECT STRUCTURE

```
rank-achievers-firebase/
├── package.json        ← dependencies (react + firebase)
├── vite.config.js      ← build config
├── index.html          ← HTML entry
├── vercel.json         ← Vercel SPA routing
├── .gitignore
├── public/
│   └── favicon.svg     ← RA logo
└── src/
    ├── main.jsx        ← React entry
    └── App.jsx         ← Entire app (Firebase integrated)
```

---

© 2025 Rank Achievers Academy, Anantapur
Built with React + Firebase + Vercel
