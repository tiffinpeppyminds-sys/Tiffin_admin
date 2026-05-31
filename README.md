# Tiffin Finder Admin Panel

A modern Next.js admin dashboard for managing the full TIFFIN FINDER ecosystem.

## Highlights

- Super Admin role and Admin management module
- Provider verification, suspension, and featuring controls
- Customer governance and moderation
- Order lifecycle monitoring
- Complaint handling queue
- Reports and notification matrix
- End-to-end app screen flow mapping (public, customer, business)

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Reusable UI component primitives

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication > Email/Password**.
3. Create a Web App in project settings and copy the config values.
4. Paste values into `.env.local` using `.env.example` keys.
5. Restart `npm run dev` after updating env values.
6. Add Admin SDK env values for secure server APIs:
   - `FIREBASE_ADMIN_PROJECT_ID`
   - `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `FIREBASE_ADMIN_PRIVATE_KEY`
7. Ensure the Super Admin Firebase Auth user exists with email:
   - `tiffin@gmail.com`
8. Grant Super Admin custom claim:
   - `npm run grant:superadmin`

## Firestore Rules Modes

- `firestore.rules` → **Production-hardened** rules:
  - only authenticated users
  - only `super_admin` claim can write `adminAccounts`
  - admin reads restricted to own record (or Super Admin)
- `firestore.rules.demo` → permissive demo/testing rules.

If you need demo behavior temporarily:

1. Copy demo rules over main rules:
   - `cp firestore.rules.demo firestore.rules`
2. Deploy rules:
   - `firebase deploy --only firestore:rules`

For production, keep `firestore.rules` as-is and ensure Firebase Auth custom claims include:
- `role: "super_admin"` for your Super Admin account.

## Auth Flow

- Super Admin default credentials (hardcoded in app UI):
  - `tiffin@gmail.com` / `password`
- Login is validated by Firebase Auth.
- Super Admin can create Admin users with email/password from Admins tab.
- Created admins are stored in:
  - Firebase Auth (for login)
  - Firestore `adminAccounts` (for access metadata)
- Only Super Admin (`role: "super_admin"`) can create/manage admins through secured API routes.

## Structure

- `src/app/(auth)` login flow
- `src/app/(dashboard)` admin modules
- `src/components` UI + layout primitives
- `src/components/auth` client-side auth guard
- `src/lib/firebase/client.ts` Firebase app/auth/firestore initialization
- `src/lib/firebase/admin.ts` Firebase Admin SDK initialization
- `src/app/api/admins/route.ts` secured admin management API
- `src/lib/mock-data.ts` seeded dashboard data
