import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="border-t border-border bg-[radial-gradient(ellipse_800px_400px_at_50%_100%,rgba(37,99,235,0.08)_0%,transparent_70%),#000] py-[120px]">
      <div className="container text-center">
        <div className="mx-auto mb-5 inline-flex rounded-full border border-[rgba(37,99,235,0.2)] bg-[rgba(37,99,235,0.08)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
          Get started today
        </div>
        <h2 className="text-[clamp(40px,5vw,52px)] font-extrabold tracking-[-0.04em] text-white">Ready to automate your calls?</h2>
        <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-8 text-secondary">
          Start with a single Google login and move straight into your live Bavio workspace.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/login">Start with Google</Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="/contact">Talk to Sales</Link>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-[13px] text-muted">
          <span>✓ Secure backend auth</span>
          <span>✓ Setup in minutes</span>
          <span>✓ Real dashboard access</span>
        </div>
      </div>
    </section>
  );
}
