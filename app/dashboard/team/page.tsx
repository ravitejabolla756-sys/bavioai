import { DashboardModulePage } from "@/components/dashboard/dashboard-module-page";

export default function DashboardTeamPage() {
  return (
    <DashboardModulePage
      eyebrow="Team"
      title="Manage users, roles, and SSO."
      description="Invite team members, configure role-based access, and enforce enterprise identity policies across your workspace."
      highlights={[
        "Granular RBAC for operational separation",
        "SAML SSO and identity provider setup",
        "Seat-level permissions and scope controls",
        "Session policies and enforced MFA",
        "Access review and approval workflows",
        "Complete member activity audit history"
      ]}
    />
  );
}
