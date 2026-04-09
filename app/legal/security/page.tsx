import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security | Bavio AI",
  description: "Read how Bavio approaches security, compliance, data handling, and operational controls.",
  path: "/legal/security"
});

export default function SecurityPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Security"
        title="Security and compliance built into the platform."
        description="Bavio is designed for teams that need operational visibility, data controls, and clear handling standards as voice AI moves into production."
      />
      <section className="section-shell pt-0">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Encryption", "TLS in transit and encrypted infrastructure layers at rest."],
            ["Access control", "Role-aware access patterns across dashboard and API workflows."],
            ["Auditability", "Call history, workflow outcomes, and account activity remain reviewable."],
            ["Residency", "India-first deployment posture with enterprise planning for region-sensitive data."]
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
