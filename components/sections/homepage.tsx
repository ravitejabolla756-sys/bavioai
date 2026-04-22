"use client";

import Link from "next/link";
import { Check, ChevronRight, CirclePlay, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";

const industries = [
  { code: "RE", name: "Real Estate", description: "Qualify buyers, capture budget and location, and book site visits even after business hours.", tags: ["Capture Lead", "Qualify", "Book Visit"] },
  { code: "HC", name: "Clinics & Hospitals", description: "Book appointments, answer FAQs, and send reminders without hiring extra front-desk staff.", tags: ["Verify Patient", "Book Slot", "Send Reminder"] },
  { code: "ED", name: "EdTech & Coaching", description: "Convert enquiries instantly and schedule demos while your counsellors focus on closing.", tags: ["Capture Lead", "Schedule Demo", "Follow Up"] },
  { code: "RS", name: "Restaurants", description: "Take reservations, answer menu questions, and confirm group bookings automatically.", tags: ["Check Tables", "Confirm Time", "Send SMS"] },
  { code: "SV", name: "Service Businesses", description: "Capture every lead while your team is out on jobs and route urgent issues quickly.", tags: ["Triage Issue", "Find Tech", "Dispatch"] },
  { code: "EC", name: "E-Commerce", description: "Resolve order tracking, returns, and support FAQs without putting buyers on hold.", tags: ["Lookup Order", "Resolve Auto", "Route"] }
];

const pricingPlans = [
  { name: "Starter", monthly: 1999, yearly: 1599, description: "For individual SMBs getting live in under 10 minutes.", features: ["200 minutes included", "Hindi + English + Hinglish", "WhatsApp lead alerts", "Basic analytics"] },
  { name: "Growth", monthly: 3999, yearly: 3199, description: "For teams that need CRM sync and more call capacity.", features: ["500 minutes included", "CRM + Google Sheets sync", "Advanced analytics", "WhatsApp support"], featured: true },
  { name: "Scale", monthly: 7999, yearly: 6399, description: "For multi-number teams with deeper customization.", features: ["1,500 minutes included", "Custom AI persona", "Priority onboarding", "Dedicated support"] }
];

const trustLogos = ["Sarvam AI", "Exotel", "Supabase", "Dodo Payments", "Razorpay", "WhatsApp Business"];

const comparisonRows = [
  ["Available 24/7", "9-6 only", "No", "Yes"],
  ["Speaks Hindi/Hinglish", "Maybe", "No", "Yes"],
  ["Captures lead data", "Unreliable", "No", "Always"],
  ["WhatsApp alerts", "Manual", "No", "Instant"],
  ["Books appointments", "Maybe", "No", "Automatic"],
  ["Monthly cost", "INR 8,000-15,000", "INR 5,000+", "INR 1,999"],
  ["Setup time", "Weeks", "Days", "10 minutes"]
];

const useCaseOptions = [
  {
    label: "Healthcare",
    title: "Never miss a patient booking again.",
    body: "Bavio answers in Hindi or English, verifies patient details, and books the right slot without sending callers through a rigid IVR tree.",
    transcript: [
      "Caller: Namaste, kal dentist appointment mil sakta hai?",
      "Bavio: Bilkul. Aap morning prefer karenge ya evening?",
      "Caller: Evening.",
      "Bavio: 6:30 PM available hai. Main confirm kar doon?"
    ],
    metrics: ["24/7 booking", "Lower front-desk load", "Reminder automation"]
  },
  {
    label: "Real Estate",
    title: "Qualify every buyer lead while you're on site.",
    body: "Capture budget, location, timeline, and callback availability instantly so the right agent follows up with context already in hand.",
    transcript: [
      "Caller: 2BHK Hyderabad mein chahiye, budget 60 lakh.",
      "Bavio: Gachibowli, Kondapur, ya Madhapur prefer karenge?",
      "Caller: Gachibowli. Ready to move chahiye.",
      "Bavio: Noted. Aaj 3 options ke saath agent WhatsApp karega."
    ],
    metrics: ["Faster response", "Lead quality uplift", "Visit booking"]
  },
  {
    label: "Support",
    title: "Resolve repetitive calls before humans step in.",
    body: "Order status, appointment queries, and simple FAQs are handled instantly so your support team only sees the cases that need judgment.",
    transcript: [
      "Caller: Mera order kab deliver hoga?",
      "Bavio: Aapka order dispatch ho chuka hai aur kal tak deliver ho jayega.",
      "Caller: Return initiate karna hai.",
      "Bavio: Main abhi WhatsApp pe return link bhej raha hoon."
    ],
    metrics: ["Lower wait times", "Higher CSAT", "Less agent load"]
  }
];

export function Homepage() {
  const [selectedUseCase, setSelectedUseCase] = useState(useCaseOptions[1]);
  const [callsPerDay, setCallsPerDay] = useState(25);
  const [dealValue, setDealValue] = useState("50000");
  const [industry, setIndustry] = useState("Real Estate");
  const [yearly, setYearly] = useState(false);

  const roi = useMemo(() => {
    const missedCalls = Math.max(1, Math.round(callsPerDay * 0.6));
    const monthlyLostLeads = missedCalls * 26;
    const potentialRevenue = monthlyLostLeads * Number(dealValue) * 0.18;
    const planCost = yearly ? 1599 : 1999;
    const roiReturn = Math.max(1, Math.round(potentialRevenue / planCost));

    return { missedCalls, monthlyLostLeads, potentialRevenue, planCost, roiReturn };
  }, [callsPerDay, dealValue, yearly]);

  return (
    <div className="bg-[var(--bg-base)]">
      <section className="relative min-h-screen overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-5" />
        <div className="hero-noise absolute inset-0 opacity-100 mix-blend-overlay" />
        <div className="absolute left-1/2 top-[15%] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,47,190,0.25),transparent_70%)] blur-[100px]" />
        <div className="container relative z-[1] mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-[0.55fr_0.45fr] lg:px-12">
          <div className="flex flex-col justify-center">
            <Badge variant="success" className="gap-2 bg-[rgba(34,197,94,0.08)] px-4 py-2 text-[13px] text-[var(--text-primary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
              Now live for Indian businesses
            </Badge>
            <h1 
              className="mt-7 font-heading text-[clamp(46px,8vw,90px)] font-[800] leading-[0.92] tracking-[-0.05em] text-[#F9F6FF]"
              style={{ textShadow: "0 0 40px rgba(168,85,247,0.25)" }}
            >
              Never miss a
              <br />
              <span className="bg-[linear-gradient(135deg,#7B2FBE_0%,#A855F7_100%)] bg-clip-text text-transparent">business call.</span>
              <br />
              <span style={{ color: "#B4A8D4" }}>Ever.</span>
            </h1>
            <p className="mt-7 max-w-[620px] text-[18px] leading-[1.8] text-[var(--text-secondary)]">
              Bavio gives your business an AI voice assistant that answers every call in Hindi or English, qualifies leads,
              books appointments, and sends you a WhatsApp alert. Starts at INR 1,999/month.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Start Free Trial
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="#live-demo">
                  <CirclePlay className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["<500ms", "Voice response latency"],
                ["24/7", "Always answering"],
                ["60%", "Indian calls go unanswered"],
                ["INR 1.32", "Your cost per minute"]
              ].map(([value, label]) => (
                <Card key={label} className="p-5">
                  <p className="text-2xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{label}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -left-6 top-4 z-10 rounded-[12px] border border-[var(--border-solid)] bg-[rgba(18,16,43,0.8)] px-4 py-2 text-sm text-[var(--text-secondary)] backdrop-blur-md shadow-lg">
              <span className="text-[var(--accent-green)] font-semibold">45ms</span> latency
            </div>
            <div className="absolute -bottom-4 right-0 z-10 rounded-[12px] border border-[var(--border-solid)] bg-[rgba(18,16,43,0.8)] px-4 py-2 text-sm text-[var(--accent-green)] font-medium backdrop-blur-md shadow-lg">
              Appointment confirmed
            </div>
            <Card id="live-demo" className="relative overflow-hidden rounded-[12px] border border-[#2D2560] bg-[rgba(18,16,43,0.7)] p-8 shadow-[0_0_40px_rgba(123,47,190,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(123,47,190,0.25)] backdrop-blur-[20px]">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,transparent,#A855F7,transparent)]" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-muted)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  Live Call - Real Estate Lead
                </div>
                <span className="text-[13px] font-mono text-[var(--text-muted)]">00:47</span>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-4">
                  {[
                    { speaker: "Caller", copy: "Bhai, 2BHK chahiye Hyderabad mein, budget 60 lakhs hai", tone: "bg-transparent text-[#B4A8D4]" },
                    { speaker: "Bavio", copy: "Bilkul! Location preference kya hai - Gachibowli, Kondapur, ya Madhapur?", tone: "border border-[var(--border-brand)] bg-[rgba(123,47,190,0.1)] text-[#F9F6FF] shadow-sm shadow-[rgba(123,47,190,0.05)]" },
                    { speaker: "Caller", copy: "Gachibowli prefer karunga, ready to move chahiye", tone: "bg-transparent text-[#B4A8D4]" },
                    { speaker: "Bavio", copy: "Perfect. Naam aur number note kar leta hoon - agent aaj shaam 3 options ke saath contact karega.", tone: "border border-[var(--border-brand)] bg-[rgba(123,47,190,0.1)] text-[#F9F6FF] shadow-sm shadow-[rgba(123,47,190,0.05)]" }
                  ].map((message) => (
                    <div key={message.copy} className={`rounded-[12px] p-4 text-[14px] leading-relaxed transition-colors ${message.tone}`}>
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B5F94]">{message.speaker}</p>
                      {message.copy}
                    </div>
                  ))}
                </div>

                <div className="rounded-[12px] border border-[#2D2560] bg-[rgba(13,13,26,0.5)] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A855F7]">AI Actions</p>
                  <div className="mt-5 space-y-4">
                    {[
                      ["Call received and answered", "0.3s", "done"],
                      ["Language detected - Hinglish", "0.4s", "done"],
                      ["Intent - property inquiry", "0.8s", "done"],
                      ["Budget captured - INR 60L", "12s", "done"],
                      ["Lead saved to database", "now", "live"],
                      ["WhatsApp alert to agent", "pending", "pending"]
                    ].map(([label, time, state]) => (
                      <div key={label} className="flex items-start justify-between gap-3 text-sm">
                        <div className="flex items-start gap-3">
                          <span className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border ${state === "done" ? "border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.12)] text-[var(--accent-green)]" : state === "live" ? "border-[var(--border-brand)] bg-[var(--brand-subtle)] text-[var(--brand)]" : "border-[var(--border-base)] bg-[var(--bg-overlay)] text-[var(--text-muted)]"}`}>
                            {state === "done" ? <Check className="h-3 w-3" /> : <span className="text-lg leading-none">.</span>}
                          </span>
                          <span className="text-[var(--text-secondary)]">{label}</span>
                        </div>
                        <span className="text-[var(--text-muted)]">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-base)] py-6">
        <div className="container">
          <p className="text-center text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">Powered by India's best infrastructure</p>
          <div className="mt-5 flex overflow-hidden">
            <div className="flex min-w-max animate-[marquee_26s_linear_infinite] gap-4">
              {[...trustLogos, ...trustLogos].map((logo, index) => (
                <div key={`${logo}-${index}`} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)]">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <SectionReveal className="section-header">
            <span className="eyebrow">Built for India</span>
            <h2 className="section-title">Every missed call is lost money.</h2>
            <p className="section-sub">Indian businesses lose thousands of leads every day because no one picked up. Bavio fixes that.</p>
          </SectionReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <SectionReveal key={industry.name}>
                <Card className="h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--brand-subtle)] text-sm font-black text-[var(--brand)]">
                    {industry.code}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">{industry.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{industry.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {industry.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <Card className="p-8 md:p-10">
            <div className="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
              {/* ── Left: Inputs ── */}
              <div>
                <p className="eyebrow">ROI Calculator</p>
                <h2 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">See how much you're losing.</h2>
                <div className="mt-8 space-y-7">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Calls per day</span>
                      <span className="font-semibold text-[var(--brand)]">{callsPerDay}</span>
                    </div>
                    <input type="range" min={5} max={100} value={callsPerDay} onChange={(event) => setCallsPerDay(Number(event.target.value))} className="w-full accent-[var(--brand)]" />
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-[var(--text-secondary)]">Average deal value</div>
                    <select value={dealValue} onChange={(event) => setDealValue(event.target.value)} className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]">
                      <option value="10000">INR 10K</option>
                      <option value="50000">INR 50K</option>
                      <option value="100000">INR 1L</option>
                      <option value="500000">INR 5L+</option>
                    </select>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-[var(--text-secondary)]">Industry</div>
                    <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]">
                      {industries.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Right: Results — fixed height, zero layout shift ── */}
              <div
                className="flex flex-col justify-between"
                style={{ height: "420px", minHeight: "420px", maxHeight: "420px", overflow: "hidden" }}
              >
                {/* Card 1 — Missed calls */}
                <div
                  className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] transition-all duration-300 ease-out"
                  style={{ height: "72px", minHeight: "72px", maxHeight: "72px", padding: "0 24px" }}
                >
                  <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[55%]">
                    At a 60% miss rate before automation
                  </span>
                  <span className="text-lg font-black tracking-[-0.04em] text-[var(--brand)] whitespace-nowrap transition-all duration-300 ease-out">
                    ~{roi.missedCalls} missed calls/day
                  </span>
                </div>

                {/* Card 2 — Lost leads */}
                <div
                  className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] transition-all duration-300 ease-out"
                  style={{ height: "72px", minHeight: "72px", maxHeight: "72px", padding: "0 24px" }}
                >
                  <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[55%]">
                    {industry} loses this momentum fast
                  </span>
                  <span className="text-lg font-black tracking-[-0.04em] text-[var(--text-primary)] whitespace-nowrap transition-all duration-300 ease-out">
                    {formatNumber(roi.monthlyLostLeads)} leads/mo
                  </span>
                </div>

                {/* Card 3 — Revenue lost */}
                <div
                  className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] transition-all duration-300 ease-out"
                  style={{ height: "72px", minHeight: "72px", maxHeight: "72px", padding: "0 24px" }}
                >
                  <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[55%]">
                    Opportunity cost from unanswered calls
                  </span>
                  <span className="text-lg font-black tracking-[-0.04em] text-red-400 whitespace-nowrap transition-all duration-300 ease-out">
                    -{formatCurrency(roi.potentialRevenue)}/mo
                  </span>
                </div>

                {/* Card 4 — Plan cost */}
                <div
                  className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] transition-all duration-300 ease-out"
                  style={{ height: "72px", minHeight: "72px", maxHeight: "72px", padding: "0 24px" }}
                >
                  <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[55%]">
                    Starter plan — India pricing
                  </span>
                  <span className="text-lg font-black tracking-[-0.04em] text-[var(--brand)] whitespace-nowrap transition-all duration-300 ease-out">
                    {formatCurrency(roi.planCost)}/mo
                  </span>
                </div>

                {/* Card 5 — ROI */}
                <div
                  className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] transition-all duration-300 ease-out"
                  style={{ height: "72px", minHeight: "72px", maxHeight: "72px", padding: "0 24px" }}
                >
                  <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[55%]">
                    Based on recovered calls &amp; better follow-up
                  </span>
                  <span className="text-lg font-black tracking-[-0.04em] text-[var(--accent-green)] whitespace-nowrap transition-all duration-300 ease-out">
                    {roi.roiReturn}x ROI
                  </span>
                </div>

                {/* CTA — always at bottom */}
                <Button asChild size="lg" className="w-full" style={{ height: "44px", minHeight: "44px" }}>
                  <Link href="/sign-up">Stop losing money — Start free</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header">
            <span className="eyebrow">From zero to live</span>
            <h2 className="section-title">4 steps. Under 10 minutes.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {[
              ["01", "Sign Up", "Create your account in 30 seconds. No credit card."],
              ["02", "Configure AI", "Tell Bavio your business name, language, and industry."],
              ["03", "Get Your Number", "A dedicated Indian mobile number is assigned instantly."],
              ["04", "Go Live", "AI answers every call and you get WhatsApp alerts instantly."]
            ].map(([number, title, copy]) => (
              <Card key={title} className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-sm font-bold text-[var(--brand)]">
                  {number}
                </div>
                <h3 className="mt-5 text-xl font-bold text-[var(--text-primary)]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header">
            <span className="eyebrow">Use cases</span>
            <h2 className="section-title">Your business logic, translated into every call.</h2>
          </SectionReveal>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {useCaseOptions.map((item) => (
              <button key={item.label} type="button" onClick={() => setSelectedUseCase(item)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedUseCase.label === item.label ? "border-transparent bg-[var(--brand)] text-black" : "border-[var(--border-base)] bg-[var(--bg-raised)] text-[var(--text-secondary)]"}`}>
                {item.label}
              </button>
            ))}
          </div>
          <Card className="mt-10 p-8">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="eyebrow">{selectedUseCase.label}</p>
                <h3 className="text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{selectedUseCase.title}</h3>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{selectedUseCase.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedUseCase.metrics.map((metric) => (
                    <span key={metric} className="rounded-full border border-[rgba(34,197,94,0.18)] bg-[rgba(34,197,94,0.08)] px-4 py-2 text-sm font-semibold text-[var(--accent-green)]">
                      {metric}
                    </span>
                  ))}
                </div>
                <Button asChild className="mt-8">
                  <Link href="/use-cases">Learn more</Link>
                </Button>
              </div>
              <div className="rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Live conversation</p>
                <div className="mt-5 space-y-3">
                  {selectedUseCase.transcript.map((line, index) => (
                    <div key={line} className={`rounded-[16px] px-4 py-3 text-sm leading-7 ${index % 2 === 0 ? "bg-[var(--bg-overlay)] text-[var(--text-secondary)]" : "border border-[var(--border-brand)] bg-[var(--brand-subtle)] text-[var(--text-primary)]"}`}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header">
            <span className="eyebrow">Simple pricing</span>
            <h2 className="section-title">Pay for what you use.</h2>
            <p className="section-sub">Hybrid pricing with a monthly base and minute-based overage for extra usage.</p>
          </SectionReveal>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] p-1">
              <button type="button" onClick={() => setYearly(false)} className={`rounded-full px-4 py-2 text-sm font-medium ${!yearly ? "bg-[var(--brand)] text-black" : "text-[var(--text-secondary)]"}`}>Monthly</button>
              <button type="button" onClick={() => setYearly(true)} className={`rounded-full px-4 py-2 text-sm font-medium ${yearly ? "bg-[var(--brand)] text-black" : "text-[var(--text-secondary)]"}`}>Yearly</button>
            </div>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`p-6 ${plan.featured ? "border-[var(--border-brand)] bg-[rgba(123,47,190,0.06)]" : ""}`}>
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">{plan.name}</p>
                <p className="mt-4 text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">
                  INR {formatNumber(yearly ? plan.yearly : plan.monthly)}
                  <span className="ml-1 text-base font-medium text-[var(--text-muted)]">/mo</span>
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{plan.description}</p>
                <div className="mt-5 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      <Check className="h-4 w-4 text-[var(--accent-green)]" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button asChild variant={plan.featured ? "default" : "ghost"} className="mt-6 w-full">
                  <Link href="/pricing">{plan.featured ? "Start Free Trial" : "Learn More"}</Link>
                </Button>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">All prices in Indian Rupees. Cancel anytime. No setup fees.</p>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header">
            <span className="eyebrow">Comparison</span>
            <h2 className="section-title">Replace your old setup.</h2>
          </SectionReveal>
          <div className="mt-10 overflow-hidden rounded-[20px] border border-[var(--border-base)]">
            <div className="grid grid-cols-4 bg-[var(--bg-overlay)] px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">
              <span>Feature</span>
              <span>Human Receptionist</span>
              <span>Old IVR</span>
              <span className="border-l border-[var(--border-brand)] pl-4 text-[var(--brand)]">Bavio AI</span>
            </div>
            {comparisonRows.map(([feature, human, ivr, bavio], index) => (
              <div key={feature} className={`grid grid-cols-4 px-6 py-4 text-sm ${index % 2 === 0 ? "bg-[var(--bg-raised)]" : "bg-[var(--bg-base)]"}`}>
                <span className="font-medium text-[var(--text-primary)]">{feature}</span>
                <span className="text-[var(--text-secondary)]">{human}</span>
                <span className="text-[var(--text-secondary)]">{ivr}</span>
                <span className="border-l border-[var(--border-brand)] pl-4 font-semibold text-[var(--brand)]">{bavio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(circle_at_center,rgba(123,47,190,0.16),transparent_65%)]" />
        <div className="container relative z-[1] text-center">
          <Badge className="mx-auto bg-[var(--brand-subtle)] text-[var(--brand)]">Your business never sleeps</Badge>
          <h2 className="mt-6 font-heading text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">Neither does Bavio.</h2>
          <p className="mx-auto mt-5 max-w-[720px] text-lg leading-8 text-[var(--text-secondary)]">
            Join hundreds of Indian businesses who stopped missing calls and started converting every lead.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/contact">Talk to us on WhatsApp</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
            {["No credit card required", "Setup in 60 seconds", "Cancel anytime"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--brand)]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
