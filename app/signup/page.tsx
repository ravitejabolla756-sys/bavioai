import Link from "next/link";
import { CheckCircle2, Mic2, Waves, Workflow } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { SignupForm } from "@/components/shared/signup-form";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sign Up | Bavio AI",
  description: "Create your Bavio AI account and launch an India-first voice workflow in minutes.",
  path: "/signup"
});

const trustBullets = ["No credit card required", "Live in 10 minutes", "Hindi + English support"];

const features = [
  {
    title: "Sub-500ms voice response",
    copy: "Faster than a human receptionist, with lead capture and structured follow-up built in.",
    icon: Waves
  },
  {
    title: "Hinglish-first conversations",
    copy: "Built for Hindi, English, and the real way Indian customers switch between both.",
    icon: Mic2
  },
  {
    title: "Exotel + WhatsApp workflows",
    copy: "Every call can create a lead, send an alert, update a CRM, and book the next step.",
    icon: Workflow
  }
];

export default function SignupPage() {
  return (
    <PageTransition>
      <section className="min-h-screen bg-[var(--bg-base)] pt-24">
        <div className="grid min-h-[calc(100vh-96px)] lg:grid-cols-[0.84fr_1.16fr]">
          <div className="relative flex items-center overflow-hidden border-r border-[var(--border-base)] bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.18),transparent_40%),linear-gradient(180deg,#161616,#111111)] px-6 py-12 lg:px-12">
            <div className="hero-noise absolute inset-0 opacity-80" />
            <div className="relative z-[1] mx-auto w-full max-w-[420px]">
              <Logo />
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Start free</p>
              <h1 className="mt-4 text-[clamp(42px,5vw,66px)] font-black leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
                Start answering every call.
              </h1>
              <div className="mt-8 space-y-4">
                {trustBullets.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10 rounded-[20px] border border-[var(--border-base)] bg-[rgba(255,107,0,0.08)] p-6">
                <p className="text-lg leading-8 text-[var(--text-primary)]">
                  "Hamne weekend leads khona band kar diya. Bavio picks up every enquiry and sends us the right details on
                  WhatsApp before we even call back."
                </p>
                <p className="mt-4 text-sm text-[var(--text-muted)]">Beta real-estate customer - Hyderabad</p>
              </div>
              <p className="mt-8 text-sm font-medium text-[var(--text-secondary)]">Join 500+ businesses on the waitlist</p>
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-12 lg:px-12">
            <div className="grid w-full max-w-[1120px] gap-8 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="hidden xl:block">
                <p className="eyebrow">Why teams pick Bavio</p>
                <h2 className="text-5xl font-black tracking-[-0.05em] text-[var(--text-primary)]">
                  India-first voice infrastructure for SMB growth.
                </h2>
                <div className="mt-8 space-y-4">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.title} className="rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-[rgba(192,132,252,0.2)] bg-[rgba(255,107,0,0.2)] text-[var(--light-accent)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{feature.copy}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Card className="w-full max-w-[620px] p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[var(--text-primary)]">Create your account</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    Free plan available. Use your email and password or continue with Google authorization.
                  </p>
                </div>
                <SignupForm />
                <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                    Log in
                  </Link>
                </p>
                <div className="mt-8 rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-center text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Trusted by businesses across India
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

