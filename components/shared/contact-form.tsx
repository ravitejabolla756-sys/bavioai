"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { useToast } from "@/components/shared/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const useCases = [
  "Healthcare",
  "Real Estate",
  "Restaurants",
  "EdTech",
  "D2C / E-commerce",
  "BFSI / Lending",
  "Customer Support"
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { pushToast } = useToast();

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);

    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const message = data?.error || "We could not submit your message.";
      setError(message);
      pushToast({ kind: "error", title: "Submission failed", message });
      return;
    }

    setIsSuccess(true);
    pushToast({
      kind: "success",
      title: "Demo request received",
      message: "Our team will respond within 2 business hours."
    });
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface flex min-h-[420px] flex-col items-center justify-center text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="mt-5 font-heading text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">Message sent!</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-secondary">
          We&apos;ll WhatsApp you within 2 hours with the next steps and the best plan for your workflow.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Aarav Kulkarni" required />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Bavio AI" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="founder@company.com" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="+91 98765 43210" required />
        </div>
      </div>
      <div>
        <Label htmlFor="useCase">Use case</Label>
        <select
          id="useCase"
          name="useCase"
          className="flex h-12 w-full rounded-[10px] border border-border bg-black px-4 text-sm text-white transition-all duration-200 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"
          required
        >
          <option value="">Select a use case</option>
          {useCases.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} placeholder="Tell us about your call volume, workflows, and languages." required />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
