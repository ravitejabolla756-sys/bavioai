"use client";

import { Bell, Menu, PhoneCall, Search, Sparkles } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

export function DashboardTopBar({
  title,
  onOpenMobileNav
}: {
  title: string;
  onOpenMobileNav?: () => void;
}) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-border bg-[rgba(13,13,26,0.88)] px-5 backdrop-blur-[18px] lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-surface text-foreground lg:hidden"
          aria-label="Open dashboard navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Bavio Dashboard</p>
          <h1 className="font-heading text-[18px] font-bold tracking-[-0.02em] text-foreground">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button size="sm" className="max-sm:hidden">
          <PhoneCall className="mr-1 h-4 w-4" />
          Test Call
        </Button>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-[var(--text-secondary)] md:inline-flex">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Real-time sync
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E55A00,#FF6B00)] font-heading text-xs font-bold text-white">
          {(user?.name || user?.email || "B").slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

