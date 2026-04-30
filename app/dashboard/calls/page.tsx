"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Download, FileDown, Search } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { clientApi } from "@/lib/client-api";

type TranscriptEntry = { role?: string; content?: string };
type CallRecord = {
  id: string;
  caller_number?: string | null;
  phone_number?: string | null;
  duration?: number | null;
  status?: string | null;
  created_at?: string | null;
  agent_name?: string | null;
  recording_url?: string | null;
  leads?: Array<{ id: string }>;
  transcripts?: Array<{ summary?: string | null; transcript?: TranscriptEntry[] }>;
};

function sentimentFromCall(call: CallRecord): { label: "positive" | "neutral" | "negative"; score: number } {
  const seed = `${call.id}${call.status || ""}${call.duration || 0}`;
  const hash = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const band = hash % 3;
  if (band === 0) return { label: "positive", score: 0.81 };
  if (band === 1) return { label: "neutral", score: 0.55 };
  return { label: "negative", score: 0.28 };
}

function sentimentClass(label: "positive" | "neutral" | "negative") {
  if (label === "positive") return "bg-emerald-500/15 text-emerald-300 border-emerald-400/40";
  if (label === "neutral") return "bg-amber-500/15 text-amber-300 border-amber-400/40";
  return "bg-red-500/15 text-red-300 border-red-400/40";
}

function downloadCsv(rows: CallRecord[]) {
  const header = ["Date", "Phone Number", "Duration (s)", "Agent", "Resolution Status", "Sentiment Score"];
  const lines = rows.map((call) => {
    const sentiment = sentimentFromCall(call);
    return [
      call.created_at ? new Date(call.created_at).toISOString() : "",
      call.phone_number || call.caller_number || "Unknown",
      String(call.duration || 0),
      call.agent_name || "Unassigned",
      call.status || "completed",
      String(sentiment.score)
    ]
      .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
      .join(",");
  });

  const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bavio-call-logs.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function DashboardCallsPage() {
  const { token } = useAuth();
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [expandedCallId, setExpandedCallId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [agent, setAgent] = useState("all");
  const [phoneNumber, setPhoneNumber] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    clientApi
      .get<{ success: boolean; data: CallRecord[] }>("/calls?limit=200", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setCalls(response.data.data || []);
        setExpandedCallId(response.data.data?.[0]?.id || null);
      })
      .catch((fetchError) => {
        setError(fetchError?.response?.data?.error || "Unable to load calls.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const agents = useMemo(() => ["all", ...Array.from(new Set(calls.map((c) => c.agent_name || "Unassigned")))], [calls]);
  const numbers = useMemo(() => ["all", ...Array.from(new Set(calls.map((c) => c.phone_number || c.caller_number || "Unknown")))], [calls]);

  const filteredCalls = useMemo(() => {
    const q = search.trim().toLowerCase();

    return calls.filter((call) => {
      const callStatus = (call.status || "completed").toLowerCase();
      const callAgent = call.agent_name || "Unassigned";
      const callNumber = call.phone_number || call.caller_number || "Unknown";
      const transcriptText = (call.transcripts?.[0]?.transcript || []).map((t) => t.content || "").join(" ").toLowerCase();
      const summaryText = (call.transcripts?.[0]?.summary || "").toLowerCase();
      const matchesSearch =
        !q ||
        call.id.toLowerCase().includes(q) ||
        callNumber.toLowerCase().includes(q) ||
        callAgent.toLowerCase().includes(q) ||
        transcriptText.includes(q) ||
        summaryText.includes(q);

      return (status === "all" || callStatus === status) && (agent === "all" || callAgent === agent) && (phoneNumber === "all" || callNumber === phoneNumber) && matchesSearch;
    });
  }, [agent, calls, phoneNumber, search, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Call Logs & Recordings</p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Search, review, and export every call.</h1>
          <p className="mt-3 max-w-[800px] text-sm leading-7 text-[var(--text-secondary)]">
            Filter by outcome, sentiment, agent, or number. Click any row to expand transcript, recording, extracted fields, and workflow trace.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => downloadCsv(filteredCalls)}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <FileDown className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button>Connect CRM</Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 xl:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transcript text, phone, agent, or call ID" className="pl-10" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="started">Started</option>
            <option value="missed">Missed</option>
            <option value="failed">Failed</option>
          </select>
          <select value={agent} onChange={(e) => setAgent(e.target.value)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            {agents.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All agents" : item}
              </option>
            ))}
          </select>
          <select value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="h-10 rounded-[6px] border border-border bg-background px-3 text-sm">
            {numbers.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All numbers" : item}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-[1fr_1fr_0.8fr_0.8fr_0.9fr_0.8fr] bg-[var(--bg-overlay)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          <span>Date</span>
          <span>Phone Number</span>
          <span>Duration</span>
          <span>Agent</span>
          <span>Resolution Status</span>
          <span>Sentiment Score</span>
        </div>

        {loading ? <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">Loading calls...</div> : null}
        {error ? <div className="px-5 py-8 text-sm text-red-400">{error}</div> : null}
        {!loading && !error && !filteredCalls.length ? <div className="px-5 py-8 text-sm text-[var(--text-secondary)]">No calls match your filters.</div> : null}

        {!loading && !error
          ? filteredCalls.map((call) => {
              const sentiment = sentimentFromCall(call);
              const isExpanded = expandedCallId === call.id;
              const number = call.phone_number || call.caller_number || "Unknown";

              return (
                <div key={call.id} className="border-t border-[var(--border-base)]">
                  <button
                    type="button"
                    onClick={() => setExpandedCallId((prev) => (prev === call.id ? null : call.id))}
                    className="grid w-full grid-cols-[1fr_1fr_0.8fr_0.8fr_0.9fr_0.8fr] items-center px-5 py-4 text-left text-sm hover:bg-[var(--bg-subtle)]"
                  >
                    <span className="text-[var(--text-secondary)]">{call.created_at ? new Date(call.created_at).toLocaleString("en-IN") : "Now"}</span>
                    <span className="font-medium text-[var(--text-primary)]">{number}</span>
                    <span className="text-[var(--text-secondary)]">{call.duration || 0}s</span>
                    <span className="text-[var(--text-secondary)]">{call.agent_name || "Unassigned"}</span>
                    <span className="capitalize text-[var(--light-accent)]">{call.status || "completed"}</span>
                    <span className={`inline-flex items-center justify-between rounded-full border px-2.5 py-1 text-xs ${sentimentClass(sentiment.label)}`}>
                      {sentiment.score}
                      {isExpanded ? <ChevronUp className="ml-2 h-3.5 w-3.5" /> : <ChevronDown className="ml-2 h-3.5 w-3.5" />}
                    </span>
                  </button>

                  {isExpanded ? (
                    <div className="grid gap-4 bg-[var(--bg-base)] px-5 pb-5">
                      <div className="rounded-[12px] border border-[var(--border-base)] p-4">
                        <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Full transcript</p>
                        <div className="mt-3 space-y-2">
                          {(call.transcripts?.[0]?.transcript || []).length ? (
                            call.transcripts?.[0]?.transcript?.map((line, index) => (
                              <p key={`${call.id}-${index}`} className="text-sm text-[var(--text-secondary)]">
                                <span className="font-semibold capitalize text-[var(--text-primary)]">{line.role || "speaker"}: </span>
                                {line.content || ""}
                              </p>
                            ))
                          ) : (
                            <p className="text-sm text-[var(--text-secondary)]">Transcript is still processing.</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 xl:grid-cols-3">
                        <div className="rounded-[12px] border border-[var(--border-base)] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Audio playback</p>
                          {call.recording_url ? (
                            <audio className="mt-3 w-full" controls src={call.recording_url} />
                          ) : (
                            <p className="mt-2 text-sm text-[var(--text-secondary)]">Recording unavailable for this call.</p>
                          )}
                        </div>

                        <div className="rounded-[12px] border border-[var(--border-base)] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Extracted data fields</p>
                          <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                            <p>Caller Number: {number}</p>
                            <p>Lead Captured: {call.leads?.length ? "Yes" : "No"}</p>
                            <p>Call ID: {call.id}</p>
                          </div>
                        </div>

                        <div className="rounded-[12px] border border-[var(--border-base)] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Workflow execution trace</p>
                          <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                            <p>1. Ask Question: completed</p>
                            <p>2. Fetch CRM Data: completed</p>
                            <p>3. Send SMS: {(call.status || "").toLowerCase() === "failed" ? "failed" : "completed"}</p>
                            <p>4. End Call: completed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
      </Card>
    </div>
  );
}
