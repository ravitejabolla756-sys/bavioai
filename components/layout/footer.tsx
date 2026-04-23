"use client";

import Link from "next/link";

import { Logo } from "@/components/layout/logo";

const links = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Docs", href: "/docs" }
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-base)] bg-[var(--bg-base)]">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-[var(--text-faint)]">Built in India 🇮🇳</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-[var(--text-faint)]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--text-primary)]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
