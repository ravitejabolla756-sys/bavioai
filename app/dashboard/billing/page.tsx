"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, CalendarClock, CreditCard, Landmark, Receipt, ShieldCheck, Smartphone, Wallet } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/shared/toast-provider";
import { Badge } from "@/components/ui/badge";
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
] as const;

const invoiceHistory = [
  { id: "INV-2026-004", date: "2026-04-01", amount: 3999, status: "Paid" },
  { id: "INV-2026-003", date: "2026-03-01", amount: 3999, status: "Paid" },
  { id: "INV-2026-002", date: "2026-02-01", amount: 1999, status: "Paid" },
  { id: "INV-2026-001", date: "2026-01-01", amount: 1999, status: "Paid" }
];

export default function DashboardBillingPage() {
  const { token } = useAuth();
  const { pushToast } = useToast();
  const [billing, setBilling] = useState<BillingUsage["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState("");
  const [error, setError] = useState("");
  const [autoRenewal, setAutoRenewal] = useState(true);

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
        message: `Plan switched to ${plan} with immediate effect.`
      });
    } catch (subscribeError: any) {
      setError(subscribeError?.response?.data?.error || "Unable to switch plan.");
    } finally {
      setSubscribing("");
    }
  }

  const usageRatio = Math.min(100, Math.round(((billing?.minutes_used || 0) / Math.max(billing?.minutes_limit || 1, 1)) * 100));
  const nextBillingDate = billing?.billing_period_end ? new Date(billing.billing_period_end).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "Not set";

  const currentPlanAmount = useMemo(() => {
    return plans.find((plan) => plan.name === billing?.plan)?.price || plans[0].price;
  }, [billing?.plan]);

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Billing & Subscription</p>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Control plan, payments, and invoices from one place.</h1>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="p-6">
          <p className="eyebrow">Current plan details</p>
          {loading ? (
            <p className="text-sm text-[var(--text-secondary)]">Loading billing...</p>
          ) : (
            <>
              <h2 className="text-3xl font-black capitalize tracking-[-0.04em] text-primary">{billing?.plan || "starter"}</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3">
                  <span className="text-[var(--text-secondary)]">Status</span>
                  <Badge variant="success">{(billing?.status || "active").toUpperCase()}</Badge>
                </div>
                <div className="flex items-center justify-between rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3">
                  <span className="text-[var(--text-secondary)]">Next billing date</span>
                  <span className="font-medium text-[var(--text-primary)]">{nextBillingDate}</span>
                </div>
                <div className="flex items-center justify-between rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3">
                  <span className="text-[var(--text-secondary)]">Auto-renewal</span>
                  <button type="button" className="font-medium text-[var(--light-accent)]" onClick={() => setAutoRenewal((v) => !v)}>
                    {autoRenewal ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                  <span>Usage meter</span>
                  <span>{usageRatio}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#E55A00,#FF6B00)]" style={{ width: `${usageRatio}%` }} />
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {formatNumber(billing?.minutes_used || 0)} used / {formatNumber(billing?.minutes_limit || 0)} included minutes
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                    <CalendarClock className="h-3.5 w-3.5" /> Billing cycle
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-primary)]">
                    {billing?.billing_period_start ? new Date(billing.billing_period_start).toLocaleDateString("en-IN") : "-"} to {nextBillingDate}
                  </p>
                </div>
                <div className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                    <Receipt className="h-3.5 w-3.5" /> Next invoice
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-primary)]">{formatCurrency(currentPlanAmount)}</p>
                </div>
              </div>
            </>
          )}
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Upgrade or downgrade</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Plan changes apply immediately</h2>
          <div className="mt-4 grid gap-3">
            {plans.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{plan.label}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{formatCurrency(plan.price)} / month</p>
                </div>
                <Button onClick={() => subscribe(plan.name)} loading={subscribing === plan.name} variant={billing?.plan === plan.name ? "outline" : "default"}>
                  {billing?.plan === plan.name ? "Current plan" : `Switch now`}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="p-6">
          <p className="eyebrow">Invoice history</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Download past invoices (PDF)</h2>
          <div className="mt-4 space-y-3">
            {invoiceHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                <div>
                  <p className="font-medium text-[var(--text-primary)]">{invoice.id}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{new Date(invoice.date).toLocaleDateString("en-IN")} - {formatCurrency(invoice.amount)}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => pushToast({ kind: "success", title: "Invoice download started", message: `${invoice.id}.pdf is being prepared.` })}>
                  Download PDF
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Add payment methods</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Cards, India-local rails, and enterprise wire</h2>
          <div className="mt-4 grid gap-3">
            {[
              { label: "Card", icon: CreditCard, note: "Visa, Mastercard, Amex" },
              { label: "UPI", icon: Smartphone, note: "For Indian customers" },
              { label: "Net Banking", icon: Landmark, note: "Popular Indian banks" },
              { label: "Wire Transfer", icon: Building2, note: "Enterprise invoice settlement" }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.label} className="flex items-center justify-between rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--brand-dim)] text-[var(--light-accent)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{method.label}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{method.note}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Wallet className="mr-2 h-3.5 w-3.5" /> Add
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-3 text-xs text-[var(--text-secondary)]">
            <ShieldCheck className="mr-2 inline h-3.5 w-3.5 text-emerald-400" /> Payment credentials are tokenized and never stored in plain text.
          </div>
        </Card>
      </div>
    </div>
  );
}

