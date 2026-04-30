import { DashboardModulePage } from "@/components/dashboard/dashboard-module-page";

export default function DashboardVoicesPage() {
  return (
    <DashboardModulePage
      eyebrow="Voices"
      title="Control voice quality and branding."
      description="Select production voices, configure multilingual defaults, and manage custom voice cloning for enterprise-grade call experiences."
      highlights={[
        "Workspace voice library with previews",
        "Voice selection by use case and language",
        "Custom voice cloning setup and approvals",
        "Voice safety filters and response controls",
        "Latency and quality scoring by voice",
        "A/B testing for conversion by voice profile"
      ]}
    />
  );
}
