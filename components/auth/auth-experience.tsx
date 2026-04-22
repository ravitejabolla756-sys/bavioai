"use client";

import { MethodSelector } from "@/components/auth/method-selector";

type AuthExperienceProps = {
  intent: "login" | "signup";
  variant?: "modal" | "page";
  onClose?: () => void;
};

export function AuthExperience({ intent }: AuthExperienceProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="eyebrow">{intent === "signup" ? "Create account" : "Sign in"}</p>
        <h1 className="text-[30px] font-bold tracking-[-0.04em] text-white">
          {intent === "signup" ? "Create your Bavio workspace" : "Sign in to Bavio"}
        </h1>
        <p className="mt-3 text-sm leading-7 text-secondary">
          Secure Google login powered by your existing Bavio backend.
        </p>
      </div>
      <MethodSelector />
    </div>
  );
}
