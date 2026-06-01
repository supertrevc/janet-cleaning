import { X, Check } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function ProblemSolution({ dict }: { dict: Dictionary }) {
  const t = dict.home.problem;

  return (
    <Section tone="muted" size="md">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* The problem */}
        <Reveal className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8">
          <p className="font-heading text-lg font-bold text-slate-500">
            {t.painTitle}
          </p>
          <ul className="mt-5 space-y-4">
            {t.pains.map((pain) => (
              <li key={pain} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-500">
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-slate-600 line-through decoration-rose-200 decoration-1">
                  {pain}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The solution */}
        <Reveal
          delay={0.1}
          className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-7 shadow-soft sm:p-8"
        >
          <p className="font-heading text-lg font-bold text-brand-700">
            {t.solutionTitle}
          </p>
          <ul className="mt-5 space-y-4">
            {t.solutions.map((sol) => (
              <li key={sol} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="font-medium text-ink">{sol}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
