import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { serviceSlugs } from "@/lib/business";
import { serviceIcons } from "@/components/service-icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesOverview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.home.servicesOverview;

  return (
    <Section tone="white" size="lg">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {serviceSlugs.map((slug, i) => {
          const service = dict.services.list[slug];
          const Icon = serviceIcons[slug];
          return (
            <Reveal key={slug} delay={i * 0.07}>
              <Link
                href={`/${locale}/services`}
                className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-ink">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {service.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  {dict.common.learnMore}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button href={`/${locale}/services`} variant="secondary" size="lg">
          {t.cta}
        </Button>
      </div>
    </Section>
  );
}
