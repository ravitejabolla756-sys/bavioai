import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HIPAA Compliance | Bavio AI",
  description: "Learn how Bavio supports HIPAA-aligned healthcare voice workflows and operational safeguards.",
  path: "/legal/hipaa"
});

export default function HipaaPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="HIPAA"
        title="HIPAA compliance support for healthcare teams."
        description="Bavio supports healthcare deployments with documented controls, governed access, and dedicated onboarding for HIPAA-sensitive workflows."
      />
      <section className="section-shell pt-0">
        <div className="container grid gap-5 md:grid-cols-2">
          {[
            ["BAA process", "Business Associate Agreement workflows are supported for eligible healthcare customers."],
            ["Minimum necessary access", "Role-based controls limit access to call and workflow data based on operational need."],
            ["Auditability", "Event logs and workflow activity remain reviewable for compliance and incident investigations."],
            ["Encryption", "AES-256 encryption at rest, TLS 1.3 in transit."]
          ].map(([title, copy]) => (
            <Card key={title} className="p-6">
              <h2 className="text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{copy}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
