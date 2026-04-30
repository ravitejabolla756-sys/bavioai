import Link from "next/link";
import { notFound } from "next/navigation";

import { BLOG_POSTS, getBlogPost } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const initials = post.author.split(" ").map((part) => part[0]).join("").slice(0, 2);
  const postUrl = `https://www.bavio.ai/blog/${post.slug}`;
  const shareX = `https://x.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <PageTransition>
      <article className="section-shell">
        <div className="container max-w-5xl">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,var(--brand),#FF6B00_45%,#55240a)] px-8 py-14">
            <span className="rounded-full bg-[rgba(0,0,0,0.16)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-black">
              {post.category}
            </span>
            <h1 className="mt-6 max-w-4xl text-[clamp(40px,6vw,72px)] font-black leading-[0.98] tracking-[-0.05em] text-black">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-black/75">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-xs font-semibold text-black">
                {initials}
              </span>
              <span>{post.author}</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="sm" variant="ghost">
              <Link href={shareX} target="_blank" rel="noreferrer">Share on X</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href={shareLinkedIn} target="_blank" rel="noreferrer">Share on LinkedIn</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href={postUrl} target="_blank" rel="noreferrer">Copy link</Link>
            </Button>
          </div>

          <div className="legal-prose mt-10 max-w-none">
            {post.body.map((paragraph, index) => (
              <div key={paragraph}>
                <p>{paragraph}</p>
                {index === 1 ? (
                  <Card className="my-8 p-6">
                    <p className="text-sm text-[var(--text-secondary)]">
                      Want to see how this applies to your workflow? Launch a guided pilot with Bavio.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Button asChild size="sm">
                        <Link href="/signup">Start Building Free</Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link href="/contact">Talk to Sales</Link>
                      </Button>
                    </div>
                  </Card>
                ) : null}
              </div>
            ))}
          </div>

          <Card className="mt-12 p-8">
            <h2 className="text-2xl font-black text-[var(--text-primary)]">About the author</h2>
            <div className="mt-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] text-sm font-semibold text-[var(--text-primary)]">
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{post.author}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {post.author} writes about voice automation, growth workflows, and operating systems for modern AI-first teams.
                </p>
              </div>
            </div>
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
                    Read post
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
