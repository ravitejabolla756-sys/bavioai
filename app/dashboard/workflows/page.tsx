import { DashboardModulePage } from "@/components/dashboard/dashboard-module-page";

export default function DashboardWorkflowsPage() {
  return (
    <DashboardModulePage
      eyebrow="Workflows"
      title="Build visual call automation flows."
      description="Design call logic with intent branches, API actions, human handoff rules, and post-call automations across your pipeline."
      highlights={[
        "Drag-and-drop workflow canvas",
        "Conditional branching by intent and sentiment",
        "Reusable nodes for CRM, payments, and calendars",
        "Webhook actions with retry and idempotency",
        "Real-time simulation before publish",
        "Workflow-level analytics and outcomes"
      ]}
    />
  );
}
