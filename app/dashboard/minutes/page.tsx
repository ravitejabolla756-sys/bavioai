"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Clock3, Gauge, TrendingUp } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatNumber } from "@/lib/utils";

type BillingUsage = {
  success: boolean;
  data: {
    minutes_used?: number | null;
    minutes_limit?: number | null;
    billing_period_end?: string | null;
  };
};

export default function DashboardMinutesPage() {
  const { token } = useAuth();
  const [billing, setBilling] = useState<BillingUsage["data"] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    clientApi
      .get<BillingUsage>("/billing/usage", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setBilling(response.data.data))
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load minutes."));
  }, [token]);

  const usagePercent = useMemo(() => {
    if (!billing) return 0;
    return Math.min(100, Math.round(((billing.minutes_used || 0) / Math.max(billing.minutes_limit || 1, 1)) * 100));
  }, [billing]);

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (!billing) {
    return <p className="text-sm text-[var(--text-secondary)]">Loading minutes...</p>;
  }

  const remaining = Math.max((billing.minutes_limit || 0) - (billing.minutes_used || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Minutes</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">See exactly where your plan stands.</h1>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
            Minutes are the clearest indicator of call capacity, billing health, and whether you need a top-up or an upgrade.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost">Buy top-up</Button>
          <Button>Upgrade plan</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <p className="eyebrow">Minutes gauge</p>
          <div className="mt-4 flex flex-col items-center text-center">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-[14px] border-[var(--bg-subtle)]">
              <div
                className="absolute inset-0 rounded-full border-[14px] border-transparent"
                style={{
                  background: `conic-gradient(${usagePercent > 85 ? "#EF4444" : usagePercent > 60 ? "#F59E0B" : "#7B2FBE"} ${usagePercent * 3.6}deg, transparent 0deg)`,
                  WebkitMask: "radial-gradient(circle at center, transparent 64%, black 65%)",
                  mask: "radial-gradient(circle at center, transparent 64%, black 65%)"
                }}
              />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Remaining</p>
                <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">{formatNumber(remaining)}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">of {formatNumber(billing.minutes_limit || 0)} minutes</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "Minutes used", value: formatNumber(billing.minutes_used || 0), note: `${usagePercent}% of plan`, icon: Gauge },
            { label: "Minutes remaining", value: formatNumber(remaining), note: "Updated after each call", icon: Clock3 },
            { label: "Projected end of cycle", value: formatNumber(Math.round((billing.minutes_used || 0) * 1.2)), note: "Based on current daily average", icon: TrendingUp },
            {
              label: "Cycle ends",
              value: billing.billing_period_end ? new Date(billing.billing_period_end).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "This month",
              note: usagePercent > 85 ? "Overage risk is high" : "Healthy runway",
              icon: AlertTriangle
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--brand-dim)] text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{item.label}</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{item.value}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.note}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
