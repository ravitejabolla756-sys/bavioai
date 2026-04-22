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
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 py-3 text-white transition hover:bg-neutral-800"
      aria-label="Continue with Google"
    >
      <img src="/google.svg" alt="Google" className="w-5 h-5" />
      <span>Continue with Google</span>
    </button>
  );
}
