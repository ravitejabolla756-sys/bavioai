import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-[6px] border border-border bg-background px-3.5 py-2.5 text-[14px] text-foreground placeholder:text-muted transition-all duration-200 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_rgba(123,47,190,0.12)]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
