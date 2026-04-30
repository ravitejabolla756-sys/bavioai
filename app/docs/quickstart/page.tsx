import { CodeBlock } from "@/components/shared/code-block";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Quickstart | Bavio AI Docs",
  description: "Deploy your first voice agent in 5 minutes with Node.js, Python, and cURL examples.",
  path: "/docs/quickstart"
});

export default function DocsQuickstartPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <p className="eyebrow">Quickstart</p>
          <h1 className="section-title">Deploy your first voice agent in 5 minutes.</h1>
          <p className="section-sub">Create an API key, provision an agent, and run your first call flow.</p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["1", "Create API key", "Generate a sandbox key from dashboard settings."],
              ["2", "Create agent", "Configure language, workflow, and first response."],
              ["3", "Trigger call", "Send test call and inspect transcript output."]
            ].map(([step, title, copy]) => (
              <Card key={title} className="p-6">
                <p className="text-xl font-black text-[var(--brand)]">{step}</p>
                <h2 className="mt-2 font-bold text-[var(--text-primary)]">{title}</h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{copy}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            <CodeBlock
              language="JavaScript"
              code={`import axios from "axios";

const client = axios.create({
  baseURL: "https://api.bavio.ai/v1",
  headers: { Authorization: "Bearer <API_KEY>" }
});

const agent = await client.post("/agents", {
  name: "Quickstart Agent",
  language: "English",
  workflow: ["capture_intent", "book_slot", "send_whatsapp_summary"]
});

console.log(agent.data.id);`}
            />
            <CodeBlock
              language="Python"
              code={`import requests

headers = {
  "Authorization": "Bearer <API_KEY>",
  "Content-Type": "application/json"
}

payload = {
  "name": "Quickstart Agent",
  "language": "English",
  "workflow": ["capture_intent", "book_slot", "send_whatsapp_summary"]
}

response = requests.post("https://api.bavio.ai/v1/agents", json=payload, headers=headers)
print(response.json())`}
            />
            <CodeBlock
              language="bash"
              code={`curl -X POST https://api.bavio.ai/v1/agents \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Quickstart Agent",
    "language": "English",
    "workflow": ["capture_intent", "book_slot", "send_whatsapp_summary"]
  }'`}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
