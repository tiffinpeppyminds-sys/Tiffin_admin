import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getFirebaseAdmin } from "@/lib/firebase/admin";

type CreateAdminPayload = {
  name: string;
  email: string;
  password: string;
  roleLabel: string;
  accessModules: string[];
};

async function verifyRequestAuth(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false as const, status: 401, message: "Missing auth token." };
  }

  const idToken = authHeader.replace("Bearer ", "").trim();
  const { auth } = getFirebaseAdmin();

  try {
    const decoded = await auth.verifyIdToken(idToken);
    return { ok: true as const, decoded };
  } catch {
    return { ok: false as const, status: 401, message: "Invalid or expired auth token." };
  }
}

export async function GET(request: NextRequest) {
  const authCheck = await verifyRequestAuth(request);
  if (!authCheck.ok) {
    return NextResponse.json({ error: authCheck.message }, { status: authCheck.status });
  }

  const { db } = getFirebaseAdmin();

  if (authCheck.decoded.role === "super_admin") {
    const snapshot = await db.collection("adminAccounts").orderBy("createdAt", "desc").get();
    const admins: Array<Record<string, unknown>> = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const hasSuperAdminRow = admins.some((item) => (item as { email?: string }).email === authCheck.decoded.email);
    if (!hasSuperAdminRow) {
      admins.unshift({
        id: authCheck.decoded.uid,
        name: "Super Admin",
        email: authCheck.decoded.email,
        role: "Super Admin",
        roleLabel: "Super Admin",
        status: "Active",
        accessModules: ["All modules"],
        lastLogin: "Active session",
      });
    }

    return NextResponse.json({ admins });
  }

  const ownAdminDoc = await db.collection("adminAccounts").doc(authCheck.decoded.uid).get();
  const admin = ownAdminDoc.exists
    ? { id: ownAdminDoc.id, ...ownAdminDoc.data() }
    : {
        id: authCheck.decoded.uid,
        name: authCheck.decoded.name ?? "Admin",
        email: authCheck.decoded.email,
        role: "Admin",
        roleLabel: "Admin",
        status: "Active",
        accessModules: [],
        lastLogin: "Active session",
      };

  return NextResponse.json({ admins: [admin] });
}

export async function POST(request: NextRequest) {
  const authCheck = await verifyRequestAuth(request);
  if (!authCheck.ok) {
    return NextResponse.json({ error: authCheck.message }, { status: authCheck.status });
  }
  if (authCheck.decoded.role !== "super_admin") {
    return NextResponse.json({ error: "Only Super Admin can perform this action." }, { status: 403 });
  }

  const payload = (await request.json()) as Partial<CreateAdminPayload>;
  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const password = payload.password ?? "";
  const roleLabel = payload.roleLabel?.trim();
  const accessModules = payload.accessModules ?? [];

  if (!name || !email || !password || !roleLabel) {
    return NextResponse.json({ error: "name, email, password, and roleLabel are required." }, { status: 400 });
  }

  if (!Array.isArray(accessModules) || accessModules.length === 0) {
    return NextResponse.json({ error: "At least one access module is required." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const { auth, db } = getFirebaseAdmin();

  try {
    const user = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    await auth.setCustomUserClaims(user.uid, {
      role: "admin",
      accessModules,
    });

    const adminRecord = {
      name,
      email,
      role: "Admin",
      roleLabel,
      status: "Active",
      accessModules,
      lastLogin: "Never",
      createdAt: FieldValue.serverTimestamp(),
    };

    await db.collection("adminAccounts").doc(user.uid).set(adminRecord);

    const responseAdmin = {
      id: user.uid,
      name,
      email,
      role: "Admin",
      roleLabel,
      status: "Active",
      accessModules,
      lastLogin: "Never",
    };

    return NextResponse.json({
      admin: responseAdmin,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create admin account.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
