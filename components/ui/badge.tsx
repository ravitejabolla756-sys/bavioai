import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        default: "border-[#FF6B0033] bg-[#FF6B0015] text-primary",
        success: "border-[rgba(34,197,94,0.18)] bg-[rgba(34,197,94,0.1)] text-success",
        warning: "border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] text-warning",
        red: "border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.08)] text-danger",
        blue: "border-[rgba(96,165,250,0.2)] bg-[rgba(96,165,250,0.08)] text-info",
        muted: "border-border bg-overlay text-secondary"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
