import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const required = [
  "FIREBASE_ADMIN_PROJECT_ID",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_ADMIN_PRIVATE_KEY",
  "SUPERADMIN_EMAIL",
];

for (const name of required) {
  if (!process.env[name]) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
}

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const auth = getAuth();
const superadminEmail = process.env.SUPERADMIN_EMAIL;
const superadminPassword = process.env.SUPERADMIN_PASSWORD || "password";
let user;

try {
  user = await auth.getUserByEmail(superadminEmail);
} catch (error) {
  if (error?.errorInfo?.code !== "auth/user-not-found") {
    throw error;
  }

  user = await auth.createUser({
    email: superadminEmail,
    password: superadminPassword,
    displayName: "Super Admin",
  });
  console.log(`Created Super Admin user: ${superadminEmail}`);
}

const existingClaims = user.customClaims ?? {};

await auth.setCustomUserClaims(user.uid, {
  ...existingClaims,
  role: "super_admin",
});

console.log(`Granted super_admin claim to ${superadminEmail} (uid: ${user.uid})`);
