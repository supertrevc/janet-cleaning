import {
  CalendarCheck,
  Sparkles,
  Users,
  Languages,
  BadgeDollarSign,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons: LucideIcon[] = [
  CalendarCheck,
  Sparkles,
  Users,
  Languages,
  BadgeDollarSign,
  Clock,
];

export function WhyUs({ dict }: { dict: Dictionary }) {
  const t = dict.home.whyUs;

  return (
    <Section tone="muted" size="lg">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.points.map((point, i) => {
          const Icon = icons[i] ?? Sparkles;
          return (
            <Reveal
              key={point.title}
              delay={(i % 3) * 0.08}
              className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-ink">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {point.desc}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
