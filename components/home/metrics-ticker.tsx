import { CountUp } from "@/components/shared/count-up";

export function MetricsTicker() {
  return (
    <section className="border-y border-border bg-[#0A0A0A] py-12">
      <div className="container grid gap-8 md:grid-cols-4">
        {[
          { value: 127432, suffix: "", label: "Calls this month" },
          { value: 98.7, suffix: "%", label: "First-call resolution" },
          { value: 23000000, suffix: "", label: "Saved by customers", currency: true },
          { value: 12, suffix: "", label: "Languages supported" }
        ].map((metric, index) => (
          <div key={metric.label} className={`text-center ${index < 3 ? "md:border-r md:border-border" : ""}`}>
            <div className="text-[48px] font-extrabold tracking-[-0.04em] text-white">
              <CountUp value={metric.value} suffix={metric.suffix} currency={metric.currency} />
            </div>
            <p className="mt-2 text-[14px] text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
