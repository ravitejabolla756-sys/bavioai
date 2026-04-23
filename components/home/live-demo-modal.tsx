"use client";

import { useEffect, useMemo, useState } from "react";
import { PhoneCall, X } from "lucide-react";

const script = [
  { speaker: "Caller", text: "Hi, I want to ask about your plans for my clinic.", action: "Incoming call detected", done: 1 },
  { speaker: "Bavio AI", text: "Absolutely. Are you looking for appointment booking, reminders, or lead capture?", action: "Language detected: English", done: 2 },
  { speaker: "Caller", text: "Mostly appointment booking and after-hours support.", action: "Intent classified: healthcare booking", done: 3 },
  { speaker: "Bavio AI", text: "Perfect. I can book visits, answer FAQs, and send confirmations on WhatsApp 24/7.", action: "Lead qualified and response generated", done: 4 }
] as const;

const actions = [
  "Incoming call detected",
  "Language detected: English",
  "Intent classified: healthcare booking",
  "Lead qualified and response generated",
  "WhatsApp follow-up queued"
];

export function LiveDemoModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!open) {
      setVisibleCount(0);
      return;
    }

    const timers = script.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 1);
      }, 900 * (index + 1))
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  const completedActions = useMemo(() => Math.min(visibleCount, actions.length), [visibleCount]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-[rgba(8,7,15,0.82)] px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--text-primary)]"
          aria-label="Close demo"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(124,58,237,0.18)] text-[var(--light-accent)]">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--light-accent)]">Interactive demo</p>
            <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Hear how Bavio handles a real business call</h3>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-5">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fca5a5]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
              Live demo
            </div>

            <div className="space-y-3">
              {script.slice(0, visibleCount).map((message, index) => (
                <div
                  key={`${message.speaker}-${index}`}
                  className={
                    message.speaker === "Caller"
                      ? "rounded-[16px] border border-[var(--text-faint)] bg-[#130f22] px-4 py-3 text-sm leading-7 text-[var(--text-primary)]"
                      : "rounded-[16px] border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.08)] px-4 py-3 text-sm leading-7 text-[var(--light-accent)]"
                  }
                >
                  <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">{message.speaker}</p>
                  {message.text}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--light-accent)]">AI actions</p>
            <div className="mt-5 space-y-3">
              {actions.map((action, index) => {
                const complete = index < completedActions;
                return (
                  <div
                    key={action}
                    className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          complete
                            ? "h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]"
                            : "h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]"
                        }
                      />
                      <span className={complete ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>{action}</span>
                    </div>
                    <span className="text-[var(--text-faint)]">{complete ? "Done" : "Pending"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
