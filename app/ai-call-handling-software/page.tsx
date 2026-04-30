import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

const page = SEO_LANDING_PAGES["ai-call-handling-software"];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/ai-call-handling-software"
});

export default function AiCallHandlingSoftwarePage() {
  return (
    <PageTransition>
      <SeoLandingPage slug="ai-call-handling-software" />
    </PageTransition>
  );
}
