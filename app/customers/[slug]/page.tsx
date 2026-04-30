import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";

const stories: Record<
  string,
  {
    company: string;
    industry: string;
    result: string;
    body: string[];
  }
> = {
  "medcenter-clinic": {
    company: "MedCenter Clinic Network",
    industry: "Healthcare",
    result: "78% fewer missed appointments",
    body: [
      "MedCenter deployed Bavio to handle appointment intake, after-hours follow-ups, and multilingual patient scheduling across multiple locations.",
      "The team reduced missed calls, improved booking conversion, and established a consistent patient-first phone experience without adding manual call center load.",
      "By integrating scheduling workflows and WhatsApp confirmations, MedCenter turned inbound call volume into measurable operational efficiency."
    ]
  },
  "urbanestate-group": {
    company: "UrbanEstate Group",
    industry: "Real Estate",
    result: "2.3x more qualified call outcomes",
    body: [
      "UrbanEstate used Bavio to qualify callers by location, budget, and intent before routing leads to advisors.",
      "This reduced time spent on low-intent interactions and increased site-visit conversion across active projects.",
      "Sales leadership gained structured call analytics to optimize campaign ROI and agent allocation."
    ]
  },
  "casaverde-dining": {
    company: "CasaVerde Dining",
    industry: "Restaurant",
    result: "51% reduction in missed reservation calls",
    body: [
      "CasaVerde adopted Bavio for reservation handling during peak service windows.",
      "The assistant confirmed party size, time slots, and dietary details while staff remained focused on in-venue hospitality.",
      "The result was fewer missed bookings and cleaner table planning across high-demand evenings."
    ]
  },
  "cloudnest-support": {
    company: "CloudNest Support",
    industry: "Customer Support",
    result: "34% faster first response",
    body: [
      "CloudNest configured Bavio to resolve tier-1 support intents and route escalations with transcript context.",
      "Support teams no longer asked customers to repeat issue details after transfer.",
      "This shortened response cycles and improved customer satisfaction in high-volume periods."
    ]
  },
  "fixfast-ops": {
    company: "FixFast Ops",
    industry: "Field Service",
    result: "41% faster dispatch conversion",
    body: [
      "FixFast integrated Bavio into dispatch intake workflows for urgent and scheduled service requests.",
      "The system captured location, urgency, and job type in real time and pushed tasks to field coordinators.",
      "Operational throughput improved while reducing missed opportunities during off-hours."
    ]
  }
};

export default function CustomerStoryPage({ params }: { params: { slug: string } }) {
  const story = stories[params.slug];

  if (!story) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <Link href="/customers" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft className="h-4 w-4" />
            Back to Customers
          </Link>
          <Card className="mt-6 p-8 md:p-10">
            <p className="eyebrow">{story.industry}</p>
            <h1 className="text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{story.company}</h1>
            <p className="mt-3 text-xl font-bold text-[var(--accent-green)]">{story.result}</p>
            <div className="mt-6 space-y-4 text-sm leading-8 text-[var(--text-secondary)]">
              {story.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
