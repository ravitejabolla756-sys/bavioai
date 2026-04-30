"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Copy, Play, TerminalSquare } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DOCS_SNIPPETS } from "@/lib/constants";

type Lang = "javascript" | "python" | "curl";

const langLabels: Record<Lang, string> = {
  javascript: "JavaScript",
  python: "Python",
  curl: "cURL"
};

const simulatedResponse = `{
  "id": "call_demo_01abc",
  "status": "queued",
  "assistantId": "ast_live_01",
  "to": "+919900000001",
  "from": "+918045612345",
  "metadata": {
    "workflow": "lead_qualification",
    "campaign": "playground_test"
  },
  "createdAt": "2026-04-05T08:55:00.000Z",
  "estimatedStartMs": 1400
}`;

export default function PlaygroundPage() {
  const [lang, setLang] = useState<Lang>("javascript");
  const [copied, setCopied] = useState(false);
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(DOCS_SNIPPETS[lang]).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function runDemo() {
    setRunning(true);
    setRan(false);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 1200);
  }

  return (
    <div className="bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Playground</p>
            <h1 className="page-hero-title max-w-4xl">
              Test the API without{" "}
              <span className="text-gradient">writing a single line.</span>
            </h1>
            <p className="page-hero-copy">
              See exactly what a Bavio API call looks like, how the response is structured, and what happens next in the workflow — all without signing up.
            </p>
          </SectionReveal>

          {/* Trust strip */}
          <SectionReveal>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
              {["No auth required to preview", "Real API response structure", "Copy & paste into your project"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" />
                  {item}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Playground */}
      <section className="section-shell pt-0">
        <div className="container">
          <div className="grid gap-6 xl:grid-cols-2">
            {/* Request panel */}
            <SectionReveal>
              <Card className="overflow-hidden p-0">
                <div className="flex items-center justify-between border-b border-[var(--border-base)] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <TerminalSquare className="h-4 w-4 text-[var(--brand)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Request</span>
                    <span className="rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">POST /v1/calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] p-0.5">
                      {(["javascript", "python", "curl"] as Lang[]).map((l) => (
                        <button key={l} type="button" onClick={() => setLang(l)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition ${lang === l ? "bg-[var(--brand)] text-black" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}>
                          {langLabels[l]}
                        </button>
                      ))}
                    </div>
                    <button type="button" onClick={copyCode}
                      className="flex h-8 items-center gap-1.5 rounded-[6px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 text-xs text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
                      {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-green)]" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto bg-[var(--bg-base)]">
                  <pre className="p-5 text-[13px] leading-[1.7] text-[var(--text-secondary)] font-mono">
                    <code>{DOCS_SNIPPETS[lang]}</code>
                  </pre>
                </div>
                <div className="border-t border-[var(--border-base)] p-5">
                  <Button onClick={runDemo} disabled={running} className="w-full">
                    <Play className={`mr-2 h-4 w-4 ${running ? "animate-pulse" : ""}`} />
                    {running ? "Sending request..." : ran ? "Run again" : "Run demo request"}
                  </Button>
                </div>
              </Card>
            </SectionReveal>

            {/* Response panel */}
            <SectionReveal>
              <Card className="overflow-hidden p-0">
                <div className="flex items-center justify-between border-b border-[var(--border-base)] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Response</span>
                    {ran && (
                      <span className="rounded-full border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.08)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--accent-green)]">
                        200 OK
                      </span>
                    )}
                    {!ran && !running && (
                      <span className="rounded-full border border-[var(--border-base)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]">
                        Waiting
                      </span>
                    )}
                    {running && (
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/08 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                        Sending...
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    {ran ? "182ms" : "—"}
                  </span>
                </div>
                <div className="min-h-[320px] overflow-x-auto bg-[var(--bg-base)]">
                  {ran ? (
                    <pre className="p-5 text-[13px] leading-[1.7] text-[var(--accent-green)] font-mono">
                      <code>{simulatedResponse}</code>
                    </pre>
                  ) : running ? (
                    <div className="flex h-[320px] items-center justify-center">
                      <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--border-base)] border-t-[var(--brand)]" />
                        Processing request...
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[320px] flex-col items-center justify-center gap-4 text-center px-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] text-[var(--text-muted)]">
                        <Play className="h-5 w-5" />
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">Click &ldquo;Run demo request&rdquo; to see the simulated response.</p>
                    </div>
                  )}
                </div>
              </Card>
            </SectionReveal>
          </div>

          {/* Feature notes */}
          <SectionReveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                ["POST /v1/calls", "Initiate inbound or outbound calls via any phone number"],
                ["GET /v1/calls/{id}", "Retrieve full transcript, sentiment, and workflow trace"],
                ["POST /v1/agents", "Create and configure a voice agent via API"]
              ].map(([endpoint, description]) => (
                <Card key={endpoint} className="p-5">
                  <p className="font-mono text-xs font-semibold text-[var(--brand)]">{endpoint}</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{description}</p>
                </Card>
              ))}
            </div>
          </SectionReveal>

          {/* CTA */}
          <SectionReveal>
            <Card className="mt-8 p-8 md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="eyebrow">Ready to go live?</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    Sign up for a real API key.
                  </h2>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    The Starter plan is free — includes 100 test minutes and sandbox API access. No credit card required.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get your API key
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost">
                    <Link href="/docs">Read the docs</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
