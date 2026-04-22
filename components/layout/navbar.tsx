"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Building2,
  ChevronDown,
  Code2,
  Globe,
  Layers,
  Menu,
  Mic2,
  Puzzle,
  Shield,
  Users,
  X,
  Zap
} from "lucide-react";
import { usePathname } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const productMenu = [
  {
    label: "Platform",
    items: [
      {
        icon: Bot,
        title: "Voice Agents",
        description: "Deploy AI that answers every call, 24/7",
        href: "/product"
      },
      {
        icon: Puzzle,
        title: "Integrations",
        description: "Connect to 50+ tools in your stack",
        href: "/integrations"
      },
      {
        icon: Mic2,
        title: "Voice Library",
        description: "Natural voices in 20+ languages",
        href: "/voices"
      },
      {
        icon: Zap,
        title: "Playground",
        description: "Test the API without writing code",
        href: "/playground"
      }
    ]
  },
  {
    label: "For Teams",
    items: [
      {
        icon: Building2,
        title: "Enterprise",
        description: "SOC 2, SSO, RBAC, and dedicated SLA",
        href: "/enterprise"
      },
      {
        icon: Users,
        title: "Customers",
        description: "See how businesses use Bavio",
        href: "/customers"
      },
      {
        icon: Shield,
        title: "Security",
        description: "Compliance, encryption, and data residency",
        href: "/legal/security"
      },
      {
        icon: Globe,
        title: "Use Cases",
        description: "Industry-specific voice agent templates",
        href: "/use-cases"
      }
    ]
  },
  {
    label: "Developers",
    items: [
      {
        icon: Code2,
        title: "API Docs",
        description: "Full REST API reference and SDKs",
        href: "/docs"
      },
      {
        icon: BookOpen,
        title: "Changelog",
        description: "What's new in Bavio",
        href: "/changelog"
      },
      {
        icon: Layers,
        title: "Quickstart",
        description: "Deploy your first agent in 5 minutes",
        href: "/docs/quickstart"
      }
    ]
  }
];

const navItems = [
  { href: "/product", label: "Product", hasMenu: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/company", label: "Company" }
];

export function Navbar({ locale }: { locale: "en" | "hi" }) {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  function openMega() {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  }

  function closeMega() {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 120);
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "relative left-0 right-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-[rgba(45,37,96,0.5)] bg-[rgba(13,13,26,0.85)] backdrop-blur-[20px]"
            : "border-[#2D2560]/50 bg-[#0D0D1A]/80 backdrop-blur-md"
        )}
      >
        <div className="container mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-6 lg:px-12">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* Product mega-menu trigger */}
            <div
              className="relative"
              ref={megaRef}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-[6px] px-3 py-2 text-[14px] font-medium transition-colors",
                  megaOpen || isActive("/product") || isActive("/integrations") || isActive("/enterprise") || isActive("/voices") || isActive("/customers")
                    ? "text-[#F9F6FF]"
                    : "text-[#B4A8D4] hover:text-[#A855F7]"
                )}
              >
                Product
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    megaOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Mega Menu */}
              <div
                className={cn(
                  "absolute left-1/2 top-full mt-3 w-[720px] -translate-x-[45%] overflow-hidden rounded-[16px] border border-[var(--border-raised)] bg-[var(--bg-raised)] shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-200",
                  megaOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                )}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent opacity-60" />
                <div className="grid grid-cols-3 gap-0 p-5">
                  {productMenu.map((group) => (
                    <div key={group.label} className="space-y-1">
                      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        {group.label}
                      </p>
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-start gap-3 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-[var(--bg-overlay)]"
                          >
                            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] border border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--text-muted)] group-hover:border-[var(--border-brand)] group-hover:text-[var(--brand)]">
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-[var(--text-primary)]">
                                {item.title}
                              </p>
                              <p className="mt-0.5 text-[12px] leading-[1.5] text-[var(--text-muted)]">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--border-base)] bg-[var(--bg-base)] px-5 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-green)]" />
                      <span className="text-[12px] text-[var(--text-muted)]">
                        All systems operational | 99.9% uptime
                      </span>
                    </div>
                    <Link
                      href="/enterprise"
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--brand)] hover:underline"
                    >
                      Enterprise plan
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Static nav links */}
            {navItems
              .filter((item) => !item.hasMenu)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[6px] px-3 py-2 text-[14px] font-medium transition-colors",
                    isActive(item.href)
                      ? "text-[#F9F6FF]"
                      : "text-[#B4A8D4] hover:text-[#A855F7]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-1.5 rounded-full border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.06)] px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-green)]" />
              <span className="text-[11px] font-semibold text-[var(--accent-green)]">
                Live
              </span>
            </div>
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/sign-up">
                    Start Free
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-raised)] text-[var(--text-primary)] lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[130] bg-[#080600] transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div className="container flex h-full flex-col">
          <div className="flex h-[72px] items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-base)] text-[var(--text-primary)]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 pb-12">
            {[
              { href: "/product", label: "Product" },
              { href: "/integrations", label: "Integrations" },
              { href: "/enterprise", label: "Enterprise" },
              { href: "/pricing", label: "Pricing" },
              { href: "/customers", label: "Customers" },
              { href: "/blog", label: "Blog" },
              { href: "/docs", label: "Docs" },
              { href: "/company", label: "Company" },
              { href: "/careers", label: "Careers" }
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-[10px] px-4 py-3.5 text-[clamp(20px,5vw,32px)] font-bold tracking-[-0.03em] transition-colors",
                  isActive(item.href)
                    ? "text-[var(--brand)]"
                    : "text-[var(--text-primary)] hover:text-[var(--brand)]"
                )}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Button size="lg" asChild>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" onClick={() => { setMobileOpen(false); logout(); }}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" asChild>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
