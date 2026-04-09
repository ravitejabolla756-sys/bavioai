"use client";

import { useEffect, useState } from "react";
import { CreditCard, Receipt, ShieldCheck } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/shared/toast-provider";
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
    billing_period_start?: string | null;
    billing_period_end?: string | null;
  };
};

const plans = [
  { name: "starter", label: "Starter", price: 1999 },
  { name: "growth", label: "Growth", price: 3999 },
  { name: "scale", label: "Scale", price: 7999 }
];

export default function DashboardBillingPage() {
  const { token } = useAuth();
  const { pushToast } = useToast();
  const [billing, setBilling] = useState<BillingUsage["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    clientApi
      .get<BillingUsage>("/billing/usage", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setBilling(response.data.data))
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load billing."))
      .finally(() => setLoading(false));
  }, [token]);

  async function subscribe(plan: string) {
    if (!token) return;
    setSubscribing(plan);
    setError("");

    try {
      const response = await clientApi.post<{ success: boolean; data: { checkout_url: string } }>(
        "/billing/subscribe",
        { plan },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const checkoutUrl = response.data.data.checkout_url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }

      pushToast({
        kind: "success",
        title: "Plan updated",
        message: "Your billing preference has been recorded."
      });
    } catch (subscribeError: any) {
      setError(subscribeError?.response?.data?.error || "Unable to open checkout.");
    } finally {
      setSubscribing("");
    }
  }

  const usageRatio = Math.min(
    100,
    Math.round(((billing?.minutes_used || 0) / Math.max(billing?.minutes_limit || 1, 1)) * 100)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Billing</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Payments, usage, and plan controls.</h1>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
            Keep finance, operations, and renewal decisions aligned from one billing surface.
          </p>
        </div>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-6">
          <p className="eyebrow">Current plan</p>
          {loading ? (
            <p className="text-sm text-[var(--text-secondary)]">Loading billing...</p>
          ) : (
            <>
              <h2 className="text-3xl font-black capitalize tracking-[-0.04em] text-primary">{billing?.plan || "starter"}</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Status: {(billing?.status || "active").toUpperCase()}</p>
              <div className="mt-6 rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
                <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                  <span>{formatNumber(billing?.minutes_used || 0)} used</span>
                  <span>{formatNumber(billing?.minutes_limit || 0)} included</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#7B2FBE,#A855F7)]" style={{ width: `${usageRatio}%` }} />
                </div>
                <p className="mt-4 text-sm text-[var(--text-muted)]">
                  Billing period:{" "}
                  {billing?.billing_period_start ? new Date(billing.billing_period_start).toLocaleDateString("en-IN") : "Not set"} to{" "}
                  {billing?.billing_period_end ? new Date(billing.billing_period_end).toLocaleDateString("en-IN") : "Not set"}
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-[16px] border border-border bg-[var(--bg-base)] p-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Receipt className="h-4 w-4 text-primary" />
                    Next invoice preview
                  </div>
                  <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">{formatCurrency(plans.find((plan) => plan.name === billing?.plan)?.price || 1999)}</p>
                </div>
                <div className="rounded-[16px] border border-border bg-[var(--bg-base)] p-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <ShieldCheck className="h-4 w-4 text-[var(--accent-green)]" />
                    Payment state
                  </div>
                  <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">{(billing?.status || "active").toUpperCase()}</p>
                </div>
              </div>
            </>
          )}
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`p-6 ${billing?.plan === plan.name ? "border-[var(--border-brand)] bg-[rgba(123,47,190,0.08)]" : ""}`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--brand-dim)] text-primary">
                <CreditCard className="h-4 w-4" />
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.14em] text-[var(--text-muted)]">{plan.label}</p>
              <p className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">{formatCurrency(plan.price)}</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Per month, plus usage.</p>
              <Button
                className="mt-6 w-full"
                variant={plan.name === "growth" ? "default" : "ghost"}
                onClick={() => subscribe(plan.name)}
                loading={subscribing === plan.name}
              >
                {billing?.plan === plan.name ? "Current Plan" : `Switch to ${plan.label}`}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
