import Link from "next/link";

import { PageTransition } from "@/components/shared/page-transition";
import { GithubStars } from "@/components/shared/trust-elements";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CHANGELOG_ENTRIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Docs | Bavio AI Developer Portal",
  description: "Bavio developer portal: getting started, quickstart, core concepts, API reference, guides, SDKs, changelog, and support.",
  path: "/docs"
});

const docsSections = [
  ["Getting Started", "/docs/quickstart", "Launch your first voice agent in minutes."],
  ["Core Concepts", "/docs/core-concepts", "Understand agents, workflows, events, and telephony states."],
  ["API Reference", "/docs/api-reference", "Endpoints, examples, errors, and rate limits."],
  ["Guides", "/docs/guides", "Integration patterns and production best practices."],
  ["SDKs", "/docs/sdks", "Node.js, Python, and client setup."],
  ["Interactive Playground", "/playground", "Test calls directly in your browser."],
  ["Changelog", "/changelog", "What shipped, what changed, and what is next."],
  ["Support", "/docs/support", "Developer support channels and response SLAs."]
];

export default function DocsPage() {
  const latest = CHANGELOG_ENTRIES.slice(0, 3);

  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Developer Portal</span>
            <h1 className="section-title">World-class docs for an API-first platform.</h1>
            <p className="section-sub">
              Structured for technical buyers: quickstart, core concepts, API reference, guides, SDKs, changelog, and support.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {docsSections.map(([label, href, copy]) => (
              <Card key={label} className="p-6">
                <h2 className="text-xl font-black text-[var(--text-primary)]">{label}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{copy}</p>
                <Button asChild variant="ghost" className="mt-4 px-0">
                  <Link href={href}>Open</Link>
                </Button>
              </Card>
            ))}
          </div>

          <Card className="mt-10 p-6">
            <p className="eyebrow">Downloads</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild size="sm">
                <Link href="/docs/openapi.yaml" target="_blank">Download OpenAPI Spec</Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link href="/docs/postman-collection.json" target="_blank">Download Postman Collection</Link>
              </Button>
            </div>
          </Card>

          <GithubStars />

          <div className="mt-10">
            <p className="eyebrow">What's New</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {latest.map((item) => (
                <Card key={item.version} className="p-5">
                  <p className="text-xs text-[var(--text-muted)]">{item.date}</p>
                  <h3 className="mt-2 text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">{item.version}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
