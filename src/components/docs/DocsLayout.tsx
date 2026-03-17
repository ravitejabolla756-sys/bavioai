"use client";

import { DocsSidebar } from "./DocsSidebar";
import { DocsTOC } from "./DocsTOC";
import { DocsSearch } from "./DocsSearch";
import Link from "next/link";
import Image from "next/image";
import { SlidingTextButton } from "../ui/sliding-text-button";
import { useRouter } from "next/navigation";

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems: { id: string; label: string }[];
}

export function DocsLayout({ children, tocItems }: DocsLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Docs-specific Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050507]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
             <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B61FF] to-[#9B8CFF] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/20 group-hover:translate-y-full transition-transform duration-500 ease-in-out" />
                <span className="text-white text-sm font-black relative z-10">B</span>
              </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">Bavio Docs</span>
          </Link>

          <DocsSearch />

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block px-3">
              Pricing
            </Link>
            <SlidingTextButton
              variant="primary"
              hoverText="Get Started"
              onClick={() => router.push("/sign-up")}
              className="px-5 py-2 rounded-full text-xs font-bold"
            >
              Sign Up
            </SlidingTextButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 flex-1 flex gap-12 relative">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 py-12 border-r border-white/5 overflow-y-auto max-h-[calc(100vh-64px)] sticky top-16">
          <DocsSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl py-12 min-h-screen">
          <div className="max-w-[800px] mx-auto">
            {children}
          </div>
        </main>

        {/* Right Sidebar (TOC) */}
        <aside className="hidden xl:block w-64 shrink-0 py-12 overflow-y-auto max-h-[calc(100vh-64px)] sticky top-16">
          <DocsTOC items={tocItems} />
        </aside>
      </div>
    </div>
  );
}
