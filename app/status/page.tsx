import Link from "next/link";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { STATUS_SERVICES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata = buildMetadata({
  title: "Status | Bavio AI — Platform Health",
  description:
    "Real-time status of all Bavio AI services including Voice API, STT, TTS, webhooks, and WhatsApp gateway.",
  path: "/status"
});

const uptimeHistory = [
  { month: "Oct", uptime: 99.93 },
  { month: "Nov", uptime: 99.97 },
  { month: "Dec", uptime: 99.81 },
  { month: "Jan", uptime: 99.99 },
  { month: "Feb", uptime: 99.96 },
  { month: "Mar", uptime: 99.98 },
  { month: "Apr", uptime: 100 }
];

export default function StatusPage() {
  const allOperational = STATUS_SERVICES.every((s) => s.status === "operational");

  return (
    <PageTransition>
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Platform status</p>
            <div className="mt-4 flex items-center gap-4">
              <div className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${allOperational ? "border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.08)] text-[var(--accent-green)]" : "border-amber-400/30 bg-amber-400/08 text-amber-400"}`}>
                <span className={`h-2.5 w-2.5 animate-pulse rounded-full bg-current`} />
                {allOperational ? "All systems operational" : "Service degradation detected"}
              </div>
            </div>
            <h1 className="page-hero-title mt-5">Current platform health.</h1>
            <p className="page-hero-copy">
              A transparent view into every service that powers Bavio AI — updated continuously. Subscribe below for incident alerts.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Aggregate uptime */}
      <section className="section-shell pt-0">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["99.96%", "30-day uptime average", "var(--accent-green)"],
              ["420ms", "Current median latency", "var(--brand)"],
              ["0", "Active incidents", "var(--text-muted)"]
            ].map(([value, label, color]) => (
              <SectionReveal key={label}>
                <Card className="p-6 text-center">
                  <p className="text-4xl font-black tracking-[-0.04em]" style={{ color: `var(--${color.replace("var(--", "").replace(")", "")})` || color }}>{value}</p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service status grid */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <p className="eyebrow mb-6">Service status</p>
          </SectionReveal>
          <div className="overflow-hidden rounded-[20px] border border-[var(--border-base)]">
            <div className="grid grid-cols-4 bg-[var(--bg-overlay)] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              <span className="col-span-2">Service</span>
              <span>Uptime (30d)</span>
              <span className="text-right">Latency</span>
            </div>
            {STATUS_SERVICES.map((service, index) => (
              <SectionReveal key={service.name}>
                <div className={`grid grid-cols-4 items-center px-6 py-4 ${index % 2 === 0 ? "bg-[var(--bg-raised)]" : "bg-[var(--bg-base)]"}`}>
                  <div className="col-span-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${service.status === "operational" ? "bg-[var(--accent-green)]" : "bg-amber-400"}`} />
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{service.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{service.description}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[var(--accent-green)]">{service.uptime}</span>
                  <span className="text-right text-sm text-[var(--text-muted)]">{service.latency}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime history chart */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <Card className="p-8">
              <p className="eyebrow">Uptime history</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                6-month reliability record.
              </h2>
              <div className="mt-8 flex items-end gap-3">
                {uptimeHistory.map((item) => {
                  const height = Math.round(((item.uptime - 99.5) / 0.5) * 80) + 20;
                  return (
                    <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                      <span className="text-[10px] font-semibold text-[var(--accent-green)]">{item.uptime}%</span>
                      <div
                        className="w-full rounded-t-[6px] bg-[var(--accent-green)] opacity-80 transition-all hover:opacity-100"
                        style={{ height: `${height}px`, maxHeight: "100px" }}
                      />
                      <span className="text-[10px] text-[var(--text-muted)]">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Incidents */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <Card className="p-8">
              <p className="eyebrow">Recent incidents</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                No critical incidents in the last 30 days.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  {
                    date: "Dec 20, 2025",
                    title: "Exotel stream dropout on calls >3 min",
                    severity: "Minor",
                    duration: "47 min",
                    resolution: "Fixed in v1.9.5 — adaptive buffer sizing deployed."
                  }
                ].map((incident) => (
                  <div key={incident.title} className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-5 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-amber-400/30 bg-amber-400/08 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                            {incident.severity}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)]">{incident.date}</span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{incident.title}</p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">{incident.resolution}</p>
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">Duration: {incident.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/enterprise">Request uptime SLA review</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/contact">Subscribe to incident alerts</Link>
                </Button>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
