import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function WorkflowDiagram({
  steps,
  className
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <div className="rounded-[12px] border border-border bg-black px-4 py-3 text-sm font-medium text-secondary">
            {step}
          </div>
          {index < steps.length - 1 ? <ArrowRight className="h-4 w-4 text-primary" /> : null}
        </div>
      ))}
    </div>
  );
}
