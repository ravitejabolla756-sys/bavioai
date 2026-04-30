"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Globe, Lock, Server, ShieldCheck, Users } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { CustomerLogosBar, TestimonialQuotes } from "@/components/shared/trust-elements";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const securityItems = [
  "SOC 2 Type II certification in progress (target: October 2026)",
  "HIPAA compliance support with BAA workflows",
  "GDPR controls",
  "India DPDP alignment",
  "Data residency options",
  "AES-256 encryption at rest, TLS 1.3 in transit",
  "Annual penetration testing with published summary",
  "Responsible disclosure and bug bounty program",
  "Immutable audit logs"
];

const scaleItems = [
  "Unlimited concurrent calls",
  "Dedicated infrastructure options",
  "99.9% uptime SLA",
  "Custom failover policies",
  "Geo-redundant deployment"
];

const enterpriseFeatures = [
  "Custom SSO (SAML, OKTA, Azure AD)",
  "Granular RBAC permissions",
  "Multi-team workspace management",
  "Dedicated Slack support channel",
  "Custom legal and procurement contracts"
];

const implementationItems = [
  "Dedicated implementation engineer",
  "Custom voice training and tuning",
  "White-glove onboarding",
  "24/7 support and escalation"
];

const enterpriseCustomers = ["MedCenter Group", "NorthGrid Finance", "Astra Health Systems", "Nova FieldOps"];

const caseStudies = [
  {
    company: "Astra Health Systems",
    metric: "52% fewer missed inbound calls",
    quote: "Bavio became a secure, always-on intake layer across our multi-clinic network."
  },
  {
    company: "NorthGrid Finance",
    metric: "2.1x improvement in qualified call outcomes",
    quote: "The combination of governance and automation made deployment easy for compliance and operations teams."
  }
];

export function EnterprisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    monthlyCallVolume: "",
    useCase: "",
    timeline: ""
  });

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[var(--bg-base)]">
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Enterprise</p>
            <h1 className="page-hero-title max-w-5xl">
              Enterprise Voice AI Infrastructure - Built for Scale, Built for Security.
            </h1>
            <p className="page-hero-copy max-w-3xl">
              Deploy voice AI in mission-critical operations with enterprise-grade reliability, compliance controls, and implementation support.
            </p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">99.9% uptime SLA with incident transparency and escalation workflows.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#contact-enterprise">
                  Contact Enterprise Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/legal/security">Book a Security Review</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CustomerLogosBar />

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[var(--brand)]" />
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Security and Compliance</h2>
            </div>
            <div className="mt-6 space-y-3">
              {securityItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent-green)]" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3">
              <Server className="h-5 w-5 text-[var(--brand)]" />
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Scale</h2>
            </div>
            <div className="mt-6 space-y-3">
              {scaleItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent-green)]" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-[var(--brand)]" />
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Enterprise Features</h2>
            </div>
            <div className="mt-6 space-y-3">
              {enterpriseFeatures.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent-green)]" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[var(--brand)]" />
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Implementation</h2>
            </div>
            <div className="mt-6 space-y-3">
              {implementationItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent-green)]" />
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Trust</span>
            <h2 className="section-title">Trusted by enterprise operations teams.</h2>
          </SectionReveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {enterpriseCustomers.map((name) => (
              <div key={name} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-4 py-3 text-center text-sm font-semibold text-[var(--text-secondary)]">
                {name}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {caseStudies.map((item) => (
              <Card key={item.company} className="p-6">
                <p className="text-xl font-black text-[var(--text-primary)]">{item.company}</p>
                <p className="mt-2 text-sm font-semibold text-[var(--accent-green)]">{item.metric}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">"{item.quote}"</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="ghost">
              <Link href="/legal/security">
                <Globe className="mr-2 h-4 w-4" />
                Book a Security Review
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <TestimonialQuotes />

      <section className="section-shell pt-0" id="contact-enterprise">
        <div className="container max-w-3xl">
          <Card className="p-8 md:p-10">
            {submitted ? (
              <div className="py-10 text-center">
                <h3 className="text-3xl font-black text-[var(--text-primary)]">Request received.</h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Our enterprise team will contact you shortly to schedule discovery and security review.
                </p>
              </div>
            ) : (
              <>
                <p className="eyebrow">Enterprise inquiry</p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Contact Enterprise Sales</h3>
                <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Name"
                      className="h-11 rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
                    />
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Company"
                      className="h-11 rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
                    />
                  </div>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Work email"
                    className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
                  />
                  <select
                    required
                    value={form.monthlyCallVolume}
                    onChange={(e) => setForm({ ...form, monthlyCallVolume: e.target.value })}
                    className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
                  >
                    <option value="">Monthly call volume</option>
                    <option value="1k-10k">1,000 - 10,000</option>
                    <option value="10k-50k">10,000 - 50,000</option>
                    <option value="50k-250k">50,000 - 250,000</option>
                    <option value="250k+">250,000+</option>
                  </select>
                  <select
                    required
                    value={form.useCase}
                    onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                    className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
                  >
                    <option value="">Primary use case</option>
                    <option value="customer-support">Customer support</option>
                    <option value="lead-qualification">Lead qualification</option>
                    <option value="appointment-booking">Appointment booking</option>
                    <option value="collections">Collections and reminders</option>
                    <option value="other">Other</option>
                  </select>
                  <select
                    required
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
                  >
                    <option value="">Implementation timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="30-days">Within 30 days</option>
                    <option value="quarter">This quarter</option>
                    <option value="exploring">Evaluating only</option>
                  </select>
                  <Button type="submit" size="lg" className="w-full">
                    Submit Enterprise Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
