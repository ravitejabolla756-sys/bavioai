import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

const page = SEO_LANDING_PAGES["vapi-ai-alternative"];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/vapi-ai-alternative"
});

export default function VapiAiAlternativePage() {
  return (
    <PageTransition>
      <SeoLandingPage slug="vapi-ai-alternative" />
    </PageTransition>
  );
}
