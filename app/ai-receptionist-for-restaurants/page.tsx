import { SeoLandingPage } from "@/components/pages/seo-landing-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

const page = SEO_LANDING_PAGES["ai-receptionist-for-restaurants"];

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/ai-receptionist-for-restaurants"
});

export default function AiReceptionistForRestaurantsPage() {
  return (
    <PageTransition>
      <SeoLandingPage slug="ai-receptionist-for-restaurants" />
    </PageTransition>
  );
}
