"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { useToast } from "@/components/shared/toast-provider";

function highlightCode(code: string) {
  return code
    .replace(/(\/\/.*$)/gm, '<span class="text-[#7a6e5f]">$1</span>')
    .replace(/(".*?"|'.*?')/g, '<span class="text-[#22C55E]">$1</span>')
    .replace(/\b(const|await|import|from|new|return|class|if|else|async|print|export)\b/g, '<span class="text-[#60A5FA]">$1</span>');
}

export function CodeBlock({
  code,
  language
}: {
  code: string;
  language: string;
}) {
  const [copied, setCopied] = useState(false);
  const { pushToast } = useToast();

  async function onCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    pushToast({
      kind: "success",
      title: "Copied to clipboard",
      message: `${language} example is ready to paste.`
    });
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-[var(--border-base)] bg-[var(--bg-overlay)] font-mono text-[13px]">
      <div className="flex items-center justify-between border-b border-[var(--border-base)] px-4 py-3 text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
        <span>{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--border-base)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-brand)] hover:text-[var(--text-primary)]"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 leading-7 text-[var(--text-primary)]">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
}
