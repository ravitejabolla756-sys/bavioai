import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
  tone = "default"
}: {
  href?: string;
  className?: string;
  tone?: "default" | "dashboard";
}) {
  const textTone = tone === "dashboard" ? "text-[var(--text-primary)]" : "text-[var(--text-primary)]";

  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)} aria-label="Bavio AI home">
      <div className={cn("flex items-baseline gap-0.5 font-heading text-[24px] font-extrabold tracking-[-0.05em]", textTone)}>
        <span>B</span>
        <span className="text-[var(--brand)]">.</span>
        <span>avio</span>
      </div>
    </Link>
  );
}
