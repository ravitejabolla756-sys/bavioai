import Link from "next/link";
import Script from "next/script";
import { Clock3, Mail, MapPin, MessageCircleMore } from "lucide-react";

import { ContactForm } from "@/components/shared/contact-form";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact | Bavio AI",
  description: "Talk to the Bavio AI team about automating calls, booking a demo, or evaluating enterprise workflows.",
  path: "/contact"
});

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/bavio-ai/demo";

  return (
    <PageTransition>
      <section className="min-h-screen pt-24">
        <div className="grid min-h-[calc(100vh-96px)] lg:grid-cols-2">
          <div className="flex items-center justify-center px-6 py-12 lg:px-12">
            <div className="w-full max-w-[620px]">
              <p className="eyebrow">Contact</p>
              <h1 className="text-[clamp(40px,5vw,64px)] font-black leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
                Let's talk about automating your calls.
              </h1>
              <p className="mt-5 max-w-[560px] text-lg leading-8 text-[var(--text-secondary)]">
                Tell us about your use case and we'll recommend the right plan, workflow, and rollout path.
              </p>
              <Card className="mt-8 p-8">
                <ContactForm />
                <p className="mt-4 text-center text-sm text-[var(--text-muted)]">We respond within 2 business hours</p>
              </Card>
            </div>
          </div>

          <div className="border-l border-[var(--border-base)] bg-[var(--bg-raised)] px-6 py-12 lg:px-12">
            <div className="mx-auto flex h-full w-full max-w-[620px] flex-col justify-center">
              <Card className="p-8">
                <p className="eyebrow">Book a demo</p>
                <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Or schedule a 30-minute walkthrough.</h2>
                <div className="mt-6 rounded-[20px] border border-dashed border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                  <div className="calendly-inline-widget min-h-[320px] rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-overlay)]" data-url={calendlyUrl} />
                </div>
              </Card>

              <div className="mt-6 grid gap-4">
                <Card className="p-5">
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <Mail className="h-4 w-4 text-[var(--brand)]" />
                    <Link href="mailto:hello@bavio.ai" className="transition hover:text-[var(--text-primary)]">
                      hello@bavio.ai
                    </Link>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <MessageCircleMore className="h-4 w-4 text-[var(--accent-green)]" />
                    <Link href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="transition hover:text-[var(--text-primary)]">
                      Chat on WhatsApp
                    </Link>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <MapPin className="h-4 w-4 text-[var(--brand)]" />
                    Bangalore, India
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <Clock3 className="h-4 w-4 text-[var(--brand)]" />
                    Mon-Fri, 9 AM - 7 PM IST
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </PageTransition>
  );
}
