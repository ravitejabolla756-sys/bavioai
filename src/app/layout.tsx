import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { NavigationController } from "@/components/NavigationController";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bavio | AI Voice Automation for Business",
  description: "Deploy AI voice agents that answer business calls, understand requests, and complete tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased text-white selection:bg-[#7B61FF]/30 min-h-screen flex flex-col overflow-x-hidden relative`}
      >
        {/* ── Global background system ── */}
        {/* 0. Opaque dark base — the true page background */}
        <div className="fixed inset-0 pointer-events-none -z-[60]" style={{ backgroundColor: "#050507" }} />
        {/* 1. Subtle purple-tinted grid — identical on every page */}
        <div
          className="fixed inset-0 pointer-events-none -z-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(123,97,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* 2. Radial purple glow at the top */}
        <div
          className="fixed inset-0 pointer-events-none -z-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(123,97,255,0.08) 0%, transparent 100%)",
          }}
        />
        
        {/* Only show global Navigation if NOT on docs page */}
        <NavigationController />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
