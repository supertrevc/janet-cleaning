import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkles, HandHeart, ShieldCheck, MessageSquare, type LucideIcon } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { business } from "@/lib/business";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const valueIcons: LucideIcon[] = [ShieldCheck, Sparkles, HandHeart, MessageSquare];

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: buildAlternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <PageHero
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
      />

      {/* Story + stats */}
      <Section tone="white" size="lg">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-ink">
              {a.story.title}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
              {a.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {a.trustNote}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-4">
            {a.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-brand-50/40 p-6"
              >
                <p className="font-heading text-3xl font-bold text-brand-600">
                  {stat.value}
                </p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
            {/* Owner placeholder card (photo to be supplied) */}
            <div className="flex items-center gap-4 rounded-2xl bg-ink p-6 text-white">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-brand-200">
                <Sparkles className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-lg font-bold">{business.owner}</p>
                <p className="text-sm text-slate-400">
                  {locale === "es" ? "Dueña y operadora" : "Owner & operator"}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="muted" size="lg">
        <SectionHeading title={a.values.title} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.items.map((value, i) => {
            const Icon = valueIcons[i] ?? Sparkles;
            return (
              <Reveal
                key={value.title}
                delay={i * 0.08}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {value.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand locale={locale} content={a.ctaBand} />
    </>
  );
}
