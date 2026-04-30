import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SEO_LANDING_PAGES, type SeoLandingSlug } from "@/lib/seo-landing-pages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SeoLandingPage({ slug }: { slug: SeoLandingSlug }) {
  const page = SEO_LANDING_PAGES[slug];
  const Icon = page.icon;

  return (
    <main className="bg-[var(--bg-base)]">
      <section className="section-shell">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="mt-5 text-[clamp(42px,6vw,72px)] font-black leading-[1] text-[var(--text-primary)]">
              {page.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{page.subheading}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  {page.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href={page.secondaryHref}>{page.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <Card className="p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--light-accent)]">
              <Icon className="h-6 w-6" />
            </div>
            <div className="mt-6 space-y-3">
              {page.points.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-4 md:grid-cols-3">
          {page.proof.map((item) => (
            <Card key={item} className="p-6 text-center">
              <p className="text-xl font-black text-[var(--brand)]">{item}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
