import { EnterprisePage } from "@/components/pages/enterprise-page";
import { PageTransition } from "@/components/shared/page-transition";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Enterprise | Bavio AI — Voice AI Infrastructure at Scale",
  description:
    "Enterprise-grade AI voice infrastructure with SOC 2 readiness, HIPAA compliance, unlimited concurrency, SSO, RBAC, and white-glove implementation support.",
  path: "/enterprise"
});

export default function EnterprisePageRoute() {
  return (
    <PageTransition>
      <EnterprisePage />
    </PageTransition>
  );
}
