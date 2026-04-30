import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

const page = SEO_LANDING_PAGES["hipaa-compliant-voice-ai"];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/hipaa-compliant-voice-ai"
});

export default function HipaaCompliantVoiceAiPage() {
  return (
    <PageTransition>
      <SeoLandingPage slug="hipaa-compliant-voice-ai" />
    </PageTransition>
  );
}
