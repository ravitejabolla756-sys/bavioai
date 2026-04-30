import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Voice Latency Benchmarks | Bavio AI",
  description: "Public voice latency benchmarks comparing Bavio against other voice AI systems.",
  path: "/benchmarks/voice-latency"
});

const benchmarkRows = [
  ["Bavio AI", "420ms", "India + global mixed traffic"],
  ["Competitor A", "610ms", "Published API benchmark median"],
  ["Competitor B", "740ms", "Published API benchmark median"],
  ["Competitor C", "830ms", "Published API benchmark median"]
];

export default function VoiceLatencyBenchmarkPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Benchmarks"
        title="Public voice latency benchmark."
        description="A transparent median response-latency snapshot across equivalent call scenarios."
      />
      <section className="section-shell pt-0">
        <div className="container">
          <Card className="overflow-hidden p-0">
            <div className="grid grid-cols-3 bg-[var(--bg-overlay)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              <span>Platform</span>
              <span>Median latency</span>
              <span>Benchmark note</span>
            </div>
            {benchmarkRows.map((row, index) => (
              <div key={row[0]} className={`grid grid-cols-3 px-6 py-4 text-sm ${index % 2 === 0 ? "bg-[var(--bg-raised)]" : "bg-[var(--bg-base)]"}`}>
                <span className="font-semibold text-[var(--text-primary)]">{row[0]}</span>
                <span className="text-[var(--accent-green)]">{row[1]}</span>
                <span className="text-[var(--text-secondary)]">{row[2]}</span>
              </div>
            ))}
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
