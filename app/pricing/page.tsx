import { PricingPageContent } from "@/components/sections/pricing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata, getFaqJsonLd, getProductJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing | Bavio AI",
  description: "Transparent global pricing with INR/USD billing, feature comparison, overage details, and enterprise custom plans.",
  path: "/pricing"
});

const pricingFaqs = [
  {
    question: "What happens when I exceed my minute limit?",
    answer: "Your service continues uninterrupted and usage is billed at the plan's overage rate. You can upgrade anytime to reduce overage costs."
  },
  {
    question: "Can I switch plans anytime?",
    answer: "Yes. Upgrades are applied immediately. Downgrades take effect from the next billing cycle."
  },
  {
    question: "Do you support both INR and USD billing?",
    answer: "Yes. India-based customers can use INR billing and global customers can use USD billing."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes. Starter is free for evaluation and includes test minutes so your team can validate workflows before production."
  }
];

export default function PricingPage() {
  const jsonLd = [getProductJsonLd(), getFaqJsonLd(pricingFaqs)];

  return (
    <PageTransition>
      <PricingPageContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </PageTransition>
  );
}
