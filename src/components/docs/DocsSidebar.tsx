"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Book, 
  Terminal, 
  Code, 
  Phone, 
  Settings, 
  Plug, 
  Lock, 
  Activity,
  Layers,
  Cpu,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const navigation = [
  {
    title: "Introduction",
    items: [
      { id: "intro", label: "Welcome to Bavio AI", icon: Book, href: "/docs#intro" },
      { id: "getting-started", label: "Getting Started", icon: Terminal, href: "/docs#getting-started" },
    ],
  },
  {
    title: "Platform",
    items: [
      { id: "create", label: "Create AI Agent", icon: Cpu, href: "/docs#create" },
      { id: "connect", label: "Telephony", icon: Phone, href: "/docs#connect" },
      { id: "manage", label: "Conversations", icon: Settings, href: "/docs#manage" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { id: "integrations", label: "Integrations", icon: Layers, href: "/docs#integrations" },
      { id: "logs", label: "Logs & Analytics", icon: Activity, href: "/docs#logs" },
      { id: "security", label: "Security", icon: ShieldCheck, href: "/docs#security" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full space-y-8">
      {navigation.map((section) => (
        <div key={section.title} className="space-y-3">
          <h4 className="px-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
            {section.title}
          </h4>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-white/[0.03] hover:text-white",
                    "text-zinc-400"
                  )}
                >
                  <Icon size={16} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-500/50" />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
