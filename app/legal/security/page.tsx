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
            ["Encryption", "AES-256 encryption at rest, TLS 1.3 in transit."],
            ["SOC 2 Type II", "Certification is in progress with a target completion date of October 2026."],
            ["Penetration testing", "Independent penetration testing is conducted annually and a summary is published publicly."],
            ["Bug bounty", "Responsible disclosure program is live and open before SOC 2 completion."]
          ].map(([title, copy]) => (
            <Card key={title} className="p-6">
              <h2 className="text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{copy}</p>
            </Card>
          ))}
        </div>
        <div className="container mt-6 grid gap-5 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">Healthcare compliance</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              HIPAA compliance support is available for healthcare workloads with dedicated operational controls and legal workflows.
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">Privacy controls</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              GDPR and India DPDP-aligned controls are documented in our privacy policy, cookie policy, and deletion request workflow.
            </p>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
