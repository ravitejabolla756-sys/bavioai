import Image from "next/image";
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
    <Link href={href} className={cn("inline-flex items-center gap-2", className)} aria-label="Bavio Ai home">
      <Image
        src="/images/bavio-ai-header-logo.png"
        alt="Bavio Ai logo mark"
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 object-contain"
        priority
      />
      <div className={cn("font-heading text-[28px] font-extrabold leading-none", textTone)}>
        Bavio Ai
      </div>
    </Link>
  );
}
