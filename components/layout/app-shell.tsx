"use client";

import { usePathname } from "next/navigation";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { ScrollTopButton } from "@/components/shared/scroll-top";
import { TrustBadges } from "@/components/shared/trust-badges";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";


export function AppShell({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: "en" | "hi";
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <>
        <ScrollProgress />
        <CursorGlow />
        {children}
        <WhatsAppFloat />
      </>
    );
  }

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      {/* ── Fixed header stack: announcement bar on top, navbar below ── */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AnnouncementBar />
        <Navbar locale={locale} />
      </div>
      {/* ── Spacer: pushes page content below the fixed header (40px bar + 64px navbar) ── */}
      <div
        style={{
          height: "calc(var(--announcement-height, 0px) + 64px)",
          minHeight: "calc(var(--announcement-height, 0px) + 64px)",
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      <TrustBadges />
      {children}
      <Footer />
      <WhatsAppFloat />
      <ScrollTopButton />
      <CookieConsent />
    </>
  );
}

