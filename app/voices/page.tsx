"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play, Volume2 } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VOICE_SAMPLES } from "@/lib/constants";

const voiceScripts: Record<string, string[]> = {
  "Aarav": [
    "Good afternoon, this is Aarav from Bavio AI. How may I assist you today?",
    "I'd be happy to help you with that booking. Could you confirm your preferred time?"
  ],
  "Mira": [
    "Hello! This is Mira. I'm here to help you with your appointment and any questions.",
    "I understand. Let me check availability and get back to you right away."
  ],
  "Raghav": [
    "Namaskar! Aapka EMI due date 8 April hai. Kya main aapke liye payment link bhej sakta hoon?",
    "Main samajh gaya. Main aapko ek secure payment link WhatsApp pe bhej raha hoon."
  ],
  "Anika": [
    "Namaste! Main Anika hoon. Aapko kaunse doctor se appointment chahiye?",
    "Dr. Khanna kal 3 baje available hain. Kya main appointment confirm kar doon?"
  ],
  "Nila": [
    "Vanakkam! Inru iravu 8 manikku oru table reserve pannaNuma?",
    "Nalla! Unkal peyarum phone number koodavum sollunga."
  ],
  "Vikram": [
    "Namaste! Mee 2BHK kosam chustunnara? Budget ela untundi?",
    "Okay! Ee vaaram site visit book cheyyadaniki nenu help chestha."
  ]
};

const languageColors: Record<string, string> = {
  "EN Male": "bg-blue-400/10 text-blue-400 border-blue-400/20",
  "EN Female": "bg-purple-400/10 text-purple-400 border-purple-400/20",
  "Hindi Male": "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "Hindi Female": "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  "Tamil Female": "bg-rose-400/10 text-rose-400 border-rose-400/20",
  "Telugu Male": "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"
};

export default function VoicesPage() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [lineIndex, setLineIndex] = useState<Record<string, number>>({});

  function togglePlay(name: string) {
    if (playing === name) {
      setPlaying(null);
    } else {
      setPlaying(name);
      setLineIndex((prev) => ({ ...prev, [name]: 0 }));
      // Simulate cycling through lines
      const interval = setInterval(() => {
        setLineIndex((prev) => {
          const current = prev[name] ?? 0;
          const next = current + 1;
          if (next >= (voiceScripts[name]?.length ?? 2)) {
            clearInterval(interval);
            setPlaying(null);
            return { ...prev, [name]: 0 };
          }
          return { ...prev, [name]: next };
        });
      }, 2800);
    }
  }

  return (
    <div className="bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Voice library</p>
            <h1 className="page-hero-title max-w-4xl">
              6 voices. 12 languages.{" "}
              <span className="text-gradient">Zero robotic tone.</span>
            </h1>
            <p className="page-hero-copy">
              Every Bavio voice is trained for natural business conversations — not IVR-style reading. Preview each voice and pick the one that represents your brand.
            </p>
          </SectionReveal>

          {/* Language pills */}
          <SectionReveal>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Hindi", "English", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "Hinglish", "Gujarati", "Malayalam", "Punjabi", "Odia"].map((lang) => (
                <span key={lang} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                  {lang}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Voice cards */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Available voices</span>
            <h2 className="section-title">Click play to hear each voice.</h2>
            <p className="section-sub mx-auto">Each voice is optimized for a specific use case and language context. Custom voice cloning available on Enterprise.</p>
          </SectionReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {VOICE_SAMPLES.map((voice) => {
              const isPlaying = playing === voice.name;
              const scripts = voiceScripts[voice.name] ?? [];
              const currentLineIdx = lineIndex[voice.name] ?? 0;

              return (
                <SectionReveal key={voice.name}>
                  <Card className={`h-full p-7 surface-hover transition-all ${isPlaying ? "border-[var(--border-brand)] shadow-[0_0_40px_rgba(123,47,190,0.12)]" : ""}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand),#A855F7)] text-xl font-black text-black">
                        {voice.name[0]}
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${languageColors[voice.language]}`}>
                        {voice.language}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="mt-4">
                      <h3 className="text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{voice.name}</h3>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{voice.style}</p>
                    </div>

                    {/* Waveform preview */}
                    <div className="mt-5 flex h-10 items-center gap-[3px]">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all ${isPlaying ? "bg-[var(--brand)]" : "bg-[var(--border-base)]"}`}
                          style={{
                            height: isPlaying ? `${Math.max(12, Math.random() * 40 + 8)}px` : `${8 + Math.sin(i * 0.5) * 6}px`,
                            animationDelay: `${i * 50}ms`,
                            animation: isPlaying ? `waveBar ${0.6 + Math.random() * 0.6}s ease-in-out infinite` : "none"
                          }}
                        />
                      ))}
                    </div>

                    {/* Transcript */}
                    {isPlaying && scripts[currentLineIdx] && (
                      <div className="mt-4 rounded-[14px] border border-[var(--border-brand)] bg-[var(--brand-glow-soft)] px-4 py-3 text-sm text-[var(--text-primary)]">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--brand)] mb-2">Speaking now</p>
                        {scripts[currentLineIdx]}
                      </div>
                    )}

                    {/* Controls */}
                    <div className="mt-5 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => togglePlay(voice.name)}
                        className={`flex h-11 items-center gap-2.5 rounded-full px-5 text-sm font-semibold transition-all ${
                          isPlaying
                            ? "bg-[var(--brand)] text-black"
                            : "border border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--text-secondary)] hover:border-[var(--border-brand)] hover:text-[var(--brand)]"
                        }`}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isPlaying ? "Stop" : "Play demo"}
                      </button>
                      <Volume2 className="h-4 w-4 text-[var(--text-muted)]" />
                    </div>
                  </Card>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voice cloning CTA */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <Card className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <p className="eyebrow">Voice cloning</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    Train the AI on your brand voice.
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
                    Enterprise customers can clone their existing brand voice from just 60 seconds of audio. Your customers hear your voice, powered by Bavio AI. Available on the Enterprise plan.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "60 seconds of source audio required",
                      "Available in all 12 supported languages",
                      "Same sub-500ms latency as standard voices",
                      "Exclusive to your workspace — not shared"
                    ].map((point) => (
                      <div key={point} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                        <span className="h-4 w-4 flex-shrink-0 rounded-full bg-[var(--brand-glow-soft)] text-center text-[10px] leading-4 text-[var(--brand)]">✓</span>
                        {point}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="mt-8">
                    <Link href="/enterprise">
                      Explore Enterprise
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-center border-l border-[var(--border-base)] bg-[var(--bg-raised)] p-12">
                  <div className="text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand),#A855F7)] text-4xl font-black text-black">
                      Y
                    </div>
                    <p className="mt-5 text-lg font-bold text-[var(--text-primary)]">Your Brand Voice</p>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">Custom cloned | Enterprise only</p>
                    <div className="mt-6 flex h-8 items-center justify-center gap-[3px]">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-1 rounded-full bg-[var(--brand)]"
                          style={{ height: `${8 + Math.sin(i * 0.7) * 10}px`, opacity: 0.4 + Math.random() * 0.6 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[380px] bg-[radial-gradient(circle_at_center,rgba(123,47,190,0.14),transparent_68%)]" />
        <div className="container relative z-[1] text-center">
          <h2 className="section-title">Ready to set your voice live?</h2>
          <p className="section-sub mx-auto mt-4">
            Pick a voice, configure your agent, and go live in under 10 minutes.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
                  <Link href="/signup">Start building free</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/playground">Test in the playground</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
