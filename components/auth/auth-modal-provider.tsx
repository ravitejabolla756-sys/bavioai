"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { AuthModal } from "@/components/auth/auth-modal";

type AuthModalContextValue = {
  openAuth: (intent: "login" | "signup") => void;
  closeAuth: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<"login" | "signup">("login");

  const value = useMemo(
    () => ({
      openAuth(nextIntent: "login" | "signup") {
        setIntent(nextIntent);
        setOpen(true);
      },
      closeAuth() {
        setOpen(false);
      }
    }),
    []
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal open={open} intent={intent} onClose={() => setOpen(false)} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }

  return context;
}
