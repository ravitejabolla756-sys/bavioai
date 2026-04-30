import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Data Deletion Request | Bavio AI",
  description: "Submit a GDPR or India DPDP-aligned data deletion request.",
  path: "/legal/data-deletion-request"
});

export default function DataDeletionRequestPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Privacy"
        title="Request data deletion."
        description="Use this form to submit a verified data deletion request under GDPR or India DPDP."
      />
      <section className="section-shell pt-0">
        <div className="container max-w-3xl">
          <form className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                className="h-11 rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
              />
              <input
                required
                type="email"
                placeholder="Work email"
                className="h-11 rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
              />
            </div>
            <input
              required
              placeholder="Company"
              className="mt-4 h-11 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)]"
            />
            <textarea
              required
              placeholder="Please describe the data you want deleted and any account identifiers."
              rows={6}
              className="mt-4 w-full rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-primary)]"
            />
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              We respond to verified requests as required by law and may ask for additional information to confirm identity.
            </p>
            <button
              type="submit"
              className="mt-5 h-11 rounded-[10px] bg-[var(--brand)] px-4 text-sm font-semibold text-black transition hover:bg-[var(--brand-hover)]"
            >
              Submit request
            </button>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
