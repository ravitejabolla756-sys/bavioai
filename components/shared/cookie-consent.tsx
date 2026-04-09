"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CONSENT_KEY = "bavio_cookie_consent";

type ConsentState = "accepted" | "rejected" | "essential" | null;

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Slight delay so it doesn't flash immediately
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function save(state: ConsentState) {
    localStorage.setItem(CONSENT_KEY, state ?? "essential");
    setVisible(false);
  }

  function acceptAll() { save("accepted"); }
  function rejectNonEssential() { save("essential"); }
  function savePreferences() { save(analytics ? "accepted" : "essential"); }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:bottom-6 md:left-auto md:right-6 md:max-w-[440px]">
      <div className="rounded-[20px] border border-[var(--border-base)] bg-[rgba(14,11,0,0.98)] shadow-[0_8px_80px_rgba(0,0,0,0.8)] backdrop-blur-[24px]">
        {!showPreferences ? (
          /* Main banner */
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">We use cookies 🍪</p>
                <p className="mt-2 text-xs leading-[1.7] text-[var(--text-secondary)]">
                  We use essential cookies to keep the site working and optional analytics cookies to understand how you use it. No personal data is sold.
                  <a href="/cookies" className="ml-1 text-[var(--brand)] underline-offset-2 hover:underline">Cookie policy</a>
                </p>
              </div>
              <button type="button" onClick={() => save(null)} aria-label="Dismiss"
                className="flex-shrink-0 rounded-[8px] p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={acceptAll}
                className="flex-1 rounded-[10px] bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[var(--brand-hover)]">
                Accept all
              </button>
              <button type="button" onClick={rejectNonEssential}
                className="flex-1 rounded-[10px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
                Essential only
              </button>
              <button type="button" onClick={() => setShowPreferences(true)}
                className="rounded-[10px] px-4 py-2.5 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
                Manage
              </button>
            </div>
          </div>
        ) : (
          /* Preferences panel */
          <div className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--text-primary)]">Cookie preferences</p>
              <button type="button" onClick={() => setShowPreferences(false)} aria-label="Back"
                className="px-2 text-xs text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
                ← Back
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Essential</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Login, session, and navigation. Cannot be disabled.</p>
                </div>
                <div className="mt-0.5 h-5 w-9 flex-shrink-0 rounded-full bg-[var(--accent-green)]">
                  <div className="ml-auto h-5 w-5 rounded-full border border-black/20 bg-white shadow-sm" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Analytics</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Helps us understand which pages are useful. Anonymous — no personal profiles.</p>
                </div>
                <button type="button" onClick={() => setAnalytics((v) => !v)}
                  className={`mt-0.5 h-5 w-9 flex-shrink-0 rounded-full transition-colors ${analytics ? "bg-[var(--brand)]" : "bg-[var(--border-base)]"}`}>
                  <div className={`h-5 w-5 rounded-full border border-black/10 bg-white shadow-sm transition-all ${analytics ? "ml-auto" : "ml-0"}`} />
                </button>
              </div>
            </div>

            <button type="button" onClick={savePreferences}
              className="mt-5 w-full rounded-[10px] bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[var(--brand-hover)]">
              Save preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
