import { CareersPage } from "@/components/pages/careers-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers | Bavio AI - Build the Future of Business Communication",
  description:
    "Join Bavio AI across engineering, product, sales, marketing, and operations. Remote-first culture with equity, learning budget, and health coverage.",
  path: "/careers"
});

export default function CareersPageRoute() {
  return (
    <PageTransition>
      <CareersPage />
    </PageTransition>
  );
}
