"use client";

import { BarChart3, Clock3, PhoneCall, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatCurrency, formatNumber } from "@/lib/utils";

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
  duration?: number | null;
  status?: string | null;
  created_at?: string | null;
};

type LeadRecord = {
  id: string;
  name?: string | null;
  phone?: string | null;
  intent?: string | null;
  budget?: string | null;
  status?: string | null;
};

export function DashboardOverview() {
  const { token, loading, isAuthenticated, user, logout } = useAuth();
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    Promise.all([
      clientApi.get<{ success: boolean; data: OverviewData }>("/analytics/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      clientApi.get<{ success: boolean; data: CallRecord[] }>("/calls", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      clientApi.get<{ success: boolean; data: LeadRecord[] }>("/leads", {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])
      .then(([overviewResponse, callsResponse, leadsResponse]) => {
        setOverview(overviewResponse.data.data);
        setCalls((callsResponse.data.data || []).slice(0, 6));
        setLeads((leadsResponse.data.data || []).slice(0, 4));
      })
      .catch((fetchError) => {
        setError(fetchError?.response?.data?.error || "Unable to load dashboard.");
      });
  }, [token]);

  const usagePercent = useMemo(() => {
    if (!overview) return 0;
    return Math.min(100, Math.round((overview.minutes_used / Math.max(overview.minutes_limit, 1)) * 100));
  }, [overview]);

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
            <h1 className="font-heading text-4xl font-[800] tracking-[-0.05em] text-[var(--text-primary)]">
              {user?.name || "Your business"}
            </h1>
            <p className="mt-3 max-w-[720px] text-sm leading-7 text-[var(--text-secondary)]">
              Track plan usage, recent calls, captured leads, and how your AI front desk is performing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[rgba(124,58,237,0.25)] bg-[rgba(124,58,237,0.12)] px-4 py-2 text-sm font-semibold capitalize text-[var(--light-accent)]">
              {user?.plan || "starter"} plan
            </span>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
          <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
            <span>Minutes used</span>
            <span>
              {formatNumber(overview.minutes_used)} / {formatNumber(overview.minutes_limit)}
            </span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--bg-muted)]">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#7c3aed,#c084fc)]" style={{ width: `${usagePercent}%` }} />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-4">
        {[
          { label: "Calls today", value: formatNumber(overview.calls_today), icon: PhoneCall },
          { label: "Total leads", value: formatNumber(overview.total_leads), icon: Users },
          { label: "Resolution rate", value: `${overview.success_rate}%`, icon: BarChart3 },
          { label: "Monthly spend", value: formatCurrency(overview.cost_this_month), icon: Clock3 }
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[rgba(124,58,237,0.24)] bg-[rgba(124,58,237,0.18)] text-[var(--light-accent)]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">{metric.label}</p>
              <p className="mt-2 font-heading text-3xl font-[800] tracking-[-0.04em] text-white">{metric.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-[var(--border-base)] px-6 py-5">
            <div>
              <p className="eyebrow mb-0">Recent calls</p>
              <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Latest call activity</h2>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr] bg-[var(--bg-overlay)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            <span>Caller number</span>
            <span>Duration</span>
            <span>Status</span>
            <span>Sentiment</span>
          </div>
          {calls.length ? (
            calls.map((call) => (
              <div key={call.id} className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr] border-t border-[var(--border-base)] px-6 py-4 text-sm">
                <span className="font-medium text-[var(--text-primary)]">{call.caller_number || "Unknown caller"}</span>
                <span className="text-[var(--text-secondary)]">{call.duration || 0}s</span>
                <span className="capitalize text-[var(--light-accent)]">{call.status || "completed"}</span>
                <span className="text-[var(--text-secondary)]">—</span>
              </div>
            ))
          ) : (
            <div className="px-6 py-6 text-sm text-[var(--text-secondary)]">No calls yet.</div>
          )}
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Recent leads</p>
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Latest opportunities</h2>
          <div className="mt-5 space-y-3">
            {leads.length ? (
              leads.map((lead) => (
                <div key={lead.id} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-[var(--text-primary)]">{lead.name || lead.phone || "New lead"}</p>
                    <span className="rounded-full border border-[var(--border-base)] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                      {lead.status || "new"}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-[var(--text-secondary)]">
                    <p>Intent: {lead.intent || "General enquiry"}</p>
                    <p>Budget: {lead.budget || "Not captured"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-secondary)]">No leads captured yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
