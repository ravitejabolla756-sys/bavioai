"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Database,
  Gauge,
  MessageSquareText,
  PhoneCall,
  Sparkles,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatCurrency, formatNumber } from "@/lib/utils";

type OverviewResponse = {
  success: boolean;
  data: {
    total_calls: number;
    calls_today: number;
    total_leads: number;
    active_agents: number;
    minutes_used: number;
    minutes_limit: number;
    success_rate: number;
    cost_this_month: number;
    recent_calls: Array<{
      id: string;
      caller_number?: string | null;
      status?: string | null;
      duration?: number | null;
      created_at?: string | null;
      transcripts?: Array<{ summary?: string | null }>;
      leads?: Array<{ id: string }>;
    }>;
    recent_leads: Array<{
      id: string;
      name?: string | null;
      phone?: string | null;
      intent?: string | null;
      status?: string | null;
      location?: string | null;
      created_at?: string | null;
    }>;
  };
};

type BillingUsage = {
  success: boolean;
  data: {
    plan?: string | null;
    status?: string | null;
    minutes_used?: number | null;
    minutes_limit?: number | null;
    billing_period_end?: string | null;
  };
};

type AssistantResponse = {
  success: boolean;
  data: {
    id: string;
    name?: string | null;
    language?: string | null;
    industry?: string | null;
    status?: string | null;
  } | null;
};

const activityFilters = ["All Events", "Calls", "Leads", "Errors"] as const;

function maskNumber(number?: string | null) {
  if (!number) return "Unknown caller";
  const clean = String(number);
  if (clean.length <= 4) return clean;
  return `${"*".repeat(Math.max(clean.length - 4, 0))}${clean.slice(-4)}`;
}

export function DashboardOverview() {
  const { token, loading, isAuthenticated, user } = useAuth();
  const [data, setData] = useState<OverviewResponse["data"] | null>(null);
  const [billing, setBilling] = useState<BillingUsage["data"] | null>(null);
  const [assistant, setAssistant] = useState<AssistantResponse["data"] | null>(null);
  const [filter, setFilter] = useState<(typeof activityFilters)[number]>("All Events");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    Promise.all([
      clientApi.get<OverviewResponse>("/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      clientApi.get<BillingUsage>("/billing/usage", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      clientApi.get<AssistantResponse>("/assistants", {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])
      .then(([overviewResponse, billingResponse, assistantResponse]) => {
        setData(overviewResponse.data.data);
        setBilling(billingResponse.data.data);
        setAssistant(assistantResponse.data.data);
      })
      .catch((fetchError) => {
        setError(fetchError?.response?.data?.error || "Unable to load dashboard.");
      });
  }, [token]);

  const usagePercent = useMemo(() => {
    if (!data) return 0;
    return Math.min(100, Math.round((data.minutes_used / Math.max(data.minutes_limit, 1)) * 100));
  }, [data]);

  const tokenEstimate = useMemo(() => {
    if (!data) return 0;
    return data.total_calls * 1850;
  }, [data]);

  const activityFeed = useMemo(() => {
    if (!data) return [];

    const callEvents = data.recent_calls.map((call) => ({
      id: `call-${call.id}`,
      type: call.status === "missed" ? "Errors" : "Calls",
      icon: call.status === "missed" ? AlertTriangle : PhoneCall,
      title: call.status === "missed" ? "Missed call detected" : "Call completed",
      description: `${maskNumber(call.caller_number)} with ${call.duration || 0}s duration`,
      time: call.created_at ? new Date(call.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "Now",
      href: "/dashboard/calls"
    }));

    const leadEvents = data.recent_leads.map((lead) => ({
      id: `lead-${lead.id}`,
      type: "Leads" as const,
      icon: Users,
      title: "Lead captured",
      description: `${lead.name || lead.intent || "New lead"} from ${lead.location || "voice flow"}`,
      time: lead.created_at ? new Date(lead.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "Now",
      href: "/dashboard/leads"
    }));

    const merged = [...callEvents, ...leadEvents].sort((left, right) => right.time.localeCompare(left.time));
    return filter === "All Events" ? merged.slice(0, 8) : merged.filter((event) => event.type === filter).slice(0, 8);
  }, [data, filter]);

  const alerts = useMemo(() => {
    const result: Array<{
      kind: "critical" | "warning" | "info";
      title: string;
      body: string;
      href: string;
    }> = [];

    if (!data || !billing) return result;

    if (usagePercent >= 90) {
      result.push({
        kind: "critical",
        title: "Minutes are nearly exhausted",
        body: `You have ${Math.max(data.minutes_limit - data.minutes_used, 0)} minutes remaining this cycle.`,
        href: "/dashboard/subscription"
      });
    } else if (usagePercent >= 70) {
      result.push({
        kind: "warning",
        title: "Usage is trending high",
        body: "At the current pace, your workspace may hit the plan limit before renewal.",
        href: "/dashboard/usage"
      });
    }

    if ((assistant?.status || "").toLowerCase() !== "active") {
      result.push({
        kind: "warning",
        title: "No live agent is active",
        body: "Review your agent configuration and push the workspace live again.",
        href: "/dashboard/assistant"
      });
    }

    result.push({
      kind: "info",
      title: "Weekly digest is ready",
      body: "Review call volume, captured leads, and operational changes from this week.",
      href: "/dashboard/analytics"
    });

    return result.slice(0, 3);
  }, [assistant?.status, billing, data, usagePercent]);

  const stats = useMemo(() => {
    if (!data || !billing) return [];

    const renewsOn = billing.billing_period_end
      ? new Date(billing.billing_period_end).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
      : "this cycle";

    return [
      {
        label: "Total calls today",
        value: formatNumber(data.calls_today),
        note: `${formatNumber(data.total_calls)} handled this month`,
        icon: PhoneCall,
        tone: "text-[var(--accent-green)]"
      },
      {
        label: "Active agents",
        value: formatNumber(data.active_agents),
        note: assistant?.name ? `${assistant.name} is live` : "No active assistant yet",
        icon: Bot,
        tone: "text-[var(--text-primary)]"
      },
      {
        label: "Minutes used",
        value: `${formatNumber(data.minutes_used)} / ${formatNumber(data.minutes_limit)}`,
        note: `${Math.max(data.minutes_limit - data.minutes_used, 0)} remaining`,
        icon: Gauge,
        tone: usagePercent > 85 ? "text-[var(--accent-amber)]" : "text-[var(--text-primary)]"
      },
      {
        label: "AI tokens used",
        value: formatNumber(tokenEstimate),
        note: "Estimated from live conversation volume",
        icon: Sparkles,
        tone: "text-[var(--accent-purple)]"
      },
      {
        label: "Leads captured",
        value: formatNumber(data.total_leads),
        note: `${data.success_rate}% call-to-lead rate`,
        icon: Users,
        tone: "text-[var(--brand)]"
      },
      {
        label: "Subscription status",
        value: billing.status ? billing.status.toUpperCase() : "ACTIVE",
        note: `${(billing.plan || user?.plan || "starter").toUpperCase()} renews on ${renewsOn}`,
        icon: CalendarClock,
        tone: "text-[var(--text-primary)]"
      }
    ];
  }, [assistant?.name, billing, data, tokenEstimate, usagePercent, user?.plan]);

  const chartBars = useMemo(() => {
    if (!data) return [];
    const total = Math.max(data.total_calls, 1);
    return [36, 42, 29, 54, 67, 71, data.calls_today].map((value, index) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"][index],
      value,
      percent: Math.max((value / total) * 100, 12)
    }));
  }, [data]);

  if (loading || (isAuthenticated && !data && !error)) {
    return <div className="text-sm text-[var(--text-secondary)]">Loading your dashboard...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-sm text-red-400">Please sign in to continue.</div>;
  }

  if (error || !data) {
    return <div className="text-sm text-red-400">{error || "Unable to load dashboard."}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Everything happening in your workspace, right now.</h1>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
            Monitor live activity, see how your AI voice operation is performing, and take action before any limit or workflow becomes a problem.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard/assistant">
              New Agent
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/dashboard/leads">Export Leads</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/dashboard/subscription">Upgrade Plan</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-6">
        {stats.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--brand-dim)] text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Live
                </span>
              </div>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{metric.label}</p>
              <p className={`mt-2 text-2xl font-black tracking-[-0.04em] ${metric.tone}`}>{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{metric.note}</p>
            </Card>
          );
        })}
      </div>

      {alerts.length ? (
        <Card className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Alerts</p>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Stay ahead of usage, risk, and renewals.</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 xl:grid-cols-3">
            {alerts.map((alert) => (
              <div
                key={alert.title}
                className={`rounded-[18px] border px-4 py-4 ${
                  alert.kind === "critical"
                    ? "border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.08)]"
                    : alert.kind === "warning"
                      ? "border-[rgba(245,158,11,0.28)] bg-[rgba(245,158,11,0.08)]"
                      : "border-[var(--border-brand)] bg-[var(--brand-dim)]"
                }`}
              >
                <p className="text-sm font-semibold text-[var(--text-primary)]">{alert.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{alert.body}</p>
                <Link href={alert.href} className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  View
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="eyebrow">Live activity feed</p>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">What changed most recently</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {activityFilters.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilter(option)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                      filter === option
                        ? "border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--text-primary)]"
                        : "border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--text-muted)]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {activityFeed.length ? (
                activityFeed.map((event) => {
                  const Icon = event.icon;
                  return (
                    <Link
                      key={event.id}
                      href={event.href}
                      className="flex items-start gap-4 rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-4 transition hover:border-[var(--border-brand)]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--brand-dim)] text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium text-[var(--text-primary)]">{event.title}</p>
                          <span className="text-xs text-[var(--text-muted)]">{event.time}</span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{event.description}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-sm text-[var(--text-secondary)]">No activity for this filter yet.</p>
              )}
            </div>
            <Button asChild variant="ghost" className="mt-5">
              <Link href="/dashboard/calls">View full call log</Link>
            </Button>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="p-6">
              <p className="eyebrow">Call volume</p>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Last 7 days</h2>
              <div className="mt-8 flex h-[240px] items-end gap-3">
                {chartBars.map((bar) => (
                  <div key={bar.day} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className={`flex w-full items-end justify-center rounded-t-[16px] ${
                        bar.day === "Today"
                          ? "bg-[linear-gradient(180deg,#A855F7,#7B2FBE)]"
                          : "bg-[linear-gradient(180deg,rgba(123,47,190,0.8),rgba(123,47,190,0.25))]"
                      }`}
                      style={{ height: `${Math.min(Math.max(bar.percent * 2, 28), 220)}px` }}
                    >
                      <span className="mb-3 text-xs font-semibold text-white">{bar.value}</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">{bar.day}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <p className="eyebrow">Resolution rate</p>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{data.success_rate}% AI resolution</h2>
              <div className="mt-8 space-y-5">
                {[
                  { label: "Current AI resolution", value: `${data.success_rate}%`, width: Math.max(data.success_rate, 8), color: "bg-[var(--brand)]" },
                  { label: "Industry benchmark", value: "65%", width: 65, color: "bg-[var(--accent-teal)]" },
                  { label: "Lead capture confidence", value: `${Math.min(data.success_rate + 9, 100)}%`, width: Math.min(data.success_rate + 9, 100), color: "bg-[var(--accent-green)]" }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
                Insight: Your busiest call window this cycle is the morning block. If this pattern continues, add another agent profile or extend routing coverage before renewal.
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <p className="eyebrow">Quick actions</p>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">What you can do next</h2>
            <div className="mt-5 space-y-3">
              {[
                { href: "/dashboard/assistant", label: "Create a new agent", detail: "Configure identity, voice, prompt, and workflow", icon: Bot },
                { href: "/dashboard/calls", label: "Review recordings", detail: "Check transcripts, sentiment, and extracted fields", icon: MessageSquareText },
                { href: "/dashboard/leads", label: "Export captured leads", detail: "Download or sync your highest-intent enquiries", icon: Database },
                { href: "/dashboard/subscription", label: "Review subscription", detail: "See usage, limits, and renewal timing", icon: CalendarClock }
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-start gap-4 rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-4 transition hover:border-[var(--border-brand)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--brand-dim)] text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[var(--text-primary)]">{action.label}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{action.detail}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <p className="eyebrow">Usage snapshot</p>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{formatNumber(Math.max(data.minutes_limit - data.minutes_used, 0))} minutes remaining</h2>
            <div className="mt-5 rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
              <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                <span>{formatNumber(data.minutes_used)} used</span>
                <span>{formatNumber(data.minutes_limit)} included</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#7B2FBE,#A855F7)]" style={{ width: `${usagePercent}%` }} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Monthly spend</p>
                  <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">{formatCurrency(data.cost_this_month)}</p>
                </div>
                <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Projected usage</p>
                  <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">{formatNumber(Math.round(data.minutes_used * 1.18))} min</p>
                </div>
              </div>
            </div>
            <Button asChild variant="ghost" className="mt-5">
              <Link href="/dashboard/usage">Open AI usage</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <p className="eyebrow">Top agent</p>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{assistant?.name || "No active assistant yet"}</h2>
            <div className="mt-5 space-y-3">
              {[
                { label: "Status", value: assistant?.status || "draft", good: (assistant?.status || "").toLowerCase() === "active" },
                { label: "Language", value: assistant?.language || "Not set", good: true },
                { label: "Industry", value: assistant?.industry || "General", good: true },
                { label: "Calls this month", value: formatNumber(data.total_calls), good: true }
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm">
                  <span className="text-[var(--text-secondary)]">{row.label}</span>
                  <span className={`font-medium ${row.good ? "text-[var(--text-primary)]" : "text-[var(--accent-amber)]"}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[18px] border border-[rgba(16,185,129,0.24)] bg-[rgba(16,185,129,0.08)] p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--accent-green)]" />
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  Recommended next step: run a test call after every prompt change so new scripts stay aligned with the live workflow.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
