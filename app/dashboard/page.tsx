import { DashboardOverview } from "@/components/shared/dashboard-overview";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dashboard | Bavio AI",
  description: "Monitor calls, assistants, analytics, billing, and settings in your Bavio AI dashboard.",
  path: "/dashboard"
});

export default function DashboardPage() {
  return <DashboardOverview />;
}
