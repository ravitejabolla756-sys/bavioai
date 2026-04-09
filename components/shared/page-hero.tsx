import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("page-hero border-b border-[var(--border-base)]", className)}>
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="hero-noise absolute inset-0 opacity-60" />
      <div className="container page-hero-inner">
        <div className={cn(centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl")}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-hero-title">{title}</h1>
          <p className={cn("page-hero-copy", centered && "mx-auto")}>{description}</p>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
