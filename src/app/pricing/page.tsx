"use client";

import { Pricing } from "@/components/ui/pricing";

const demoPlans = [
  {
    name: "STARTER",
    price: 0,
    yearlyPrice: 0,
    period: "per month",
    features: [
      "1 concurrent call",
      "100 test minutes",
      "Basic analytics",
      "Community support",
      "Standard voices",
    ],
    description: "Perfect for individuals and small experiments.",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: 4999,
    yearlyPrice: 3999,
    period: "per month",
    features: [
      "10 concurrent calls",
      "Advanced analytics",
      "24-hour support response",
      "Full API access",
      "Priority support",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses.",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: 14999,
    yearlyPrice: 11999,
    period: "per month",
    features: [
      "Unlimited capacity",
      "Custom SSO & RBAC",
      "Dedicated support channel",
      "Volume discounts",
      "Voice cloning",
      "Advanced security",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs.",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-transparent pt-20 pb-32">
      <Pricing
        plans={demoPlans}
        title="Simple, Transparent Pricing"
        description="Choose the plan that works for you. All prices in INR — no hidden fees."
      />
    </div>
  );
}
