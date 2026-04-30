import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[150px] w-full rounded-[6px] border border-border bg-background px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted transition-all duration-200 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_rgba(255,107,0,0.12)]",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
