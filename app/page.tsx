import { Homepage } from "@/components/sections/homepage";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bavio AI | Never miss a business call. Ever.",
  description:
    "Bavio AI answers every call in Hindi and English, captures lead details, books appointments, and sends WhatsApp alerts for Indian businesses.",
  path: "/"
});

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Bavio AI",
        url: "https://www.bavio.in",
        logo: "https://www.bavio.in/og-image.png",
        sameAs: ["https://x.com/bavioai", "https://www.linkedin.com/company/bavio-ai"]
      },
      {
        "@type": "Product",
        name: "Bavio AI Voice Agent",
        brand: "Bavio AI",
        description: "AI voice assistant for Indian businesses that answers calls, captures leads, and automates follow-up.",
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "1999"
        }
      }
    ]
  };

  return (
    <PageTransition>
      <Homepage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </PageTransition>
  );
}
