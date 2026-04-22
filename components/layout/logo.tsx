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
  const markClass =
    tone === "dashboard"
      ? "bg-[linear-gradient(135deg,#7B2FBE,#A855F7)] text-white shadow-[0_0_24px_rgba(123,47,190,0.3)]"
      : "bg-[linear-gradient(135deg,#7B2FBE,#A855F7)] text-black shadow-[0_0_24px_rgba(123,47,190,0.28)]";

  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)} aria-label="Bavio AI home">
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-[8px] font-heading text-[15px] font-extrabold", markClass)}>
        B
      </div>
      <div className="flex items-baseline gap-0.5 font-heading text-[18px] font-bold tracking-[-0.03em]">
        <span className="text-foreground">avio</span>
        <span className="text-primary">.ai</span>
      </div>
    </Link>
  );
}
