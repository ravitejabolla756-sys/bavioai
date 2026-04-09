"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function CallTranscript({
  lines,
  className,
  alternating = false
}: {
  lines: string[];
  className?: string;
  alternating?: boolean;
}) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    setVisibleLines([]);
    lines.forEach((line, index) => {
      window.setTimeout(() => {
        setVisibleLines((current) => [...current, line]);
      }, index * 800);
    });
  }, [lines]);

  return (
    <div className={cn("space-y-3", className)}>
      {lines.map((line, index) => {
        const visible = visibleLines.includes(line);
        const isRight = alternating && index % 2 === 1;

        return (
          <div
            key={`${line}-${index}`}
            className={cn("flex", isRight && "justify-end")}
          >
            <div
              className={cn(
                "max-w-[92%] rounded-[10px] border bg-[#111111] px-4 py-3 text-[14px] leading-6 transition-all duration-500",
                visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                isRight
                  ? "border-border text-[#A1A1AA]"
                  : "border-border border-l-2 border-l-primary text-white"
              )}
            >
              {visible ? line : <span className="animate-pulse text-[#52525B]">...</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
