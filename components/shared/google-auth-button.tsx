"use client";

import React from "react";

import { useAuth } from "@/components/auth/auth-provider";

export default function GoogleAuthButton() {
  const { loginWithGoogle } = useAuth();

  return (
    <button
      type="button"
      onClick={() => {
        loginWithGoogle();
      }}
      className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] py-3 text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--text-faint)] hover:bg-[var(--bg-overlay)]"
      aria-label="Continue with Google"
    >
      <img src="/google.svg" alt="Google" className="h-5 w-5" />
      <span>Continue with Google</span>
    </button>
  );
}
