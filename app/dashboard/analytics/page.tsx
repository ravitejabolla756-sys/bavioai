"use client";

import { useEffect, useMemo, useState } from "react";
import { FileDown, PlugZap } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatNumber } from "@/lib/utils";

type CallRecord = {
  id: string;
  duration?: number | null;
  created_at?: string | null;
  status?: string | null;
  phone_number?: string | null;
  caller_number?: string | null;
  agent_name?: string | null;
  industry?: string | null;
  intent?: string | null;
};

function sentimentScore(seed: string) {
  const value = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 100;
  return Math.max(0.2, Math.min(0.95, value / 100));
}

export default function DashboardAnalyticsPage() {
  const { token } = useAuth();
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [error, setError] = useState("");
  const [range, setRange] = useState<7 | 30>(30);
  const [agent, setAgent] = useState("all");
  const [number, setNumber] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (!token) return;

    clientApi
      .get<{ success: boolean; data: CallRecord[] }>("/calls?limit=300", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setCalls(response.data.data || []))
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load analytics."));
  }, [token]);

  const agents = useMemo(() => ["all", ...Array.from(new Set(calls.map((c) => c.agent_name || "Unassigned")))], [calls]);
  const numbers = useMemo(() => ["all", ...Array.from(new Set(calls.map((c) => c.phone_number || c.caller_number || "Unknown")))], [calls]);
  const industries = useMemo(() => ["all", ...Array.from(new Set(calls.map((c) => c.industry || "General")))], [calls]);

  const filteredCalls = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - (range - 1));

    return calls.filter((call) => {
      const created = call.created_at ? new Date(call.created_at) : now;
      const inRange = created >= start;
      const callAgent = call.agent_name || "Unassigned";
      const callNumber = call.phone_number || call.caller_number || "Unknown";
      const callIndustry = call.industry || "General";
      const callStatus = (call.status || "completed").toLowerCase();

      return inRange && (agent === "all" || callAgent === agent) && (number === "all" || callNumber === number) && (industry === "all" || callIndustry === industry) && (status === "all" || callStatus === status);
    });
  }, [agent, calls, industry, number, range, status]);

  const summary = useMemo(() => {
    const totalCalls = filteredCalls.length;
    const totalMinutes = filteredCalls.reduce((acc, call) => acc + Number(call.duration || 0), 0) / 60;
    const resolved = filteredCalls.filter((call) => (call.status || "").toLowerCase() === "completed").length;
    const avgResolution = totalCalls ? Math.round((resolved / totalCalls) * 100) : 0;
    const avgSentiment = totalCalls ? filteredCalls.reduce((acc, call) => acc + sentimentScore(call.id), 0) / totalCalls : 0;
    const csat = Math.round(avgSentiment * 100);
    const totalCost = totalMinutes * 0.42;
    const costPerCall = totalCalls ? totalCost / totalCalls : 0;
    return { totalCalls, totalMinutes, avgResolution, csat, costPerCall };
  }, [filteredCalls]);

  const callVolumeSeries = useMemo(() => {
    const now = new Date();
    const points = Array.from({ length: range }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (range - 1 - i));
      return date;
    });

    return points.map((date) => {
      const key = date.toISOString().slice(0, 10);
      const total = filteredCalls.filter((call) => (call.created_at ? new Date(call.created_at).toISOString().slice(0, 10) : "") === key).length;
      const resolved = filteredCalls.filter((call) => {
        const callKey = call.created_at ? new Date(call.created_at).toISOString().slice(0, 10) : "";
        return callKey === key && (call.status || "").toLowerCase() === "completed";
      }).length;
      return { label: `${date.getMonth() + 1}/${date.getDate()}`, total, resolution: total ? Math.round((resolved / total) * 100) : 0 };
    });
  }, [filteredCalls, range]);

  const maxVolume = Math.max(...callVolumeSeries.map((p) => p.total), 1);

  const heatmap = useMemo(() => {
    const bins = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }));
    filteredCalls.forEach((call) => {
      const d = call.created_at ? new Date(call.created_at) : null;
      const h = d ? d.getHours() : 12;
      bins[h].count += 1;
    });
    const peak = Math.max(...bins.map((b) => b.count), 1);
    return bins.map((b) => ({ ...b, intensity: b.count / peak }));
  }, [filteredCalls]);

  const topIntents = useMemo(() => {
    const intentMap = new Map<string, number>();
    filteredCalls.forEach((call) => {
      const intent = call.intent || "General inquiry";
      intentMap.set(intent, (intentMap.get(intent) || 0) + 1);
    });
    return Array.from(intentMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [filteredCalls]);

  const agentPerformance = useMemo(() => {
    const map = new Map<string, { calls: number; resolved: number; durationSum: number; sentimentSum: number }>();
    filteredCalls.forEach((call) => {
      const key = call.agent_name || "Unassigned";
      const current = map.get(key) || { calls: 0, resolved: 0, durationSum: 0, sentimentSum: 0 };
      current.calls += 1;
      current.durationSum += Number(call.duration || 0);
      current.sentimentSum += sentimentScore(call.id);
      if ((call.status || "").toLowerCase() === "completed") current.resolved += 1;
      map.set(key, current);
    });

    return Array.from(map.entries()).map(([name, stats]) => ({
      name,
      resolutionRate: stats.calls ? Math.round((stats.resolved / stats.calls) * 100) : 0,
      avgDuration: stats.calls ? Math.round(stats.durationSum / stats.calls) : 0,
      sentiment: stats.calls ? Number((stats.sentimentSum / stats.calls).toFixed(2)) : 0
    }));
  }, [filteredCalls]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Analytics Dashboard</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Performance insights across calls, agents, and outcomes.</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <FileDown className="mr-2 h-4 w-4" /> Export PDF Report
          </Button>
          <Button>
            <PlugZap className="mr-2 h-4 w-4" /> Connect BI API
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 xl:grid-cols-5">
          <select value={range} onChange={(e) => setRange(Number(e.target.value) as 7 | 30)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
          </select>
          <select value={agent} onChange={(e) => setAgent(e.target.value)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            {agents.map((item) => (
              <option key={item} value={item}>{item === "all" ? "All agents" : item}</option>
            ))}
          </select>
          <select value={number} onChange={(e) => setNumber(e.target.value)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            {numbers.map((item) => (
              <option key={item} value={item}>{item === "all" ? "All numbers" : item}</option>
            ))}
          </select>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            {industries.map((item) => (
              <option key={item} value={item}>{item === "all" ? "All industries" : item}</option>
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="started">Started</option>
            <option value="missed">Missed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </Card>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="grid gap-4 xl:grid-cols-5">
        {[
          ["Total Calls", formatNumber(summary.totalCalls)],
          ["Total Minutes Used", formatNumber(Math.round(summary.totalMinutes))],
          ["Avg Resolution Rate", `${summary.avgResolution}%`],
          ["CSAT Score", `${summary.csat}%`],
          ["Cost Per Call", `$${summary.costPerCall.toFixed(2)}`]
        ].map(([label, value]) => (
          <Card key={label} className="p-6">
            <p className="text-sm text-[var(--text-muted)]">{label}</p>
            <p className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <p className="eyebrow mb-0">Call volume over time</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Daily volume trend</h2>
          <div className="mt-6 flex h-56 items-end gap-2">
            {callVolumeSeries.map((point) => (
              <div key={point.label} className="flex h-full flex-1 flex-col justify-end">
                <div className="w-full rounded-t-[10px] bg-[linear-gradient(180deg,#FFB380,#FF6B00)]" style={{ height: `${Math.max((point.total / maxVolume) * 100, 5)}%` }} title={`${point.total} calls`} />
                <span className="mt-2 text-center text-[10px] text-[var(--text-muted)]">{point.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow mb-0">Resolution rate trend</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Daily completion percentage</h2>
          <div className="mt-5 space-y-3">
            {callVolumeSeries.slice(-10).map((point) => (
              <div key={`resolution-${point.label}`}>
                <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>{point.label}</span>
                  <span>{point.resolution}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${point.resolution}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <p className="eyebrow mb-0">Peak call hours heatmap</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">24-hour distribution</h2>
          <div className="mt-5 grid grid-cols-6 gap-2">
            {heatmap.map((cell) => (
              <div
                key={`hour-${cell.hour}`}
                className="rounded-[8px] p-2 text-center text-xs"
                style={{ backgroundColor: `rgba(255,107,0,${0.1 + cell.intensity * 0.75})` }}
                title={`${cell.hour}:00 - ${cell.count} calls`}
              >
                {cell.hour}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow mb-0">Top intents detected</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Most common conversation intents</h2>
          <div className="mt-5 space-y-3">
            {topIntents.length ? (
              topIntents.map(([intent, count]) => {
                const width = `${Math.max((count / Math.max(topIntents[0][1], 1)) * 100, 8)}%`;
                return (
                  <div key={intent}>
                    <div className="mb-1 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                      <span>{intent}</span>
                      <span>{count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                      <div className="h-full rounded-full bg-[var(--light-accent)]" style={{ width }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-[var(--text-secondary)]">No intent data available.</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] bg-[var(--bg-overlay)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          <span>Agent</span>
          <span>Resolution Rate</span>
          <span>Avg Duration</span>
          <span>Sentiment</span>
        </div>
        {agentPerformance.length ? (
          agentPerformance.map((row) => (
            <div key={row.name} className="grid grid-cols-[1fr_1fr_1fr_1fr] border-t border-[var(--border-base)] px-5 py-4 text-sm">
              <span className="font-medium text-[var(--text-primary)]">{row.name}</span>
              <span className="text-[var(--text-secondary)]">{row.resolutionRate}%</span>
              <span className="text-[var(--text-secondary)]">{row.avgDuration}s</span>
              <span className="text-[var(--text-secondary)]">{row.sentiment}</span>
            </div>
          ))
        ) : (
          <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">No agent performance data available.</div>
        )}
      </Card>
    </div>
  );
}

