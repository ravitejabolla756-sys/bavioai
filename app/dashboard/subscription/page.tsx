"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";
import { formatCurrency, formatNumber } from "@/lib/utils";

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

const plans = [
  { name: "starter", label: "Starter", price: 1999, summary: "For smaller teams getting live fast." },
  { name: "growth", label: "Growth", price: 3999, summary: "For production call flows and faster scaling." },
  { name: "scale", label: "Scale", price: 7999, summary: "For heavier call volume and deeper support needs." }
];

export default function DashboardSubscriptionPage() {
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
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load subscription."));
  }, [token]);

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (!billing) {
    return <p className="text-sm text-[var(--text-secondary)]">Loading subscription...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Subscription</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Plan health, limits, and renewal timing.</h1>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
            This is the cleanest place to understand what your current plan includes and when it makes sense to move up.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/billing">
            Open billing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Current plan</p>
            <h2 className="text-4xl font-black uppercase tracking-[-0.05em] text-primary">{billing.plan || "starter"}</h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">Status: {(billing.status || "active").toUpperCase()}</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-[16px] border border-border bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                Renews on {billing.billing_period_end ? new Date(billing.billing_period_end).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "the next cycle"}
              </div>
              <div className="rounded-[16px] border border-border bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                {formatNumber(billing.minutes_used || 0)} used out of {formatNumber(billing.minutes_limit || 0)} included minutes
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[20px] border p-5 ${
                  billing.plan === plan.name ? "border-[var(--border-brand)] bg-[var(--brand-dim)]" : "border-border bg-[var(--bg-base)]"
                }`}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{plan.label}</p>
                <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{formatCurrency(plan.price)}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{plan.summary}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--accent-green)]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Upgrade friendly
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <p className="eyebrow">Limits</p>
          <div className="mt-4 space-y-3">
            {[
              ["Monthly minutes", `${formatNumber(billing.minutes_used || 0)} used / ${formatNumber(billing.minutes_limit || 0)} included`],
              ["Concurrent calls", "Derived by your current plan tier"],
              ["Agents", "1 live agent supported in the current setup"],
              ["Support level", billing.plan === "scale" ? "Priority support" : "Standard support"]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-[16px] border border-border bg-[var(--bg-base)] px-4 py-3 text-sm">
                <span className="text-[var(--text-secondary)]">{label}</span>
                <span className="font-medium text-[var(--text-primary)]">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Why upgrade</p>
          <div className="mt-4 space-y-3">
            {[
              { icon: CreditCard, text: "Move up before limits create operational risk." },
              { icon: ShieldCheck, text: "Keep overage and renewals clear for finance and operations teams." },
              { icon: CheckCircle2, text: "Unlock more headroom for peak calling hours and future workflows." }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-start gap-3 rounded-[16px] border border-border bg-[var(--bg-base)] px-4 py-4 text-sm leading-6 text-[var(--text-secondary)]">
                  <Icon className="mt-0.5 h-4 w-4 text-primary" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
