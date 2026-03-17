import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlidingTextButton } from "@/components/ui/sliding-text-button";

export function CTASection() {
  const router = useRouter();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#7B61FF]/5 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#7B61FF]/20 to-transparent rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <div className="glass-card rounded-[3rem] p-12 md:p-20 relative overflow-hidden bg-[#0A0A0E]/60 border-white/10 shadow-[0_0_80px_rgba(123,97,255,0.05)]">
          {/* Inner Glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7B61FF]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 to-[#9B8CFF]/5 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Ready to automate <br className="hidden sm:block" />
              <span className="text-gradient">your calls?</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Join the next generation of innovative businesses using Bavio AI to scale operations and deliver flawless voice experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <SlidingTextButton
                onClick={() => router.push("/sign-up")}
                variant="primary"
                hoverText="Build Now"
                className="px-8 py-4 rounded-xl text-base font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
              >
                Start Building
              </SlidingTextButton>
              <SlidingTextButton
                onClick={() => router.push("/docs")}
                variant="outline"
                hoverText="Explore API"
                className="px-8 py-4 rounded-xl glass-card text-base font-medium"
              >
                Read Docs
              </SlidingTextButton>
            </div>
            
             <p className="mt-8 text-sm text-zinc-500 font-medium">
              Enterprise-grade infrastructure. Built for developers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
