import { PhoneCall, FileText, Sparkles, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons: LucideIcon[] = [PhoneCall, FileText, Sparkles];

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const t = dict.home.howItWorks;

  return (
    <Section tone="white" size="lg">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="relative mt-14 grid gap-8 lg:grid-cols-3">
        {/* connecting line on desktop */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block"
        />
        {t.steps.map((step, i) => {
          const Icon = icons[i] ?? PhoneCall;
          return (
            <Reveal key={step.title} delay={i * 0.12} className="relative text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-card ring-1 ring-brand-100">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="mt-4 inline-block rounded-full bg-brand-50 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                {step.desc}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
