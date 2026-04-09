"use client";

import GoogleAuthButton from "@/components/shared/google-auth-button";

export function MethodSelector() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-[24px] font-bold text-white">Welcome to Bavio</h2>
        <p className="mt-2 text-[14px] text-muted">Continue with Google to access your workspace</p>
      </div>
      <div className="mx-auto w-full max-w-[360px]">
        <GoogleAuthButton />
      </div>
    </div>
  );
}
