import { CustomersPage } from "@/components/pages/customers-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Customers | Bavio AI — Real Results from Real Businesses",
  description:
    "See case studies from healthcare clinics, real estate agencies, and EdTech platforms using Bavio AI to eliminate missed calls and grow revenue.",
  path: "/customers"
});

export default function CustomersPageRoute() {
  return (
    <PageTransition>
      <CustomersPage />
    </PageTransition>
  );
}
