import { PageTransition } from "@/components/shared/page-transition";
import { COOKIE_SECTIONS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy | Bavio AI",
  description: "See how Bavio AI uses cookies for essential site behavior, analytics, and preferences.",
  path: "/cookies"
});

export default function CookiePolicyPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <div className="max-w-3xl">
            <span className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Last updated: April 2026
            </span>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Cookie Policy</h1>
          </div>
          <div className="legal-prose mt-10">
            {COOKIE_SECTIONS.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
