"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CallTranscript } from "@/components/shared/call-transcript";
import { VoiceWaveform } from "@/components/shared/voice-waveform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HERO_TRANSCRIPTS } from "@/lib/constants";

const demoLocales = [
  { label: "EN", value: "en" },
  { label: "हिंदी", value: "hi" },
  { label: "தமிழ்", value: "ta" }
] as const;

export function HeroSection({
  locale
}: {
  locale: "en" | "hi";
}) {
  const [demoLocale, setDemoLocale] = useState<"en" | "hi" | "ta">(locale === "hi" ? "hi" : "en");
  const transcript = useMemo(() => HERO_TRANSCRIPTS[demoLocale].slice(0, 3), [demoLocale]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black pt-8">
      <div className="grid-fade" />
      <div className="container relative z-[2] grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
        <div className="max-w-[680px]">
          <div className="animate-[float-in_600ms_ease_forwards] opacity-0">
            <Badge className="mb-6">India&apos;s AI voice platform for real business calls</Badge>
          </div>
          <h1 className="display-title animate-[float-in_600ms_ease_200ms_forwards] opacity-0">
            Autonomous Voice Agents for Every Business <span className="text-gradient">Call</span>
          </h1>
          <p className="mt-6 max-w-[480px] animate-[float-in_600ms_ease_400ms_forwards] text-[18px] leading-[1.6] text-secondary opacity-0">
            Handle calls, qualify leads, and execute workflows automatically with production-ready voice AI built for
            real operations.
          </p>
          <div className="mt-10 flex animate-[float-in_600ms_ease_600ms_forwards] flex-col gap-3 opacity-0 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/login">Start with Google</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/product">View Demo</Link>
            </Button>
          </div>
          <div className="mt-8 flex animate-[float-in_600ms_ease_800ms_forwards] items-center gap-4 opacity-0">
            <div className="flex -space-x-3">
              {["AK", "NS", "RV"].map((item) => (
                <div
                  key={item}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(37,99,235,0.3)] bg-[#1A1A1A] text-[11px] font-semibold text-white"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-muted">Built for live calling teams across India</p>
          </div>
        </div>
        <div className="surface relative overflow-hidden rounded-[20px] p-6 shadow-[0_0_80px_rgba(37,99,235,0.12)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_45%)]" />
          <div className="relative z-[2]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">Live agent session</p>
                <p className="mt-2 text-[14px] font-semibold text-white">
                  Bavio AI Model V2 <span className="font-normal text-success animate-pulse-soft">- Listening...</span>
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] px-3 py-1 text-[12px] text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Live
              </div>
            </div>
            <div className="mt-6">
              <VoiceWaveform />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {demoLocales.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDemoLocale(item.value)}
                  className={`rounded-[8px] border px-3 py-1.5 text-[12px] font-medium transition ${
                    item.value === demoLocale
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-transparent text-secondary hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <CallTranscript className="mt-6" lines={mounted ? transcript : []} />
            <div className="mt-5 rounded-[8px] border border-[#1E3A5F] bg-[#0F172A] p-4 font-mono text-[12px] text-[#60A5FA]">
              <div className="mb-2 text-[8px] font-semibold uppercase tracking-[0.08em] text-warning">Action triggered</div>
              <div>execute.book_appointment({`{`}</div>
              <div className="pl-3">intent: &apos;Schedule Visit&apos;,</div>
              <div className="pl-3">confidence: 0.97</div>
              <div>{`})`}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
