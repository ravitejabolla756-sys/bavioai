"use client";

import Link from "next/link";
import { Award, ExternalLink, Github, ShieldCheck, Star } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Card } from "@/components/ui/card";

const customerLogos = [
  "MedCenter Clinic",
  "UrbanEstate",
  "Casa Verde",
  "CloudNest",
  "FixFast",
  "EduReach",
  "NorthGrid",
  "Astra Health"
];

const testimonials = [
  {
    quote: "Bavio turned our phone line into a reliable intake channel instead of a daily bottleneck.",
    name: "Dr. Meera Iyer",
    role: "Operations Director",
    company: "MedCenter Clinic"
  },
  {
    quote: "Every inbound lead now arrives with transcript, intent, and next action already captured.",
    name: "Kabir Sethi",
    role: "Growth Lead",
    company: "UrbanEstate"
  },
  {
    quote: "The deployment felt operationally serious from day one: analytics, fallback paths, and human handoff all worked.",
    name: "Ananya Rao",
    role: "CX Head",
    company: "CloudNest"
  }
];

const caseStudyProof = [
  ["Healthcare", "78% fewer missed appointments", "MedCenter Clinic"],
  ["Real Estate", "2.3x more qualified call outcomes", "UrbanEstate Group"],
  ["Field Service", "41% faster dispatch conversion", "FixFast Field Ops"]
];

const pressMentions = ["The Economic Times", "YourStory", "SaaSBOOMi", "Voicebot.ai"];
const awards = ["Product Hunt Launch Candidate", "SaaSBOOMi Startup Circle", "India AI Builder Award", "Enterprise Voice AI Watchlist"];
const investors = ["Founder Operators Network", "AI Infrastructure Angels", "B2B SaaS Leaders Circle", "Early Design Partners"];

export function CustomerLogosBar({ className = "" }: { className?: string }) {
  return (
    <section className={`border-y border-[var(--border-base)] bg-[var(--bg2)] py-6 ${className}`}>
      <div className="container">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          Trusted by teams handling real customer calls
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {customerLogos.map((logo) => (
            <div key={logo} className="rounded-[10px] border border-[var(--border-base)] bg-[var(--card)] px-4 py-3 text-center text-sm font-semibold text-[var(--text-secondary)]">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialQuotes() {
  return (
    <section className="section-shell pt-0">
      <div className="container">
        <SectionReveal className="section-header text-center">
          <span className="eyebrow">Customer proof</span>
          <h2 className="section-title">Operators trust Bavio with revenue-critical calls.</h2>
        </SectionReveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="p-6">
              <div className="mb-4 flex gap-1 text-[var(--accent)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-7 text-[var(--text-secondary)]">"{item.quote}"</p>
              <div className="mt-6 border-t border-[var(--border-base)] pt-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {item.role}, {item.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyProofGrid() {
  return (
    <section className="section-shell pt-0">
      <div className="container">
        <SectionReveal className="section-header text-center">
          <span className="eyebrow">Case studies</span>
          <h2 className="section-title">Proof by workflow, not just category.</h2>
        </SectionReveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {caseStudyProof.map(([industry, metric, company]) => (
            <Card key={company} className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{industry}</p>
              <p className="mt-3 text-2xl font-black text-[var(--accent-green)]">{metric}</p>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{company}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid gap-3 sm:grid-cols-2"}>
      {["G2 High Performer", "Product Hunt Featured"].map((label) => (
        <Link
          key={label}
          href="/customers"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          {label}
        </Link>
      ))}
    </div>
  );
}

export function PressMentions() {
  return (
    <section className="section-shell pt-0">
      <div className="container">
        <SectionReveal className="section-header text-center">
          <span className="eyebrow">Press mentions</span>
          <h2 className="section-title">Recognized by startup, SaaS, and voice AI communities.</h2>
        </SectionReveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pressMentions.map((name) => (
            <div key={name} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--card)] px-4 py-4 text-center text-sm font-semibold text-[var(--text-secondary)]">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsGrid() {
  return (
    <section className="section-shell pt-0">
      <div className="container">
        <SectionReveal className="section-header text-center">
          <span className="eyebrow">Awards and recognitions</span>
          <h2 className="section-title">Signals that reduce evaluation risk.</h2>
        </SectionReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award) => (
            <Card key={award} className="p-5">
              <Award className="h-5 w-5 text-[var(--accent)]" />
              <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">{award}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InvestorLogoBar() {
  return (
    <section className="section-shell pt-0">
      <div className="container">
        <SectionReveal className="section-header text-center">
          <span className="eyebrow">Investor network</span>
          <h2 className="section-title">Backed by operators who understand B2B infrastructure.</h2>
        </SectionReveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {investors.map((item) => (
            <div key={item} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-4 py-3 text-center text-sm text-[var(--text-secondary)]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GithubStars() {
  return (
    <Card className="mt-10 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Developer trust</p>
          <h2 className="text-2xl font-black text-[var(--text-primary)]">API examples and SDKs are public for evaluation.</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Track docs, SDK examples, and integration helpers through the public developer surface.</p>
        </div>
        <Link href="https://github.com/bavio-ai" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-[var(--border-base)] px-4 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
          <Github className="h-4 w-4" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
}
