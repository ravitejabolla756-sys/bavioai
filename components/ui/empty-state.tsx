import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
};

export function EmptyState({ title, description, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[12px] border border-border bg-[var(--bg2)] px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-[var(--bg3)] text-[var(--light-accent)]">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">{description}</p>
      {ctaLabel ? (
        <Button className="mt-5" onClick={onCta}>
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  );
}
