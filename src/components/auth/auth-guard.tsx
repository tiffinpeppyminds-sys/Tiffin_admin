"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const firebaseConfigured = isFirebaseConfigured();
  const [checking, setChecking] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseConfigured) {
      router.replace("/login");
      return () => undefined;
    }

    const { auth } = getFirebaseClient();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
      setChecking(false);
    });

    return unsubscribe;
  }, [firebaseConfigured, router]);

  if (checking) {
    return null;
  }

  return <>{children}</>;
}
