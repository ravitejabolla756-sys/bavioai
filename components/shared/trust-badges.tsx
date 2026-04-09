import { BadgeCheck, Database, Radio, ShieldCheck } from "lucide-react";

const badges = [
  { label: "TRAI Compliant", Icon: ShieldCheck },
  { label: "SOC 2 Ready", Icon: BadgeCheck },
  { label: "Indian Data Residency", Icon: Database },
  { label: "Exotel Certified Partner", Icon: Radio }
];

export function TrustBadges() {
  return (
    <div className="border-b border-border bg-background">
      <div className="container flex min-h-11 flex-wrap items-center justify-center gap-x-8 gap-y-2 py-2">
        {badges.map((badge, index) => {
          const Icon = badge.Icon;
          return (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-[12px] text-secondary"
              style={{ animation: `fadeUp 600ms ease-out ${index * 80}ms both` }}
            >
              <Icon className="h-[14px] w-[14px] text-primary" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
