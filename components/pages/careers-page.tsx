import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CAREER_BENEFITS } from "@/lib/constants";

const departments = [
  { name: "Engineering", roles: ["Backend Engineer", "ML Engineer", "Infra Engineer"] },
  { name: "Product", roles: ["Product Manager", "Product Designer"] },
  { name: "Sales", roles: ["Account Executive - India", "Enterprise Sales"] },
  { name: "Marketing", roles: ["Content Lead", "Growth Marketer"] },
  { name: "Operations", roles: ["Implementation Specialist", "Customer Success Manager"] }
];

const values = [
  "Ship weekly, learn daily",
  "Default to ownership",
  "Customer outcome over feature vanity",
  "Respectful direct feedback",
  "Build for reliability",
  "Global standards, local empathy"
];

export function CareersPage() {
  return (
    <div className="bg-[var(--bg-base)]">
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Careers</p>
            <h1 className="page-hero-title max-w-4xl">Build the Future of Business Communication.</h1>
            <p className="page-hero-copy max-w-3xl">
              Join a team building global voice AI infrastructure for real businesses with real operational pressure.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#open-roles">
                  View Open Roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="mailto:careers@bavio.ai">Send Your Resume</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Culture and Values</span>
            <h2 className="section-title">How we work together.</h2>
          </SectionReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {values.map((value) => (
              <Card key={value} className="p-6 text-sm text-[var(--text-secondary)]">{value}</Card>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Team whiteboard sessions", "Async build days", "Friday launch demos"].map((item) => (
              <Card key={item} className="p-6 text-center text-sm text-[var(--text-secondary)]">{item}</Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0" id="open-roles">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Open Roles</span>
            <h2 className="section-title">Roles by department.</h2>
          </SectionReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {departments.map((department) => (
              <Card key={department.name} className="p-6">
                <h3 className="text-xl font-black text-[var(--text-primary)]">{department.name}</h3>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                  {department.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
                <Button asChild size="sm" className="mt-5">
                  <Link href="/contact">Apply</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Benefits</span>
            <h2 className="section-title">Built for long-term builders.</h2>
          </SectionReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {CAREER_BENEFITS.map((benefit) => (
              <Card key={benefit.title} className="p-6">
                <p className="text-3xl">{benefit.icon}</p>
                <h3 className="mt-3 text-xl font-black text-[var(--text-primary)]">{benefit.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.14),transparent_68%)]" />
        <div className="container relative z-[1] text-center">
          <h2 className="section-title">We are always looking for exceptional people.</h2>
          <p className="section-sub mx-auto mt-4">Even if no role perfectly matches, send your resume and portfolio.</p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="mailto:careers@bavio.ai">
                Send Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
