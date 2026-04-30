import { CodeBlock } from "@/components/shared/code-block";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "API Reference | Bavio AI Docs",
  description: "Complete REST API reference with request/response examples, error codes, and rate limits.",
  path: "/docs/api-reference"
});

export default function ApiReferencePage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <p className="eyebrow">API Reference</p>
          <h1 className="section-title">Every endpoint, clearly documented.</h1>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "POST /v1/auth/login",
              "POST /v1/agents",
              "GET /v1/agents/{id}",
              "POST /v1/calls",
              "GET /v1/calls/{id}",
              "POST /v1/workflows/{id}/publish",
              "GET /v1/integrations",
              "POST /v1/webhooks/test"
            ].map((endpoint) => (
              <Card key={endpoint} className="p-5 text-sm text-[var(--text-secondary)]">
                <span className="font-mono text-[var(--text-primary)]">{endpoint}</span>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              language="json"
              code={`Request:
POST /v1/agents
{
  "name": "Support Agent",
  "language": "English",
  "workflow_id": "wf_prod_42"
}

Response 201:
{
  "id": "ag_98231",
  "status": "active",
  "created_at": "2026-04-30T10:01:12Z"
}`}
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Error Codes</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                <li>400 - Invalid payload schema</li>
                <li>401 - Invalid API key / token</li>
                <li>403 - Insufficient permission scope</li>
                <li>404 - Resource not found</li>
                <li>429 - Rate limit exceeded</li>
                <li>500 - Internal server error</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Rate Limits</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                <li>Starter: 60 req/min</li>
                <li>Professional: 600 req/min</li>
                <li>Enterprise: Custom contract limits</li>
                <li>Webhook retries use exponential backoff</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
