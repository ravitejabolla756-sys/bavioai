"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsCodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

export function DocsCodeBlock({ code, language = "javascript", label }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0E] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-zinc-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            {label || language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="relative p-6 font-mono text-sm leading-relaxed text-zinc-300 overflow-x-auto">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
      
      {/* Decorative gradient corner */}
      <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-indigo-500/5 blur-3xl" />
    </div>
  );
}
