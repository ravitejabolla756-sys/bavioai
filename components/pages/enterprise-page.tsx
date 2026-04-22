"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, ChevronRight, Globe, Lock, Server, Shield, Sparkles, Users } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ENTERPRISE_FEATURES } from "@/lib/constants";

const complianceBadges = [
  { label: "SOC 2 Ready", color: "text-blue-400 border-blue-400/30 bg-blue-400/08" },
  { label: "HIPAA Ready", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/08" },
  { label: "GDPR", color: "text-purple-400 border-purple-400/30 bg-purple-400/08" },
  { label: "India DPDP", color: "text-orange-400 border-orange-400/30 bg-orange-400/08" },
  { label: "AES-256", color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/08" },
  { label: "TLS 1.3", color: "text-pink-400 border-pink-400/30 bg-pink-400/08" }
];

const enterpriseCustomers = [
  { logo: "MH", name: "MedPlus Health", vertical: "Healthcare" },
  { logo: "PV", name: "PropVista Realty", vertical: "Real Estate" },
  { logo: "ER", name: "EduReach Platform", vertical: "EdTech" }
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Security & Compliance": <Lock className="h-5 w-5" />,
  "Scale & Infrastructure": <Server className="h-5 w-5" />,
  "Identity & Access": <Shield className="h-5 w-5" />,
  "Implementation & Support": <Users className="h-5 w-5" />
};

export function EnterprisePage() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", callVolume: "", useCase: "", timeline: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-24">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute left-1/3 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,47,190,0.12),transparent_65%)] blur-3xl" />
        <div className="absolute right-1/4 top-20 h-[300px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08),transparent_65%)] blur-3xl" />
        <div className="container relative z-[1]">
          <SectionReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {complianceBadges.map((badge) => (
                <span key={badge.label} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider ${badge.color}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {badge.label}
                </span>
              ))}
            </div>
            <h1 className="page-hero-title max-w-4xl">
              Enterprise Voice AI{" "}
              <span className="text-gradient">Built for Scale,</span>
              <br />Built for Security.
            </h1>
            <p className="page-hero-copy max-w-3xl">
              Deploy Bavio in critical business operations with the security governance, regulatory compliance, and implementation support that enterprise teams actually require — not just promise.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#contact-sales">
                  Contact Enterprise Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/legal/security">
                  Review Security Documentation
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["99.99%", "Uptime SLA"],
                ["<420ms", "Voice latency"],
                ["Unlimited", "Concurrent calls"],
                ["48 hrs", "Onboarding SLA"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-5 py-4 text-center">
                  <p className="text-2xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Enterprise platform</span>
            <h2 className="section-title">Everything a zero-compromise deployment needs.</h2>
            <p className="section-sub mx-auto">
              From governance and compliance to dedicated infrastructure and white-glove onboarding — every enterprise requirement is fully addressed.
            </p>
          </SectionReveal>
          <div className="mt-14 grid gap-6 xl:grid-cols-2">
            {ENTERPRISE_FEATURES.map((section) => (
              <SectionReveal key={section.category}>
                <Card className="h-full p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-base)] bg-[var(--brand-glow-soft)] text-[var(--brand)]">
                      {categoryIcons[section.category]}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">{section.icon}</p>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{section.category}</h3>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {section.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-green)]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Implementation</span>
            <h2 className="section-title">From contract to live calls in 14 days.</h2>
          </SectionReveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {[
              { step: "01", title: "Security review", copy: "We walk your IT and security team through architecture, data handling, and compliance documentation." },
              { step: "02", title: "Workflow mapping", copy: "A dedicated implementation engineer maps your call flows, integrations, and escalation rules with your team." },
              { step: "03", title: "Voice training", copy: "Custom voice persona trained on your brand language, tone, and industry-specific knowledge base." },
              { step: "04", title: "Go live", copy: "Staged rollout from sandbox to production. Real-time support through your dedicated Slack channel." }
            ].map((item) => (
              <SectionReveal key={item.step}>
                <Card className="relative h-full p-7">
                  <p className="text-5xl font-black tracking-[-0.05em] text-[var(--brand)] opacity-30">{item.step}</p>
                  <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.copy}</p>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="section-shell pt-0">
        <div className="container">
          <Card className="overflow-hidden p-0">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-[var(--border-base)] p-8 lg:border-b-0 lg:border-r">
                <span className="eyebrow">Trusted by teams</span>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                  Enterprise customers who chose Bavio don't go back.
                </h2>
                <div className="mt-8 space-y-4">
                  {enterpriseCustomers.map((customer) => (
                    <div key={customer.name} className="flex items-center gap-4 rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,var(--brand),#A855F7)] text-sm font-black text-black">
                        {customer.logo}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{customer.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{customer.vertical}</p>
                      </div>
                      <Check className="ml-auto h-4 w-4 text-[var(--accent-green)]" />
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    [<Globe key="g" className="h-4 w-4" />, "India-first infrastructure"],
                    [<Shield key="s" className="h-4 w-4" />, "TRAI compliant campaigns"],
                    [<Sparkles key="sp" className="h-4 w-4" />, "No vendor lock-in"],
                    [<Server key="sv" className="h-4 w-4" />, "Indian data residency"]
                  ].map(([icon, label]) => (
                    <div key={String(label)} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--brand)]">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 md:p-10" id="contact-sales">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center text-center py-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-glow-soft)] text-3xl">🎉</div>
                    <h3 className="mt-6 text-2xl font-black text-[var(--text-primary)]">Request received.</h3>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      Our enterprise team will reach out within 4 business hours to schedule your security review and discovery call.
                    </p>
                    <p className="mt-2 text-xs text-[var(--text-muted)]">hello@bavio.in | WhatsApp for urgent queries</p>
                  </div>
                ) : (
                  <>
                    <p className="eyebrow">Contact enterprise sales</p>
                    <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                      Tell us about your operation.
                    </h3>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      We respond within 4 business hours with a tailored recommendation and security documentation.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">Full Name*</label>
                          <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)] focus:outline-none"
                            placeholder="Rajesh Kumar" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">Company*</label>
                          <input required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)] focus:outline-none"
                            placeholder="Acme Corp India" />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">Work Email*</label>
                          <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)] focus:outline-none"
                            placeholder="you@company.in" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">Phone number</label>
                          <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)] focus:outline-none"
                            placeholder="+91 98000 00000" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">Monthly call volume*</label>
                        <select required value={formData.callVolume} onChange={(e) => setFormData({ ...formData, callVolume: e.target.value })}
                          className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] focus:border-[var(--brand)] focus:outline-none">
                          <option value="">Select estimated volume</option>
                          <option value="1k-5k">1,000 – 5,000 calls/month</option>
                          <option value="5k-25k">5,000 – 25,000 calls/month</option>
                          <option value="25k-100k">25,000 – 100,000 calls/month</option>
                          <option value="100k+">100,000+ calls/month</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">Primary use case*</label>
                        <select required value={formData.useCase} onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                          className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] focus:border-[var(--brand)] focus:outline-none">
                          <option value="">Select your vertical</option>
                          <option value="healthcare">Healthcare / Clinics</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="bfsi">BFSI / Lending</option>
                          <option value="edtech">EdTech</option>
                          <option value="d2c">D2C / E-commerce</option>
                          <option value="enterprise-support">Enterprise Customer Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">Implementation timeline</label>
                        <select value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] focus:border-[var(--brand)] focus:outline-none">
                          <option value="">When do you want to go live?</option>
                          <option value="asap">As soon as possible</option>
                          <option value="1month">Within 1 month</option>
                          <option value="3months">Within 3 months</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Request Enterprise Review
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <p className="text-center text-xs text-[var(--text-muted)]">
                        Response within 4 business hours. No spam — ever.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-[radial-gradient(circle_at_center,rgba(123,47,190,0.14),transparent_68%)]" />
        <div className="container relative z-[1] text-center">
          <h2 className="section-title">Not sure if enterprise is right for your team?</h2>
          <p className="section-sub mx-auto">
            Start on our Professional plan and upgrade when you need. No migration headaches.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/sign-up">Start free on Professional</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/pricing">Compare all plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
