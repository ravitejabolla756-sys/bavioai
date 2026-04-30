import Link from "next/link";

import { INDUSTRY_USE_CASES } from "@/lib/constants";
import { buildMetadata, getFaqJsonLd } from "@/lib/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { CaseStudyProofGrid } from "@/components/shared/trust-elements";
import { Card } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Use Cases | Bavio AI",
  description: "See how Bavio AI adapts to clinics, real estate, education, restaurants, and other Indian business workflows.",
  path: "/use-cases"
});

export default function UseCasesPage() {
  const hrefForIndustry = (id: string) => (id === "healthcare" ? "/use-cases/clinics" : `/use-cases/${id}`);
  const jsonLd = getFaqJsonLd(
    INDUSTRY_USE_CASES.slice(0, 6).map((item) => ({
      question: `How does Bavio AI help ${item.title.toLowerCase()} teams?`,
      answer: item.summary
    }))
  );

  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Use Cases</span>
            <h1 className="section-title">Built for every Indian business.</h1>
            <p className="section-sub">From real-estate agencies to clinics to coaching centres, Bavio adapts to your workflow instantly.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {INDUSTRY_USE_CASES.slice(0, 6).map((item) => (
              <Card key={item.id} className="h-full p-6">
                <p className="eyebrow">{item.title}</p>
                <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{item.summary}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{item.scenario[0]}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.metrics.map((metric) => (
                    <span key={metric} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                      {metric}
                    </span>
                  ))}
                </div>
                <Link href={hrefForIndustry(item.id)} className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                  Learn more -
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CaseStudyProofGrid />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </PageTransition>
  );
}
