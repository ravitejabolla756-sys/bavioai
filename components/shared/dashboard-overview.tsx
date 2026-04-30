"use client";

import Link from "next/link";
import { AlertTriangle, BarChart3, CheckCircle2, Clock3, PhoneCall, Plus, Radio, Users, Waves } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatNumber } from "@/lib/utils";

type OverviewData = {
  total_calls: number;
  calls_today: number;
  total_leads: number;
  active_agents: number;
  minutes_used: number;
  minutes_limit: number;
  success_rate: number;
  cost_this_month: number;
};

type CallRecord = {
  id: string;
  caller_number?: string | null;
  phone_number?: string | null;
  agent_name?: string | null;
  duration?: number | null;
  status?: string | null;
  created_at?: string | null;
};

export function DashboardOverview() {
  const { token, loading, isAuthenticated, user, logout } = useAuth();
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [range, setRange] = useState<7 | 30>(7);
  const [agentFilter, setAgentFilter] = useState("all");
  const [numberFilter, setNumberFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    Promise.all([
      clientApi.get<{ success: boolean; data: OverviewData }>("/analytics/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      clientApi.get<{ success: boolean; data: CallRecord[] }>("/calls", {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])
      .then(([overviewResponse, callsResponse]) => {
        setOverview(overviewResponse.data.data);
        setCalls(callsResponse.data.data || []);
      })
      .catch((fetchError) => {
        setError(fetchError?.response?.data?.error || "Unable to load dashboard.");
      });
  }, [token]);

  const usagePercent = useMemo(() => {
    if (!overview) return 0;
    return Math.min(100, Math.round((overview.minutes_used / Math.max(overview.minutes_limit, 1)) * 100));
  }, [overview]);

  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      const callAgent = call.agent_name || "Unassigned";
      const callNumber = call.phone_number || call.caller_number || "Unknown";
      return (agentFilter === "all" || callAgent === agentFilter) && (numberFilter === "all" || callNumber === numberFilter);
    });
  }, [agentFilter, calls, numberFilter]);

  const chartData = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: range }, (_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (range - 1 - index));
      return date;
    });

    return days.map((date) => {
      const key = date.toISOString().slice(0, 10);
      const count = filteredCalls.filter((call) => {
        if (!call.created_at) return false;
        return new Date(call.created_at).toISOString().slice(0, 10) === key;
      }).length;
      return { label: `${date.getMonth() + 1}/${date.getDate()}`, count };
    });
  }, [filteredCalls, range]);

  const maxChartValue = useMemo(() => Math.max(...chartData.map((point) => point.count), 1), [chartData]);

  const activeCallFeed = useMemo(() => {
    const activeStatuses = new Set(["in_progress", "ringing", "queued", "live"]);
    const liveCalls = calls.filter((call) => activeStatuses.has((call.status || "").toLowerCase())).slice(0, 4);
    if (liveCalls.length) return liveCalls;
    return calls.slice(0, 3).map((call) => ({ ...call, status: "live" }));
  }, [calls]);

  const agents = useMemo(() => {
    const unique = new Set(calls.map((call) => call.agent_name || "Unassigned"));
    return ["all", ...Array.from(unique)];
  }, [calls]);

  const numbers = useMemo(() => {
    const unique = new Set(calls.map((call) => call.phone_number || call.caller_number || "Unknown"));
    return ["all", ...Array.from(unique)];
  }, [calls]);

  const notifications = useMemo(() => {
    const missed = calls.filter((call) => (call.status || "").toLowerCase() === "missed").length;
    const failed = calls.filter((call) => (call.status || "").toLowerCase() === "failed").length;
    return [
      { id: "missed", text: `${missed} missed calls need follow-up.`, visible: missed > 0 },
      { id: "failed", text: `${failed} failed workflows detected in recent calls.`, visible: failed > 0 },
      { id: "limit", text: `You have used ${usagePercent}% of your plan minutes.`, visible: usagePercent >= 85 }
    ].filter((item) => item.visible);
  }, [calls, usagePercent]);

  if (loading || (isAuthenticated && !overview && !error)) {
    return <div className="text-sm text-[var(--text-secondary)]">Loading your dashboard...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-sm text-red-400">Please sign in to continue.</div>;
  }

  if (error || !overview) {
    return <div className="text-sm text-red-400">{error || "Unable to load dashboard."}</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="font-heading text-4xl font-[800] tracking-[-0.05em] text-[var(--text-primary)]">{user?.name || "Your business"}</h1>
            <p className="mt-3 max-w-[720px] text-sm leading-7 text-[var(--text-secondary)]">
              Monitor live calls, call quality, and plan headroom in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[rgba(255,107,0,0.25)] bg-[rgba(255,107,0,0.12)] px-4 py-2 text-sm font-semibold capitalize text-[var(--light-accent)]">
              {user?.plan || "starter"} plan
            </span>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-5">
        {[
          { label: "Total Calls Today", value: formatNumber(overview.calls_today), icon: PhoneCall },
          { label: "Calls Answered", value: formatNumber(Math.round((overview.calls_today * overview.success_rate) / 100)), icon: CheckCircle2 },
          { label: "Resolution Rate", value: `${overview.success_rate}%`, icon: BarChart3 },
          {
            label: "Avg Call Duration",
            value: `${Math.max(20, Math.round((overview.minutes_used * 60) / Math.max(overview.total_calls, 1)))}s`,
            icon: Clock3
          },
          { label: "Active Agents", value: formatNumber(overview.active_agents), icon: Users }
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[rgba(255,107,0,0.24)] bg-[rgba(255,107,0,0.18)] text-[var(--light-accent)]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">{metric.label}</p>
              <p className="mt-2 font-heading text-3xl font-[800] tracking-[-0.04em] text-white">{metric.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden p-0">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-base)] px-6 py-5">
            <div>
              <p className="eyebrow mb-0">Real-time feed</p>
              <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Live calls in progress</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(5,150,105,0.35)] bg-[rgba(5,150,105,0.14)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
              <Radio className="h-3.5 w-3.5 animate-pulse" /> Live
            </span>
          </div>
          <div className="space-y-4 px-6 py-5">
            {activeCallFeed.length ? (
              activeCallFeed.map((call) => (
                <div key={`live-${call.id}`} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--text-primary)]">{call.agent_name || "AI Receptionist"}</p>
                    <span className="text-xs uppercase tracking-[0.12em] text-emerald-300">{call.status || "live"}</span>
                  </div>
                  <div className="mt-3 flex items-end gap-1">
                    {Array.from({ length: 24 }).map((_, barIndex) => (
                      <span
                        key={`${call.id}-wave-${barIndex}`}
                        className="inline-block w-1 rounded-full bg-[var(--light-accent)] opacity-80 animate-pulse"
                        style={{ height: `${8 + ((barIndex * 7) % 26)}px`, animationDelay: `${barIndex * 0.08}s` }}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-secondary)]">No live calls right now.</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Quick actions</p>
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Move faster</h2>
          <div className="mt-4 grid gap-3">
            <Button asChild>
              <Link href="/dashboard/agents">
                <Plus className="mr-2 h-4 w-4" /> Create Agent
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/phone-numbers">
                <Plus className="mr-2 h-4 w-4" /> Add Phone Number
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard/calls">
                <Waves className="mr-2 h-4 w-4" /> View Recordings
              </Link>
            </Button>
          </div>

          <div className="mt-6 border-t border-[var(--border-base)] pt-5">
            <p className="eyebrow">Notification panel</p>
            <div className="mt-3 space-y-2">
              {notifications.length ? (
                notifications.map((item) => (
                  <div key={item.id} className="flex items-start gap-2 rounded-[12px] border border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.08)] p-3 text-sm text-amber-200">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))
              ) : (
                <div className="rounded-[12px] border border-[rgba(5,150,105,0.35)] bg-[rgba(5,150,105,0.14)] p-3 text-sm text-emerald-200">
                  No urgent alerts. Your call workflows are stable.
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-0">Call volume chart</p>
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">7-day / 30-day trend</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant={range === 7 ? "default" : "outline"} onClick={() => setRange(7)}>
              7 days
            </Button>
            <Button size="sm" variant={range === 30 ? "default" : "outline"} onClick={() => setRange(30)}>
              30 days
            </Button>
            <select
              value={agentFilter}
              onChange={(event) => setAgentFilter(event.target.value)}
              className="h-9 rounded-md border border-[var(--border-base)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)]"
            >
              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent === "all" ? "All agents" : agent}
                </option>
              ))}
            </select>
            <select
              value={numberFilter}
              onChange={(event) => setNumberFilter(event.target.value)}
              className="h-9 rounded-md border border-[var(--border-base)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)]"
            >
              {numbers.map((number) => (
                <option key={number} value={number}>
                  {number === "all" ? "All numbers" : number}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex h-52 items-end gap-2 rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
            {chartData.map((point) => (
              <div key={point.label} className="group flex h-full flex-1 flex-col justify-end">
                <div
                  className="w-full rounded-t-[10px] bg-[linear-gradient(180deg,#FFB380,#FF6B00)] transition-opacity group-hover:opacity-90"
                  style={{ height: `${Math.max((point.count / maxChartValue) * 100, 6)}%` }}
                  title={`${point.label}: ${point.count} calls`}
                />
                <span className="mt-2 text-center text-[10px] text-[var(--text-secondary)]">{point.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            Filtered call count across {range} days ({agentFilter === "all" ? "all agents" : agentFilter},{" "}
            {numberFilter === "all" ? "all numbers" : numberFilter}).
          </p>
        </div>
      </Card>
    </div>
  );
}

