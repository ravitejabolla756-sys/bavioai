import Link from "next/link";
import {
  Activity,
  Blocks,
  Bot,
  Cloud,
  Database,
  Gauge,
  LockKeyhole,
  Mail,
  PhoneCall,
  ShieldCheck,
  Signal,
  WalletCards
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Architecture | Bavio AI",
  description: "Recommended Bavio AI technical stack, infrastructure, performance requirements, and reliability targets.",
  path: "/architecture"
});

const stackRows = [
  { layer: "Marketing frontend", recommendation: "Next.js 14+ App Router, React, Tailwind CSS, Framer Motion, Vercel.", icon: Cloud },
  { layer: "Dashboard frontend", recommendation: "Next.js or React SPA with shadcn/ui plus Recharts or Tremor for analytics.", icon: Blocks },
  { layer: "Backend API", recommendation: "Node.js with Fastify or Python FastAPI using REST and WebSocket APIs.", icon: Signal },
  { layer: "Voice processing", recommendation: "Deepgram STT, ElevenLabs or Cartesia TTS, GPT-4o or Claude, orchestrated by Bavio AI Runtime Engine.", icon: Bot },
  { layer: "Database", recommendation: "PostgreSQL on Supabase, Redis for session/cache, and S3-compatible storage for call recordings.", icon: Database },
  { layer: "Authentication", recommendation: "Clerk or Auth.js with SSO, SAML, OAuth, and magic links.", icon: LockKeyhole },
  { layer: "Payments", recommendation: "Stripe for global payments and Razorpay for India with native INR and USD support.", icon: WalletCards },
  { layer: "Telephony", recommendation: "Twilio or Vonage for numbers, with SIP trunk support via FreeSWITCH or LiveKit.", icon: PhoneCall },
  { layer: "Email", recommendation: "Resend or Postmark for transactional email and ConvertKit for marketing email.", icon: Mail },
  { layer: "Analytics", recommendation: "PostHog, Google Search Console, and Plausible for product, SEO, and privacy-friendly web analytics.", icon: Activity },
  { layer: "Monitoring", recommendation: "Sentry for frontend and backend error monitoring.", icon: ShieldCheck },
  { layer: "Status and CDN", recommendation: "Better Uptime or Instatus plus Cloudflare for CDN, DDoS protection, and WAF.", icon: Gauge }
];

const performanceRequirements = [
  ["Homepage TTI", "Under 3 seconds on 4G mobile."],
  ["API response time", "Under 200ms for non-voice endpoints and under 100ms for auth."],
  ["Voice-to-voice latency", "Maintain sub-500ms as a core differentiator."],
  ["Concurrent calls", "Auto-scale infrastructure against plan-based concurrency limits."],
  ["Uptime", "99.9% minimum, with a path toward 99.99% for enterprise."]
];

export default function ArchitecturePage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Infrastructure"
        title="Technical architecture built for real-time voice AI."
        description="A practical full-stack recommendation for scaling Bavio across marketing, dashboard, APIs, voice runtime, telephony, analytics, and enterprise reliability."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/docs/quickstart">View quickstart</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/status">View status</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section-shell pt-0">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Recommended stack</span>
            <h2 className="section-title">Every layer has a clear job.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stackRows.map(({ layer, recommendation, icon: Icon }) => (
              <Card key={layer} className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--light-accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-2xl font-black text-[var(--text-primary)]">{layer}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{recommendation}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Performance requirements</p>
            <h2 className="section-title">Targets that protect the customer experience.</h2>
            <p className="section-sub mt-4">
              Voice AI is judged on responsiveness and reliability. These thresholds should remain visible in engineering planning.
            </p>
          </div>
          <Card className="p-6">
            <div className="space-y-3">
              {performanceRequirements.map(([metric, target]) => (
                <div key={metric} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{metric}</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--text-secondary)]">{target}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
