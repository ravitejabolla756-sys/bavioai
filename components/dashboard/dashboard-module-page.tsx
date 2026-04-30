import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DashboardModulePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export function DashboardModulePage({
  eyebrow,
  title,
  description,
  highlights
}: DashboardModulePageProps) {
  return (
    <div className="space-y-6">
      <Card className="p-7 md:p-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--text-secondary)]">{description}</p>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item} className="p-6 text-sm text-[var(--text-secondary)]">
            {item}
          </Card>
        ))}
      </div>

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Need this module customized for your workflow? Configure with APIs or contact enterprise support.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link href="/docs">API docs</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">
              Contact support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
