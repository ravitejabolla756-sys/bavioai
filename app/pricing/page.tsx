import { PricingPageContent } from "@/components/sections/pricing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing | Bavio AI",
  description: "Transparent INR pricing for Bavio AI with flexible plans, overage rates, and clear FAQs.",
  path: "/pricing"
});

export default function PricingPage() {
  return (
    <PageTransition>
      <PricingPageContent />
    </PageTransition>
  );
}
