import Link from "next/link";
import { Activity, BellRing, Sparkles, Waves } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { LoginForm } from "@/components/shared/login-form";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Log In | Bavio AI",
  description: "Sign in to your Bavio AI dashboard to review calls, leads, analytics, and assistant performance.",
  path: "/login"
});

const activity = [
  { label: "Calls today", value: "1,284", icon: Activity },
  { label: "Platform uptime", value: "99.2%", icon: Sparkles },
  { label: "Active agents", value: "26", icon: Waves }
];

const feed = [
  "Healthcare clinic connected - 2 min ago",
  "1,200 calls automated - 1 hr ago",
  "New Hinglish assistant deployed - 3 hr ago"
];

export default function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const errorMessage = searchParams?.error ? decodeURIComponent(searchParams.error) : "";

  return (
    <PageTransition>
      <section className="min-h-screen bg-[var(--bg-base)] pt-24">
        <div className="grid min-h-[calc(100vh-96px)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex items-center justify-center px-6 py-12 lg:px-12">
            <Card className="w-full max-w-[440px] p-8 md:p-10">
              <div className="mb-8 flex flex-col items-center text-center">
                <Logo />
                <h1 className="mt-6 text-3xl font-bold text-[var(--text-primary)]">Welcome back.</h1>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  Sign in to your Bavio dashboard and continue automating every call.
                </p>
              </div>
              {errorMessage ? (
                <div className="mb-5 rounded-[12px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              ) : null}
              <LoginForm />
              <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
                Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                    Start free
                  </Link>
                </p>
              </Card>
          </div>

          <div className="relative hidden border-l border-[var(--border-base)] bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.14),transparent_34%),var(--bg-raised)] lg:flex lg:flex-col lg:justify-center lg:px-16 xl:px-24">
            <div className="hero-noise absolute inset-0 opacity-70" />
            <div className="relative z-[1] max-w-[560px]">
              <p className="eyebrow">Welcome back</p>
              <h2 className="text-[clamp(42px,4.8vw,68px)] font-black leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
                Your call desk is still running.
              </h2>
              <p className="mt-5 max-w-[520px] text-lg leading-8 text-[var(--text-secondary)]">
                Jump back into live operations, review lead capture performance, and see which calls converted today.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {activity.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--brand-subtle)] text-[var(--brand)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">{item.value}</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{item.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-6">
                <div className="mb-4 flex items-center gap-3 text-sm font-medium text-[var(--text-primary)]">
                  <BellRing className="h-4 w-4 text-[var(--brand)]" />
                  Recent activity
                </div>
                <div className="space-y-3">
                  {feed.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]"
                    >
                      <span className="h-2 w-2 rounded-full bg-[var(--accent-green)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
