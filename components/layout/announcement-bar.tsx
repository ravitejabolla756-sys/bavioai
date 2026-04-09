"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const STORAGE_KEY = "bavio-announcement-dismissed";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    setIsVisible(dismissed !== "true");
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--announcement-height", isVisible ? "40px" : "0px");
    return () => {
      document.documentElement.style.setProperty("--announcement-height", "0px");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="w-full h-10 border-b border-[rgba(123,47,190,0.15)] bg-[linear-gradient(90deg,rgba(123,47,190,0.08)_0%,rgba(168,85,247,0.08)_50%,rgba(123,47,190,0.08)_100%)]">
      <div className="container relative flex h-full items-center justify-center text-center text-[13px] text-secondary">
        <div className="inline-flex items-center gap-3 px-10">
          <span className="rounded-full border border-[rgba(123,47,190,0.28)] bg-[rgba(123,47,190,0.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
            New
          </span>
          <span>Bavio AI is now live in India.</span>
          <Link href="/contact" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
            Native Exotel + WhatsApp integration
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="absolute right-0 rounded-md p-1 text-muted transition hover:text-foreground"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "true");
            setIsVisible(false);
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
