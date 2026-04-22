import Link from "next/link";
import { notFound } from "next/navigation";

import { BLOG_POSTS, getBlogPost } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: `${post.title} | Bavio AI Blog`,
    description: post.summary,
    path: `/blog/${post.slug}`
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <PageTransition>
      <article className="section-shell">
        <div className="container max-w-5xl">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,var(--brand),#A855F7_45%,#55240a)] px-8 py-14">
            <span className="rounded-full bg-[rgba(0,0,0,0.16)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-black">
              {post.category}
            </span>
            <h1 className="mt-6 max-w-4xl text-[clamp(40px,6vw,72px)] font-black leading-[0.98] tracking-[-0.05em] text-black">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-black/70">
              <span>{post.author}</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="legal-prose mt-10 max-w-none">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Card className="mt-12 p-8">
            <h2 className="text-2xl font-black text-[var(--text-primary)]">About the author</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              {post.author} writes about voice automation, customer operations, and how Indian businesses can convert more calls into revenue.
            </p>
          </Card>

          <div className="mt-12">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Related posts</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((entry) => (
                <Card key={entry.slug} className="p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--brand)]">{entry.category}</p>
                  <h3 className="mt-4 text-xl font-black text-[var(--text-primary)]">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{entry.summary}</p>
                  <Link href={`/blog/${entry.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--text-primary)]">
                    Read post →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
