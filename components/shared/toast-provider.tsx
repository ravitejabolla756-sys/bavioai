"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type ToastKind = "success" | "error" | "warning" | "info";

type ToastItem = {
  id: number;
  title: string;
  message?: string;
  kind: ToastKind;
};

const ToastContext = createContext<{ pushToast: (toast: Omit<ToastItem, "id">) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Date.now();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[95] flex w-[340px] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto rounded-[14px] border border-border bg-[var(--bg3)] p-4 shadow-card transition-all animate-in slide-in-from-bottom-4 fade-in-0",
              toast.kind === "success" && "border-l-4 border-l-success",
              toast.kind === "error" && "border-l-4 border-l-red-500",
              toast.kind === "warning" && "border-l-4 border-l-warning",
              toast.kind === "info" && "border-l-4 border-l-info"
            )}
          >
            <p className="text-sm font-semibold text-[var(--text-primary)]">{toast.title}</p>
            {toast.message ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{toast.message}</p> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
