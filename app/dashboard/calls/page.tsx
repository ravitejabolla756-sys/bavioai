"use client";

import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientApi } from "@/lib/client-api";

type CallRecord = {
  id: string;
  caller_number?: string | null;
  duration?: number | null;
  status?: string | null;
  created_at?: string | null;
  leads?: Array<{ id: string }>;
  transcripts?: Array<{ summary?: string | null; transcript?: Array<{ role?: string; content?: string }> }>;
};

export default function DashboardCallsPage() {
  const { token } = useAuth();
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [selected, setSelected] = useState<CallRecord | null>(null);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    clientApi
      .get<{ success: boolean; data: { calls: CallRecord[] } }>("/calls?limit=50", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setCalls(response.data.data.calls || []);
        setSelected(response.data.data.calls?.[0] || null);
      })
      .catch((fetchError) => {
        setError(fetchError?.response?.data?.error || "Unable to load calls.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const filteredCalls = useMemo(() => {
    if (status === "all") return calls;
    return calls.filter((call) => (call.status || "completed") === status);
  }, [calls, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Calls</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Every conversation in one place.</h1>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">
            Review duration, outcome, lead capture, and transcripts from your call history.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "completed", "started", "missed"].map((item) => (
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
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden p-0">
          <div className="grid grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr_0.7fr] bg-[var(--bg-overlay)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            <span>Caller</span>
            <span>Duration</span>
            <span>Status</span>
            <span>Lead</span>
            <span>Date</span>
          </div>
          {loading ? (
            <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">Loading calls...</div>
          ) : error ? (
            <div className="px-5 py-8 text-sm text-red-400">{error}</div>
          ) : filteredCalls.length ? (
            filteredCalls.map((call) => (
              <button
                key={call.id}
                type="button"
                onClick={() => setSelected(call)}
                className={`grid w-full grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr_0.7fr] items-center border-t border-[var(--border-base)] px-5 py-4 text-left text-sm transition hover:bg-[var(--bg-subtle)] ${
                  selected?.id === call.id ? "bg-[rgba(123,47,190,0.06)]" : ""
                }`}
              >
                <div>
                  <p className="font-medium text-[var(--text-primary)]">{call.caller_number || "Unknown caller"}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{call.id.slice(0, 8)}</p>
                </div>
                <span className="text-[var(--text-secondary)]">{call.duration || 0}s</span>
                <span className="capitalize text-[var(--brand)]">{call.status || "completed"}</span>
                <span className="text-[var(--text-secondary)]">{call.leads?.length ? "Captured" : "No lead"}</span>
                <span className="text-[var(--text-secondary)]">
                  {call.created_at ? new Date(call.created_at).toLocaleDateString("en-IN") : "Now"}
                </span>
              </button>
            ))
          ) : (
            <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">No calls found for this filter.</div>
          )}
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Transcript</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Selected call detail</h2>
          {selected ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                <p className="text-sm text-[var(--text-muted)]">Caller</p>
                <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{selected.caller_number || "Unknown caller"}</p>
              </div>
              <div className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                <p className="text-sm text-[var(--text-muted)]">Summary</p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {selected.transcripts?.[0]?.summary || "Transcript summary will appear after the call completes."}
                </p>
              </div>
              <div className="space-y-3 rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                {(selected.transcripts?.[0]?.transcript || []).length ? (
                  selected.transcripts?.[0]?.transcript?.map((entry, index) => (
                    <div
                      key={`${selected.id}-${index}`}
                      className={`rounded-[14px] px-4 py-3 text-sm leading-7 ${
                        entry.role === "assistant"
                          ? "border border-[var(--border-brand)] bg-[var(--brand-subtle)] text-[var(--text-primary)]"
                          : "bg-[var(--bg-overlay)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{entry.role || "speaker"}</p>
                      {entry.content}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">No transcript yet for this call.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 text-sm text-[var(--text-secondary)]">Select a call to see its transcript.</div>
          )}
          <Button variant="ghost" className="mt-6 w-full" onClick={() => setSelected(null)}>
            Clear selection
          </Button>
        </Card>
      </div>
    </div>
  );
}
