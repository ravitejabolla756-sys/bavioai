import { Homepage } from "@/components/sections/homepage";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata, getFaqJsonLd, getProductJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bavio AI | Clarity Over Complexity",
  description:
    "Bavio AI is the end-to-end voice agent platform for global teams. Answer every call, automate workflows, and scale with enterprise-grade reliability.",
  path: "/"
});

export default function HomePage() {
  const jsonLd = [
    getProductJsonLd(),
    getFaqJsonLd([
      {
        question: "Can Bavio support both Indian and global teams?",
        answer: "Yes. Bavio supports local-language workflows and global deployments from one platform."
      },
      {
        question: "Do you offer enterprise security and compliance support?",
        answer: "Yes. Bavio provides security documentation, governance controls, and enterprise onboarding support."
      },
      {
        question: "Is there a public status page and changelog?",
        answer: "Yes. Bavio publishes both a status page and changelog for uptime transparency and release visibility."
      }
    ])
  ];

  return (
    <PageTransition>
      <Homepage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </PageTransition>
  );
}
