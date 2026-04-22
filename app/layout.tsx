import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/components/layout/providers";
import { getLocaleFromCookie, getMessages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = buildMetadata({
  title: "Bavio AI | Never miss a business call. Ever.",
  description:
    "Bavio AI answers every business call in Hindi and English, qualifies leads, books appointments, and sends WhatsApp alerts 24/7.",
  keywords: [
    "AI voice assistant India",
    "voice agent India",
    "Hindi business call automation",
    "Exotel AI calls",
    "Bavio AI"
  ]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocaleFromCookie();
  const messages = getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-sans`}>
        <Providers locale={locale} messages={messages}>
          <AppShell locale={locale}>{children}</AppShell>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
