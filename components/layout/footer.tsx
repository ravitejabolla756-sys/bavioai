"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ReviewBadges } from "@/components/shared/trust-elements";

const linkGroups = [
  {
    title: "Platform",
    links: [
      { label: "Product", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Integrations", href: "/integrations" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Customers", href: "/customers" },
      { label: "Growth Strategy", href: "/growth" },
      { label: "Architecture", href: "/architecture" },
      { label: "Positioning", href: "/positioning" },
      { label: "Launch Checklist", href: "/launch-checklist" },
      { label: "Latency Benchmarks", href: "/benchmarks/voice-latency" },
      { label: "Changelog", href: "/changelog" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "Company", href: "/company" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Public Status", href: "https://bavio.betteruptime.com" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
      { label: "HIPAA", href: "/legal/hipaa" },
      { label: "Data Deletion Request", href: "/legal/data-deletion-request" },
      { label: "Cookies", href: "/cookies" }
    ]
  }
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bavio-ai" },
  { label: "Twitter/X", href: "https://x.com/bavioai" },
  { label: "GitHub", href: "https://github.com/bavio-ai" },
  { label: "YouTube", href: "https://www.youtube.com/@bavioai" }
];

const certifications = [
  "SOC 2 Type II (In Progress - Target October 2026)",
  "HIPAA Compliance Support",
  "GDPR / India DPDP Controls",
  "AES-256 at rest, TLS 1.3 in transit"
];

export function Footer() {
  const [region, setRegion] = useState<"inr" | "usd">("inr");

  return (
    <footer className="border-t border-[var(--border-base)] bg-[var(--bg-base)]">
      <div className="container py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
              Get AI automation insights weekly - join 5,000+ builders.
            </p>
            <form className="mt-5 flex max-w-md gap-2" method="GET" action="/subscribe-success">
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                className="h-11 flex-1 rounded-[10px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 text-sm text-[var(--text-primary)]"
              />
              <button
                type="submit"
                className="h-11 rounded-[10px] bg-[var(--brand)] px-4 text-sm font-semibold text-black transition hover:bg-[var(--brand-hover)]"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--border-base)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition hover:text-[var(--accent)]"
                >
                  {item.label}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">{group.title}</p>
                <div className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent)]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-faint)]">Certifications</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {certifications.map((item) => (
              <span key={item} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[var(--text-faint)]">Review platforms</p>
          <ReviewBadges compact />
        </div>

        <div className="mt-8 border-t border-[var(--border-base)] pt-6 text-xs text-[var(--text-faint)] sm:flex sm:items-center sm:justify-between">
          <p>(c) 2026 Bavio AI. All rights reserved. Built in India.</p>
          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            <label htmlFor="region" className="text-[var(--text-faint)]">
              Region
            </label>
            <select
              id="region"
              value={region}
              onChange={(event) => setRegion(event.target.value as "inr" | "usd")}
              className="rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-2 py-1 text-xs text-[var(--text-secondary)]"
            >
              <option value="inr">India (INR)</option>
              <option value="usd">Global (USD)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
