import Link from "next/link";

import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support | Bavio AI Docs",
  description: "Developer support channels, response SLAs, and escalation paths.",
  path: "/docs/support"
});

export default function DocsSupportPage() {
  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-5xl">
          <p className="eyebrow">Support</p>
          <h1 className="section-title">Developer support and escalation paths.</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Community</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Best-effort support for starter plans.</p>
              <p className="mt-4 text-xs text-[var(--text-muted)]">Response: 48-72 hours</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Priority</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Professional plan technical support.</p>
              <p className="mt-4 text-xs text-[var(--text-muted)]">Response: within 8 business hours</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Enterprise</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Dedicated channels and SLA-backed support.</p>
              <p className="mt-4 text-xs text-[var(--text-muted)]">Response: 24/7 based on contract tier</p>
            </Card>
          </div>
          <div className="mt-8 text-sm text-[var(--text-secondary)]">
            Need immediate help? Contact <Link href="/contact" className="text-[var(--brand)]">support</Link> or talk to enterprise success.
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
