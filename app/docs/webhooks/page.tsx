import { CodeBlock } from "@/components/shared/code-block";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Webhooks | Bavio AI Docs",
  description: "Configure secure webhook delivery for call events, workflow updates, and lead captures.",
  path: "/docs/webhooks"
});

export default function WebhooksPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <p className="eyebrow">Webhooks</p>
          <h1 className="section-title">Receive real-time events from Bavio.</h1>
          <p className="section-sub">Subscribe to call, lead, workflow, and system events with signed payload verification.</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "call.started",
              "call.completed",
              "lead.captured",
              "workflow.published",
              "integration.failed",
              "billing.usage.threshold_reached"
            ].map((eventName) => (
              <Card key={eventName} className="p-5 font-mono text-sm text-[var(--text-secondary)]">
                {eventName}
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              language="json"
              code={`{
  "id": "evt_01HT9T7J8Z5",
  "type": "call.completed",
  "created_at": "2026-04-30T11:24:19Z",
  "data": {
    "call_id": "call_8921",
    "agent_id": "ag_204",
    "duration_seconds": 286,
    "outcome": "qualified_lead"
  }
}`}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
