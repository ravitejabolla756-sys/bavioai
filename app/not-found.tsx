import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-6 text-center">
      <div className="max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="text-5xl font-black tracking-[-0.05em] text-[var(--text-primary)]">This page doesn&apos;t exist. Yet.</h1>
        <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
          The route you&apos;re looking for isn&apos;t available right now. Let&apos;s get you back to Bavio.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </section>
  );
}
