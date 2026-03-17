"use client";

import { useEffect, useState } from "react";
import { Search, Command } from "lucide-react";

export function DocsSearch() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  return (
    <div className="relative group w-full max-w-md hidden sm:block">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={16} className="text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search documentation..."
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
      />
      <div className="absolute inset-y-0 right-3 flex items-center gap-1 opacity-50 group-focus-within:opacity-100 transition-opacity">
        <kbd className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 flex items-center">
          {isMac ? <Command size={8} className="mr-0.5" /> : "Ctrl"} K
        </kbd>
      </div>
    </div>
  );
}
