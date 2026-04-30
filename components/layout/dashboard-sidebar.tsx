"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Bot,
  CreditCard,
  Gauge,
  GitBranch,
  Library,
  LayoutDashboard,
  Mic2,
  Phone,
  PhoneCall,
  Settings,
  Sparkles,
  Users
} from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/usage", label: "AI Usage", icon: Sparkles },
  { href: "/dashboard/calls", label: "Calls", icon: Phone },
  { href: "/dashboard/minutes", label: "Minutes", icon: Gauge },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/agents", label: "Agents", icon: Bot },
  { href: "/dashboard/workflows", label: "Workflows", icon: GitBranch },
  { href: "/dashboard/knowledge", label: "Knowledge", icon: Library },
  { href: "/dashboard/integrations", label: "Integrations", icon: Sparkles },
  { href: "/dashboard/phone-numbers", label: "Phone Numbers", icon: PhoneCall },
  { href: "/dashboard/voices", label: "Voices", icon: Mic2 },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-full max-w-[248px] flex-col border-r border-border bg-surface px-4 py-5 max-lg:hidden">
      <Logo href="/dashboard" className="px-2" tone="dashboard" />
      <div className="mt-6 rounded-[18px] border border-border bg-[rgba(255,107,0,0.08)] px-4 py-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.22)] bg-[rgba(16,185,129,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-green)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse-soft" />
          Live workspace
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          Calls, leads, usage, and subscription controls in one place.
        </p>
      </div>
      <nav className="mt-6 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition",
                active
                  ? "border border-[var(--border-brand)] bg-[rgba(255,107,0,0.16)] text-[var(--text-primary)] shadow-[0_0_0_1px_rgba(255,107,0,0.15)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[18px] border border-border bg-[var(--bg-base)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E55A00,#FF6B00)] font-heading text-sm font-bold text-white">
            {(user?.name || user?.email || "B").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{user?.name || "Bavio User"}</p>
            <p className="truncate text-xs text-muted">{user?.email || "Signed in"}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-[12px] border border-border bg-surface px-3 py-2 text-xs text-[var(--text-secondary)]">
          <Bell className="h-3.5 w-3.5 text-primary" />
          Weekly digest enabled
        </div>
        <Button variant="ghost" size="sm" className="mt-4 w-full" onClick={logout}>
          Log out
        </Button>
      </div>
    </aside>
  );
}

