import { CheckCircle2, CircleDashed } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Launch Checklist | Bavio AI",
  description: "Complete Bavio AI launch checklist for site structure, trust, conversion, developer experience, design, and performance.",
  path: "/launch-checklist"
});

const checklistGroups = [
  {
    title: "Site structure and pages",
    items: [
      ["Homepage", true],
      ["/product", true],
      ["/pricing", true],
      ["/integrations", true],
      ["/enterprise", true],
      ["/customers", true],
      ["/use-cases with industry pages", true],
      ["/company", true],
      ["/blog with 5+ posts", true],
      ["/changelog", true],
      ["/careers", true],
      ["/docs", true],
      ["/voices", true],
      ["/playground", true],
      ["/legal/privacy", true],
      ["/legal/terms", true],
      ["/legal/security", true],
      ["/status", true],
      ["/contact", true]
    ]
  },
  {
    title: "Trust and credibility",
    items: [
      ["Customer logos bar", true],
      ["At least 3 testimonials", true],
      ["Published case studies with metrics", true],
      ["Usage statistics displayed", true],
      ["Founder LinkedIn links", true],
      ["SOC 2 / HIPAA / GDPR badges", true],
      ["Public status page linked", true],
      ["Real privacy and terms pages", true],
      ["Cookie consent banner", true]
    ]
  },
  {
    title: "Conversion and growth",
    items: [
      ["Live chat widget", false],
      ["ROI calculator", true],
      ["Exit-intent or email capture", false],
      ["Referral program", true],
      ["Product Hunt launch plan", true],
      ["Search Console sitemap submission", false],
      ["Open Graph tags", true],
      ["INR / USD pricing toggle", true]
    ]
  },
  {
    title: "Developer experience",
    items: [
      ["Mintlify or equivalent docs migration", false],
      ["5-minute quickstart", true],
      ["API reference with examples", true],
      ["Node.js and Python SDK plan", false],
      ["Postman collection downloadable", true],
      ["Interactive playground", true],
      ["Weekly changelog", true]
    ]
  },
  {
    title: "Design and performance",
    items: [
      ["Lighthouse 90+ target", false],
      ["Responsive down to 375px", true],
      ["Core Web Vitals green-zone target", false],
      ["Consistent brand palette", true],
      ["No broken links", false],
      ["Image alt text audit", false],
      ["HTTPS and HSTS", false],
      ["Font optimization", false]
    ]
  }
];

export default function LaunchChecklistPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Launch checklist"
        title="Global startup readiness tracker."
        description="A living checklist for closing the gap between a promising product site and a world-class launch surface."
      />

      <section className="section-shell pt-0">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {checklistGroups.map((group) => {
            const completed = group.items.filter(([, done]) => done).length;
            return (
              <Card key={group.title} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-black text-[var(--text-primary)]">{group.title}</h2>
                  <span className="rounded-full border border-[var(--border-base)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                    {completed}/{group.items.length}
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {group.items.map(([label, done]) => (
                    <div key={label as string} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      {done ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                      ) : (
                        <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                      )}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
