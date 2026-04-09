"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { BarChart3, Bot, CreditCard, Gauge, LayoutDashboard, Phone, Settings, Sparkles, Users, X } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopBar } from "@/components/layout/dashboard-topbar";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/usage": "AI Usage",
  "/dashboard/calls": "Calls",
  "/dashboard/minutes": "Minutes",
  "/dashboard/leads": "Leads",
  "/dashboard/assistant": "Agents",
  "/dashboard/analytics": "Analytics",
  "/dashboard/billing": "Billing",
  "/dashboard/subscription": "Subscription",
  "/dashboard/settings": "Settings"
};

const mobileItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/usage", label: "AI Usage", icon: Sparkles },
  { href: "/dashboard/calls", label: "Calls", icon: Phone },
  { href: "/dashboard/minutes", label: "Minutes", icon: Gauge },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/assistant", label: "Agents", icon: Bot },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/subscription", label: "Subscription", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { loading, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const title = useMemo(() => titles[pathname] || "Dashboard", [pathname]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-secondary">Loading dashboard...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="surface max-w-md p-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Sign in required</h1>
          <p className="mt-4 text-sm leading-7 text-secondary">You need an active account to access the Bavio dashboard.</p>
          <Button className="mt-6" asChild>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-theme flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopBar title={title} onOpenMobileNav={() => setOpen(true)} />
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>

      <div className={cn("fixed inset-0 z-[150] bg-[rgba(8,6,0,0.96)] transition lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}>
        <div className={cn("absolute inset-y-0 left-0 w-[280px] bg-surface p-5 transition", open ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex items-center justify-between">
            <Logo href="/dashboard" tone="dashboard" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <div className="mt-8 space-y-1">
            {mobileItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-[8px] px-4 py-3 text-sm",
                    pathname === item.href ? "bg-[rgba(123,47,190,0.16)] text-foreground" : "text-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Button variant="ghost" className="mt-8 w-full" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
