import { Section } from "@/components/ui/Section";

export function LegalContent({
  intro,
  sections,
  lastUpdatedLabel,
  lastUpdated,
}: {
  intro: string;
  sections: { h: string; p: string }[];
  lastUpdatedLabel: string;
  lastUpdated: string;
}) {
  return (
    <Section tone="white" size="lg">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-slate-400">
          {lastUpdatedLabel}: {lastUpdated}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-heading text-xl font-bold text-ink">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
