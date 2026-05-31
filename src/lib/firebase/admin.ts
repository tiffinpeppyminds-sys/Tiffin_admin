import { App, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";

type FirebaseAdmin = {
  app: App;
  auth: Auth;
  db: Firestore;
};

let firebaseAdmin: FirebaseAdmin | null = null;

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getFirebaseAdmin(): FirebaseAdmin {
  if (firebaseAdmin) return firebaseAdmin;

  const projectId = getRequiredEnv("FIREBASE_ADMIN_PROJECT_ID");
  const clientEmail = getRequiredEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
  const privateKey = getRequiredEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n");

  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });

  firebaseAdmin = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  };

  return firebaseAdmin;
}
