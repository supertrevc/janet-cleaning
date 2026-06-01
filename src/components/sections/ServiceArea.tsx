import { MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { business } from "@/lib/business";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceArea({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.home.serviceArea;

  return (
    <Section tone="white" size="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            subtitle={t.subtitle}
            align="left"
            className="max-w-xl"
          />
          <Reveal className="mt-7 flex flex-wrap gap-2.5">
            {business.serviceCities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                {city}
              </span>
            ))}
          </Reveal>
          <p className="mt-6 text-sm text-slate-500">{t.note}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={`/${locale}/quote`}>{dict.common.getFreeQuote}</Button>
            <Button href={business.phoneHref} variant="outline">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {business.phoneDisplay}
            </Button>
          </div>
        </div>

        {/* Stylized map placeholder (no real map embed required) */}
        <Reveal delay={0.1} className="order-first lg:order-last">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 to-brand-100 ring-1 ring-brand-100">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)] [background-size:40px_40px]"
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <span className="relative grid h-20 w-20 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/30" />
                  <span className="relative grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-white shadow-card">
                    <MapPin className="h-8 w-8" aria-hidden="true" />
                  </span>
                </span>
                <p className="mt-4 font-heading text-lg font-bold text-brand-800">
                  {business.city}, {business.region}
                </p>
                <p className="text-sm text-brand-600">{dict.common.denverMetro}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
