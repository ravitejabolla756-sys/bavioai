import { DashboardModulePage } from "@/components/dashboard/dashboard-module-page";

export default function DashboardPhoneNumbersPage() {
  return (
    <DashboardModulePage
      eyebrow="Phone numbers"
      title="Provision and route numbers globally."
      description="Configure phone number routing, SIP trunks, failover logic, and geography-specific call handling from one dashboard."
      highlights={[
        "Instant number provisioning by region",
        "SIP trunk and PSTN routing controls",
        "Call routing by time, language, and intent",
        "Disaster recovery and fallback destinations",
        "Compliance-safe call recording policies",
        "Number-level performance telemetry"
      ]}
    />
  );
}
