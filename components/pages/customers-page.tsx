import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { TestimonialQuotes } from "@/components/shared/trust-elements";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const verticalStories = [
  {
    industry: "Healthcare",
    useCase: "Appointment booking and after-hours intake",
    result: "78% fewer missed appointments",
    quote: "Our front desk finally stops losing high-intent calls after 6 PM.",
    logo: "MC",
    href: "/customers/medcenter-clinic"
  },
  {
    industry: "Real Estate",
    useCase: "Lead qualification and site-visit scheduling",
    result: "2.3x more qualified call outcomes",
    quote: "Every inquiry is now scored before it reaches an agent.",
    logo: "UE",
    href: "/customers/urbanestate-group"
  },
  {
    industry: "Restaurant",
    useCase: "Reservation handling and order support",
    result: "51% reduction in missed reservation calls",
    quote: "Our team stays focused on guests while AI handles the phone load.",
    logo: "CV",
    href: "/customers/casaverde-dining"
  },
  {
    industry: "Customer Support",
    useCase: "Tier-1 resolution and intelligent routing",
    result: "34% faster first response",
    quote: "Escalations now arrive with full transcript context.",
    logo: "CN",
    href: "/customers/cloudnest-support"
  },
  {
    industry: "Field Service",
    useCase: "Dispatch triage and callback automation",
    result: "41% faster dispatch conversion",
    quote: "Urgent jobs are prioritized in seconds without manual queueing.",
    logo: "FF",
    href: "/customers/fixfast-ops"
  }
];

export function CustomersPage() {
  return (
    <div className="bg-[var(--bg-base)]">
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Customers</p>
            <h1 className="page-hero-title max-w-5xl">Businesses That Chose Bavio Never Go Back to Missed Calls.</h1>
            <p className="page-hero-copy max-w-3xl">
              Proof from production deployments across healthcare, real estate, restaurants, customer support, and field service operations.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <Card className="p-8 md:p-10">
              <p className="eyebrow">Featured customer story</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,var(--brand),#FF6B00)] text-sm font-black text-black">
                  MC
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">MedCenter Clinic Network</h2>
                  <p className="text-sm text-[var(--text-muted)]">Healthcare | Multi-location patient intake automation</p>
                </div>
              </div>
              <div className="mt-6 rounded-[14px] border border-[var(--border-brand)] bg-[var(--brand-dim)] px-5 py-4">
                <p className="text-2xl font-black text-[var(--light-accent)]">Before: 62 missed calls/day | After: 14 missed calls/day</p>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-8 text-[var(--text-secondary)]">
                <p>
                  MedCenter operates a growing network of neighborhood clinics across three cities, and their team had a familiar problem: phone demand peaked exactly when the front desk was busiest with in-person patient flow. During late afternoons and evenings, inbound calls would stack up, hold times would rise, and patients trying to book follow-up appointments often abandoned the call before anyone could respond. Their operations leadership knew this was not only a patient experience issue, but a direct revenue leak. New consultations, post-treatment follow-ups, and diagnostic bookings were being lost every week because response capacity did not match demand.
                </p>
                <p>
                  Before deploying Bavio, MedCenter tried extending call-center shifts and adding overflow routing to mobile numbers, but this created inconsistent service quality and limited visibility. Some calls were answered quickly while others were missed completely. Even when calls were picked up, details like language preference, appointment intent, and urgency were often captured manually in notes and later re-entered into systems. That delay created scheduling mistakes and slower callback cycles. Leadership wanted a way to answer every call with consistency, collect structured context immediately, and route urgent or complex conversations to humans only when needed.
                </p>
                <p>
                  Bavio was deployed in phased mode across appointment booking, follow-up reminders, and intake triage. In phase one, the voice agent handled routine appointment requests in English and Hindi, checked calendar availability, offered patient slot options, and sent confirmation summaries through WhatsApp. In phase two, MedCenter connected workflow actions for call disposition tagging, escalation to live operators, and post-call sync into CRM records. Implementation included a custom script framework tuned for common healthcare intents such as follow-up booking, lab-result inquiry, and urgent callback request. The team also configured compliance-safe call handling disclosures and escalation thresholds.
                </p>
                <p>
                  Within the first six weeks, MedCenter saw measurable improvements: missed calls dropped from an average of 62 per day to 14, first-response time improved significantly during peak windows, and appointment conversion from inbound calls increased by 37%. More importantly, the patient experience became consistent. Every caller received immediate acknowledgment, clear next steps, and message-based confirmation without waiting for manual callback queues. Clinic staff reported lower context-switching stress at the desk, while operations leaders gained a clean analytics layer for demand trends, language mix, and call outcomes by location.
                </p>
                <p>
                  MedCenter’s founder summarized the impact directly: “Bavio turned our phones from a daily bottleneck into a predictable intake system. We didn’t just reduce missed calls; we improved how patients experience our clinics from the very first interaction.” Today, MedCenter continues expanding automation coverage to billing reminders and chronic-care follow-up flows while keeping human teams focused on high-complexity patient interactions.
                </p>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-4">
                <Quote className="mt-1 h-4 w-4 text-[var(--brand)]" />
                <p className="text-sm italic text-[var(--text-secondary)]">
                  "Bavio turned our phones from a bottleneck into a reliable intake channel we can scale."
                </p>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/customers/medcenter-clinic">
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Case studies</span>
            <h2 className="section-title">Results across core business verticals.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {verticalStories.map((story) => (
              <Card key={story.industry} className="p-6">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-[var(--border-base)] bg-[var(--bg-overlay)] px-3 py-1 text-xs text-[var(--text-muted)]">
                    {story.industry}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,var(--brand),#FF6B00)] text-xs font-black text-black">
                    {story.logo}
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">{story.useCase}</p>
                <p className="mt-4 text-lg font-black text-[var(--accent-green)]">{story.result}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">"{story.quote}"</p>
                <Button asChild variant="ghost" className="mt-5 px-0">
                  <Link href={story.href}>
                    Read Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialQuotes />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[380px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.14),transparent_68%)]" />
        <div className="container relative z-[1] text-center">
          <h2 className="section-title mx-auto">Want to be featured? Become a Bavio customer today.</h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">Start with Bavio</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

