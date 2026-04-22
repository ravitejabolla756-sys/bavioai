import { CareersPage } from "@/components/pages/careers-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers | Bavio AI — Build the Future of Business Communication",
  description:
    "Join Bavio AI and build the voice AI platform that serves 63M+ Indian businesses. 3 open roles — remote-friendly, real equity.",
  path: "/careers"
});

export default function CareersPageRoute() {
  return (
    <PageTransition>
      <CareersPage />
    </PageTransition>
  );
}
