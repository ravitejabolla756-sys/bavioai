import { SectionReveal } from "@/components/shared/section-reveal";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="section-shell bg-black">
      <div className="container">
        <SectionReveal>
          <div className="eyebrow">Testimonials</div>
          <h2 className="section-title">Operators move serious call volume to Bavio</h2>
        </SectionReveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <SectionReveal key={testimonial.name} delay={index * 100}>
              <div className="surface relative h-full bg-[rgba(10,10,10,0.8)] p-8 backdrop-blur-[10px]">
                <div className="pointer-events-none absolute left-6 top-4 text-[48px] text-primary/30">“</div>
                <div className="text-[14px] text-warning">★★★★★</div>
                <p className="mt-5 text-[16px] italic leading-8 text-secondary">{testimonial.quote}</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(37,99,235,0.2)] bg-[#111111] text-[11px] font-semibold text-white">
                    {testimonial.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">{testimonial.name}</p>
                    <p className="text-[13px] text-muted">
                      {testimonial.role} — {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
