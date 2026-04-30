"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-6 text-center">
      <div className="max-w-xl">
        <p className="eyebrow">500</p>
        <h1 className="text-5xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Something went wrong.</h1>
        <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
          We&apos;re fixing it. You can retry this route or head back home.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="ghost">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
