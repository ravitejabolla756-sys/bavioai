"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

import { Logo } from "@/components/layout/logo";

const footerLinks = {
  Product: [
    { label: "Voice Agents", href: "/product" },
    { label: "Integrations", href: "/integrations" },
    { label: "Voice Library", href: "/voices" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "API Docs", href: "/docs" }
  ],
  "Use Cases": [
    { label: "Real Estate", href: "/use-cases/real-estate" },
    { label: "Healthcare", href: "/use-cases/clinics" },
    { label: "Restaurants", href: "/use-cases/restaurants" },
    { label: "EdTech", href: "/use-cases/edtech" },
    { label: "Customer Support", href: "/use-cases/customer-support" },
    { label: "D2C", href: "/use-cases/d2c-e-commerce" }
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Customers", href: "/customers" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Contact", href: "/contact" }
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/legal/security" },
    { label: "Status", href: "/status" }
  ]
};

const socials = [
  { label: "Twitter / X", href: "https://x.com/bavioai", icon: Twitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bavio-ai", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/bavio-ai", icon: Github },
  { label: "YouTube", href: "https://youtube.com/@bavioai", icon: Youtube }
];

const certBadges = ["SOC 2 Ready", "HIPAA Ready", "GDPR Ready", "India DPDP", "AES-256 Encrypted"];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-base)] bg-[var(--bg-raised)]">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent opacity-60" />
      <div className="container pb-10 pt-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-8 py-6 md:flex-row md:items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">Weekly insights</p>
            <p className="mt-1 text-[15px] font-semibold text-[var(--text-primary)]">
              AI automation trends for builders. Join 5,000+ teams.
            </p>
          </div>
          <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@company.com" className="h-10 flex-1 rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-brand)] focus:outline-none" />
            <button type="submit" className="h-10 rounded-[8px] bg-[var(--brand)] px-4 text-sm font-semibold text-black transition hover:bg-[var(--brand-hover)]">
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[14px] leading-[1.7] text-[var(--text-muted)]">
              The world's simplest voice AI for business calls. Deploy in 5 minutes. Answer every call, forever.
            </p>
            <p className="mt-2 text-[12px] text-[var(--text-faint)]">Built in India | Serving the world</p>
          </div>
          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.label} href={social.href} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--text-muted)] transition hover:border-[var(--border-brand)] hover:bg-[rgba(123,47,190,0.08)] hover:text-[var(--brand)]" aria-label={social.label}>
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-primary)]">{title}</h3>
              <div className="space-y-2">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="block text-[13px] leading-7 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2">
          {certBadges.map((badge) => (
            <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
              {badge}
            </span>
          ))}
          <Link href="/status" className="ml-auto inline-flex items-center gap-2 rounded-full border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.06)] px-3 py-1.5 text-[11px] font-semibold text-[var(--accent-green)] transition hover:bg-[rgba(34,197,94,0.1)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-green)]" />
            All Systems Operational
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border-base)] pt-6 text-[12px] text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Bavio AI Inc. | Clarity Over Complexity. Built with Intent.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition hover:text-[var(--text-primary)]">Privacy</Link>
            <Link href="/terms" className="transition hover:text-[var(--text-primary)]">Terms</Link>
            <Link href="/cookies" className="transition hover:text-[var(--text-primary)]">Cookies</Link>
            <Link href="/legal/security" className="transition hover:text-[var(--text-primary)]">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
