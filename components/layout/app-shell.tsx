"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { ScrollTopButton } from "@/components/shared/scroll-top";
import { TrustBadges } from "@/components/shared/trust-badges";

export function AppShell({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: "en" | "hi";
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerOffset, setHeaderOffset] = useState(112);

  useEffect(() => {
    if (isDashboard) {
      return;
    }

    const headerElement = headerRef.current;

    if (!headerElement) {
      return;
    }

    const updateOffset = () => {
      setHeaderOffset(Math.ceil(headerElement.getBoundingClientRect().height));
    };

    updateOffset();

    const observer = new ResizeObserver(() => {
      updateOffset();
    });

    observer.observe(headerElement);
    window.addEventListener("resize", updateOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, [isDashboard, pathname]);

  if (isDashboard) {
    return (
      <>
        <ScrollProgress />
        <CursorGlow />
        {children}
      </>
    );
  }

  return (
    <div
      style={
        {
          "--site-header-offset": `${headerOffset}px`
        } as CSSProperties
      }
    >
      <ScrollProgress />
      <CursorGlow />
      <div className="sticky top-0 z-[120] h-0 overflow-visible">
        <div
          ref={headerRef}
          className="w-full border-b border-[var(--border-base)] bg-[rgba(8,7,15,0.85)] shadow-[0_12px_32px_rgba(7,5,18,0.22)] backdrop-blur-[12px]"
        >
          <AnnouncementBar />
          <Navbar locale={locale} />
        </div>
      </div>
      <main
        className="min-h-screen"
        style={{ paddingTop: "var(--site-header-offset, 112px)" }}
      >
        <TrustBadges />
        {children}
      </main>
      <Footer />
      <ScrollTopButton />
      <CookieConsent />
    </div>
  );
}
