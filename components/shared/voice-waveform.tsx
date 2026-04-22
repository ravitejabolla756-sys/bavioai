"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export function VoiceWaveform({
  bars = 20,
  className
}: {
  bars?: number;
  className?: string;
}) {
  const [levels, setLevels] = useState<number[]>([]);

  useEffect(() => {
    setLevels(Array.from({ length: bars }, () => 8 + Math.random() * 28));
    const interval = window.setInterval(() => {
      setLevels(Array.from({ length: bars }, () => 4 + Math.random() * 36));
    }, 150);

    return () => window.clearInterval(interval);
  }, [bars]);

  const palette = useMemo(() => ["#2563EB", "#4F46E5", "#7C3AED"], []);

  return (
    <div className={cn("flex h-12 items-end gap-[3px]", className)}>
      {levels.map((level, index) => (
        <span
          key={`${index}-${palette[index % palette.length]}`}
          className="block w-[3px] rounded-[2px] transition-all duration-150"
          style={{
            height: `${level}px`,
            background: palette[index % palette.length],
            boxShadow: `0 0 6px ${palette[index % palette.length]}80`
          }}
        />
      ))}
    </div>
  );
}
