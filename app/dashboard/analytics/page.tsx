"use client";

import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatNumber } from "@/lib/utils";

type Overview = {
  success: boolean;
  data: {
    total_calls: number;
    total_leads: number;
    success_rate: number;
    recent_calls: Array<{ id: string; duration?: number | null; created_at?: string | null }>;
  };
};

type CallsResponse = {
  success: boolean;
  data: Array<{
    id: string;
    duration?: number | null;
    created_at?: string | null;
    leads?: Array<{ id: string }>;
  }>;
};

export default function DashboardAnalyticsPage() {
  const { token } = useAuth();
  const [overview, setOverview] = useState<Overview["data"] | null>(null);
  const [calls, setCalls] = useState<CallsResponse["data"]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    Promise.all([
      clientApi.get<Overview>("/analytics/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      clientApi.get<CallsResponse>("/calls?limit=120", {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])
      .then(([overviewResponse, callsResponse]) => {
        setOverview(overviewResponse.data.data);
        setCalls(callsResponse.data.data || []);
      })
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load analytics."));
  }, [token]);

  const dailySeries = useMemo(() => {
    const dayMap = new Map<string, number>();

    calls.forEach((call) => {
      const key = call.created_at ? new Date(call.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Today";
      dayMap.set(key, (dayMap.get(key) || 0) + 1);
    });

    return Array.from(dayMap.entries()).slice(-7);
  }, [calls]);

  const maxValue = Math.max(...dailySeries.map(([, value]) => value), 1);
  const avgDuration = calls.length
    ? Math.round(calls.reduce((sum, call) => sum + Number(call.duration || 0), 0) / calls.length)
    : 0;
  const resolved = calls.filter((call) => (call.leads?.length || 0) > 0).length;
  const escalated = Math.max(calls.length - resolved, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Analytics</p>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Track performance by call outcome.</h1>
        <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
          Review call volume, conversion, and duration patterns from the same backend data your workspace already records.
        </p>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="grid gap-4 xl:grid-cols-4">
        {[
          ["Total calls", formatNumber(overview?.total_calls || 0)],
          ["Total leads", formatNumber(overview?.total_leads || 0)],
          ["Conversion rate", `${overview?.success_rate || 0}%`],
          ["Avg duration", `${avgDuration}s`]
        ].map(([label, value]) => (
          <Card key={label} className="p-6">
            <p className="text-sm text-[var(--text-muted)]">{label}</p>
            <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <p className="eyebrow">Calls Per Day</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Last 7 active days</h2>
          <div className="mt-8 flex h-[260px] items-end gap-4">
            {dailySeries.length ? (
              dailySeries.map(([label, value]) => (
                <div key={label} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex w-full items-end justify-center rounded-t-[14px] bg-[linear-gradient(180deg,rgba(123,47,190,0.9),rgba(168,85,247,0.35))]" style={{ height: `${Math.max((value / maxValue) * 220, 20)}px` }}>
                    <span className="mb-3 text-sm font-semibold text-black">{value}</span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{label}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-secondary)]">No analytics yet.</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Resolution Mix</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Lead capture breakdown</h2>
          <div className="mt-8 space-y-5">
            {[
              { label: "Resolved with lead", value: resolved, color: "bg-[var(--accent-green)]" },
              { label: "Needs follow-up", value: escalated, color: "bg-[var(--brand)]" }
            ].map((item) => {
              const total = Math.max(calls.length, 1);
              const width = `${Math.max((item.value / total) * 100, item.value ? 8 : 0)}%`;

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                    <span>{item.label}</span>
                    <span>{formatNumber(item.value)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
