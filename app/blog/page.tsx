import Link from "next/link";

import { BLOG_POSTS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Blog | Bavio AI",
  description: "Read insights on Indian business calls, AI voice operations, and workflow automation from the Bavio team.",
  path: "/blog"
});

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Blog</span>
            <h1 className="section-title">Insights on AI voice and automation.</h1>
            <p className="section-sub">Product lessons, India-specific customer insights, and practical playbooks for voice operations.</p>
          </div>

          <Card className="mt-12 overflow-hidden p-0">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="min-h-[320px] bg-[linear-gradient(135deg,var(--brand),#A855F7_45%,#55240a)]" />
              <div className="p-8 md:p-10">
                <span className="rounded-full bg-[var(--brand-subtle)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                  {featured.category}
                </span>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{featured.title}</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{featured.summary}</p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                  <span>{featured.author}</span>
                  <span>{featured.readTime}</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="mt-8 inline-flex text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                  Read featured post -
                </Link>
              </div>
            </div>
          </Card>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post, index) => (
              <Card key={post.slug} className="group overflow-hidden p-0">
                <div className={`${index === 0 ? "bg-[linear-gradient(135deg,#0d9488,#2563eb)]" : index === 1 ? "bg-[linear-gradient(135deg,#7c3aed,#ec4899)]" : "bg-[linear-gradient(135deg,#f59e0b,#f97316)]"} h-[220px]`} />
                <div className="p-6">
                  <span className="rounded-full bg-[var(--brand-subtle)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{post.summary}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-[var(--text-muted)]">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                    Read article -
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
