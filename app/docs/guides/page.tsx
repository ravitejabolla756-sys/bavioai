import Link from "next/link";

import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guides | Bavio AI Docs",
  description: "Implementation guides for production deployment, integrations, and workflow quality.",
  path: "/docs/guides"
});

export default function GuidesPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <p className="eyebrow">Guides</p>
          <h1 className="section-title">Production deployment guides.</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Designing high-conversion intake workflows",
              "Best practices for multilingual call handling",
              "CRM integration patterns for lead lifecycle",
              "Webhook retry and idempotency strategy",
              "Security checklist for enterprise rollout",
              "Observability and QA for live voice operations"
            ].map((item) => (
              <Card key={item} className="p-6 text-sm text-[var(--text-secondary)]">{item}</Card>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild>
              <Link href="/contact">Request implementation workshop</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
