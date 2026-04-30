"use client";

import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "use-intl";

import { AuthModalProvider } from "@/components/auth/auth-modal-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ToastProvider } from "@/components/shared/toast-provider";

export function Providers({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <ToastProvider>
      <AuthProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthModalProvider>{children}</AuthModalProvider>
        </NextIntlClientProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
