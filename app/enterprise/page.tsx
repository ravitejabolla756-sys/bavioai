import { EnterprisePage } from "@/components/pages/enterprise-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Enterprise | Bavio AI - Voice AI Infrastructure at Scale",
  description:
    "Enterprise-grade voice AI infrastructure with SOC 2 Type II, HIPAA, GDPR, DPDP, SSO, RBAC, and dedicated implementation support.",
  path: "/enterprise"
});

export default function EnterprisePageRoute() {
  return (
    <PageTransition>
      <EnterprisePage />
    </PageTransition>
  );
}
