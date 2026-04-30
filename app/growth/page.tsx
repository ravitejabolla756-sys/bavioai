import Link from "next/link";
import {
  BadgePercent,
  CalendarDays,
  Clapperboard,
  Gift,
  Handshake,
  Linkedin,
  Megaphone,
  MessageSquareText,
  Rocket,
  Users
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Growth Strategy | Bavio AI",
  description: "Bavio AI growth loops across launch channels, developer communities, video, partners, referrals, and lifetime deals.",
  path: "/growth"
});

const acquisitionChannels = [
  {
    title: "Product Hunt launch",
    icon: Rocket,
    timing: "Launch day",
    outcome: "Coordinated hunter launch, demo GIF, founder comments, and customer/community activation.",
    actions: ["Confirm hunter and launch slot", "Prepare 30-second demo GIF", "Activate founders, customers, and communities"]
  },
  {
    title: "Hacker News Show HN",
    icon: MessageSquareText,
    timing: "Technical launch",
    outcome: "Show HN: We built autonomous voice agents for business calls.",
    actions: ["Lead with architecture and tradeoffs", "Share latency and telephony details", "Have engineers respond all day"]
  },
  {
    title: "Developer communities",
    icon: Users,
    timing: "Weekly",
    outcome: "Thoughtful posts in r/MachineLearning, r/artificial, Discord AI communities, and relevant builder forums.",
    actions: ["Avoid sales copy", "Share build notes and demos", "Route interested builders to docs and API pages"]
  },
  {
    title: "YouTube demos",
    icon: Clapperboard,
    timing: "2 videos/month",
    outcome: "SEO-optimized real-call demos showing Bavio agents handling bookings, support, and lead qualification.",
    actions: ["Record real workflow demos", "Use keyword-led titles", "Link to landing pages and signup"]
  },
  {
    title: "LinkedIn founder content",
    icon: Linkedin,
    timing: "Weekly",
    outcome: "Founder-led posts on voice automation, startup lessons, customer outcomes, and product progress.",
    actions: ["Publish from founders", "Repurpose launch learnings", "Include customer-safe screenshots and metrics"]
  },
  {
    title: "Partner program",
    icon: Handshake,
    timing: "Ongoing",
    outcome: "Integration partners like HubSpot, Cal.com, and CRM providers co-market to overlapping users.",
    actions: ["Create integration landing pages", "Pitch co-marketing briefs", "Offer partner revenue share or lead swaps"]
  },
  {
    title: "Referral program",
    icon: BadgePercent,
    timing: "Customer loop",
    outcome: "Existing customers receive 20% off for referring new businesses.",
    actions: ["Add referral codes", "Track accepted referrals", "Reward both referrer and new customer"]
  },
  {
    title: "AppSumo / lifetime deals",
    icon: Gift,
    timing: "Selective campaign",
    outcome: "A limited lifetime deal can accelerate early adoption while preserving enterprise positioning.",
    actions: ["Cap usage clearly", "Limit support exposure", "Convert high-fit accounts to annual plans"]
  }
];

const launchAssets = [
  "Product Hunt thumbnail, tagline, gallery, demo GIF, and first comment",
  "Show HN technical write-up with architecture, latency, and failure-mode notes",
  "YouTube titles for appointment scheduling, missed calls, AI receptionist, and voice agent API",
  "Founder LinkedIn calendar with one opinion post, one build-in-public post, one customer story, and one demo clip per month"
];

const launchDayTimeline = [
  ["T-14 days", "Confirm hunter, product positioning, launch page copy, and founder reply owners."],
  ["T-7 days", "Finalize demo GIF, screenshots, customer quotes, launch email, and community list."],
  ["Launch 12:01 AM PT", "Publish Product Hunt, notify warm supporters, and pin the founder first comment."],
  ["Launch morning", "Post Show HN with technical depth, then route dev questions to docs and API pages."],
  ["Launch day", "Founders reply quickly on Product Hunt, HN, LinkedIn, Discord, and Reddit threads."],
  ["T+1 day", "Publish results, thank supporters, and retarget visitors with demo and trial CTAs."]
];

const channelCopy = [
  {
    label: "Product Hunt tagline",
    copy: "Autonomous voice agents that answer, qualify, schedule, and follow up on business calls."
  },
  {
    label: "Show HN title",
    copy: "Show HN: We built autonomous voice agents for business calls"
  },
  {
    label: "Reddit angle",
    copy: "We built a low-latency voice agent stack for real business calls. Here are the architecture tradeoffs."
  },
  {
    label: "Discord angle",
    copy: "Looking for AI builders to test voice-agent workflows across scheduling, support, and lead qualification."
  }
];

const youtubeIdeas = [
  "AI Voice Agent Handles a Real Appointment Booking Call",
  "How Bavio AI Reduces Missed Business Calls in Real Time",
  "Building a Voice Agent API Workflow in 5 Minutes",
  "AI Receptionist for Restaurants: Live Reservation Demo"
];

const partnerProgram = [
  ["HubSpot", "CRM workflow demo, shared lead-capture playbook, and marketplace listing."],
  ["Cal.com", "Appointment scheduling demo, booking-flow template, and founder webinar."],
  ["Telephony partners", "Integration guide, joint customer story, and implementation partner package."]
];

export default function GrowthPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Growth"
        title="Growth loops and acquisition channels."
        description="A coordinated launch and distribution plan for reaching founders, developers, operators, and integration-led buyers."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">
              Plan a launch motion
              <Megaphone className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/voice-agent-api">Developer landing page</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section-shell pt-0">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {acquisitionChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <Card key={channel.title} className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--light-accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{channel.timing}</p>
                <h2 className="mt-2 text-2xl font-black text-[var(--text-primary)]">{channel.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{channel.outcome}</p>
                <div className="mt-5 space-y-2">
                  {channel.actions.map((action) => (
                    <p key={action} className="text-sm text-[var(--text-secondary)]">
                      {action}
                    </p>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Launch kit</p>
            <h2 className="section-title">Assets needed before activating channels.</h2>
            <p className="section-sub mt-4">
              Each channel should point to a specific landing page, demo, or proof asset so attention turns into qualified signup intent.
            </p>
          </div>
          <Card className="p-6">
            <div className="space-y-3">
              {launchAssets.map((asset) => (
                <div key={asset} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {asset}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <div className="mb-8 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-[var(--brand)]" />
            <div>
              <p className="eyebrow">Launch day</p>
              <h2 className="text-3xl font-black text-[var(--text-primary)]">Coordinated Product Hunt and community sequence.</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {launchDayTimeline.map(([time, task]) => (
              <Card key={time} className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">{time}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{task}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <p className="eyebrow">Community copy</p>
            <h2 className="text-3xl font-black text-[var(--text-primary)]">Post angles ready for launch.</h2>
            <div className="mt-5 space-y-3">
              {channelCopy.map((item) => (
                <div key={item.label} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.copy}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="eyebrow">YouTube SEO</p>
            <h2 className="text-3xl font-black text-[var(--text-primary)]">Demo titles built around search intent.</h2>
            <div className="mt-5 space-y-3">
              {youtubeIdeas.map((title) => (
                <div key={title} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {title}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="p-6">
            <p className="eyebrow">Partners</p>
            <h2 className="text-3xl font-black text-[var(--text-primary)]">Co-marketing motions for integration partners.</h2>
            <div className="mt-5 space-y-3">
              {partnerProgram.map(([partner, motion]) => (
                <div key={partner} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{partner}</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--text-secondary)]">{motion}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="eyebrow">Offer loops</p>
            <h2 className="text-3xl font-black text-[var(--text-primary)]">Referral and lifetime deal rules.</h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              <p>Referral program: give existing customers 20% off for each referred business that becomes a paying customer.</p>
              <p>New customer reward: add launch credits or implementation support so both sides feel the benefit.</p>
              <p>AppSumo rule: cap minutes, integrations, support tier, and seats so lifetime plans create adoption without overwhelming operations.</p>
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
