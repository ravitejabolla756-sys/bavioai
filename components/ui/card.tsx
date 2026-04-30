"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tilt?: boolean;
  accent?: boolean;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tilt = true, accent = false, onMouseMove, onMouseLeave, ...props }, ref) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    function handleMove(event: React.MouseEvent<HTMLDivElement>) {
      if (!tilt || !localRef.current) {
        onMouseMove?.(event);
        return;
      }
      const bounds = localRef.current.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) * 2 - 1) * -4;
      const rotateX = ((y / bounds.height) * 2 - 1) * 4;
      localRef.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      onMouseMove?.(event);
    }

    function handleLeave(event: React.MouseEvent<HTMLDivElement>) {
      if (localRef.current) {
        localRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      }
      onMouseLeave?.(event);
    }

    return (
      <div
        ref={localRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "surface surface-hover relative overflow-hidden rounded-[12px] border border-border bg-card/90 p-6 backdrop-blur-md will-change-transform",
          accent && "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:content-['']",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-heading text-[20px] font-bold tracking-[-0.02em] text-foreground", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-7 text-secondary", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-5", className)} {...props} />;
}
