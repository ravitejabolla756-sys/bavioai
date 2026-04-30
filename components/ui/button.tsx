"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-[10px] border text-[14px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-white hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_18px_40px_rgba(255,107,0,0.28)]",
        secondary:
          "border-primary bg-transparent text-primary hover:-translate-y-0.5 hover:bg-primary/10",
        ghost:
          "border-[#2A2A2A] bg-transparent text-[var(--text-primary)] hover:-translate-y-0.5 hover:border-primary hover:bg-[var(--bg-subtle)]",
        default:
          "border-primary bg-primary text-white hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_18px_40px_rgba(255,107,0,0.28)]",
        outline:
          "border-primary bg-transparent text-primary hover:-translate-y-0.5 hover:bg-primary/10",
        subtle:
          "border-border bg-overlay text-secondary hover:border-primary/40 hover:text-foreground",
        danger:
          "border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] text-[#EF4444] hover:bg-[rgba(239,68,68,0.16)]"
      },
      size: {
        default: "min-h-11 px-5 py-2",
        sm: "min-h-11 px-4 py-2 text-[13px]",
        lg: "h-14 px-7 text-[15px]",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      const target = event.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((current) => [...current, { id, x: event.clientX - target.left, y: event.clientY - target.top }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 220);
      onClick?.(event);
    }

    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), "will-change-transform", className)} onClick={handleClick} {...props}>
        <span className="relative z-[2] inline-flex items-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {children}
        </span>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute z-[1] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15"
            style={{ left: ripple.x, top: ripple.y, animation: "ripple 220ms var(--ease-smooth)" }}
          />
        ))}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
