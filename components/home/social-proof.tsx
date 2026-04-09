import { SectionReveal } from "@/components/shared/section-reveal";
import { CountUp } from "@/components/shared/count-up";
import { SOCIAL_PROOF_COMPANIES } from "@/lib/constants";

const extraCompanies = ["OYO", "Swiggy", "Dunzo", "CRED"];

export function SocialProof() {
  const firstRow = [...SOCIAL_PROOF_COMPANIES, ...extraCompanies, ...SOCIAL_PROOF_COMPANIES];
  const secondRow = [...extraCompanies, ...SOCIAL_PROOF_COMPANIES, ...extraCompanies];

  return (
    <section className="border-y border-border bg-black">
      <div className="overflow-hidden py-4">
        <div className="flex min-w-max gap-4 animate-marquee-right">
          {[...firstRow, ...firstRow].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="rounded-md border border-border bg-[#111111] px-4 py-1.5 text-[13px] font-semibold text-muted transition hover:border-[rgba(37,99,235,0.2)] hover:text-white"
            >
              {logo}
            </div>
          ))}
        </div>
        <div className="mt-3 flex min-w-max gap-4 animate-marquee-left">
          {[...secondRow, ...secondRow].map((logo, index) => (
            <div
              key={`${logo}-secondary-${index}`}
              className="rounded-md border border-border bg-[#111111] px-4 py-1.5 text-[13px] font-semibold text-muted transition hover:border-[rgba(37,99,235,0.2)] hover:text-white"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        {[
          { value: 2400000, label: "Calls Handled", prefix: "", suffix: "+" },
          { value: 99.2, label: "Uptime", prefix: "", suffix: "%" },
          { value: 500, label: "Avg Latency", prefix: "<", suffix: "ms" }
        ].map((metric, index) => (
          <SectionReveal key={metric.label} delay={index * 100}>
            <div className="surface p-8">
              <div className="mb-4 h-[2px] w-8 bg-primary" />
              <div className="text-[40px] font-extrabold tracking-[-0.04em] text-white">
                {metric.prefix}
                <CountUp value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="mt-2 text-[13px] text-muted">{metric.label}</div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
