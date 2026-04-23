import { CodeBlock } from "@/components/shared/code-block";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Docs | Bavio AI",
  description: "Read Bavio AI docs for quickstart, authentication, API reference, integrations, and billing usage.",
  path: "/docs"
});

const nav = [
  "What is Bavio AI",
  "Quick Start",
  "Your first AI agent",
  "Authentication",
  "POST /auth/signup",
  "POST /auth/login",
  "GET /calls",
  "GET /leads",
  "PUT /assistants/:id",
  "Billing"
];

export default function DocsPage() {
  return (
    <PageTransition>
      <section className="min-h-screen pt-24">
        <div className="container grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-5 lg:sticky lg:top-24">
            <input placeholder="Search docs..." className="mb-5 h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]" />
            <div className="space-y-1">
              {nav.map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block rounded-[10px] px-4 py-3 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]">
                  {item}
                </a>
              ))}
            </div>
          </aside>

          <main className="pb-24">
            <div className="max-w-4xl">
              <p className="eyebrow">Documentation</p>
              <h1 className="text-5xl font-black tracking-[-0.05em] text-[var(--text-primary)]">10 minutes to your first AI agent.</h1>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                Configure your assistant, connect your workflow, and start seeing real calls in the dashboard.
              </p>
            </div>

            <div className="mt-12 space-y-14">
              <section id="what-is-bavio-ai">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">What is Bavio AI</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
                  Bavio is an India-first AI voice platform that answers business calls, captures lead details, and triggers workflow steps like WhatsApp alerts and CRM updates.
                </p>
              </section>

              <section id="quick-start">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Quick Start</h2>
                <Card className="mt-5 p-6">
                  <ol className="space-y-4 text-sm leading-8 text-[var(--text-secondary)]">
                    <li>1. Create your account and log in.</li>
                    <li>2. Configure your assistant name, language, and first message.</li>
                    <li>3. Connect your telephony or forward your business number.</li>
                    <li>4. Watch calls appear in the dashboard and leads show up instantly.</li>
                  </ol>
                </Card>
              </section>

              <section id="your-first-ai-agent">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your first AI agent</h2>
                <CodeBlock
                  language="JavaScript"
                  code={`const token = localStorage.getItem("bavio_token");

await fetch("https://api.bavio.in/assistants", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: \`Bearer \${token}\`
  },
  body: JSON.stringify({
  name: "Bavio Front Desk",
  language: "Hinglish",
  industry: "Real Estate",
  first_message: "Namaste! Main aapki kaise madad kar sakta hoon?",
  system_prompt: "Capture lead details and qualify intent."
  })
});`}
                />
              </section>

              <section id="authentication">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Authentication</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
                  Bavio stores a JWT in local storage after login and sends it as a bearer token with dashboard and API requests.
                </p>
              </section>

              <section id="post-auth-signup">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">POST /auth/signup</h2>
                <CodeBlock
                  language="JSON"
                  code={`{
  "name": "PropVista Realty",
  "email": "founder@propvista.in",
  "phone": "+919876543210",
  "password": "strong-password"
}`}
                />
              </section>

              <section id="post-auth-login">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">POST /auth/login</h2>
                <CodeBlock
                  language="JSON"
                  code={`{
  "email": "founder@propvista.in",
  "password": "strong-password"
}`}
                />
              </section>

              <section id="get-calls">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">GET /calls</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">Returns the latest call list, including lead and transcript metadata where available.</p>
              </section>

              <section id="get-leads">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">GET /leads</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">Returns all captured leads for the authenticated business, with optional status filtering.</p>
              </section>

              <section id="put-assistants-id">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">PUT /assistants/:id</h2>
                <CodeBlock
                  language="JSON"
                  code={`{
  "name": "Clinic Front Desk",
  "language": "Hindi",
  "industry": "Clinic",
  "first_message": "Namaste, Bavio AI se bol raha hoon.",
  "system_prompt": "Handle appointment booking and reminder flows."
}`}
                />
              </section>

              <section id="billing">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Billing</h2>
                <div className="overflow-hidden rounded-[20px] border border-[var(--border-base)]">
                  <div className="grid grid-cols-3 bg-[var(--bg-overlay)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    <span>Plan</span>
                    <span>Included minutes</span>
                    <span>Overage</span>
                  </div>
                  {[
                    ["Starter", "200", "INR 5/min"],
                    ["Growth", "500", "INR 4/min"],
                    ["Scale", "1,500", "INR 3/min"]
                  ].map(([plan, minutes, overage]) => (
                    <div key={plan} className="grid grid-cols-3 border-t border-[var(--border-base)] px-5 py-4 text-sm text-[var(--text-secondary)]">
                      <span>{plan}</span>
                      <span>{minutes}</span>
                      <span>{overage}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </section>
    </PageTransition>
  );
}
