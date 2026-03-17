"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { ConversationDemo } from "@/components/home/ConversationDemo";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { UseCasesPreview } from "@/components/home/UseCasesPreview";
import { VoiceDemo } from "@/components/home/VoiceDemo";
import { PricingPreview } from "@/components/home/PricingPreview";
import { CTASection } from "@/components/home/CTASection";
import React from "react";

function RevealSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <RevealSection>
        <ConversationDemo />
      </RevealSection>
      <RevealSection>
        <Features />
      </RevealSection>
      <RevealSection>
        <HowItWorks />
      </RevealSection>
      <RevealSection>
        <UseCasesPreview />
      </RevealSection>
      <RevealSection>
        <VoiceDemo />
      </RevealSection>
      <RevealSection>
        <PricingPreview />
      </RevealSection>
      <RevealSection>
        <CTASection />
      </RevealSection>
    </>
  );
}
