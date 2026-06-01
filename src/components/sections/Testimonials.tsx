import { Quote, Star } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.home.testimonials;

  return (
    <Section tone="muted" size="lg">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {t.items.map((item, i) => {
          const real = item.real;
          return (
            <Reveal
              key={i}
              delay={i * 0.1}
              className={cn(
                "flex h-full flex-col rounded-3xl p-7",
                real
                  ? "border border-slate-100 bg-white shadow-card"
                  : "border-2 border-dashed border-slate-300 bg-white/50"
              )}
            >
              {real ? (
                <>
                  <div className="flex items-center justify-between">
                    <Quote className="h-8 w-8 text-brand-200" aria-hidden="true" />
                    <div className="flex" aria-label="5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star
                          key={s}
                          className="h-4 w-4 fill-accent-500 text-accent-500"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-4 flex-1 text-[0.975rem] leading-relaxed text-slate-700">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-slate-100 pt-4">
                    <p className="font-heading font-bold text-ink">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.source}</p>
                  </figcaption>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                    {item.source}
                  </span>
                  <p className="mt-4 text-sm font-medium text-slate-500">
                    {item.quote}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{item.name}</p>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs italic text-slate-400">
        {t.disclaimer}
      </p>
    </Section>
  );
}
