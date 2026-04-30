import Link from "next/link";
import { BellRing, Home } from "lucide-react";

import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Subscribed | Bavio Ai",
  description: "Thanks for subscribing. We will notify you when the Bavio Ai service starts.",
  path: "/subscribe-success"
});

export default function SubscribeSuccessPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container flex min-h-[60vh] items-center justify-center">
          <Card className="w-full max-w-2xl p-8 text-center md:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[14px] border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--light-accent)]">
              <BellRing className="h-6 w-6" />
            </div>
            <p className="eyebrow mt-6 justify-center">Subscription received</p>
            <h1 className="mt-3 text-4xl font-black text-[var(--text-primary)]">We will notify you when the service starts.</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[var(--text-secondary)]">
              Thanks for joining the Bavio Ai update list. You will hear from us when launch access and service updates are ready.
            </p>
            <div className="mt-7 flex justify-center">
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
