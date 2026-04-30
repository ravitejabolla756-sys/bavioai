"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/product", label: "Product" },
  { href: "/use-cases", label: "Solutions" },
  { href: "/integrations", label: "Integrations" },
  { href: "/customers", label: "Customers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
  { href: "/status", label: "Status" }
];

export function Navbar({ locale }: { locale: "en" | "hi" }) {
  const pathname = usePathname();
  const { token, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, locale]);

  const isAuthenticated = Boolean(token);

  return (
    <>
      <header
        className={cn(
          "relative left-0 right-0 z-40 border-b transition-all duration-200",
          scrolled
            ? "border-[var(--border-base)] bg-[rgba(8,7,15,0.85)] backdrop-blur-[12px]"
            : "border-[var(--border-base)] bg-[rgba(8,7,15,0.78)] backdrop-blur-[12px]"
        )}
      >
        <div className="container mx-auto flex h-[72px] max-w-[1280px] items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-4 lg:flex xl:gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] font-medium transition hover:text-[var(--text-primary)] xl:text-sm",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">
                    Start Free
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-raised)] text-[var(--text-primary)] lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[130] bg-[rgba(8,7,15,0.96)] transition-all duration-200 lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="container flex h-full flex-col py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-base)] text-[var(--text-primary)]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-12 flex flex-1 flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-[14px] px-4 py-3 text-[24px] font-heading font-bold tracking-[-0.03em] transition sm:text-[28px]",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-[var(--bg-raised)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-auto flex flex-col gap-3 pt-6">
              {isAuthenticated ? (
                <>
                  <Button size="lg" asChild>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" onClick={() => { setMobileOpen(false); logout(); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      Start Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" asChild>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Log in
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
