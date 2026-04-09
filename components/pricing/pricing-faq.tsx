"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { PRICING_FAQS } from "@/lib/constants";

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {PRICING_FAQS.map((faq, index) => (
        <div key={faq.question} className="rounded-[16px] border border-border bg-[#0A0A0A]">
          <button
            type="button"
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="text-[16px] font-semibold text-white">{faq.question}</span>
            <ChevronDown className={`h-5 w-5 text-secondary transition ${open === index ? "rotate-180" : ""}`} />
          </button>
          {open === index ? (
            <div className="px-6 pb-5 text-[14px] leading-7 text-secondary">{faq.answer}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
