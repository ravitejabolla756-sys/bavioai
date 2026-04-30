import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-[8px] border border-border bg-[var(--bg3)] px-3.5 py-2.5 text-[14px] text-foreground placeholder:text-muted transition-all duration-200 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_rgba(255,107,0,0.18)]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

type FieldProps = {
  label: string;
  helperText?: string;
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({ label, helperText, id, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      {children}
      {helperText ? <p className="text-xs text-[var(--text-muted)]">{helperText}</p> : null}
    </div>
  );
}
