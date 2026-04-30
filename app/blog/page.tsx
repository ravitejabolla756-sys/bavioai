import Link from "next/link";

import { BLOG_POSTS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Blog | Bavio AI",
  description: "Voice AI insights, product updates, developer guides, and case studies from the Bavio team.",
  path: "/blog"
});

const categories = ["Product Updates", "Industry Insights", "Developer Guides", "Case Studies", "AI Trends"];

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Blog</span>
            <h1 className="section-title">The SEO and thought leadership engine.</h1>
            <p className="section-sub">
              We publish product updates, industry insights, developer guides, case studies, and AI trends.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                {category}
              </span>
            ))}
          </div>

          <Card className="mt-10 overflow-hidden p-0">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="min-h-[320px] bg-[linear-gradient(135deg,var(--brand),#FF6B00_45%,#55240a)]" />
              <div className="p-8 md:p-10">
                <span className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                  {featured.category}
                </span>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{featured.title}</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{featured.summary}</p>
                <div className="mt-6 flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-raised)] text-xs font-semibold text-[var(--text-primary)]">
                    {featured.author.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  </span>
                  <span>{featured.author}</span>
                  <span>{featured.readTime}</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="mt-8 inline-flex text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                  Read featured post
                </Link>
              </div>
            </div>
          </Card>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <Card key={post.slug} className="group overflow-hidden p-0">
                <div className="h-[220px] bg-[linear-gradient(135deg,#FF6B00,#ec4899)]" />
                <div className="p-6">
                  <span className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{post.summary}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-[var(--text-muted)]">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                    Read article
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-6 text-center text-sm text-[var(--text-secondary)]">
            Publishing cadence target: 2 new posts per week to build sustained organic traffic over the next 6 months.
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}

