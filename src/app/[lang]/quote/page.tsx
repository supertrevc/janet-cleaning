import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Ruler, CalendarClock, SprayCan, BadgePercent } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/ui/Reveal";

const factorIcons = [Ruler, CalendarClock, SprayCan];

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/quote">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.quote.title,
    description: dict.meta.quote.description,
    alternates: buildAlternates(lang, "/quote"),
  };
}

export default async function QuotePage({ params }: PageProps<"/[lang]/quote">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const q = dict.quote;

  return (
    <>
      <PageHero
        eyebrow={q.hero.eyebrow}
        title={q.hero.title}
        subtitle={q.hero.subtitle}
      />

      <Section tone="white" size="lg">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Pricing explainer */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-ink">
                {q.pricing.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                {q.pricing.subtitle}
              </p>

              <ul className="mt-7 space-y-5">
                {q.pricing.factors.map((factor, i) => {
                  const Icon = factorIcons[i] ?? Ruler;
                  return (
                    <li key={factor.title} className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-heading font-bold text-ink">
                          {factor.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {factor.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-7 flex items-start gap-3 rounded-2xl bg-accent-500/10 px-4 py-3.5 text-sm font-medium text-amber-800">
                <BadgePercent className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
                {q.pricing.discountNote}
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <QuoteForm dict={dict} />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
