"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: number;
  yearlyPrice: number;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const middleCardRef = useRef<HTMLDivElement>(null);

  const handleYearly = () => {
    if (!isMonthly) return;
    if (middleCardRef.current) {
      const rect = middleCardRef.current.getBoundingClientRect();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#7B61FF", "#9B8CFF", "#c084fc", "#ffffff"],
        gravity: 1,
        ticks: 300,
      });
    }
    setIsMonthly(false);
  };

  return (
    <div className="container py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
          {title}
        </h2>
        <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Toggle — centered pill, no sticky / z-index issues */}
      <div className="flex justify-center mb-14">
        <div className="relative inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1">
          {/* Sliding background thumb */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm"
            animate={{ left: isMonthly ? "4px" : "calc(50%)", right: isMonthly ? "calc(50%)" : "4px" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
          <button
            onClick={() => setIsMonthly(true)}
            className={cn(
              "relative z-10 px-7 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer select-none",
              isMonthly ? "text-[#050507]" : "text-zinc-400 hover:text-white"
            )}
          >
            Monthly
          </button>
          <button
            onClick={handleYearly}
            className={cn(
              "relative z-10 px-7 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer select-none flex items-center gap-1.5",
              !isMonthly ? "text-[#050507]" : "text-zinc-400 hover:text-white"
            )}
          >
            Yearly
            <span className={cn(
              "text-xs font-bold px-1.5 py-0.5 rounded-full transition-all duration-300",
              !isMonthly
                ? "bg-[#7B61FF]/20 text-[#9B8CFF]"
                : "bg-white/10 text-zinc-500"
            )}>
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={plan.isPopular ? { scale: 1.02 } : { scale: 1.015 }}
            ref={plan.isPopular ? middleCardRef : null}
            className={cn(
              "relative flex flex-col rounded-2xl p-7 border transition-all duration-300",
              plan.isPopular
                ? "border-[#7B61FF]/50 bg-[#0D0B14] shadow-[0_0_40px_rgba(123,97,255,0.18)]"
                : "border-white/8 bg-[#0A0A0E] hover:border-white/15 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            )}
          >
            {/* Popular badge */}
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#7B61FF] to-[#9B8CFF] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  <Star className="w-3 h-3 fill-current" />
                  Popular
                </span>
              </div>
            )}

            {/* Plan name */}
            <p className={cn(
              "text-xs font-bold uppercase tracking-widest mb-5",
              plan.isPopular ? "text-[#9B8CFF]" : "text-zinc-500"
            )}>
              {plan.name}
            </p>

            {/* Price */}
            <div className="mb-1">
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold text-white tracking-tight">
                  {plan.price === 0 ? (
                    <span>₹0</span>
                  ) : (
                    <span className="flex items-start">
                      <span className="text-2xl font-semibold mt-2 mr-0.5 text-zinc-300">₹</span>
                      <NumberFlow
                        value={isMonthly ? plan.price : plan.yearlyPrice}
                        format={{
                          style: "decimal",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          useGrouping: true,
                        }}
                        transformTiming={{ duration: 500, easing: "ease-out" }}
                        willChange
                        className="tabular-nums"
                      />
                    </span>
                  )}
                </span>
                {plan.price !== 0 && (
                  <span className="text-sm text-zinc-500 mb-2">/mo</span>
                )}
              </div>
              <p className="text-xs text-zinc-600 mt-1">
                {plan.price === 0
                  ? "Free forever"
                  : isMonthly
                  ? "Billed monthly"
                  : "Billed annually"}
              </p>
            </div>

            <p className="text-sm text-zinc-500 mt-3 mb-6 leading-relaxed">
              {plan.description}
            </p>

            {/* Divider */}
            <div className={cn(
              "w-full h-px mb-6",
              plan.isPopular ? "bg-[#7B61FF]/20" : "bg-white/5"
            )} />

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <Check className={cn(
                    "h-4 w-4 mt-0.5 flex-shrink-0",
                    plan.isPopular ? "text-[#9B8CFF]" : "text-zinc-400"
                  )} />
                  <span className="text-zinc-300 leading-snug">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href={plan.href}
              prefetch={true}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200",
                plan.isPopular
                  ? "bg-gradient-to-r from-[#7B61FF] to-[#9B8CFF] text-white hover:opacity-90 hover:shadow-[0_0_24px_rgba(123,97,255,0.4)] active:scale-[0.98]"
                  : "bg-white/5 border border-white/10 text-zinc-200 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
              )}
            >
              {plan.buttonText}
              {plan.isPopular && <Zap className="w-4 h-4 fill-current" />}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-zinc-600 text-sm mt-10">
        All prices in Indian Rupees (INR) · No hidden fees · Cancel anytime
      </p>
    </div>
  );
}
