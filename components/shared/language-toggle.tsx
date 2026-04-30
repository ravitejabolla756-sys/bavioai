"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const options = [
  { label: "EN", value: "en" },
  { label: "हिंदी", value: "hi" }
] as const;

export function LanguageToggle({
  value = "en",
  compact = false
}: {
  value?: "en" | "hi";
  compact?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function setLocale(nextLocale: "en" | "hi") {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale })
    });

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className={cn("inline-flex items-center rounded-full border border-border bg-[#0A0A0A] p-1", compact && "scale-[0.96]")}>
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          disabled={isPending}
          onClick={() => setLocale(option.value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all duration-150",
            value === option.value ? "bg-primary text-white" : "text-secondary hover:text-white",
            index === 0 && "pr-2",
            index === 1 && "pl-2"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
