import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Quickstart | Bavio AI",
  description: "Follow the Bavio quickstart to configure your first voice agent and connect your workflow in minutes.",
  path: "/docs/quickstart"
});

export default function DocsQuickstartPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Quickstart"
        title="From account to first live call in minutes."
        description="A clear setup path for operators and developers who want to deploy their first Bavio workflow without friction."
      />
      <section className="section-shell pt-0">
        <div className="container grid gap-5 lg:grid-cols-4">
          {[
            ["1", "Create your workspace", "Sign up, authenticate, and open the dashboard shell."],
            ["2", "Define the assistant", "Set language, first message, industry context, and prompt rules."],
            ["3", "Connect the workflow", "Map CRM, calendar, phone number, and follow-up actions."],
            ["4", "Test and deploy", "Run a test call, inspect the transcript, and go live."]
          ].map(([step, title, copy]) => (
            <Card key={title} className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-sm font-bold text-[var(--brand)]">
                {step}
              </div>
              <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{copy}</p>
            </Card>
          ))}
        </div>
        <div className="container mt-8">
          <Button asChild size="lg">
            <Link href="/sign-up">Start with Bavio</Link>
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
