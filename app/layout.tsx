import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/components/layout/providers";
import { getLocaleFromCookie, getMessages } from "@/lib/i18n";
import { buildMetadata, getOrganizationJsonLd } from "@/lib/seo";

import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["700", "800"]
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = buildMetadata({
  title: "Bavio AI | Clarity Over Complexity",
  description:
    "Bavio AI is an enterprise-grade voice agent platform for global businesses to automate calls, capture leads, and run reliable workflows.",
  keywords: [
    "AI voice assistant India",
    "AI voice agent platform",
    "global call automation",
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
  const organizationJsonLd = getOrganizationJsonLd();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-sans`}>
        <Providers locale={locale} messages={messages}>
          <AppShell locale={locale}>{children}</AppShell>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
