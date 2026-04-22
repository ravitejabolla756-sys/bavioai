import { CompanyPage } from "@/components/pages/company-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Company | Bavio AI — Built to Answer Every Call",
  description:
    "Learn about the team, mission, and story behind Bavio AI — an India-first voice automation company solving missed calls for 63M+ businesses.",
  path: "/company"
});

export default function CompanyPageRoute() {
  return (
    <PageTransition>
      <CompanyPage />
    </PageTransition>
  );
}
