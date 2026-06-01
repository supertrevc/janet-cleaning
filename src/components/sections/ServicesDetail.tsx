import { Check, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { serviceSlugs, addOnKeys, business } from "@/lib/business";
import { serviceIcons, addOnIcons } from "@/components/service-icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function ServicesDetail({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Section tone="white" size="lg">
      <div className="space-y-8">
        {serviceSlugs.map((slug, i) => {
          const service = dict.services.list[slug];
          const Icon = serviceIcons[slug];
          const reverse = i % 2 === 1;
          return (
            <Reveal
              key={slug}
              id={slug}
              className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-soft"
            >
              <div className={cn("grid lg:grid-cols-2")}>
                {/* Visual panel */}
                <div
                  className={cn(
                    "relative min-h-[14rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 p-8 lg:min-h-[20rem]",
                    reverse && "lg:order-last"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
                  />
                  <div className="relative flex h-full flex-col items-start justify-between">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <p className="mt-6 font-heading text-2xl font-bold text-white">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Content panel */}
                <div className="p-8 lg:p-10">
                  <h2 className="font-heading text-2xl font-bold text-ink">
                    {service.name}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {service.desc}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button href={`/${locale}/quote`}>
                      {dict.common.getFreeQuote}
                    </Button>
                    <Button href={business.phoneHref} variant="outline">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      {business.phoneDisplay}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Add-ons */}
      <div className="mt-20">
        <SectionHeading
          title={dict.services.addOns.title}
          subtitle={dict.services.addOns.subtitle}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {addOnKeys.map((key, i) => {
            const addOn = dict.services.addOns.items[key];
            const Icon = addOnIcons[key];
            return (
              <Reveal
                key={key}
                delay={i * 0.07}
                className="rounded-2xl border border-slate-100 bg-brand-50/40 p-6 text-center"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading font-bold text-ink">
                  {addOn.name}
                </h3>
                <p className="mt-1.5 text-sm text-slate-500">{addOn.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
