"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Filter, Users } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";

type LeadRecord = {
  id: string;
  created_at?: string | null;
  name?: string | null;
  phone?: string | null;
  intent?: string | null;
  budget?: string | null;
  location?: string | null;
  status?: string | null;
};

const statuses = ["new", "contacted", "qualified", "lost"] as const;

export default function DashboardLeadsPage() {
  const { token } = useAuth();
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    const query = status === "all" ? "/leads" : `/leads?status=${status}`;

    clientApi
      .get<{ success: boolean; data: LeadRecord[] }>(query, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setLeads(response.data.data || []))
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load leads."))
      .finally(() => setLoading(false));
  }, [status, token]);

  const exportCsv = useMemo(() => {
    const header = ["Date", "Name", "Phone", "Intent", "Budget", "Location", "Status"];
    const rows = leads.map((lead) => [
      lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-IN") : "",
      lead.name || "",
      lead.phone || "",
      lead.intent || "",
      lead.budget || "",
      lead.location || "",
      lead.status || ""
    ]);

    return [header, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
  }, [leads]);

  async function updateLead(id: string, nextStatus: string) {
    if (!token) return;
    setSavingId(id);

    try {
      await clientApi.put(
        `/leads/${id}`,
        { status: nextStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead)));
    } catch (updateError: any) {
      setError(updateError?.response?.data?.error || "Unable to update lead.");
    } finally {
      setSavingId("");
    }
  }

  function downloadCsv() {
    const blob = new Blob([exportCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bavio-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const statusCounts = useMemo(
    () =>
      statuses.map((entry) => ({
        label: entry,
        count: leads.filter((lead) => (lead.status || "new") === entry).length
      })),
    [leads]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Leads</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Captured intent, ready for follow-up.</h1>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
            Track buyer, patient, and enquiry leads as soon as Bavio qualifies the call.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={downloadCsv}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {statusCounts.map((item) => (
          <Card key={item.label} className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--brand-dim)] text-primary">
              <Users className="h-4 w-4" />
            </div>
            <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{item.label}</p>
            <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{item.count}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", ...statuses].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              status === item
                ? "border-[var(--brand)] bg-[var(--brand-subtle)] text-[var(--text-primary)]"
                : "border-[var(--border-base)] bg-[var(--bg-raised)] text-[var(--text-secondary)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-[0.85fr_1fr_1fr_0.9fr_0.9fr_0.8fr] bg-[var(--bg-overlay)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          <span>Date</span>
          <span>Name</span>
          <span>Phone</span>
          <span>Intent</span>
          <span>Location</span>
          <span>Status</span>
        </div>
        {loading ? (
          <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">Loading leads...</div>
        ) : error ? (
          <div className="px-5 py-8 text-sm text-red-400">{error}</div>
        ) : leads.length ? (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="grid grid-cols-[0.85fr_1fr_1fr_0.9fr_0.9fr_0.8fr] items-center border-t border-[var(--border-base)] px-5 py-4 text-sm"
            >
              <span className="text-[var(--text-secondary)]">
                {lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-IN") : "Now"}
              </span>
              <span className="font-medium text-[var(--text-primary)]">{lead.name || "Unknown"}</span>
              <span className="text-[var(--text-secondary)]">{lead.phone || "Not captured"}</span>
              <span className="text-[var(--text-secondary)]">{lead.intent || "General enquiry"}</span>
              <span className="text-[var(--text-secondary)]">{lead.location || "Not captured"}</span>
              <select
                value={lead.status || "new"}
                disabled={savingId === lead.id}
                onChange={(event) => updateLead(lead.id, event.target.value)}
                className="h-10 rounded-[10px] border border-[var(--border-base)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)]"
              >
                {statuses.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))
        ) : (
          <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">No leads captured yet.</div>
        )}
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <p className="eyebrow">Pipeline health</p>
          <div className="mt-4 space-y-3">
            {statusCounts.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-[16px] border border-border bg-[var(--bg-base)] px-4 py-3 text-sm">
                <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
                  <Filter className="h-3.5 w-3.5 text-primary" />
                  {item.label}
                </span>
                <span className="font-medium text-[var(--text-primary)]">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Lead workflow</p>
          <div className="mt-4 space-y-3">
            {[
              "Review newly captured leads every morning and every afternoon.",
              "Move qualified leads forward immediately so the pipeline reflects real follow-up intent.",
              "Export or sync high-value leads to your CRM once the status is updated."
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[16px] border border-border bg-[var(--bg-base)] px-4 py-4 text-sm leading-6 text-[var(--text-secondary)]">
                <ArrowUpRight className="mt-0.5 h-4 w-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
