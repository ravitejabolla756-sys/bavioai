import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Core Concepts | Bavio AI Docs",
  description: "Understand agents, workflows, telephony events, and runtime behavior in Bavio.",
  path: "/docs/core-concepts"
});

export default function CoreConceptsPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <p className="eyebrow">Core Concepts</p>
          <h1 className="section-title">How the Bavio platform works.</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Agents", "Voice assistants with prompt, language, and behavior controls."],
              ["Workflows", "Action graphs that execute business logic during calls."],
              ["Calls", "Live sessions with transcript, sentiment, and outcome events."],
              ["Events", "Webhook payloads for real-time external integrations."],
              ["Integrations", "Connectors for CRM, calendar, telephony, and messaging."],
              ["Policies", "Security, compliance, and governance controls for production."]
            ].map(([title, copy]) => (
              <Card key={title} className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{title}</h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
