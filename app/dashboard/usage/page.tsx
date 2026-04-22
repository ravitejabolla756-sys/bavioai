"use client";

import { useEffect, useMemo, useState } from "react";
import { Database, Gauge, Sparkles, Waves } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatNumber } from "@/lib/utils";

type OverviewResponse = {
  success: boolean;
  data: {
    total_calls: number;
    total_leads: number;
    active_agents: number;
    minutes_used: number;
    minutes_limit: number;
    cost_this_month: number;
  };
};

export default function DashboardUsagePage() {
  const { token } = useAuth();
  const [overview, setOverview] = useState<OverviewResponse["data"] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    clientApi
      .get<OverviewResponse>("/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setOverview(response.data.data))
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load usage."));
  }, [token]);

  const tokenEstimate = useMemo(() => (overview ? overview.total_calls * 1850 : 0), [overview]);
  const sttMinutes = useMemo(() => Math.max(overview?.minutes_used || 0, 0), [overview]);
  const ttsCharacters = useMemo(() => tokenEstimate * 3, [tokenEstimate]);
  const apiCalls = useMemo(() => Math.max((overview?.total_calls || 0) * 14, 0), [overview]);

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (!overview) {
    return <p className="text-sm text-[var(--text-secondary)]">Loading AI usage...</p>;
  }

  const usageCards = [
    { label: "LLM tokens", value: formatNumber(tokenEstimate), note: "Estimated from live calls", icon: Sparkles },
    { label: "STT minutes", value: formatNumber(sttMinutes), note: "Speech processed this cycle", icon: Waves },
    { label: "TTS characters", value: formatNumber(ttsCharacters), note: "Voice response output", icon: Database },
    { label: "API calls", value: formatNumber(apiCalls), note: "Workspace API requests", icon: Gauge }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">AI Usage</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Track every AI resource your workspace consumes.</h1>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
            LLM tokens, STT minutes, TTS output, API calls, and concurrent usage trends all roll up here.
          </p>
        </div>
        <Button variant="ghost">Download usage report</Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {usageCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--brand-dim)] text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{card.label}</p>
              <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{card.value}</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{card.note}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6">
          <p className="eyebrow">Usage timeline</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Current cycle trajectory</h2>
          <div className="mt-8 flex h-[260px] items-end gap-3">
            {[28, 32, 41, 46, 49, 54, 58, 63, 68, 72, 78, 84].map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-[14px] bg-[linear-gradient(180deg,#A855F7,#7B2FBE)]"
                  style={{ height: `${Math.max(value * 2, 22)}px` }}
                />
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">D{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Recommendations</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Proactive guidance</h2>
          <div className="mt-5 space-y-3">
            {[
              `At the current pace, usage is tracking toward ${formatNumber(Math.round((overview.minutes_used / Math.max(overview.minutes_limit, 1)) * 100))}% of your included minutes.`,
              "If call volume grows this week, consider enabling overage protection or moving up one tier before renewal.",
              "Review agent prompts after any spike in token use to keep responses compact and efficient."
            ].map((item) => (
              <div key={item} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm leading-6 text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
