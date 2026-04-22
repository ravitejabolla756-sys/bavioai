import { IntegrationsPage } from "@/components/pages/integrations-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Integrations | Bavio AI — Connect Your Entire Stack",
  description:
    "20+ live integrations for CRM, calendar, telephony, WhatsApp, payments, and analytics. Connect Bavio to your existing tools in minutes.",
  path: "/integrations"
});

export default function IntegrationsPageRoute() {
  return (
    <PageTransition>
      <IntegrationsPage />
    </PageTransition>
  );
}
