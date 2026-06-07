"use client";

import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChartNoAxesCombined,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  Megaphone,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD } from "@/lib/auth/constants";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

const highlights = [
  { icon: ScrollText, text: "Live orders & sales" },
  { icon: ChartNoAxesCombined, text: "Performance insights" },
  { icon: Megaphone, text: "Marketing & offers" },
];

const previewStats = [
  { label: "Sales today", value: "A$219.65", trend: "+12%" },
  { label: "Booked orders", value: "5", trend: "+2" },
  { label: "Success score", value: "72", trend: "Good", accent: true },
];

export default function LoginPage() {
  const firebaseConfigured = isFirebaseConfigured();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"email" | "password" | null>(null);

  useEffect(() => {
    if (!firebaseConfigured) return () => undefined;

    const { auth } = getFirebaseClient();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/dashboard");
    });
    return unsubscribe;
  }, [firebaseConfigured, router]);

  const copyText = async (text: string, field: "email" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const fillDemo = () => {
    setEmail(SUPERADMIN_EMAIL);
    setPassword(SUPERADMIN_PASSWORD);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!firebaseConfigured) {
        setError("Firebase is not configured.");
        return;
      }

      const { auth } = getFirebaseClient();
      const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const token = await credential.user.getIdTokenResult(true);

      if (email.trim().toLowerCase() === SUPERADMIN_EMAIL && token.claims.role !== "super_admin") {
        setError("Super Admin account exists but missing role claim. Assign role: super_admin.");
        return;
      }

      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Unable to sign in right now. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-[#fafafa]">
      {/* Brand panel */}
      <section className="auth-mesh auth-grid relative hidden w-[46%] shrink-0 flex-col justify-between overflow-hidden px-12 py-10 text-white lg:flex">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#06c167]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 size-56 rounded-full bg-[#276ef1]/15 blur-3xl" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-baseline gap-1 text-xl tracking-[-0.02em]">
            <span className="font-normal text-white/90">Tiffin</span>
            <span className="font-bold text-white">Finder</span>
            <span className="font-normal text-white/90">Manager</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-[420px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[#06c167]" />
            Merchant dashboard
          </span>
          <h1 className="mt-6 text-[44px] font-bold leading-[1.08] tracking-[-0.03em]">
            Run your restaurant
            <span className="mt-1 block bg-gradient-to-r from-[#06c167] to-[#34d399] bg-clip-text text-transparent">
              from one place.
            </span>
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Orders, menu, payouts, and growth tools — built for busy store managers.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {highlights.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                <Icon className="size-3.5 text-[#06c167]" />
                {text}
              </span>
            ))}
          </div>

          {/* Dashboard preview card */}
          <div className="auth-card mt-10 rounded-2xl p-5 text-black">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Today&apos;s summary</p>
              <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#06c167]">LIVE</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {previewStats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-[#f6f6f6] px-3 py-3">
                  <p className="text-[10px] font-medium text-neutral-500">{stat.label}</p>
                  <p className={`mt-1 text-lg font-bold tracking-tight ${stat.accent ? "text-[#06c167]" : "text-black"}`}>
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-[#06c167]">{stat.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/30">© {new Date().getFullYear()} Tiffin Finder</p>
      </section>

      {/* Sign-in panel */}
      <section className="relative flex flex-1 flex-col">
        {/* Mobile brand strip */}
        <div className="auth-mesh px-6 py-8 text-white lg:hidden">
          <Link href="/" className="inline-flex items-baseline gap-1 text-lg tracking-[-0.02em]">
            <span className="font-normal">Tiffin</span>
            <span className="font-bold">Finder</span>
            <span className="font-normal">Manager</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/60">Sign in to manage your store dashboard.</p>
        </div>

        <header className="flex items-center px-6 py-5 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200/80 transition-all hover:text-black hover:ring-neutral-300"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-12 lg:px-12">
          <div className="auth-card w-full max-w-[440px] rounded-2xl p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-[28px] font-bold tracking-[-0.02em] text-black">Welcome back</h2>
              <p className="mt-2 text-[15px] text-neutral-500">Sign in with your admin account to continue.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-black">
                  Email address
                </label>
                <input
                  id="admin-email"
                  className="auth-input"
                  placeholder="you@tiffinfinder.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    className="auth-input pr-12"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="flex items-start gap-3 rounded-xl bg-[#fde8e6] px-4 py-3" role="alert">
                  <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-[#e11900]" />
                  <p className="text-sm text-[#e11900]">{error}</p>
                </div>
              ) : null}

              {!firebaseConfigured ? (
                <div className="rounded-xl bg-[#fde8e6] px-4 py-3 text-sm text-[#e11900]">
                  Firebase is not configured. Add <code className="text-xs">NEXT_PUBLIC_FIREBASE_*</code> to{" "}
                  <code className="text-xs">.env.local</code>.
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-black/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 rounded-xl border border-dashed border-neutral-200 bg-[#fafafa] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#06c167]" />
                  <p className="text-xs font-semibold text-black">Demo access</p>
                </div>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Auto-fill
                </button>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-neutral-100">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">Email</p>
                    <p className="truncate text-sm font-medium text-black">{SUPERADMIN_EMAIL}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(SUPERADMIN_EMAIL, "email")}
                    className="shrink-0 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black"
                    aria-label="Copy email"
                  >
                    <Copy className="size-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-neutral-100">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">Password</p>
                    <p className="truncate text-sm font-medium text-black">{SUPERADMIN_PASSWORD}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(SUPERADMIN_PASSWORD, "password")}
                    className="shrink-0 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black"
                    aria-label="Copy password"
                  >
                    <Copy className="size-3.5" />
                  </button>
                </div>
              </div>
              {copied ? (
                <p className="mt-2 text-center text-[11px] font-medium text-[#06c167]">
                  {copied === "email" ? "Email" : "Password"} copied
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
