"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

import { cn } from "@/lib/utils";

type ToastKind = "success" | "error";

type ToastItem = {
  id: number;
  title: string;
  message?: string;
  kind: ToastKind;
};

const ToastContext = createContext<{
  pushToast: (toast: Omit<ToastItem, "id">) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Date.now();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-6 top-6 z-[95] flex w-[320px] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto rounded-[14px] border border-border bg-[#0A0A0A] p-4 shadow-card transition-all animate-in slide-in-from-top-4 fade-in-0",
              toast.kind === "success" ? "border-l-4 border-l-success" : "border-l-4 border-l-red-500"
            )}
          >
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            {toast.message ? <p className="mt-1 text-sm text-[#A1A1AA]">{toast.message}</p> : null}
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
