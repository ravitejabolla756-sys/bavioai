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

  if (!isVisible) return null;

  return (
    <div className="w-full border-b border-[rgba(255,107,0,0.18)] bg-[linear-gradient(90deg,rgba(255,107,0,0.12)_0%,rgba(168,85,247,0.12)_50%,rgba(255,107,0,0.12)_100%)]">
      <div className="mx-auto flex w-full max-w-[1280px] items-start gap-3 px-4 py-3 sm:px-6 lg:px-12">
        <span className="mt-0.5 shrink-0 rounded-full border border-[rgba(255,107,0,0.28)] bg-[rgba(255,107,0,0.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
          New
        </span>
        <div className="min-w-0 flex-1 text-[13px] leading-5 text-secondary sm:text-[14px]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="break-words">Bavio AI is now live in India.</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
            >
              Native Exotel + WhatsApp integration
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="shrink-0 rounded-md p-1 text-muted transition hover:text-foreground"
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
