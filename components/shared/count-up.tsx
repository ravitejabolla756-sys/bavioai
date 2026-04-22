"use client";

import { useEffect, useRef, useState } from "react";

import { formatCurrency, formatNumber } from "@/lib/utils";

export function CountUp({
  value,
  suffix = "",
  currency = false,
  className
}: {
  value: number;
  suffix?: string;
  currency?: boolean;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          const start = performance.now();
          const duration = 2000;

          const frame = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(value * eased);
            if (progress < 1) requestAnimationFrame(frame);
          };

          requestAnimationFrame(frame);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  const rendered = currency
    ? formatCurrency(displayValue)
    : Number.isInteger(value)
      ? `${formatNumber(Math.round(displayValue))}${suffix}`
      : `${displayValue.toFixed(1)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {rendered}
    </span>
  );
}
