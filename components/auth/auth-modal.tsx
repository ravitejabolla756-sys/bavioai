"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { AuthExperience } from "@/components/auth/auth-experience";
import { cn } from "@/lib/utils";

export function AuthModal({
  open,
  intent,
  onClose
}: {
  open: boolean;
  intent: "login" | "signup";
  onClose: () => void;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.85)] backdrop-blur-md" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[101] max-h-[90vh] w-[min(440px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[20px] border border-border bg-[#0A0A0A] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {intent === "signup" ? "Create your Bavio account" : "Sign in to Bavio"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Close aria-label="Close auth modal" className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-[#111111] hover:text-white">
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
          <AuthExperience intent={intent} onClose={onClose} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
