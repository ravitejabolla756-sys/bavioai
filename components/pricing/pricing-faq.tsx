"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const PRICING_FAQS_GLOBAL = [
  {
    question: "What happens when I exceed my minute limit?",
    answer:
      "Your service continues uninterrupted and usage is billed at the plan's overage rate. You can also upgrade anytime to reduce overage costs."
  },
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes. Upgrades are applied immediately. Downgrades take effect from the next billing cycle to avoid feature disruption."
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes. Annual billing is available with discounted pricing compared to monthly billing on Professional and Enterprise."
  },
  {
    question: "Do you support both INR and USD billing?",
    answer:
      "Yes. India-based customers can use INR billing and global customers can use USD billing."
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Starter is free for evaluation and includes test minutes so your team can validate workflows before production."
  },
  {
    question: "Do you lock customers into long contracts?",
    answer:
      "No for standard plans. Enterprise agreements are customizable based on procurement, SLA, and compliance requirements."
  }
];

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {PRICING_FAQS_GLOBAL.map((faq, index) => (
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
