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

        {/* Denver metro service-area map */}
        <Reveal delay={0.1} className="order-first lg:order-last">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] ring-1 ring-brand-100">
            <iframe
              title={
                locale === "es"
                  ? "Mapa del área de servicio del área metropolitana de Denver"
                  : "Map of Denver metro service area"
              }
              src="https://maps.google.com/maps?q=Denver,CO&z=10&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
