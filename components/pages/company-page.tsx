"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ExternalLink, Linkedin } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COMPANY_VALUES, OPEN_ROLES } from "@/lib/constants";

const founders = [
  {
    initial: "R",
    name: "Raviteja Bolla",
    role: "Co-Founder & CEO",
    description:
      "Built enterprise software at scale before founding Bavio. Obsessed with Indian business infrastructure and making voice AI actually work in production environments.",
    linkedin: "https://www.linkedin.com/in/ravitejabolla/"
  },
  {
    initial: "P",
    name: "Praneeth",
    role: "Co-Founder & CTO",
    description:
      "Deep systems engineer with experience in real-time audio processing, large-scale distributed systems, and AI model optimization for low-latency applications.",
    linkedin: "https://www.linkedin.com"
  }
];

const timeline = [
  { year: "2024", event: "Founded at SRM Trichy. First proof-of-concept: Hindi voice agent for a real estate agency." },
  { year: "Q1 2025", event: "Exotel integration live. First 5 paying customers in healthcare and real estate verticals." },
  { year: "Q4 2025", event: "Bavio 1.0 launched. 50+ businesses onboarded. Dashboard, analytics, and WhatsApp alerts shipped." },
  { year: "Q1 2026", event: "Bavio 2.0. Visual workflow builder, enterprise SSO, 12-language support, 2.4M+ calls handled." },
  { year: "Q3 2026", event: "Global expansion — USA, UK, Canada. Enterprise SLA tier launched." },
  { year: "2027", event: "Full global voice infrastructure for SMBs and enterprises worldwide." }
];

const mediaLinks = [
  { outlet: "YourStory", headline: "This Bangalore startup is ending missed calls for Indian SMBs with AI" },
  { outlet: "Inc42", headline: "Bavio AI raises interest from top seed funds for India voice automation" },
  { outlet: "The Ken", headline: "Why voice AI for India is harder than anyone expected — and who's cracking it" }
];

export function CompanyPage() {
  const [activeTab, setActiveTab] = useState<"story" | "team" | "values" | "press">("story");

  return (
    <div className="bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Company</p>
            <h1 className="page-hero-title max-w-4xl">
              Built to answer every call.{" "}
              <span className="text-gradient">For every business.</span>
            </h1>
            <p className="page-hero-copy max-w-3xl">
              Bavio started with one observation: Indian businesses lose thousands of customers every day because no one picked up. We built the solution that changes that, forever.
            </p>
          </SectionReveal>

          <SectionReveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["63M+", "SMBs in India", "Our addressable market"],
                ["60%", "Calls go unanswered", "The problem we solve"],
                ["INR 18L Cr", "Lost annually", "To missed call revenue"]
              ].map(([value, label, sub]) => (
                <Card key={label} className="p-6">
                  <p className="text-3xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{sub}</p>
                </Card>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="sticky top-[64px] z-20 border-b border-[var(--border-base)] bg-[rgba(8,6,0,0.92)] backdrop-blur-[20px]">
        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {(["story", "team", "values", "press"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-4 text-[13px] font-semibold capitalize transition-colors ${
                  activeTab === tab ? "text-[var(--brand)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story Tab */}
      {activeTab === "story" && (
        <section className="section-shell">
          <div className="container space-y-10">
            <SectionReveal>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <Card className="p-8">
                  <p className="eyebrow">Mission</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    Eliminate missed calls for every Indian business.
                  </h2>
                  <div className="mt-6 space-y-4 text-sm leading-8 text-[var(--text-secondary)]">
                    <p>IVR systems are rigid and frustrating. Hiring receptionists is expensive and unreliable. Calls are missed when teams are busy on the floor, on site, or after business hours. That gap costs revenue every single day.</p>
                    <p>We built Bavio so any business can answer instantly, qualify intent, capture context, and move every call into a real workflow. One AI agent. Every call answered. Every lead captured.</p>
                    <p>We build from India because the opportunity here is massive, multilingual, and operationally urgent. But we're building for the world.</p>
                  </div>
                </Card>
                <div className="space-y-5">
                  {[
                    ["IVR systems", "Rigid, frustrating, and customers hate them"],
                    ["Human receptionists", "Expensive, unavailable after hours, inconsistent"],
                    ["Traditional telecalling", "Slow, unscalable, no intelligence"],
                    ["Bavio AI", "Instant, 24/7, multilingual, workflow-connected"]
                  ].map(([title, copy], index) => (
                    <Card key={title} className={`p-5 ${index === 3 ? "border-[var(--border-brand)] bg-[var(--brand-glow-soft)]" : ""}`}>
                      <p className={`text-sm font-bold ${index === 3 ? "text-[var(--brand)]" : "text-[var(--text-primary)]"}`}>{title}</p>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">{copy}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Timeline */}
            <SectionReveal>
              <p className="eyebrow">Our story</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">From SRM Trichy to solving voice AI globally.</h2>
              <div className="mt-8 relative">
                <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[var(--border-base)]" />
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={item.year} className="flex gap-6">
                      <div className={`relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 mt-0.5 ${index === timeline.length - 2 ? "border-[var(--brand)] bg-[var(--brand)]" : index === timeline.length - 1 ? "border-[var(--border-base)] bg-[var(--bg-raised)]" : "border-[var(--accent-green)] bg-[var(--accent-green)]"}`}>
                        {index < timeline.length - 1 && <div className="h-2 w-2 rounded-full bg-black" />}
                      </div>
                      <div className="pb-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">{item.year}</p>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Stack */}
            <SectionReveal>
              <Card className="p-8">
                <p className="eyebrow">Our infrastructure stack</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Built on India's best.</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Sarvam AI", "Indian language AI / multilingual STT"],
                    ["Exotel", "India-first telephony — native integration"],
                    ["Supabase", "Postgres database & real-time auth"],
                    ["Dodo Payments", "Global + INR payment infrastructure"],
                    ["AWS", "Cloud infrastructure with India data residency"],
                    ["Razorpay", "Native UPI, NetBanking, and card payments"],
                    ["WhatsApp Business", "Automated notifications and follow-ups"],
                    ["Cloudflare", "Global CDN and DDoS protection"]
                  ].map(([name, desc]) => (
                    <div key={name} className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                      <p className="font-bold text-[var(--text-primary)] text-sm">{name}</p>
                      <p className="mt-2 text-xs text-[var(--text-muted)] leading-[1.6]">{desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Team Tab */}
      {activeTab === "team" && (
        <section className="section-shell">
          <div className="container">
            <SectionReveal>
              <p className="eyebrow">Founders</p>
              <h2 className="section-title">The people building Bavio.</h2>
              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {founders.map((founder) => (
                  <Card key={founder.name} className="p-8">
                    <div className="flex items-start gap-5">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand),#A855F7)] text-2xl font-black text-black">
                        {founder.initial}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{founder.name}</h3>
                        <p className="mt-1 text-sm text-[var(--brand)]">{founder.role}</p>
                        <Link href={founder.linkedin} target="_blank" rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
                          <Linkedin className="h-3 w-3" />
                          LinkedIn profile
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                    <p className="mt-6 text-sm leading-8 text-[var(--text-secondary)]">{founder.description}</p>
                  </Card>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal className="mt-12">
              <Card className="p-8">
                <p className="eyebrow">We&apos;re hiring</p>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Join us — 3 open roles</h2>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">We&apos;re a small team doing outsized work. High ownership, real equity, fast shipping.</p>
                  </div>
                  <Button asChild size="lg">
                    <Link href="/careers" onClick={() => setActiveTab("values")}>
                      View open roles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {OPEN_ROLES.map((role) => (
                    <div key={role.title} className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                      <p className="text-sm font-bold text-[var(--text-primary)]">{role.title}</p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">{role.location}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Values Tab */}
      {activeTab === "values" && (
        <section className="section-shell">
          <div className="container">
            <SectionReveal>
              <p className="eyebrow">Core principles</p>
              <h2 className="section-title">What we believe in.</h2>
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {COMPANY_VALUES.map((value) => (
                  <Card key={value.title} className="p-8">
                    <h3 className="text-3xl font-black tracking-[-0.04em] text-[var(--brand)]">{value.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{value.description}</p>
                  </Card>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Press Tab */}
      {activeTab === "press" && (
        <section className="section-shell">
          <div className="container">
            <SectionReveal>
              <p className="eyebrow">Media & Press</p>
              <h2 className="section-title">Bavio in the news.</h2>
              <div className="mt-12 space-y-5">
                {mediaLinks.map((item) => (
                  <Card key={item.outlet} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">{item.outlet}</p>
                        <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">{item.headline}</h3>
                      </div>
                      <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--text-muted)]" />
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-10">
                <Card className="p-8">
                  <p className="eyebrow">Media kit</p>
                  <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Press resources</h3>
                  <p className="mt-4 text-sm text-[var(--text-secondary)]">
                    Download our logo package, brand guidelines, founder photos, and product screenshots for editorial use.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["Brand assets (.zip)", "Founder bios (.pdf)", "Product screenshots", "Press contact"].map((item) => (
                      <span key={item} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--text-secondary)] cursor-pointer transition hover:border-[var(--border-brand)] hover:text-[var(--text-primary)]">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-[var(--text-muted)]">Press inquiries: press@bavio.in</p>
                </Card>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}
    </div>
  );
}
