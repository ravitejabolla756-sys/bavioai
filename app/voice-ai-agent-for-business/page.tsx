import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

const page = SEO_LANDING_PAGES["voice-ai-agent-for-business"];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/voice-ai-agent-for-business"
});

export default function VoiceAiAgentForBusinessPage() {
  return (
    <PageTransition>
      <SeoLandingPage slug="voice-ai-agent-for-business" />
    </PageTransition>
  );
}
