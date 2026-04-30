import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SDKs | Bavio AI Docs",
  description: "Official and community SDKs for Node.js, Python, Go, and more.",
  path: "/docs/sdks"
});

export default function SdksPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <p className="eyebrow">SDKs</p>
          <h1 className="section-title">Integrate faster with official SDKs.</h1>
          <p className="section-sub">Use client libraries for typed requests, retries, pagination, and webhook validation.</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Node.js", "npm install @bavio/sdk", "Official"],
              ["Python", "pip install bavio-python", "Official"],
              ["Go", "go get github.com/bavio-ai/go-sdk", "Official"],
              ["Java", "Maven package", "Community"]
            ].map(([name, install, status]) => (
              <Card key={name} className="p-6">
                <p className="text-xl font-bold text-[var(--text-primary)]">{name}</p>
                <p className="mt-2 font-mono text-sm text-[var(--text-secondary)]">{install}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[var(--text-faint)]">{status}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
