"use client";

import { Pricing } from "@/components/blocks/pricing";

const demoPlans = [
  {
    name: "DEVELOPER",
    price: "0",
    yearlyPrice: "0",
    period: "per month",
    features: [
      "1 concurrent call",
      "100 test minutes",
      "Community support",
      "Standard voices",
    ],
    description: "Perfect for prototyping and testing voice AI capabilities.",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "10 concurrent calls",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses scaling voice.",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Unlimited capacity",
      "Custom SSO & RBAC",
      "Dedicated slack channel",
      "Volume discounts",
      "Voice cloning",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For scale-ups and enterprises with high volume needs.",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

export function PricingPreview() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7B61FF]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9B8CFF]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-20 pointer-events-none" />

      <Pricing 
        plans={demoPlans}
        title="Scale without friction."
        description="Choose the plan that works for you.\nAll plans include access to our voice platform, advanced latency handling, and support."
      />
    </section>
  );
}
