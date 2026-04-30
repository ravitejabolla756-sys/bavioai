import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

const page = SEO_LANDING_PAGES["voice-agent-api"];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/voice-agent-api"
});

export default function VoiceAgentApiPage() {
  return (
    <PageTransition>
      <SeoLandingPage slug="voice-agent-api" />
    </PageTransition>
  );
}
