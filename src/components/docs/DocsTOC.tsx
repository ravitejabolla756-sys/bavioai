"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  label: string;
}

export function DocsTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-32 space-y-4">
      <h3 className="px-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        On this page
      </h3>
      <nav className="space-y-1 border-l border-white/5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block py-1.5 pl-4 text-sm transition-all duration-200 border-l-2 -ml-[2px]",
              activeId === item.id
                ? "border-indigo-500 text-white font-medium"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
